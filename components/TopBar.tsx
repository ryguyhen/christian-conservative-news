import Link from "next/link";
import { editionLabel, fullDate, timeAgo } from "@/lib/time";

export default function TopBar({
  storyCount,
  latestPublishedAt,
}: {
  storyCount: number;
  latestPublishedAt?: string;
}) {
  return (
    <div className="bg-paper-soft border-b border-rule-soft">
      <div className="max-w-content mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 font-label text-[13px] text-ink-soft">
        <span className="font-semibold">{fullDate()}</span>
        <span className="hidden md:inline font-semibold">{editionLabel()}</span>
        <span className="flex items-center gap-3">
          <span className="font-semibold">
            {storyCount} stories
            {latestPublishedAt && (
              <>
                <span className="mx-2 text-ink-soft/70" aria-hidden>·</span>
                Updated {timeAgo(latestPublishedAt)}
              </>
            )}
          </span>
          <span className="text-ink-soft/70" aria-hidden>·</span>
          <Link href="/about" className="font-bold text-ink hover:text-accent">
            About
          </Link>
        </span>
      </div>
    </div>
  );
}
