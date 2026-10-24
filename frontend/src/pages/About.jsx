import { Link } from "react-router-dom";

const AGENTS = [
  {
    n: "1",
    name: "File Scanner",
    tag: "Files",
    text: "Checks the real file type, computes a hash, runs antivirus and rule-based checks, and produces a risk score and verdict.",
  },
  {
    n: "2",
    name: "Reporter",
    tag: "Files + Websites",
    text: "Turns the findings of either scan into a clear report with a plain-language summary and the technical details behind it.",
  },
  {
    n: "3",
    name: "Sanitizer",
    tag: "Files",
    text: "Removes macros, scripts, and risky links from supported files, then re-scans the cleaned copy to confirm it is safe.",
  },
  {
    n: "4",
    name: "Website Scanner",
    tag: "Websites",
    text: "Checks a link for redirects, certificate problems, domain age, known-bad reputation, and suspicious page content.",
  },
];

const FLOWS = [
  { label: "File scan", steps: ["Agent 1", "Agent 2", "Agent 3"] },
  { label: "Website scan", steps: ["Agent 4", "Agent 2"] },
];

const STACK = ["React", "Tailwind CSS", "Node.js", "Python", "PostgreSQL", "Redis", "ClamAV", "YARA", "Docker"];

export default function About() {
  return (
    <section className="px-6 pt-[150px] pb-24">
      <div className="mx-auto max-w-[860px]">
        <div className="text-center">
          <h1 className="animate-fade-up text-[28px] font-bold tracking-tight" style={{ animationDelay: "100ms" }}>
            About{" "}
            <span className="animate-shimmer inline-block bg-gradient-to-r from-primary via-sky-300 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
              FileWarden
            </span>
          </h1>
          <p
            className="mx-auto mt-5 max-w-[580px] animate-fade-up text-sm leading-relaxed text-slate-300"
            style={{ animationDelay: "250ms" }}
          >
            FileWarden checks files and websites for threats. A scan should not just say "dangerous". It
            should explain why, and where possible give you a safe version back.
          </p>
        </div>

        <h2 className="mt-16 animate-fade-up text-lg font-semibold" style={{ animationDelay: "400ms" }}>
          The four agents
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {AGENTS.map((a, i) => (
            <div
              key={a.n}
              className="group animate-fade-up rounded-xl border border-white/10 bg-surface/80 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              style={{ animationDelay: `${500 + i * 110}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-primary/50 text-sm font-semibold text-primary transition-all group-hover:bg-primary group-hover:text-white">
                  {a.n}
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-400">
                  {a.tag}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{a.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{a.text}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 animate-fade-up text-lg font-semibold" style={{ animationDelay: "1000ms" }}>
          How a scan flows
        </h2>
        <div className="mt-5 space-y-3">
          {FLOWS.map((flow, i) => (
            <div
              key={flow.label}
              className="flex animate-fade-up flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-surface/80 px-5 py-4 backdrop-blur"
              style={{ animationDelay: `${1100 + i * 120}ms` }}
            >
              <span className="w-28 text-sm font-medium text-slate-200">{flow.label}</span>
              {flow.steps.map((s, idx) => (
                <div key={s + idx} className="flex items-center gap-3">
                  {idx > 0 && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  )}
                  <span className="rounded-lg border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-3 animate-fade-up text-xs text-slate-500" style={{ animationDelay: "1350ms" }}>
          Agent 3 runs only when a file is suspicious and its type can be cleaned.
        </p>

        <h2 className="mt-14 animate-fade-up text-lg font-semibold" style={{ animationDelay: "1450ms" }}>
          Built with
        </h2>
        <div className="mt-5 flex animate-fade-up flex-wrap gap-2.5" style={{ animationDelay: "1550ms" }}>
          {STACK.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-surface/80 px-4 py-1.5 text-xs text-slate-300 transition-colors hover:border-primary/60 hover:text-primary"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/"
            className="inline-block rounded-lg bg-primary px-7 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]"
          >
            Try it now
          </Link>
        </div>
      </div>
    </section>
  );
}