export function validateEmail(value) {
  const email = value.trim();
  if (!email) return "Enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  return "";
}

export function validateNewPassword(value) {
  if (!value) return "Create a password.";
  if (value.length < 8) return "Use at least 8 characters.";
  return "";
}

// Returns 0-4. Length counts most, then variety. Under 8 characters is always 0.
export function passwordStrength(pw) {
  if (pw.length < 8) return 0;
  let score = 1;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}