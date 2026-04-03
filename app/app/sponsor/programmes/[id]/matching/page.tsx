"use client";

import Link from "next/link";
import { SponsorAiPanel, SponsorCompareTray, SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function ProgrammeMatchingPage({ params }: { params: { id: string } }) {
  const { programmes, vendors, aiRun, runAiMatching, addVendorToShortlist, toggleVendorWatch, flagVendorRisk, toggleCompareVendor, compareVendorIds } = useSponsorDemo();
  const programme = programmes.find((item) => item.id === params.id) ?? programmes[0];
  const visibleVendors = aiRun.active && aiRun.programmeId === programme.id ? vendors.filter((vendor) => aiRun.partialVendorIds.includes(vendor.id)) : vendors;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="AI match results" title={`${programme.name} matching workspace`} body="This flagship sponsor screen now uses a staged AI processing sequence rather than instant static results. Requirement parsing, vendor scoring, capacity checks, regulatory review, and shortlist generation all surface progressively and drive downstream shortlist state." badges={[{ label: programme.status.replace(/_/g, " "), tone: "teal" }, { label: aiRun.active && aiRun.programmeId === programme.id ? `${aiRun.progress}% complete` : "Ready", tone: aiRun.active ? "gold" : "slate" }]} actions={[{ label: "Open shortlist", href: "/app/sponsor/shortlists", tone: "ghost" }]} />

      <SponsorAiPanel active={aiRun.active && aiRun.programmeId === programme.id} title="AI matching orchestration" progress={aiRun.active && aiRun.programmeId === programme.id ? aiRun.progress : 100} stage={aiRun.active && aiRun.programmeId === programme.id ? aiRun.stage : "Shortlist interaction enabled"} summary="Run AI match to parse programme requirements, normalize modality constraints, rank vendors, and reveal rationale with risk and capacity context.">
        <div className="flex flex-wrap gap-3"><button onClick={() => runAiMatching(programme.id)} disabled={aiRun.active} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">{aiRun.active ? `Processing ${aiRun.progress}%` : "Run AI Match"}</button><Link href="/app/sponsor/search" className="rounded-full border border-slate-200/80 px-5 py-3 text-sm text-slate-700">Open discovery view</Link></div>
      </SponsorAiPanel>

      <div className="grid gap-4 xl:grid-cols-3">
        {visibleVendors.map((vendor) => {
          const compared = compareVendorIds.includes(vendor.id);
          return (
            <div key={vendor.id} className="rounded-[28px] border border-slate-200/80 bg-white/78 p-5 transition duration-300 hover:-translate-y-1 hover:border-slate-200">
              <div className="flex items-start justify-between gap-3"><div><div className="font-display text-3xl text-slate-900">{vendor.name}</div><div className="mt-1 text-sm text-slate-500">{vendor.geography}</div></div><span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-indigo-700">{vendor.relationship}</span></div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl border border-slate-200/80 bg-white/78 p-3"><div className="text-slate-500">Fit</div><div className="mt-1 text-2xl text-slate-900">{vendor.fit}</div></div><div className="rounded-2xl border border-slate-200/80 bg-white/78 p-3"><div className="text-slate-500">CRDMO</div><div className="mt-1 text-2xl text-slate-900">{vendor.score}</div></div></div>
              <div className="mt-4 flex flex-wrap gap-2">{vendor.badges.map((badge) => <span key={badge} className="rounded-full border border-slate-200/80 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-600">{badge}</span>)}</div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{vendor.rationale}</p>
              <div className="mt-2 text-sm text-amber-600">Capacity: {vendor.availability} • Risk: {vendor.riskLevel}</div>
              <div className="mt-2 text-sm text-rose-600">{vendor.risks}</div>
              <div className="mt-5 flex flex-wrap gap-2"><button onClick={() => addVendorToShortlist(programme.id, vendor.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-4 py-2 text-xs text-white transition hover:bg-indigo-500">Add to shortlist</button><button onClick={() => toggleVendorWatch(vendor.id)} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50">Watch vendor</button><button onClick={() => toggleCompareVendor(vendor.id)} className={`rounded-full border px-4 py-2 text-xs transition ${compared ? "border-indigo-200 bg-indigo-600 text-white" : "border-slate-200/80 text-slate-700 hover:bg-slate-50"}`}>{compared ? "Added to compare" : "Compare"}</button><button onClick={() => flagVendorRisk(vendor.id)} className="rounded-full border border-rose-400/20 bg-rose-50 px-4 py-2 text-xs text-rose-700 transition hover:bg-rose-100">Flag risk</button><Link href={`/app/sponsor/vendors/${vendor.id}`} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50">Full profile</Link></div>
            </div>
          );
        })}
      </div>
      <SponsorCompareTray count={compareVendorIds.length} />
    </div>
  );
}



