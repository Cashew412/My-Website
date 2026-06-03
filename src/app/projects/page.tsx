import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies in supply-chain analytics, machine learning, and enterprise BI — context, approach, and measurable impact.",
};

const cover: Record<string, string> = {
  accent: "from-brand/25 via-accent/20 to-transparent",
  violet: "from-[#e0a500]/30 via-amber-400/20 to-transparent",
  sky: "from-[#0ea5e9]/25 via-accent/15 to-transparent",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="container-px py-14">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work, told as case studies"
          description="Each project follows the same arc — context, problem, approach, solution, impact, and what I'd do next."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link
                href={`/projects/${p.slug}`}
                className="surface-card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className={`relative h-44 bg-gradient-to-br ${cover[p.cover] ?? cover.accent}`}>
                  <div className="grid-fade absolute inset-0 opacity-50" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="chip bg-bg/70 backdrop-blur">{p.industry}</span>
                      {p.featured && (
                        <span className="chip border-brand/30 bg-brand text-white">Featured</span>
                      )}
                    </div>
                    <div className="flex items-end gap-2">
                      {p.metrics.map((m) => (
                        <div key={m.label} className="rounded-xl border border-border bg-bg/80 px-3 py-2 backdrop-blur">
                          <p className="font-display text-lg font-bold text-brand">{m.value}</p>
                          <p className="text-[10px] leading-tight text-muted">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-xs text-faint">
                    <span>{p.year}</span><span>·</span><span>{p.client}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-brand">{p.title}</h3>
                  <p className="text-sm text-muted">{p.tagline}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {p.stack.slice(0, 4).map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                    Read case study <Icon name="arrow-right" size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
