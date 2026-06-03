import Link from "next/link";
import { Icon, type IconName } from "./Icon";
import { person, site } from "@/lib/content";

const nav = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/dashboards", label: "Dashboards" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-px grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-display text-sm font-bold text-white">
              AQ
            </span>
            <span className="font-display text-sm font-semibold">{person.name}</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{person.valueProp}</p>
          <div className="flex items-center gap-2">
            {person.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-elevated text-muted transition-colors hover:text-brand"
              >
                <Icon name={s.icon as IconName} size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-faint">Navigate</p>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-muted transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-faint">Get in touch</p>
          <a href={`mailto:${person.contactEmail}`} className="text-sm text-muted transition-colors hover:text-ink">
            {person.contactEmail}
          </a>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted">
            <Icon name="pin" size={15} /> {person.location}
          </span>
          <span className="chip mt-1 w-fit border-positive/30 bg-positive/10 text-positive">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" /> {person.availability}
          </span>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {person.name}. Built with Next.js, Tailwind & Recharts.
          </p>
          <p>Logos are trademarks of their respective owners. Dashboard data is synthetic.</p>
        </div>
      </div>
    </footer>
  );
}
