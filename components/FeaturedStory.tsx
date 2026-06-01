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
      >
        {article.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.thumbnail_url} alt="" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-3xl italic text-ink-mute">
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
          className="mt-3"
        >
          <h2 className="font-display font-black leading-[1.05] text-ink text-[32px] md:text-[44px] tracking-tight edit-link inline">
            {article.title}
          </h2>
        </a>

        {article.summary && (
          <p className="mt-4 text-[17px] md:text-[18px] leading-[1.6] text-ink-soft">
            {article.summary}
          </p>
        )}

        <div className="mt-6 pt-4 rule-h flex flex-wrap items-center gap-x-4 gap-y-2">
          <SourceChip source={article.source} size="md" />
          <span className="font-label uppercase tracking-[0.14em] text-[11px] text-ink-mute">
            {timeAgo(article.published_at)}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label uppercase tracking-[0.18em] text-[11px] font-bold text-accent hover:underline"
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
