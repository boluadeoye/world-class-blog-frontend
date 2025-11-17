import { getPublicPosts } from "../../../lib/api";
import PostsSection from "../../../components/public/PostsSection";

export async function generateMetadata({ params }) {
  const tag = decodeURIComponent((await params).tag || "");
  return { title: `#${tag} | Adeoye Boluwatife` };
}

export default async function TagPage({ params }) {
  const tag = decodeURIComponent((await params).tag || "").toLowerCase();
  let posts = [];
  try {
    posts = await getPublicPosts();
  } catch {}

  // derive tags per post (same as in PostsSection)
  const deriveTags = (post) => {
    if (Array.isArray(post?.tags) && post.tags.length) {
      return post.tags.map((t) => String(t).toLowerCase());
    }
    const txt = typeof post?.content === "string" ? post.content : "";
    const arr = [];
    const re = /(^|\s)#([a-z0-9-]{2,})\b/gi;
    let m;
    while ((m = re.exec(txt))) arr.push(m[2].toLowerCase());
    return arr;
  };

  const tagged = (posts || []).filter((p) =>
    deriveTags(p).includes(tag)
  );

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6 space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Tag</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          #{tag}
        </h1>
        <p className="max-w-2xl text-sm text-slate-300/90">
          Articles matching this tag.
        </p>
      </header>
      <PostsSection posts={tagged} />
    </div>
  );
}