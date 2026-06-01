import type { Article } from "@/lib/types";
import CategoryKicker from "./CategoryKicker";
import SourceChip from "./SourceChip";
import ShareMenu from "./ShareMenu";
import { shortSource } from "@/lib/sourceMeta";
import { timeAgo } from "@/lib/time";

export default function FeaturedStory({ article }: { article: Article }) {
  return (
    <article className="grid md:grid-cols-[1.15fr_1fr] gap-6 md:gap-10 pb-8 border-b border-rule">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block thumb aspect-[4/3] md:aspect-[5/4] group"
        aria-label={`Read at ${article.source}: ${article.title}`}
      >
        {article.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.thumbnail_url} alt="" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-3xl italic text-ink-soft">
            Good Godly News
          </div>
        )}
      </a>

      <div className="flex flex-col justify-center">
        <CategoryKicker category={article.category} reason="TOP STORY" />

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block edit-link"
        >
          <h2 className="font-display font-black leading-[1.08] text-ink text-[34px] md:text-[46px] tracking-tight">
            {article.title}
          </h2>
        </a>

        {article.summary && (
          <p className="mt-4 text-[18px] md:text-[19px] leading-[1.6] text-ink font-normal">
            {article.summary}
          </p>
        )}

        <div className="mt-6 pt-4 rule-h flex flex-wrap items-center gap-x-4 gap-y-3">
          <SourceChip source={article.source} size="md" />
          <span className="font-label font-semibold text-[14px] text-ink-soft">
            {timeAgo(article.published_at)}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label font-bold text-[14px] text-accent body-link"
          >
            Read at {shortSource(article.source)} ↗
          </a>
          <span className="ml-auto">
            <ShareMenu url={article.url} title={article.title} />
          </span>
        </div>
      </div>
    </article>
  );
}
