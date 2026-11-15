"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { contact } from "@/data/site";

const field =
  "mt-2 w-full rounded-xl border border-ink/20 bg-surface px-4 py-3.5 text-base text-ink outline-none transition placeholder:text-muted/70 hover:border-ink/40 focus:border-accent focus:ring-4 focus:ring-accent/15";

const label = "block font-mono text-xs text-muted";

const fieldLabel = "block text-sm font-medium";

const row =
  "group/row flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // No backend: the form opens the visitor's email app with the message filled in.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "") || "Hello from your portfolio";
    const message = String(data.get("message") ?? "");
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is still on screen to select */
    }
  };

  return (
    <section id="contact" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <h2 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]">
          Hiring, or have a project? <span className="text-accent">Let&apos;s talk.</span>
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          Send a message and I&apos;ll reply within a couple of days.
        </p>

        <div className="mt-16 grid gap-14 border-t border-ink/80 pt-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className={label}>Reach me directly</p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              <li>
                <a href={`mailto:${contact.email}`} className={row}>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">Email</span>
                    <span className="block break-all font-display text-lg font-medium">{contact.email}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className={row}>
                  <span>
                    <span className="block text-xs text-muted">Phone</span>
                    <span className="block font-display text-lg font-medium">{contact.phone}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </li>
              <li>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className={row}>
                  <span className="font-display text-lg font-medium">GitHub</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={row}>
                  <span className="font-display text-lg font-medium">LinkedIn</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={copy}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span aria-live="polite">{copied ? "Email copied" : "Copy email address"}</span>
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 lg:col-span-7">
            <p className={label}>Or write a message</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={fieldLabel}>Name</label>
                <input id="name" name="name" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className={fieldLabel}>Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className={fieldLabel}>Subject</label>
              <input id="subject" name="subject" className={field} placeholder="Job opening, project idea…" />
            </div>
            <div>
              <label htmlFor="message" className={fieldLabel}>Message</label>
              <textarea id="message" name="message" required rows={6} className={`${field} resize-y`} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-6 font-medium text-bg transition-opacity hover:opacity-85"
              >
                Send message <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="text-sm text-muted" role="status">
                {sent
                  ? "Your email app should have opened. If not, use the address on this page."
                  : "This opens your email app with the message filled in."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
