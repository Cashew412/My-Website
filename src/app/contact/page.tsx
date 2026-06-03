import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { person } from "@/lib/content";

export const metadata: Metadata = {
  title: "Résumé & Contact",
  description: "Preview and download Abdullah Qatu's résumé, or get in touch about data & analytics work.",
};

export default function ContactPage() {
  return (
    <section className="container-px py-14">
      <SectionHeading
        eyebrow="Résumé & contact"
        title="Let's talk data"
        description="Preview the résumé, or send a note about the outcome you need. I usually reply within a couple of days."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* Contact + details */}
        <div className="flex flex-col gap-6">
          <Reveal className="surface-card p-6 sm:p-8">
            <h3 className="mb-1 font-display text-lg font-semibold">Send a message</h3>
            <p className="mb-6 text-sm text-muted">Tell me a bit about the problem — I&apos;ll come back with how I&apos;d approach it.</p>
            <ContactForm />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {person.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="surface-card flex items-center gap-3 p-4 transition-colors hover:border-brand"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={s.icon as IconName} size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{s.label}</span>
                  <span className="block truncate text-xs text-muted">{s.handle}</span>
                </span>
              </a>
            ))}
            <div className="surface-card flex items-center gap-3 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon name="pin" size={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold">Based in</span>
                <span className="block text-xs text-muted">{person.location}</span>
              </span>
            </div>
          </div>

          <Reveal className="surface-card flex flex-col gap-3 bg-brand p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Prefer a quick call?</h3>
              <p className="text-sm text-white/85">Book a 30-minute intro to scope your data challenge.</p>
            </div>
            <a
              href={`mailto:${person.contactEmail}?subject=${encodeURIComponent("Intro call request (30 min)")}&body=${encodeURIComponent("Hi Abdullah,\n\nI'd like to book a 30-minute intro call to discuss a data challenge.\n\nA few times that work for me:\n- \n- \n\nThanks!")}`}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/25"
            >
              Book a chat <Icon name="arrow-up-right" size={15} />
            </a>
          </Reveal>
        </div>

        {/* Résumé preview */}
        <Reveal className="surface-card flex flex-col overflow-hidden lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-3 border-b border-border p-4">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name="doc" size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">Résumé</p>
                <p className="text-xs text-faint">PDF · 1 page</p>
              </div>
            </div>
            <a href={person.resume} download className="btn-primary h-9 px-4 py-0 text-xs">
              <Icon name="download" size={14} /> Download
            </a>
          </div>
          <iframe src={`${person.resume}#view=FitH`} title="Résumé preview" className="h-[640px] w-full bg-elevated" />
        </Reveal>
      </div>
    </section>
  );
}
