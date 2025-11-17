"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    // Placeholder: replace with your backend endpoint later
    if (!email.trim()) return;
    alert("Thanks! Newsletter signup will be wired soon.");
    setEmail("");
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/60">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800">
          <Mail className="h-3.5 w-3.5 text-sky-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-100">
          Subscribe to the brief
        </h3>
      </div>
      <p className="text-xs text-slate-300/90 mb-3">
        No spam. Just the best ideas on health, finance, technology and
        education in your inbox occasionally.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
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
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}