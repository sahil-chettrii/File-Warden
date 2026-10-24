import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Home", to: "/" },
      { label: "Features", to: "/features" },
      { label: "About", to: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Documentation" }, { label: "API" }, { label: "Status" }],
  },
  {
    title: "Legal",
    links: [{ label: "Terms of Service" }, { label: "Privacy Policy" }, { label: "Contact" }],
  },
];

const linkClass =
  "inline-block text-xs text-slate-300 transition-all duration-200 hover:translate-x-1 hover:text-primary";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg">
      <div className="mx-auto grid max-w-[1164px] gap-10 px-6 py-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h4 className="text-sm font-semibold">FileWarden</h4>
          <p className="mt-3 text-xs text-slate-300">Fast. Secure. Simple.</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold">{col.title}</h4>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  ) : (
                    // Pages not built yet: placeholder, does nothing for now
                    <a href="#" onClick={(e) => e.preventDefault()} className={linkClass}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}