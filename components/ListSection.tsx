import type { Article } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import { timeAgo } from "@/lib/time";

export default function ListSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-12">
      <div className="flex items-center gap-4 mb-5">
        <h2 className="font-display font-bold text-2xl text-navy">More Stories</h2>
        <span className="h-px flex-1 bg-border-tan" />
      </div>
      <div className="divide-y divide-border-tan">
        {articles.map((a) => (
          <a
            key={a.id}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 py-4 items-center group"
          >
            <div className="w-[88px] h-[60px] shrink-0 bg-parchment overflow-hidden">
              {a.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.thumbnail_url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <CategoryBadge category={a.category} />
                <span className="font-label uppercase tracking-widest text-[11px] text-navy/60">
                  {a.source} · {timeAgo(a.published_at)}
                </span>
              </div>
              <h3 className="font-display font-bold text-[18px] leading-snug text-navy group-hover:text-red transition-colors line-clamp-2">
                {a.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
