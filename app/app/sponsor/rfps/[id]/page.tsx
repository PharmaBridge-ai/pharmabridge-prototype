"use client";

import Link from "next/link";
import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function RfpDetailPage({ params }: { params: { id: string } }) {
  const { rfps, proposals, distributeRfp, fastForwardProposals, generateComparison } = useSponsorDemo();
  const rfp = rfps.find((item) => item.id === params.id) ?? rfps[0];
  const scopedProposals = proposals.filter((item) => item.rfpId === rfp.id);

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Live RFP" title={rfp.title} body="This record behaves like a sourcing object rather than a static detail screen. Distribution, proposal intake, and AI comparison update the RFP state, related programme progress, vendor relationships, and downstream award readiness." badges={[{ label: rfp.state.replace(/_/g, " "), tone: "gold" }, { label: `${rfp.invitedVendorIds.length} invited`, tone: "teal" }]} actions={[{ label: "Open proposals", href: `/app/sponsor/rfps/${rfp.id}/proposals`, tone: "ghost" }, { label: "Open award board", href: `/app/sponsor/rfps/${rfp.id}/award`, tone: "primary" }]} />
      <SponsorTable title="Bidder activity" subtitle="States shift as the demo moves through the sourcing timeline." columns={["Vendor", "Status", "Completeness", "Commercial", "Summary"]} rows={scopedProposals.map((proposal) => [proposal.vendor, proposal.status.replace(/_/g, " "), `${proposal.completeness}%`, proposal.priceBand, proposal.note])} />
      <div className="flex flex-wrap gap-3">{!rfp.distributed ? <button onClick={() => distributeRfp(rfp.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Distribute RFP</button> : null}<button onClick={() => fastForwardProposals(rfp.id)} className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Fast-forward proposal timeline</button><button onClick={() => void generateComparison(rfp.id)} className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Generate AI comparison</button></div>
      <SponsorCards title="Operational modules" subtitle="Linked workspaces in the sourcing flow." items={[{ title: "Clarifications", body: "Open Q&A thread for bidder-visible clarifications and audit trail.", meta: "Open thread", tone: "teal", href: `/app/sponsor/rfps/${rfp.id}/qa` }, { title: "Proposal inbox", body: "Review completeness, submission state, and commercial summaries for each invited vendor.", meta: "Inbox", tone: "gold", href: `/app/sponsor/rfps/${rfp.id}/proposals` }, { title: "AI comparison report", body: "Move into weighted technical, price, timeline, and regulatory review.", meta: "Analysis", tone: "green", href: `/app/sponsor/rfps/${rfp.id}/comparison` }]} />
      <div className="flex flex-wrap gap-3 text-sm text-indigo-600"><Link href={`/app/sponsor/rfps/${rfp.id}/qa`}>Open Q&A</Link><Link href={`/app/sponsor/rfps/${rfp.id}/comparison`}>Open comparison</Link><Link href={`/app/sponsor/rfps/${rfp.id}/award`}>Open award board</Link></div>
    </div>
  );
}


