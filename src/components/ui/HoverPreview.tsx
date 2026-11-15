"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Item = { title: string; image: string; fit?: "cover" | "contain" };

const W = 320;
const H = 200;
const GAP = 24;

// Wraps the project list. Rows carry data-preview="<index>"; hovering (mouse) or focusing one
// shows that project's screenshot in a floating card next to the pointer. Touch devices
// have no hover, so nothing appears there. The rows themselves stay server-rendered.
export function HoverPreview({ items, children }: { items: Item[]; children: React.ReactNode }) {
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const place = (x: number, y: number) => {
    const el = card.current;
    if (!el) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = x + GAP;
    if (left + W > vw - 12) left = x - GAP - W;
    const top = Math.min(Math.max(y - H / 2, 12), vh - H - 12);
    el.style.transform = `translate3d(${Math.max(left, 12)}px, ${top}px, 0)`;
  };

  const indexOf = (target: EventTarget | null) => {
    const row = (target as HTMLElement | null)?.closest?.("[data-preview]");
    if (!row) return null;
    const i = Number(row.getAttribute("data-preview"));
    return Number.isNaN(i) ? null : { i, row };
  };

  return (
    <div
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const hit = indexOf(e.target);
        if (!hit) return setActive(null);
        place(e.clientX, e.clientY);
        setActive(hit.i);
      }}
      onPointerLeave={() => setActive(null)}
      onFocus={(e) => {
        const hit = indexOf(e.target);
        if (!hit) return;
        const r = hit.row.getBoundingClientRect();
        place(r.left + r.width * 0.55, r.top + r.height / 2);
        setActive(hit.i);
      }}
      onBlur={() => setActive(null)}
    >
      {children}

      <div
        ref={card}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ width: W, height: H, transform: "translate3d(-999px,0,0)" }}
      >
        <div
          className={`relative h-full w-full overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] transition duration-200 ${
            active === null ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {items.map((it, i) => (
            <Image
              key={it.title}
              src={it.image}
              alt=""
              fill
              sizes="320px"
              loading="eager"
              className={`${
                it.fit === "contain" ? "object-contain p-2" : "object-cover object-top"
              } transition-opacity duration-150 ${active === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
