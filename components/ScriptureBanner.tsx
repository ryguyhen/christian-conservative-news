const VERSES = [
  { text: "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.", ref: "Philippians 4:8" },
  { text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5" },
  { text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.", ref: "Joshua 1:9" },
];

export default function ScriptureBanner() {
  const v = VERSES[new Date().getDate() % VERSES.length];
  return (
    <section className="bg-navy text-cream py-14 mt-16 border-y border-navy-light">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="text-gold mb-6 text-lg">✦ ✦ ✦</div>
        <blockquote className="font-display italic font-bold text-[22px] md:text-[28px] leading-snug text-cream">
          “{v.text}”
        </blockquote>
        <div className="mt-6 font-label uppercase tracking-[0.3em] text-gold text-sm">
          {v.ref}
        </div>
      </div>
    </section>
  );
}
