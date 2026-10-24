import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "Multi-engine detection",
    text: "Files are checked with antivirus signatures and custom rules, plus a real file-type check that catches a .exe pretending to be a .pdf.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />,
  },
  {
    title: "Clear reports",
    text: "Every scan ends with a risk score, a verdict, and a plain-language explanation of what was found and why it matters.",
    icon: <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6" />,
  },
  {
    title: "Safe copy",
    text: "Risky parts like macros, scripts, and links are removed, so you can still use the file instead of just losing it.",
    icon: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />,
  },
  {
    title: "Privacy focused",
    text: "Files are analysed in an isolated environment and are never opened or run on the main server.",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </>
    ),
  },
  {
    title: "Live progress",
    text: "Watch each of the three agents work in real time while your file is being scanned.",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    title: "Scan history",
    text: "Find earlier results by file name or verdict, and re-open any report whenever you need it.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section className="px-6 pt-[150px] pb-24">
      <div className="mx-auto max-w-[1000px]">
        <div className="mx-auto max-w-[600px] text-center">
          <h1 className="animate-fade-up text-[28px] font-bold tracking-tight" style={{ animationDelay: "100ms" }}>
            Everything you need to{" "}
            <span className="animate-shimmer inline-block bg-gradient-to-r from-primary via-sky-300 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
              trust a file.
            </span>
          </h1>
          <p className="mt-4 animate-fade-up text-sm text-slate-300" style={{ animationDelay: "250ms" }}>
            Three agents work together: one scans, one explains, one cleans.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group animate-fade-up rounded-xl border border-white/10 bg-surface/80 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]"
              style={{ animationDelay: `${400 + i * 90}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-bg text-primary transition-colors group-hover:border-primary/50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/"
            className="inline-block rounded-lg bg-primary px-7 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]"
          >
            Scan a file
          </Link>
        </div>
      </div>
    </section>
  );
}