"use client";

import { useId, useState } from "react";

export default function NewsletterCapture({
  variant = "inline",
}: {
  variant?: "inline" | "sidebar";
}) {
  const id = useId();
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

  const inputId = `${id}-email`;
  const msgId = `${id}-msg`;

  if (variant === "sidebar") {
    return (
      <section className="bg-paper-warm border border-rule p-5" aria-labelledby={`${id}-h`}>
        <div className="font-label font-bold uppercase tracking-[0.06em] text-[12px] text-ink-soft mb-2">
          The Morning Brief
        </div>
        <h3 id={`${id}-h`} className="font-display font-bold text-ink text-[19px] leading-snug">
          One short email each morning.
        </h3>
        <p className="mt-2 text-[15px] leading-[1.55] text-ink-soft">
          Free. Unsubscribe anytime. We don&apos;t sell or share addresses.
        </p>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2">
          <label htmlFor={inputId} className="sr-only">Email address</label>
          <input
            id={inputId}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-describedby={msg ? msgId : undefined}
            className="bg-paper border border-rule px-3 py-2 text-[16px] font-serif text-ink"
          />
          <button type="submit" disabled={state === "loading"} className="btn-primary disabled:opacity-60">
            {state === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {msg && (
          <p
            id={msgId}
            role={state === "err" ? "alert" : "status"}
            className={`mt-3 text-[14px] font-semibold ${
              state === "err" ? "text-accent" : "text-ink"
            }`}
          >
            {msg}
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="mt-14 border-y border-rule" aria-labelledby={`${id}-h`}>
      <div className="px-6 py-10 max-w-2xl mx-auto text-center">
        <div className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-ink-soft">
          The Morning Brief
        </div>
        <h3 id={`${id}-h`} className="mt-3 font-display font-black text-ink text-[28px] md:text-[32px] leading-[1.2] tracking-tight">
          The day&apos;s briefing, in your inbox at sunrise.
        </h3>
        <p className="mt-3 font-serif text-ink text-[17px] leading-[1.6]">
          One short email each weekday. Free. No tracking pixels.
          Unsubscribe with a single click.
        </p>
        <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <label htmlFor={inputId} className="sr-only">Email address</label>
          <input
            id={inputId}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-describedby={msg ? msgId : undefined}
            className="flex-1 bg-paper border border-rule px-3 py-3 text-[16px] font-serif text-ink"
          />
          <button type="submit" disabled={state === "loading"} className="btn-primary disabled:opacity-60">
            {state === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {msg && (
          <p
            id={msgId}
            role={state === "err" ? "alert" : "status"}
            className={`mt-4 text-[15px] font-semibold ${
              state === "err" ? "text-accent" : "text-ink"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </section>
  );
}
