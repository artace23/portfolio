import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { skills } from "@/data/site";

export function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-4">
          <figure className="max-w-sm md:sticky md:top-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
              <Image
                src="/images/profile.jpg"
                alt="Portrait of Art Dela Cruz"
                fill
                sizes="(min-width: 768px) 30vw, 80vw"
                className="object-cover object-[50%_10%]"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink/80 pt-3 text-sm">
              <span className="font-medium">Art Dela Cruz</span>
              <span className="font-mono text-xs text-muted">
                Software engineer
              </span>
            </figcaption>
          </figure>
        </div>
        <div className="md:col-span-8">
          <p className="font-display text-2xl sm:text-3xl font-medium leading-snug tracking-tight">
            I started out making small websites for local businesses in 2022 and
            kept going from there.
          </p>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted max-w-2xl">
            <p>
              Today I&apos;m a software engineer at DSG Son&apos;s Group,
              building internal web systems and mobile apps, and I take on
              freelance projects alongside. My main tools are Next.js, React
              Native and Laravel.
            </p>
            <p>
              My capstone, SmarTrax, a bike rental app that unlocks real
              hardware over QR, won Best Presenter at CCCIS 2025 in Hong Kong.
              I&apos;m looking for a full-time role where I can keep working
              across web and mobile.
            </p>
          </div>

          <dl className="mt-12 border-t border-ink/80">
            {skills.map((g) => (
              <div
                key={g.group}
                className="grid gap-1.5 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:items-baseline"
              >
                <dt className="font-mono text-xs text-muted">{g.group}</dt>
                <dd className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-lg leading-snug tracking-tight">
                  {g.items.map((s, i) => (
                    <span key={s} className="inline-flex items-baseline gap-2">
                      {i > 0 && (
                        <span aria-hidden className="text-accent">
                          /
                        </span>
                      )}
                      <span>{s}</span>
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
