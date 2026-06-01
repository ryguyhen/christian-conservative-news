/**
 * Types for the ingestion pipeline.
 *
 * Stages: fetchFeed → normalize → classify → dedupe → persist
 */

export interface Source {
  id: string;
  name: string;
  site_url: string | null;
  feed_url: string;
  parser_type: "rss" | "atom" | "custom";
  source_category: string | null;
  active: boolean;
  notes: string | null;
  last_fetched_at: string | null;
  last_success_at: string | null;
  last_error: string | null;
  last_error_at: string | null;
}

/** What rss-parser hands us per item. We only depend on a subset. */
export interface RawFeedItem {
  guid?: string;
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  contentSnippet?: string;
  content?: string;
  summary?: string;
  creator?: string;
  author?: string;
  categories?: string[];
  enclosure?: { url?: string; type?: string };
  ["dc:creator"]?: string;
  ["content:encoded"]?: string;
  ["media:content"]?: { $?: { url?: string } } | Array<{ $?: { url?: string } }>;
  ["media:thumbnail"]?: { $?: { url?: string } } | Array<{ $?: { url?: string } }>;
}

/** Article shape after normalization, ready for classify → dedupe → persist. */
export interface NormalizedArticle {
  id: string;                     // md5 of canonical URL
  title: string;
  url: string;                    // canonical
  summary: string;
  source: string;                 // denormalized source name (frontend reads this)
  source_id: string;
  category: string;               // legacy column — first matching topic label, else source default, else 'News'
  topics: string[];               // classification output
  raw_categories: string[];
  author: string | null;
  thumbnail_url: string | null;
  published_at: string;           // ISO
  guid: string | null;
  title_hash: string;
}

/** What we report back from one source run. */
export interface SourceIngestResult {
  source: string;
  source_id: string;
  fetched: number;
  inserted: number;
  duplicates: number;
  skipped: number;
  feed_error?: string;
}

export interface RunSummary {
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  sourcesAttempted: number;
  sourcesSucceeded: number;
  sourcesFailed: number;
  totalFetched: number;
  totalInserted: number;
  totalDuplicates: number;
  perSource: SourceIngestResult[];
}
