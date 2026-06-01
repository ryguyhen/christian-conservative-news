import TopBar from "@/components/TopBar";
import Masthead from "@/components/Masthead";
import LatestRibbon from "@/components/LatestRibbon";
import NewsroomClient from "@/components/NewsroomClient";
import Footer from "@/components/Footer";
import { getSupabase } from "@/lib/supabase";
import { SAMPLE_ARTICLES } from "@/lib/sampleArticles";
import type { Article } from "@/lib/types";

export const revalidate = 3600;

async function getArticles(): Promise<Article[]> {
  try {
    const supabase = getSupabase();
    if (!supabase) return SAMPLE_ARTICLES;
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(50);
    if (error || !data || data.length === 0) return SAMPLE_ARTICLES;
    return data as Article[];
  } catch (err) {
    console.warn("Supabase fetch failed, using sample articles:", err);
    return SAMPLE_ARTICLES;
  }
}

export default async function HomePage() {
  const articles = await getArticles();
  const latest = articles[0]?.published_at;

  return (
    <>
      <TopBar storyCount={articles.length} latestPublishedAt={latest} />
      <Masthead />
      <LatestRibbon articles={articles} />
      <NewsroomClient articles={articles} />
      <Footer />
    </>
  );
}
