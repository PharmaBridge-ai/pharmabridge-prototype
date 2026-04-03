"use client";

import { use } from "react";
import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function MilestoneDetailPage({ params }: { params: Promise<{ id: string; milestoneId: string }> }) {
  const { id, milestoneId } = use(params);
  const { milestones, approveMilestone, raiseDispute, project } = useSponsorDemo();
  const milestone = milestones.find((item) => item.id === milestoneId) ?? milestones[0];

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Milestone review" title={`Review ${milestone.title}`} body="Milestone approval and dispute actions now trigger real Sponsor-side changes: milestone status updates, project status movement, escrow changes, alert creation, and activity log entries." badges={[{ label: milestone.state, tone: milestone.state === "disputed" ? "red" : milestone.state === "paid" ? "green" : "gold" }, { label: project.escrowStatus.replace(/_/g, " "), tone: "teal" }]} actions={[{ label: "Project workspace", href: `/app/sponsor/projects/${id}`, tone: "ghost" }]} />
      <SponsorTable title="Evidence package" subtitle="Structured review payload." columns={["Item", "Status", "Action"]} rows={[["Engineering run summary", "Uploaded", "Ready for review"], ["Batch records", "Uploaded", "Ready for review"], ["Deviation closure evidence", milestone.state === "disputed" ? "Rejected" : "Needs sponsor review", "Flagged in review"], ["Escrow trigger", milestone.escrow, project.pendingRelease ? "Pending release" : "Released"]]} />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => approveMilestone(milestone.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Approve milestone</button>
        <button onClick={() => raiseDispute(milestone.id)} className="rounded-full border border-rose-400/20 bg-rose-50 px-5 py-3 text-sm text-rose-700">Raise dispute</button>
      </div>
      <SponsorCards title="Review result" subtitle="What the action does to the system." items={[{ title: "Approval path", body: "Milestone moves to paid, pending escrow release drops, and the project activity feed is updated.", meta: "Payment trigger", tone: "green" }, { title: "Dispute path", body: "Milestone moves to disputed, project enters dispute state, and a critical alert is created.", meta: "Escalation", tone: "red" }]} />
    </div>
  );
}

