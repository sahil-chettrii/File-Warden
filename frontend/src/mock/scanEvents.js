// MOCK ONLY. Replaced by an EventSource on GET /api/scans/:id/events.
// Event shape matches the backend contract:
//   { agent: 1|2|3|4, state: "running"|"done"|"skipped", progress: 0-100 }
// plus a final { type: "complete" }.

export function subscribeToScan(scan, onEvent) {
  let cancelled = false;
  const timers = new Set();

  const wait = (ms) =>
    new Promise((resolve) => {
      const t = setTimeout(() => {
        timers.delete(t);
        resolve();
      }, ms);
      timers.add(t);
    });

  const runAgent = async (agent, duration) => {
    const ticks = 18;
    onEvent({ agent, state: "running", progress: 0 });
    for (let i = 1; i <= ticks; i++) {
      await wait((duration / ticks) * (0.4 + Math.random() * 1.2)); // uneven, like real work
      if (cancelled) return;
      onEvent({ agent, state: "running", progress: Math.round((i / ticks) * 100) });
    }
    onEvent({ agent, state: "done", progress: 100 });
  };

  const runsSanitizer = scan.type === "file" && scan.verdict === "suspicious" && scan.sanitizable;

  (async () => {
    await wait(500);
    if (cancelled) return;

    if (scan.type === "url") {
      await runAgent(4, 4500);
      if (cancelled) return;
    } else {
      await runAgent(1, 4200);
      if (cancelled) return;
      if (!runsSanitizer) onEvent({ agent: 3, state: "skipped", progress: 0 });
    }

    await runAgent(2, 2400);
    if (cancelled) return;

    if (runsSanitizer) {
      await runAgent(3, 3200);
      if (cancelled) return;
    }

    onEvent({ type: "complete" });
  })();

  // Unsubscribe: stops everything (used when the user leaves the page)
  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
    timers.clear();
  };
}