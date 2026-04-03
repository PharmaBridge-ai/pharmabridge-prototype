import { DataTable, EmptyState, HighlightGrid, LoadingState, PagePanel, SectionIntro, StatGrid, Timeline } from "@/components/ui/primitives";
import type { RolePage as RolePageType } from "@/lib/types";

export function AppRolePage({ page }: { page: RolePageType }) {
  return (
    <>
      <section className="rounded-[34px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(241,245,255,0.84))] p-8 shadow-[0_24px_70px_rgba(148,163,184,0.12)]">
        <SectionIntro eyebrow={page.status} title={page.title} body={page.subtitle} action={page.primaryAction} href="#" />
      </section>
      <StatGrid stats={page.metrics} />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <PagePanel title="Priority records" body="Seeded records mirror the workflows described in the planning document.">
          <DataTable data={page.table} />
        </PagePanel>
        <PagePanel title="Workflow activity" body="Recent state changes keep the prototype feeling live and interconnected.">
          <Timeline items={page.timeline} />
        </PagePanel>
      </div>
      <LoadingState />
      <HighlightGrid items={page.highlights} />
      {page.emptyState ? <EmptyState title={page.emptyState.title} body={page.emptyState.body} /> : null}
    </>
  );
}

