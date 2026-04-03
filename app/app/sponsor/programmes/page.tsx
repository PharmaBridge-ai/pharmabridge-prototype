"use client";

import Link from "next/link";
import { SponsorHeader, SponsorTable } from "@/components/sponsor/workspace";
import { useSponsorDemo } from "@/lib/state/sponsor-demo";

export default function ProgrammesPage() {
  const { programmes } = useSponsorDemo();

  return (
    <div className="space-y-6">
      <SponsorHeader
        eyebrow="Programmes"
        title="Manage sponsor programmes from draft through execution."
        body="Programmes connect directly to matching, shortlists, RFPs, awards, and projects. Each row exposes the next action rather than leaving dead ends."
        badges={[{ label: `${programmes.length} total programmes`, tone: "teal" }]}
        actions={[{ label: "Create programme", href: "/app/sponsor/programmes/new" }]}
      />

      <SponsorTable
        title="Programme portfolio"
        subtitle="Views cover draft, ready for matching, shortlist ready, RFP, award, and execution states."
        columns={["Programme", "Modality / stage", "Partner type", "Status", "Next action", "Open"]}
        rows={programmes.map((programme) => [
          programme.name,
          `${programme.modality} / ${programme.stage}`,
          programme.vendorType,
          programme.status.replace(/_/g, " "),
          programme.next,
          <Link key={programme.id} href={`/app/sponsor/programmes/${programme.id}`} className="text-indigo-600">View</Link>,
        ])}
      />
    </div>
  );
}

