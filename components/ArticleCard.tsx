import type { Article } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import { timeAgo } from "@/lib/time";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex flex-col h-full"
    >
      <div className="card-thumb relative aspect-[16/9] overflow-hidden bg-parchment">
        {article.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.thumbnail_url}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/60 font-display text-3xl italic">
            Good Godly News
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <CategoryBadge category={article.category} />
        <h3 className="card-title font-display font-bold text-[20px] leading-[1.2] text-navy mt-2 line-clamp-3">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-[14px] leading-relaxed text-navy/75 mt-3 line-clamp-3">
            {article.summary}
          </p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between text-[11px] font-label uppercase tracking-widest text-navy/60">
          <span className="inline-block bg-parchment px-2 py-1 rounded text-navy/80">
            {article.source}
          </span>
          <span>{timeAgo(article.published_at)}</span>
        </div>
      </div>
    </a>
  );
}
