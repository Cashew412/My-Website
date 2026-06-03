"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts";
import { execSeries, execKpis, execDrivers, execRisks, type ExecFilter } from "@/lib/synthetic";
import { KpiCard, ChartCard, Segmented, PALETTE, fmt } from "./ui";
import { Icon, type IconName } from "@/components/Icon";

export function ExecutiveDashboard() {
  const [unit, setUnit] = useState<ExecFilter["unit"]>("Group");
  const [range, setRange] = useState<ExecFilter["range"]>("12M");
  const filter = useMemo<ExecFilter>(() => ({ unit, range }), [unit, range]);

  const series = useMemo(() => execSeries(filter), [filter]);
  const kpis = useMemo(() => execKpis(filter), [filter]);
  const drivers = useMemo(() => execDrivers(filter), [filter]);
  const risks = useMemo(() => execRisks(filter), [filter]);

  return (
    <div className="flex flex-col gap-5">
      <div className="surface-card flex flex-wrap items-end justify-between gap-4 p-5">
        <Segmented
          label="Business unit"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "Group", label: "Group" },
            { value: "GCC", label: "GCC" },
            { value: "Levant", label: "Levant" },
          ]}
        />
        <Segmented
          label="Period"
          value={range}
          onChange={setRange}
          options={[
            { value: "3M", label: "3M" },
            { value: "6M", label: "6M" },
            { value: "12M", label: "12M" },
          ]}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Revenue" value={`$${fmt(kpis.revenue, 1)}M`} icon="chart" trend={{ dir: "up", text: `${fmt(kpis.growth, 1)}% vs start` }} />
        <KpiCard label="EBITDA" value={`$${fmt(kpis.ebitda, 1)}M`} icon="trend-up" trend={{ dir: "up", text: "on plan" }} />
        <KpiCard label="EBITDA margin" value={`${fmt(kpis.margin, 1)}%`} icon="target" trend={{ dir: kpis.margin > 34 ? "up" : "down", text: "target 34%" }} />
        <KpiCard label="Cash conversion" value="86%" icon="layers" trend={{ dir: "flat", text: "stable" }} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <ChartCard
          title="Revenue & margin"
          subtitle="Monthly revenue ($M) with EBITDA margin (%)"
          csvName="revenue-margin"
          csv={() => [["Month", "Revenue ($M)", "EBITDA ($M)", "Margin (%)"], ...series.map((d) => [d.month, d.revenue, d.ebitda, d.margin])]}
        >
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={series} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PALETTE.brand} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={PALETTE.gold} stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="l" tickFormatter={(v) => `$${v}`} />
              <YAxis yAxisId="r" orientation="right" domain={[0, 60]} tickFormatter={(v) => `${v}%`} />
              <Tooltip cursor={{ fill: "rgba(99,102,241,0.06)" }} />
              <Legend iconType="circle" />
              <Bar yAxisId="l" dataKey="revenue" name="Revenue ($M)" fill="url(#rev)" radius={[6, 6, 0, 0]} barSize={22}>
                <LabelList dataKey="revenue" position="top" fontSize={9} fill="#94a3b8" formatter={(v: number) => `$${v}`} />
              </Bar>
              <Line yAxisId="r" type="monotone" dataKey="margin" name="EBITDA margin (%)" stroke={PALETTE.accent} strokeWidth={2.5} dot={{ r: 2 }}>
                <LabelList dataKey="margin" position="bottom" fontSize={9} fill="#2dd4bf" formatter={(v: number) => `${v}%`} />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Growth drivers"
          subtitle="Contribution to revenue change ($M)"
          csvName="growth-drivers"
          csv={() => [["Driver", "Impact ($M)"], ...drivers.map((d) => [d.name, d.value])]}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={drivers} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `$${v}`} />
              <Tooltip cursor={{ fill: "rgba(99,102,241,0.06)" }} />
              <ReferenceLine y={0} stroke={PALETTE.slate} />
              <Bar dataKey="value" name="Impact ($M)" radius={[6, 6, 6, 6]}>
                {drivers.map((d) => (
                  <Cell key={d.name} fill={d.value >= 0 ? PALETTE.green : PALETTE.rose} />
                ))}
                <LabelList dataKey="value" position="top" fontSize={10} fill="#94a3b8" formatter={(v: number) => `${v > 0 ? "+" : ""}${v}`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Risk register" subtitle="Live operational & financial risks by severity">
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-faint">
                <th className="px-2 py-2 font-semibold">Risk area</th>
                <th className="px-2 py-2 font-semibold">Severity</th>
                <th className="px-2 py-2 font-semibold">Trend</th>
                <th className="px-2 py-2 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => {
                const sev =
                  r.severity === "High"
                    ? "bg-negative/15 text-negative"
                    : r.severity === "Medium"
                    ? "bg-warning/15 text-warning"
                    : "bg-positive/15 text-positive";
                const tIcon: IconName = r.trend === "up" ? "trend-up" : r.trend === "down" ? "trend-down" : "trend-flat";
                const tColor = r.trend === "up" ? "text-positive" : r.trend === "down" ? "text-negative" : "text-muted";
                return (
                  <tr key={r.area} className="border-b border-border/60 last:border-0">
                    <td className="px-2 py-2.5 font-medium text-ink">{r.area}</td>
                    <td className="px-2 py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${sev}`}>{r.severity}</span>
                    </td>
                    <td className="px-2 py-2.5">
                      <span className={tColor}><Icon name={tIcon} size={16} /></span>
                    </td>
                    <td className="px-2 py-2.5 text-muted">{r.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
