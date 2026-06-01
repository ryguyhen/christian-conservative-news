import Link from "next/link";
import { SOURCE_NAMES } from "@/lib/sources";
import { shortSource } from "@/lib/sourceMeta";

export default function Footer() {
  return (
    <footer className="bg-navy text-paper/85 mt-16">
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="font-display font-black text-[28px] text-paper leading-none">
              Good Godly News
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-paper/75 max-w-md">
              A daily, reader-supported briefing on faith, family, and
              liberty. We do not host original content — every headline
              links to the publisher. Summaries are AI-assisted and reviewed
              for tone. We accept no advertising and run no tracking.
              Reader support is the only thing that makes this possible.
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] font-label text-gold">
              No ads · No trackers · No paywall
            </p>
          </div>

          <div>
            <h4 className="font-label uppercase tracking-[0.22em] text-gold text-[11px] mb-3">
              Sections
            </h4>
            <ul className="space-y-1.5 text-[14px]">
              <li>Politics</li>
              <li>Faith</li>
              <li>Culture</li>
              <li>World</li>
              <li>Opinion</li>
            </ul>
          </div>

          <div>
            <h4 className="font-label uppercase tracking-[0.22em] text-gold text-[11px] mb-3">
              About
            </h4>
            <ul className="space-y-1.5 text-[14px]">
              <li><Link href="/about" className="hover:text-paper">Editorial standards</Link></li>
              <li><Link href="/about#aggregation" className="hover:text-paper">How aggregation works</Link></li>
              <li><Link href="/about#contact" className="hover:text-paper">Contact</Link></li>
              <li>Privacy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-label uppercase tracking-[0.22em] text-gold text-[11px] mb-3">
              Support
            </h4>
            <ul className="space-y-1.5 text-[14px]">
              <li><Link href="/support" className="text-gold hover:text-paper font-semibold">Become a Supporter</Link></li>
              <li><Link href="/support#tiers" className="hover:text-paper">Membership tiers</Link></li>
              <li><Link href="/support#one-time" className="hover:text-paper">Give one time</Link></li>
              <li><Link href="/support#transparency" className="hover:text-paper">Where the money goes</Link></li>
            </ul>
          </div>
        </div>

        <div id="footer-sources" className="mt-12 pt-8 border-t border-navy-mid">
          <h4 className="font-label uppercase tracking-[0.22em] text-gold text-[11px] mb-4">
            Curated From · {SOURCE_NAMES.length} Publishers
          </h4>
          <p className="text-[12px] leading-[1.7] text-paper/70">
            {SOURCE_NAMES.map((s, i) => (
              <span key={s}>
                {shortSource(s)}
                {i < SOURCE_NAMES.length - 1 && (
                  <span className="text-paper/30 mx-2">·</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="border-t border-navy-mid">
        <div className="max-w-content mx-auto px-6 py-5 text-[11px] font-label uppercase tracking-[0.18em] text-paper/60 flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Good Godly News</span>
          <span>Reader-supported · No original reporting · Aggregator</span>
        </div>
      </div>
    </footer>
  );
}
