"use client";

import type { Route } from "next";
import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

type TopNavigationProps = {
  items: NavItem[];
  badge?: string;
  accent?: "teal" | "amber" | "violet" | "cyan";
  mode?: "marketing" | "app";
  showNotifications?: boolean;
  secondaryCta?: { label: string; href: string };
  primaryCta?: { label: string; href: string };
};

export function TopNavigation({ items, badge, mode = "marketing", showNotifications, secondaryCta, primaryCta }: TopNavigationProps) {
  const pathname = usePathname();
  const showNavItems = mode !== "app";

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 rounded-[24px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(248,250,252,0.70))] px-4 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-5 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 shadow-[0_10px_24px_rgba(148,163,184,0.12)]">
            <div className="h-5 w-5 rounded-lg bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] p-[2px]">
              <div className="h-full w-full rounded-md bg-white" />
            </div>
          </div>
          <div>
            <div className="font-display text-[24px] leading-none tracking-[-0.05em] text-slate-950">PharmaBridge</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">Outsourcing intelligence</div>
          </div>
        </Link>

        {showNavItems ? (
          <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/58 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:flex">
            {items.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    active
                      ? "bg-slate-950 text-white shadow-[0_8px_20px_rgba(15,23,42,0.18)]"
                      : "text-slate-600 hover:bg-white hover:text-slate-950",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        ) : null}

        {badge ? (
          <div className="hidden rounded-full border border-sky-200/80 bg-sky-50/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-sky-700 xl:inline-flex">
            {badge}
          </div>
        ) : null}

        {mode === "app" ? (
          <div className="ml-auto hidden min-w-[260px] items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-2.5 text-sm text-slate-500 shadow-[0_10px_24px_rgba(148,163,184,0.10)] lg:flex">
            <Search className="h-4 w-4" />
            Search
          </div>
        ) : null}

        <div className="ml-auto flex items-center gap-2">
          {showNotifications ? (
            <button className="rounded-full border border-white/70 bg-white/72 p-2.5 text-slate-500 shadow-[0_10px_24px_rgba(148,163,184,0.10)] hover:text-slate-900">
              <Bell className="h-4 w-4" />
            </button>
          ) : null}
          {secondaryCta ? (
            <Link href={secondaryCta.href as Route} className="hidden rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-white/70 hover:text-slate-950 md:inline-flex">
              {secondaryCta.label}
            </Link>
          ) : null}
          {primaryCta ? (
            <Link
              href={primaryCta.href as Route}
              className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-900"
            >
              {primaryCta.label}
            </Link>
          ) : null}
          <button className="inline-flex rounded-full border border-white/70 bg-white/72 p-2.5 text-slate-500 shadow-[0_10px_24px_rgba(148,163,184,0.10)] lg:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
