import Link from "next/link";
import { Clock, ArrowUpRight, Tag } from "lucide-react";

export default function PostCard({ post, highlight = "" }) {
  const dateRaw = post.created_at || post.createdAt;
  const created = dateRaw ? new Date(dateRaw).toLocaleDateString() : "";
  const { excerpt, readingMinutes } = buildExcerptAndTime(post);
  const category = normalizeCategory(post.category);

  const titleHtml = hig(post.title || "", highlight);
  const excerptHtml = hig(excerpt || "", highlight);

  return (
    <Link
      href={`/post/${post.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/70 hover:bg-slate-900/90 shadow-lg shadow-slate-900/60 hover:shadow-sky-500/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-sky-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-300">
            <Tag className="h-3 w-3 text-sky-400" />
            {category.label}
          </span>
          {created && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="h-3 w-3" />
              <span>{created}</span>
            </div>
          )}
        </div>

        <h3
          className="text-base font-semibold text-slate-50 group-hover:text-sky-300 transition-colors sm:text-lg"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        {excerpt && (
          <p
            className="text-xs text-slate-300/90 line-clamp-3 sm:text-sm"
            dangerouslySetInnerHTML={{ __html: excerptHtml }}
          />
        )}

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>{readingMinutes} min read</span>
          <span className="inline-flex items-center gap-1 text-sky-400 group-hover:text-sky-300">
            Read article
            <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function normalizeCategory(raw) {
  const value = String(raw || "").trim().toLowerCase();
  switch (value) {
    case "health": return { value: "health", label: "Health" };
    case "finance": return { value: "finance", label: "Finance" };
    case "technology":
    case "tech": return { value: "technology", label: "Technology" };
    case "education": return { value: "education", label: "Education" };
    case "other":
    case "life":
    case "misc": return { value: "other", label: "Other" };
    default: return { value: "other", label: raw || "Other" };
  }
}

function buildExcerptAndTime(post) {
  const text = extractPlainText(post.content);
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const readingMinutes = Math.max(1, Math.round(words / 200));
  const excerpt = trimmed.length > 180 ? trimmed.slice(0, 177).trimEnd() + "…" : trimmed;
  return { excerpt, readingMinutes };
}

function extractPlainText(content) {
  if (!content) return "";
  if (typeof content === "object" && content.blocks) {
    return content.blocks.map((b) => (b.data && (b.data.text || b.data.caption)) || "").join(" ");
  }
  if (typeof content === "string") {
    const s = content.trim();
    if (s.startsWith("{") || s.startsWith("[")) {
      try {
        const parsed = JSON.parse(s);
        if (parsed && parsed.blocks) {
          return parsed.blocks.map((b) => (b.data && (b.data.text || b.data.caption)) || "").join(" ");
        }
      } catch {}
    }
    return markdownToPlainText(s);
  }
  return String(content);
}

function markdownToPlainText(md) {
  let text = String(md);
  text = text.replace(/```[\s\S]*?```/g, " ");
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  text = text.replace(/^#{1,6}\s*/gm, "");
  text = text.replace(/\*\*|__|\*|_/g, "");
  text = text.replace(/~~/g, "");
  text = text.replace(/\s+/g, " ");
  return text.trim();
}

function hig(str, q) {
  if (!q || q.trim().length < 2) return escapeHtml(str);
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${esc})`, "ig");
  return escapeHtml(str).replace(re, '<mark class="bg-sky-500/30 text-sky-100 rounded px-0.5">$1</mark>');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}