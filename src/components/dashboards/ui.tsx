"use client";

import { useRef } from "react";
import { Icon, type IconName } from "@/components/Icon";

export const PALETTE = {
  brand: "#6366f1",
  accent: "#2dd4bf",
  gold: "#e0a500",
  amber: "#f59e0b",
  sky: "#38bdf8",
  rose: "#fb7185",
  green: "#34c794",
  slate: "#94a3b8",
};

export const SERIES = [
  PALETTE.brand,
  PALETTE.accent,
  PALETTE.gold,
  PALETTE.amber,
  PALETTE.sky,
  PALETTE.rose,
  PALETTE.green,
];

export function KpiCard({
  label,
  value,
  sub,
  trend,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: { dir: "up" | "down" | "flat"; text: string };
  icon?: IconName;
}) {
  const trendColor =
    trend?.dir === "up" ? "text-positive" : trend?.dir === "down" ? "text-negative" : "text-muted";
  const trendIcon: IconName =
    trend?.dir === "up" ? "trend-up" : trend?.dir === "down" ? "trend-down" : "trend-flat";
  return (
    <div className="surface-card flex flex-col gap-1.5 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted">{label}</span>
        {icon && (
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-soft text-brand">
            <Icon name={icon} size={15} />
          </span>
        )}
      </div>
      <p className="font-display text-2xl font-bold text-ink">{value}</p>
      <div className="flex items-center gap-1.5">
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
            <Icon name={trendIcon} size={13} /> {trend.text}
          </span>
        )}
        {sub && <span className="text-xs text-faint">{sub}</span>}
      </div>
    </div>
  );
}

export function ChartCard({
  title,
  subtitle,
  children,
  className = "",
  csv,
  csvName,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  csv?: () => (string | number)[][];
  csvName?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  function downloadCSV() {
    if (!csv) return;
    const rows = csv();
    const content = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    triggerDownload(new Blob([content], { type: "text/csv" }), `${csvName ?? "data"}.csv`);
  }

  function downloadSVG() {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const data = new XMLSerializer().serializeToString(clone);
    triggerDownload(new Blob([data], { type: "image/svg+xml" }), `${csvName ?? "chart"}.svg`);
  }

  return (
    <div className={`surface-card flex flex-col p-5 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-sm font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-faint">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={downloadSVG}
            title="Export chart as SVG"
            className="grid h-7 w-7 place-items-center rounded-lg border border-border text-faint transition-colors hover:text-brand"
          >
            <Icon name="external" size={13} />
          </button>
          {csv && (
            <button
              type="button"
              onClick={downloadCSV}
              title="Export data as CSV"
              className="grid h-7 w-7 place-items-center rounded-lg border border-border text-faint transition-colors hover:text-brand"
            >
              <Icon name="download" size={13} />
            </button>
          )}
        </div>
      </div>
      <div ref={ref} className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-faint">{label}</span>}
      <div className="inline-flex rounded-full border border-border bg-elevated p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              value === o.value ? "bg-brand text-white shadow-soft" : "text-muted hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChipMultiSelect({
  options,
  selected,
  onToggle,
  onClear,
  label,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  onClear: () => void;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-faint">{label}</span>
        {selected.length > 0 && (
          <button type="button" onClick={onClear} className="text-[11px] font-semibold text-brand hover:underline">
            Clear ({selected.length})
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                on ? "border-brand bg-brand text-white" : "border-border bg-elevated text-muted hover:text-ink"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function fmt(n: number, digits = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export function fmtCompact(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}
