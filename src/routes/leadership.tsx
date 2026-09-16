import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import logo from "@/assets/lips-family-official.jpeg.asset.json";
import nova from "@/assets/leader-nova.jpg";
import kai from "@/assets/leader-kai.jpg";

export const Route = createFileRoute("/leadership")({
  head: () => ({ meta: [
    { title: "Leadership — LIPS Family" },
    { name: "description", content: "Meet the placeholder leadership team guiding LIPS Family and its creator agency." },
    { property: "og:title", content: "Leadership — LIPS Family" },
    { property: "og:description", content: "Meet the team guiding the LIPS creator collective." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LeadershipPage,
});

const leaders = [
  { name: "Nova Reyes", position: "Founder & Creative Lead", image: nova },
  { name: "Kai Osei", position: "Head of Talent", image: kai },
];

function LeadershipPage() {
  return (
    <PageShell eyebrow="The crew" title="Leadership" intro="The people shaping the LIPS vision, supporting talent, and building a creator-first culture.">
      <div className="grid gap-5 md:grid-cols-2">
        {leaders.map((leader) => (
          <article key={leader.name} className="glass-panel overflow-hidden rounded-2xl border border-border md:grid md:grid-cols-[0.85fr_1.15fr]">
            <img src={leader.image} alt={`Placeholder portrait for ${leader.name}`} width={736} height={912} loading="lazy" className="aspect-[4/3] h-full w-full object-cover md:aspect-auto" />
            <div className="flex flex-col justify-between p-5 md:p-7">
              <img src={logo.url} alt="LIPS Family crown logo" width={768} height={768} loading="lazy" className="mb-10 size-20 rounded-md border border-border object-cover" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Name</p>
                <h2 className="mt-1 font-display text-2xl font-black text-foreground">{leader.name}</h2>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Position</p>
                <p className="mt-1 text-sm font-medium text-primary">{leader.position}</p>
                <p className="mt-5 text-xs text-muted-foreground">[Placeholder person — replace name, role, and photo]</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}