"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labelMap: Record<string, string> = {
  app: "App",
  sponsor: "Sponsor",
  dashboard: "Dashboard",
  programmes: "Programmes",
  search: "Search & Match",
  compare: "Compare",
  shortlists: "Shortlists",
  rfps: "RFPs",
  projects: "Projects",
  intelligence: "Intelligence",
  alerts: "Alerts",
  capacity: "Capacity",
  watchlists: "Watchlists",
  billing: "Billing & Escrow",
  settings: "Settings",
  new: "New",
  matching: "Matching",
  qa: "Q&A",
  proposals: "Proposals",
  comparison: "Comparison",
  award: "Award",
  documents: "Documents",
  issues: "Issues",
  changes: "Changes",
  quality: "Quality",
  messages: "Messages",
  "active-ppq": "Active PPQ",
};

function prettify(segment: string) {
  return labelMap[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => ({
    label: prettify(segment),
    href: `/${segments.slice(0, index + 1).join("/")}`,
  }));

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/74 px-4 py-3 text-sm text-slate-500 shadow-[0_12px_30px_rgba(148,163,184,0.08)] backdrop-blur-xl">
      <Link href="/" className="transition hover:text-slate-900">Home</Link>
      {crumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-2">
          <span className="text-slate-300">/</span>
          {index === crumbs.length - 1 ? <span className="text-slate-900">{crumb.label}</span> : <a href={crumb.href} className="transition hover:text-slate-900">{crumb.label}</a>}
        </span>
      ))}
    </div>
  );
}

