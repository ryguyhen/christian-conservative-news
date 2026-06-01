/**
 * Seed / re-seed the `sources` table from sources.seed.json.
 *
 * Usage:
 *   npm run seed:sources
 *
 * Idempotent: rows are upserted by (name). Editing the JSON and re-running
 * is the supported way to add, disable, or update a source.
 *
 * Env required:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAdminClient } from "../lib/ingest/supabaseAdmin";
import { log } from "../lib/ingest/log";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface SeedRow {
  name: string;
  site_url: string | null;
  feed_url: string;
  parser_type: "rss" | "atom" | "custom";
  source_category: string | null;
  active: boolean;
  notes: string | null;
}

async function main() {
  const seedPath = path.join(__dirname, "sources.seed.json");
  const raw = fs.readFileSync(seedPath, "utf8");
  const rows: SeedRow[] = JSON.parse(raw);

  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from("sources")
    .upsert(rows, { onConflict: "name" })
    .select("id, name, active");
  if (error) throw new Error(error.message);

  const activeCount = (data ?? []).filter((r: any) => r.active).length;
  log.info("seed", `Upserted ${data?.length ?? 0} source(s); ${activeCount} active`);
}

main().catch((err) => {
  log.error("seed", err?.message || String(err));
  process.exit(1);
});
