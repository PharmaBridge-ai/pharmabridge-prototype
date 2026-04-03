import { AppShell } from "@/components/app-shell/app-shell";

export default function CdmoLayout({ children }: { children: React.ReactNode }) {
  return <AppShell role="cdmo">{children}</AppShell>;
}

