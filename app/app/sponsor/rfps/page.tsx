"use client";

import { SponsorCards, SponsorHeader, SponsorMetricGrid, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorRfpsPage() {
  const { rfps, distributeRfp, fastForwardProposals, proposals } = useSponsorDemo();
  const live = rfps.filter((item) => item.state === "live" || item.state === "proposals_incoming").length;
  const comparisonReady = rfps.filter((item) => item.state === "comparison_ready").length;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="RFP operations" title="Live sourcing workflow with connected bidder operations" body="RFPs now move through draft, live, clarification, comparison-ready, award-pending, and awarded states. Distribution, proposal intake, AI comparison, and award all update the connected programme and project objects." badges={[{ label: `${rfps.length} RFPs`, tone: "teal" }, { label: `${live} live`, tone: "gold" }]} actions={[{ label: "Create RFP", href: "/app/sponsor/rfps/new", tone: "primary" }]} />
      <SponsorMetricGrid metrics={[["Live RFPs", `${live}`, "Actively receiving responses"], ["Comparison ready", `${comparisonReady}`, "Ready for scoring board"], ["Submitted proposals", `${proposals.filter((item) => item.status === "submitted").length}`, "Inbox volume"], ["Award pending", `${rfps.filter((item) => item.state === "award_pending").length}`, "Decision board queue"]]} />
      <SponsorTable title="RFP inventory" subtitle="Each sourcing object is clickable and stateful." columns={["RFP", "State", "Invited", "Deadline", "Next"]} rows={rfps.map((rfp) => [rfp.title, rfp.state.replace(/_/g, " "), `${rfp.invitedVendorIds.length}`, rfp.deadline, rfp.next])} />
      <div className="grid gap-4 xl:grid-cols-3">{rfps.map((rfp) => <div key={rfp.id} className="rounded-[28px] border border-slate-200/80 bg-white/78 p-5"><div className="font-display text-2xl text-slate-900">{rfp.title}</div><div className="mt-1 text-sm text-slate-500">{rfp.state.replace(/_/g, " ")} • {rfp.deadline}</div><div className="mt-3 text-sm text-slate-600">{rfp.ndaMode}</div><div className="mt-5 flex flex-wrap gap-2">{!rfp.distributed ? <button onClick={() => distributeRfp(rfp.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-4 py-2 text-xs text-white">Distribute RFP</button> : null}<button onClick={() => fastForwardProposals(rfp.id)} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700">Fast-forward proposals</button><a href={`/app/sponsor/rfps/${rfp.id}`} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700">Open</a></div></div>)}</div>
      <SponsorCards title="Operational notes" subtitle="What the sponsor prototype now simulates in procurement operations." items={[{ title: "Distribution", body: "Moves the RFP live, updates invited vendor relationship state, and opens proposal work.", meta: "Stateful", tone: "teal" }, { title: "Proposal intake", body: "Proposal status and completeness update the inbox and trigger comparison-readiness when advanced.", meta: "Connected", tone: "gold" }, { title: "Award handoff", body: "Selected vendors create downstream execution context and funding actions.", meta: "Execution bridge", tone: "green" }]} />
    </div>
  );
}


