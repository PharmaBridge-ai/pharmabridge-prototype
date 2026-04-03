import { AppShell } from "@/components/app-shell/app-shell";

export default function CroLayout({ children }: { children: React.ReactNode }) {
  return <AppShell role="cro">{children}</AppShell>;
}

