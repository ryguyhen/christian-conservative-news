"use client";

import { useMemo, useState } from "react";
import type { Article, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import FeaturedStory from "./FeaturedStory";
import ArticleCard from "./ArticleCard";
import ListSection from "./ListSection";
import Sidebar from "./Sidebar";
import EditorsBrief from "./EditorsBrief";
import InlineSupport from "./InlineSupport";
import NewsletterCapture from "./NewsletterCapture";

type Filter = "All" | Category;

export default function NewsroomClient({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [source, setSource] = useState<string>("All sources");

  const allSources = useMemo(
    () => Array.from(new Set(articles.map((a) => a.source))).sort(),
    [articles]
  );

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (filter !== "All" && a.category !== filter) return false;
      if (source !== "All sources" && a.source !== source) return false;
      return true;
    });
  }, [filter, source, articles]);

  const tabs: Filter[] = ["All", ...CATEGORIES];

  const featured = filtered[0];
  const mediums = filtered.slice(1, 3);
  const standards = filtered.slice(3, 9);
  const list = filtered.slice(9, 24);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-paper border-b-2 border-ink">
        <div className="max-w-content mx-auto px-6 flex flex-wrap items-stretch gap-x-1 gap-y-0">
          {tabs.map((t) => {
            const active = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 md:px-4 py-3 font-label uppercase tracking-[0.18em] text-[12px] font-bold transition-colors border-b-2 -mb-[2px] ${
                  active
                    ? "text-accent border-accent"
                    : "text-ink hover:text-accent border-transparent"
                }`}
              >
                {t === "All" ? "All Stories" : t}
              </button>
            );
          })}
          <div className="ml-auto self-center py-2 flex items-center gap-2">
            <label className="font-label uppercase tracking-[0.18em] text-[10px] text-ink-mute hidden md:inline">
              Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="bg-paper border border-rule font-label uppercase tracking-[0.12em] text-[11px] text-ink px-2 py-1 max-w-[220px]"
            >
              <option>All sources</option>
              {allSources.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <span className="font-label uppercase tracking-[0.18em] text-[10px] text-ink-mute hidden md:inline">
              {filtered.length} stories
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-content mx-auto px-6 py-10 grid lg:grid-cols-[1fr_320px] gap-x-12 gap-y-10">
        <main>
          {filter === "All" && source === "All sources" && <EditorsBrief />}

          {featured ? (
            <FeaturedStory article={featured} />
          ) : (
            <div className="py-12 text-center font-display italic text-ink-mute border border-rule">
              No stories match this filter.
            </div>
          )}

          {mediums.length > 0 && (
            <section className="grid md:grid-cols-2 gap-8 mt-10">
              {mediums.map((a) => (
                <ArticleCard key={a.id} article={a} reason="LEAD" size="medium" />
              ))}
            </section>
          )}

          {standards.length > 0 && (
            <section className="mt-12">
              <div className="flex items-end gap-4 mb-5">
                <h2 className="font-display font-black text-2xl text-ink tracking-tight">
                  Today&apos;s Coverage
                </h2>
                <span className="h-px flex-1 bg-rule" />
                <span className="font-label uppercase tracking-[0.18em] text-[11px] text-ink-mute">
                  {standards.length} stories
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {standards.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </section>
          )}

          <InlineSupport />

          <ListSection articles={list} />

          <NewsletterCapture />
        </main>

        <Sidebar articles={articles} />
      </div>
    </>
  );
}
