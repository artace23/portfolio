import { ArrowUp } from "lucide-react";
import { contact } from "@/data/site";

export function Footer() {
  return (
    <footer className="pb-10">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row gap-4 justify-between text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Art Dela Cruz. Davao City, Philippines.</p>
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href={`mailto:${contact.email}`} className="hover:text-ink">Email</a>
          <a href="#top" className="inline-flex items-center gap-1 hover:text-ink">
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </p>
      </div>
    </footer>
  );
}
