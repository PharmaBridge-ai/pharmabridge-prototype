import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";

export default function SponsorCapacityPage() {
  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Capacity intelligence" title="Anticipate slot risk before issuing or awarding work" body="Capacity intelligence helps Sponsors see tightness by modality, region, site, and timeline so sourcing and award timing can be adjusted before execution risk appears." badges={[{ label: "By modality / region / site", tone: "teal" }, { label: "Start RFP sooner", tone: "gold" }]} />
      <SponsorTable title="Capacity signals" subtitle="Illustrative view of market tightness and recommended action." columns={["Segment", "Utilization", "Signal", "Action"]} rows={[["EU ADC fill-finish", "91%", "Tight", "Accelerate award"],["US mRNA DS", "74%", "Manageable", "Monitor weekly"],["Radiopharma isotope supply", "88%", "Volatile", "Create backup watchlist"]]} />
      <SponsorCards title="Use cases" subtitle="How buyer teams operationalize capacity data." items={[{ title: "Add impacted vendors to watchlist", body: "Keep shortlisted vendors under active capacity monitoring when slot risk is elevated.", meta: "Monitoring", tone: "teal" },{ title: "Refresh shortlist", body: "Run matching again if a key region or modality becomes materially constrained.", meta: "Sourcing action", tone: "gold" }]} />
    </div>
  );
}
