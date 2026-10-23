-- Anonymous counts of completed /readiness checks.
-- One row per completion. No IP address, email address, name or answers.
-- Row-level security is on, and there are no policies. The public Data API
-- roles cannot read or write. The server route inserts with the service role,
-- which bypasses row-level security. Count rows from the SQL editor as the
-- table owner: select count(*) from public.readiness_completions;

create table public.readiness_completions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  score_band text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer_host text,
  constraint readiness_completions_score_band_check
    check (score_band in ('not_ready', 'partly_ready', 'ready')),
  constraint readiness_completions_utm_source_length_check
    check (utm_source is null or char_length(utm_source) <= 120),
  constraint readiness_completions_utm_medium_length_check
    check (utm_medium is null or char_length(utm_medium) <= 120),
  constraint readiness_completions_utm_campaign_length_check
    check (utm_campaign is null or char_length(utm_campaign) <= 120),
  constraint readiness_completions_referrer_host_length_check
    check (referrer_host is null or char_length(referrer_host) <= 253)
);

comment on table public.readiness_completions is
  'Anonymous readiness-check completions. No personal data.';

alter table public.readiness_completions enable row level security;

-- Existing Supabase projects grant the Data API roles access to new public
-- tables. Remove that access, then allow the service role to insert only.
revoke all on table public.readiness_completions from public, anon, authenticated, service_role;
grant insert on table public.readiness_completions to service_role;
