"use client";

import { useState } from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { contact } from "@/data/site";

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition";

export function Contact() {
  const [sent, setSent] = useState(false);

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

  return (
    <Section
      id="contact"
      title="Let's talk"
      intro="Hiring for a role or have a project in mind? Send a message and I'll reply within a couple of days."
    >
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-4">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 hover:border-ink/30 transition-colors"
          >
            <Mail className="w-5 h-5 text-accent" />
            <span>
              <span className="block text-xs text-muted">Email</span>
              {contact.email}
            </span>
          </a>
          <a
            href={contact.phoneHref}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 hover:border-ink/30 transition-colors"
          >
            <Phone className="w-5 h-5 text-accent" />
            <span>
              <span className="block text-xs text-muted">Phone</span>
              {contact.phone}
            </span>
          </a>
          <div className="flex gap-3 pt-2">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:bg-surface transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:bg-surface transition-colors"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-7 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
              <input id="name" name="name" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Subject</label>
            <input id="subject" name="subject" className={field} placeholder="Job opening, project idea…" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
            <textarea id="message" name="message" required rows={5} className={`${field} resize-y`} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-accent-ink hover:opacity-90 transition-opacity"
            >
              Send message
            </button>
            <p className="text-sm text-muted" role="status">
              {sent
                ? "Your email app should have opened. If not, write to the address on the left."
                : "This opens your email app with the message filled in."}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
