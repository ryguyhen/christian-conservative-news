import Link from "next/link";

export default function SupportStrip() {
  return (
    <div className="bg-navy text-paper border-b border-navy-mid">
      <div className="max-w-content mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-[12px] font-label tracking-[0.16em] uppercase">
        <span className="text-paper/85">
          A reader-supported briefing on faith, family &amp; liberty.
        </span>
        <Link
          href="/support"
          className="text-gold hover:text-paper font-bold inline-flex items-center gap-2"
        >
          Support this work
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
