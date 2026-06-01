import Link from "next/link";

export default function InlineSupport() {
  return (
    <section className="my-14 border-y border-rule bg-paper-warm/40" aria-labelledby="support-heading">
      <div className="px-6 md:px-10 py-10 max-w-3xl mx-auto text-center">
        <div className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-accent">
          A note on how this briefing is funded
        </div>
        <h3 id="support-heading" className="mt-4 font-display font-black text-ink text-[30px] md:text-[36px] leading-[1.15] tracking-tight">
          This briefing is free for every reader.
          <br className="hidden md:block" />
          It is paid for by readers, not advertisers.
        </h3>
        <div className="mt-6 font-serif text-ink text-[18px] leading-[1.6] space-y-3">
          <p>
            Good Godly News carries no display ads, runs no trackers, and
            puts nothing behind a paywall. We curate the day&apos;s news on
            faith, family, religious liberty, life, parental rights, and
            education — from more than fifty publications we trust — so you
            can spend ten minutes a day on what matters and zero minutes
            drowning in outrage.
          </p>
          <p className="font-semibold">
            If this work is useful to you, the only thing that keeps it
            going is reader support.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/support" className="btn-primary">
            Become a Supporter
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/support#one-time"
            className="font-label font-bold text-[15px] text-accent body-link"
          >
            Give one time
          </Link>
        </div>
      </div>
    </section>
  );
}
