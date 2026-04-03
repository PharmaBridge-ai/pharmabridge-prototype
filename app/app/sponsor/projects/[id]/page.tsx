"use client";

import { SponsorCards, SponsorHeader, SponsorMetricGrid, SponsorTimeline } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { project, milestones, activity, alerts } = useSponsorDemo();

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Project workspace" title={`Execution workspace: ${params.id.replace(/-/g, " ")}`} body="The project workspace is now connected to award, funding, milestone, dispute, and alert behavior so the execution stage responds to sponsor actions with visible operational consequences." badges={[{ label: project.status.replace(/_/g, " "), tone: project.status === "at_risk" || project.status === "disputed" ? "red" : "teal" }, { label: project.vendorName, tone: "slate" }]} actions={[{ label: "Milestones", href: `/app/sponsor/projects/${params.id}/milestones`, tone: "primary" }, { label: "Issues", href: `/app/sponsor/projects/${params.id}/issues`, tone: "ghost" }]} />
      <SponsorMetricGrid metrics={[["Project status", project.status.replace(/_/g, " "), "Updates from disputes and funding"], ["Escrow", project.escrowStatus.replace(/_/g, " "), `$${project.escrowBalance.toLocaleString()} current balance`], ["Pending release", `$${project.pendingRelease.toLocaleString()}`, "Drops on milestone approval"], ["Recent activity", `${activity.length}`, `${alerts.filter((item) => item.status !== "dismissed").length} live alerts`]]} />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><SponsorTimeline title="Milestone timeline" subtitle="Operational path from evidence to payment." items={milestones.map((item) => ({ title: item.title, meta: `Due ${item.due} / Escrow $${item.escrow.toLocaleString()} / ${item.summary}`, state: item.state }))} /><SponsorCards title="Recent activity" subtitle="Every important sponsor or system action is logged." items={activity.slice(0, 4).map((item) => ({ title: item.title, body: item.detail, meta: item.time, tone: "teal" }))} /></div>
      <SponsorCards title="Workspace modules" subtitle="Execution views connected to this project." items={[{ title: "Document vault", body: "Controlled files, quality agreements, and milestone evidence.", meta: "Docs", tone: "teal", href: `/app/sponsor/projects/${params.id}/documents` }, { title: "Change control", body: "Commercial, technical, and schedule changes with sponsor review paths.", meta: "Governance", tone: "gold", href: `/app/sponsor/projects/${params.id}/changes` }, { title: "Communications", body: "Project message thread and coordination history.", meta: "Messages", tone: "green", href: `/app/sponsor/projects/${params.id}/messages` }]} />
    </div>
  );
}


