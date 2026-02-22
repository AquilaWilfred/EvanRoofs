"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  validateTOTP,
  getCurrentTOTP,
  setAdminSession,
  getAdminSession,
} from "@/lib/adminAuth";

type Step = "credentials" | "totp";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  // For demo: show the current TOTP code
  const [demoCode, setDemoCode] = useState("");

  useEffect(() => {
    if (getAdminSession()) router.replace("/admin/dashboard");
  }, [router]);

  // Update demo code every second
  useEffect(() => {
    if (step !== "totp") return;
    const update = () => setDemoCode(getCurrentTOTP());
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [step]);

  // Lockout countdown
  useEffect(() => {
    if (!locked) return;
    if (lockTimer <= 0) { setLocked(false); setAttempts(0); return; }
    const t = setTimeout(() => setLockTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [locked, lockTimer]);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setStep("totp");
      setAttempts(0);
    } else {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 5) {
        setLocked(true);
        setLockTimer(60);
        setError("Too many failed attempts. Locked for 60 seconds.");
      } else {
        setError(`Invalid username or password. (${5 - next} attempts remaining)`);
      }
    }
  };

  const handleTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);

    if (validateTOTP(totp)) {
      setAdminSession();
      router.push("/admin/dashboard");
    } else {
      setError("Invalid authentication code. Please try again.");
      setTotp("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-roofGrey-900 px-4 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #8B4513 0, #8B4513 1px, transparent 0, transparent 50%)", backgroundSize: "30px 30px" }} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-brown-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold font-heading">E</div>
            <div className="text-left">
              <p className="text-white font-heading text-xl font-bold">Evan<span className="text-roofGreen-400">Roofs</span></p>
              <p className="text-roofGrey-400 text-xs tracking-widest uppercase">Admin Portal</p>
            </div>
          </div>
          <p className="text-roofGrey-500 text-xs">Restricted access. Authorised personnel only.</p>
        </div>

        <div className="bg-roofGrey-800 rounded-2xl shadow-2xl border border-roofGrey-700 overflow-hidden">
          {/* Progress steps */}
          <div className="flex">
            <div className={`flex-1 py-3 text-center text-xs font-medium border-b-2 transition-colors ${
              step === "credentials" ? "border-brown-500 text-brown-400 bg-roofGrey-700" : "border-roofGreen-500 text-roofGreen-400"
            }`}>
              {step === "credentials" ? "① Credentials" : "✓ Credentials"}
            </div>
            <div className={`flex-1 py-3 text-center text-xs font-medium border-b-2 transition-colors ${
              step === "totp" ? "border-brown-500 text-brown-400 bg-roofGrey-700" : "border-roofGrey-600 text-roofGrey-500"
            }`}>
              ② Two-Factor Auth
            </div>
          </div>

          <div className="p-8">
            {step === "credentials" ? (
              <>
                <h2 className="text-white font-heading text-2xl font-bold mb-2">Sign In</h2>
                <p className="text-roofGrey-400 text-sm mb-8 leading-relaxed">
                  Enter your admin username and password to continue.
                </p>

                {error && (
                  <div className="bg-roofRed-900/50 border border-roofRed-700 text-roofRed-300 text-sm px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                {locked && (
                  <div className="bg-roofRed-900/50 border border-roofRed-700 text-roofRed-300 text-sm px-4 py-3 rounded-lg mb-6">
                    🔒 Account locked. Try again in <strong>{lockTimer}s</strong>
                  </div>
                )}

                <form onSubmit={handleCredentials} className="space-y-5">
                  <div>
                    <label className="block text-roofGrey-300 text-xs font-medium mb-2 uppercase tracking-wider">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={locked}
                      placeholder="admin username"
                      autoComplete="username"
                      className="w-full bg-roofGrey-900 border border-roofGrey-600 rounded-lg px-4 py-3 text-white text-sm placeholder-roofGrey-600 outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500/30 transition disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-roofGrey-300 text-xs font-medium mb-2 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={locked}
                        placeholder="••••••••••••"
                        autoComplete="current-password"
                        className="w-full bg-roofGrey-900 border border-roofGrey-600 rounded-lg px-4 py-3 text-white text-sm placeholder-roofGrey-600 outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500/30 transition disabled:opacity-50 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-roofGrey-500 hover:text-roofGrey-300 text-xs"
                      >
                        {showPass ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || locked}
                    className="w-full bg-brown-500 hover:bg-brown-600 disabled:bg-roofGrey-600 disabled:cursor-not-allowed text-white py-3.5 rounded-lg font-medium tracking-wider uppercase text-sm transition-colors mt-2"
                  >
                    {loading ? "Verifying..." : "Continue →"}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-roofGrey-700">
                  <p className="text-roofGrey-500 text-xs text-center">
                    🔒 Secure admin area. All access attempts are logged.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => { setStep("credentials"); setError(""); setTotp(""); }}
                    className="text-roofGrey-500 hover:text-white text-sm"
                  >
                    ← Back
                  </button>
                </div>

                <h2 className="text-white font-heading text-2xl font-bold mb-2">Two-Factor Authentication</h2>
                <p className="text-roofGrey-400 text-sm mb-6 leading-relaxed">
                  Enter the 6-digit code from your authenticator app (Google Authenticator or Authy).
                </p>

                {/* Demo helper — remove in production */}
                <div className="bg-roofGreen-900/40 border border-roofGreen-700/50 rounded-lg p-4 mb-6">
                  <p className="text-roofGreen-400 text-xs font-medium mb-1 uppercase tracking-wider">
                    🔐 Demo Mode — Current Code:
                  </p>
                  <p className="text-roofGreen-300 font-mono text-3xl font-bold tracking-[0.3em]">
                    {demoCode}
                  </p>
                  <p className="text-roofGreen-600 text-xs mt-1">Rotates every 30 seconds. Remove this panel in production.</p>
                </div>

                {error && (
                  <div className="bg-roofRed-900/50 border border-roofRed-700 text-roofRed-300 text-sm px-4 py-3 rounded-lg mb-6">
                    ⚠️ {error}
                  </div>
                )}

                <form onSubmit={handleTotp} className="space-y-5">
                  <div>
                    <label className="block text-roofGrey-300 text-xs font-medium mb-2 uppercase tracking-wider">
                      Authentication Code
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={totp}
                      onChange={(e) => setTotp(e.target.value.replace(/\D/g, ""))}
                      required
                      placeholder="000000"
                      className="w-full bg-roofGrey-900 border border-roofGrey-600 rounded-lg px-4 py-4 text-white text-3xl font-mono tracking-[0.5em] text-center placeholder-roofGrey-700 outline-none focus:border-roofGreen-500 focus:ring-1 focus:ring-roofGreen-500/30 transition"
                    />
                    <p className="text-roofGrey-500 text-xs mt-2 text-center">Enter the 6-digit code shown in your app</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || totp.length !== 6}
                    className="w-full bg-roofGreen-500 hover:bg-roofGreen-600 disabled:bg-roofGrey-600 disabled:cursor-not-allowed text-white py-3.5 rounded-lg font-medium tracking-wider uppercase text-sm transition-colors"
                  >
                    {loading ? "Authenticating..." : "Verify & Enter →"}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-roofGrey-700">
                  <p className="text-roofGrey-500 text-xs text-center">
                    🛡️ 2-Factor Authentication protects your admin panel
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-roofGrey-600 text-xs text-center mt-6">
          © {new Date().getFullYear()} EvanRoofs · Admin Portal v1.0
        </p>
      </div>
    </div>
  );
}
