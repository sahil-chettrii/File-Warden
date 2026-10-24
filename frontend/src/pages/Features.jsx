import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "File scanning",
    text: "Checks the real file type, hash, antivirus signatures, and custom rules. It catches a .exe pretending to be a .pdf.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />,
  },
  {
    title: "Website scanning",
    text: "Checks a link before you open it: redirects, certificate, domain age, reputation lists, and suspicious page content like fake login forms.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
      </>
    ),
  },
  {
    title: "Clear reports",
    text: "Every file and website scan ends with a risk score, a verdict, and a plain-language explanation of what was found and why it matters.",
    icon: <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6" />,
  },
  {
    title: "Safe copy of files",
    text: "Risky parts like macros, scripts, and links are removed from supported file types, so you can still use the file instead of losing it.",
    icon: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />,
  },
  {
    title: "Isolated analysis",
    text: "Files are analysed in a container with no network access and are never opened or run on the main server. Websites are fetched from a separate, restricted environment.",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </>
    ),
  },
  {
    title: "Live progress and history",
    text: "Watch each agent work in real time, then find earlier results by name, link, or verdict and re-open any report.",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
];

export default function Features() {
  return (
    <section className="px-6 pt-[150px] pb-24">
      <div className="mx-auto max-w-[1000px]">
        <div className="mx-auto max-w-[620px] text-center">
          <h1 className="animate-fade-up text-[28px] font-bold tracking-tight" style={{ animationDelay: "100ms" }}>
            Everything you need to{" "}
            <span className="animate-shimmer inline-block bg-gradient-to-r from-primary via-sky-300 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
              trust a file or link.
            </span>
          </h1>
          <p className="mt-4 animate-fade-up text-sm text-slate-300" style={{ animationDelay: "250ms" }}>
            Four agents work together: two scan, one explains, one cleans.
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

        <p
          className="mx-auto mt-10 max-w-[560px] animate-fade-up text-center text-xs leading-relaxed text-slate-500"
          style={{ animationDelay: "1000ms" }}
        >
          No scanner catches everything. A clean result means nothing suspicious was found, not that a file
          or website is guaranteed safe.
        </p>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block rounded-lg bg-primary px-7 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]"
          >
            Start a scan
          </Link>
        </div>
      </div>
    </section>
  );
}