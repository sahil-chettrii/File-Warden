import { useId, useState } from "react";

export default function AuthField({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  placeholder,
  autoFocus = false,
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg border bg-bg px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.25)] ${
            isPassword ? "pr-12" : ""
          } ${error ? "border-red-500/70 focus:border-red-500" : "border-white/15 focus:border-primary"}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400 transition-colors hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {show && <path d="M3 3l18 18" />}
            </svg>
          </button>
        )}
      </div>

      {/* Fixed height so the layout does not jump when an error appears */}
      <p
        id={`${id}-error`}
        role="alert"
        className={`mt-1.5 min-h-[16px] text-xs text-red-400 transition-opacity duration-200 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error}
      </p>
    </div>
  );
}