import Image from "next/image";
import { ArrowUpRight, Github, Smartphone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { featured, more, type Project } from "@/data/site";

function Links({ project }: { project: Project }) {
  if (!project.live && !project.store && !project.code) return null;
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
      {project.store && (
        <a
          href={project.store}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4"
        >
          <Smartphone className="w-4 h-4" /> View on App Store <ArrowUpRight className="w-4 h-4" />
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

// "Web app", "Mobile app", or "Mobile + IoT", read from the stack so it can't drift from the facts.
function kindOf(p: Project) {
  const mobile = p.stack.some((s) => /react native|cordova|expo|ios/i.test(s));
  const iot = p.stack.some((s) => /iot/i.test(s));
  if (mobile && iot) return "Mobile + IoT";
  return mobile ? "Mobile app" : "Web app";
}

// Short address for the window bar: the live host, or the repo path.
function addressOf(p: Project) {
  const href = p.live ?? p.store ?? p.code;
  if (!href) return p.title.toLowerCase();
  try {
    const u = new URL(href);
    const path = u.pathname.replace(/\/$/, "");
    return u.hostname.replace(/^www\./, "") + (p.live || p.store ? "" : path);
  } catch {
    return p.title.toLowerCase();
  }
}

// One window-style frame for every screenshot so the projects read as a set.
// The address bar, glow and kind label give each one the same polish. Links to the live site or code.
function Shot({
  project,
  ratio,
  sizes,
  compact = false,
}: {
  project: Project;
  ratio: string;
  sizes: string;
  compact?: boolean;
}) {
  const href = project.live ?? project.store ?? project.code;
  const frame = (
    <div className="relative">
      {!compact && (
        <div
          aria-hidden
          className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent/10 blur-2xl transition-colors duration-500 group-hover/shot:bg-accent/20"
        />
      )}
      <div
        className={`overflow-hidden border-line bg-surface ${
          compact ? "border-b" : "rounded-2xl border shadow-[0_24px_60px_-34px_rgba(0,0,0,0.45)]"
        }`}
      >
        <div className="flex items-center gap-1.5 border-b border-line bg-bg px-3 h-8">
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="ml-2 truncate font-mono text-[11px] text-muted">{addressOf(project)}</span>
          <span className="ml-auto shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            {kindOf(project)}
          </span>
        </div>
        <div className={`relative ${ratio}`}>
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes={sizes}
            className={`${
              project.fit === "contain" ? "object-contain p-3" : "object-cover object-top"
            } transition-transform duration-500 group-hover/shot:scale-[1.02]`}
          />
        </div>
      </div>
    </div>
  );
  if (!href) return frame;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title} ${project.live ? "live site" : project.store ? "App Store listing" : "source code"}`}
      className="group/shot block"
    >
      {frame}
    </a>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      title="Selected work"
      intro="Four projects I'd show first, newest first, with where you can see each one."
      className="relative overflow-hidden"
    >
      {/* Soft accent wash behind the featured projects */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[420px] w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl"
      />

      <div className="space-y-20 md:space-y-28">
        {featured.map((p, i) => (
          <Reveal key={p.title}>
            <article className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Shot project={p} ratio="aspect-[16/10]" sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
              <div className="md:col-span-5 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                    <span className="text-muted"> / {String(featured.length).padStart(2, "0")}</span>
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>
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

      <div className="mt-28">
        <div className="flex items-center gap-3 mb-8">
          <h3 className="text-xl font-semibold tracking-tight">More projects</h3>
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-sm text-muted">{String(more.length).padStart(2, "0")}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {more.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 80} className="h-full">
              <article className="group/card h-full overflow-hidden rounded-2xl border border-line bg-surface flex flex-col transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.5)]">
                <Shot project={p} ratio="aspect-[16/9]" sizes="(min-width: 640px) 45vw, 100vw" compact />
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="text-sm text-muted">{p.tagline}</p>
                  </div>
                  <p className="text-sm leading-relaxed">{p.summary}</p>
                  <div className="mt-auto space-y-4">
                    <Stack items={p.stack} />
                    <Links project={p} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
