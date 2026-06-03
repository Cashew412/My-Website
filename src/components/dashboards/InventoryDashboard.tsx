"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts";
import {
  COUNTRIES,
  CATEGORIES,
  invKpis,
  sellInOutByMonth,
  stockCoverByCategory,
  stockCoverByCountry,
  proposalTable,
  type InvFilter,
} from "@/lib/synthetic";
import { KpiCard, ChartCard, Segmented, ChipMultiSelect, PALETTE, fmt, fmtCompact } from "./ui";
import { Icon } from "@/components/Icon";

export function InventoryDashboard() {
  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [range, setRange] = useState<InvFilter["range"]>("12M");

  const filter = useMemo<InvFilter>(() => ({ countries, categories, range }), [countries, categories, range]);
  const kpis = useMemo(() => invKpis(filter), [filter]);
  const trend = useMemo(() => sellInOutByMonth(filter), [filter]);
  const byCat = useMemo(() => stockCoverByCategory(filter), [filter]);
  const byCountry = useMemo(() => stockCoverByCountry(filter), [filter]);
  const table = useMemo(() => proposalTable(filter), [filter]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className="surface-card flex flex-col gap-4 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <ChipMultiSelect
            label="Country"
            options={COUNTRIES}
            selected={countries}
            onToggle={(v) => toggle(countries, setCountries, v)}
            onClear={() => setCountries([])}
          />
          <Segmented
            label="Period"
            value={range}
            onChange={setRange}
            options={[
              { value: "MTD", label: "MTD" },
              { value: "3M", label: "3M" },
              { value: "12M", label: "12M" },
            ]}
          />
        </div>
        <ChipMultiSelect
          label="SKU category"
          options={CATEGORIES}
          selected={categories}
          onToggle={(v) => toggle(categories, setCategories, v)}
          onClear={() => setCategories([])}
        />
        <p className="flex items-center gap-1.5 text-[11px] text-faint">
          <Icon name="filter" size={12} /> Tip: click any bar in the charts below to cross-filter the whole view.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Avg stock cover" value={`${fmt(kpis.stockCover)} days`} icon="layers" trend={{ dir: "flat", text: "target 21d" }} />
        <KpiCard label="Sell-in (cases)" value={fmtCompact(kpis.sellIn)} icon="trend-up" trend={{ dir: "up", text: `SISO ${fmt(kpis.siso)}%` }} />
        <KpiCard label="Sell-out (cases)" value={fmtCompact(kpis.sellOut)} icon="chart" trend={{ dir: "up", text: "demand" }} />
        <KpiCard
          label="Forecast accuracy"
          value={`${fmt(kpis.forecastAccuracy, 1)}%`}
          icon="target"
          trend={{ dir: kpis.forecastAccuracy > 90 ? "up" : "down", text: `accept ${fmt(kpis.acceptance)}%` }}
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Stock cover by category"
          subtitle="On-hand vs in-transit (k cases) · current month"
          csvName="stock-cover-by-category"
          csv={() => [["Category", "On hand", "In transit"], ...byCat.map((d) => [d.category, d.onHand, d.inTransit])]}
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byCat} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="category" interval={0} angle={-18} textAnchor="end" height={56} tickMargin={6} />
              <YAxis tickFormatter={(v) => fmtCompact(v)} />
              <Tooltip cursor={{ fill: "rgba(99,102,241,0.06)" }} />
              <Legend iconType="circle" />
              <Bar
                dataKey="onHand"
                name="On hand"
                stackId="a"
                fill={PALETTE.brand}
                radius={[0, 0, 0, 0]}
                cursor="pointer"
                onClick={(d: { category?: string }) => d?.category && toggle(categories, setCategories, d.category)}
              >
                <LabelList dataKey="onHand" position="center" fontSize={9} fill="#ffffff" formatter={(v: number) => (v > 60 ? fmtCompact(v) : "")} />
              </Bar>
              <Bar
                dataKey="inTransit"
                name="In transit"
                stackId="a"
                fill={PALETTE.accent}
                radius={[6, 6, 0, 0]}
                cursor="pointer"
                onClick={(d: { category?: string }) => d?.category && toggle(categories, setCategories, d.category)}
              >
                <LabelList dataKey="inTransit" position="center" fontSize={9} fill="#0b3b38" formatter={(v: number) => (v > 60 ? fmtCompact(v) : "")} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Sell-in vs sell-out trend"
          subtitle="Monthly (k cases)"
          csvName="sell-in-sell-out"
          csv={() => [["Month", "Sell-in", "Sell-out"], ...trend.map((d) => [d.month, d.sellIn, d.sellOut])]}
        >
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={trend} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="so" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PALETTE.brand} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={PALETTE.brand} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => fmtCompact(v)} />
              <Tooltip />
              <Legend iconType="circle" />
              <Area type="monotone" dataKey="sellOut" name="Sell-out" stroke={PALETTE.brand} strokeWidth={2.5} fill="url(#so)">
                <LabelList dataKey="sellOut" position="top" fontSize={9} fill="#94a3b8" formatter={(v: number) => fmtCompact(v)} />
              </Area>
              <Line type="monotone" dataKey="sellIn" name="Sell-in" stroke={PALETTE.amber} strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <ChartCard
          title="Stock cover by country"
          subtitle="Days of cover · red = anomaly (low/high)"
          csvName="stock-cover-by-country"
          csv={() => [["Country", "Cover (days)"], ...byCountry.map((d) => [d.country, d.cover])]}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={byCountry} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="country" width={64} />
              <Tooltip cursor={{ fill: "rgba(99,102,241,0.06)" }} />
              <ReferenceLine x={21} stroke={PALETTE.slate} strokeDasharray="4 4" label={{ value: "target", position: "top", fontSize: 10, fill: PALETTE.slate }} />
              <Bar
                dataKey="cover"
                name="Cover (days)"
                radius={[0, 6, 6, 0]}
                cursor="pointer"
                onClick={(d: { country?: string }) => d?.country && toggle(countries, setCountries, d.country)}
              >
                {byCountry.map((d) => (
                  <Cell key={d.country} fill={d.cover < 12 || d.cover > 42 ? PALETTE.rose : PALETTE.brand} />
                ))}
                <LabelList dataKey="cover" position="right" fontSize={10} fill="#94a3b8" formatter={(v: number) => `${v}d`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Proposal cadence & IMS targets"
          subtitle="Per category · current vs +1mo / +2mo (k cases)"
          csvName="proposal-table"
          csv={() => [
            ["Category", "Cover (days)", "SISO net (k)", "Next proposal", "IMS now", "IMS +1m", "IMS +2m", "Flag"],
            ...table.map((r) => [r.category, r.stockCoverDays, r.sisoValue, r.nextProposal, r.imsNow, r.ims1m, r.ims2m, r.anomaly ?? "ok"]),
          ]}
        >
          <div className="-mx-1 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-faint">
                  <th className="px-2 py-2 font-semibold">Category</th>
                  <th className="px-2 py-2 text-right font-semibold">Cover</th>
                  <th className="px-2 py-2 text-right font-semibold">SISO net</th>
                  <th className="px-2 py-2 font-semibold">Next prop.</th>
                  <th className="px-2 py-2 text-right font-semibold">IMS</th>
                  <th className="px-2 py-2 text-right font-semibold">+1m</th>
                  <th className="px-2 py-2 text-right font-semibold">+2m</th>
                  <th className="px-2 py-2 font-semibold">Flag</th>
                </tr>
              </thead>
              <tbody>
                {table.map((r) => (
                  <tr key={r.category} className="border-b border-border/60 last:border-0">
                    <td className="px-2 py-2 font-medium text-ink">{r.category}</td>
                    <td className="px-2 py-2 text-right tabular-nums">{r.stockCoverDays}d</td>
                    <td className={`px-2 py-2 text-right tabular-nums ${r.sisoValue < 0 ? "text-negative" : "text-positive"}`}>
                      {r.sisoValue > 0 ? "+" : ""}{r.sisoValue}
                    </td>
                    <td className="px-2 py-2 text-muted">{r.nextProposal}</td>
                    <td className="px-2 py-2 text-right tabular-nums">{r.imsNow}</td>
                    <td className="px-2 py-2 text-right tabular-nums text-muted">{r.ims1m}</td>
                    <td className="px-2 py-2 text-right tabular-nums text-muted">{r.ims2m}</td>
                    <td className="px-2 py-2">
                      {r.anomaly ? (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.anomaly === "low" ? "bg-negative/15 text-negative" : "bg-warning/15 text-warning"}`}>
                          {r.anomaly === "low" ? "Low cover" : "Overstock"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-positive/15 px-2 py-0.5 text-[10px] font-semibold text-positive">OK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
