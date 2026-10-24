import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center px-6 pt-[200px] text-center">
      <p className="animate-fade-up text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 animate-fade-up text-xl font-semibold" style={{ animationDelay: "150ms" }}>
        Page not found
      </h1>
      <p className="mt-2 animate-fade-up text-sm text-slate-400" style={{ animationDelay: "250ms" }}>
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-8 animate-fade-up rounded-lg bg-primary px-7 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]"
        style={{ animationDelay: "350ms" }}
      >
        Go home
      </Link>
    </section>
  );
}