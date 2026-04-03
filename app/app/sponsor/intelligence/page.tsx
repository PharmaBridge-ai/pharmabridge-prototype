"use client";

import { SponsorCards, SponsorHeader, SponsorMetricGrid, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorIntelligencePage() {
  const { alerts, watchlists, vendors, programmes } = useSponsorDemo();
  const critical = alerts.filter((item) => item.status === "critical" || item.status === "high_risk").length;

  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Intelligence" title="Continuous monitoring across vendors, capacity, and market risk" body="The intelligence module is now a sponsor command centre with route-aware links back to programmes, vendors, and projects. Watchlists, regulatory alerts, capacity signals, and recommended actions all live in one connected surface." badges={[{ label: `${critical} critical / high-risk`, tone: "red" }, { label: `${watchlists.length} watchlists`, tone: "teal" }]} actions={[{ label: "Regulatory alerts", href: "/app/sponsor/intelligence/alerts", tone: "primary" }, { label: "Capacity view", href: "/app/sponsor/intelligence/capacity", tone: "ghost" }]} />
      <SponsorMetricGrid metrics={[["Critical alerts", `${critical}`, "Tied to live sponsor workflows"], ["Watchlists", `${watchlists.length}`, "Vendor and modality thresholds"], ["Tracked vendors", `${vendors.length}`, "CDMO and CRDMO intelligence coverage"], ["Programmes linked", `${programmes.length}`, "Signals roll back into sourcing and execution"]]} />
      <SponsorTable title="Live alert stream" subtitle="Signals elevated into the sponsor command centre." columns={["Alert", "State", "Body"]} rows={alerts.map((alert) => [alert.title, alert.status.replace(/_/g, " "), alert.body])} />
      <SponsorCards title="Intelligence modules" subtitle="Operational slices of the sponsor intelligence system." items={[{ title: "Regulatory alerts", body: "Warning letters, GMP certificate changes, site flags, and market-impact notices tied back to programmes and vendors.", meta: "Risk view", tone: "red", href: "/app/sponsor/intelligence/alerts" }, { title: "Capacity heatmaps", body: "Monitor slot tightness by modality, region, site, vendor type, and timeline horizon.", meta: "Supply view", tone: "gold", href: "/app/sponsor/intelligence/capacity" }, { title: "Watchlists", body: "Track vendors, modalities, or programmes with custom thresholds and escalation routes.", meta: "Monitoring", tone: "teal", href: "/app/sponsor/intelligence/watchlists" }]} />
    </div>
  );
}


