import Link from "next/link";

export default function InlineSupport() {
  return (
    <section className="my-14 border-y border-rule bg-paper-warm/40">
      <div className="px-6 md:px-10 py-10 max-w-3xl mx-auto text-center">
        <div className="font-label uppercase tracking-[0.24em] text-[11px] font-bold text-accent">
          A note on how this briefing is funded
        </div>
        <h3 className="mt-4 font-display font-black text-ink text-[28px] md:text-[34px] leading-[1.15] tracking-tight">
          This briefing is free for every reader.
          <br className="hidden md:block" />
          It is paid for by readers, not advertisers.
        </h3>
        <div className="mt-6 font-serif text-ink-soft text-[17px] leading-[1.6] space-y-3">
          <p>
            Good Godly News carries no display ads, runs no trackers, and
            puts nothing behind a paywall. We curate the day&apos;s news on
            faith, family, religious liberty, life, parental rights, and
            education — from more than fifty publications we trust — so you
            can spend ten minutes a day on what matters and zero minutes
            drowning in outrage.
          </p>
          <p>
            If this work is useful to you, the only thing that keeps it
            going is reader support.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 bg-navy text-paper px-6 py-3 font-label uppercase tracking-[0.18em] text-[12px] font-bold hover:bg-ink"
          >
            Become a Supporter
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/support#one-time"
            className="font-label uppercase tracking-[0.18em] text-[12px] font-bold text-accent hover:underline"
          >
            Give one time
          </Link>
        </div>
      </div>
    </section>
  );
}
