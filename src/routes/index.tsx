import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/lips-family-official.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIPS Family — Loyalty, Integrity, Power, Success" },
      { name: "description", content: "Meet LIPS Family, a streaming collective and creator agency built to grow standout creators." },
      { property: "og:title", content: "LIPS Family — Loyalty, Integrity, Power, Success" },
      { property: "og:description", content: "A streaming family and agency built to grow standout creators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-28 pt-10 md:px-8 md:pb-16 md:pt-32">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="page-enter relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> Streaming collective
          </p>
          <h1 className="font-display text-4xl font-black leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
            LOYALTY.<br />INTEGRITY.<br />POWER. &amp;<br /><span className="text-primary">SUCCESS.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            LIPS stands for <strong className="font-semibold text-foreground">Loyalty, Integrity, Power, &amp; Success</strong>. We are a family and agency helping creators build stronger brands, better content, and lasting community. <span className="text-primary">[Placeholder description — replace with your own wording]</span>
          </p>
          <ul aria-label="Platforms" className="mt-6 flex flex-wrap gap-2">
            {["Twitch", "YouTube", "Kick", "TikTok", "Instagram"].map((platform) => (
              <li key={platform} className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-foreground">{platform} <span className="sr-only">placeholder</span></li>
            ))}
          </ul>
          <Link to="/recruitment" className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 font-display text-sm font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Find your path
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-6 rounded-full bg-primary/20 blur-3xl" />
          <img src={logo.url} alt="LIPS Family crown logo in white, gold, and teal" width={768} height={768} className="relative w-full rounded-2xl border border-border object-cover shadow-2xl" />
        </div>
      </div>
    </main>
  );
}
