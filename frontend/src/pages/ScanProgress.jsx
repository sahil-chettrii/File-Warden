import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AgentCard from "../components/AgentCard";
import useScanProgress from "../hooks/useScanProgress";
import { getScan } from "../mock/scanStore";
import { AGENTS, getSkipReason } from "../utils/agents";
import { formatSize, formatTime } from "../utils/format";
import { VERDICTS } from "../utils/verdict";

function Connector({ active }) {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <span
        className={`block h-6 w-px transition-all duration-500 lg:h-px lg:w-10 ${
          active ? "bg-primary shadow-[0_0_10px_#3b82f6]" : "bg-white/15"
        }`}
      />
    </div>
  );
}

function ScanView({ scan }) {
  const navigate = useNavigate();
  const { agents, plan, complete, elapsed, overall } = useScanProgress(scan);
  const v = VERDICTS[scan.verdict];
  const isUrl = scan.type === "url";
  const runningId = plan.find((id) => agents[id].state === "running");

  return (
    <section className="px-6 pt-[130px] pb-24">
      <div className="mx-auto max-w-[1000px]">
        <p className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-2.5 text-xs text-amber-200">
          Demo mode: this scan is simulated. Nothing is uploaded and the result is not real.
        </p>

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-widest text-primary">
              {isUrl ? "WEBSITE SCAN" : "FILE SCAN"}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">
              {complete ? "Scan complete" : isUrl ? "Scanning website..." : "Scanning file..."}
            </h1>
            <p className="mt-1.5 truncate text-sm text-slate-400" title={scan.name}>
              {scan.name}
              {!isUrl && <span className="text-slate-500"> · {formatSize(scan.size)}</span>}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs text-slate-500">Elapsed</p>
            <p className="mt-1 font-mono text-lg tabular-nums">{formatTime(elapsed)}</p>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs text-slate-400">
            <span>Overall progress</span>
            <span>{complete ? 100 : overall}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-[width] duration-500 ease-out ${
                complete ? "bg-emerald-500" : "bg-primary shadow-[0_0_14px_#3b82f6]"
              }`}
              style={{ width: `${complete ? 100 : overall}%` }}
            />
          </div>
        </div>

        {/* Screen-reader status */}
        <p className="sr-only" aria-live="polite">
          {complete ? "Scan complete" : runningId ? `${AGENTS[runningId].name} is running` : "Starting scan"}
        </p>

        {/* Agent cards */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-stretch">
          {plan.map((id, i) => (
            <div key={id} className="contents">
              {i > 0 && (
                <Connector
                  active={agents[plan[i - 1]].state === "done" && agents[id].state !== "skipped"}
                />
              )}
              <AgentCard
                id={id}
                state={agents[id].state}
                progress={agents[id].progress}
                skipReason={id === 3 ? getSkipReason(scan) : undefined}
              />
            </div>
          ))}
        </div>

        {/* Done panel or cancel */}
        {complete ? (
          <div
            className={`mt-8 flex animate-fade-up flex-col items-start justify-between gap-5 rounded-xl border p-6 sm:flex-row sm:items-center ${v.border} ${v.bg} ${v.glow}`}
          >
            <div>
              <p className="text-xs text-slate-400">Verdict</p>
              <p className={`mt-1 text-2xl font-bold ${v.text}`}>{v.label}</p>
              <p className="mt-1 text-sm text-slate-300">Risk score {scan.score} / 100</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/"
                className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Scan another
              </Link>
              <Link
                to={`/result/${scan.id}`}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]"
              >
                View result
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-red-500/50 hover:text-red-300"
            >
              Cancel scan
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ScanProgress() {
  const { id } = useParams();
  const scan = useMemo(() => getScan(id), [id]);

  if (!scan) {
    return (
      <section className="flex flex-col items-center px-6 pt-[200px] text-center">
        <h1 className="text-xl font-semibold">Scan not found</h1>
        <p className="mt-2 text-sm text-slate-400">This scan does not exist or the session has ended.</p>
        <Link
          to="/"
          className="mt-8 rounded-lg bg-primary px-7 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Start a new scan
        </Link>
      </section>
    );
  }

  return <ScanView key={scan.id} scan={scan} />;
}