import type { SupabaseClient } from "@supabase/supabase-js";
import type { Source } from "./types";

export async function listActiveSources(
  supabase: SupabaseClient,
  opts: { only?: string } = {}
): Promise<Source[]> {
  let q = supabase
    .from("sources")
    .select("*")
    .eq("active", true)
    .order("name", { ascending: true });
  if (opts.only) q = q.eq("name", opts.only);
  const { data, error } = await q;
  if (error) throw new Error(`listActiveSources: ${error.message}`);
  return (data ?? []) as Source[];
}

export async function markFetchSuccess(
  supabase: SupabaseClient,
  sourceId: string
): Promise<void> {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("sources")
    .update({
      last_fetched_at: now,
      last_success_at: now,
      last_error: null,
      last_error_at: null,
    })
    .eq("id", sourceId);
  if (error) throw new Error(`markFetchSuccess: ${error.message}`);
}

export async function markFetchFailure(
  supabase: SupabaseClient,
  sourceId: string,
  err: string
): Promise<void> {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("sources")
    .update({
      last_fetched_at: now,
      last_error: err.slice(0, 500),
      last_error_at: now,
    })
    .eq("id", sourceId);
  if (error) throw new Error(`markFetchFailure: ${error.message}`);
}
