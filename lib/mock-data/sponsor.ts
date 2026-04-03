export const sponsorNav = [
  { label: "Dashboard", href: "/app/sponsor/dashboard" },
  { label: "Programmes", href: "/app/sponsor/programmes" },
  { label: "Match & Vendors", href: "/app/sponsor/compare" },
  { label: "RFPs", href: "/app/sponsor/rfps" },
  { label: "Proposals", href: "/app/sponsor/rfps/rfp-24018/proposals" },
  { label: "Projects", href: "/app/sponsor/projects" },
  { label: "Intelligence", href: "/app/sponsor/intelligence" },
  { label: "Billing & Escrow", href: "/app/sponsor/billing" },
  { label: "Settings", href: "/app/sponsor/settings" },
];

export const matchResults = [
  { name: "WuXi XDC", fit: 96, score: 94, availability: "Moderate", geography: "Singapore / Shanghai", rationale: "Strong ADC DS/DP, payload synthesis, site-specific conjugation.", risks: "Pricing premium; one capacity bottleneck in July.", badges: ["FDA", "EMA", "PMDA"] },
  { name: "Lonza Ibex", fit: 91, score: 89, availability: "Tight", geography: "Visp, Switzerland", rationale: "Excellent EU release path and containment maturity.", risks: "Q3 line pressure in West Europe.", badges: ["FDA", "EMA", "WHO"] },
  { name: "Abzena", fit: 84, score: 78, availability: "Available", geography: "UK / US", rationale: "Good early-phase fit and sponsor experience.", risks: "Lower comparative score on supply resilience.", badges: ["FDA", "EMA"] },
];

export const milestones = [
  { id: "m1", title: "Tech Transfer Package", state: "approved", escrow: "$80K", due: "Jan 20" },
  { id: "m2", title: "Feasibility Study", state: "approved", escrow: "$120K", due: "Feb 10" },
  { id: "m3", title: "Engineering Runs x3", state: "awaiting sponsor review", escrow: "$340K", due: "Mar 28" },
  { id: "m4", title: "Method Transfer & Validation", state: "in progress", escrow: "$95K", due: "Apr 15" },
  { id: "m5", title: "GMP Batch 1", state: "pending", escrow: "$450K", due: "Jun 01" },
];

export const issues = [
  { title: "Out-of-trend particle size drift", severity: "major", owner: "QA Reviewer", linked: "Milestone 3", due: "Apr 04" },
  { title: "Off-platform payment reference in message", severity: "critical", owner: "Trust & Safety", linked: "Project workspace", due: "Today" },
  { title: "Deviation closure evidence incomplete", severity: "minor", owner: "CDMO QA", linked: "CAPA-118", due: "Apr 08" },
];

export const changes = [
  { title: "Alternate filter membrane specification", impact: "+$22K / +4 days", regulatory: "Low", due: "Apr 11" },
  { title: "Additional analytical transfer round", impact: "+$14K / +7 days", regulatory: "Medium", due: "Apr 13" },
];

export const documents = [
  { name: "Tech Transfer Protocol v2.1", type: "Technical", version: "2.1", access: "12 views" },
  { name: "Quality Agreement", type: "Quality", version: "1.2", access: "7 views" },
  { name: "Executed NDA", type: "Legal", version: "1.0", access: "4 views" },
  { name: "Engineering Run 2 Batch Record", type: "Milestone evidence", version: "1.0", access: "5 views" },
];
