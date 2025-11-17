"use client";

import { useEffect, useRef, useState } from "react";

function useCountWhenVisible(target, opts = { duration: 900 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // animate to target
            let start = null;
            const dur = opts.duration;
            function step(ts) {
              if (!start) start = ts;
              const p = Math.min(1, (ts - start) / dur);
              setVal(Math.round(target * (0.2 + 0.8 * p)));
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, opts.duration]);

  return { ref, val };
}

export default function MetricsCounters({ posts }) {
  const total = Array.isArray(posts) ? posts.length : 0;
  const topics = new Set(
    (Array.isArray(posts) ? posts : []).map((p) =>
      String(p.category || "Other").toLowerCase()
    )
  ).size;

  // naive derived “tags” count (unique hashtags)
  const tags = new Set();
  (Array.isArray(posts) ? posts : []).forEach((p) => {
    const txt = typeof p.content === "string" ? p.content : "";
    const re = /(^|\s)#([a-z0-9-]{2,})\b/gi;
    let m;
    while ((m = re.exec(txt))) tags.add(m[2].toLowerCase());
  });

  const { ref: r1, val: v1 } = useCountWhenVisible(total);
  const { ref: r2, val: v2 } = useCountWhenVisible(topics);
  const { ref: r3, val: v3 } = useCountWhenVisible(tags.size);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div ref={r1} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
        <p className="font-display text-2xl font-semibold text-slate-50">{v1}</p>
        <p className="text-xs text-slate-400">Articles</p>
      </div>
      <div ref={r2} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
        <p className="font-display text-2xl font-semibold text-slate-50">{v2}</p>
        <p className="text-xs text-slate-400">Topics</p>
      </div>
      <div ref={r3} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
        <p className="font-display text-2xl font-semibold text-slate-50">{v3}</p>
        <p className="text-xs text-slate-400">Tags</p>
      </div>
    </div>
  );
}