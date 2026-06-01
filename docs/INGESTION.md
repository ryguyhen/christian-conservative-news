# Ingestion pipeline

How the daily article pipeline works, how to run it locally, how to add
or disable sources, and how to debug failures.

## Architecture

```
sources (DB)
   │
   ▼
lib/ingest/run.ts        ← orchestrator
   ├─ sourcesRepo        ← listActive / markFetchSuccess / markFetchFailure
   ├─ fetchFeed          ← rss-parser, 15s timeout, custom User-Agent
   ├─ normalize          ← raw item → NormalizedArticle (canonicalize URL,
   │                       extract thumbnail, build title hash, etc.)
   ├─ classify           ← keyword-weighted topic scoring → topics[]
   ├─ dedupe             ← three-layer: id (canonical-URL md5),
   │                       guid, normalized-title hash
   └─ persist            ← upsert to `articles`, ignoreDuplicates as safety net
```

Each stage is a single small file in `lib/ingest/`.

## Database

Schema lives in `supabase/`. Apply migrations in order:

```sql
-- supabase/schema.sql           (base articles table)
-- supabase/migrations/0002_sources_and_article_extras.sql
```

Paste both into the Supabase SQL editor. Both are idempotent.

Tables:

- **`sources`** — id (uuid), name (unique), site_url, feed_url (unique),
  parser_type, source_category, active, notes, last_fetched_at,
  last_success_at, last_error, last_error_at, created_at, updated_at.
- **`articles`** — existing columns + new ingestion metadata:
  guid, author, raw_categories text[], topics text[], title_hash,
  source_id (FK → sources), ingested_at.

## Local setup

Required env (put in `.env.local`):

```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...      # not the anon key; service role
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

(The frontend reads the public ones; the ingest reads the service-role one.)

## Seeding sources

The source catalog lives in `scripts/sources.seed.json`. To seed or refresh
the database from it:

```bash
npm run seed:sources
```

This upserts by `name`. To **add** a source, append a row. To **disable**
a source, flip `"active": false`. Then re-run the command.

Initial active set is intentionally small (~15 publishers with reliable
RSS endpoints). All other sources from the legacy spreadsheet are seeded
with `active: false` + a `notes` value of `"needs feed verification"`.
Enable them after confirming their feed URLs respond cleanly.

## Running the pipeline locally

```bash
# Full run
npm run ingest

# Single source
npm run ingest -- --source "The Daily Wire"

# Dry run (parse + classify + dedupe, but do not write)
npm run ingest -- --dry-run

# Cap items per source (useful in development)
npm run ingest -- --limit 3

# Verbose
INGEST_DEBUG=1 npm run ingest
```

Output:

```
[2026-06-01T11:00:00Z] INFO  ingest         Loaded 15 active source(s)
[2026-06-01T11:00:02Z] INFO  ingest         The Daily Wire ✓ {"fetched":10,"inserted":7,"duplicates":3,"skipped":0}
[2026-06-01T11:00:03Z] WARN  ingest         Some Broken Source ✗ feed parse error
...
── Run summary ───────────────────────────────────────────
  duration:     14 023 ms
  sources:      15
  succeeded:    14
  failed:       1
  fetched:      138
  inserted:     76
  duplicates:   62

  Failures:
    - Some Broken Source: feed parse error
```

Failures don't abort the run — each source is isolated. The
`sources.last_error` column captures the most recent message per source
for triage:

```sql
select name, last_error, last_error_at
from sources
where last_error is not null and active = true
order by last_error_at desc;
```

## Scheduled ingestion

Two schedulers are configured. Use whichever fits your plan:

### GitHub Actions (primary)
File: `.github/workflows/daily-fetch.yml`
- Runs at 11:00 UTC (6 a.m. EST) daily.
- No function timeout — handles the full source set reliably.
- Required repo secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
  `ANTHROPIC_API_KEY` (optional).
- Manual trigger from the Actions tab supports `source` and `dry_run` inputs.

### Vercel Cron (secondary)
File: `vercel.json` → `crons[]` → `/api/cron/ingest` at 11:15 UTC daily.
- Requires `CRON_SECRET` env var in Vercel. Vercel automatically sends
  `Authorization: Bearer ${CRON_SECRET}` to cron paths.
- The route is in `app/api/cron/ingest/route.ts`. Same code path as the CLI.
- On Vercel **Hobby**, function timeout is 60s — a full 15-source run
  may exceed this. Tune with `?limit=N` or `?source=...` query params,
  or rely on GitHub Actions for the full run and use this only for
  smaller jobs.

Manual trigger from any terminal:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://YOUR-SITE.vercel.app/api/cron/ingest
```

## Topic classification

`lib/ingest/classify.ts` holds the rule set. Each topic has weighted
keywords and optional `require` / `exclude` token lists. To tune a topic,
edit its `keywords` array (phrase + weight). To add a topic, add a new
`TopicRule` entry. The classifier sums weights for matched phrases and
tags the article if the score >= 2.5 (default threshold).

The first matched topic also updates the article's legacy `category` column
so the existing homepage filter shows something coherent for new articles.

## Adding a new source — checklist

1. Find the publisher's RSS or Atom feed URL. Test it in a browser; you
   should see XML.
2. Add a row to `scripts/sources.seed.json` with `active: true`.
3. `npm run seed:sources`
4. `npm run ingest -- --source "Your New Source" --limit 2 --dry-run`
   to verify parsing.
5. Drop `--dry-run` to commit. Check the row in `articles`.

## Disabling a broken source

```sql
update sources set active = false, notes = 'broken: 403 since 2026-06' where name = '…';
```

Or flip the JSON and re-seed. Either is fine.

## What this phase deliberately does not do

- **No HTML scraping.** RSS/Atom only. If a publisher has no feed, leave
  them disabled; build a custom adapter later.
- **No AI summaries by default.** The pipeline uses the feed's
  `contentSnippet` / `description`, HTML-stripped. AI summarization can
  be reintroduced as a separate post-ingest step if desired.
- **No topic exposure in the UI yet.** Topics are stored in
  `articles.topics`. A future phase can add topic filter chips.
- **No admin UI.** Add/edit/disable via the JSON file + `npm run seed:sources`.
  An `/admin/sources` page protected by auth is a clean next step.
