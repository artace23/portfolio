import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { contact } from "@/data/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { HeroGlobe } from "@/components/ui/HeroGlobe";

// Kept short so each cell fits on one or two lines at every width.
const proof = [
  { label: "Software Engineer", detail: "DSG Son's Group" },
  { label: "Best Presenter", detail: "CCCIS 2025, Hong Kong" },
  { label: "Remote contracts", detail: "Israel and USA" },
  { label: "Freelancing", detail: "Since 2022" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24">
      {/* Soft accent glow behind the globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 -z-10 h-[460px] w-[460px] rounded-full bg-accent/15 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <Image
                src="/images/profile.jpg"
                alt="Portrait of Art Dela Cruz"
                width={56}
                height={56}
                priority
                className="h-14 w-14 shrink-0 rounded-full object-cover object-[50%_12%] border border-line"
              />
              <p className="inline-flex items-center gap-2 text-sm text-muted">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
                </span>
                Open to full-time roles and freelance projects
              </p>
            </div>

            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.08]">
              I build web and mobile apps for real businesses.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
              I&apos;m Art, a full-stack developer in the Philippines. I work with Next.js, React
              Native and Laravel, and I&apos;ve built for teams in Israel and the USA. I&apos;m
              currently a software engineer at DSG Son&apos;s Group.
            </p>
            <div className="mt-4">
              <LocalTime />
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-ink hover:opacity-90 active:scale-[0.98] transition"
              >
                See my work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full border border-line bg-surface px-6 font-medium hover:border-ink/30 transition-colors"
              >
                Hire me
              </a>
              <a
                href={contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full px-4 font-medium text-muted hover:text-ink transition-colors"
              >
                <FileText className="w-4 h-4" /> Resume
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroGlobe />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {proof.map((p) => (
            <div key={p.label} className="bg-surface p-5">
              <dt className="font-medium">{p.label}</dt>
              <dd className="mt-1 text-sm text-muted">{p.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
