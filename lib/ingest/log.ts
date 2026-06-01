/** Tiny structured logger so the pipeline output is greppable. */

type Level = "info" | "warn" | "error" | "debug";

const isDebug = process.env.INGEST_DEBUG === "1";

function fmt(level: Level, scope: string, msg: string, extra?: Record<string, unknown>) {
  const ts = new Date().toISOString();
  const tail = extra ? " " + JSON.stringify(extra) : "";
  return `[${ts}] ${level.toUpperCase().padEnd(5)} ${scope.padEnd(14)} ${msg}${tail}`;
}

export const log = {
  info(scope: string, msg: string, extra?: Record<string, unknown>) {
    console.log(fmt("info", scope, msg, extra));
  },
  warn(scope: string, msg: string, extra?: Record<string, unknown>) {
    console.warn(fmt("warn", scope, msg, extra));
  },
  error(scope: string, msg: string, extra?: Record<string, unknown>) {
    console.error(fmt("error", scope, msg, extra));
  },
  debug(scope: string, msg: string, extra?: Record<string, unknown>) {
    if (isDebug) console.log(fmt("debug", scope, msg, extra));
  },
};
