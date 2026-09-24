import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/field";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/application-status")({
  head: () => ({
    meta: [
      { title: "Application Status — LIPS Family" },
      {
        name: "description",
        content: "Check where your LIPS Family or agency application stands.",
      },
      { property: "og:title", content: "Application Status — LIPS Family" },
      {
        property: "og:description",
        content: "Enter your email to check where your application stands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplicationStatusPage,
});

type StatusResult = {
  path: "agency" | "family";
  streaming_name: string;
  status: "new" | "reviewing" | "accepted" | "declined";
  submitted_at: string;
};

const STATUS_COPY: Record<StatusResult["status"], { label: string; detail: string }> = {
  new: {
    label: "Received",
    detail:
      "Your application is in and waiting to be reviewed. A response will be given within 7 days.",
  },
  reviewing: {
    label: "Under review",
    detail: "The LIPS team is reviewing your application right now. Hang tight.",
  },
  accepted: {
    label: "Accepted",
    detail: "Welcome to the family — check your email for next steps.",
  },
  declined: {
    label: "Not selected this time",
    detail: "This application was not selected. You're welcome to apply again down the road.",
  },
};

function ApplicationStatusPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [searched, setSearched] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const email = String(new FormData(form).get("email") ?? "").trim();

    setBusy(true);
    setError(null);
    setResult(null);
    setSearched(false);

    const { data, error: rpcError } = await supabase.rpc("check_application_status", {
      _email: email,
    });
    setBusy(false);
    setSearched(true);

    if (rpcError) {
      setError("We couldn't look that up right now. Please try again in a moment.");
      return;
    }
    const row = Array.isArray(data) ? data[0] : data;
    setResult((row as StatusResult | undefined) ?? null);
  }

  const copy = result ? STATUS_COPY[result.status] : null;

  return (
    <PageShell
      eyebrow="Applicants"
      title="Where do I stand?"
      intro="Enter the email you applied with to check where your application stands. Nothing is shared with anyone else."
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <form
          onSubmit={submit}
          className="glass-panel space-y-5 rounded-2xl border border-border p-5 md:p-8"
        >
          <Field
            id="status-email"
            name="email"
            type="email"
            label="Email address used on your application"
            placeholder="you@example.com"
            required
            maxLength={254}
            autoComplete="email"
          />
          <Button type="submit" variant="glass" className="h-12 w-full" disabled={busy}>
            {busy ? "Checking…" : "Check my status"}
          </Button>
        </form>

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
          >
            {error}
          </p>
        ) : null}

        {searched && result && copy ? (
          <div role="status" className="glass-panel rounded-2xl border border-border p-5 md:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              {result.path === "agency" ? "Join the Agency" : "Join the Family"} application
            </p>
            <h2 className="mt-1 font-display text-2xl font-black text-foreground">
              {result.streaming_name} — {copy.label}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.detail}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Submitted {new Date(result.submitted_at).toLocaleString()}
            </p>
          </div>
        ) : null}

        {searched && !result && !error ? (
          <p
            role="status"
            className="glass-panel rounded-2xl p-5 text-sm text-muted-foreground md:p-6"
          >
            No application was found for that email address. Double-check the email you used, or{" "}
            <Link
              to="/recruitment"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              submit an application
            </Link>
            .
          </p>
        ) : null}
      </div>
    </PageShell>
  );
}
