import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import logo from "@/assets/lips-family-official.jpeg.asset.json";
import lolaBaby from "@/assets/lolababy_streams_profile-photo_20260919014048.jpeg";
import jodiPlease from "@/assets/09FD396C-D76C-4F98-B0AB-3C54A8481C25.png";
import leaderNova from "@/assets/leader-nova.jpg";
import leaderKai from "@/assets/leader-kai.jpg";

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
  { name: "Lola Baby", position: "CEO of LIPS Family", image: lolaBaby, instagram: "@lolababy_streams", placeholder: false },
  { name: "Jodi Please", position: "Head of Creative Team", image: jodiPlease, instagram: "@jodiplease", placeholder: false },
  { name: "Nova Reyes", position: "Founder & Creative Lead", image: leaderNova, instagram: "@lipsfamily", placeholder: true },
  { name: "Kai Osei", position: "Head of Talent", image: leaderKai, instagram: "@lipsfamily", placeholder: true },
];

function LeadershipPage() {
  return (
    <PageShell eyebrow="The crew" title="Leadership" intro="The people shaping the LIPS vision, supporting talent, and building a creator-first culture.">
      <div className="grid gap-5 md:grid-cols-2">
        {leaders.map((leader) => (
          <article key={leader.name} className="glass-panel overflow-hidden rounded-2xl border border-border flex flex-col md:grid md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative">
              <img src={leader.image} alt={`Placeholder portrait for ${leader.name}`} width={736} height={912} loading="lazy" className="aspect-[4/3] h-full w-full object-cover md:aspect-auto" />
              {leader.placeholder && (
                <span className="absolute left-2 top-2 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground backdrop-blur">
                  Placeholder
                </span>
              )}
            </div>
            <div className="flex flex-col justify-between p-5 md:p-7">
              <img src={logo.url} alt="LIPS Family crown logo" width={768} height={768} loading="lazy" className="mb-10 size-20 rounded-md border border-border object-cover" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Name</p>
                <h2 className="mt-1 font-display text-2xl font-black text-foreground">{leader.name}</h2>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Position</p>
                <p className="mt-1 text-sm font-medium text-primary">{leader.position}</p>
                <p className="mt-5 text-xs text-muted-foreground">Instagram: {leader.instagram}</p>
                {leader.placeholder && (
                  <p className="mt-2 text-[10px] italic text-muted-foreground">Placeholder entry — swap in the real name, position, photo, and Instagram.</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
