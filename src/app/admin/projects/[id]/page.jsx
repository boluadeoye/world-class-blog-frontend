"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectForm from "../../../../components/admin/ProjectForm";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [row, setRow] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/projects/${id}`, { credentials: "include" });
      const data = await res.json();
      setRow(data);
    })();
  }, [id]);

  async function save(payload) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update project");
    router.push("/admin/projects");
  }

  if (!row) return <p>Loading…</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-100">Edit Project</h1>
      <ProjectForm initialProject={row} onSave={save} />
    </div>
  );
}