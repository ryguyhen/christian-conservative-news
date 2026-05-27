"use client";

import { useMemo, useState } from "react";
import type { Article, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import FeaturedStory from "./FeaturedStory";
import ArticleCard from "./ArticleCard";
import ListSection from "./ListSection";
import Sidebar from "./Sidebar";

type Filter = "All" | Category;

export default function NewsroomClient({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? articles : articles.filter((a) => a.category === filter)),
    [filter, articles]
  );

  const featured = filtered[0];
  const cards = filtered.slice(1, 10);
  const list = filtered.slice(10, 25);

  const tabs: Filter[] = ["All", ...CATEGORIES];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-navy-mid border-b-2 border-gold">
        <div className="max-w-content mx-auto px-6 flex flex-wrap items-center gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const active = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-3 font-label uppercase tracking-[0.18em] text-[13px] font-bold border-b-2 transition-colors ${
                  active
                    ? "text-gold border-gold"
                    : "text-cream/80 hover:text-gold border-transparent"
                }`}
              >
                {t === "All" ? "All Stories" : t}
              </button>
            );
          })}
          <span className="ml-auto font-label uppercase text-[11px] tracking-widest text-cream/60 hidden md:inline">
            {filtered.length} stories
          </span>
        </div>
      </nav>

      <div className="max-w-content mx-auto px-6 py-8 grid lg:grid-cols-[1fr_320px] gap-10">
        <main>
          {featured ? (
            <FeaturedStory article={featured} />
          ) : (
            <div className="card p-10 text-center text-navy/60 italic">
              No stories in this category yet — check back soon.
            </div>
          )}

          {cards.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}

          <ListSection articles={list} />
        </main>

        <Sidebar articles={articles} />
      </div>
    </>
  );
}
