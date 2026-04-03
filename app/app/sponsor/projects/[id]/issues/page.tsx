import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { issues } from "@/lib/mock-data/sponsor";

export default async function ProjectIssuesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Issues and disputes" title={`Deviation log for ${id.replace(/-/g, " ")}`} body="Issues, deviations, CAPAs, and formal disputes live in one buyer-facing control board with linked milestones, severity, owners, and evidence." badges={[{ label: "Critical / major / minor", tone: "red" }, { label: "Formal dispute path", tone: "gold" }]} />
      <SponsorTable title="Issue register" subtitle="Quality and trust events requiring action." columns={["Issue", "Severity", "Owner", "Linked item", "Due"]} rows={issues.map((issue) => [issue.title, issue.severity, issue.owner, issue.linked, issue.due])} />
      <SponsorCards title="Escalation actions" subtitle="What the Sponsor team can do from this board." items={[{ title: "Acknowledge issue", body: "Record that the deviation has been reviewed and assign a Sponsor-side owner.", meta: "Baseline action", tone: "teal" },{ title: "Request corrective action", body: "Push remediation back to the vendor with evidence requirements and due dates.", meta: "CAPA flow", tone: "gold" },{ title: "Open formal dispute", body: "Escalate to the platform dispute process when quality or commercial impact becomes material.", meta: "Escalation", tone: "red" }]} />
    </div>
  );
}
