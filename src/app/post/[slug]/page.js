import { getPostBySlug, getPublicPosts } from "../../../lib/api";
import PostRenderer from "../../../components/public/PostRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import LikeButton from "../../../components/public/LikeButton";
import ShareBar from "../../../components/public/ShareBar";
import Comments from "../../../components/public/Comments";
import ReadNext from "../../../components/public/ReadNext";
import TimerIsland from "../../../components/post/TimerIsland";

const first = (...vals) => vals.find(v => typeof v === "string" && v.trim().length > 0) || "";
function siteBase(){
  const env = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/+$/,"");
  if (!env) return "https://boluadeoye.com.ng";
  try {
    const h = new URL(env.startsWith("http")? env : `https://${env}`).hostname;
    if (h.endsWith("vercel.app")) return "https://boluadeoye.com.ng";
    return env.startsWith("http") ? env : `https://${env}`;
  } catch {
    return "https://boluadeoye.com.ng";
  }
}
function coverOf(p){
  const direct = first(
    p?.meta?.cover, p?.hero_image?.url, p?.og_image, p?.seo?.og_image,
    p?.cover?.url, p?.cover_url, p?.image_url, p?.image, p?.thumbnail, p?.banner?.url
  ); if (direct) return direct;
  if (typeof p?.content === "string"){
    const m = p.content.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
    if (m?.[1]) return m[1];
  }
  if (typeof p?.content_html === "string"){
    const m2 = p.content_html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m2?.[1]) return m2[1];
  }
  try {
    const ej = typeof p?.content === "string" ? JSON.parse(p.content) : p?.content;
    const blocks = Array.isArray(ej?.blocks) ? ej.blocks : [];
    const img = blocks.find(b => b?.type === "image" && (b?.data?.file?.url || b?.data?.url));
    const u = img?.data?.file?.url || img?.data?.url; if (u) return u;
  } catch {}
  return "";
}

export async function generateMetadata({ params }){
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const site = siteBase();
  const canonical = `${site}/post/${post.slug}`;
  const title = post.title || "Post";
  const desc = (post.excerpt || "").trim() ||
    (typeof post.content === "string" ? post.content.replace(/[#*_`>!\[\]\(\)]/g,"").slice(0,160) : "") ||
    "Read this article on boluadeoye.com.ng";
  const image = coverOf(post) || `${site}/og-default.jpg`;

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title, description: desc, url: canonical, type: "article",
      images: [{ url: image, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image", title, description: desc, images: [image]
    }
  };
}

function computeReadingTime(content) {
  if (!content) return 3;
  let text = "";
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    if (parsed && Array.isArray(parsed.blocks)) {
      text = parsed.blocks.map((b) => (b.data && (b.data.text || b.data.caption)) || "").join(" ");
    } else if (typeof content === "string") {
      text = content;
    }
  } catch { text = String(content); }
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const dateRaw = post.created_at || post.createdAt;
  const created = dateRaw ? new Date(dateRaw).toLocaleDateString() : "";
  const readingMinutes = computeReadingTime(post.content);

  const site = siteBase();
  const url = `${site}/post/${post.slug}`;

  let all = [];
  try { all = await getPublicPosts(); } catch {}
  const sameCat = String(post?.meta?.category || post?.category || "").trim().toLowerCase();
  const rec = (all || [])
    .filter((p) => (p.slug || p.id) && (p.slug !== post.slug))
    .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
  const preferred = sameCat ? rec.filter((p) => String(p?.meta?.category || p?.category || "").trim().toLowerCase() === sameCat) : [];
  const fallback = rec.filter((p) => !preferred.includes(p));
  const recommended = [...preferred.slice(0, 3), ...fallback].slice(0, 3);

  return (
    <div className="post-shell mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <TimerIsland containerSelector="#post-body" estimated={readingMinutes} />
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-xs text-slate-300 hover:text-sky-300">
        <ArrowLeft className="h-3 w-3" /><span>Back to home</span>
      </Link>

      <article className="article-card space-y-6">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-slate-950/70 px-3 py-1 text-[11px] text-sky-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span>World‑Class Blog Article</span>
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl lg:text-4xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            {created && (<div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /><span>{created}</span></div>)}
            <span>•</span><span>{readingMinutes} min read</span>
          </div>
        </header>

        <section id="post-body" className="pt-2"><PostRenderer data={post.content} /></section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-3"><LikeButton postId={post.id} /></div>
          <div className="share-row" data-share><ShareBar url={url} title={post.title} /></div>
        </section>

        <section id="comments" className="comments mt-6"><Comments postId={post.id} /></section>
      </article>

      <section className="article-related"><ReadNext posts={recommended} /></section>
    </div>
  );
}
