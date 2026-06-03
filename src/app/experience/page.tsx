import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { LogoBadge } from "@/components/LogoBadge";
import { CTASection } from "@/components/CTASection";
import { experience, education } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: "Roles and measurable impact across EY, Nestlé, Babil Games, and Advanced Business Solutions.",
};

export default function ExperiencePage() {
  return (
    <>
      <section className="container-px py-14">
        <SectionHeading
          eyebrow="Experience"
          title="Impact, not job descriptions"
          description="Four roles across very different industries — each focused on the outcome delivered and the scope owned."
        />

        <div className="mt-10 flex flex-col gap-5">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 60} className="surface-card overflow-hidden">
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[260px_1fr]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <LogoBadge label={e.logo} bg={e.logoBg} color={e.logoColor} img={e.img} tile={e.tile} size={52} />
                    <div>
                      <p className="font-display text-lg font-semibold leading-tight">{e.company}</p>
                      <p className="text-xs text-faint">{e.industry}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-ink">{e.role}</p>
                    <span className="inline-flex w-fit items-center gap-1.5 text-xs text-muted">
                      <Icon name="target" size={13} /> {e.period}
                    </span>
                    {e.current && (
                      <span className="chip mt-1 w-fit border-positive/30 bg-positive/10 text-positive">
                        <span className="h-1.5 w-1.5 rounded-full bg-positive" /> Current
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="text-sm leading-relaxed text-muted">{e.summary}</p>
                  <ul className="grid gap-3">
                    {e.impact.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-ink/90">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                          <Icon name="arrow-up-right" size={12} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-faint">Tools &amp; methods</span>
                    <div className="flex flex-wrap gap-2">
                      {e.tools.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px py-8">
        <SectionHeading eyebrow="Education" title="Foundations" />
        <div className="mt-8 grid gap-4">
          {education.map((ed) => (
            <Reveal key={ed.school} className="surface-card flex items-center gap-5 p-6">
              <LogoBadge label={ed.logo} bg={ed.logoBg} color={ed.logoColor} size={52} />
              <div>
                <p className="font-display font-semibold">{ed.degree}</p>
                <p className="text-sm text-brand">{ed.school}</p>
                <p className="text-xs text-faint">{ed.period} · {ed.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
