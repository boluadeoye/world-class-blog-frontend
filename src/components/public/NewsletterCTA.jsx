"use client";

import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState({ ok: false, dup: false, err: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setState({ ok: false, dup: false, err: "" });

    const em = email.trim().toLowerCase();
    if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(em)) {
      setState({ ok: false, dup: false, err: "Enter a valid email address" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: em, name: name.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Subscribe failed");

      if (data.already) {
        setState({ ok: true, dup: true, err: "" });
      } else {
        setState({ ok: true, dup: false, err: "" });
      }
      setEmail("");
    } catch (e) {
      setState({ ok: false, dup: false, err: String(e?.message || e) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/60">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800">
          <Mail className="h-3.5 w-3.5 text-sky-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-100">Subscribe to the brief</h3>
      </div>

      <p className="text-xs text-slate-300/90 mb-3">
        No spam. Just the best ideas on health, finance, technology and education in
        your inbox occasionally.
      </p>

      <form onSubmit={onSubmit} className="grid gap-2 sm:grid-cols-[1fr,1.2fr,auto]">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      {/* feedback */}
      {state.ok && !state.dup && (
        <p className="mt-2 inline-flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle className="h-4 w-4" />
          You’re in — watch your inbox for future issues.
        </p>
      )}
      {state.ok && state.dup && (
        <p className="mt-2 inline-flex items-center gap-2 text-xs text-sky-300">
          <CheckCircle className="h-4 w-4" />
          You’re already subscribed — thank you!
        </p>
      )}
      {state.err && (
        <p className="mt-2 inline-flex items-center gap-2 text-xs text-red-300">
          <AlertCircle className="h-4 w-4" />
          {state.err}
        </p>
      )}
    </div>
  );
}