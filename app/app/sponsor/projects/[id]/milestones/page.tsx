import { SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { milestones } from "@/lib/mock-data/sponsor";

export default async function ProjectMilestonesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Milestone tracker" title={`Milestones for ${id.replace(/-/g, " ")}`} body="Track pending, in-progress, awaiting review, approved, disputed, overdue, and paid states with escrow-linked payment triggers." badges={[{ label: "5 business day review SLA", tone: "gold" }, { label: "Payment trigger visibility", tone: "teal" }]} actions={[{ label: "Open milestone detail", href: `/app/sponsor/projects/${id}/milestones/m3`, tone: "primary" }]} />
      <SponsorTable title="Milestone timeline" subtitle="Execution and payment status at milestone level." columns={["Milestone", "State", "Escrow", "Due", "Action"]} rows={milestones.map((milestone) => [milestone.title, milestone.state, milestone.escrow, milestone.due, milestone.id === "m3" ? "Review now" : "View"])} />
    </div>
  );
}
