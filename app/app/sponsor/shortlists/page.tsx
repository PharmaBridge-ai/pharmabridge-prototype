"use client";

import Link from "next/link";
import { SponsorCards, SponsorEmptyState, SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorShortlistsPage() {
  const { programmes, vendors, createRfp, removeVendorFromShortlist } = useSponsorDemo();
  const programme = programmes[0];
  const shortlist = vendors.filter((vendor) => programme.shortlistIds.includes(vendor.id));

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Shortlists" title="Curate bidder pools before RFP release" body="Shortlist membership is now a real stateful layer. Vendors added from matching or compare appear here immediately, can be removed, and can move into an RFP draft without leaving the sponsor workflow." badges={[{ label: `${shortlist.length} vendors`, tone: "teal" }, { label: programme.status.replace(/_/g, " "), tone: "gold" }]} actions={[{ label: "Create RFP draft", href: "/app/sponsor/rfps/new", tone: "ghost" }]} />
      {!shortlist.length ? <SponsorEmptyState title="No shortlist yet" body="Run matching or add vendors from discovery to begin building a sponsor bidder pool." ctaLabel="Open matching" ctaHref={`/app/sponsor/programmes/${programme.id}/matching`} /> : null}
      <div className="grid gap-4 xl:grid-cols-3">{shortlist.map((vendor) => <div key={vendor.id} className="rounded-[28px] border border-slate-200/80 bg-white/78 p-5"><div className="font-display text-3xl text-slate-900">{vendor.name}</div><div className="mt-1 text-sm text-slate-500">{vendor.geography}</div><div className="mt-4 text-sm leading-7 text-slate-600">{vendor.rationale}</div><div className="mt-5 flex flex-wrap gap-2"><Link href={`/app/sponsor/vendors/${vendor.id}`} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50">Profile</Link><button onClick={() => removeVendorFromShortlist(programme.id, vendor.id)} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50">Remove</button></div></div>)}</div>
      <SponsorCards title="Next step" subtitle="Move the current shortlist into procurement flow." items={[{ title: "Draft RFP from shortlist", body: "Create a draft RFP using the current shortlisted vendors and programme requirements.", meta: "Connected workflow", tone: "teal" }]} />
      <div><button onClick={() => createRfp(programme.id)} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white transition hover:bg-indigo-500">Proceed to RFP</button></div>
    </div>
  );
}


