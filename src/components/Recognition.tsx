import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { awards, certificates } from "@/data/site";

export function Recognition() {
  return (
    <Section id="recognition" title="Recognition and certificates">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-6">Recognition</h3>
          <ul className="space-y-5">
            {awards.map((a) => (
              <li key={a.title}>
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-muted leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-6">Certificates</h3>
          <ul className="space-y-3">
            {certificates.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-3 text-sm hover:text-accent transition-colors"
                >
                  <span>{c.title}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 mt-0.5 text-muted group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">Udemy, 2025. Each links to the certificate.</p>
        </div>
      </div>
    </Section>
  );
}
