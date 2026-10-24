import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { name: "Home", to: "/" },
  { name: "Features", to: "/features" },
  { name: "About", to: "/about" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const linkRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The active link comes from the URL, so refresh and back/forward always work
  useLayoutEffect(() => {
    const update = () => {
      const el = linkRefs.current[pathname];
      setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : { left: 0, width: 0 });
    };
    update();
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 animate-slide-down border-b transition-all duration-300 ${
        scrolled ? "border-white/10 bg-bg/85 backdrop-blur-xl" : "border-white/5 bg-bg/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[65px] max-w-[1164px] items-center justify-between px-6">
        <Link to="/" className="text-xl font-semibold tracking-tight transition-colors hover:text-primary">
          FileWarden
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="relative flex items-center">
            {LINKS.map(({ name, to }) => (
              <Link
                key={to}
                to={to}
                ref={(el) => (linkRefs.current[to] = el)}
                className={`px-4 py-[22px] text-sm font-medium transition-colors duration-200 ${
                  pathname === to ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {name}
              </Link>
            ))}
            <span
              className="absolute -bottom-px h-0.5 rounded-full bg-primary shadow-[0_0_10px_#3b82f6] transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width, opacity: indicator.width ? 1 : 0 }}
            />
          </nav>

                 <Link
            to="/login"
            className="rounded-lg border border-primary/70 px-5 py-2 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] active:translate-y-0"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}