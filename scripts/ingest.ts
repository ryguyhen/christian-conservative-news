/**
 * Ingestion CLI driver.
 *
 * Usage:
 *   npm run ingest
 *   npm run ingest -- --source "The Daily Wire"
 *   npm run ingest -- --dry-run
 *   npm run ingest -- --limit 5
 *   INGEST_DEBUG=1 npm run ingest
 *
 * Env required:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { runIngestion } from "../lib/ingest/run";
import { log } from "../lib/ingest/log";

function parseArgs(argv: string[]) {
  const args: { only?: string; perSourceLimit?: number; dryRun?: boolean } = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--source" || a === "-s") args.only = argv[++i];
    else if (a === "--limit" || a === "-l") args.perSourceLimit = Number(argv[++i]);
    else if (a === "--dry-run") args.dryRun = true;
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  log.info("ingest", "Starting run", args as Record<string, unknown>);

  const summary = await runIngestion(args);

  console.log("\n── Run summary ───────────────────────────────────────────");
  console.log(`  duration:     ${summary.durationMs} ms`);
  console.log(`  sources:      ${summary.sourcesAttempted}`);
  console.log(`  succeeded:    ${summary.sourcesSucceeded}`);
  console.log(`  failed:       ${summary.sourcesFailed}`);
  console.log(`  fetched:      ${summary.totalFetched}`);
  console.log(`  inserted:     ${summary.totalInserted}`);
  console.log(`  duplicates:   ${summary.totalDuplicates}`);
  if (summary.sourcesFailed > 0) {
    console.log("\n  Failures:");
    for (const r of summary.perSource) {
      if (r.feed_error) console.log(`    - ${r.source}: ${r.feed_error}`);
    }
  }
}

main().catch((err) => {
  log.error("ingest", err?.message || String(err));
  process.exit(1);
});
