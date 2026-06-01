import { DAILY_BRIEF } from "@/lib/dailyBrief";

export default function EditorsBrief() {
  return (
    <section className="mb-10 pb-8 border-b border-rule">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-label uppercase tracking-[0.22em] text-[11px] font-bold text-accent">
          Editor&apos;s Brief
        </span>
        <span className="font-label uppercase tracking-[0.16em] text-[10.5px] text-ink-mute">
          {DAILY_BRIEF.date}
        </span>
      </div>
      <div className="font-display text-ink leading-[1.5] text-[20px] md:text-[22px] space-y-3">
        {DAILY_BRIEF.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-4 font-label uppercase tracking-[0.2em] text-[11px] text-ink-soft">
        — {DAILY_BRIEF.editor}
      </div>
    </section>
  );
}
