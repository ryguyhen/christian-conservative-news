export default function Masthead() {
  return (
    <header className="bg-paper border-b border-rule">
      <div className="max-w-content mx-auto px-6 pt-10 pb-8 text-center">
        <div className="rule-h-soft pt-3" />
        <h1 className="font-display font-black tracking-tight leading-[1.02] text-ink text-[46px] sm:text-[68px] md:text-[88px]">
          Good Godly News
        </h1>
        <p className="mt-5 font-serif font-semibold text-ink-soft text-[18px] md:text-[22px] italic">
          The daily briefing for faith, family &amp; liberty.
        </p>
        <p className="mt-4 font-label font-bold text-ink-soft text-[13px] md:text-[14px] tracking-[0.04em]">
          Reader-supported{" "}
          <span aria-hidden className="text-rule mx-2">·</span>
          No ads{" "}
          <span aria-hidden className="text-rule mx-2">·</span>
          No trackers{" "}
          <span aria-hidden className="text-rule mx-2">·</span>
          No paywall
        </p>
        <div className="mt-7 max-w-2xl mx-auto rule-double" />
      </div>
    </header>
  );
}
