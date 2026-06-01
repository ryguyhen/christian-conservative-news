export type Category = "Politics" | "Faith" | "Culture" | "World" | "Opinion";

export interface Article {
  id: string;
  title: string;
  summary: string | null;
  url: string;
  source: string;
  category: Category | string;
  thumbnail_url: string | null;
  published_at: string;
  created_at?: string;

  // Ingestion metadata (added by the pipeline; nullable on legacy rows)
  source_id?: string | null;
  guid?: string | null;
  author?: string | null;
  raw_categories?: string[] | null;
  topics?: string[] | null;
  title_hash?: string | null;
  ingested_at?: string | null;
}

export const CATEGORIES: Category[] = [
  "Politics",
  "Faith",
  "Culture",
  "World",
  "Opinion",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Politics: "#8b1a1a",
  Faith: "#1a5230",
  Culture: "#5b3389",
  World: "#163a7d",
  Opinion: "#6e511c",
};
