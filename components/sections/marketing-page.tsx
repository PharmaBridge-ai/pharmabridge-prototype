import { HighlightGrid, SectionIntro, StatGrid } from "@/components/ui/primitives";
import type { MarketingPage as MarketingPageType } from "@/lib/types";

export function MarketingPage({ page }: { page: MarketingPageType }) {
  return (
    <>
      <section className="rounded-[36px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(241,245,255,0.84))] p-8 shadow-[0_24px_70px_rgba(148,163,184,0.12)] md:p-12">
        <SectionIntro eyebrow={page.eyebrow} title={page.title} body={page.subtitle} action={page.ctaLabel} href={page.ctaHref} secondaryLabel={page.secondaryLabel} secondaryHref={page.secondaryHref} />
      </section>
      <StatGrid stats={page.stats} />
      <HighlightGrid items={page.highlights} />
    </>
  );
}

