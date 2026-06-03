"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { person } from "@/lib/content";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/dashboards", label: "Dashboards" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${person.name} — home`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-display text-sm font-bold text-white shadow-glow transition-transform group-hover:-translate-y-0.5">
            AQ
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            {person.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(l.href) ? "bg-brand-soft text-brand" : "text-muted hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={person.resume} download className="btn-primary hidden h-9 px-4 py-0 text-xs sm:inline-flex">
            <Icon name="download" size={15} /> Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-ink lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={18} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="container-px flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(l.href) ? "bg-brand-soft text-brand" : "text-muted hover:bg-elevated hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a href={person.resume} download className="btn-primary mt-2">
              <Icon name="download" size={15} /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
