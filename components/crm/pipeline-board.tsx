"use client";

import { useMemo, useState, useTransition } from "react";
import {
  addColumnAction,
  addNoteAction,
  archiveColumnAction,
  moveLeadStageAction,
  renameColumnAction,
  reorderColumnsAction,
  updateLeadAction
} from "@/app/admin/crm/actions";
import { CRMLeadWithDetails, CRMPipelineColumn } from "@/types/crm";

type Props = {
  boardId: string;
  columns: CRMPipelineColumn[];
  leads: CRMLeadWithDetails[];
};

function money(value: number | null) {
  return value ? `$${value.toLocaleString()}` : "—";
}

export default function PipelineBoard({ boardId, columns, leads }: Props) {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "due">("recent");
  const [isPending, startTransition] = useTransition();

  const owners = Array.from(new Set(leads.map((l) => l.assigned_to).filter(Boolean))) as string[];
  const services = Array.from(new Set(leads.map((l) => l.service_type).filter(Boolean))) as string[];

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...leads]
      .filter((lead) => {
        if (ownerFilter !== "all" && lead.assigned_to !== ownerFilter) return false;
        if (serviceFilter !== "all" && lead.service_type !== serviceFilter) return false;
        if (!query) return true;
        return [lead.full_name, lead.business_name, lead.email, lead.city, lead.service_type]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      })
      .sort((a, b) => {
        if (sortBy === "due") {
          return (a.next_action_due ?? "9999-12-31").localeCompare(b.next_action_due ?? "9999-12-31");
        }
        return b.updated_at.localeCompare(a.updated_at);
      });
  }, [leads, ownerFilter, search, serviceFilter, sortBy]);

  const leadByColumn = useMemo(() => {
    const grouped = new Map<string, CRMLeadWithDetails[]>();
    filteredLeads.forEach((lead) => {
      grouped.set(lead.pipeline_column_id, [...(grouped.get(lead.pipeline_column_id) ?? []), lead]);
    });
    return grouped;
  }, [filteredLeads]);

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) ?? null;

  const moveColumn = (columnId: string, direction: -1 | 1) => {
    const current = [...columns];
    const index = current.findIndex((c) => c.id === columnId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= current.length) return;

    [current[index], current[target]] = [current[target], current[index]];

    const form = new FormData();
    form.append(
      "order",
      JSON.stringify(current.map((column, idx) => ({ id: column.id, position: idx + 1 })))
    );
    startTransition(async () => {
      await reorderColumnsAction(form);
    });
  };

  const onDropLead = (event: React.DragEvent<HTMLElement>, column: CRMPipelineColumn) => {
    event.preventDefault();
    const leadId = event.dataTransfer.getData("text/plain");
    if (!leadId) return;

    const form = new FormData();
    form.append("lead_id", leadId);
    form.append("to_column_id", column.id);
    form.append("to_column_name", column.name);

    startTransition(async () => {
      await moveLeadStageAction(form);
    });
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-forest/10 bg-white p-4 shadow-soft">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, service, city..."
            className="rounded-xl border border-forest/15 px-3 py-2 text-sm"
          />
          <select value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)} className="rounded-xl border border-forest/15 px-3 py-2 text-sm">
            <option value="all">All owners</option>
            {owners.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="rounded-xl border border-forest/15 px-3 py-2 text-sm"
          >
            <option value="all">All services</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "recent" | "due")} className="rounded-xl border border-forest/15 px-3 py-2 text-sm">
            <option value="recent">Sort: Recently updated</option>
            <option value="due">Sort: Next action due</option>
          </select>
        </div>
      </section>

      <section className="rounded-2xl border border-forest/10 bg-white p-4 shadow-soft">
        <form
          action={(fd) => {
            startTransition(async () => {
              await addColumnAction(fd);
            });
          }}
          className="flex flex-wrap gap-2"
        >
          <input type="hidden" name="board_id" value={boardId} />
          <input name="name" required placeholder="Add new pipeline column" className="min-w-64 flex-1 rounded-xl border border-forest/15 px-3 py-2 text-sm" />
          <button className="btn-primary" disabled={isPending}>
            Add Column
          </button>
        </form>
      </section>

      <div className="flex gap-4 overflow-x-auto pb-6">
        {columns.map((column) => {
          const list = leadByColumn.get(column.id) ?? [];
          return (
            <article
              key={column.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDropLead(e, column)}
              className="min-h-[520px] min-w-[300px] max-w-[320px] rounded-2xl border border-forest/15 bg-white/90 p-3 shadow-soft"
            >
              <header className="mb-3 rounded-xl border border-forest/10 bg-cream px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-plum">{column.name}</p>
                  <span className="rounded-full bg-forest/10 px-2 py-0.5 text-xs">{list.length}</span>
                </div>
                <div className="mt-2 flex gap-2 text-xs">
                  <button onClick={() => moveColumn(column.id, -1)} className="rounded border border-forest/20 px-2 py-1">←</button>
                  <button onClick={() => moveColumn(column.id, 1)} className="rounded border border-forest/20 px-2 py-1">→</button>
                  <form
                    action={(fd) => startTransition(async () => await renameColumnAction(fd))}
                    className="flex flex-1 gap-1"
                  >
                    <input type="hidden" name="column_id" value={column.id} />
                    <input name="name" placeholder="Rename" className="min-w-0 flex-1 rounded border border-forest/20 px-2 py-1" />
                    <button className="rounded border border-forest/20 px-2 py-1">Save</button>
                  </form>
                </div>
                <form action={(fd) => startTransition(async () => await archiveColumnAction(fd))} className="mt-2">
                  <input type="hidden" name="column_id" value={column.id} />
                  <input type="hidden" name="fallback_column_id" value={columns[0]?.id ?? column.id} />
                  <button className="text-xs text-forest/60 underline">Archive</button>
                </form>
              </header>

              <div className="space-y-3">
                {list.map((lead) => (
                  <button
                    key={lead.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", lead.id)}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className="w-full rounded-xl border border-forest/10 bg-ivory p-3 text-left shadow-sm transition hover:border-plum/35"
                  >
                    <p className="font-semibold text-forest">{lead.full_name}</p>
                    <p className="text-sm text-forest/70">{lead.business_name ?? lead.service_type ?? "Service Lead"}</p>
                    <div className="mt-2 space-y-1 text-xs text-forest/70">
                      <p>{lead.city ?? "Unknown city"}</p>
                      <p>Quote: {money(lead.quote_amount)}</p>
                      <p>Owner: {lead.assigned_to ?? "Unassigned"}</p>
                      <p>
                        Next: {lead.next_action ?? "—"} {lead.next_action_due ? `(${lead.next_action_due})` : ""}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(lead.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-sage/60 px-2 py-0.5 text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          columns={columns}
          onClose={() => setSelectedLeadId(null)}
          pending={isPending}
          onMutate={(fn) => startTransition(fn)}
        />
      )}
    </div>
  );
}

function LeadDrawer({
  lead,
  columns,
  onClose,
  onMutate,
  pending
}: {
  lead: CRMLeadWithDetails;
  columns: CRMPipelineColumn[];
  onClose: () => void;
  onMutate: (fn: () => Promise<void>) => void;
  pending: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/35">
      <div className="h-full w-full max-w-4xl overflow-y-auto bg-cream p-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-plum">Lead Command Center</p>
            <h2 className="mt-2 font-serif text-3xl text-plum">{lead.full_name}</h2>
            <p className="text-sm text-forest/70">{lead.business_name ?? lead.service_type ?? "Service lead"}</p>
          </div>
          <button onClick={onClose} className="rounded border border-forest/30 px-3 py-1 text-sm">
            Close
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <section className="card bg-white">
              <h3 className="font-semibold">Core Info</h3>
              <form
                action={(fd) => onMutate(async () => updateLeadAction(fd))}
                className="mt-3 grid gap-2 md:grid-cols-2"
              >
                <input type="hidden" name="lead_id" value={lead.id} />
                <input type="text" name="full_name" defaultValue={lead.full_name} className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="text" name="business_name" defaultValue={lead.business_name ?? ""} placeholder="Company / Event" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="email" name="email" defaultValue={lead.email ?? ""} placeholder="Email" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="text" name="phone" defaultValue={lead.phone ?? ""} placeholder="Phone" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="text" name="service_type" defaultValue={lead.service_type ?? ""} placeholder="Service Type" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="text" name="source" defaultValue={lead.source ?? ""} placeholder="Source" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="text" name="city" defaultValue={lead.city ?? ""} placeholder="City" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="text" name="state" defaultValue={lead.state ?? ""} placeholder="State" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="number" step="0.01" name="quote_amount" defaultValue={lead.quote_amount ?? ""} placeholder="Quote" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="text" name="assigned_to" defaultValue={lead.assigned_to ?? ""} placeholder="Assigned Rep" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="text" name="tags" defaultValue={(lead.tags ?? []).join(", ")} placeholder="tags comma separated" className="rounded border border-forest/20 px-2 py-2 text-sm md:col-span-2" />
                <input type="text" name="next_action" defaultValue={lead.next_action ?? ""} placeholder="Next Action" className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <input type="date" name="next_action_due" defaultValue={lead.next_action_due ?? ""} className="rounded border border-forest/20 px-2 py-2 text-sm" />
                <select name="pipeline_column_id" defaultValue={lead.pipeline_column_id} className="rounded border border-forest/20 px-2 py-2 text-sm md:col-span-2">
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.name}
                    </option>
                  ))}
                </select>
                <button className="btn-primary md:col-span-2" disabled={pending}>
                  Save Lead
                </button>
              </form>
            </section>

            <section className="card bg-white">
              <h3 className="font-semibold">Communication & Activity Timeline</h3>
              <div className="mt-3 space-y-2 text-sm">
                {lead.activity.map((entry) => (
                  <div key={entry.id} className="rounded border border-forest/10 bg-cream px-3 py-2">
                    <p className="font-medium">{entry.body}</p>
                    <p className="text-xs text-forest/60">{entry.type} • {new Date(entry.created_at).toLocaleString()}</p>
                  </div>
                ))}
                {lead.activity.length === 0 && <p className="text-forest/60">No activity yet.</p>}
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <section className="card bg-white">
              <h3 className="font-semibold">Internal Notes</h3>
              <form action={(fd) => onMutate(async () => addNoteAction(fd))} className="mt-2 space-y-2">
                <input type="hidden" name="lead_id" value={lead.id} />
                <input type="text" name="created_by" defaultValue="Team" className="w-full rounded border border-forest/20 px-2 py-1 text-sm" />
                <textarea name="body" required rows={3} placeholder="Add internal note..." className="w-full rounded border border-forest/20 px-2 py-2 text-sm" />
                <button className="btn-secondary w-full">Add Note</button>
              </form>
              <div className="mt-3 space-y-2">
                {lead.notes.map((note) => (
                  <div key={note.id} className="rounded border border-forest/10 bg-cream px-3 py-2 text-sm">
                    <p>{note.body}</p>
                    <p className="mt-1 text-xs text-forest/60">
                      {note.created_by ?? "Team"} • {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card bg-white text-sm">
              <h3 className="font-semibold">Workflow / Job Context</h3>
              <ul className="mt-2 space-y-1 text-forest/80">
                <li>• Quote/Job history placeholder</li>
                <li>• Checklist placeholder (deposit, contract, schedule)</li>
                <li>• Files/documents placeholder</li>
                <li>• Email/SMS tools placeholder hooks</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
