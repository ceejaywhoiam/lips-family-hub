import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Field, TextField } from "@/components/field";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Recruitment — Join LIPS Family" },
      {
        name: "description",
        content: "Apply to join the LIPS creator family or the LIPS talent agency.",
      },
      { property: "og:title", content: "Recruitment — Join LIPS Family" },
      { property: "og:description", content: "Choose your path and apply to join LIPS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecruitmentPage,
});

type Path = "agency" | "family";

function RecruitmentPage() {
  const [path, setPath] = useState<Path>("agency");
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const text = (key: string) => {
      const value = values.get(key);
      return typeof value === "string" && value.trim() ? value.trim() : null;
    };

    setBusy(true);
    setError(null);
    const { error: insertError } = await supabase.from("applications").insert({
      path,
      streaming_name: text("streamingName") ?? "",
      email: text("email") ?? "",
      platforms: path === "family" ? text("platforms") : text("platform"),
      experience: text("experience"),
      content: text("content"),
      contribution: text("contribution"),
    });
    setBusy(false);

    if (insertError) {
      setError("Your application could not be sent. Please check your connection and try again.");
      return;
    }

    setSubmitted(true);
    form.reset();
  }

  return (
    <PageShell
      eyebrow="Applications open"
      title="Choose your path."
      intro="Apply for representation through the agency or join the creator family. Select one path to begin."
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 grid grid-cols-2 gap-3" aria-label="Application type">
          {(["agency", "family"] as Path[]).map((option) => (
            <Button
              key={option}
              type="button"
              variant={path === option ? "brand" : "glass"}
              className="h-auto min-h-16 px-3 py-4 text-center text-xs leading-tight whitespace-normal md:text-sm"
              onClick={() => {
                setPath(option);
                setSubmitted(false);
                setError(null);
              }}
              aria-pressed={path === option}
            >
              Join the {option === "agency" ? "Agency" : "Family"}
            </Button>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="glass-panel space-y-5 rounded-2xl border border-border p-5 md:p-8"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Selected path
            </p>
            <h2 className="mt-1 font-display text-2xl font-black text-foreground">
              Join the {path === "agency" ? "Agency" : "Family"}
            </h2>
          </div>
          {path === "family" ? (
            <>
              <Field
                id="experience"
                name="experience"
                label="How long have you been streaming?"
                placeholder="For example: 2 years"
                required
                maxLength={100}
              />
              <TextField
                id="content"
                name="content"
                label="What kind of content do you create?"
                placeholder="Tell us about your content and audience"
                required
                maxLength={800}
              />
              <TextField
                id="contribution"
                name="contribution"
                label="What can you bring to the family?"
                help="Share what makes you stand out and how you could help the brand."
                placeholder="Your strengths, ideas, and unique perspective"
                required
                maxLength={1200}
              />
              <Field
                id="platforms"
                name="platforms"
                label="Streaming platforms you use"
                placeholder="MICO, MeetMe, TikTok…"
                required
                maxLength={200}
              />
            </>
          ) : (
            <Field
              id="platform"
              name="platform"
              label="Streaming platform you use"
              placeholder="For example: MICO"
              required
              maxLength={100}
            />
          )}
          <Field
            id="streaming-name"
            name="streamingName"
            label="Streaming name"
            placeholder="Your channel or creator name"
            required
            maxLength={100}
          />
          <Field
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            required
            maxLength={254}
            autoComplete="email"
          />
          <Button type="submit" variant="brand" className="h-12 w-full" disabled={busy}>
            {busy ? "Sending…" : "Submit application"}
          </Button>
          {error ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-center text-sm text-foreground"
            >
              {error}
            </p>
          ) : null}
          {submitted ? (
            <p
              role="status"
              className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-center text-sm font-medium text-foreground"
            >
              A response will be given within 7 days. Thank you for your application.
            </p>
          ) : null}
        </form>
      </div>
    </PageShell>
  );
}
