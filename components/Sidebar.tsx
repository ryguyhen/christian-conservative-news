import type { Article } from "@/lib/types";
import { SOURCE_NAMES } from "@/lib/sources";
import { timeAgo } from "@/lib/time";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border-tan bg-white">
      <div className="bg-navy px-4 py-2.5">
        <h3 className="font-label uppercase tracking-[0.2em] text-gold font-bold text-sm">
          {title}
        </h3>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export default function Sidebar({ articles }: { articles: Article[] }) {
  const trending = articles.slice(0, 5);
  const faith = articles.filter((a) => a.category === "Faith").slice(0, 2);

  return (
    <aside className="space-y-6 sticky top-[60px]">
      <Block title="Trending Now">
        <ol className="space-y-3">
          {trending.map((a, i) => (
            <li key={a.id} className="flex gap-3">
              <span className="font-display font-black text-gold text-2xl leading-none w-6">
                {i + 1}
              </span>
              <div className="flex-1">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-bold text-[15px] leading-snug text-navy hover:text-red line-clamp-3 block"
                >
                  {a.title}
                </a>
                <div className="mt-1 font-label uppercase tracking-widest text-[10px] text-navy/60">
                  {a.source} · {timeAgo(a.published_at)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Our 56 Active Sources">
        <div className="flex flex-wrap gap-1.5">
          {SOURCE_NAMES.map((s) => (
            <span
              key={s}
              className="font-label text-[11px] uppercase tracking-wider bg-parchment text-navy/80 px-2 py-1 rounded"
            >
              {s}
            </span>
          ))}
        </div>
      </Block>

      <Block title="Faith & Prayer">
        <ul className="space-y-3">
          {faith.map((a) => (
            <li key={a.id}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-bold text-[15px] leading-snug text-navy hover:text-red line-clamp-3 block"
              >
                {a.title}
              </a>
              <div className="mt-1 font-label uppercase tracking-widest text-[10px] text-navy/60">
                {a.source} · {timeAgo(a.published_at)}
              </div>
            </li>
          ))}
          {faith.length === 0 && (
            <li className="text-sm text-navy/60 italic">Check back soon.</li>
          )}
        </ul>
      </Block>
    </aside>
  );
}
