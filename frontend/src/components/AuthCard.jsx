export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="flex justify-center px-6 pt-[150px] pb-24">
      <div className="w-full max-w-[420px] animate-fade-up rounded-2xl border border-white/10 bg-surface/80 p-8 shadow-[0_0_60px_rgba(59,130,246,0.08)] backdrop-blur">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>
      </div>
    </section>
  );
}