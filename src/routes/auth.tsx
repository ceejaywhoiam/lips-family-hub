import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/field";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff sign in — LIPS Family" },
      { name: "description", content: "Sign in to review LIPS Family recruitment applications." },
      { property: "og:title", content: "Staff sign in — LIPS Family" },
      {
        property: "og:description",
        content: "Private sign in for the LIPS Family application inbox.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/inbox", replace: true });
    });
  }, [navigate]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate({ to: "/inbox", replace: true });
  }

  return (
    <PageShell
      eyebrow="Staff only"
      title="Sign in to the inbox."
      intro="Applications are private. Sign in with your staff account to review them."
    >
      <form
        onSubmit={submit}
        className="glass-panel mx-auto max-w-md space-y-5 rounded-2xl border border-border p-5 md:p-8"
      >
        <Field
          id="auth-email"
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Field
          id="auth-password"
          name="password"
          type="password"
          label="Password"
          placeholder="At least 6 characters"
          autoComplete="current-password"
          required
          minLength={6}
          maxLength={72}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" variant="brand" className="h-12 w-full" disabled={busy}>
          {busy ? "Please wait…" : "Sign in"}
        </Button>
        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground"
          >
            {error}
          </p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          Staff accounts are provisioned by administrators.
        </p>
      </form>
    </PageShell>
  );
}
