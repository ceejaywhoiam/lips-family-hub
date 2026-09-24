import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/page-shell";
import { Field, TextField } from "@/components/field";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Info — LIPS Family" },
      {
        name: "description",
        content: "Contact LIPS Family with app, website, brand, or general inquiries.",
      },
      { property: "og:title", content: "Contact Info — LIPS Family" },
      {
        property: "og:description",
        content: "Send LIPS Family an app, website, brand, or general inquiry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const text = (key: string) => {
      const value = values.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    setBusy(true);
    setError(null);
    const { error: insertError } = await supabase.from("contact_messages").insert({
      name: text("name"),
      email: text("email"),
      subject: text("subject"),
      message: text("message"),
    });
    setBusy(false);

    if (insertError) {
      setError("Your inquiry could not be sent. Please check your connection and try again.");
      return;
    }

    setSent(true);
    form.reset();
  }

  return (
    <PageShell
      eyebrow="Open inquiry"
      title="Let’s talk."
      intro="Questions about an app, website, partnership, or the LIPS brand are welcome here."
    >
      <form
        onSubmit={submit}
        className="glass-panel mx-auto max-w-2xl space-y-5 rounded-2xl border border-border p-5 md:p-8"
      >
        <Field
          id="contact-name"
          name="name"
          label="Your name"
          placeholder="Full name"
          required
          maxLength={100}
          autoComplete="name"
        />
        <Field
          id="contact-email"
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          required
          maxLength={254}
          autoComplete="email"
        />
        <Field
          id="contact-subject"
          name="subject"
          label="What is this about?"
          placeholder="App, website, collaboration, or general question"
          required
          maxLength={150}
        />
        <TextField
          id="contact-message"
          name="message"
          label="Your inquiry"
          placeholder="Tell us what you would like to discuss"
          required
          maxLength={1500}
        />
        <Button type="submit" variant="glass" className="h-12 w-full" disabled={busy}>
          {busy ? "Sending…" : "Send inquiry"}
        </Button>
        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-center text-sm text-foreground"
          >
            {error}
          </p>
        ) : null}
        {sent ? (
          <p role="status" className="text-center text-sm font-medium text-primary">
            Thanks — your inquiry is ready for the LIPS team.
          </p>
        ) : null}
      </form>
    </PageShell>
  );
}
