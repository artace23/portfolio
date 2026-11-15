import Image from "next/image";
import { ArrowUpRight, Github, Smartphone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { HoverPreview } from "@/components/ui/HoverPreview";
import { featured, more, type Project } from "@/data/site";

function Links({ project, strong }: { project: Project; strong?: boolean }) {
  if (!project.live && !project.store && !project.code) return null;
  const main = strong
    ? "inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-bg hover:opacity-85 transition-opacity"
    : "inline-flex items-center gap-1 text-accent hover:underline underline-offset-4";
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className={main}>
          Live site <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
      {project.store && (
        <a href={project.store} target="_blank" rel="noopener noreferrer" className={main}>
          <Smartphone className="w-4 h-4" /> View on the App Store <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
      {project.code && (
        <a
          href={project.code}
          target="_blank"
          rel="noopener noreferrer"
          className={
            strong && !project.live && !project.store
              ? main
              : "inline-flex items-center gap-1.5 text-muted hover:text-ink"
          }
        >
          <Github className="w-4 h-4" /> Source code
        </a>
      )}
    </div>
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

function Shot({ project }: { project: Project }) {
  const href = project.live ?? project.store ?? project.code;
  const frame = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface">
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes="(min-width: 1024px) 600px, 100vw"
        className={`${
          project.fit === "contain" ? "object-contain p-3" : "object-cover object-top"
        } transition-transform duration-500 group-hover/shot:scale-[1.02]`}
      />
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

function FeaturedCard({ project: p, index: i }: { project: Project; index: number }) {
  const flip = i % 2 === 1;
  return (
    <article className="grid items-center gap-x-14 gap-y-8 py-14 lg:grid-cols-12">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Shot project={p} />
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="font-mono text-xs text-muted">
          {String(i + 1).padStart(2, "0")} &mdash; {kindOf(p)}
          {p.badge && <span className="text-ink"> &middot; {p.badge}</span>}
        </p>

        <h3 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-none">
          {p.title}
        </h3>
        <p className="mt-3 text-lg text-muted">{p.tagline}</p>

        <p className="mt-6 max-w-[34rem] leading-relaxed">{p.summary}</p>

        {p.results && (
          <p className="mt-5 text-sm text-muted">
            {p.results.map((r, k) => (
              <span key={r.label}>
                {k > 0 && " · "}
                <span className="font-semibold text-ink tabular-nums">{r.value}</span> {r.label}
              </span>
            ))}
          </p>
        )}

        <p className="mt-6 font-mono text-xs text-muted">{p.stack.join(" / ")}</p>

        <div className="mt-6">
          <Links project={p} />
        </div>
      </div>
    </article>
  );
}

// Show this many rows up front; the rest sit behind a native <details> (no client JS).
const LIST_LIMIT = 6;

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li
      data-preview={index}
      className="grid items-center gap-x-4 gap-y-2 py-5 transition-colors md:-mx-4 md:grid-cols-12 md:gap-x-8 md:px-4 md:hover:bg-surface"
    >
      <div className="md:col-span-4">
        <h4 className="font-display text-lg font-semibold tracking-tight">{project.title}</h4>
        <p className="text-sm text-muted">{project.tagline}</p>
      </div>
      <p className="font-mono text-xs leading-relaxed text-muted md:col-span-5">
        {project.stack.join(" / ")}
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
      intro="Four projects I'd show first. Each one links to where you can see it running or read the code."
    >
      <div className="divide-y divide-line border-y border-ink/80">
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <div className="mt-24">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">More projects</h3>
          <span className="font-mono text-sm text-muted">{String(more.length).padStart(2, "0")}</span>
        </div>
        <HoverPreview items={more.map(({ title, image, fit }) => ({ title, image, fit }))}>
          <ul className="divide-y divide-line border-y border-ink/80">
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
