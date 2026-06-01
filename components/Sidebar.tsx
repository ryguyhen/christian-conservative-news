import type { Article } from "@/lib/types";
import { timeAgo } from "@/lib/time";
import { shortSource } from "@/lib/sourceMeta";
import CategoryKicker from "./CategoryKicker";
import MissionCard from "./MissionCard";
import NewsletterCapture from "./NewsletterCapture";

const VERSES = [
  { text: "Whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure … think on these things.", ref: "Philippians 4:8" },
  { text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5" },
  { text: "Be strong and of a good courage; be not afraid, neither be thou dismayed.", ref: "Joshua 1:9" },
  { text: "Let your light so shine before men, that they may see your good works.", ref: "Matthew 5:16" },
  { text: "The fear of the Lord is the beginning of wisdom.", ref: "Proverbs 9:10" },
];

function SectionHead({ title, kicker, id }: { title: string; kicker?: string; id?: string }) {
  return (
    <div className="mb-3">
      {kicker && (
        <div className="font-label font-bold uppercase tracking-[0.06em] text-[12px] text-ink-soft mb-1">
          {kicker}
        </div>
      )}
      <h3 id={id} className="font-display font-black text-[22px] text-ink tracking-tight border-b border-rule pb-2">
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
      <MissionCard />

      <section aria-labelledby="sidebar-recent">
        <SectionHead title="Most Recent" kicker="Updated continuously" id="sidebar-recent" />
        <ol className="space-y-4">
          {recent.map((a, i) => (
            <li key={a.id} className="flex gap-3">
              <span aria-hidden className="font-display font-black text-ink text-[22px] leading-none w-7 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif font-bold text-[16px] leading-snug text-ink edit-link line-clamp-3 block"
                >
                  {a.title}
                </a>
                <div className="mt-1 font-label font-semibold uppercase tracking-[0.04em] text-[12px] text-ink-soft">
                  {shortSource(a.source)} <span aria-hidden>·</span> {timeAgo(a.published_at)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <NewsletterCapture variant="sidebar" />

      <section className="bg-paper-warm border border-rule p-5" aria-labelledby="sidebar-verse">
        <div className="font-label font-bold uppercase tracking-[0.06em] text-[12px] text-ink-soft mb-2">
          Verse of the Day
        </div>
        <blockquote id="sidebar-verse" className="font-display italic text-[17px] leading-[1.5] text-ink font-bold">
          “{verse.text}”
        </blockquote>
        <div className="mt-3 font-label font-bold uppercase tracking-[0.06em] text-[13px] text-accent">
          {verse.ref}
        </div>
      </section>

      <section aria-labelledby="sidebar-faith">
        <SectionHead title="More From Faith" id="sidebar-faith" />
        <ul className="space-y-4">
          {faith.length === 0 && (
            <li className="text-[15px] text-ink-soft">
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
                className="mt-2 block font-serif font-bold text-[16px] leading-snug text-ink edit-link"
              >
                {a.title}
              </a>
              <div className="mt-1 font-label font-semibold uppercase tracking-[0.04em] text-[12px] text-ink-soft">
                {shortSource(a.source)} <span aria-hidden>·</span> {timeAgo(a.published_at)}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
