"use client";

import { useEffect, useRef, useState } from "react";

export default function ShareMenu({ url, title }: { url: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const enc = encodeURIComponent;
  const x = `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
  const mail = `mailto:?subject=${enc(title)}&body=${enc(url)}`;

  async function nativeOrToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, url });
        return;
      } catch {
        /* fall through to menu */
      }
    }
    setOpen((v) => !v);
  }

  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={nativeOrToggle}
        aria-label="Share story"
        className="inline-flex items-center gap-1 font-label uppercase tracking-[0.15em] text-[11px] font-semibold text-ink-soft hover:text-accent"
      >
        Share
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute right-0 bottom-full mb-2 z-30 w-44 bg-white border border-rule-soft shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={x}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-sm hover:bg-paper-warm font-label uppercase tracking-wider text-[12px]"
          >
            Post to X
          </a>
          <a
            href={fb}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-sm hover:bg-paper-warm font-label uppercase tracking-wider text-[12px]"
          >
            Share on Facebook
          </a>
          <a
            href={mail}
            className="block px-3 py-2 text-sm hover:bg-paper-warm font-label uppercase tracking-wider text-[12px]"
          >
            Email link
          </a>
          <button
            type="button"
            onClick={copy}
            className="block w-full text-left px-3 py-2 text-sm hover:bg-paper-warm font-label uppercase tracking-wider text-[12px]"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
