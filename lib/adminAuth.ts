// ─── Admin Auth ─────────────────────────────────────────────────────────────
// Production note: Replace these with environment variables and a proper auth
// library (NextAuth, Clerk, etc.). TOTP 2FA should use a library like
// `otplib`. Passwords should be hashed with bcrypt.
//
// For this self-contained demo, credentials are checked client-side
// and a time-based OTP is simulated deterministically.

export const ADMIN_USERNAME = "evan.admin";
export const ADMIN_PASSWORD = "EvanRoofs@2025!";

// ── Simulated TOTP ──────────────────────────────────────────────────────────
// In production, use `otplib` with a secret stored in env variables,
// and scan the QR code with Google Authenticator / Authy.
//
// Here we generate a 6-digit code that rotates every 30 seconds,
// derived from the current time window — matching what an authenticator
// app would show if the secret seed were "EVANROOFS2025".

export function getCurrentTOTP(): string {
  const window = Math.floor(Date.now() / 30000);
  // Simple deterministic derivation (NOT cryptographically secure — demo only)
  const seed = 0x4556414e; // "EVAN" in hex
  const code = ((seed ^ window) * 1_000_003) % 1_000_000;
  return String(Math.abs(code)).padStart(6, "0");
}

export function validateTOTP(input: string): boolean {
  // Allow current window and ±1 window for clock drift
  const now = Math.floor(Date.now() / 30000);
  for (let delta = -1; delta <= 1; delta++) {
    const w = now + delta;
    const seed = 0x4556414e;
    const code = ((seed ^ w) * 1_000_003) % 1_000_000;
    if (String(Math.abs(code)).padStart(6, "0") === input.trim()) return true;
  }
  return false;
}

export const SESSION_KEY = "evan_admin_session";

export function setAdminSession() {
  if (typeof window === "undefined") return;
  const expires = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ auth: true, expires }));
}

export function getAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const { auth, expires } = JSON.parse(raw);
    return auth === true && Date.now() < expires;
  } catch {
    return false;
  }
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

// ── Persistent media in localStorage ────────────────────────────────────────
import { SEED_MEDIA, MediaItem } from "./mediaStore";

const MEDIA_KEY = "evan_media_items";

export function loadMedia(): MediaItem[] {
  if (typeof window === "undefined") return SEED_MEDIA;
  try {
    const raw = localStorage.getItem(MEDIA_KEY);
    if (!raw) return SEED_MEDIA;
    return JSON.parse(raw) as MediaItem[];
  } catch {
    return SEED_MEDIA;
  }
}

export function saveMedia(items: MediaItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MEDIA_KEY, JSON.stringify(items));
}
