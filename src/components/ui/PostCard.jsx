/* src/components/ui/PostCard.jsx */
function whenOf(p) {
  const d = new Date(p?.created_at || p?.createdAt || Date.now());
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}
function categoryOf(p) {
  const metaCat = p?.meta?.category;
  if (metaCat) return metaCat;
  const tags = Array.isArray(p?.tags) ? p.tags : [];
  const t = tags.find(x => {
    const k = String(x || "").toLowerCase();
    return k !== "home-featured" && k !== "featured" && k !== "video";
  });
  return t || "General";
}

export default function PostCard({ post }) {
  const href = post?.slug ? `/post/${post.slug}` : "#";
  const cover = post?.meta?.cover || post?.meta?.image || null;

  return (
    <a href={href} className="group post-card post-ring rounded-[16px] block overflow-hidden">
      <div className="overflow-hidden rounded-[16px] bg-slate-900/55 backdrop-blur-sm border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:shadow-[0_20px_50px_rgba(0,0,0,.45)]">
        <div className="relative aspect-[16/10] rounded-t-[16px] overflow-hidden">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" src={cover} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
          ) : (
            <div className="post-placeholder absolute inset-0" aria-hidden />
          )}
          <div className="post-topfade" aria-hidden />
        </div>

        <div className="p-3 sm:p-3.5">
          <div className="flex items-center gap-2">
            <span className="post-chip">{categoryOf(post)}</span>
            <span className="post-dot" aria-hidden>•</span>
            <span className="post-meta">{whenOf(post)}</span>
          </div>
          <h3 className="mt-1 text-[13.5px] sm:text-[15px] font-semibold leading-snug text-slate-50 group-hover:text-white line-clamp-2">
            {post?.title || "Untitled"}
          </h3>
        </div>
      </div>
    </a>
  );
}
