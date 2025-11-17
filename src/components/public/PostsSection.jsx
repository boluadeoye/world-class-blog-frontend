"use client";

import { useMemo, useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import Reveal from "./Reveal";
import { Search } from "lucide-react";

const TOPICS = ["All", "Health", "Finance", "Technology", "Education", "Other"];

export default function PostsSection({ posts, initialSelectedTopic }) {
  const loading = !Array.isArray(posts);
  const [selected, setSelected] = useState(initialSelectedTopic || "All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (initialSelectedTopic && TOPICS.includes(initialSelectedTopic)) {
      setSelected(initialSelectedTopic);
    }
  }, [initialSelectedTopic]);

  // Plain text (markdown/Editor.js JSON)
  const extractText = (content) => {
    if (!content) return "";
    if (typeof content === "object" && content.blocks) {
      return content.blocks
        .map((b) => (b.data && (b.data.text || b.data.caption)) || "")
        .join(" ");
    }
    let s = String(content);
    if (s.startsWith("{") || s.startsWith("[")) {
      try {
        const parsed = JSON.parse(s);
        if (parsed && parsed.blocks) {
          return parsed.blocks
            .map((b) => (b.data && (b.data.text || b.data.caption)) || "")
            .join(" ");
        }
      } catch {}
    }
    s = s.replace(/```[\s\S]*?```/g, " ");
    s = s.replace(/`([^`]+)`/g, "$1");
    s = s.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");
    s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    s = s.replace(/^#{1,6}\s*/gm, "");
    s = s.replace(/\*\*|__|\*|_/g, "");
    s = s.replace(/~~/g, "");
    s = s.replace(/\s+/g, " ");
    return s.trim();
  };

  // Tags from post.tags or #hashtags
  const deriveTags = (post) => {
    if (Array.isArray(post?.tags) && post.tags.length) {
      return post.tags.map((t) => String(t).toLowerCase());
    }
    const txt = typeof post?.content === "string" ? post.content : "";
    const tags = [];
    const re = /(^|\s)#([a-z0-9-]{2,})\b/gi;
    let m;
    while ((m = re.exec(txt))) tags.push(m[2].toLowerCase());
    return tags;
  };

  const filtered = useMemo(() => {
    if (loading) return [];
    let list = posts;

    if (selected !== "All") {
      list = list.filter((post) => {
        const v = String(post.category || "").trim().toLowerCase();
        if (selected === "Health") return v === "health";
        if (selected === "Finance") return v === "finance";
        if (selected === "Technology") return v === "technology" || v === "tech";
        if (selected === "Education") return v === "education";
        if (selected === "Other")
          return (
            !v ||
            ["other", "life", "misc"].includes(v) ||
            !["health", "finance", "technology", "tech", "education"].includes(v)
          );
        return true;
      });
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((post) => {
        const t = String(post.title || "").toLowerCase();
        const s = String(post.slug || "").toLowerCase();
        const contentText = extractText(post.content).toLowerCase();
        const tags = deriveTags(post);
        const tagHit = tags.some((tag) => tag.includes(q));
        return t.includes(q) || s.includes(q) || contentText.includes(q) || tagHit;
      });
    }

    return list;
  }, [loading, posts, selected, query]);

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-3">
        <h2 className="font-display text-[18px] font-semibold text-slate-50 sm:text-[20px]">
          Latest posts
        </h2>
      </div>

      {/* Filters + Search (scrollable chips, no scrollbar) */}
      <div className="mb-4 space-y-3">
        {/* Full-bleed scroll area on mobile */}
        <div className="-mx-4 sm:mx-0">
          <div className="px-4 sm:px-0">
            <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar py-1">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelected(topic)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-[12px] transition ${
                    selected === topic
                      ? "border-sky-500/80 bg-sky-500 text-sky-950 shadow-sm shadow-sky-500/50"
                      : "border-slate-700/80 bg-slate-900/80 text-slate-200 hover:border-sky-500/70 hover:text-sky-100"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search field — compact and subtle */}
        <div className="relative mt-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, slug, tags…"
            className="w-full rounded-full border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-[14px] text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Reveal key={post.id ?? post.slug}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-300">No posts match your search.</p>
      )}
    </section>
  );
}