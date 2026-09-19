import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [
      { title: "Merch — LIPS Family" },
      {
        name: "description",
        content: "The official LIPS Family merchandise shop is under construction.",
      },
      { property: "og:title", content: "Merch — LIPS Family" },
      {
        property: "og:description",
        content: "The official LIPS Family shop is under construction.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MerchPage,
});

function MerchPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-5 md:pb-8 md:pt-20">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="relative text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          LIPS Merch
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl font-black uppercase text-foreground sm:text-6xl md:text-8xl">
          Under Construction
        </h1>
      </div>
    </main>
  );
}
