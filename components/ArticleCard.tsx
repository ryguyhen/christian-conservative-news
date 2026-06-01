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
      >
        <div className={`thumb relative ${size === "medium" ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
          {article.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.thumbnail_url} alt="" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display text-2xl italic text-ink-mute">
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
          className="mt-2 block"
        >
          <h3
            className={`font-display font-bold leading-[1.18] text-ink ${
              size === "medium" ? "text-[24px]" : "text-[19px]"
            } line-clamp-3 edit-link inline`}
          >
            {article.title}
            <span aria-hidden className="text-ink-mute ml-1 align-super text-[11px]">↗</span>
          </h3>
        </a>

        {article.summary && (
          <p className="text-[14.5px] leading-[1.55] text-ink-soft mt-2 line-clamp-3">
            {article.summary}
          </p>
        )}

        <div className="mt-auto pt-3 rule-h-soft flex items-center justify-between gap-3">
          <div className="min-w-0 flex items-center gap-2">
            <SourceChip source={article.source} />
            <span className="font-label uppercase tracking-[0.12em] text-[11px] text-ink-mute shrink-0">
              · {timeAgo(article.published_at)}
            </span>
          </div>
          <ShareMenu url={article.url} title={article.title} />
        </div>
      </div>
    </article>
  );
}
