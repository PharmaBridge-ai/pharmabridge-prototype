"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SponsorCards, SponsorHeader, SponsorTable, SponsorTimeline } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function ProgrammeDetailPage({ params }: { params: { id: string } }) {
  const { programmes, vendors, createRfp } = useSponsorDemo();
  const programme = programmes.find((item) => item.id === params.id) ?? programmes[0];
  const shortlist = useMemo(() => vendors.filter((vendor) => programme.shortlistIds.includes(vendor.id)), [programme.shortlistIds, vendors]);

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Programme detail" title={programme.name} body="Programme detail now acts as the sponsor operating hub for a single outsourcing motion. Requirement matrix, shortlist composition, linked RFP, and downstream execution all sit on the same underlying state object rather than separate mock screens." badges={[{ label: programme.modality, tone: "teal" }, { label: programme.status.replace(/_/g, " "), tone: "gold" }, { label: `${shortlist.length} shortlisted`, tone: "slate" }]} actions={[{ label: "Run AI shortlist", href: `/app/sponsor/programmes/${programme.id}/matching`, tone: "primary" }, { label: "Create RFP draft", href: `/app/sponsor/rfps/new?programmeId=${programme.id}`, tone: "ghost" }]} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SponsorTable title="Requirement matrix summary" subtitle="Programme context, commercial framing, and compliance posture used across matching and procurement." columns={["Field", "Value", "Meaning"]} rows={[[programme.status.replace(/_/g, " "), programme.next, "Lifecycle and next step"], [programme.region, programme.budgetBand, "Geography and budget bands"], [programme.timeline, programme.indication, "Award timing and indication"], [programme.compliance.join(", "), `${shortlist.length} vendors`, "Compliance scope and current shortlist"]]} />
        <SponsorCards title="Linked objects" subtitle="Primary handoffs for the sponsor workflow." items={[{ title: shortlist.length ? "Shortlist ready" : "No shortlist yet", body: shortlist.length ? `${shortlist.length} vendors are connected to this programme and can move into compare or RFP creation.` : "Run AI matching or manually add vendors from search results to begin evaluation.", meta: shortlist.length ? "Live" : "Empty", tone: shortlist.length ? "teal" : "slate", href: `/app/sponsor/programmes/${programme.id}/matching` }, { title: programme.linkedRfpId ? "Linked RFP" : "RFP not created", body: programme.linkedRfpId ? `This programme is linked to ${programme.linkedRfpId} for operational sourcing.` : "Create a draft RFP once the shortlist is ready.", meta: programme.linkedRfpId ? "Connected" : "Next", tone: "gold", href: programme.linkedRfpId ? `/app/sponsor/rfps/${programme.linkedRfpId}` : `/app/sponsor/rfps/new?programmeId=${programme.id}` }]} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SponsorTimeline title="Programme lifecycle" subtitle="Connected path from intake to execution." items={[{ title: "Structured intake", meta: programme.summary, state: programme.status === "draft" ? "Current" : "Done" }, { title: "AI shortlist", meta: "Sponsor requirements are normalized, vendors ranked, and rationale generated with risk and capacity context.", state: programme.status === "matching_in_progress" ? "In progress" : shortlist.length ? "Ready" : "Pending" }, { title: "RFP and bidder operations", meta: "Shortlisted vendors move into an NDA-gated RFP with proposal intake and AI comparison.", state: programme.linkedRfpId ? "Live" : "Upcoming" }, { title: "Award and execution", meta: "Selected vendor moves into project workspace with milestones, escrow, and intelligence overlays.", state: programme.linkedProjectId ? "Live" : "Upcoming" }]} />
        <div className="rounded-[28px] border border-slate-200/80 bg-white/78 p-6">
          <div className="font-display text-3xl text-slate-900">Quick actions</div>
          <div className="mt-4 space-y-3">
            <Link href={`/app/sponsor/programmes/${programme.id}/matching`} className="block rounded-2xl border border-slate-200/80 bg-white/78 px-4 py-3 text-sm text-slate-700 transition hover:bg-white">Open matching workspace</Link>
            <Link href="/app/sponsor/compare" className="block rounded-2xl border border-slate-200/80 bg-white/78 px-4 py-3 text-sm text-slate-700 transition hover:bg-white">Open shortlist compare board</Link>
            <button onClick={() => createRfp(programme.id)} className="block w-full rounded-2xl border border-indigo-200 bg-indigo-600 px-4 py-3 text-left text-sm text-white transition hover:bg-indigo-500">Create draft RFP from current shortlist</button>
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/78 p-4">
            <div className="text-sm text-slate-500">Requirements preview</div>
            <div className="mt-3 space-y-2 text-sm text-slate-700">{programme.requirements.map((item) => <div key={item.label} className="flex items-center justify-between gap-4"><span>{item.label}</span><span className="text-slate-500">{item.value}</span></div>)}</div>
          </div>
        </div>
      </div>

      <SponsorCards title="Current shortlist" subtitle="Believable buyer-side rationale and fit summaries." items={shortlist.length ? shortlist.map((vendor) => ({ title: vendor.name, body: `${vendor.rationale} Risk: ${vendor.risks}`, meta: vendor.relationship, tone: vendor.relationship === "finalist" ? "teal" : "gold", href: `/app/sponsor/vendors/${vendor.id}` })) : [{ title: "No shortlist saved", body: "Use the AI matching workspace to populate this programme with ranked vendor candidates.", meta: "Empty state", tone: "slate", href: `/app/sponsor/programmes/${programme.id}/matching` }]} />
    </div>
  );
}


