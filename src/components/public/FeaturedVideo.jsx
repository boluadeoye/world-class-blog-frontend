"use client";
import LiteYouTube from "./LiteYouTube";

function parseStart(v) {
  if (!v) return 0;
  if (/^\d+$/.test(String(v))) return parseInt(v, 10);
  const m = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i.exec(String(v));
  if (!m) return 0;
  return (parseInt(m[1]||"0",10)*3600)+(parseInt(m[2]||"0",10)*60)+(parseInt(m[3]||"0",10));
}
function extractIdAndStart(input) {
  if (!input) return null;
  if (!/^https?:\/\//i.test(input)) return { id: input, start: 0 };
  try {
    const u = new URL(input);
    const host = u.hostname.replace(/^www\./,"").toLowerCase();
    let id = null;
    if (host === "youtu.be") id = u.pathname.split("/")[1] || null;
    else if (host.endsWith("youtube.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (parts.length >= 2 && ["shorts","embed","live"].includes(parts[0])) id = parts[1] || null;
    }
    const start = parseStart(u.searchParams.get("t") || u.searchParams.get("start"));
    return id ? { id, start } : null;
  } catch { return null; }
}

export default function FeaturedVideo({
  video, // { id?, url?, title?, caption?, start? }
  eyebrow = "Featured Video",
  autoplayMs = Number(process.env.NEXT_PUBLIC_FEATURED_YT_AUTOPLAY_MS || "0"),
}) {
  const fallback = extractIdAndStart(process.env.NEXT_PUBLIC_FEATURED_YT_URL) ||
                   (process.env.NEXT_PUBLIC_FEATURED_YT_ID ? { id: process.env.NEXT_PUBLIC_FEATURED_YT_ID, start: 0 } : null);
  const parsed = video?.id ? { id: video.id, start: video.start||0 }
               : (video?.url ? extractIdAndStart(video.url) : null) || fallback;

  if (!parsed?.id) return null;

  const title = video?.title || process.env.NEXT_PUBLIC_FEATURED_YT_TITLE || "Featured video";
  const caption = video?.caption || process.env.NEXT_PUBLIC_FEATURED_YT_CAPTION || "";

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mb-3 text-xs uppercase tracking-wide text-slate-400">{eyebrow}</div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <LiteYouTube id={parsed.id} start={parsed.start} title={title} autoPlayOnIdleMs={autoplayMs} className="w-full" />
        </div>
        <div className="md:col-span-4 text-slate-300">
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          {caption ? <p className="mt-2 text-sm leading-relaxed">{caption}</p> : null}
          <a href={`https://youtu.be/${parsed.id}${parsed.start ? `?t=${parsed.start}` : ""}`} target="_blank" rel="noopener noreferrer"
             className="mt-4 inline-flex items-center text-sm font-medium text-sky-400 hover:text-sky-300">
            Watch on YouTube →
          </a>
        </div>
      </div>
    </section>
  );
}
