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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f8fb_0%,#f1f5f9_48%,#eef3f8_100%)] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_12%_12%,rgba(59,130,246,0.10),transparent_20%),radial-gradient(circle_at_86%_14%,rgba(14,165,233,0.08),transparent_18%),radial-gradient(circle_at_26%_86%,rgba(16,185,129,0.08),transparent_18%)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.08))]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(255,255,255,0))]" />
      <TopNavigation items={marketingNav} badge="Premium platform demo" accent="teal" mode="marketing" secondaryCta={{ label: "Sign in", href: "/login" }} primaryCta={{ label: "Get started", href: "/signup" }} />
      <main className="mx-auto flex max-w-[1440px] flex-col gap-16 px-4 pb-20 pt-6 md:px-6 md:pt-8 lg:px-8">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
