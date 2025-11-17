"use client";

function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();

    // https://youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      return u.pathname.split("/")[1] || null;
    }

    // https://youtube.com/watch?v=VIDEO_ID or m.youtube.com
    if (host.endsWith("youtube.com")) {
      // /watch?v=ID
      if (u.pathname === "/watch") {
        return u.searchParams.get("v") || null;
      }
      // /shorts/ID or /embed/ID or /live/ID
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && ["shorts", "embed", "live"].includes(parts[0])) {
        return parts[1] || null;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function thumbnailUrlFromId(id) {
  // Try high-res first (some videos won’t have maxres)
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  // Alternative: `maxresdefault.jpg`
}

export default function YouTubeCard({ url, title = "Watch on YouTube" }) {
  const id = extractYouTubeId(url);
  if (!id) {
    // Fallback: just a normal link
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 hover:text-sky-300 underline"
      >
        {title}
      </a>
    );
  }

  const thumb = thumbnailUrlFromId(id);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full"
    >
      <figure className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg shadow-slate-950/50 transition-all hover:shadow-sky-500/30">
        <img
          src={thumb}
          alt={title}
          className="block h-auto w-full object-cover"
          loading="lazy"
        />
        {/* gradient + play overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow group-hover:scale-105 transition">
            {/* play icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </div>
        </div>
        <figcaption className="p-3 text-xs text-slate-300">
          {title}
        </figcaption>
      </figure>
    </a>
  );
}