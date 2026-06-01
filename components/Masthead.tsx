export default function Masthead() {
  return (
    <header className="bg-paper border-b border-rule">
      <div className="max-w-content mx-auto px-6 pt-10 pb-7 text-center">
        <div className="rule-h-soft pt-3" />
        <h1 className="font-display font-black tracking-tight leading-none text-ink text-[44px] sm:text-[64px] md:text-[84px]">
          Good Godly News
        </h1>
        <p className="mt-4 font-label uppercase tracking-[0.32em] text-[11px] md:text-[12px] text-ink-soft">
          A Daily Aggregator of Christian &amp; Conservative Reporting
        </p>
        <div className="mt-7 max-w-2xl mx-auto rule-double" />
      </div>
    </header>
  );
}
