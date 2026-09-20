import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import flyer from "@/assets/mico-coin-seller.jpeg.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/mico-coin-selling")({
  head: () => ({ meta: [
    { title: "MICO Coin Selling — LIPS Family" },
    { name: "description", content: "Official MICO coin selling rates from LIPS Family. MICO USA streamers only — contact Lola Baby with any questions or concerns." },
    { property: "og:title", content: "MICO Coin Selling — LIPS Family" },
    { property: "og:description", content: "Official MICO coin selling rates. MICO USA streamers only — contact Lola Baby with any questions or concerns." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: MicoCoinSellingPage,
});

function MicoCoinSellingPage() {
  return (
    <PageShell
      eyebrow="Official rates"
      title="MICO Coin Selling"
      intro="LIPS Family's official coin selling service, powered by Marvin the Mascot. Current rates, payment options, and contact info are all on the flyer below."
    >
      <div
        role="note"
        className="mb-8 rounded-2xl border-2 border-primary bg-primary/10 px-5 py-6 text-center shadow-nav"
      >
        <p className="font-display text-2xl font-black uppercase tracking-wide text-primary sm:text-3xl">
          MICO USA Streamers Only
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          This service is exclusive to MICO streamers located in the USA. If that's not you, this page doesn't apply.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <img
          src={flyer.url}
          alt="LIPS Family Empire coin seller flyer featuring Marvin the Mascot, with diamond rates from $10 (25K) to $500 (1,250,000), third-party recharge availability, payment options (Cash App, PayPal, Apple Pay), phone 4079860331, and $AlluringDesignz — text before sending payment"
          width={1240}
          height={1240}
          className="w-full rounded-2xl border border-border shadow-nav"
        />
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-surface px-5 py-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Questions or concerns?</p>
        <p className="mt-2 text-lg font-semibold text-foreground">Contact Lola Baby</p>
        <p className="mt-1 text-sm text-muted-foreground">CEO of LIPS Family — she handles all coin selling questions personally.</p>
        <Button asChild variant="brand" className="mt-5">
          <Link to="/contact">Message us</Link>
        </Button>
      </div>
    </PageShell>
  );
}
