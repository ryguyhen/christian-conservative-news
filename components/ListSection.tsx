import type { Article } from "@/lib/types";
import CategoryKicker from "./CategoryKicker";
import SourceChip from "./SourceChip";
import ShareMenu from "./ShareMenu";
import { timeAgo } from "@/lib/time";

export default function ListSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-14">
      <div className="flex items-end gap-4 mb-5">
        <h2 className="font-display font-black text-2xl text-ink tracking-tight">
          More Stories
        </h2>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-label uppercase tracking-[0.18em] text-[11px] text-ink-mute">
          {articles.length} filed
        </span>
      </div>

      <ul className="divide-y divide-rule-soft">
        {articles.map((a) => (
          <li key={a.id} className="py-4">
            <div className="flex gap-4 items-start">
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[96px] h-[64px] shrink-0 thumb hidden sm:block"
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
                  className="block mt-1"
                >
                  <h3 className="font-display font-bold text-[18px] leading-snug text-ink edit-link inline line-clamp-2">
                    {a.title}
                  </h3>
                </a>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <SourceChip source={a.source} />
                  <span className="font-label uppercase tracking-[0.12em] text-[11px] text-ink-mute">
                    · {timeAgo(a.published_at)}
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
