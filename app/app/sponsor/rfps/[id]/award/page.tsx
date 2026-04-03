"use client";

import Link from "next/link";
import { SponsorCards, SponsorHeader, SponsorTable, SponsorTimeline } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function RfpAwardPage({ params }: { params: { id: string } }) {
  const { proposals, awardVendor, project } = useSponsorDemo();
  const scoped = proposals.filter((proposal) => proposal.rfpId === params.id);
  const selectedVendor = scoped.slice().sort((a, b) => b.total - a.total)[0] ?? proposals[0];

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Scoring and award" title={`Award board for ${params.id}`} body="Awarding a vendor updates the proposal state, the RFP state, the linked programme, and the downstream project funding view. This is now a connected handoff into execution rather than a decorative endpoint." badges={[{ label: "Consensus workflow", tone: "gold" }, { label: project.status.replace(/_/g, " "), tone: "teal" }]} actions={[{ label: "Open project workspace", href: "/app/sponsor/projects/active-ppq", tone: "ghost" }]} />
      <SponsorTable title="Scoring board" subtitle="Highest score can be awarded directly inside the simulation." columns={["Vendor", "Score", "Status", "Commercial", "Summary"]} rows={scoped.map((proposal) => [proposal.vendor, `${proposal.total}`, proposal.status.replace(/_/g, " "), proposal.priceBand, proposal.note])} />
      <div className="flex flex-wrap gap-3"><button onClick={() => awardVendor(params.id, selectedVendor.vendorId)} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Award top-ranked vendor</button><Link href="/app/sponsor/projects/active-ppq" className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Go to project workspace</Link></div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]"><SponsorCards title="Selected vendor" subtitle="Current award recommendation." items={[{ title: selectedVendor.vendor, body: `${selectedVendor.note} Funding will be the next required sponsor action.`, meta: `${selectedVendor.total} weighted score`, tone: "teal" }]} /><SponsorTimeline title="After award" subtitle="Connected state changes triggered by award." items={[{ title: "RFP moves to awarded", meta: "Sourcing motion closes and the award is recorded in the RFP object.", state: "Automated" }, { title: "Project moves to pending funding", meta: "Escrow panel becomes the next required sponsor action.", state: "Automated" }, { title: "Selected vendor becomes active partner", meta: "Vendor relationship advances to awarded across sponsor views.", state: "Automated" }]} /></div>
    </div>
  );
}


