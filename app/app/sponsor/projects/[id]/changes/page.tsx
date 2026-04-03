import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { changes } from "@/lib/mock-data/sponsor";

export default async function ProjectChangesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Change control" title={`Change board for ${id.replace(/-/g, " ")}`} body="Structured change control makes cost, scope, timeline, and regulatory impact visible to the Sponsor reviewer with a defined decision window." badges={[{ label: "10 day review window", tone: "gold" }, { label: "Approve / reject / request info", tone: "teal" }]} />
      <SponsorTable title="Open requests" subtitle="Change requests pending Sponsor action." columns={["Request", "Impact", "Regulatory", "Due"]} rows={changes.map((change) => [change.title, change.impact, change.regulatory, change.due])} />
      <SponsorCards title="Decision cues" subtitle="How the Sponsor team should read a change request." items={[{ title: "Cost / scope coupling", body: "Make commercial impact obvious, especially when timeline changes are modest but cost deltas are material.", meta: "Commercial", tone: "gold" },{ title: "Regulatory impact", body: "Separate low operational tweaks from changes that could affect comparability or future filings.", meta: "Compliance", tone: "red" }]} />
    </div>
  );
}
