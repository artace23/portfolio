import { contact } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row gap-4 justify-between text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Art Dela Cruz</p>
        <p className="flex gap-5">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href={`mailto:${contact.email}`} className="hover:text-ink">Email</a>
        </p>
      </div>
    </footer>
  );
}
