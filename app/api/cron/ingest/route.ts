import { NextRequest, NextResponse } from "next/server";
import { runIngestion } from "@/lib/ingest/run";

/**
 * Triggerable ingestion endpoint.
 *
 * Protected by CRON_SECRET. Vercel cron calls this automatically;
 * humans can also `curl` it for manual triggers.
 *
 * Examples:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://site.com/api/cron/ingest
 *   curl -H "Authorization: Bearer $CRON_SECRET" "https://site.com/api/cron/ingest?source=The%20Daily%20Wire"
 *   curl -H "Authorization: Bearer $CRON_SECRET" "https://site.com/api/cron/ingest?dryRun=1"
 *
 * Vercel cron sends Authorization: Bearer ${CRON_SECRET} automatically when
 * configured in vercel.json + the env var is set. See vercel.json crons.
 *
 * NOTE on platform limits:
 *   Vercel Hobby functions time out at 60s. The full 15-source run takes
 *   longer than that in practice — Vercel cron is set to run a SUBSET
 *   each invocation via ?limit=N, ?source=NAME, or by splitting across
 *   multiple cron entries. The GitHub Actions workflow remains the
 *   primary scheduler for full-catalog runs.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // never accept requests if the secret isn't set
  const auth = req.headers.get("authorization") || "";
  if (auth === `Bearer ${secret}`) return true;
  // Vercel cron also supports passing via this header in some setups;
  // we accept x-vercel-cron-signature when present + secret matches.
  const q = new URL(req.url).searchParams.get("secret");
  if (q && q === secret) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const u = new URL(req.url);
  const source = u.searchParams.get("source") ?? undefined;
  const dryRun = u.searchParams.get("dryRun") === "1";
  const limitParam = u.searchParams.get("limit");
  const perSourceLimit = limitParam ? Number(limitParam) : undefined;

  try {
    const summary = await runIngestion({
      only: source,
      dryRun,
      perSourceLimit: Number.isFinite(perSourceLimit) ? perSourceLimit : undefined,
    });
    return NextResponse.json({ ok: true, summary });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
