"use client";

function parseStart(value) {
  if (!value) return 0;
  // supports "90", "1m30s", "2h3m4s"
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  const re = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i;
  const m = re.exec(value);
  if (!m) return 0;
  const h = parseInt(m[1] || "0", 10);
  const min = parseInt(m[2] || "0", 10);
  const s = parseInt(m[3] || "0", 10);
  return h * 3600 + min * 60 + s;
}

function extractYouTubeInfo(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    let id = null;

    if (host === "youtu.be") {
      id = u.pathname.split("/")[1] || null;
    } else if (host.endsWith("youtube.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      if (u.pathname === "/watch") {
        id = u.searchParams.get("v");
      } else if (parts.length >= 2 && ["shorts", "embed", "live"].includes(parts[0])) {
        id = parts[1] || null;
      }
    }

    if (!id) return null;

    const start =
      parseStart(u.searchParams.get("t")) ||
      parseStart(u.searchParams.get("start"));

    return { id, start };
  } catch {
    return null;
  }
}

function buildEmbedUrl(id, start) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1"
  });
  if (start && start > 0) params.set("start", String(start));
  // use privacy-enhanced domain
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export default function YouTubeEmbed({ url, title = "YouTube video" }) {
  const info = extractYouTubeInfo(url);
  if (!info) return null;

  const src = buildEmbedUrl(info.id, info.start);

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg">
      <div className="relative pt-[56.25%]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}