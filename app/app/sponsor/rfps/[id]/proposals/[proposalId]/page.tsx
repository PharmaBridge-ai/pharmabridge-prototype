"use client";

import { use } from "react";
import Link from "next/link";
import { SponsorCards, SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function ProposalDetailPage({ params }: { params: Promise<{ id: string; proposalId: string }> }) {
  const { id, proposalId } = use(params);
  const { proposals } = useSponsorDemo();
  const proposal = proposals.find((item) => item.id === proposalId) ?? proposals[0];

  return (
    <div className="space-y-6">
      <SponsorHeader
        eyebrow="Proposal detail"
        title={proposal.vendor}
        body="Review executive, technical, commercial, timeline, and risk response in a sponsor-friendly format before comparison or award."
        badges={[{ label: proposal.status.replace(/_/g, " "), tone: proposal.status === "selected" ? "teal" : "gold" }, { label: `${proposal.completeness}% complete`, tone: "slate" }]}
        actions={[{ label: "Back to proposals", href: `/app/sponsor/rfps/${id}/proposals`, tone: "ghost" }, { label: "Open comparison", href: `/app/sponsor/rfps/${id}/comparison` }]}
      />
      <SponsorCards title="Proposal sections" subtitle="The proposal detail page stays connected to comparison and award workflows." items={[{ title: "Executive summary", body: proposal.note, meta: "Overview", tone: "teal" }, { title: "Technical response", body: `Technical score: ${proposal.tech}. Regulatory score: ${proposal.regulatory}.`, meta: "Technical", tone: "gold" }, { title: "Commercials", body: `Price band: ${proposal.priceBand}. Commercial score: ${proposal.price}.`, meta: "Commercial", tone: "slate" }, { title: "Timeline", body: `Timeline score: ${proposal.timeline}. Completeness: ${proposal.completeness}%.`, meta: "Timeline", tone: "green" }, { title: "Risks / deviations", body: "Review assumptions, capacity posture, and any bidder deviations before final award.", meta: "Risk", tone: "red" }]} />
      <div className="flex flex-wrap gap-3">
        <Link href={`/app/sponsor/rfps/${id}/comparison`} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Compare</Link>
        <Link href={`/app/sponsor/rfps/${id}/award`} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Move to award board</Link>
      </div>
    </div>
  );
}

