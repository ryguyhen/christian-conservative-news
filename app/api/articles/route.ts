import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { SAMPLE_ARTICLES } from "@/lib/sampleArticles";

export const revalidate = 600;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit") ?? "20");

  const supabase = getSupabase();
  if (!supabase) {
    const data = category
      ? SAMPLE_ARTICLES.filter((a) => a.category === category)
      : SAMPLE_ARTICLES;
    return NextResponse.json({ articles: data.slice(0, limit) });
  }

  let query = supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ articles: data ?? [] });
}
