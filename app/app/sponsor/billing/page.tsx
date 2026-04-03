"use client";

import Link from "next/link";
import { SponsorCards, SponsorHeader, SponsorMetricGrid, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function SponsorBillingPage() {
  const { invoices, project } = useSponsorDemo();
  return (
    <div className="space-y-6">
      <SponsorHeader eyebrow="Billing and escrow" title="Sponsor billing, invoices, and protected project funding" body="Billing is connected to project activation, milestone review, and escrow state so funding actions feel operational instead of isolated." badges={[{ label: project.escrowStatus.replace(/_/g, " "), tone: "teal" }, { label: `${invoices.length} invoices`, tone: "gold" }]} actions={[{ label: "Open escrow detail", href: `/app/sponsor/billing/escrow/${project.id}` }]} />
      <SponsorMetricGrid metrics={[["Escrow balance", `$${project.escrowBalance.toLocaleString()}`, project.escrowStatus.replace(/_/g, " ")], ["Pending release", `$${project.pendingRelease.toLocaleString()}`, "Tied to milestone review"], ["Due invoices", `${invoices.filter((item) => item.status === "due").length}`, "Sponsor payable queue"], ["Project status", project.status.replace(/_/g, " "), project.vendorName]]} />
      <SponsorTable title="Invoice summary" subtitle="Demo-ready sponsor billing records and escrow-linked payments." columns={["Invoice", "Amount", "Status", "Due"]} rows={invoices.map((invoice) => [invoice.label, `$${invoice.amount.toLocaleString()}`, invoice.status, invoice.due])} />
      <SponsorCards title="Financial actions" subtitle="Funding and invoice visibility remain close to the project workflow." items={[{ title: "Escrow summary", body: "Open the detailed funding view to activate the project or review the milestone payment plan.", meta: "Escrow", tone: "teal", href: `/app/sponsor/billing/escrow/${project.id}` }, { title: "Invoice workflow", body: "Use billing to review paid, due, and scheduled sponsor invoices with believable enterprise posture.", meta: "AP ops", tone: "gold" }]} />
      <div className="flex flex-wrap gap-3"><Link href={`/app/sponsor/billing/escrow/${project.id}`} className="rounded-full border border-indigo-200 bg-indigo-600 px-5 py-3 text-sm text-white">Open escrow detail</Link></div>
    </div>
  );
}

