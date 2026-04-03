import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";

export default async function RfpProposalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Proposal inbox" title={`Proposal tracking for ${id}`} body="Track status, completeness, price band, risk flags, timeline, and reviewer ownership before moving into normalized AI comparison and final scoring." badges={[{ label: "Submission control", tone: "teal" }, { label: "Late / incomplete states", tone: "gold" }]} actions={[{ label: "Run comparison", href: `/app/sponsor/rfps/${id}/comparison`, tone: "primary" }]} />
      <SponsorTable title="Proposal inbox" subtitle="Production-style intake states for each invited vendor." columns={["Vendor", "Status", "Completeness", "Price band", "Timeline", "Owner"]} rows={[["WuXi XDC", "Submitted", "Complete", "Premium", "24 weeks", "CMC Lead"],["Lonza Ibex", "Submitted", "Complete", "Upper-mid", "26 weeks", "Procurement"],["Abzena", "In progress", "Partial", "Mid", "22 weeks", "CMC Lead"]]} />
      <SponsorCards title="Review cues" subtitle="Where the team should focus before scoring." items={[{ title: "Commercial normalization", body: "Normalize premium line items and one-time transfer fees before presenting proposals to executives.", meta: "Price review", tone: "gold" },{ title: "Regulatory confidence", body: "Flag any assumptions around external release testing and site-transfer dependencies before award recommendation.", meta: "Risk review", tone: "red" }]} />
    </div>
  );
}
