import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { featured, more, type Project } from "@/data/site";

function Links({ project }: { project: Project }) {
  if (!project.live && !project.code) return null;
  return (
    <div className="flex flex-wrap gap-4 text-sm font-medium">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4"
        >
          Live site <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
      {project.code && (
        <a
          href={project.code}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
        >
          <Github className="w-4 h-4" /> Source code
        </a>
      )}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted font-mono">
          {s}
        </li>
      ))}
    </ul>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      title="Selected work"
      intro="Three projects I'd show first, with the part I played and where you can see them."
    >
      <div className="space-y-16 md:space-y-24">
        {featured.map((p, i) => (
          <Reveal key={p.title}>
          <article className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5 space-y-5">
              {p.badge && (
                <p className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {p.badge}
                </p>
              )}
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-muted">{p.tagline}</p>
              </div>
              <p className="leading-relaxed">{p.summary}</p>
              {p.highlights && (
                <ul className="space-y-2 text-sm text-muted">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <Stack items={p.stack} />
              <Links project={p} />
            </div>
          </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-24">
        <h3 className="text-xl font-semibold tracking-tight mb-6">More projects</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {more.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 80} className="h-full">
            <article className="h-full rounded-2xl border border-line bg-surface p-6 flex flex-col gap-4 hover:border-ink/25 transition-colors">
              <div>
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm text-muted">{p.tagline}</p>
              </div>
              <p className="text-sm leading-relaxed">{p.summary}</p>
              <div className="mt-auto space-y-4">
                <Stack items={p.stack} />
                <Links project={p} />
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
