export type UUID = string;

export type CRMBoard = {
  id: UUID;
  name: string;
  slug: string;
  business_context: string;
  created_at: string;
  updated_at: string;
};

export type CRMPipelineColumn = {
  id: UUID;
  board_id: UUID;
  name: string;
  position: number;
  color_variant: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type CRMLead = {
  id: UUID;
  board_id: UUID;
  pipeline_column_id: UUID;
  full_name: string;
  business_name: string | null;
  email: string | null;
  phone: string | null;
  service_type: string | null;
  source: string | null;
  city: string | null;
  state: string | null;
  event_date: string | null;
  desired_date: string | null;
  budget: number | null;
  quote_amount: number | null;
  assigned_to: string | null;
  tags: string[];
  next_action: string | null;
  next_action_due: string | null;
  custom_fields: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type CRMNote = {
  id: UUID;
  lead_id: UUID;
  body: string;
  created_by: string | null;
  created_at: string;
};

export type CRMActivity = {
  id: UUID;
  lead_id: UUID;
  type: string;
  body: string;
  meta: Record<string, unknown>;
  created_at: string;
};

export type CRMLeadWithDetails = CRMLead & {
  notes: CRMNote[];
  activity: CRMActivity[];
};
