import { Link } from "react-router-dom";

const AGENTS = [
  {
    n: "1",
    name: "Scanner",
    text: "Checks the real file type, computes a hash, runs antivirus and rule-based checks, and produces a risk score and verdict.",
  },
  {
    n: "2",
    name: "Reporter",
    text: "Turns the raw findings into a clear report with a plain-language summary and the technical details behind it.",
  },
  {
    n: "3",
    name: "Sanitizer",
    text: "Removes macros, scripts, and risky links, then re-scans the cleaned file to confirm it is safe.",
  },
];

const STACK = ["React", "Tailwind CSS", "Node.js", "Python", "PostgreSQL", "Redis", "ClamAV", "YARA", "Docker"];

export default function About() {
  return (
    <section className="px-6 pt-[150px] pb-24">
      <div className="mx-auto max-w-[760px]">
        <div className="text-center">
          <h1 className="animate-fade-up text-[28px] font-bold tracking-tight" style={{ animationDelay: "100ms" }}>
            About{" "}
            <span className="animate-shimmer inline-block bg-gradient-to-r from-primary via-sky-300 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
              FileWarden
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] animate-fade-up text-sm leading-relaxed text-slate-300" style={{ animationDelay: "250ms" }}>
            FileWarden is a file security scanner built around a simple idea: a scan should not just say
            "dangerous", it should explain why and give you a safe file back.
          </p>
        </div>

        <h2 className="mt-16 animate-fade-up text-lg font-semibold" style={{ animationDelay: "400ms" }}>
          How it works
        </h2>
        <div className="mt-6 space-y-4">
          {AGENTS.map((a, i) => (
            <div
              key={a.n}
              className="group flex animate-fade-up items-start gap-5 rounded-xl border border-white/10 bg-surface/80 p-5 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              style={{ animationDelay: `${500 + i * 120}ms` }}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/50 text-sm font-semibold text-primary transition-all group-hover:bg-primary group-hover:text-white">
                {a.n}
              </div>
              <div>
                <h3 className="text-base font-semibold">Agent {a.n}: {a.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{a.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-14 animate-fade-up text-lg font-semibold" style={{ animationDelay: "900ms" }}>
          Built with
        </h2>
        <div className="mt-5 flex animate-fade-up flex-wrap gap-2.5" style={{ animationDelay: "1000ms" }}>
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