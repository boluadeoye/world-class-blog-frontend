"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "../../../components/admin/PostForm";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "https://project-blog-backend-beta.vercel.app/api";

  const handleSave = async (post) => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          slug: post.slug,
          content: post.content
        })
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = text;
        try {
          msg =
            JSON.parse(text)?.error || JSON.parse(text)?.message || text;
        } catch {}
        throw new Error(msg || `Failed to create post (${res.status})`);
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError(String(err?.message || err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold text-slate-50">New Post</h1>
        <p className="text-xs text-slate-400 mt-1">
          Create a new article for your world‑class blog.
        </p>
      </header>

      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-6">
        <PostForm
          initialPost={null}
          onSave={handleSave}
          saving={saving}
          error={error}
        />
      </div>
    </div>
  );
}