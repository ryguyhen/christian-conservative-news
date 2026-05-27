import type { Article } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import { timeAgo } from "@/lib/time";

export default function FeaturedStory({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card grid md:grid-cols-2 gap-0 mb-8 group"
    >
      <div className="card-thumb relative aspect-[16/10] md:aspect-auto overflow-hidden bg-parchment">
        {article.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.thumbnail_url}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/60 font-display text-4xl italic">
            Good Godly News
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col justify-center">
        <CategoryBadge category={article.category} />
        <h2 className="card-title font-display font-black text-[28px] md:text-[36px] leading-[1.1] text-navy mt-3">
          {article.title}
        </h2>
        {article.summary && (
          <p className="text-[16px] leading-relaxed text-navy/80 mt-4">
            {article.summary}
          </p>
        )}
        <div className="mt-6 flex items-center gap-4 text-[12px] font-label uppercase tracking-widest text-navy/70">
          <span className="bg-parchment px-2 py-1 rounded">{article.source}</span>
          <span>{timeAgo(article.published_at)}</span>
          <span className="ml-auto text-red font-bold">Read Full Story →</span>
        </div>
      </div>
    </a>
  );
}
