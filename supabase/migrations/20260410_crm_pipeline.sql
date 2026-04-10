-- CRM pipeline schema for service businesses (acai, painting, home services, consulting)
create extension if not exists "pgcrypto";

create table if not exists public.crm_boards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  business_context text not null default 'service-business',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_pipeline_columns (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.crm_boards(id) on delete cascade,
  name text not null,
  position integer not null,
  color_variant text not null default 'slate',
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(board_id, position)
);

create table if not exists public.crm_leads (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.crm_boards(id) on delete cascade,
  pipeline_column_id uuid not null references public.crm_pipeline_columns(id) on delete restrict,
  full_name text not null,
  business_name text,
  email text,
  phone text,
  service_type text,
  source text,
  city text,
  state text,
  event_date date,
  desired_date date,
  budget numeric(12,2),
  quote_amount numeric(12,2),
  assigned_to text,
  tags jsonb not null default '[]'::jsonb,
  next_action text,
  next_action_due date,
  custom_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.crm_leads(id) on delete cascade,
  body text not null,
  created_by text,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_activity_log (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.crm_leads(id) on delete cascade,
  type text not null,
  body text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_crm_columns_board_position on public.crm_pipeline_columns(board_id, position);
create index if not exists idx_crm_leads_board_column on public.crm_leads(board_id, pipeline_column_id);
create index if not exists idx_crm_leads_assigned_to on public.crm_leads(assigned_to);
create index if not exists idx_crm_leads_next_action_due on public.crm_leads(next_action_due);
create index if not exists idx_crm_notes_lead_id on public.crm_notes(lead_id);
create index if not exists idx_crm_activity_lead_id on public.crm_activity_log(lead_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger trg_board_updated_at
before update on public.crm_boards
for each row execute function public.set_updated_at();

create or replace trigger trg_column_updated_at
before update on public.crm_pipeline_columns
for each row execute function public.set_updated_at();

create or replace trigger trg_lead_updated_at
before update on public.crm_leads
for each row execute function public.set_updated_at();

-- default board + columns (idempotent)
insert into public.crm_boards (name, slug, business_context)
values ('Main Pipeline', 'main-pipeline', 'acai-catering')
on conflict (slug) do nothing;

with board as (
  select id from public.crm_boards where slug = 'main-pipeline'
)
insert into public.crm_pipeline_columns (board_id, name, position, color_variant)
select b.id, c.name, c.position, c.color_variant
from board b
cross join (
  values
    ('New Lead', 1, 'blue'),
    ('Contacted', 2, 'amber'),
    ('Qualified', 3, 'violet'),
    ('Quote Sent', 4, 'emerald'),
    ('Follow Up', 5, 'orange'),
    ('Scheduled', 6, 'teal')
) as c(name, position, color_variant)
where not exists (
  select 1
  from public.crm_pipeline_columns pc
  where pc.board_id = b.id
);

-- seed demo leads
with board as (
  select id from public.crm_boards where slug = 'main-pipeline'
), cols as (
  select id, name, board_id from public.crm_pipeline_columns where board_id = (select id from board)
)
insert into public.crm_leads (
  board_id,
  pipeline_column_id,
  full_name,
  business_name,
  email,
  phone,
  service_type,
  source,
  city,
  state,
  event_date,
  quote_amount,
  assigned_to,
  tags,
  next_action,
  next_action_due,
  custom_fields
)
select
  c.board_id,
  c.id,
  s.full_name,
  s.business_name,
  s.email,
  s.phone,
  s.service_type,
  s.source,
  s.city,
  s.state,
  s.event_date::date,
  s.quote_amount,
  s.assigned_to,
  s.tags::jsonb,
  s.next_action,
  s.next_action_due::date,
  s.custom_fields::jsonb
from cols c
join (
  values
    ('New Lead', 'Sophia Martinez', 'Martinez Wedding', 'sophia@example.com', '214-555-1100', 'Wedding Catering', 'Instagram', 'Dallas', 'TX', '2026-05-21', 0, 'Maya', '["wedding","high-touch"]', 'Send intro text', '2026-04-12', '{"guest_count":160,"venue":"The Mason"}'),
    ('Contacted', 'Jordan Patel', 'Balance Wellness', 'jordan@balancewellness.co', '972-555-3390', 'Wellness Pop-up', 'Referral', 'Plano', 'TX', '2026-04-28', 850, 'Nina', '["wellness","repeat"]', 'Confirm setup window', '2026-04-13', '{"guest_count":80,"setup_type":"outdoor"}'),
    ('Quote Sent', 'Ashley Green', 'Green Baby Shower', 'ashleyg@example.com', '469-555-8012', 'Private Event', 'Website', 'Frisco', 'TX', '2026-05-02', 1250, 'Maya', '["baby-shower"]', 'Follow up on quote', '2026-04-14', '{"guest_count":65,"addons":["signage"]}')
) as s(column_name, full_name, business_name, email, phone, service_type, source, city, state, event_date, quote_amount, assigned_to, tags, next_action, next_action_due, custom_fields)
  on c.name = s.column_name
where not exists (select 1 from public.crm_leads l where l.email = s.email);

-- RLS suggestions (disabled by default):
-- alter table public.crm_boards enable row level security;
-- alter table public.crm_pipeline_columns enable row level security;
-- alter table public.crm_leads enable row level security;
-- alter table public.crm_notes enable row level security;
-- alter table public.crm_activity_log enable row level security;
-- create policy "Allow authenticated users" on public.crm_leads for all using (auth.role() = 'authenticated');
