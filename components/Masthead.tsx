export default function Masthead() {
  return (
    <header className="bg-paper border-b border-rule">
      <div className="max-w-content mx-auto px-6 pt-10 pb-8 text-center">
        <div className="rule-h-soft pt-3" />
        <h1 className="font-display font-black tracking-tight leading-none text-ink text-[44px] sm:text-[64px] md:text-[84px]">
          Good Godly News
        </h1>
        <p className="mt-5 font-display italic text-ink-soft text-[18px] md:text-[22px]">
          The daily briefing for faith, family &amp; liberty.
        </p>
        <p className="mt-4 font-label uppercase tracking-[0.28em] text-[10.5px] md:text-[11px] text-ink-mute">
          Reader-supported <span className="text-rule mx-2">·</span>
          No ads <span className="text-rule mx-2">·</span>
          No trackers <span className="text-rule mx-2">·</span>
          No paywall
        </p>
        <div className="mt-7 max-w-2xl mx-auto rule-double" />
      </div>
    </header>
  );
}
