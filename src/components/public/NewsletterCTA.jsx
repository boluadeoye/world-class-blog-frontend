// src/components/public/NewsletterCTA.jsx
"use client";

import { useState } from "react";

/**
 * Robust newsletter subscribe
 * - Accepts JSON, text, or empty body
 * - Shows clear success/error messages
 * - Validates email, disables button while sending
 * Config:
 * - NEXT_PUBLIC_NEWSLETTER_ENDPOINT (optional) absolute or relative path
 * - Fallback: `${API_BASE}/newsletter/subscribe`
 */
const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

const FALLBACK_ENDPOINTS = [
  process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "",
  "/newsletter/subscribe",
  "/newsletter",
  "/subscribe",
].filter(Boolean);

export default function NewsletterCTA() {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk]   = useState("");
  const [err, setErr] = useState("");

  async function postOnce(url) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
      credentials: "include",
      body: JSON.stringify({ name: name?.trim() || null, email: email.trim() }),
    });
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    let data = null;
    if (ct.includes("application/json")) {
      data = await res.json();
    } else {
      const txt = await res.text();
      try { data = txt ? JSON.parse(txt) : null; } catch { data = { message: txt || null }; }
    }
    if (!res.ok) {
      throw new Error(data?.error || data?.message || `Subscribe failed (${res.status})`);
    }
    return data;
  }

  async function subscribe(e) {
    e.preventDefault();
    setErr(""); setOk("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr("Enter a valid email address"); return;
    }
    setLoading(true);
    try {
      // Try configured endpoint if absolute/relative
      let lastError;
      for (const ep of FALLBACK_ENDPOINTS) {
        try {
          const url = ep.startsWith("http") ? ep : `${API_BASE}${ep}`;
          const data = await postOnce(url);
          setOk(data?.message || "Subscribed — check your inbox!");
          setName(""); setEmail("");
          setLoading(false);
          return;
        } catch (e) {
          lastError = e;
          continue;
        }
      }
      // If all failed:
      throw lastError || new Error("Unable to subscribe right now");
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={subscribe} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 ring-1 ring-cyan-300/25 text-cyan-300">✉️</div>
        <h3 className="text-base font-semibold text-slate-50">Subscribe to the brief</h3>
      </div>

      <p className="mb-3 text-sm text-slate-300">
        No spam. Just the best ideas on health, finance, technology and education in your inbox occasionally.
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Your name (optional)"
          className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Subscribing…" : "Subscribe"}
      </button>

      {err ? (
        <div className="mt-2 rounded-lg border border-rose-600/50 bg-rose-900/30 px-3 py-2 text-[13px] text-rose-100">
          {err}
        </div>
      ) : null}
      {ok ? (
        <div className="mt-2 rounded-lg border border-emerald-600/50 bg-emerald-900/30 px-3 py-2 text-[13px] text-emerald-100">
          {ok}
        </div>
      ) : null}
    </form>
  );
}
