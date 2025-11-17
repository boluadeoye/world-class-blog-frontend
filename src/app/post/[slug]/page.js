import { getPostBySlug, getPublicPosts } from "../../../lib/api";
import PostRenderer from "../../../components/public/PostRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import LikeButton from "../../../components/public/LikeButton";
import ShareBar from "../../../components/public/ShareBar";
import Comments from "../../../components/public/Comments";
import ReadNext from "../../../components/public/ReadNext";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const dateRaw = post.created_at || post.createdAt;
  const created = dateRaw ? new Date(dateRaw).toLocaleDateString() : "";
  const readingMinutes = computeReadingTime(post.content);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${baseUrl}/post/${post.slug}`;

  // build recommendations
  let all = [];
  try {
    all = await getPublicPosts();
  } catch {}
  const sameCat = String(post.category || "").trim().toLowerCase();
  const rec = (all || [])
    .filter((p) => (p.slug || p.id) && (p.slug !== post.slug))
    .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));

  const preferred = sameCat
    ? rec.filter((p) => String(p.category || "").trim().toLowerCase() === sameCat)
    : [];

  const fallback = rec.filter((p) => !preferred.includes(p));
  const recommended = [...preferred.slice(0, 3), ...fallback].slice(0, 3);

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-xs text-slate-300 hover:text-sky-300">
        <ArrowLeft className="h-3 w-3" />
        <span>Back to home</span>
      </Link>

      <article className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/70 sm:p-8">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-slate-950/70 px-3 py-1 text-[11px] text-sky-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
            <span>World‑Class Blog Article</span>
          </div>

          <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            {created && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{created}</span>
              </div>
            )}
            <span>•</span>
            <span>{readingMinutes} min read</span>
          </div>
        </header>

        <section className="pt-2">
          <PostRenderer data={post.content} />
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <LikeButton postId={post.id} />
          </div>
          <ShareBar url={url} title={post.title} />
        </section>

        <section className="mt-6">
          <Comments postId={post.id} />
        </section>
      </article>

      <ReadNext posts={recommended} />
    </div>
  );
}

function computeReadingTime(content) {
  if (!content) return 3;
  let text = "";
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    if (parsed && Array.isArray(parsed.blocks)) {
      text = parsed.blocks
        .map((b) => (b.data && (b.data.text || b.data.caption)) || "")
        .join(" ");
    } else if (typeof content === "string") {
      text = content;
    }
  } catch {
    text = String(content);
  }
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}