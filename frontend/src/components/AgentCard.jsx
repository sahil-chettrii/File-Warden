import { AGENTS } from "../utils/agents";

const STATE_STYLES = {
  waiting: { label: "Waiting", badge: "border-white/10 text-slate-400", card: "border-white/10" },
  running: {
    label: "Running",
    badge: "border-primary/50 bg-primary/10 text-primary",
    card: "border-primary/60 shadow-[0_0_40px_rgba(59,130,246,0.22)]",
  },
  done: {
    label: "Done",
    badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    card: "border-emerald-500/30",
  },
  skipped: { label: "Skipped", badge: "border-white/10 text-slate-400", card: "border-white/10 opacity-70" },
};

function StepIcon({ status }) {
  if (status === "done") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-emerald-400">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    );
  }
  if (status === "current") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="shrink-0 animate-spin text-primary">
        <path d="M12 3a9 9 0 019 9" />
      </svg>
    );
  }
  return <span className="ml-[3px] h-2.5 w-2.5 shrink-0 rounded-full border border-white/20" />;
}

export default function AgentCard({ id, state, progress, skipReason }) {
  const agent = AGENTS[id];
  const style = STATE_STYLES[state];
  const total = agent.steps.length;
  const current =
    state === "done" ? total : state === "running" ? Math.min(total - 1, Math.floor((progress / 100) * total)) : -1;
  const pct = state === "done" ? 100 : progress;

  const iconStyle =
    state === "running"
      ? "border-primary/60 text-primary"
      : state === "done"
      ? "border-emerald-500/40 text-emerald-400"
      : "border-white/10 text-slate-500";

  return (
    <div
      className={`flex-1 rounded-xl border bg-surface/80 p-5 backdrop-blur transition-all duration-500 ${style.card}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`grid h-11 w-11 place-items-center rounded-lg border bg-bg transition-colors duration-500 ${iconStyle}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d={agent.icon} />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-widest text-slate-500">AGENT {id}</p>
            <h3 className="text-base font-semibold">{agent.name}</h3>
          </div>
        </div>

        <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.badge}`}>
          {state === "running" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />}
          {style.label}
        </span>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">{agent.blurb}</p>

      {state === "skipped" ? (
        <p className="mt-5 rounded-lg border border-white/10 bg-bg/60 px-3 py-3 text-xs leading-relaxed text-slate-400">
          {skipReason}
        </p>
      ) : (
        <>
          <div className="mt-5">
            <div className="mb-1.5 flex justify-between text-[11px] text-slate-500">
              <span>Progress</span>
              <span>{pct}%</span>
            </div>
            <div
              role="progressbar"
              aria-label={`${agent.name} progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              className="h-1.5 overflow-hidden rounded-full bg-white/10"
            >
              <div
                className={`h-full rounded-full transition-[width] duration-300 ease-out ${
                  state === "done"
                    ? "bg-emerald-500"
                    : "animate-shimmer bg-gradient-to-r from-primary via-sky-300 to-primary bg-[length:200%_auto]"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {agent.steps.map((label, i) => {
              const status = i < current ? "done" : i === current ? "current" : "pending";
              return (
                <li
                  key={label}
                  className={`flex items-center gap-2.5 text-xs transition-colors duration-300 ${
                    status === "pending" ? "text-slate-600" : status === "current" ? "text-white" : "text-slate-300"
                  }`}
                >
                  <StepIcon status={status} />
                  {label}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}