import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [
      { title: "Merch — LIPS Family" },
      {
        name: "description",
        content:
          "The official LIPS Family merchandise shop is in production. Drop 001 is on the way.",
      },
      { property: "og:title", content: "Merch — LIPS Family" },
      {
        property: "og:description",
        content: "The official LIPS Family shop is in production. Drop 001 is on the way.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MerchPage,
});

function MerchPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-5 md:pb-10 md:pt-24">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* Kinetic dot grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(var(--primary) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="page-enter relative flex w-full max-w-md flex-col items-center">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            LIPS Merch &bull; Drop 001
          </p>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Main glass card */}
        <div className="glass-panel relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-border p-6 shadow-2xl sm:p-8">
          {/* Interior glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-44 rounded-full bg-primary/25 blur-3xl"
          />

          {/* Headline — deliberately compact */}
          <h1 className="relative z-10 font-display text-3xl font-black uppercase italic leading-[0.92] tracking-tight text-foreground sm:text-4xl">
            Under
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px color-mix(in oklab, var(--foreground) 45%, transparent)" }}
            >
              Construction
            </span>
          </h1>

          {/* Concentric drop marker */}
          <div className="relative flex justify-center py-6">
            <div className="flex size-28 items-center justify-center rounded-full border border-gold/30 motion-safe:animate-pulse sm:size-32">
              <div className="flex size-20 items-center justify-center rounded-full border-2 border-primary shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_35%,transparent)] sm:size-24">
                <div className="size-2 rounded-full bg-gold" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 bg-gold px-2 py-1 text-[8px] font-black uppercase tracking-widest text-background">
              Secure your spot
            </span>
          </div>

          {/* Copy */}
          <div className="relative z-10 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              The first LIPS Family apparel drop is in production. Nothing is on
              sale yet — this is your early look while it comes together.
            </p>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-3 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-[0_4px_20px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition-transform hover:scale-[1.02] active:scale-95"
              >
                Ask about merch
              </Link>
              <Link
                to="/recruitment"
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-border bg-black/40 px-4 py-3 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-primary/50"
              >
                Join the family
              </Link>
            </div>
          </div>
        </div>

        {/* Status row */}
        <div className="mt-8 flex items-center gap-8">
          <div className="flex flex-col items-center">
            <span className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Status
            </span>
            <span className="text-xs font-bold text-primary">In production</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center">
            <span className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Drop 001
            </span>
            <span className="text-xs font-bold italic uppercase text-gold">LIPS Gold</span>
          </div>
        </div>
      </div>
    </main>
  );
}
