"use client";

import { useEffect, useRef } from "react";
import {
  geoOrthographic,
  geoPath,
  geoGraticule10,
  geoDistance,
  type GeoPermissibleObjects,
} from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import landTopo from "world-atlas/land-110m.json";

export type GlobePlace = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  kind: "home" | "work" | "event";
};

interface GlobeProps {
  places: GlobePlace[];
  activeId: string;
  onSelect: (id: string) => void;
  label: string;
}

const topology = landTopo as unknown as Topology;
const land = feature(topology, topology.objects.land as GeometryCollection);
const graticule = geoGraticule10();

type Palette = { ink: string; accent: string; line: string; surface: string; ok: string };

const readPalette = (): Palette => {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  return {
    ink: v("--ink", "#131314"),
    accent: v("--accent", "#2447f5"),
    line: v("--line", "#e6e4df"),
    surface: v("--surface", "#ffffff"),
    ok: v("--ok", "#16a34a"),
  };
};

const rgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

const SPIN_DEG_PER_SEC = 7; // one full turn in about 51 seconds
const SPIN_DELAY_MS = 2500; // pause after focusing a place before spinning again
const IDLE_TILT = -18;

const angleDiff = (to: number, from: number) => ((to - from + 540) % 360) - 180;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function Globe({ places, activeId, onSelect, label }: GlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live values read inside the animation loop, so changing them never restarts it.
  const activeRef = useRef(activeId);
  const selectRef = useRef(onSelect);
  const placesRef = useRef(places);
  const rot = useRef({ l: 0, p: 0 });
  const target = useRef({ l: 0, p: 0 });
  const size = useRef(320);
  const hits = useRef<{ id: string; x: number; y: number }[]>([]);
  const snap = useRef(false);
  // When the globe last turned toward a place or was touched. Idle spin resumes a few seconds later.
  const focusAt = useRef(0);

  useEffect(() => {
    selectRef.current = onSelect;
    placesRef.current = places;
  }, [onSelect, places]);

  // Point the globe at the active place.
  useEffect(() => {
    activeRef.current = activeId;
    focusAt.current = performance.now();
    const p = places.find((x) => x.id === activeId);
    if (p) target.current = { l: -p.lng, p: -p.lat };
  }, [activeId, places]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let palette = readPalette();
    let raf = 0;
    let running = false;
    let last = performance.now();
    let dragging = false;
    let hovering = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;

    const first = placesRef.current.find((x) => x.id === activeRef.current) ?? placesRef.current[0];
    if (first) {
      target.current = { l: -first.lng, p: -first.lat };
      // Start a quarter turn away so the globe spins into place on load.
      rot.current = { l: target.current.l + (reduceMotion ? 0 : 110), p: target.current.p * 0.4 };
    }

    const resize = () => {
      const w = Math.max(160, Math.round(wrap.clientWidth));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.current = w;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${w}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const w = size.current;
      const r = w / 2 - 6;
      const c = w / 2;
      const projection = geoOrthographic()
        .scale(r)
        .translate([c, c])
        .clipAngle(90)
        .rotate([rot.current.l, rot.current.p]);
      const path = geoPath(projection, ctx);
      const center: [number, number] = [-rot.current.l, -rot.current.p];

      ctx.clearRect(0, 0, w, w);

      // Ocean
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = rgba(palette.surface, 1);
      ctx.fill();

      // Graticule and land
      ctx.beginPath();
      path(graticule as GeoPermissibleObjects);
      ctx.strokeStyle = rgba(palette.ink, 0.07);
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      path(land as GeoPermissibleObjects);
      ctx.fillStyle = rgba(palette.ink, 0.15);
      ctx.fill();
      ctx.strokeStyle = rgba(palette.ink, 0.3);
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Edge
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.strokeStyle = rgba(palette.ink, 0.35);
      ctx.lineWidth = 1;
      ctx.stroke();

      const all = placesRef.current;
      const home = all.find((p) => p.kind === "home");

      // Arcs from home to every other place
      if (home) {
        ctx.setLineDash([3, 5]);
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = rgba(palette.accent, 0.75);
        for (const p of all) {
          if (p.id === home.id) continue;
          ctx.beginPath();
          path({
            type: "LineString",
            coordinates: [
              [home.lng, home.lat],
              [p.lng, p.lat],
            ],
          });
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // Markers
      const found: { id: string; x: number; y: number }[] = [];
      let activeSpot: { x: number; y: number; name: string } | null = null;
      for (const p of all) {
        if (geoDistance([p.lng, p.lat], center) > Math.PI / 2 - 0.03) continue;
        const pt = projection([p.lng, p.lat]);
        if (!pt) continue;
        const [x, y] = pt;
        found.push({ id: p.id, x, y });
        const isActive = p.id === activeRef.current;
        const color = p.kind === "event" ? palette.ok : palette.accent;

        if (isActive && !reduceMotion) {
          const phase = (now / 1400) % 1;
          ctx.beginPath();
          ctx.arc(x, y, 6 + phase * 16, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(color, 0.6 * (1 - phase));
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x, y, isActive ? 6.5 : 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = rgba(palette.surface, 1);
        ctx.stroke();
        if (isActive) activeSpot = { x, y, name: p.name };
      }
      hits.current = found;

      // Label for the active place
      if (activeSpot) {
        ctx.font = "600 12px system-ui, sans-serif";
        const text = activeSpot.name;
        const tw = ctx.measureText(text).width;
        const bw = tw + 16;
        // Sit below and to the right of the pin so neighbouring pins stay visible.
        const bx = clamp(activeSpot.x + 10, 4, w - bw - 4);
        const by = activeSpot.y + 34 > w - 4 ? activeSpot.y - 34 : activeSpot.y + 12;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, 22, 11);
        ctx.fillStyle = palette.ink;
        ctx.fill();
        ctx.fillStyle = palette.surface;
        ctx.textBaseline = "middle";
        ctx.fillText(text, bx + 8, by + 11.5);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) {
        const idle = !reduceMotion && !hovering && now - focusAt.current > SPIN_DELAY_MS;
        if (idle) {
          // Endless slow rotation, with a gentle tilt so the globe reads as a planet.
          rot.current.l += SPIN_DEG_PER_SEC * dt;
          rot.current.p += (IDLE_TILT - rot.current.p) * (1 - Math.exp(-dt * 1.2));
          target.current = { ...rot.current };
        } else {
          const k = reduceMotion || snap.current ? 1 : 1 - Math.exp(-dt * 4.5);
          rot.current.l += angleDiff(target.current.l, rot.current.l) * k;
          rot.current.p += (target.current.p - rot.current.p) * k;
        }
        snap.current = false;
      }
      draw(now);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const pick = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      let best: string | null = null;
      let bestD = 18;
      for (const h of hits.current) {
        const d = Math.hypot(h.x - x, h.y - y);
        if (d < bestD) {
          bestD = d;
          best = h.id;
        }
      }
      return best;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) {
        canvas.style.cursor = pick(e.clientX, e.clientY) ? "pointer" : "grab";
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      const k = 180 / size.current;
      rot.current.l += dx * k * 0.6;
      rot.current.p = clamp(rot.current.p - dy * k * 0.6, -75, 75);
      target.current = { ...rot.current };
      canvas.style.cursor = "grabbing";
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      focusAt.current = performance.now();
      if (moved < 5) {
        const id = pick(e.clientX, e.clientY);
        if (id) selectRef.current(id);
      }
      canvas.style.cursor = "grab";
    };
    const onCancel = () => {
      dragging = false;
      focusAt.current = performance.now();
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      focusAt.current = performance.now();
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.01 }
    );
    const resizeObserver = new ResizeObserver(resize);
    const refreshPalette = () => {
      palette = readPalette();
    };
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const attrObserver = new MutationObserver(refreshPalette);

    resize();
    observer.observe(wrap);
    resizeObserver.observe(wrap);
    media.addEventListener("change", refreshPalette);
    attrObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onCancel);
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.style.cursor = "grab";

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      attrObserver.disconnect();
      media.removeEventListener("change", refreshPalette);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full aspect-square">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="block touch-pan-y select-none"
      />
    </div>
  );
}
