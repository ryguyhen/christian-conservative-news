export default function Masthead() {
  return (
    <header className="bg-navy text-cream">
      <div className="max-w-content mx-auto px-6 pt-10 pb-6 text-center">
        <div className="flex items-center justify-center gap-4 text-gold mb-6">
          <span className="h-px flex-1 bg-gold/60 max-w-[160px]" />
          <span className="text-lg">✦ ✦ ✦</span>
          <span className="h-px flex-1 bg-gold/60 max-w-[160px]" />
        </div>

        <h1 className="font-display font-black leading-none text-[56px] md:text-[88px]">
          <span className="text-cream">Good Godly</span>{" "}
          <span className="italic font-bold text-gold">News</span>
        </h1>

        <p className="mt-5 font-label uppercase tracking-[0.3em] text-[12px] md:text-[13px] text-gold-light">
          Cut the noise, feed the spirit — positive, encouraging Christian news
        </p>

        <div className="mt-8 flex items-center justify-center gap-6 text-gold">
          <span className="h-px flex-1 bg-gold/60" />
          <span className="font-label uppercase tracking-[0.35em] text-[12px] text-gold-light">
            Morning Edition
          </span>
          <span className="h-px flex-1 bg-gold/60" />
        </div>
      </div>
    </header>
  );
}
