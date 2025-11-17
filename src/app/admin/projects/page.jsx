"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export default function AdminProjectsList() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");

  async function load() {
    try {
      const res = await fetch(`${API_BASE}/projects`, { credentials: "include" });
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(String(e?.message || e));
      setRows([]);
    }
  }
  useEffect(() => { load(); }, []);

  async function del(id) {
    if (!confirm("Delete this project?")) return;
    await fetch(`${API_BASE}/projects/${id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  if (!rows) return <p>Loading projects…</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100">Projects</h1>
        <Link href="/admin/projects/new" className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white">New Project</Link>
      </div>
      {err && <p className="text-xs text-red-400 mb-2">{err}</p>}
      <table className="min-w-full bg-slate-900 border border-slate-800 text-sm">
        <thead>
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">URL</th>
            <th className="p-2 text-left">Created</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t border-slate-800">
              <td className="p-2">{p.title}</td>
              <td className="p-2 text-sky-400">{p.url}</td>
              <td className="p-2">{p.created_at ? new Date(p.created_at).toLocaleDateString() : ""}</td>
              <td className="p-2 space-x-2">
                <Link href={`/admin/projects/${p.id}`} className="text-blue-400">Edit</Link>
                <button onClick={() => del(p.id)} className="text-red-400">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}