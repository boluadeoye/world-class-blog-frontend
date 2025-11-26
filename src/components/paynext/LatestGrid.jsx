// src/components/paynext/LatestGrid.jsx
import PostCard from "../ui/PostCard";

export default function LatestGrid({ posts = [] }) {
  const items = Array.isArray(posts) ? posts.slice(0, 6) : [];
  if (items.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-6xl mb-3 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[.18em] text-slate-400">Latest Posts</div>
          <h2 className="h2-compact">Fresh from the blog</h2>
        </div>
        <a href="/articles" className="btn-ghost">Browse Everything →</a>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Always 2 columns; tighten gap for premium density */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {items.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
