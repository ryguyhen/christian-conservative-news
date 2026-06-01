import { getAdminClient } from "./supabaseAdmin";
import { listActiveSources, markFetchSuccess, markFetchFailure } from "./sourcesRepo";
import { fetchFeed } from "./fetchFeed";
import { normalize } from "./normalize";
import { classifyBatch } from "./classify";
import { filterDuplicates } from "./dedupe";
import { persistArticles } from "./persist";
import { log } from "./log";
import type {
  NormalizedArticle,
  RunSummary,
  Source,
  SourceIngestResult,
} from "./types";

export interface RunOptions {
  /** Only ingest the named source. */
  only?: string;
  /** Cap items processed per source (after fetch). */
  perSourceLimit?: number;
  /** Don't write to the DB. */
  dryRun?: boolean;
}

async function runOne(
  supabase: ReturnType<typeof getAdminClient>,
  source: Source,
  opts: RunOptions
): Promise<SourceIngestResult> {
  const result: SourceIngestResult = {
    source: source.name,
    source_id: source.id,
    fetched: 0,
    inserted: 0,
    duplicates: 0,
    skipped: 0,
  };

  try {
    const items = await fetchFeed(source);
    result.fetched = items.length;

    const capped = opts.perSourceLimit ? items.slice(0, opts.perSourceLimit) : items;

    const normalized: NormalizedArticle[] = [];
    for (const it of capped) {
      const n = normalize(it, source);
      if (n) normalized.push(n);
      else result.skipped++;
    }

    const classified = classifyBatch(normalized);

    const { fresh, duplicates } = await filterDuplicates(supabase, classified);
    result.duplicates = duplicates;

    if (opts.dryRun) {
      log.info("dry-run", `${source.name}: would insert ${fresh.length}`, {
        fetched: result.fetched,
        duplicates,
        skipped: result.skipped,
      });
      if (!opts.dryRun) await markFetchSuccess(supabase, source.id);
      return result;
    }

    const { inserted, error } = await persistArticles(supabase, fresh);
    if (error) throw new Error(`persist: ${error}`);
    result.inserted = inserted;

    await markFetchSuccess(supabase, source.id);
    log.info("ingest", `${source.name} ✓`, {
      fetched: result.fetched,
      inserted: result.inserted,
      duplicates: result.duplicates,
      skipped: result.skipped,
    });
  } catch (err: any) {
    const msg = err?.message || String(err);
    result.feed_error = msg;
    log.warn("ingest", `${source.name} ✗ ${msg}`);
    if (!opts.dryRun) {
      try {
        await markFetchFailure(supabase, source.id, msg);
      } catch (e: any) {
        log.error("sources", `markFetchFailure failed: ${e?.message || e}`);
      }
    }
  }

  return result;
}

/** Orchestrate the full ingestion run. */
export async function runIngestion(opts: RunOptions = {}): Promise<RunSummary> {
  const started = Date.now();
  const startedAt = new Date(started).toISOString();
  const supabase = getAdminClient();

  const sources = await listActiveSources(supabase, { only: opts.only });
  log.info("ingest", `Loaded ${sources.length} active source(s)`);

  const perSource: SourceIngestResult[] = [];
  for (const src of sources) {
    perSource.push(await runOne(supabase, src, opts));
  }

  const finished = Date.now();
  const summary: RunSummary = {
    startedAt,
    finishedAt: new Date(finished).toISOString(),
    durationMs: finished - started,
    sourcesAttempted: sources.length,
    sourcesSucceeded: perSource.filter((r) => !r.feed_error).length,
    sourcesFailed: perSource.filter((r) => r.feed_error).length,
    totalFetched: perSource.reduce((s, r) => s + r.fetched, 0),
    totalInserted: perSource.reduce((s, r) => s + r.inserted, 0),
    totalDuplicates: perSource.reduce((s, r) => s + r.duplicates, 0),
    perSource,
  };

  log.info("ingest", "Run complete", {
    duration_ms: summary.durationMs,
    sources: summary.sourcesAttempted,
    ok: summary.sourcesSucceeded,
    failed: summary.sourcesFailed,
    inserted: summary.totalInserted,
    duplicates: summary.totalDuplicates,
  });

  return summary;
}
