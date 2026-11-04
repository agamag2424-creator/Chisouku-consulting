-- ChisokuLabs website database (Azure Database for PostgreSQL, flexible server).
-- Run once, as the server admin, in the database the website uses (see docs/azure-setup.md). Safe to re-run.
-- Tables: readiness_completions (anonymous /readiness counts), orders and analytics_events (paid funnel).

-- gen_random_uuid() is built into PostgreSQL 13 and later, so no extension is needed.

-- Anonymous counts of completed /readiness checks. No IP address, email address, name or answers.
create table if not exists readiness_completions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  score_band text not null check (score_band in ('not_ready', 'partly_ready', 'ready')),
  utm_source text check (utm_source is null or char_length(utm_source) <= 120),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 120),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 120),
  referrer_host text check (referrer_host is null or char_length(referrer_host) <= 253)
);

-- One row per checkout. Created when the buyer starts checkout; the Razorpay webhook marks it paid.
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  razorpay_order_id text not null unique,
  payment_id text unique,
  product text not null check (product in ('report_149', 'pack_249', 'pack_upgrade_100')),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'USD',
  email text not null check (char_length(email) <= 254),
  assessment_id text,
  readiness_band text check (readiness_band is null or readiness_band in ('not_ready', 'partly_ready', 'ready')),
  utm_source text check (utm_source is null or char_length(utm_source) <= 120),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 120),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 120),
  utm_content text check (utm_content is null or char_length(utm_content) <= 120),
  status text not null default 'created'
    check (status in ('created', 'paid', 'delivered', 'refunded', 'needs_review')),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  delivered_at timestamptz,
  downloaded_at timestamptz,
  download_token text unique,
  link_expires_at timestamptz,
  credit_applied boolean not null default false,
  source_report_order_id uuid references orders (id)
);

create index if not exists orders_email_idx on orders (lower(email));

-- Server-side funnel events: purchase, pack_upgrade, pack_downloaded, refunded. Never card details or answers.
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  name text not null check (name in ('purchase', 'pack_upgrade', 'pack_downloaded', 'refunded')),
  order_id uuid references orders (id),
  props jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- One purchase event per order, so a replayed webhook cannot count a sale twice.
create unique index if not exists analytics_events_one_purchase on analytics_events (order_id) where name = 'purchase';

-- The website signs in as its own role, which can only read and write these three tables.
-- Replace the password before running; use the same value in DATABASE_URL.
do $$
begin
  if not exists (select from pg_roles where rolname = 'website_app') then
    create role website_app login password 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD';
  end if;
  execute format('grant connect on database %I to website_app', current_database());
end
$$;

grant usage on schema public to website_app;
grant insert on readiness_completions to website_app;
grant select, insert, update on orders to website_app;
grant select, insert on analytics_events to website_app;
