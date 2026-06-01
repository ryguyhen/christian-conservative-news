import Link from "next/link";

export default function MissionCard() {
  return (
    <section className="bg-navy text-paper p-5">
      <div className="font-label uppercase tracking-[0.22em] text-[10px] text-gold mb-2">
        The Mission
      </div>
      <h3 className="font-display font-bold text-[19px] leading-snug">
        A daily briefing on faith, family &amp; liberty — paid for by readers.
      </h3>
      <p className="mt-3 text-[13px] leading-relaxed text-paper/80">
        We curate the day&apos;s news on religious liberty, the unborn,
        parental rights, education, and the institutions that hold civic
        life together. No ads. No trackers. No paywall.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <Link
          href="/support"
          className="inline-flex items-center justify-center bg-gold text-navy px-3 py-2 font-label uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-paper"
        >
          Support this work
        </Link>
        <Link
          href="/about"
          className="font-label uppercase tracking-[0.18em] text-[11px] font-bold text-gold hover:text-paper text-center"
        >
          Read our editorial standards →
        </Link>
      </div>
    </section>
  );
}
