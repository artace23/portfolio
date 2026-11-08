"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Globe } from "@/components/ui/Globe";
import { experience, places } from "@/data/site";

const locOf = (place: string) => (place === "Israel" ? "il" : place === "USA" ? "us" : "ph");

const roleCount = (id: string) => experience.filter((e) => locOf(e.place) === id).length;

const dot: Record<string, string> = {
  home: "bg-accent",
  work: "bg-accent",
  event: "bg-ok",
};

export function Experience() {
  const [active, setActive] = useState("ph");
  const listRef = useRef<HTMLOListElement>(null);

  // As each role scrolls through the middle of the screen, point the globe at it.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.loc;
            if (id) setActive(id);
          }
        }
      },
      { rootMargin: "-42% 0px -50% 0px" }
    );
    list.querySelectorAll("li[data-loc]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = places.find((p) => p.id === active) ?? places[0];

  return (
    <Section
      id="experience"
      title="Where I've worked"
      intro="I work remotely from the Philippines, with contract work for companies in Israel and the USA. Scroll through the roles and the globe follows. You can also drag it or tap a pin."
    >
      <div className="grid md:grid-cols-12 gap-8 md:gap-14">
        {/* Globe: sticks under the header while the roles scroll past */}
        <div className="md:col-span-5 md:self-start sticky top-16 md:top-24 z-20 -mx-5 px-5 py-3 bg-bg/90 backdrop-blur md:mx-0 md:px-0 md:py-0 md:bg-transparent md:backdrop-blur-none">
          <div className="mx-auto w-[min(58vw,34vh)] md:w-full max-w-[460px]">
            <Globe
              places={places}
              activeId={active}
              onSelect={setActive}
              label="Interactive globe. Pins mark the Philippines, Israel, the United States and Hong Kong."
            />
          </div>

          <p className="mt-3 text-center md:text-left text-sm text-muted min-h-[2.5rem]" aria-live="polite">
            <span className="font-medium text-ink">{current.name}.</span> {current.note}
          </p>

          <ul className="hidden md:flex flex-wrap gap-2 mt-4">
            {places.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => setActive(p.id)}
                  aria-pressed={active === p.id}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    active === p.id ? "border-ink bg-surface" : "border-line text-muted hover:text-ink"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${dot[p.kind]}`} />
                  {p.name}
                  {p.kind === "event" ? (
                    <span className="text-xs text-muted">event</span>
                  ) : (
                    <span className="text-xs text-muted">{roleCount(p.id)}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ol ref={listRef} className="md:col-span-7 divide-y divide-line border-y border-line">
          {experience.map((e) => {
            const loc = locOf(e.place);
            return (
              <li key={e.role + e.dates} data-loc={loc} className="py-8 md:py-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                  <span className="font-mono">{e.dates}</span>
                  <span className="rounded-full border border-line px-2 py-0.5 text-xs">{e.type}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{e.role}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-muted">
                  <span>{e.org}</span>
                  <button
                    onClick={() => setActive(loc)}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 -ml-1 text-sm hover:bg-surface hover:text-ink transition-colors"
                    aria-label={`Show ${e.place} on the globe`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {e.place}
                  </button>
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
