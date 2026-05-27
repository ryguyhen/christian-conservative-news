import type { Article } from "@/lib/types";

export default function BreakingTicker({ articles }: { articles: Article[] }) {
  const headlines = articles.slice(0, 10).map((a) => a.title);
  if (headlines.length === 0) return null;
  const items = [...headlines, ...headlines];

  return (
    <div className="bg-red text-white border-y border-red/70">
      <div className="max-w-content mx-auto px-0 flex items-stretch overflow-hidden">
        <div className="bg-white text-red font-label font-extrabold uppercase tracking-widest text-xs px-4 py-2 flex items-center shrink-0">
          Breaking
        </div>
        <div className="overflow-hidden flex-1 py-2">
          <div className="ticker-track font-label uppercase tracking-wider text-sm">
            {items.map((h, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="text-gold-light">✦</span>
                <span>{h}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
