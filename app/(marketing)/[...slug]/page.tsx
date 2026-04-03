import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/sections/marketing-page";
import { marketingPages } from "@/lib/mock-data/site";

export default async function MarketingCatchAll({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = marketingPages[key];
  if (!page) notFound();
  return <MarketingPage page={page} />;
}

