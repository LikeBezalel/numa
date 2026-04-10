import { createLeadAction } from "@/app/admin/crm/actions";
import PipelineBoard from "@/components/crm/pipeline-board";
import { getBoardSnapshot } from "@/lib/crm/queries";

export const metadata = {
  title: "Admin CRM Pipeline"
};

export default async function AdminCrmPage() {
  const { board, columns, leads } = await getBoardSnapshot();

  return (
    <div className="min-h-screen bg-[#f2f4f7] px-6 py-6 text-forest">
      <div className="mx-auto max-w-[1480px] space-y-4">
        <header className="sticky top-3 z-30 rounded-2xl border border-forest/10 bg-white px-5 py-4 shadow-soft">
          <p className="text-xs uppercase tracking-[0.2em] text-forest/60">Internal Admin</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-plum">CRM Pipeline</h1>
              <p className="text-sm text-forest/70">Reusable service-business board ({board.business_context})</p>
            </div>
            <div className="rounded-xl bg-cream px-3 py-2 text-sm">
              {leads.length} leads • {columns.length} active stages
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-forest/10 bg-white p-4 shadow-soft">
          <h2 className="font-semibold text-plum">Quick Add Lead</h2>
          <form action={createLeadAction} className="mt-3 grid gap-2 md:grid-cols-4">
            <input type="hidden" name="board_id" value={board.id} />
            <input type="hidden" name="pipeline_column_id" value={columns[0]?.id} />
            <input required name="full_name" placeholder="Lead name" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="business_name" placeholder="Event/Business" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="email" type="email" placeholder="Email" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="phone" placeholder="Phone" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="service_type" placeholder="Service Type" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="city" placeholder="City" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="source" placeholder="Source" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="assigned_to" placeholder="Assigned Rep" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="event_date" type="date" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="quote_amount" type="number" step="0.01" placeholder="Quote" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="tags" placeholder="tags, comma, separated" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="next_action" placeholder="Next Action" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <input name="next_action_due" type="date" className="rounded-xl border border-forest/15 px-3 py-2 text-sm" />
            <button className="btn-primary md:col-span-4">Create Lead</button>
          </form>
        </section>

        <PipelineBoard boardId={board.id} columns={columns} leads={leads} />
      </div>
    </div>
  );
}
