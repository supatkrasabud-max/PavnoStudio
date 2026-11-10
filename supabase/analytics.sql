create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  event_type text not null check (event_type in ('page_view', 'product_view', 'cart_add', 'sample_open')),
  page_path text not null check (char_length(page_path) <= 160),
  visitor_hash char(64) not null,
  referrer_source text,
  event_at timestamptz not null default now()
);

create index if not exists analytics_events_event_at_idx on public.analytics_events (event_at desc);
create index if not exists analytics_events_type_at_idx on public.analytics_events (event_type, event_at desc);

alter table public.analytics_events enable row level security;

revoke all on table public.analytics_events from anon, authenticated;
