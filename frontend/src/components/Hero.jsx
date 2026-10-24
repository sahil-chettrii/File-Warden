import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createScan } from "../mock/scanStore";

const MAX_MB = 50; // UI-only limit. The Node API must enforce the real one.

const TABS = [
  {
    id: "file",
    label: "File Scan",
    icon: <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5" />,
  },
  {
    id: "site",
    label: "Website Scan",
    icon: <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />,
  },
];

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function Icon({ children, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function FilePanel() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dragDepth = useRef(0);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const pickFile = (f) => {
    if (!f) return;
    if (f.size > MAX_MB * 1024 * 1024) {
      setFile(null);
      setError(`File is too large. Max size is ${MAX_MB} MB.`);
      return;
    }
    setError("");
    setFile(f);
  };

  const reset = () => {
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const startScan = () => {
    if (!file) return;
    const scan = createScan({ type: "file", name: file.name, size: file.size });
    navigate(`/scan/${scan.id}`);
  };

  const onDrop = (e) => {
    e.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        dragDepth.current += 1;
        setDragging(true);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => {
        e.preventDefault();
        dragDepth.current -= 1;
        if (dragDepth.current <= 0) setDragging(false);
      }}
      onDrop={onDrop}
      className={`flex min-h-[178px] flex-col items-center justify-center rounded-xl border border-dashed px-6 py-7 text-center transition-all duration-300 ${
        dragging
          ? "scale-[1.02] border-primary bg-primary/5 shadow-[0_0_50px_rgba(59,130,246,0.3)]"
          : "border-white/15 bg-white/[0.015] hover:border-primary/50 hover:bg-primary/[0.03]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        aria-label="Choose a file to scan"
        onChange={(e) => pickFile(e.target.files?.[0])}
      />

      <div className={`animate-nudge transition-colors ${dragging || file ? "text-primary" : "text-slate-400"}`}>
        <Icon size={40}>
          <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5" />
        </Icon>
      </div>

      {dragging ? (
        <p className="mt-3 text-sm font-medium text-primary">Release to add file</p>
      ) : file ? (
        <>
          <p className="mt-3 max-w-full truncate text-sm font-medium">{file.name}</p>
          <p className="mt-1 text-xs text-slate-400">{formatSize(file.size)}</p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={startScan}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)] active:translate-y-0"
            >
              Scan File
            </button>
            <button
              onClick={reset}
              className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-sm font-medium">Choose a file to scan</p>
          <p className="mt-1 text-xs text-slate-400">Supports common file types (exe, pdf, doc, zip, etc.)</p>
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)] active:translate-y-0"
          >
            Choose File
          </button>
        </>
      )}

      <p role="alert" className={`mt-3 text-xs text-red-400 transition-opacity ${error ? "opacity-100" : "h-0 opacity-0"}`}>
        {error}
      </p>
    </div>
  );
}

function SitePanel() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    try {
      const u = new URL(url.trim());
      if (!["http:", "https:"].includes(u.protocol)) throw new Error();
      setError("");
      const scan = createScan({ type: "url", name: u.href });
      navigate(`/scan/${scan.id}`);
    } catch {
      setError("Enter a valid link starting with http:// or https://");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex min-h-[178px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.015] px-6 py-7 text-center transition-colors hover:border-primary/50"
    >
      <div className="animate-nudge text-slate-400">
        <Icon size={40}>
          <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
        </Icon>
      </div>
      <p className="mt-3 text-sm font-medium">Enter a website to scan</p>
      <div className="mt-4 flex w-full max-w-[460px] gap-3">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          aria-label="Website URL"
          className="min-w-0 flex-1 rounded-lg border border-white/15 bg-bg px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-primary focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)] active:translate-y-0"
        >
          Scan
        </button>
      </div>
      <p role="alert" className={`mt-3 text-xs text-red-400 transition-opacity ${error ? "opacity-100" : "h-0 opacity-0"}`}>
        {error}
      </p>
    </form>
  );
}

export default function Hero() {
  const [tab, setTab] = useState("file");
  const activeIndex = TABS.findIndex((t) => t.id === tab);

  return (
    <section className="relative px-6 pt-[150px] pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_25%,rgba(59,130,246,0.10),transparent_70%)]" />
        <div className="absolute top-[12%] left-[20%] h-64 w-64 animate-float rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute top-[30%] right-[18%] h-64 w-64 animate-float rounded-full bg-indigo-500/10 blur-3xl"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className="mx-auto flex max-w-[588px] flex-col items-center text-center">
        <h1 className="animate-fade-up text-[28px] font-bold tracking-tight" style={{ animationDelay: "200ms" }}>
          Scan your{" "}
          <span className="animate-shimmer inline-block bg-gradient-to-r from-primary via-sky-300 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
            files.
          </span>
        </h1>

        <p className="mt-5 animate-fade-up text-sm text-slate-200" style={{ animationDelay: "380ms" }}>
          Detect malware, suspicious files and unsafe websites.
        </p>
        <p className="mt-3 animate-fade-up text-sm text-slate-300" style={{ animationDelay: "520ms" }}>
          Fast. Secure. Simple.
        </p>

        <div className="mt-12 w-full animate-fade-up text-left" style={{ animationDelay: "700ms" }}>
          <div role="tablist" className="relative grid grid-cols-2 border-b border-white/10">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center justify-center gap-2.5 py-4 text-xs font-semibold transition-colors duration-200 ${
                  tab === t.id ? "text-primary" : "text-slate-200 hover:text-white"
                }`}
              >
                <Icon>{t.icon}</Icon>
                {t.label}
              </button>
            ))}
            <span
              className="absolute -bottom-px left-0 h-0.5 w-1/2 bg-primary shadow-[0_0_12px_#3b82f6] transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
          </div>

          <div role="tabpanel" className="mt-6">
            {tab === "file" ? <FilePanel /> : <SitePanel />}
          </div>
        </div>
      </div>
    </section>
  );
}