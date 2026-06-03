// Deterministic synthetic data for the demonstration dashboards.
// No confidential or client data — every figure is generated from a fixed seed.

export const COUNTRIES = ["Jordan", "KSA", "Oman", "Qatar", "Kuwait", "Lebanon", "Iraq"];
export const CATEGORIES = [
  "Petcare",
  "Coffee & Beverages",
  "Culinary",
  "CPW",
  "Dairy",
  "Nutrition",
  "Confectionery",
];

// Fixed reference point so server-render and client-hydration always match.
const REF_DATE = new Date("2025-07-31T00:00:00Z");

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type MonthKey = { key: string; label: string; index: number };

export const MONTHS: MonthKey[] = Array.from({ length: 12 }).map((_, i) => {
  const d = new Date(REF_DATE);
  d.setUTCMonth(d.getUTCMonth() - (11 - i));
  const label = d.toLocaleString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" });
  return { key: `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}`, label, index: i };
});

export type InvRecord = {
  country: string;
  category: string;
  monthIndex: number;
  monthLabel: string;
  onHand: number;
  inTransit: number;
  stockCoverDays: number;
  sellIn: number;
  sellOut: number;
  forecast: number;
  actual: number;
  proposals: number;
  accepted: number;
};

function buildInventory(): InvRecord[] {
  const records: InvRecord[] = [];
  COUNTRIES.forEach((country) => {
    CATEGORIES.forEach((category) => {
      const rng = mulberry32(hash(country + category));
      const base = 80 + rng() * 220; // base sell-out volume (k cases)
      const cover0 = 18 + rng() * 30;
      MONTHS.forEach((m) => {
        const season = 1 + 0.18 * Math.sin((m.index / 12) * Math.PI * 2 + rng() * 6);
        const trend = 1 + (m.index / 11) * (0.05 + rng() * 0.25);
        const noise = 0.85 + rng() * 0.3;
        const sellOut = base * season * trend * noise;
        const sellIn = sellOut * (0.92 + rng() * 0.22);
        const stockCoverDays = Math.max(6, cover0 + (sellIn - sellOut) / (base * 0.5) * 10 + (rng() - 0.5) * 8);
        const forecast = sellOut * (0.9 + rng() * 0.2);
        const actual = sellOut;
        const proposals = Math.round(8 + rng() * 20);
        const accepted = Math.round(proposals * (0.72 + rng() * 0.26));
        records.push({
          country,
          category,
          monthIndex: m.index,
          monthLabel: m.label,
          onHand: Math.round(sellOut * (stockCoverDays / 30) * 1000),
          inTransit: Math.round(sellOut * 0.18 * 1000),
          stockCoverDays: Math.round(stockCoverDays),
          sellIn: Math.round(sellIn * 1000),
          sellOut: Math.round(sellOut * 1000),
          forecast: Math.round(forecast * 1000),
          actual: Math.round(actual * 1000),
          proposals,
          accepted,
        });
      });
    });
  });
  return records;
}

export const INVENTORY = buildInventory();

export type InvFilter = {
  countries: string[]; // empty = all
  categories: string[]; // empty = all
  range: "MTD" | "3M" | "12M";
};

function filterRecords(f: InvFilter): InvRecord[] {
  const minIndex = f.range === "MTD" ? 11 : f.range === "3M" ? 9 : 0;
  return INVENTORY.filter(
    (r) =>
      r.monthIndex >= minIndex &&
      (f.countries.length === 0 || f.countries.includes(r.country)) &&
      (f.categories.length === 0 || f.categories.includes(r.category))
  );
}

export function invKpis(f: InvFilter) {
  const rows = filterRecords(f);
  const sellIn = rows.reduce((s, r) => s + r.sellIn, 0);
  const sellOut = rows.reduce((s, r) => s + r.sellOut, 0);
  const cover = rows.length ? rows.reduce((s, r) => s + r.stockCoverDays, 0) / rows.length : 0;
  const fc = rows.reduce((s, r) => s + r.forecast, 0);
  const act = rows.reduce((s, r) => s + r.actual, 0);
  const forecastAccuracy = act ? 100 - Math.min(100, (Math.abs(fc - act) / act) * 100) : 0;
  const proposals = rows.reduce((s, r) => s + r.proposals, 0);
  const accepted = rows.reduce((s, r) => s + r.accepted, 0);
  return {
    stockCover: cover,
    sellIn,
    sellOut,
    siso: sellOut ? (sellIn / sellOut) * 100 : 0,
    forecastAccuracy,
    proposals,
    acceptance: proposals ? (accepted / proposals) * 100 : 0,
  };
}

export function sellInOutByMonth(f: InvFilter) {
  const rows = filterRecords(f);
  return MONTHS.filter((m) => rows.some((r) => r.monthIndex === m.index)).map((m) => {
    const mr = rows.filter((r) => r.monthIndex === m.index);
    return {
      month: m.label,
      sellIn: Math.round(mr.reduce((s, r) => s + r.sellIn, 0) / 1000),
      sellOut: Math.round(mr.reduce((s, r) => s + r.sellOut, 0) / 1000),
    };
  });
}

export function stockCoverByCategory(f: InvFilter) {
  const rows = filterRecords(f).filter((r) => r.monthIndex === 11);
  return CATEGORIES.filter((c) => f.categories.length === 0 || f.categories.includes(c)).map((c) => {
    const cr = rows.filter((r) => r.category === c);
    return {
      category: c,
      onHand: Math.round(cr.reduce((s, r) => s + r.onHand, 0) / 1000),
      inTransit: Math.round(cr.reduce((s, r) => s + r.inTransit, 0) / 1000),
    };
  });
}

export type ProposalRow = {
  category: string;
  stockCoverDays: number;
  sisoValue: number;
  nextProposal: string;
  imsNow: number;
  ims1m: number;
  ims2m: number;
  anomaly: "low" | "high" | null;
};

export function proposalTable(f: InvFilter): ProposalRow[] {
  const rows = filterRecords(f).filter((r) => r.monthIndex === 11);
  return CATEGORIES.filter((c) => f.categories.length === 0 || f.categories.includes(c)).map((c, i) => {
    const cr = rows.filter((r) => r.category === c);
    const cover = cr.length ? Math.round(cr.reduce((s, r) => s + r.stockCoverDays, 0) / cr.length) : 0;
    const sellIn = cr.reduce((s, r) => s + r.sellIn, 0);
    const sellOut = cr.reduce((s, r) => s + r.sellOut, 0);
    const imsNow = Math.round(sellOut * 1.05);
    const d = new Date(REF_DATE);
    d.setUTCDate(d.getUTCDate() + 3 + ((i * 5) % 21));
    const anomaly: "low" | "high" | null = cover < 12 ? "low" : cover > 42 ? "high" : null;
    return {
      category: c,
      stockCoverDays: cover,
      sisoValue: Math.round((sellIn - sellOut) / 1000),
      nextProposal: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" }),
      imsNow: Math.round(imsNow / 1000),
      ims1m: Math.round((imsNow * 1.04) / 1000),
      ims2m: Math.round((imsNow * 1.09) / 1000),
      anomaly,
    };
  });
}

export function stockCoverByCountry(f: InvFilter) {
  const rows = filterRecords(f).filter((r) => r.monthIndex === 11);
  return COUNTRIES.filter((c) => f.countries.length === 0 || f.countries.includes(c)).map((c) => {
    const cr = rows.filter((r) => r.country === c);
    const cover = cr.length ? Math.round(cr.reduce((s, r) => s + r.stockCoverDays, 0) / cr.length) : 0;
    return { country: c, cover };
  });
}

/* ----------------------------- Executive view ----------------------------- */

export type ExecFilter = { unit: "Group" | "GCC" | "Levant"; range: "3M" | "6M" | "12M" };

function execSeed(unit: string) {
  return mulberry32(hash("exec" + unit));
}

export function execSeries(f: ExecFilter) {
  const rng = execSeed(f.unit);
  const scale = f.unit === "Group" ? 1 : f.unit === "GCC" ? 0.62 : 0.38;
  const minIndex = f.range === "3M" ? 9 : f.range === "6M" ? 6 : 0;
  return MONTHS.filter((m) => m.index >= minIndex).map((m) => {
    const season = 1 + 0.08 * Math.sin((m.index / 12) * Math.PI * 2);
    const growth = 1 + (m.index / 11) * 0.22;
    const revenue = (18 + rng() * 3) * scale * season * growth;
    const margin = 34 + rng() * 6 + (m.index / 11) * 3;
    const opex = revenue * (0.5 + rng() * 0.05);
    return {
      month: m.label,
      revenue: Math.round(revenue * 10) / 10,
      ebitda: Math.round((revenue * (margin / 100)) * 10) / 10,
      margin: Math.round(margin * 10) / 10,
      opex: Math.round(opex * 10) / 10,
    };
  });
}

export function execKpis(f: ExecFilter) {
  const s = execSeries(f);
  const revenue = s.reduce((a, b) => a + b.revenue, 0);
  const ebitda = s.reduce((a, b) => a + b.ebitda, 0);
  const margin = revenue ? (ebitda / revenue) * 100 : 0;
  const first = s[0]?.revenue ?? 1;
  const last = s[s.length - 1]?.revenue ?? 1;
  const growth = first ? ((last - first) / first) * 100 : 0;
  return { revenue, ebitda, margin, growth };
}

export function execDrivers(f: ExecFilter) {
  const rng = execSeed(f.unit + "drivers");
  const scale = f.unit === "Group" ? 1 : f.unit === "GCC" ? 0.62 : 0.38;
  return [
    { name: "Volume", value: Math.round((4 + rng() * 3) * scale * 10) / 10 },
    { name: "Price", value: Math.round((3 + rng() * 2) * scale * 10) / 10 },
    { name: "Mix", value: Math.round((1.5 + rng() * 2) * scale * 10) / 10 },
    { name: "Cost", value: -Math.round((2 + rng() * 2.5) * scale * 10) / 10 },
    { name: "FX", value: -Math.round((0.5 + rng() * 1.5) * scale * 10) / 10 },
  ];
}

export type RiskRow = { area: string; severity: "Low" | "Medium" | "High"; trend: "up" | "down" | "flat"; note: string };

export function execRisks(f: ExecFilter): RiskRow[] {
  const base: RiskRow[] = [
    { area: "Forecast accuracy", severity: "Medium", trend: "up", note: "Improving with new model, watch Q4 peaks" },
    { area: "Stock cover (Dairy)", severity: "High", trend: "down", note: "Cover below target in 2 markets" },
    { area: "Distributor adoption", severity: "Low", trend: "up", note: "Daily active usage rising region-wide" },
    { area: "Data freshness", severity: "Low", trend: "flat", note: "Pipelines green, < 2h latency" },
    { area: "Margin pressure (FX)", severity: "Medium", trend: "down", note: "Currency exposure in Levant" },
  ];
  if (f.unit === "GCC") return base.filter((r) => !r.area.includes("Levant"));
  if (f.unit === "Levant") return base.map((r) => (r.area.includes("FX") ? { ...r, severity: "High" } : r));
  return base;
}

/* --------------------------- Skills impact view --------------------------- */

export function skillsByCategory() {
  return [
    { skill: "Data Modeling", projects: 4, weight: 92 },
    { skill: "Dashboards / BI", projects: 4, weight: 95 },
    { skill: "ETL Pipelines", projects: 3, weight: 84 },
    { skill: "SQL", projects: 4, weight: 90 },
    { skill: "Python", projects: 3, weight: 80 },
    { skill: "Machine Learning", projects: 2, weight: 72 },
    { skill: "Stakeholder Mgmt", projects: 4, weight: 88 },
  ];
}

export function industryMix() {
  return [
    { name: "FMCG / Supply Chain", value: 38 },
    { name: "Gaming / Data Science", value: 24 },
    { name: "Enterprise BI", value: 22 },
    { name: "Forensics", value: 16 },
  ];
}

export function toolUsage() {
  return [
    { tool: "Power BI", value: 95 },
    { tool: "SQL / T-SQL", value: 92 },
    { tool: "Python", value: 80 },
    { tool: "Azure Data Factory", value: 70 },
    { tool: "Databricks", value: 58 },
    { tool: "Looker", value: 52 },
  ];
}
