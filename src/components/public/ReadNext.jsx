"use client";

import PostCard from "./PostCard";

export default function ReadNext({ posts }) {
  if (!Array.isArray(posts) || posts.length === 0) return null;
  return (
    <div className="mt-10">
      <h3 className="font-display mb-3 text-lg font-semibold text-slate-50">Read next</h3>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.id ?? p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}