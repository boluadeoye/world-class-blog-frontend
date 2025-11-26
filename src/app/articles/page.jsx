import { fetchLatestArticles } from "../../lib/homeData";
import PostCard from "../../components/ui/PostCard";

export default async function Page() {
  const posts = await fetchLatestArticles(200, "");

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4 text-center">
        <div className="text-[11px] uppercase tracking-[.18em] text-slate-400">Browse Everything</div>
        <h1 className="h2-compact">All Posts</h1>
      </div>

      {(!posts || posts.length === 0) ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-6 text-slate-200">
          No posts yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      )}
    </div>
  );
}
