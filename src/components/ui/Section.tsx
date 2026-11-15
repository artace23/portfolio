import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 border-t border-line", className)}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 md:mb-16 grid gap-4 md:grid-cols-12 md:items-end md:gap-10">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1] md:col-span-7">
            {title}
          </h2>
          {intro && <p className="text-muted text-lg leading-relaxed md:col-span-5">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
