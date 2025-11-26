"use client";

import FeaturedVideo from "./FeaturedVideo";

function VideoCard({ item }) {
  const id = item?.videoId;
  const slug = item?.slug;
  const title = item?.title || "Video";
  const href = slug ? `/post/${slug}` : (item?.url ? item.url : `https://youtu.be/${id}`);
  const poster = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;

  return (
    <a href={href} className="group block overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
      <div className="relative aspect-video w-full">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        ) : <div className="absolute inset-0 bg-slate-800" />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-slate-900/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-200">Watch</div>
      </div>
      <div className="p-3">
        <h4 className="text-sm font-medium text-slate-100 line-clamp-2">{title}</h4>
      </div>
    </a>
  );
}

export default function VideosSection({ featured, items = [] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-2 flex items-center justify-between">
        <div className="relative">
          <p className="section-eyebrow">02.</p>
          <h2 className="section-h2">Videos</h2>
          <div aria-hidden className="ghost-title">Videos</div>
        </div>
        <a href="/articles" className="btn-ghost">View all videos</a>
      </div>

      <FeaturedVideo video={featured} />

      {items.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map((it, i) => <VideoCard key={i} item={it} />)}
        </div>
      )}
    </section>
  );
}
