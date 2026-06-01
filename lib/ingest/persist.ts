import type { SupabaseClient } from "@supabase/supabase-js";
import type { NormalizedArticle } from "./types";

/**
 * Upsert articles. Uses ignoreDuplicates so the unique URL constraint
 * catches anything dedupe missed. We've already removed in-batch and
 * existing-row duplicates upstream, so this is a safety net.
 */
export async function persistArticles(
  supabase: SupabaseClient,
  articles: NormalizedArticle[]
): Promise<{ inserted: number; error?: string }> {
  if (articles.length === 0) return { inserted: 0 };

  const rows = articles.map((a) => ({
    id: a.id,
    title: a.title,
    summary: a.summary || null,
    url: a.url,
    source: a.source,
    source_id: a.source_id,
    category: a.category,
    topics: a.topics,
    raw_categories: a.raw_categories,
    author: a.author,
    thumbnail_url: a.thumbnail_url,
    published_at: a.published_at,
    guid: a.guid,
    title_hash: a.title_hash,
    ingested_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from("articles")
    .upsert(rows, { onConflict: "id", ignoreDuplicates: true })
    .select("id");

  if (error) return { inserted: 0, error: error.message };
  return { inserted: data?.length ?? 0 };
}
