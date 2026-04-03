"use client";

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

export function TopNavigation({ items, mode = "marketing", showNotifications, secondaryCta, primaryCta }: TopNavigationProps) {
  const pathname = usePathname();
  const showNavItems = mode !== "app";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Link href="/" className="shrink-0 font-display text-[28px] text-slate-900">
          Pharma<span className="text-indigo-500">Bridge</span>
        </Link>

        {showNavItems ? (
          <nav className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition",
                    active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        ) : null}

        {mode === "app" ? (
          <div className="ml-auto hidden min-w-[240px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 lg:flex">
            <Search className="h-4 w-4" />
            Search
          </div>
        ) : null}

        <div className="ml-auto flex items-center gap-2">
          {showNotifications ? <button className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-500"><Bell className="h-4 w-4" /></button> : null}
          {secondaryCta ? <a href={secondaryCta.href} className="hidden rounded-full px-4 py-2 text-sm text-slate-600 md:inline-flex">{secondaryCta.label}</a> : null}
          {primaryCta ? <a href={primaryCta.href} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">{primaryCta.label}</a> : null}
          <button className="inline-flex rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 lg:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
