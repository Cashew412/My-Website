import Link from "next/link";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { person } from "@/lib/content";

export function CTASection() {
  return (
    <section className="container-px py-20">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center shadow-card sm:px-12">
        <div className="mesh pointer-events-none absolute inset-0 opacity-80" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
          <span className="eyebrow">Let&apos;s build something measurable</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Have a data problem worth solving the right way?
          </h2>
          <p className="text-base text-muted">
            From ambiguous brief to a dashboard your team opens every morning — let&apos;s talk about the outcome you need.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/contact" className="btn-primary">
              Start a conversation <Icon name="arrow-right" size={16} />
            </Link>
            <a href={person.resume} download className="btn-ghost">
              <Icon name="download" size={16} /> Download résumé
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
