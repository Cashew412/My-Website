import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { LogoBadge } from "@/components/LogoBadge";
import { CTASection } from "@/components/CTASection";
import { person, about, skillGroups, experience, education } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Abdullah Qatu — data & analytics consultant. The narrative, principles, skills, and the path from raw data to decisions.",
};

export default function AboutPage() {
  return (
    <>
      <section className="container-px py-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
              <img src={person.photo} alt={`Portrait of ${person.name}`} className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Icon name="pin" size={15} /> {person.location}
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {person.languages.map((l) => (
                  <span key={l.name} className="chip">{l.name} · {l.level}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow="About" title="The space between a vague question and a clear answer" />
            <div className="flex flex-col gap-4">
              {about.narrative.map((p, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="text-lg leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="surface-card p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">Known for</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {about.knownFor.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-positive/15 text-positive">
                      <Icon name="check" size={13} />
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="container-px py-12">
        <SectionHeading eyebrow="How I work" title="Four principles behind every project" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="surface-card flex flex-col gap-2 p-6">
              <span className="font-display text-3xl font-bold text-brand/30">0{i + 1}</span>
              <h3 className="font-display font-semibold">{p.title}</h3>
              <p className="text-sm text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="container-px py-12">
        <SectionHeading eyebrow="Toolkit" title="Skills & technologies" description="The stack I reach for across analytics engineering, BI, and data science." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.name} delay={i * 60} className="surface-card flex flex-col gap-4 p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={g.icon as IconName} size={20} />
                </span>
                <h3 className="font-display font-semibold">{g.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-px py-12">
        <SectionHeading eyebrow="Journey" title="Industries & milestones" description="A path through forensics, FMCG, gaming, and enterprise BI." />
        <div className="mt-10 flex flex-col">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 60} className="relative flex gap-5 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <LogoBadge label={e.logo} bg={e.logoBg} color={e.logoColor} img={e.img} tile={e.tile} size={48} />
                {i < experience.length + education.length - 1 && <span className="mt-2 w-px flex-1 bg-border" />}
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display font-semibold">{e.role}</h3>
                  <span className="text-sm text-brand">{e.company}</span>
                </div>
                <span className="text-xs text-faint">{e.period} · {e.industry}</span>
                <p className="mt-1 max-w-2xl text-sm text-muted">{e.summary}</p>
              </div>
            </Reveal>
          ))}
          {education.map((ed, i) => (
            <Reveal key={ed.school} delay={(experience.length + i) * 60} className="relative flex gap-5 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <LogoBadge label={ed.logo} bg={ed.logoBg} color={ed.logoColor} size={48} />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display font-semibold">{ed.degree}</h3>
                  <span className="text-sm text-brand">{ed.school}</span>
                </div>
                <span className="text-xs text-faint">{ed.period}</span>
                <p className="mt-1 text-sm text-muted">{ed.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
