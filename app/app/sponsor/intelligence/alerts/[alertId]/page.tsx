"use client";

import { use } from "react";
import Link from "next/link";
import { SponsorCards, SponsorHeader } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function AlertDetailPage({ params }: { params: Promise<{ alertId: string }> }) {
  const { alertId } = use(params);
  const { alerts, dismissAlert, respondToAlert } = useSponsorDemo();
  const alert = alerts.find((item) => item.id === alertId) ?? alerts[0];

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Alert detail" title={alert.title} body="Alert detail keeps the signal, impacted entity, and recommended next step visible so sponsor teams can act quickly." badges={[{ label: alert.status.replace(/_/g, " "), tone: alert.status === "critical" ? "red" : alert.status === "high_risk" ? "gold" : "teal" }]} actions={[{ label: "Back to intelligence", href: "/app/sponsor/intelligence", tone: "ghost" }]} />
      <SponsorCards title="Alert summary" subtitle="Action-oriented context for sponsor review." items={[{ title: "Summary", body: alert.body, meta: "Context", tone: "slate" }, { title: "Impacted entity", body: alert.linkedVendorId ?? alert.linkedProgrammeId ?? "Linked workflow item", meta: "Related object", tone: "gold" }, { title: "Recommended next step", body: "Open the related vendor, programme, or project and review the current sourcing or execution state.", meta: "Suggested action", tone: "teal" }]} />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => dismissAlert(alert.id)} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Dismiss</button>
        <button onClick={() => respondToAlert(alert.id, "watch")} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">Watch</button>
        <Link href={alert.linkedVendorId ? `/app/sponsor/vendors/${alert.linkedVendorId}` : alert.linkedProgrammeId ? `/app/sponsor/programmes/${alert.linkedProgrammeId}` : "/app/sponsor/intelligence"} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Open related item</Link>
      </div>
    </div>
  );
}

