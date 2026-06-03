import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { projects, getProject } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: p.title,
    description: p.tagline,
    openGraph: { title: p.title, description: p.tagline },
  };
}

const cover: Record<string, string> = {
  accent: "from-brand/30 via-accent/20 to-transparent",
  violet: "from-[#e0a500]/30 via-amber-400/20 to-transparent",
  sky: "from-[#0ea5e9]/30 via-accent/15 to-transparent",
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <>
      {/* Header */}
      <section className={`relative overflow-hidden border-b border-border bg-gradient-to-br ${cover[p.cover] ?? cover.accent}`}>
        <div className="grid-fade pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-px relative py-14">
          <Reveal className="flex flex-col gap-5">
            <Link href="/projects" className="inline-flex w-fit items-center gap-1.5 text-sm text-muted transition-colors hover:text-brand">
              <Icon name="arrow-right" size={14} className="rotate-180" /> All projects
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-bg/70 backdrop-blur">{p.industry}</span>
              <span className="chip bg-bg/70 backdrop-blur">{p.year}</span>
              <span className="chip bg-bg/70 backdrop-blur">{p.role}</span>
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">{p.title}</h1>
            <p className="max-w-2xl text-lg text-muted">{p.tagline}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {p.slug === "vmi-inventory-analytics" && (
                <Link href="/dashboards" className="btn-primary">
                  <Icon name="chart" size={16} /> Explore live dashboard
                </Link>
              )}
              {p.pdf && (
                <a href={p.pdf} target="_blank" rel="noreferrer" className="btn-ghost">
                  <Icon name="doc" size={16} /> Full write-up (PDF)
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      <section className="container-px -mt-8 pb-4">
        <Reveal className="grid gap-4 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="surface-card flex flex-col items-center gap-1 p-6 text-center">
              <p className="font-display text-3xl font-bold text-brand">{m.value}</p>
              <p className="text-sm text-muted">{m.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Body */}
      <section className="container-px py-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="flex flex-col gap-12">
            <Block title="Context" icon="compass">
              <p className="text-lg leading-relaxed text-muted">{p.context}</p>
            </Block>

            <Block title="Problem" icon="target">
              <p className="text-lg leading-relaxed text-muted">{p.problem}</p>
            </Block>

            <Block title="Approach" icon="layers">
              <ol className="flex flex-col gap-4">
                {p.approach.map((a, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-sm font-bold text-brand">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-muted">{a}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Solution" icon="spark">
              <p className="text-lg leading-relaxed text-muted">{p.solution}</p>
            </Block>

            <Block title="Impact" icon="trend-up">
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.impact.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 rounded-2xl border border-border bg-surface p-4 text-sm text-ink/90">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-positive/15 text-positive">
                      <Icon name="check" size={13} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Block>

            {p.challenges.length > 0 && (
              <Block title="Challenges & solutions" icon="shield">
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.challenges.map((c) => (
                    <div key={c.title} className="surface-card p-5">
                      <h4 className="font-display font-semibold">{c.title}</h4>
                      <p className="mt-1.5 text-sm text-muted">{c.body}</p>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            <Block title="Learnings" icon="sparkles">
              <ul className="flex flex-col gap-3">
                {p.learnings.map((l) => (
                  <li key={l} className="flex items-start gap-2.5 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /> {l}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="What I'd do next" icon="arrow-up-right">
              <ul className="flex flex-col gap-3">
                {p.nextSteps.map((l) => (
                  <li key={l} className="flex items-start gap-2.5 text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      <Icon name="arrow-up-right" size={12} />
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="surface-card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">Client</h3>
              <p className="mt-1 text-sm text-ink">{p.client}</p>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-widest text-faint">Tech &amp; methods</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-xs leading-relaxed text-muted">
              <strong className="text-ink">Confidentiality:</strong> client and distributor identities are anonymized; any
              figures shown in the live dashboard are synthetic for demonstration.
            </div>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Block({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ComponentProps<typeof Icon>["name"];
  children: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand">
          <Icon name={icon} size={18} />
        </span>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </Reveal>
  );
}
