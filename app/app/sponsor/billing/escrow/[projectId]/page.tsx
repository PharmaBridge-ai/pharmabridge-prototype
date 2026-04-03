"use client";

import { use } from "react";
import Link from "next/link";
import { SponsorHeader, SponsorMetricGrid, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function EscrowDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const { project, milestones, fundEscrow } = useSponsorDemo();

  return (
    <div className="space-y-6">
      <SponsorHeader
        eyebrow="Escrow"
        title={`Escrow detail for ${projectId.replace(/-/g, " ")}`}
        body="Funding status is directly tied to project activation and milestone-linked payment realism in the sponsor prototype."
        badges={[{ label: project.escrowStatus.replace(/_/g, " "), tone: "teal" }, { label: project.status.replace(/_/g, " "), tone: project.status === "pending_funding" ? "gold" : "slate" }]}
        actions={[{ label: "Return to project", href: `/app/sponsor/projects/${projectId}`, tone: "ghost" }]}
      />
      <SponsorMetricGrid metrics={[["Contract value", "$2.14M", "Awarded project value"], ["Minimum escrow required", "$620K", "Funding threshold before activation"], ["Current balance", `$${project.escrowBalance.toLocaleString()}`, project.escrowStatus.replace(/_/g, " ")], ["Funding status", project.status.replace(/_/g, " "), "Project state updates when funded"]]} />
      <SponsorTable title="Milestone payment plan" subtitle="Milestone amounts mirror project review and payment flow." columns={["Milestone", "Amount", "State", "Due"]} rows={milestones.map((milestone) => [milestone.title, `$${milestone.escrow.toLocaleString()}`, milestone.state, milestone.due])} />
      <div className="flex flex-wrap gap-3">
        <button onClick={fundEscrow} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Fund escrow</button>
        <Link href="/app/sponsor/billing" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Back to billing</Link>
      </div>
    </div>
  );
}

