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
      { property: "og:description", content: "Private sign in for the LIPS Family application inbox." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/inbox", replace: true });
    });
  }, [navigate]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/inbox` },
      });
      setBusy(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (data.session) {
        navigate({ to: "/inbox", replace: true });
        return;
      }
      setNotice("Check your email to confirm the account, then sign in.");
      return;
    }

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
      <form onSubmit={submit} className="glass-panel mx-auto max-w-md space-y-5 rounded-2xl border border-border p-5 md:p-8">
        <div className="grid grid-cols-2 gap-3">
          {(["signin", "signup"] as const).map((option) => (
            <Button
              key={option}
              type="button"
              variant={mode === option ? "brand" : "glass"}
              className="h-12 text-xs md:text-sm"
              aria-pressed={mode === option}
              onClick={() => {
                setMode(option);
                setError(null);
                setNotice(null);
              }}
            >
              {option === "signin" ? "Sign in" : "Create account"}
            </Button>
          ))}
        </div>
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
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          required
          minLength={6}
          maxLength={72}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" variant="brand" className="h-12 w-full" disabled={busy}>
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </Button>
        {error ? (
          <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p role="status" className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-foreground">
            {notice}
          </p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          The first account created becomes the reviewer with access to the inbox.
        </p>
      </form>
    </PageShell>
  );
}
