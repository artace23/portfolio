import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { HoverPreview } from "@/components/ui/HoverPreview";
import { awards, certificates, education } from "@/data/site";

export function Recognition() {
  return (
    <Section id="recognition" title="Education and recognition">
      <div className="mb-14 border-y border-ink/80">
        {education.map((e) => (
          <div
            key={e.degree}
            className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{e.degree}</h3>
              <p className="mt-1 text-muted">
                {e.school}, {e.place}
              </p>
            </div>
            <p className="font-mono text-sm text-muted shrink-0">{e.dates}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h3 className="font-mono text-xs text-muted mb-5">Recognition</h3>
          <ul className="divide-y divide-line border-y border-line">
            {awards.map((a) => (
              <li key={a.title} className="py-4">
                <p className="font-display text-lg font-semibold tracking-tight">{a.title}</p>
                <p className="mt-0.5 text-sm text-muted leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs text-muted mb-5">Certificates</h3>
          <HoverPreview
            items={certificates.map((c) => ({ title: c.title, image: c.image, fit: "contain" as const }))}
          >
            <ul className="divide-y divide-line border-y border-line">
              {certificates.map((c, i) => (
                <li key={c.href} data-preview={i}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-3 py-4 hover:text-accent transition-colors"
                  >
                    <span>{c.title}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 text-muted group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </HoverPreview>
          <p className="mt-4 text-xs text-muted">Udemy, 2025. Each links to the certificate.</p>
        </div>
      </div>
    </Section>
  );
}
