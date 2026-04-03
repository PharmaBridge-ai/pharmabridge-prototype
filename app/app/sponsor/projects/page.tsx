"use client";

import Link from "next/link";
import { SponsorCards, SponsorHeader, SponsorMetricGrid, SponsorTimeline } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorProjectsPage() {
  const { project, milestones, fundEscrow, alerts } = useSponsorDemo();
  const awaiting = milestones.filter((item) => item.state === "awaiting_review").length;
  const riskCount = alerts.filter((item) => item.status === "high_risk" || item.status === "critical").length;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Projects" title="Execution workspace with escrow, milestones, and live risk overlays" body="Funding escrow and approving milestones now produce real object transitions inside the sponsor prototype. This is the execution side of the buyer flow, with connected quality, issue, and intelligence context rather than a static post-award page." badges={[{ label: project.status.replace(/_/g, " "), tone: "teal" }, { label: project.escrowStatus.replace(/_/g, " "), tone: "gold" }]} actions={[{ label: "Open active project", href: "/app/sponsor/projects/active-ppq", tone: "primary" }]} />
      <SponsorMetricGrid metrics={[["Escrow balance", `$${project.escrowBalance.toLocaleString()}`, project.escrowStatus.replace(/_/g, " ")], ["Pending release", `$${project.pendingRelease.toLocaleString()}`, "Triggered by milestone review"], ["Milestones awaiting review", `${awaiting}`, "Connected to project state"], ["Risk overlays", `${riskCount}`, `${project.qualityScore} quality score`]]} />
      <div className="flex flex-wrap gap-3"><button onClick={fundEscrow} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Fund escrow</button><Link href="/app/sponsor/projects/active-ppq/milestones/m3" className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Review milestone 3</Link></div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]"><SponsorTimeline title="Project timeline" subtitle="Execution moments with stateful sponsor actions." items={milestones.map((milestone) => ({ title: milestone.title, meta: `Due ${milestone.due} / Escrow $${milestone.escrow.toLocaleString()} / ${milestone.summary}`, state: milestone.state }))} /><SponsorCards title="Deep links" subtitle="Move directly into related project objects." items={[{ title: "Document vault", body: "Controlled evidence and contract artifacts with milestone linkage.", meta: "Project docs", tone: "teal", href: "/app/sponsor/projects/active-ppq/documents" }, { title: "Issues and disputes", body: "Review deviations, CAPAs, and formal escalations.", meta: "Risk board", tone: "red", href: "/app/sponsor/projects/active-ppq/issues" }, { title: "Quality dashboard", body: "Track release confidence, quality score, and operational performance.", meta: "KPIs", tone: "gold", href: "/app/sponsor/projects/active-ppq/quality" }]} /></div>
    </div>
  );
}


