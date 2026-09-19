import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/lips-family-official.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIPS Family — Loyalty, Integrity, Power, Success" },
      {
        name: "description",
        content:
          "Meet LIPS Family, a streaming collective and creator agency built to grow standout creators.",
      },
      { property: "og:title", content: "LIPS Family — Loyalty, Integrity, Power, Success" },
      {
        property: "og:description",
        content: "A streaming family and agency built to grow standout creators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-5 md:px-8 md:pb-16 md:pt-32">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="page-enter relative mx-auto grid max-w-6xl items-center gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> Streaming collective
          </p>
          <h1 className="font-display text-4xl font-black leading-[0.95] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            LOYALTY.
            <br />
            INTEGRITY.
            <br />
            POWER. &amp;
            <br />
            <span className="text-primary">SUCCESS.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            LIPS stands for{" "}
            <strong className="font-semibold text-foreground">
              Loyalty, Integrity, Power, &amp; Success
            </strong>
            . We are a family and agency helping creators build stronger brands, better content, and
            lasting community. Do you feel like you live by those 4 words?{" "}
            <Link
              to="/recruitment"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Go to our recruitment page, sign up, and let's see what you stand for.
            </Link>
          </p>
          <ul aria-label="Platforms" className="mt-6 flex flex-wrap gap-2">
            {["MICO", "MeetMe", "TikTok", "Instagram"].map((platform) => (
              <li
                key={platform}
                className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-foreground"
              >
                {platform} <span className="sr-only">placeholder</span>
              </li>
            ))}
          </ul>
          <Link
            to="/recruitment"
            className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 font-display text-sm font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Find your path
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-6 rounded-full bg-primary/20 blur-3xl" />
          <img
            src={logo.url}
            alt="LIPS Family crown logo in white, gold, and teal"
            width={768}
            height={768}
            className="relative w-full rounded-2xl border border-border object-cover shadow-2xl"
          />
        </div>
      </div>

      {/* Definitions — wording is editable until the family finalizes it. */}
      <section
        aria-labelledby="lips-meaning"
        className="page-enter relative mx-auto mt-16 max-w-6xl md:mt-24"
      >
        <h2
          id="lips-meaning"
          className="font-display text-2xl font-black uppercase tracking-wide text-foreground sm:text-3xl"
        >
          What we stand for
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Four words, one family. This is how we live them out, every stream and every day.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {VALUES.map((value) => (
            <div key={value.word} className="glass-panel flex flex-col gap-3 rounded-2xl p-6">
              <dt className="font-display text-lg font-black uppercase tracking-[0.12em] text-primary">
                {value.word}
              </dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{value.definition}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 text-center">
          <Link
            to="/recruitment"
            className="inline-flex rounded-xl bg-primary px-6 py-3 font-display text-sm font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Live by these words? Apply now
          </Link>
        </div>
      </section>
    </main>
  );
}

const VALUES = [
  {
    word: "Loyalty",
    definition:
      "We show up for each other — in chat, in collabs, and through the hard seasons. The family comes first, always.",
  },
  {
    word: "Integrity",
    definition:
      "Honest content, honest play, honest business. We build real trust with our audience and never fake a win.",
  },
  {
    word: "Power",
    definition:
      "Consistency, skill, and the drive to keep leveling up. Real power is what you build, not what you take.",
  },
  {
    word: "Success",
    definition:
      "Every member's win is the family's win. We grow together — brands, communities, and careers.",
  },
];
