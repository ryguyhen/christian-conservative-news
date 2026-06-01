-- Migration: sources table + article ingestion metadata
-- Safe to run multiple times.

create extension if not exists pgcrypto;

-- ── Sources table ────────────────────────────────────────────────────────────
create table if not exists sources (
  id               uuid primary key default gen_random_uuid(),
  name             text not null unique,
  site_url         text,
  feed_url         text not null,
  parser_type      text not null default 'rss'
                   check (parser_type in ('rss','atom','custom')),
  source_category  text,                          -- default category if classifier finds nothing
  active           boolean not null default true,
  notes            text,
  last_fetched_at  timestamptz,
  last_success_at  timestamptz,
  last_error       text,
  last_error_at    timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists sources_active_idx on sources (active) where active = true;
create unique index if not exists sources_feed_url_idx on sources (feed_url);

-- RLS: locked down. Service role (used by ingest) bypasses RLS.
alter table sources enable row level security;

-- ── Articles: ingestion metadata ────────────────────────────────────────────
alter table articles add column if not exists guid           text;
alter table articles add column if not exists author         text;
alter table articles add column if not exists raw_categories text[];
alter table articles add column if not exists topics         text[];
alter table articles add column if not exists title_hash     text;
alter table articles add column if not exists source_id      uuid references sources(id);
alter table articles add column if not exists ingested_at    timestamptz default now();

-- Dedupe + filter indexes
create index if not exists articles_guid_idx       on articles (guid) where guid is not null;
create index if not exists articles_title_hash_idx on articles (title_hash);
create index if not exists articles_source_id_idx  on articles (source_id);
create index if not exists articles_topics_gin     on articles using gin (topics);

-- updated_at trigger for sources
create or replace function touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists sources_touch on sources;
create trigger sources_touch
  before update on sources
  for each row execute function touch_updated_at();
