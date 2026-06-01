"use client";

import { useState } from "react";

export default function NewsletterCapture({
  variant = "inline",
}: {
  variant?: "inline" | "sidebar";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setState("err");
        setMsg(json.error || "Something went wrong.");
        return;
      }
      setState("ok");
      setMsg("You're on the list. Watch your inbox tomorrow morning.");
      setEmail("");
    } catch {
      setState("err");
      setMsg("Network error. Please try again.");
    }
  }

  if (variant === "sidebar") {
    return (
      <section className="bg-paper-warm border border-rule-soft p-5">
        <div className="font-label uppercase tracking-[0.22em] text-[10px] text-ink-mute mb-2">
          The Morning Brief
        </div>
        <h3 className="font-display font-bold text-ink text-[18px] leading-snug">
          One short email each morning.
        </h3>
        <p className="mt-2 text-[13px] leading-[1.55] text-ink-soft">
          Free. Unsubscribe anytime. We don&apos;t sell or share addresses.
        </p>
        <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="bg-paper border border-rule px-3 py-2 text-[13px] font-serif text-ink placeholder:text-ink-mute focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="bg-navy text-paper px-3 py-2 font-label uppercase tracking-[0.16em] text-[11px] font-bold hover:bg-ink disabled:opacity-60"
          >
            {state === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {msg && (
          <p
            className={`mt-2 text-[12px] ${
              state === "err" ? "text-accent" : "text-ink-soft"
            }`}
          >
            {msg}
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="mt-14 border-y border-rule">
      <div className="px-6 py-10 max-w-2xl mx-auto text-center">
        <div className="font-label uppercase tracking-[0.24em] text-[11px] font-bold text-ink-soft">
          The Morning Brief
        </div>
        <h3 className="mt-3 font-display font-black text-ink text-[26px] md:text-[30px] leading-[1.2] tracking-tight">
          The day&apos;s briefing, in your inbox at sunrise.
        </h3>
        <p className="mt-3 font-serif text-ink-soft text-[15.5px] leading-[1.6]">
          One short email each weekday. Free. No tracking pixels.
          Unsubscribe with a single click.
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 bg-paper border border-rule px-3 py-3 text-[14px] font-serif text-ink placeholder:text-ink-mute focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="bg-navy text-paper px-5 py-3 font-label uppercase tracking-[0.18em] text-[12px] font-bold hover:bg-ink disabled:opacity-60"
          >
            {state === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {msg && (
          <p
            className={`mt-3 text-[13px] ${
              state === "err" ? "text-accent" : "text-ink-soft"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </section>
  );
}
