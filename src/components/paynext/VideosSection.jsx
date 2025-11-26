"use client";

import { useState } from "react";

function LiteYT({ id, title = "Video", start = 0, className = "" }) {
  const [on, setOn] = useState(false);
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1${start?`&start=${start}`:""}`;
  return (
    <div className={`lite-yt-embed rounded-[18px] overflow-hidden ${className}`}>
      {on ? (
        <iframe className="absolute inset-0 h-full w-full" src={src} title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      ) : (
        <button type="button" className="relative block w-full h-full" aria-label={`Play ${title}`} onClick={() => setOn(true)}>
          <div className="lite-yt-poster" style={{ backgroundImage: `url(${poster})` }} />
          <div className="lite-yt-gradient" />
          <svg className="lite-yt-playbtn" viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
            <path className="lite-yt-playbtn-bg" d="M66.52 7.74a8 8 0 0 0-5.63-5.66C56.69 1 34 1 34 1S11.31 1 7.11 2.08a8 8 0 0 0-5.63 5.66C.4 11.94.4 24 .4 24s0 12.06 1.08 16.26a8 8 0 0 0 5.63 5.66C11.31 47 34 47 34 47s22.69 0 26.89-1.08a8 8 0 0 0 5.63-5.66C67.6 36.06 67.6 24 67.6 24s0-12.06-1.08-16.26z" fill="currentColor"/>
            <path d="M45 24 27 14v20" fill="#fff"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default function VideosSection({ featured = null, items = [] }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-4">
          <div className="text-[11px] uppercase tracking-[.18em] text-slate-400">Videos</div>
          <h2 className="h2-compact">Watch Recent Videos</h2>
        </div>

        {/* Featured video */}
        {featured?.id && (
          <div className="mb-5">
            <LiteYT id={featured.id} start={featured.start||0} title={featured.title||"Featured video"} className="w-full" />
          </div>
        )}

        {/* Small video cards */}
        {Array.isArray(items) && items.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, featured?.id ? 2 : 3).map((v, i) => (
              <div key={i} className="overflow-hidden rounded-[16px] border border-slate-800 bg-slate-900/40">
                <LiteYT id={v.id} start={v.start||0} title={v.title||"Video"} />
                <div className="p-3 text-slate-200">{v.title || "Video"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
