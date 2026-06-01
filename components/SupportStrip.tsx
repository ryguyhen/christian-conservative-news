import Link from "next/link";

export default function SupportStrip() {
  return (
    <div className="bg-navy text-paper-on-navy border-b border-navy-mid">
      <div className="max-w-content mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[14px]">
        <span className="font-label font-semibold">
          A reader-supported briefing on faith, family &amp; liberty.
        </span>
        <Link
          href="/support"
          className="font-label font-bold inline-flex items-center gap-2 text-gold hover:text-gold-soft"
        >
          Support this work
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
