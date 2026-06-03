"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { InventoryDashboard } from "./InventoryDashboard";
import { ExecutiveDashboard } from "./ExecutiveDashboard";
import { SkillsDashboard } from "./SkillsDashboard";

const tabs: { id: string; label: string; icon: IconName; desc: string }[] = [
  { id: "inventory", label: "Inventory / VMI Ops", icon: "layers", desc: "Multi-country stock cover, SISO & proposal cadence" },
  { id: "executive", label: "Executive Overview", icon: "chart", desc: "CFO/COO view: performance, drivers & risk" },
  { id: "skills", label: "Skills Impact", icon: "spark", desc: "Projects by skill, tool & industry" },
];

export function DashboardsClient() {
  const [active, setActive] = useState("inventory");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-muted">
        <span className="font-semibold text-ink">Note —</span> all figures below are{" "}
        <strong className="text-ink">synthetic, generated for demonstration only</strong>. They mirror the structure
        and themes of real work but contain no confidential or client data.
      </div>

      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-left transition-all ${
              active === t.id ? "border-brand bg-brand-soft" : "border-border bg-surface hover:border-brand/40"
            }`}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-xl ${active === t.id ? "bg-brand text-white" : "bg-elevated text-brand"}`}>
              <Icon name={t.icon} size={18} />
            </span>
            <span>
              <span className={`block text-sm font-semibold ${active === t.id ? "text-brand" : "text-ink"}`}>{t.label}</span>
              <span className="hidden text-xs text-muted sm:block">{t.desc}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-faint">
        <Icon name="play" size={12} /> Showing: <span className="font-semibold text-muted">{current.label}</span>
      </div>

      {active === "inventory" && <InventoryDashboard />}
      {active === "executive" && <ExecutiveDashboard />}
      {active === "skills" && <SkillsDashboard />}
    </div>
  );
}
