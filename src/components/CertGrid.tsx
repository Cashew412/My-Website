"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { certifications, type Certification } from "@/lib/content";

const categoryColor: Record<string, string> = {
  "Machine Learning": "bg-brand-soft text-brand",
  Mathematics: "bg-accent/15 text-accent",
  Business: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Language: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  Academic: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
};

export function CertGrid() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(certifications.map((c) => c.category)))], []);
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Certification | null>(null);

  const visible = filter === "All" ? certifications : certifications.filter((c) => c.category === filter);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === c ? "border-brand bg-brand text-white" : "border-border bg-surface text-muted hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <button
            key={c.title + c.file}
            type="button"
            onClick={() => setActive(c)}
            className="surface-card group flex flex-col gap-3 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${categoryColor[c.category] ?? "bg-brand-soft text-brand"}`}>
                <Icon name="shield" size={20} />
              </span>
              <span className="chip">{c.category}</span>
            </div>
            <h3 className="font-display font-semibold leading-snug">{c.title}</h3>
            <p className="text-sm text-muted">{c.issuer}</p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-xs text-faint">{c.date}</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                Preview <Icon name="arrow-up-right" size={13} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} preview`}
        >
          <div
            className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <div className="min-w-0">
                <h3 className="truncate font-display font-semibold">{active.title}</h3>
                <p className="truncate text-xs text-muted">{active.issuer} · {active.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <a href={active.file} target="_blank" rel="noreferrer" className="btn-ghost h-9 px-3 py-0 text-xs">
                  <Icon name="external" size={14} /> Open
                </a>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close preview"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted hover:text-ink"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 bg-elevated">
              {active.type === "image" ? (
                <img src={active.file} alt={active.title} className="max-h-[72vh] w-full object-contain" />
              ) : (
                <iframe src={`${active.file}#view=FitH`} title={active.title} className="h-[72vh] w-full" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
