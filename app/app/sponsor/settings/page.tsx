"use client";

import { SponsorCards, SponsorHeader, SponsorMetricGrid } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorSettingsPage() {
  const { onboarding } = useSponsorDemo();
  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Settings" title="Sponsor organisation, users, and notification governance" body="Settings now feel like part of the product workflow instead of a dead-end page. Org setup, internal users, and notification rules are framed as connected operating controls for sponsor teams running programmes and projects." badges={[{ label: onboarding.companyName, tone: "teal" }, { label: onboarding.status.replace(/_/g, " "), tone: "gold" }]} />
      <SponsorMetricGrid metrics={[["Onboarding", `${onboarding.completion}%`, onboarding.status.replace(/_/g, " ")], ["Org users", "12", "4 procurement / 5 technical / 3 executive"], ["Notification rules", "8", "Programme, RFP, milestone, intelligence"], ["Security review", "Current", "SSO and audit posture configured"]]} />
      <SponsorCards title="Settings modules" subtitle="Connected governance areas for the sponsor workspace." items={[{ title: "Organisation profile", body: "Company metadata, procurement policy, and compliance defaults used across new programme setup.", meta: "Org", tone: "teal" }, { title: "Internal users", body: "Invite procurement, CMC, QA, finance, and executive reviewers with role-aware visibility.", meta: "Users", tone: "gold" }, { title: "Notifications", body: "Control milestone alerts, RFP events, vendor watchlist escalations, and billing reminders.", meta: "Rules", tone: "green" }]} />
    </div>
  );
}


