"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { contact } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Highlight the section being read, and firm up the header once the page has moved.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-line bg-bg/85 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.5)]"
          : "border-transparent bg-bg/40"
      }`}
    >
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Art Dela Cruz
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => {
            const on = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={on ? "true" : undefined}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  on ? "bg-ink/[0.07] text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-9 items-center rounded-lg border border-line px-4 text-sm hover:bg-surface transition-colors"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex h-9 items-center rounded-lg bg-ink px-4 text-sm font-medium text-bg hover:opacity-85 transition-opacity"
          >
            Hire me
          </a>
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center -mr-2 text-muted"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="md:hidden border-t border-line bg-bg">
          <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 py-3 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-xl text-ink border-b border-line"
              >
                {l.label}
              </a>
            ))}
            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-muted hover:text-ink"
            >
              Resume (PDF)
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
