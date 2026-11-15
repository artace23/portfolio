import { ArrowRight, FileText } from "lucide-react";
import { contact } from "@/data/site";
import { HeroGlobe } from "@/components/ui/HeroGlobe";

// Kept short so each cell fits on one or two lines at every width.
const proof = [
  { label: "Software Engineer", detail: "DSG Son's Group, full-time" },
  { label: "Best Presenter", detail: "CCCIS 2025, Hong Kong" },
  { label: "Remote contracts", detail: "Israel and USA" },
  { label: "Freelancing", detail: "Since 2022" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 md:pt-36 lg:pt-48 pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7" data-hero="a">
            <h1 className="font-display font-semibold tracking-[-0.035em] leading-[0.95] text-[clamp(2.75rem,12vw,4rem)] sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[5rem]">
              I build web and mobile apps for{" "}
              <span className="text-accent">real businesses.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg text-muted leading-relaxed">
              I work with Next.js, React Native and Laravel from the Philippines, and I&apos;ve
              built for teams in Israel and the USA. Right now I&apos;m a software engineer at DSG
              Son&apos;s Group, with an app live on the App Store.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-6 font-medium text-bg hover:opacity-85 active:scale-[0.98] transition"
              >
                See my work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-lg border border-ink/25 px-6 font-medium hover:border-ink hover:bg-surface transition-colors"
              >
                Hire me
              </a>
              <a
                href={contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-lg px-3 font-medium text-muted hover:text-ink transition-colors"
              >
                <FileText className="w-4 h-4" /> Resume
              </a>
            </div>
          </div>

          <div className="contents lg:col-span-5 lg:block lg:self-end">
            <HeroGlobe />
          </div>
        </div>

        <dl data-hero="c" className="mt-20 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/80 pt-6 lg:grid-cols-4">
          {proof.map((p) => (
            <div key={p.label}>
              <dt className="font-mono text-xs text-muted">{p.detail}</dt>
              <dd className="mt-1.5 font-display text-lg font-semibold tracking-tight">{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
