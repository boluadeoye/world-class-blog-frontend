"use client";

import { useRouter } from "next/navigation";
import ProjectForm from "../../../../components/admin/ProjectForm";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export default function NewProjectPage() {
  const router = useRouter();
  async function save(payload) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create project");
    router.push("/admin/projects");
  }
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-100">New Project</h1>
      <ProjectForm onSave={save} />
    </div>
  );
}