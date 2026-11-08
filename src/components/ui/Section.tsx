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
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          {intro && <p className="mt-3 text-muted text-lg leading-relaxed">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
