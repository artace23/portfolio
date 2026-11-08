"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { contact } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">
          Art Dela Cruz
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-7 text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-9 items-center rounded-full border border-line px-4 text-sm hover:bg-surface transition-colors"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-ink hover:opacity-90 transition-opacity"
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
          <div className="mx-auto max-w-6xl px-5 py-3 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-muted hover:text-ink border-b border-line last:border-0"
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
