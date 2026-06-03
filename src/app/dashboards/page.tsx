import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { DashboardsClient } from "@/components/dashboards/DashboardsClient";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Dashboards",
  description: "Interactive demonstration dashboards — multi-country inventory operations, an executive overview, and a skills-impact view. All data is synthetic.",
};

export default function DashboardsPage() {
  return (
    <>
      <section className="container-px py-14">
        <SectionHeading
          eyebrow="Signature feature"
          title="Interactive dashboards"
          description="Premium BI patterns I ship in production — filters, cross-filtering, drill-down, anomaly flags, and CSV / SVG export. Pick a view, then filter and click to explore."
        />
        <div className="mt-10">
          <DashboardsClient />
        </div>
      </section>
      <CTASection />
    </>
  );
}
