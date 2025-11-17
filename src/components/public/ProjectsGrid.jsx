"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export default function ProjectsGrid() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/projects`, { credentials: "include" });
        const data = await res.json();
        if (mounted) setProjects(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setProjects([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!projects) {
    return (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow skel h-56" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <p className="text-sm text-slate-300">No projects yet.</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}