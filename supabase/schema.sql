create table if not exists articles (
  id            text primary key,
  title         text not null,
  summary       text,
  url           text not null unique,
  source        text not null,
  category      text not null,
  thumbnail_url text,
  published_at  timestamptz not null,
  created_at    timestamptz default now()
);

create index if not exists articles_category_idx     on articles (category);
create index if not exists articles_published_at_idx on articles (published_at desc);

-- Public read access (anon role)
alter table articles enable row level security;

drop policy if exists "Public read" on articles;
create policy "Public read" on articles for select using (true);
