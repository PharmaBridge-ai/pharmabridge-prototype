export type Role = "sponsor" | "cdmo" | "cro" | "admin";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  label: string;
  value: string;
  delta?: string;
  tone?: "teal" | "amber" | "rose" | "violet" | "slate";
};

export type HighlightCard = {
  title: string;
  body: string;
  meta?: string;
  tone?: "teal" | "amber" | "rose" | "violet";
};

export type TableData = {
  columns: string[];
  rows: string[][];
};

export type MarketingPage = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats: Stat[];
  highlights: HighlightCard[];
};

export type OnboardingSection = {
  title: string;
  description: string;
  fields: string[];
  status: "required" | "high-priority" | "supporting";
};

export type OnboardingConfig = {
  role: Exclude<Role, "admin">;
  title: string;
  subtitle: string;
  progress: number;
  sections: OnboardingSection[];
  checks: string[];
};

export type RolePage = {
  role: Role;
  title: string;
  subtitle: string;
  primaryAction: string;
  status: string;
  metrics: Stat[];
  highlights: HighlightCard[];
  table: TableData;
  timeline: { title: string; detail: string; state: string }[];
  emptyState?: {
    title: string;
    body: string;
  };
};
