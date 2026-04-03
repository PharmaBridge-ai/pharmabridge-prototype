import { notFound } from "next/navigation";
import { AppRolePage } from "@/components/sections/app-role-page";
import { resolveRolePage } from "@/lib/mock-data/site";

export default async function SponsorRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = resolveRolePage("sponsor", slug);
  if (!page) notFound();
  return <AppRolePage page={page} />;
}


