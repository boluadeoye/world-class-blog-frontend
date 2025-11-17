"use client";

import TagBadge from "./TagBadge";

// Free preview thumbnail service (no key)
function previewFrom(url) {
  // WordPress mShots - privacy-friendly and free
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`;
}

export default function ProjectCard({ project }) {
  const thumb = project.image_url || previewFrom(project.url);
  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-slate-900/60 hover:shadow-sky-500/30 transition"
    >
      <div className="relative">
        <img
          src={thumb}
          alt={project.title}
          className="block h-40 w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-slate-50">{project.title}</h3>
        {project.description && (
          <p className="text-xs text-slate-300/90 line-clamp-3">{project.description}</p>
        )}
        {tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {tags.map((t, i) => (
              <TagBadge key={i} tag={t} />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}