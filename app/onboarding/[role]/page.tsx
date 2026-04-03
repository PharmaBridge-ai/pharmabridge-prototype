import { notFound } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { onboardingConfigs } from "@/lib/mock-data/site";

export default async function OnboardingRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (role !== "sponsor" && role !== "cdmo" && role !== "cro") notFound();
  return <OnboardingWizard config={onboardingConfigs[role]} />;
}

