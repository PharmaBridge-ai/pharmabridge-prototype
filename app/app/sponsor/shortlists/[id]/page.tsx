import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { matchResults } from "@/lib/mock-data/sponsor";

export default async function SponsorShortlistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Shortlist detail" title={id.replace(/-/g, " ")} body="Review vendor cards, internal notes, stage labels, procurement tags, and the final bidder pool before drafting the RFP." badges={[{ label: "3 approved vendors", tone: "teal" }, { label: "Legal review complete", tone: "green" }]} actions={[{ label: "Create RFP", href: "/app/sponsor/rfps/new", tone: "primary" }, { label: "Back to compare", href: "/app/sponsor/compare", tone: "ghost" }]} />
      <SponsorTable title="Approved vendors" subtitle="Shortlist members with immediate RFP-readiness context." columns={["Vendor", "Fit", "Availability", "Geography", "Reviewer note"]} rows={matchResults.map((vendor) => [vendor.name, `${vendor.fit}`, vendor.availability, vendor.geography, vendor.rationale])} />
      <SponsorCards title="Internal notes" subtitle="Cross-functional comments that shape RFP release decisions." items={[{ title: "CMC lead", body: "Keep WuXi and Lonza as primary technical finalists. Abzena remains a useful backup if slot timing worsens.", meta: "Technical", tone: "teal" },{ title: "Procurement lead", body: "Commercial guardrails set for premium pricing variance. Need executive approval above 10% benchmark delta.", meta: "Commercial", tone: "gold" },{ title: "QA reviewer", body: "Regulatory history checks complete; one site observation remains on watch but does not block bidder inclusion yet.", meta: "Risk monitored", tone: "red" }]} />
    </div>
  );
}
