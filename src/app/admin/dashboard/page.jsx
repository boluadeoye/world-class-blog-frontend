"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, FileText, Calendar, AlertCircle, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // USE THE PROXY URL (Bypasses CORS)
  const API_BASE = "/api/proxy";

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // Removed 'credentials: include' for proxy stability unless strictly needed
      });
      
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleteError("");
    
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchPosts(); // Reload list
    } catch (err) {
      setDeleteError("Could not delete post. Try again.");
    }
  };

  return (
    <div className="space-y-8 p-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white">Content Command</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your digital assets.</p>
        </div>
        <Link 
          href="/admin/editor" 
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} /> Create New
        </Link>
      </header>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
          <AlertCircle size={20} />
          <span>Connection Failed: {error}</span>
          <button onClick={fetchPosts} className="ml-auto p-2 hover:bg-red-500/20 rounded-full">
            <RefreshCw size={16} />
          </button>
        </div>
      )}

      {/* Table Card */}
      <section className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-slate-500 animate-pulse">Loading secure data...</div>
        ) : posts.length === 0 && !error ? (
          <div className="p-12 text-center text-slate-500">No posts found. Start writing!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-6">Title</th>
                  <th className="p-6">Date</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <tr key={post.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-6">
                      <Link href={`/admin/editor/${post.id}`} className="flex items-center gap-3 font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">
                        <FileText size={16} className="text-slate-600 group-hover:text-indigo-500" />
                        {post.title}
                      </Link>
                    </td>
                    <td className="p-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {post.created_at ? new Date(post.created_at).toLocaleDateString() : "Draft"}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                        title="Delete Post"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
