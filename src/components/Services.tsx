import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services, process } from "@/data/site";

export function Services() {
  return (
    <Section
      id="services"
      title="What I can build for you"
      intro="For companies hiring and for people with a project of their own."
    >
      <div className="grid sm:grid-cols-2 border-t border-ink/80">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 80} className="h-full">
            <div
              className={`h-full border-b border-line py-7 ${
                i % 2 === 0 ? "sm:pr-10 sm:border-r" : "sm:pl-10"
              }`}
            >
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-muted leading-relaxed">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">How a project works</h3>
        <ol className="mt-8 grid gap-x-10 gap-y-8 border-t border-ink/80 pt-6 md:grid-cols-3">
          {process.map((p) => (
            <li key={p.step}>
              <span className="font-mono text-xs text-accent">{p.step}</span>
              <h4 className="mt-2 font-display text-lg font-semibold">{p.title}</h4>
              <p className="mt-1 text-muted leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ol>
        <a
          href="#contact"
          className="group mt-10 inline-flex items-center gap-2 font-medium text-accent hover:underline underline-offset-4"
        >
          Start a project
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </Section>
  );
}
