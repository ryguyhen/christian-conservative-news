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
    <div className="bg-paper border-b border-rule-soft">
      <div className="max-w-content mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-2 font-label uppercase tracking-[0.14em] text-[11px] text-ink-soft">
        <span>{fullDate()}</span>
        <span className="hidden md:inline">{editionLabel()}</span>
        <span className="flex items-center gap-3">
          <span>
            {storyCount} stories
            {latestPublishedAt && (
              <>
                <span className="mx-2 text-ink-mute">·</span>
                Updated {timeAgo(latestPublishedAt)}
              </>
            )}
          </span>
          <span className="text-ink-mute">·</span>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
        </span>
      </div>
    </div>
  );
}
