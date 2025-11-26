"use client";

import { useEffect, useRef, useState } from "react";

export default function LiteYouTube({
  id,
  title = "YouTube video",
  start = 0,
  autoPlayOnIdleMs = 0, // e.g., 6000; 0 disables
  className = "",
}) {
  const [active, setActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const ref = useRef(null);
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const src =
    `https://www.youtube-nocookie.com/embed/${id}?` +
    new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      autoplay: active ? "1" : "0",
      mute: muted ? "1" : "0",
      ...(start ? { start: String(start) } : {}),
    });

  useEffect(() => {
    if (!autoPlayOnIdleMs || active) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const save = navigator?.connection?.saveData;
    if (reduce || save) return;

    let t;
    const io = new IntersectionObserver(
      (es) => {
        const e = es[0];
        if (!e) return;
        if (e.isIntersecting && e.intersectionRatio >= 0.6) {
          t = setTimeout(() => {
            setMuted(true);
            setActive(true);
          }, autoPlayOnIdleMs);
        } else if (t) {
          clearTimeout(t);
          t = undefined;
        }
      },
      { threshold: [0, 0.6, 1] }
    );
    if (ref.current) io.observe(ref.current);

    const onVis = () => {
      if (document.visibilityState !== "visible" && t) {
        clearTimeout(t);
        t = undefined;
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (t) clearTimeout(t);
    };
  }, [autoPlayOnIdleMs, active]);

  return (
    <div ref={ref} className={`lite-yt-embed rounded-xl overflow-hidden ${className}`}>
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
        />
      ) : (
        <button
          type="button"
          className="relative block w-full h-full"
          aria-label={`Play: ${title}`}
          onClick={() => setActive(true)}
        >
          <span className="sr-only">Play video</span>
          <div className="lite-yt-poster" style={{ backgroundImage: `url(${poster})` }} />
          <div className="lite-yt-gradient" />
          <svg className="lite-yt-playbtn" viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
            <path
              className="lite-yt-playbtn-bg"
              d="M66.52 7.74a8 8 0 0 0-5.63-5.66C56.69 1 34 1 34 1S11.31 1 7.11 2.08a8 8 0 0 0-5.63 5.66C.4 11.94.4 24 .4 24s0 12.06 1.08 16.26a8 8 0 0 0 5.63 5.66C11.31 47 34 47 34 47s22.69 0 26.89-1.08a8 8 0 0 0 5.63-5.66C67.6 36.06 67.6 24 67.6 24s0-12.06-1.08-16.26z"
              fill="currentColor"
            />
            <path d="M45 24 27 14v20" fill="#fff" />
          </svg>
        </button>
      )}
    </div>
  );
}
