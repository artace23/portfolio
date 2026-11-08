import { Section } from "@/components/ui/Section";
import { experience } from "@/data/site";

export function Experience() {
  return (
    <Section id="experience" title="Experience" intro="Most recent first. Full-time work alongside contract and freelance projects.">
      <ol className="divide-y divide-line border-y border-line">
        {experience.map((e) => (
          <li key={e.role + e.dates} className="grid md:grid-cols-12 gap-3 md:gap-8 py-8">
            <div className="md:col-span-3">
              <p className="font-mono text-sm text-muted">{e.dates}</p>
              <p className="mt-1 text-xs text-muted">{e.type}</p>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-semibold text-lg">{e.role}</h3>
              <p className="text-muted">
                {e.org} &middot; {e.place}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
