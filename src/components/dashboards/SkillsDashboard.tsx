"use client";

import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList,
} from "recharts";
import { skillsByCategory, industryMix, toolUsage } from "@/lib/synthetic";
import { ChartCard, KpiCard, PALETTE, SERIES } from "./ui";

export function SkillsDashboard() {
  const skills = skillsByCategory();
  const industries = industryMix();
  const tools = toolUsage();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Case studies" value="3" icon="layers" sub="documented" />
        <KpiCard label="Industries" value="4" icon="compass" sub="FMCG · gaming · BI · forensics" />
        <KpiCard label="Core tools" value="6+" icon="code" sub="BI, ETL, ML" />
        <KpiCard label="Peak ML accuracy" value="97%" icon="spark" trend={{ dir: "up", text: "XGBoost" }} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Tool proficiency"
          subtitle="Relative depth across the stack"
          csvName="tool-proficiency"
          csv={() => [["Tool", "Proficiency"], ...tools.map((t) => [t.tool, t.value])]}
        >
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={tools} outerRadius="72%">
              <PolarGrid stroke="rgb(var(--border))" />
              <PolarAngleAxis dataKey="tool" tick={{ fontSize: 11, fill: "rgb(var(--muted))" }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Proficiency" dataKey="value" stroke={PALETTE.brand} fill={PALETTE.brand} fillOpacity={0.35} label={{ fontSize: 10, fill: "#94a3b8" }} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Skill impact weight"
          subtitle="Frequency × depth across projects"
          csvName="skill-impact"
          csv={() => [["Skill", "Projects", "Weight"], ...skills.map((s) => [s.skill, s.projects, s.weight])]}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skills} layout="vertical" margin={{ top: 4, right: 16, left: 24, bottom: 0 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="skill" width={110} tick={{ fontSize: 11 }} />
              <Tooltip cursor={{ fill: "rgba(99,102,241,0.06)" }} />
              <Bar dataKey="weight" name="Impact weight" radius={[0, 6, 6, 0]}>
                {skills.map((_, i) => (
                  <Cell key={i} fill={SERIES[i % SERIES.length]} />
                ))}
                <LabelList dataKey="weight" position="right" fontSize={10} fill="#94a3b8" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard
        title="Industry mix"
        subtitle="Share of project experience by domain"
        className="lg:max-w-xl"
        csvName="industry-mix"
        csv={() => [["Industry", "Share (%)"], ...industries.map((d) => [d.name, d.value])]}
      >
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={industries}
              dataKey="value"
              nameKey="name"
              innerRadius={64}
              outerRadius={104}
              paddingAngle={2}
              label={({ value }: { value?: number }) => `${value}%`}
              labelLine={false}
            >
              {industries.map((_, i) => (
                <Cell key={i} fill={SERIES[i % SERIES.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
