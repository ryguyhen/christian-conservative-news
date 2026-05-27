export type Category = "Politics" | "Faith" | "Culture" | "World" | "Opinion";

export interface Article {
  id: string;
  title: string;
  summary: string | null;
  url: string;
  source: string;
  category: Category;
  thumbnail_url: string | null;
  published_at: string;
  created_at?: string;
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
  Faith: "#1a5c2e",
  Culture: "#6b3fa0",
  World: "#1a4080",
  Opinion: "#7a5c1e",
};
