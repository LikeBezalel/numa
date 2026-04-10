import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CRMActivity, CRMBoard, CRMLead, CRMLeadWithDetails, CRMNote, CRMPipelineColumn } from "@/types/crm";

export const getBoardSnapshot = cache(async (slug = "main-pipeline") => {
  const supabase = getSupabaseServerClient();

  const { data: board, error: boardError } = await supabase
    .from("crm_boards")
    .select("*")
    .eq("slug", slug)
    .single<CRMBoard>();

  if (boardError) throw boardError;

  const [{ data: columns, error: columnsError }, { data: leads, error: leadsError }, { data: notes }, { data: activity }] =
    await Promise.all([
      supabase
        .from("crm_pipeline_columns")
        .select("*")
        .eq("board_id", board.id)
        .eq("is_archived", false)
        .order("position", { ascending: true })
        .returns<CRMPipelineColumn[]>(),
      supabase
        .from("crm_leads")
        .select("*")
        .eq("board_id", board.id)
        .order("created_at", { ascending: false })
        .returns<CRMLead[]>(),
      supabase
        .from("crm_notes")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<CRMNote[]>(),
      supabase
        .from("crm_activity_log")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<CRMActivity[]>()
    ]);

  if (columnsError) throw columnsError;
  if (leadsError) throw leadsError;

  const noteByLead = new Map<string, CRMNote[]>();
  (notes ?? []).forEach((note) => {
    noteByLead.set(note.lead_id, [...(noteByLead.get(note.lead_id) ?? []), note]);
  });

  const activityByLead = new Map<string, CRMActivity[]>();
  (activity ?? []).forEach((entry) => {
    activityByLead.set(entry.lead_id, [...(activityByLead.get(entry.lead_id) ?? []), entry]);
  });

  const leadsWithDetails: CRMLeadWithDetails[] = (leads ?? []).map((lead) => ({
    ...lead,
    tags: Array.isArray(lead.tags) ? lead.tags : [],
    custom_fields: lead.custom_fields ?? {},
    notes: noteByLead.get(lead.id) ?? [],
    activity: activityByLead.get(lead.id) ?? []
  }));

  return { board, columns: columns ?? [], leads: leadsWithDetails };
});
