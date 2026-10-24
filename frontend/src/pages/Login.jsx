import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthField from "../components/AuthField";
import { validateEmail } from "../utils/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const errors = {
    email: validateEmail(form.email),
    password: form.password ? "" : "Enter your password.",
  };
  const shown = (name) => (touched[name] ? errors[name] : "");
  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setNotice("");
    if (errors.email || errors.password) return;

    setSubmitting(true);
    try {
      // TODO (backend phase): POST /api/auth/login with credentials: "include"
      await new Promise((r) => setTimeout(r, 700));
      setNotice("The form is valid. The login API is not connected yet.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your FileWarden account."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="font-medium text-primary transition-colors hover:text-sky-300">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate>
        <AuthField
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          onBlur={blur("email")}
          error={shown("email")}
          autoComplete="email"
          placeholder="you@example.com"
          autoFocus
        />
        <AuthField
          label="Password"
          type="password"
          value={form.password}
          onChange={set("password")}
          onBlur={blur("password")}
          error={shown("password")}
          autoComplete="current-password"
          placeholder="Your password"
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {submitting && (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M12 3a9 9 0 019 9" />
            </svg>
          )}
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        {notice && (
          <p role="status" className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-xs text-sky-200">
            {notice}
          </p>
        )}
      </form>
    </AuthCard>
  );
}