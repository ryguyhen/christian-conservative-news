# Good Godly News

> Cut the noise, feed the spirit — positive, encouraging Christian news.

A production-ready news aggregator that pulls RSS feeds from 56 Christian and conservative sources, summarizes them with Claude, and serves them via a clean editorial Next.js front-end.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres)
- Anthropic API for AI summaries (`claude-sonnet-4-20250514`)
- GitHub Actions cron (daily 6am EST)
- Deploys on Vercel

## Local dev

```bash
npm install
cp .env.local.example .env.local   # then fill in your keys
npm run dev
```

The site runs out-of-the-box with built-in sample articles when no Supabase env is configured. As soon as you point it at a real Supabase project with seeded data, the site switches over automatically.

## Seed the database

1. Create a Supabase project at supabase.com.
2. Run `supabase/schema.sql` in the SQL editor.
3. Fill in `.env.local` with your Supabase URL, anon key, service role key, and Anthropic key.
4. Run the fetcher: `npm run fetch`

## Deploy

- **Vercel**: import the repo, set `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`, deploy.
- **GitHub Actions**: add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY` as repo secrets. The workflow at `.github/workflows/daily-fetch.yml` will run every morning at 11:00 UTC (6am EST). You can trigger it manually from the Actions tab.

## Structure

```
app/                # Next.js App Router
  page.tsx          # Homepage (server) — fetches articles + renders all sections
  api/articles/     # GET /api/articles?category=Faith&limit=20
components/         # All UI primitives
lib/                # supabase client, types, sample data, helpers
scripts/fetchNews.js
supabase/schema.sql
.github/workflows/daily-fetch.yml
```
