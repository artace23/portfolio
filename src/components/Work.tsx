import Image from "next/image";
import { ArrowUpRight, Github, Smartphone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HoverPreview } from "@/components/ui/HoverPreview";
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
  if (p.stack.includes("Web") && p.stack.includes("Mobile")) return "Web + Mobile";
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
}: {
  project: Project;
  ratio: string;
  sizes: string;
}) {
  const href = project.live ?? project.store ?? project.code;
  const frame = (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent/10 blur-2xl transition-colors duration-500 group-hover/shot:bg-accent/20"
      />
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-34px_rgba(0,0,0,0.45)]">
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

// Show this many rows up front; the rest sit behind a native <details> (no client JS).
const LIST_LIMIT = 6;

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li
      data-preview={index}
      className="grid gap-x-8 gap-y-3 py-5 transition-colors md:-mx-4 md:grid-cols-12 md:items-center md:px-4 md:hover:bg-surface"
    >
      <div className="md:col-span-5">
        <h4 className="font-semibold">{project.title}</h4>
        <p className="text-sm text-muted">{project.tagline}</p>
      </div>
      <p className="font-mono text-xs leading-relaxed text-muted md:col-span-4">
        {project.stack.join(" · ")}
      </p>
      <div className="md:col-span-3 md:flex md:justify-end">
        <Links project={project} />
      </div>
    </li>
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
        <HoverPreview items={more.map(({ title, image, fit }) => ({ title, image, fit }))}>
          <ul className="divide-y divide-line border-y border-line">
            {more.slice(0, LIST_LIMIT).map((p, i) => (
              <ProjectRow key={p.title} project={p} index={i} />
            ))}
          </ul>
          {more.length > LIST_LIMIT && (
            <details className="group/more">
              <summary className="flex cursor-pointer list-none items-center justify-center gap-2 border-b border-line py-4 text-sm font-medium text-accent hover:underline underline-offset-4 group-open/more:hidden [&::-webkit-details-marker]:hidden">
                Show {more.length - LIST_LIMIT} more projects
              </summary>
              <ul className="divide-y divide-line border-b border-line">
                {more.slice(LIST_LIMIT).map((p, i) => (
                  <ProjectRow key={p.title} project={p} index={LIST_LIMIT + i} />
                ))}
              </ul>
            </details>
          )}
        </HoverPreview>
      </div>
    </Section>
  );
}
