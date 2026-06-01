import type { Article } from "@/lib/types";
import CategoryKicker from "./CategoryKicker";
import SourceChip from "./SourceChip";
import ShareMenu from "./ShareMenu";
import { timeAgo } from "@/lib/time";

type Reason = "TOP STORY" | "LEAD" | "LATEST" | "EDITOR'S PICK" | null;

export default function ArticleCard({
  article,
  reason = null,
  size = "standard",
}: {
  article: Article;
  reason?: Reason;
  size?: "standard" | "medium";
}) {
  return (
    <article className="card group bg-paper">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Read at ${article.source}: ${article.title}`}
      >
        <div className={`thumb relative ${size === "medium" ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
          {article.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.thumbnail_url} alt="" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display text-2xl italic text-ink-soft">
              Good Godly News
            </div>
          )}
        </div>
      </a>

      <div className="pt-4 pb-1 flex flex-col flex-1">
        <CategoryKicker category={article.category} reason={reason} />

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block edit-link"
        >
          <h3
            className={`font-serif font-bold leading-[1.25] text-ink ${
              size === "medium" ? "text-[24px]" : "text-[20px]"
            } line-clamp-3`}
          >
            {article.title}
            <span aria-hidden className="text-ink-soft ml-1 align-baseline text-[14px]">↗</span>
          </h3>
        </a>

        {article.summary && (
          <p className="text-[16px] leading-[1.55] text-ink-soft mt-3 line-clamp-3 font-normal">
            {article.summary}
          </p>
        )}

        <div className="mt-auto pt-3 rule-h-soft flex items-center justify-between gap-3">
          <div className="min-w-0 flex items-center gap-2 flex-wrap">
            <SourceChip source={article.source} />
            <span className="font-label font-semibold text-[13px] text-ink-soft shrink-0">
              <span aria-hidden className="mr-1">·</span>{timeAgo(article.published_at)}
            </span>
          </div>
          <ShareMenu url={article.url} title={article.title} />
        </div>
      </div>
    </article>
  );
}
