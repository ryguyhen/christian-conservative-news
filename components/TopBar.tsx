import { editionLabel, fullDate, timeAgo } from "@/lib/time";

export default function TopBar({
  storyCount,
  latestPublishedAt,
}: {
  storyCount: number;
  latestPublishedAt?: string;
}) {
  const date = fullDate();
  const edition = editionLabel();
  return (
    <div className="bg-paper border-b border-rule-soft">
      <div className="max-w-content mx-auto px-6 py-2 flex flex-wrap items-center justify-between font-label uppercase tracking-[0.14em] text-[11px] text-ink-soft gap-2">
        <span>{date}</span>
        <span className="hidden sm:inline">{edition}</span>
        <span>
          {storyCount} stories
          {latestPublishedAt && (
            <>
              <span className="mx-2 text-ink-mute">·</span>
              Updated {timeAgo(latestPublishedAt)}
            </>
          )}
        </span>
      </div>
    </div>
  );
}
