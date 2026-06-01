import type { Article } from "@/lib/types";
import { isRecent, timeAgo } from "@/lib/time";
import { shortSource } from "@/lib/sourceMeta";

export default function LatestRibbon({ articles }: { articles: Article[] }) {
  const recent = articles.filter((a) => isRecent(a.published_at, 6)).slice(0, 3);
  if (recent.length === 0) return null;

  return (
    <section className="bg-navy text-paper">
      <div className="max-w-content mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center gap-3">
        <div className="font-label font-bold uppercase tracking-[0.22em] text-[11px] text-gold shrink-0 md:border-r md:border-navy-mid md:pr-4">
          Latest Filed
        </div>
        <ul className="flex-1 flex flex-col md:flex-row md:items-center gap-x-6 gap-y-2 text-[13px]">
          {recent.map((a) => (
            <li key={a.id} className="flex items-center gap-2 min-w-0">
              <span className="font-label uppercase tracking-widest text-[10px] text-gold/80 shrink-0">
                {timeAgo(a.published_at)}
              </span>
              <span className="text-paper/50 shrink-0">·</span>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:underline"
              >
                <span className="font-label uppercase tracking-wider text-[10px] text-gold/80 mr-2">
                  {shortSource(a.source)}
                </span>
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
