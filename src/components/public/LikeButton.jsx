"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

export default function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/posts/${postId}/likes`, { credentials: "include" });
        const data = await res.json();
        if (!mounted) return;
        setLiked(Boolean(data.liked));
        setCount(Number(data.count || 0));
      } catch {
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [postId]);

  async function toggle() {
    try {
      const res = await fetch(`${API_BASE}/posts/${postId}/like`, {
        method: "POST",
        credentials: "include",
      });
      if (res.status === 401) {
        alert("Please sign in with Google to like.");
        return;
      }
      const data = await res.json();
      setLiked(Boolean(data.liked));
      setCount(Number(data.count || 0));
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium transition ${
        liked
          ? "border-rose-500/70 bg-rose-500 text-rose-950 shadow-sm shadow-rose-500/60"
          : "border-slate-700 bg-slate-900 text-slate-200 hover:border-rose-500/60 hover:text-rose-200"
      }`}
    >
      <Heart className={`h-3.5 w-3.5 ${liked ? "fill-rose-900 text-rose-950" : "text-rose-400"}`} />
      <span>{liked ? "Liked" : "Like"}</span>
      <span className="text-[10px] text-slate-300/80">{count > 0 ? `· ${count}` : ""}</span>
    </button>
  );
}