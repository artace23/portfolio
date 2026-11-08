import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { skills } from "@/data/site";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface max-w-sm">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Art Dela Cruz"
              fill
              sizes="(min-width: 768px) 30vw, 80vw"
              className="object-cover object-[50%_10%]"
            />
          </div>
        </div>
        <div className="md:col-span-8 space-y-5 text-lg leading-relaxed">
          <p>
            I started out making small websites for local businesses in 2022 and kept going from
            there. Today I&apos;m a software engineer at DSG Son&apos;s Group, building internal
            web systems and mobile apps, and I take on freelance projects alongside.
          </p>
          <p className="text-muted">
            My main tools are Next.js, React Native and Laravel. My capstone, SmarTrax, a bike
            rental app that unlocks real hardware over QR, won Best Presenter at CCCIS 2025 in Hong
            Kong. I&apos;m looking for a full-time role where I can keep working across web and
            mobile.
          </p>

          <dl className="pt-4 grid sm:grid-cols-2 gap-x-8 gap-y-6 text-base">
            {skills.map((g) => (
              <div key={g.group}>
                <dt className="text-sm font-medium">{g.group}</dt>
                <dd className="mt-1 text-muted">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </Section>
  );
}
