import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/_authenticated/inbox")({
  head: () => ({
    meta: [
      { title: "Staff inbox — LIPS Family" },
      {
        name: "description",
        content: "Review applications and inquiries submitted to LIPS Family.",
      },
      { property: "og:title", content: "Staff inbox — LIPS Family" },
      { property: "og:description", content: "Private review inbox for LIPS Family staff." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InboxPage,
});

const STATUSES = ["new", "reviewing", "accepted", "declined"] as const;
type Status = (typeof STATUSES)[number];
type Tab = "applications" | "inquiries";

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

type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

function InboxPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("applications");

  const applicationsQuery = useQuery({
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

  const inquiriesQuery = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async (): Promise<Inquiry[]> => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Inquiry[];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const { error } = await supabase.from("applications").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

  const setRead = useMutation({
    mutationFn: async ({ id, isRead }: { id: string; isRead: boolean }) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: isRead })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-messages"] }),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const applications = applicationsQuery.data ?? [];
  const inquiries = inquiriesQuery.data ?? [];
  const unreadCount = inquiries.filter((item) => !item.is_read).length;
  const counts = STATUSES.map((status) => ({
    status,
    count: applications.filter((item) => item.status === status).length,
  }));

  const tabButton = (value: Tab, label: string, badge?: number) => (
    <Button
      key={value}
      type="button"
      variant={tab === value ? "brand" : "glass"}
      className="h-11 flex-1 text-xs sm:flex-none sm:px-5"
      aria-pressed={tab === value}
      onClick={() => setTab(value)}
    >
      {label}
      {badge ? (
        <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      ) : null}
    </Button>
  );

  return (
    <PageShell
      eyebrow="Staff inbox"
      title="Your inbox."
      intro="Applications and visitor inquiries land here, newest first."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex w-full gap-2 sm:w-auto" role="tablist" aria-label="Inbox sections">
          {tabButton("applications", "Applications")}
          {tabButton("inquiries", "Inquiries", unreadCount)}
        </div>
        <Button
          type="button"
          variant="glass"
          className="h-10 w-full text-xs sm:ml-auto sm:w-auto"
          onClick={signOut}
        >
          Sign out
        </Button>
      </div>

      {tab === "applications" ? (
        <ApplicationsPanel
          query={applicationsQuery}
          counts={counts}
          onSetStatus={(id, status) => setStatus.mutate({ id, status })}
          pending={setStatus.isPending}
        />
      ) : (
        <InquiriesPanel
          query={inquiriesQuery}
          onSetRead={(id, isRead) => setRead.mutate({ id, isRead })}
          pending={setRead.isPending}
        />
      )}
    </PageShell>
  );
}

function ApplicationsPanel({
  query,
  counts,
  onSetStatus,
  pending,
}: {
  query: { isPending: boolean; error: unknown; data?: Application[] };
  counts: { status: Status; count: number }[];
  onSetStatus: (id: string, status: Status) => void;
  pending: boolean;
}) {
  const applications = query.data ?? [];

  return (
    <section aria-label="Applications">
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
      </div>

      {query.isPending ? (
        <p className="text-sm text-muted-foreground">Loading applications…</p>
      ) : null}

      {query.error ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
        >
          These applications could not be loaded. Your account may not have reviewer access yet.
        </p>
      ) : null}

      {!query.isPending && !query.error && applications.length === 0 ? (
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
                  disabled={pending}
                  onClick={() => onSetStatus(application.id, status)}
                >
                  {statusLabel(status)}
                </Button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InquiriesPanel({
  query,
  onSetRead,
  pending,
}: {
  query: { isPending: boolean; error: unknown; data?: Inquiry[] };
  onSetRead: (id: string, isRead: boolean) => void;
  pending: boolean;
}) {
  const inquiries = query.data ?? [];

  return (
    <section aria-label="Inquiries">
      {query.isPending ? <p className="text-sm text-muted-foreground">Loading inquiries…</p> : null}

      {query.error ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
        >
          These inquiries could not be loaded. Your account may not have reviewer access yet.
        </p>
      ) : null}

      {!query.isPending && !query.error && inquiries.length === 0 ? (
        <p className="glass-panel rounded-2xl p-6 text-sm text-muted-foreground">
          No inquiries yet. Messages from the contact page will show up here.
        </p>
      ) : null}

      <ul className="space-y-4">
        {inquiries.map((inquiry) => (
          <li
            key={inquiry.id}
            className={`glass-panel rounded-2xl border p-5 md:p-6 ${
              inquiry.is_read ? "border-border opacity-75" : "border-primary/40"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {inquiry.is_read ? "Read" : "New"}
                </p>
                <h2 className="mt-1 font-display text-xl font-black text-foreground">
                  {inquiry.subject}
                </h2>
                <p className="text-sm font-semibold text-foreground">{inquiry.name}</p>
                <a
                  href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: ${inquiry.subject}`)}`}
                  className="break-all text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  {inquiry.email}
                </a>
              </div>
              <p className="w-full text-xs text-muted-foreground sm:w-auto sm:text-right">
                {new Date(inquiry.created_at).toLocaleString()}
              </p>
            </div>

            <p className="mt-4 break-words whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {inquiry.message}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                type="button"
                variant={inquiry.is_read ? "glass" : "brand"}
                className="h-10 flex-1 text-xs sm:flex-none"
                aria-pressed={inquiry.is_read}
                disabled={pending}
                onClick={() => onSetRead(inquiry.id, !inquiry.is_read)}
              >
                {inquiry.is_read ? "Mark as unread" : "Mark as read"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
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
