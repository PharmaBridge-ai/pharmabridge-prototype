"use client";

import Link from "next/link";
import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorWatchlistsPage() {
  const { alerts, respondToAlert } = useSponsorDemo();
  const watched = alerts.filter((alert) => alert.status === "watched");

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Watchlists" title="Saved watch signals across vendors, modalities, and programmes" body="Watchlists are now derived from real Sponsor actions. Watching vendors from matching or profile pages creates tracked items here and updates dashboard/intelligence counts." badges={[{ label: `${watched.length} active watches`, tone: "teal" }, { label: `${alerts.length} total alerts`, tone: "gold" }]} />
      <SponsorTable title="Active watchlist items" subtitle="Derived from watched alert state." columns={["Title", "Status", "Action"]} rows={watched.length ? watched.map((alert) => [alert.title, alert.status, alert.body]) : [["No watched items", "empty", "Watch vendors or alerts to populate this list"]]} />
      <div className="grid gap-4 xl:grid-cols-2">
        {watched.length ? watched.map((alert) => (
          <div key={alert.id} className="rounded-[28px] border border-slate-200/80 bg-white/78 p-5">
            <div className="font-display text-2xl text-slate-900">{alert.title}</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">{alert.body}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => respondToAlert(alert.id, "escalate")} className="rounded-full border border-rose-400/20 bg-rose-50 px-4 py-2 text-xs text-rose-700">Escalate</button>
              <button onClick={() => respondToAlert(alert.id, "dismiss")} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700">Dismiss</button>
              {alert.linkedVendorId ? <Link href={`/app/sponsor/vendors/${alert.linkedVendorId}`} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700">Open vendor</Link> : null}
            </div>
          </div>
        )) : <div className="rounded-[28px] border border-dashed border-slate-200/80 bg-slate-50/70 p-10 text-slate-500 xl:col-span-2">No watchlist items yet. Use Watch vendor from matching or profile pages.</div>}
      </div>
      <SponsorCards title="Watchlist behavior" subtitle="Connected feedback across the Sponsor workspace." items={[{ title: "Watch vendor", body: "Creates a watched alert and surfaces it on dashboard and intelligence pages.", meta: "Connected", tone: "teal" }, { title: "Escalate watched item", body: "Promotes the item to high-risk and increases visibility in the alert center.", meta: "Risk workflow", tone: "red" }]} />
    </div>
  );
}

