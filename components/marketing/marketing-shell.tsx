import { PageTransition } from "@/components/motion/page-transition";
import { TopNavigation } from "@/components/navigation/top-navigation";

const marketingNav = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions/sponsors" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.10),transparent_24%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.10),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#f8f9fc_0%,#f2f5fb_48%,#edf2f8_100%)] text-slate-900">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:78px_78px] opacity-55" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(99,102,241,0.10),transparent_18%),radial-gradient(circle_at_84%_16%,rgba(45,212,191,0.10),transparent_16%),radial-gradient(circle_at_28%_86%,rgba(251,191,36,0.08),transparent_18%)]" />
      <TopNavigation items={marketingNav} badge="Premium demo" accent="teal" mode="marketing" secondaryCta={{ label: "Sign in", href: "/login" }} primaryCta={{ label: "Get started", href: "/signup" }} />
      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
