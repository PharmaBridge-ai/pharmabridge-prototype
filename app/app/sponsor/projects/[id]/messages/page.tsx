import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";

export default async function ProjectMessagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Messages" title={`Structured communications for ${id.replace(/-/g, " ")}`} body="Project communications are threaded by topic, linked to milestones, documents, and issues, and retained as part of the audit trail with attachments, mentions, and search." badges={[{ label: "Audit trail", tone: "teal" }, { label: "Artifact-linked threads", tone: "gold" }]} />
      <SponsorTable title="Open threads" subtitle="Communication topics tied back to execution work." columns={["Topic", "Linked item", "Participants", "Last update"]} rows={[["Milestone 3 evidence gap", "Milestone review", "Sponsor QA + CDMO QA", "2h ago"],["Filter membrane change", "Change control", "CMC Lead + PM", "Today"],["Payment release timing", "Escrow", "Procurement + Finance", "Yesterday"]]} />
      <SponsorCards title="Messaging behaviors" subtitle="Prototype cues that make this feel like execution software instead of generic chat." items={[{ title: "Thread by object", body: "Users should understand what milestone, issue, or document a thread belongs to at a glance.", meta: "Context-first", tone: "teal" },{ title: "Notification-aware", body: "Email and in-app notification states should reinforce urgency without burying the core record trail.", meta: "Workflow", tone: "gold" }]} />
    </div>
  );
}
