import Link from "next/link";

export default function MissionCard() {
  return (
    <section className="bg-navy text-paper-on-navy p-6" aria-labelledby="mission-heading">
      <div className="font-label font-bold uppercase tracking-[0.06em] text-[12px] text-gold mb-2">
        The Mission
      </div>
      <h3 id="mission-heading" className="font-display font-bold text-[20px] leading-snug text-paper-on-navy">
        A daily briefing on faith, family &amp; liberty — paid for by readers.
      </h3>
      <p className="mt-3 text-[15px] leading-[1.55] text-paper-on-navy-soft">
        We curate the day&apos;s news on religious liberty, the unborn,
        parental rights, education, and the institutions that hold civic
        life together. No ads. No trackers. No paywall.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <Link href="/support" className="btn-gold">
          Support this work
        </Link>
        <Link
          href="/about"
          className="font-label font-bold text-[14px] text-gold hover:text-gold-soft text-center body-link"
        >
          Read our editorial standards →
        </Link>
      </div>
    </section>
  );
}
