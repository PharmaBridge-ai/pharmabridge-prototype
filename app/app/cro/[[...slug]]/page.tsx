import { notFound } from "next/navigation";
import { AppRolePage } from "@/components/sections/app-role-page";
import { resolveRolePage } from "@/lib/mock-data/site";

export default async function CroRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = resolveRolePage("cro", slug);
  if (!page) notFound();
  return <AppRolePage page={page} />;
}

