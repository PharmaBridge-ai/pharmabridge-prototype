import { SponsorDemoChrome } from "@/components/sponsor/demo-chrome";
import { SponsorAppShell } from "@/components/sponsor/workspace";
import { SponsorDemoProvider } from "@/lib/state/sponsor-demo";
import type { ReactNode } from "react";

export default function SponsorLayout({ children }: { children: ReactNode }) {
  return (
    <SponsorDemoProvider>
      <SponsorAppShell>
        <SponsorDemoChrome />
        {children}
      </SponsorAppShell>
    </SponsorDemoProvider>
  );
}
