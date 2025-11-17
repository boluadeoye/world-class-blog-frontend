"use client";

import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

export default function ReaderAuth({ onChange }) {
  const [user, setUser] = useState(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  async function refresh() {
    try {
      const res = await fetch(`${API_BASE}/auth/reader/me`, { credentials: "include" });
      const data = await res.json();
      setUser(data.user || null);
      onChange?.(data.user || null);
    } catch {
      setUser(null);
      onChange?.(null);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function handleLogout() {
    await fetch(`${API_BASE}/auth/reader/logout`, { method: "POST", credentials: "include" });
    refresh();
  }

  if (!clientId) {
    return <p className="text-[11px] text-red-400">Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID</p>;
  }

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <span className="text-xs text-slate-300">Signed in as {user.name || "Reader"}</span>
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-sky-500/60"
          >
            Sign out
          </button>
        </>
      ) : (
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={async (cred) => {
              const idToken = cred.credential;
              await fetch(`${API_BASE}/auth/reader/google`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
              });
              refresh();
            }}
            onError={() => console.log("Google login failed")}
          />
        </GoogleOAuthProvider>
      )}
    </div>
  );
}