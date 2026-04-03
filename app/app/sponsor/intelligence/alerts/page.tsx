"use client";

import { SponsorCards, SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorAlertsPage() {
  const { alerts, dismissAlert } = useSponsorDemo();

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Regulatory alerts" title="Live Sponsor alert center" body="Watch actions, risk flags, disputes, and seeded intelligence now all land in the same alert model. Dismissing or escalating alerts changes what appears across dashboard and intelligence." badges={[{ label: `${alerts.length} alerts`, tone: "teal" }, { label: `${alerts.filter((item) => item.status === "high_risk").length} high risk`, tone: "red" }]} />
      <SponsorTable title="Alert detail" subtitle="Connected to watchlists and project events." columns={["Alert", "Status", "Action"]} rows={alerts.map((alert) => [alert.title, alert.status.replace(/_/g, " "), alert.body])} />
      <div className="grid gap-4 xl:grid-cols-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-[28px] border border-slate-200/80 bg-white/78 p-5">
            <div className="font-display text-2xl text-slate-900">{alert.title}</div>
            <div className="mt-2 text-sm text-slate-600">{alert.body}</div>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-700">{alert.status.replace(/_/g, " ")}</span>
              <button onClick={() => dismissAlert(alert.id)} className="rounded-full border border-slate-200/80 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-50">Dismiss</button>
            </div>
          </div>
        ))}
      </div>
      <SponsorCards title="Alert behavior" subtitle="Prototype actions that now feed this screen." items={[{ title: "Watch vendor", body: "Creates a watched alert and updates dashboard/intelligence counts.", meta: "Monitoring", tone: "teal" }, { title: "Flag risk or dispute", body: "Creates high-risk alerts tied to vendor and project state changes.", meta: "Critical", tone: "red" }]} />
    </div>
  );
}

