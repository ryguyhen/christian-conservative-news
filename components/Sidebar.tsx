import type { Article } from "@/lib/types";
import { timeAgo } from "@/lib/time";
import { shortSource } from "@/lib/sourceMeta";
import CategoryKicker from "./CategoryKicker";

const VERSES = [
  { text: "Whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure … think on these things.", ref: "Philippians 4:8" },
  { text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5" },
  { text: "Be strong and of a good courage; be not afraid, neither be thou dismayed.", ref: "Joshua 1:9" },
  { text: "Let your light so shine before men, that they may see your good works.", ref: "Matthew 5:16" },
  { text: "The fear of the Lord is the beginning of wisdom.", ref: "Proverbs 9:10" },
];

function SectionHead({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <div className="mb-3">
      {kicker && (
        <div className="font-label uppercase tracking-[0.22em] text-[10px] text-ink-mute mb-1">
          {kicker}
        </div>
      )}
      <h3 className="font-display font-black text-[20px] text-ink tracking-tight border-b border-rule pb-2">
        {title}
      </h3>
    </div>
  );
}

export default function Sidebar({ articles }: { articles: Article[] }) {
  const recent = articles.slice(0, 5);
  const faith = articles.filter((a) => a.category === "Faith").slice(0, 3);
  const verse = VERSES[new Date().getDate() % VERSES.length];

  return (
    <aside className="space-y-10 lg:sticky lg:top-[64px] lg:self-start">
      {/* Most Recent */}
      <section>
        <SectionHead title="Most Recent" kicker="Updated continuously" />
        <ol className="space-y-4">
          {recent.map((a, i) => (
            <li key={a.id} className="flex gap-3">
              <span className="font-display font-black text-rule text-[22px] leading-none w-6 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-bold text-[15px] leading-snug text-ink edit-link inline line-clamp-3"
                >
                  {a.title}
                </a>
                <div className="mt-1 font-label uppercase tracking-[0.12em] text-[10px] text-ink-mute">
                  {shortSource(a.source)} · {timeAgo(a.published_at)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Verse of the Day */}
      <section className="bg-paper-warm border border-rule-soft p-5">
        <div className="font-label uppercase tracking-[0.22em] text-[10px] text-ink-mute mb-2">
          Verse of the Day
        </div>
        <blockquote className="font-display italic text-[16px] leading-[1.5] text-ink">
          “{verse.text}”
        </blockquote>
        <div className="mt-3 font-label uppercase tracking-[0.18em] text-[11px] font-bold text-accent">
          {verse.ref}
        </div>
      </section>

      {/* More from Faith */}
      <section>
        <SectionHead title="More From Faith" />
        <ul className="space-y-4">
          {faith.length === 0 && (
            <li className="text-sm italic text-ink-mute">
              No faith stories filed in the last cycle.
            </li>
          )}
          {faith.map((a) => (
            <li key={a.id}>
              <CategoryKicker category={a.category} />
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-display font-bold text-[15px] leading-snug text-ink edit-link"
              >
                {a.title}
              </a>
              <div className="mt-1 font-label uppercase tracking-[0.12em] text-[10px] text-ink-mute">
                {shortSource(a.source)} · {timeAgo(a.published_at)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* About the network */}
      <section className="bg-navy text-paper p-5">
        <div className="font-label uppercase tracking-[0.22em] text-[10px] text-gold mb-2">
          About the Network
        </div>
        <h3 className="font-display font-bold text-[18px] leading-snug">
          Headlines from 50+ independent Christian and conservative publishers.
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-paper/80">
          We aggregate and link — we do not republish. Every headline takes you
          to the original publisher.
        </p>
        <a
          href="#footer-sources"
          className="mt-3 inline-block font-label uppercase tracking-[0.18em] text-[11px] font-bold text-gold hover:underline"
        >
          See the full source list →
        </a>
      </section>
    </aside>
  );
}
