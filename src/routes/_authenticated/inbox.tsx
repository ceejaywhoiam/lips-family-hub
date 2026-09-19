import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/_authenticated/inbox")({
  head: () => ({
    meta: [
      { title: "Application inbox — LIPS Family" },
      { name: "description", content: "Review recruitment applications submitted to LIPS Family." },
      { property: "og:title", content: "Application inbox — LIPS Family" },
      { property: "og:description", content: "Private review inbox for LIPS Family applications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InboxPage,
});

const STATUSES = ["new", "reviewing", "accepted", "declined"] as const;
type Status = (typeof STATUSES)[number];

type Application = {
  id: string;
  path: "agency" | "family";
  streaming_name: string;
  email: string;
  platforms: string | null;
  experience: string | null;
  content: string | null;
  contribution: string | null;
  status: Status;
  created_at: string;
};

function InboxPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["applications"],
    queryFn: async (): Promise<Application[]> => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Application[];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const { error } = await supabase.from("applications").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const applications = data ?? [];
  const counts = STATUSES.map((status) => ({
    status,
    count: applications.filter((item) => item.status === status).length,
  }));

  return (
    <PageShell
      eyebrow="Staff inbox"
      title="Applications."
      intro="Every submitted application lands here, newest first. Mark where each one stands as you review."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {counts.map(({ status, count }) => (
          <span
            key={status}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
          >
            {statusLabel(status)}:{" "}
            <strong className="font-semibold text-foreground">{count}</strong>
          </span>
        ))}
        <Button
          type="button"
          variant="glass"
          className="h-10 w-full text-xs sm:ml-auto sm:w-auto"
          onClick={signOut}
        >
          Sign out
        </Button>
      </div>

      {isPending ? <p className="text-sm text-muted-foreground">Loading applications…</p> : null}

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
        >
          These applications could not be loaded. Your account may not have reviewer access yet.
        </p>
      ) : null}

      {!isPending && !error && applications.length === 0 ? (
        <p className="glass-panel rounded-2xl p-6 text-sm text-muted-foreground">
          No applications yet. New submissions from the recruitment page will show up here.
        </p>
      ) : null}

      <ul className="space-y-4">
        {applications.map((application) => (
          <li
            key={application.id}
            className="glass-panel rounded-2xl border border-border p-5 md:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {application.path === "agency" ? "Join the Agency" : "Join the Family"}
                </p>
                <h2 className="mt-1 font-display text-xl font-black text-foreground">
                  {application.streaming_name}
                </h2>
                <a
                  href={`mailto:${application.email}`}
                  className="break-all text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  {application.email}
                </a>
              </div>
              <p className="w-full text-xs text-muted-foreground sm:w-auto sm:text-right">
                {new Date(application.created_at).toLocaleString()}
              </p>
            </div>

            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <Detail label="Platforms" value={application.platforms} />
              <Detail label="Time streaming" value={application.experience} />
              <Detail label="Content they create" value={application.content} />
              <Detail label="What they bring" value={application.contribution} />
            </dl>

            <div
              className="mt-5 flex flex-wrap gap-2"
              role="group"
              aria-label={`Status for ${application.streaming_name}`}
            >
              {STATUSES.map((status) => (
                <Button
                  key={status}
                  type="button"
                  variant={application.status === status ? "brand" : "glass"}
                  className="h-10 flex-1 text-xs sm:flex-none"
                  aria-pressed={application.status === status}
                  disabled={setStatus.isPending}
                  onClick={() => setStatus.mutate({ id: application.id, status })}
                >
                  {statusLabel(status)}
                </Button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words whitespace-pre-wrap leading-relaxed text-foreground">
        {value}
      </dd>
    </div>
  );
}

function statusLabel(status: Status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
