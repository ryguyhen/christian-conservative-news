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
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onDoc);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
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
        /* fall through */
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
    } catch {}
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={nativeOrToggle}
        aria-label="Share story"
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1.5 font-label font-bold text-[13px] text-ink-soft hover:text-accent px-1 py-1"
      >
        Share
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 bottom-full mb-2 z-30 w-48 bg-paper border border-ink shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <a role="menuitem" href={x} target="_blank" rel="noopener noreferrer"
             className="block px-3 py-2.5 text-[14px] font-label font-semibold text-ink hover:bg-paper-warm">
            Post to X
          </a>
          <a role="menuitem" href={fb} target="_blank" rel="noopener noreferrer"
             className="block px-3 py-2.5 text-[14px] font-label font-semibold text-ink hover:bg-paper-warm">
            Share on Facebook
          </a>
          <a role="menuitem" href={mail}
             className="block px-3 py-2.5 text-[14px] font-label font-semibold text-ink hover:bg-paper-warm">
            Email link
          </a>
          <button role="menuitem" type="button" onClick={copy}
             className="block w-full text-left px-3 py-2.5 text-[14px] font-label font-semibold text-ink hover:bg-paper-warm">
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
