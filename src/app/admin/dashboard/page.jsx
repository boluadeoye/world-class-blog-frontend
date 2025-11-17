"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const API_BASE = "https://project-blog-backend-beta.vercel.app/api";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/posts`, {
          method: "GET",
          credentials: "include"
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch posts (${res.status})`);
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(String(err?.message || err));
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [API_BASE]);

  const reloadPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: "GET",
        credentials: "include"
      });
      if (!res.ok) return;
      setPosts(await res.json());
    } catch {
      // ignore
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    setDeleteError("");

    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error(`Failed to delete post (${res.status})`);
      }
      await reloadPosts();
    } catch (err) {
      setDeleteError(String(err?.message || err));
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your posts from a single, focused view.
          </p>
        </div>
        <Link
          href="/admin/editor"
          className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white px-4 py-2 transition"
        >
          New Post
        </Link>
      </header>

      <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/80 border-b border-slate-800">
            <tr>
              <th className="py-2 px-4 text-left text-slate-400 font-medium">
                Title
              </th>
              <th className="py-2 px-4 text-left text-slate-400 font-medium">
                Created
              </th>
              <th className="py-2 px-4 text-left text-slate-400 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr
                key={post.id}
                className={
                  idx % 2 === 0 ? "bg-slate-900" : "bg-slate-900/60"
                }
              >
                <td className="py-2 px-4">
                  <Link
                    href={`/admin/editor/${post.id}`}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="py-2 px-4 text-slate-300">
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString()
                    : ""}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="inline-flex items-center rounded-md border border-red-700 bg-red-900/30 px-3 py-1 text-xs font-medium text-red-300 hover:bg-red-800/50 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {deleteError && (
          <div className="border-t border-red-900 bg-red-950/40 px-4 py-2 text-xs text-red-400">
            {deleteError}
          </div>
        )}
      </section>
    </div>
  );
}