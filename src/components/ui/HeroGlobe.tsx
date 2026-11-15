"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Globe } from "@/components/ui/Globe";
import { places } from "@/data/site";

// The same globe as the Experience section, shown up front so it's the first thing visitors see.
export function HeroGlobe() {
  const [active, setActive] = useState("ph");
  const current = places.find((p) => p.id === active) ?? places[0];

  return (
    <>
      {/* The globe is a large backdrop pinned to the right edge of the hero, with about a third of it
          running off screen. It sits under the text. On phones it is a faint, non-interactive
          decoration. */}
      <div
        data-hero="b"
        className="pointer-events-none absolute right-0 top-1/2 -z-10 -translate-y-1/2 translate-x-[38%] lg:pointer-events-auto"
        style={{ width: "clamp(380px, min(54vw, 72svh), 760px)" }}
      >
        <div className="relative opacity-30 lg:opacity-100" data-hero-globe>
          <svg
            aria-hidden
            viewBox="0 0 800 800"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 text-ink"
            style={{ maxWidth: "none" }}
          >
            <g fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
              <circle cx="400" cy="400" r="300" />
              <circle cx="400" cy="400" r="360" strokeDasharray="2 7" />
              <circle cx="400" cy="400" r="395" strokeOpacity="0.06" />
            </g>
            <g className="orbit-spin">
              <ellipse
                cx="400"
                cy="400"
                rx="380"
                ry="130"
                transform="rotate(-24 400 400)"
                fill="none"
                stroke="var(--accent)"
                strokeOpacity="0.35"
                strokeWidth="1.2"
              />
              <circle cx="780" cy="400" r="6" fill="var(--accent)" transform="rotate(-24 400 400)" />
            </g>
          </svg>
          <Globe
            places={places}
            activeId={active}
            onSelect={setActive}
            label="Interactive globe. Pins mark the Philippines, Israel, the United States and Hong Kong."
          />
        </div>
      </div>

      <div className="relative z-10 ml-auto hidden max-w-[17rem] text-right lg:block">
        <p className="min-h-[2.5rem] text-sm text-muted" aria-live="polite">
          <span className="font-medium text-ink">{current.name}.</span> {current.note}
        </p>
        <a
          href="#experience"
          className="group mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          See where I&apos;ve worked
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </>
  );
}
