import type { SupabaseClient } from "@supabase/supabase-js";
import type { NormalizedArticle } from "./types";

/**
 * Three-layer dedupe, batched into ≤3 SQL queries per source run:
 *   1. canonical-URL id (PK)
 *   2. feed GUID
 *   3. normalized title hash
 *
 * Returns the candidates that are NOT already present.
 */
export async function filterDuplicates(
  supabase: SupabaseClient,
  candidates: NormalizedArticle[]
): Promise<{ fresh: NormalizedArticle[]; duplicates: number }> {
  if (candidates.length === 0) return { fresh: [], duplicates: 0 };

  const ids = candidates.map((c) => c.id);
  const guids = candidates.map((c) => c.guid).filter((g): g is string => !!g);
  const titleHashes = candidates.map((c) => c.title_hash);

  const [byId, byGuid, byTitle] = await Promise.all([
    supabase.from("articles").select("id").in("id", ids),
    guids.length > 0
      ? supabase.from("articles").select("guid").in("guid", guids)
      : Promise.resolve({ data: [] as { guid: string }[], error: null }),
    supabase.from("articles").select("title_hash").in("title_hash", titleHashes),
  ]);

  const existingIds = new Set((byId.data ?? []).map((r: any) => r.id));
  const existingGuids = new Set(
    (byGuid.data ?? []).map((r: any) => r.guid).filter(Boolean)
  );
  const existingTitleHashes = new Set(
    (byTitle.data ?? []).map((r: any) => r.title_hash).filter(Boolean)
  );

  // Also dedupe within the candidate batch itself — multiple feeds can
  // surface the same canonical URL / title in one run.
  const seenIds = new Set<string>();
  const seenTitleHashes = new Set<string>();

  const fresh: NormalizedArticle[] = [];
  let duplicates = 0;

  for (const c of candidates) {
    if (existingIds.has(c.id)) { duplicates++; continue; }
    if (c.guid && existingGuids.has(c.guid)) { duplicates++; continue; }
    if (existingTitleHashes.has(c.title_hash)) { duplicates++; continue; }
    if (seenIds.has(c.id) || seenTitleHashes.has(c.title_hash)) { duplicates++; continue; }
    seenIds.add(c.id);
    seenTitleHashes.add(c.title_hash);
    fresh.push(c);
  }

  return { fresh, duplicates };
}
