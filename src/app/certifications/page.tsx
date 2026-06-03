import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { CertGrid } from "@/components/CertGrid";
import { CTASection } from "@/components/CTASection";
import { certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Machine learning, mathematics, business, and language certifications — with full preview.",
};

export default function CertificationsPage() {
  return (
    <>
      <section className="container-px py-14">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description={`${certifications.length} credentials across machine learning, mathematics, business, and language. Click any card to preview.`}
        />
        <div className="mt-8">
          <CertGrid />
        </div>
      </section>
      <CTASection />
    </>
  );
}
