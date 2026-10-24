import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthField from "../components/AuthField";
import { validateEmail, validateNewPassword, passwordStrength } from "../utils/auth";

const LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];
const BAR_COLORS = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const errors = {
    email: validateEmail(form.email),
    password: validateNewPassword(form.password),
    confirm: !form.confirm
      ? "Repeat your password."
      : form.confirm !== form.password
      ? "Passwords do not match."
      : "",
  };
  const shown = (name) => (touched[name] ? errors[name] : "");
  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));
  const level = passwordStrength(form.password);

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true, confirm: true });
    setNotice("");
    if (errors.email || errors.password || errors.confirm) return;

    setSubmitting(true);
    try {
      // TODO (backend phase): POST /api/auth/register with credentials: "include"
      await new Promise((r) => setTimeout(r, 700));
      setNotice("The form is valid. The register API is not connected yet.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Save your scans and reports in one place."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary transition-colors hover:text-sky-300">
            Sign in
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />

        {form.password && (
          <div className="-mt-2 mb-4" aria-live="polite">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    level >= i ? BAR_COLORS[level] : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <p className="mt-1.5 text-xs text-slate-400">Strength: {LABELS[level]}</p>
          </div>
        )}

        <AuthField
          label="Confirm password"
          type="password"
          value={form.confirm}
          onChange={set("confirm")}
          onBlur={blur("confirm")}
          error={shown("confirm")}
          autoComplete="new-password"
          placeholder="Repeat your password"
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
          {submitting ? "Creating account..." : "Create account"}
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