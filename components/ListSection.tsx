import type { Article } from "@/lib/types";
import CategoryKicker from "./CategoryKicker";
import SourceChip from "./SourceChip";
import ShareMenu from "./ShareMenu";
import { timeAgo } from "@/lib/time";

export default function ListSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-14" aria-labelledby="more-stories-heading">
      <div className="flex items-end gap-4 mb-5">
        <h2 id="more-stories-heading" className="font-display font-black text-[26px] text-ink tracking-tight">
          More Stories
        </h2>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-ink-soft">
          {articles.length} filed
        </span>
      </div>

      <ul className="divide-y divide-rule-soft">
        {articles.map((a) => (
          <li key={a.id} className="py-5">
            <div className="flex gap-4 items-start">
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[104px] h-[72px] shrink-0 thumb hidden sm:block"
                aria-label={`Read at ${a.source}: ${a.title}`}
              >
                {a.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.thumbnail_url} alt="" loading="lazy" />
                ) : null}
              </a>
              <div className="flex-1 min-w-0">
                <CategoryKicker category={a.category} />
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 edit-link"
                >
                  <h3 className="font-serif font-bold text-[19px] leading-snug text-ink line-clamp-2">
                    {a.title}
                  </h3>
                </a>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <SourceChip source={a.source} />
                  <span className="font-label font-semibold text-[13px] text-ink-soft">
                    <span aria-hidden className="mr-1">·</span>{timeAgo(a.published_at)}
                  </span>
                  <span className="ml-auto">
                    <ShareMenu url={a.url} title={a.title} />
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
