"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import YouTubeEmbed from "./YouTubeEmbed";

/**
 * PostRenderer
 * - Accepts `data` which may be:
 *   - markdown string (preferred)
 *   - Editor.js JSON (legacy) – we extract plain text
 * - Detects YouTube links and renders an inline player
 */
export default function PostRenderer({ data }) {
  if (!data) return null;

  let markdown = "";

  if (typeof data === "string") {
    markdown = data;
  } else if (data && Array.isArray(data.blocks)) {
    // Editor.js JSON fallback (basic text extraction)
    markdown = data.blocks
      .map((b) => (b.data && (b.data.text || b.data.caption)) || "")
      .join("\n\n");
  } else {
    markdown = String(data);
  }

  // helper: is a ReactMarkdown anchor node a YouTube link?
  function getYouTubeHrefFromNode(node) {
    try {
      const href = node?.properties?.href || "";
      const u = new URL(href);
      const host = u.hostname.replace(/^www\./, "").toLowerCase();
      if (host === "youtu.be" || host.endsWith("youtube.com")) return href;
    } catch {}
    return null;
  }

  const components = {
    // If a paragraph is a single YouTube link, render the player (not wrapped in <p>)
    p({ node, children }) {
      const c = node?.children || [];
      if (
        c.length === 1 &&
        c[0].tagName === "a" &&
        getYouTubeHrefFromNode(c[0])
      ) {
        const href = c[0].properties.href;
        const txt =
          (c[0].children &&
            c[0].children[0] &&
            typeof c[0].children[0].value === "string" &&
            c[0].children[0].value) ||
          "YouTube video";
        return <YouTubeEmbed url={href} title={txt} />;
      }
      return <p>{children}</p>;
    },
    // Inline YouTube links -> embed too (instead of a text link)
    a({ node, children, href }) {
      try {
        const u = new URL(href || "");
        const host = u.hostname.replace(/^www\./, "").toLowerCase();
        if (host === "youtu.be" || host.endsWith("youtube.com")) {
          const txt =
            (children && typeof children[0] === "string" && children[0]) ||
            "YouTube video";
          return <YouTubeEmbed url={href} title={txt} />;
        }
      } catch {}
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-sky-300 underline"
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className="prose prose-invert prose-slate max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}