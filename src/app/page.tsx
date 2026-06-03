import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { LogoBadge } from "@/components/LogoBadge";
import { CTASection } from "@/components/CTASection";
import { person, stats, experience, projects, skillGroups, certifications } from "@/lib/content";

export default function HomePage() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const topCerts = certifications.filter((c) => c.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0 -z-10" />
        <div className="mesh pointer-events-none absolute inset-0 -z-10" />
        <div className="container-px grid items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="chip border-brand/30 bg-brand-soft text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {person.tagline}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                {person.name} —{" "}
                <span className="text-gradient">Data &amp; Analytics</span>
                <span className="block text-ink/90">Senior Consultant</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-xl text-lg leading-relaxed text-muted">{person.valueProp}</p>
            </Reveal>
            <Reveal delay={180} className="flex flex-wrap items-center gap-3">
              <Link href="/dashboards" className="btn-primary">
                View dashboards <Icon name="arrow-right" size={16} />
              </Link>
              <Link href="/projects" className="btn-ghost">
                See projects
              </Link>
              <a href={person.resume} download className="btn-ghost">
                <Icon name="download" size={16} /> Résumé
              </a>
            </Reveal>
            <Reveal delay={240} className="flex items-center gap-3 pt-2">
              <span className="text-xs font-medium uppercase tracking-widest text-faint">Connect</span>
              <div className="h-px w-8 bg-border" />
              <div className="flex items-center gap-2">
                {person.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-brand"
                  >
                    <Icon name={s.icon as IconName} size={17} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Portrait with animated gradient ring */}
          <Reveal delay={120} className="relative mx-auto flex w-full max-w-sm flex-col gap-4">
            <div className="absolute -inset-6 -z-10 rounded-[2.6rem] bg-gradient-to-br from-brand/30 via-accent/20 to-[#e0a500]/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] p-[3px] shadow-card">
              <span className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,#6366f1,#2dd4bf,#e0a500,#6366f1)] opacity-90" />
              <div className="relative z-10 overflow-hidden rounded-[1.85rem] bg-surface">
                <img
                  src={person.photo}
                  alt={`Portrait of ${person.name}`}
                  className="aspect-[4/5] w-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {stats.slice(0, 3).map((s, i) => (
                <Reveal key={s.label} delay={260 + i * 80} className="surface-card flex flex-col items-center gap-0.5 p-3 text-center">
                  <p className="font-display text-xl font-bold text-brand">
                    <AnimatedNumber value={Number(s.value)} />
                    {s.suffix}
                  </p>
                  <p className="text-[10px] leading-tight text-muted">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience logos marquee */}
      <section className="border-y border-border bg-surface/60">
        <div className="container-px py-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-faint">
            Experience across forensics, FMCG, gaming &amp; enterprise BI
          </p>
          <div
            className="group relative overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
              {[...experience, ...experience].map((e, i) => (
                <div key={`${e.company}-${i}`} className="flex shrink-0 items-center gap-3 opacity-80 transition-opacity hover:opacity-100">
                  <LogoBadge label={e.logo} bg={e.logoBg} color={e.logoColor} img={e.img} tile={e.tile} size={40} />
                  <span className="whitespace-nowrap font-display text-sm font-semibold">{e.company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-px py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="surface-card flex flex-col gap-1 p-6">
              <p className="font-display text-4xl font-bold text-ink">
                <AnimatedNumber value={Number(s.value)} />
                {s.suffix}
              </p>
              <p className="text-sm font-semibold text-ink">{s.label}</p>
              <p className="text-xs text-muted">{s.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What I do */}
      <section className="container-px py-12">
        <Reveal className="flex max-w-2xl flex-col gap-3">
          <span className="eyebrow">What I do</span>
          <h2 className="text-3xl font-bold sm:text-4xl">From raw, multi-source data to a decision</h2>
          <p className="text-muted">
            I own the full path — structuring the problem, engineering the data, and designing the visual that makes
            the right call obvious.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.name} delay={i * 60} className="surface-card group flex flex-col gap-4 p-6 transition-all hover:-translate-y-1 hover:shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name={g.icon as IconName} size={22} />
              </span>
              <h3 className="font-display text-lg font-semibold">{g.name}</h3>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((sk) => (
                  <span key={sk} className="chip">{sk}</span>
                ))}
              </div>
            </Reveal>
          ))}
          <Reveal delay={300} className="surface-card flex flex-col justify-between gap-4 bg-brand p-6 text-white">
            <div className="flex flex-col gap-2">
              <Icon name="sparkles" size={24} />
              <h3 className="font-display text-lg font-semibold">See the methods in motion</h3>
              <p className="text-sm text-white/85">Explore interactive dashboards built on the same patterns I ship in production.</p>
            </div>
            <Link href="/dashboards" className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/25">
              Open dashboards <Icon name="arrow-right" size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured project */}
      <section className="container-px py-12">
        <Reveal className="surface-card relative overflow-hidden p-6 sm:p-10">
          <div className="mesh pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-5">
              <span className="eyebrow">Featured case study</span>
              <h2 className="text-3xl font-bold sm:text-4xl">{featured.title}</h2>
              <p className="text-muted">{featured.tagline}</p>
              <div className="flex flex-wrap gap-2">
                {featured.stack.slice(0, 5).map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <Link href={`/projects/${featured.slug}`} className="btn-primary w-fit">
                Read the case study <Icon name="arrow-right" size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {featured.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-border bg-elevated p-4 text-center">
                  <p className="font-display text-2xl font-bold text-brand">{m.value}</p>
                  <p className="mt-1 text-[11px] leading-tight text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Certifications teaser */}
      <section className="container-px py-12">
        <div className="flex items-end justify-between gap-4">
          <Reveal className="flex max-w-xl flex-col gap-3">
            <span className="eyebrow">Always learning</span>
            <h2 className="text-3xl font-bold sm:text-4xl">Selected certifications</h2>
          </Reveal>
          <Link href="/certifications" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand link-underline sm:inline-flex">
            View all <Icon name="arrow-right" size={15} />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {topCerts.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="surface-card flex flex-col gap-3 p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon name="shield" size={20} />
              </span>
              <h3 className="font-display font-semibold leading-snug">{c.title}</h3>
              <p className="text-sm text-muted">{c.issuer}</p>
              <p className="mt-auto text-xs text-faint">{c.date}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
