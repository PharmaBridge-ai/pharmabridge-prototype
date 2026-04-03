import type { MarketingPage, NavItem, OnboardingConfig } from "@/lib/types";

export const publicNav: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions/sponsors" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const sharedHighlights = [
  { title: "AI-powered matching", body: "Run staged sponsor-side matching across modality fit, geography, capacity, compliance, and risk.", meta: "Flagship workflow", tone: "teal" as const },
  { title: "Connected RFP orchestration", body: "Move from programme and shortlist into NDA-gated distribution, proposal review, comparison, and award.", meta: "Operationally believable", tone: "amber" as const },
  { title: "Execution workspace", body: "Carry awarded work into escrow, milestones, documents, issues, and communications with live activity history.", meta: "Demo-ready", tone: "violet" as const },
];

export const marketingPages: Record<string, MarketingPage> = {
  platform: {
    eyebrow: "Platform",
    title: "A structured operating layer for pharmaceutical outsourcing.",
    subtitle: "PharmaBridge connects Sponsors with CRDMOs, CDMOs, and CROs through AI-guided matching, procurement workflows, and execution oversight.",
    ctaLabel: "Get started",
    ctaHref: "/signup",
    secondaryLabel: "Sign in",
    secondaryHref: "/login",
    stats: [
      { label: "Verified partners", value: "2,400+", delta: "Across complex modalities", tone: "teal" },
      { label: "Shortlist speed", value: "4.2 days", delta: "Brief to ranked options", tone: "amber" },
      { label: "Tracked signals", value: "12.4k", delta: "Capacity, quality, regulatory", tone: "violet" },
      { label: "Award workflows", value: "148", delta: "Procurement cycles active", tone: "slate" },
    ],
    highlights: sharedHighlights,
  },
  "solutions/sponsors": {
    eyebrow: "Sponsor solution",
    title: "Source the right outsourcing partner with more confidence and less noise.",
    subtitle: "The Sponsor workspace spans onboarding, programme setup, AI matching, shortlist curation, RFPs, proposal comparison, award, escrow, and project control.",
    ctaLabel: "Explore sponsor flow",
    ctaHref: "/app/sponsor/dashboard",
    secondaryLabel: "Get started",
    secondaryHref: "/signup",
    stats: [
      { label: "Supported modalities", value: "8", delta: "ADC, LNP/mRNA, CGT, mAbs, oligo, peptides, radiopharma, PROTAC", tone: "teal" },
      { label: "Current sourcing motions", value: "14", delta: "Sponsor portfolio example", tone: "amber" },
      { label: "Live proposal reviews", value: "6", delta: "Awaiting sponsor action", tone: "violet" },
      { label: "Escrow-protected value", value: "$8.3M", delta: "Across active projects", tone: "slate" },
    ],
    highlights: sharedHighlights,
  },
  "solutions/crdmo": {
    eyebrow: "CRDMO / CDMO solution",
    title: "Present technical depth, quality posture, and capacity in a sponsor-ready format.",
    subtitle: "Vendor-facing capability and trust surfaces are represented in the platform story, while this prototype build remains sponsor-first.",
    ctaLabel: "View platform",
    ctaHref: "/platform",
    secondaryLabel: "Get started",
    secondaryHref: "/signup",
    stats: [
      { label: "Typical vendor profile depth", value: "8 tabs", delta: "Capabilities through due diligence", tone: "amber" },
      { label: "Capacity signals", value: "Live", delta: "Sponsor watchlists and alerts", tone: "teal" },
      { label: "Regulatory badges", value: "Multi-region", delta: "FDA, EMA, PMDA and more", tone: "violet" },
      { label: "NDA-gated requests", value: "100%", delta: "Before technical package access", tone: "slate" },
    ],
    highlights: sharedHighlights,
  },
  "solutions/cro": {
    eyebrow: "CRO solution",
    title: "Help sponsors evaluate research and development partners with the same rigor.",
    subtitle: "CRO pathways remain visible in the public experience while the connected prototype focuses on the Sponsor workflow end to end.",
    ctaLabel: "View platform",
    ctaHref: "/platform",
    secondaryLabel: "Get started",
    secondaryHref: "/signup",
    stats: [
      { label: "Service breadth", value: "Discovery to Phase III", delta: "Structured by pillar", tone: "teal" },
      { label: "Therapeutic signals", value: "15+", delta: "Role-specific insights", tone: "amber" },
      { label: "Watchlisted opportunities", value: "22", delta: "Across current workflows", tone: "violet" },
      { label: "Demo scope", value: "Sponsor-first", delta: "CRO story reserved for later phases", tone: "slate" },
    ],
    highlights: sharedHighlights,
  },
  intelligence: {
    eyebrow: "Intelligence",
    title: "Bring market, quality, regulatory, and capacity signals into the decision flow.",
    subtitle: "Alerts, watched vendors, modality benchmarks, and recommended next actions stay connected to sponsor programmes, RFPs, and projects.",
    ctaLabel: "Open intelligence",
    ctaHref: "/app/sponsor/intelligence",
    secondaryLabel: "Get started",
    secondaryHref: "/signup",
    stats: [
      { label: "Critical alerts", value: "17", delta: "Example high-severity feed", tone: "amber" },
      { label: "Watched vendors", value: "61", delta: "Across sponsor scenarios", tone: "teal" },
      { label: "Tracked categories", value: "10", delta: "Modality and market lenses", tone: "violet" },
      { label: "Recommended actions", value: "Always-on", delta: "Contextual next steps", tone: "slate" },
    ],
    highlights: sharedHighlights,
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Position the product like an enterprise platform, not a generic SaaS tool.",
    subtitle: "Package PharmaBridge for platform evaluation, premium sponsor rollouts, and enterprise procurement teams.",
    ctaLabel: "Talk to sales",
    ctaHref: "/signup",
    secondaryLabel: "View platform",
    secondaryHref: "/platform",
    stats: [
      { label: "Plans", value: "3", delta: "Growth, Scale, Enterprise", tone: "teal" },
      { label: "Implementation", value: "6-10 weeks", delta: "For enterprise rollouts", tone: "amber" },
      { label: "Included workflows", value: "End to end", delta: "Brief to execution", tone: "violet" },
      { label: "Support model", value: "White-glove", delta: "Enterprise-safe posture", tone: "slate" },
    ],
    highlights: sharedHighlights,
  },
  about: {
    eyebrow: "About",
    title: "Build trust around a calm, operationally credible outsourcing platform.",
    subtitle: "PharmaBridge is positioned as the coordination layer between Sponsors and specialized outsourcing partners across sourcing, execution, and intelligence.",
    ctaLabel: "Get started",
    ctaHref: "/signup",
    secondaryLabel: "View sponsor solution",
    secondaryHref: "/solutions/sponsors",
    stats: [
      { label: "Platform focus", value: "Outsourced pharma", delta: "Sourcing, award, execution, intelligence", tone: "teal" },
      { label: "Primary buyer", value: "Sponsor teams", delta: "CMC, procurement, PMO, QA", tone: "amber" },
      { label: "Product principle", value: "Trust by design", delta: "Every workflow is stateful", tone: "violet" },
      { label: "Demo posture", value: "Investor + buyer ready", delta: "Enterprise-grade visual language", tone: "slate" },
    ],
    highlights: sharedHighlights,
  },
};


export const onboardingConfigs: Record<"sponsor" | "cdmo" | "cro", OnboardingConfig> = {
  sponsor: {
    role: "sponsor",
    title: "Sponsor onboarding",
    subtitle: "Capture organisation profile, programme context, and sourcing requirements.",
    progress: 68,
    sections: [
      { title: "Company", description: "Legal and contact setup.", fields: ["Company legal name", "Primary contact", "Team size", "Therapeutic focus"], status: "required" },
      { title: "Programme basics", description: "Initial sourcing scope.", fields: ["Programme name", "Modality", "Stage", "Target partner type"], status: "required" },
      { title: "Requirements", description: "Technical, compliance, and quality inputs.", fields: ["Requirement summary", "Compliance requirements", "Quality expectations", "Budget band"], status: "high-priority" },
    ],
    checks: ["Primary contact captured", "Programme basics complete", "Requirements uploaded"],
  },
  cdmo: {
    role: "cdmo",
    title: "CDMO onboarding",
    subtitle: "Reserved for future role-specific implementation.",
    progress: 42,
    sections: [{ title: "Profile", description: "Placeholder setup.", fields: ["Organisation", "Facilities", "Capabilities", "Certificates"], status: "required" }],
    checks: ["Reserved workflow"],
  },
  cro: {
    role: "cro",
    title: "CRO onboarding",
    subtitle: "Reserved for future role-specific implementation.",
    progress: 39,
    sections: [{ title: "Profile", description: "Placeholder setup.", fields: ["Organisation", "Services", "Therapeutic areas", "Accreditations"], status: "required" }],
    checks: ["Reserved workflow"],
  },
};

const makeRolePage = (role: "sponsor" | "cdmo" | "cro" | "admin", title: string, subtitle: string) => ({
  role,
  title,
  subtitle,
  primaryAction: "Open primary workflow",
  status: "Prototype route",
  metrics: [
    { label: "Stateful views", value: "Connected", delta: "Backed by seeded demo data", tone: "teal" as const },
    { label: "Workflow depth", value: "Multi-step", delta: "Programme to execution", tone: "amber" as const },
    { label: "Intelligence", value: "Embedded", delta: "Alerts and watchlists", tone: "violet" as const },
    { label: "Quality bar", value: "Demo-ready", delta: "Enterprise-safe presentation", tone: "slate" as const },
  ],
  highlights: sharedHighlights,
  table: { columns: ["Name", "Owner", "State", "Timing", "Signal"], rows: [[title, "PharmaBridge", "Connected", "Live", "Demo route"]] },
  timeline: [
    { title: "Workflow seeded", detail: subtitle, state: "Ready" },
    { title: "Navigation connected", detail: "Routes and shell behavior are active.", state: "Live" },
    { title: "Demo controls available", detail: "Scenarios and workflow triggers are exposed in the sponsor shell.", state: "Operational" },
  ],
  emptyState: { title: "No blockers", body: "This route is available for demo navigation and future depth." },
});

export function resolveRolePage(role: "sponsor" | "cdmo" | "cro" | "admin", segments?: string[]) {
  const key = segments?.join("/") ?? "dashboard";
  if (role === "sponsor") return makeRolePage(role, `Sponsor route: ${key}`, "Sponsor-first route shell kept available for non-primary catch-all paths.");
  if (role === "cdmo") return makeRolePage(role, `CDMO route: ${key}`, "Vendor-side placeholder preserved for platform completeness.");
  if (role === "cro") return makeRolePage(role, `CRO route: ${key}`, "CRO-side placeholder preserved for platform completeness.");
  return makeRolePage("admin", `Admin route: ${key}`, "Admin-side placeholder preserved for platform completeness.");
}


