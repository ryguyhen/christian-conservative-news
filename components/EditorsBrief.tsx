import { DAILY_BRIEF } from "@/lib/dailyBrief";

export default function EditorsBrief() {
  return (
    <section className="mb-10 pb-8 border-b border-rule" aria-labelledby="editors-brief-heading">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
        <h2 id="editors-brief-heading" className="kicker">
          Editor&apos;s Brief
        </h2>
        <span className="font-label font-semibold text-[13px] text-ink-soft">
          {DAILY_BRIEF.date}
        </span>
      </div>
      <div className="font-serif text-ink leading-[1.55] text-[20px] md:text-[22px] font-normal space-y-3">
        {DAILY_BRIEF.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-4 font-label font-bold text-[13px] text-ink-soft uppercase tracking-[0.06em]">
        — {DAILY_BRIEF.editor}
      </div>
    </section>
  );
}
