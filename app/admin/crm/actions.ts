"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function createLeadAction(formData: FormData) {
  const supabase = getSupabaseServerClient();

  const payload = {
    board_id: String(formData.get("board_id")),
    pipeline_column_id: String(formData.get("pipeline_column_id")),
    full_name: String(formData.get("full_name") || ""),
    business_name: String(formData.get("business_name") || "") || null,
    email: String(formData.get("email") || "") || null,
    phone: String(formData.get("phone") || "") || null,
    service_type: String(formData.get("service_type") || "") || null,
    source: String(formData.get("source") || "") || null,
    city: String(formData.get("city") || "") || null,
    state: String(formData.get("state") || "") || null,
    event_date: String(formData.get("event_date") || "") || null,
    quote_amount: Number(formData.get("quote_amount") || 0) || null,
    assigned_to: String(formData.get("assigned_to") || "") || null,
    tags: parseTags(String(formData.get("tags") || "")),
    next_action: String(formData.get("next_action") || "") || null,
    next_action_due: String(formData.get("next_action_due") || "") || null
  };

  const { data, error } = await supabase.from("crm_leads").insert(payload).select("id").single();
  if (error) throw error;

  await supabase.from("crm_activity_log").insert({
    lead_id: data.id,
    type: "lead_created",
    body: `Lead created: ${payload.full_name}`,
    meta: { source: payload.source }
  });

  revalidatePath("/admin/crm");
}

export async function moveLeadStageAction(formData: FormData) {
  const supabase = getSupabaseServerClient();
  const leadId = String(formData.get("lead_id"));
  const toColumnId = String(formData.get("to_column_id"));
  const toColumnName = String(formData.get("to_column_name") || "");

  const { error } = await supabase.from("crm_leads").update({ pipeline_column_id: toColumnId }).eq("id", leadId);
  if (error) throw error;

  await supabase.from("crm_activity_log").insert({
    lead_id: leadId,
    type: "stage_moved",
    body: `Moved to ${toColumnName}`,
    meta: { to_column_id: toColumnId }
  });

  revalidatePath("/admin/crm");
}

export async function addColumnAction(formData: FormData) {
  const supabase = getSupabaseServerClient();
  const boardId = String(formData.get("board_id"));
  const name = String(formData.get("name") || "New Stage");

  const { data: last } = await supabase
    .from("crm_pipeline_columns")
    .select("position")
    .eq("board_id", boardId)
    .order("position", { ascending: false })
    .limit(1)
    .single();

  const { error } = await supabase.from("crm_pipeline_columns").insert({
    board_id: boardId,
    name,
    position: (last?.position ?? 0) + 1
  });

  if (error) throw error;
  revalidatePath("/admin/crm");
}

export async function renameColumnAction(formData: FormData) {
  const supabase = getSupabaseServerClient();
  const id = String(formData.get("column_id"));
  const name = String(formData.get("name") || "");

  const { error } = await supabase.from("crm_pipeline_columns").update({ name }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/crm");
}

export async function reorderColumnsAction(formData: FormData) {
  const supabase = getSupabaseServerClient();
  const order = JSON.parse(String(formData.get("order") || "[]")) as { id: string; position: number }[];

  for (const item of order) {
    // sequential updates are acceptable for low column count
    await supabase.from("crm_pipeline_columns").update({ position: item.position }).eq("id", item.id);
  }

  revalidatePath("/admin/crm");
}

export async function archiveColumnAction(formData: FormData) {
  const supabase = getSupabaseServerClient();
  const columnId = String(formData.get("column_id"));
  const fallbackColumnId = String(formData.get("fallback_column_id"));

  await supabase.from("crm_leads").update({ pipeline_column_id: fallbackColumnId }).eq("pipeline_column_id", columnId);
  const { error } = await supabase.from("crm_pipeline_columns").update({ is_archived: true }).eq("id", columnId);
  if (error) throw error;

  revalidatePath("/admin/crm");
}

export async function updateLeadAction(formData: FormData) {
  const supabase = getSupabaseServerClient();
  const id = String(formData.get("lead_id"));

  const payload = {
    full_name: String(formData.get("full_name") || ""),
    business_name: String(formData.get("business_name") || "") || null,
    email: String(formData.get("email") || "") || null,
    phone: String(formData.get("phone") || "") || null,
    service_type: String(formData.get("service_type") || "") || null,
    source: String(formData.get("source") || "") || null,
    city: String(formData.get("city") || "") || null,
    state: String(formData.get("state") || "") || null,
    quote_amount: Number(formData.get("quote_amount") || 0) || null,
    assigned_to: String(formData.get("assigned_to") || "") || null,
    tags: parseTags(String(formData.get("tags") || "")),
    next_action: String(formData.get("next_action") || "") || null,
    next_action_due: String(formData.get("next_action_due") || "") || null,
    pipeline_column_id: String(formData.get("pipeline_column_id") || "")
  };

  const { error } = await supabase.from("crm_leads").update(payload).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/crm");
}

export async function addNoteAction(formData: FormData) {
  const supabase = getSupabaseServerClient();
  const leadId = String(formData.get("lead_id"));
  const body = String(formData.get("body") || "").trim();
  const createdBy = String(formData.get("created_by") || "Team");

  if (!body) return;

  const { error } = await supabase.from("crm_notes").insert({
    lead_id: leadId,
    body,
    created_by: createdBy
  });

  if (error) throw error;

  await supabase.from("crm_activity_log").insert({
    lead_id: leadId,
    type: "note_added",
    body: "Added internal note",
    meta: { preview: body.slice(0, 80) }
  });

  revalidatePath("/admin/crm");
}
