"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon } from "lucide-react";

const SHARE_TARGETS = [
  {
    id: "twitter",
    label: "X / Twitter",
    buildUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    buildUrl: (url, title) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    buildUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
];

export default function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await handleCopy();
      }
    } catch {
      // User cancelled or not supported
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800">
          <Share2 className="h-3.5 w-3.5 text-sky-400" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
            Share this article
          </p>
          <p className="text-[11px] text-slate-400">
            Help someone else find a useful idea today.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleWebShare}
          className="inline-flex items-center gap-1 rounded-full border border-sky-500/70 bg-sky-500 px-3 py-1 text-[11px] font-medium text-sky-950 shadow-sm shadow-sky-500/60 hover:bg-sky-400 transition"
        >
          <Share2 className="h-3 w-3" />
          <span>Quick share</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-sky-500/70 hover:text-sky-100 transition"
        >
          <LinkIcon className="h-3 w-3" />
          <span>{copied ? "Copied!" : "Copy link"}</span>
        </button>

        {SHARE_TARGETS.map((target) => (
          <a
            key={target.id}
            href={target.buildUrl(url, title)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-sky-500/70 hover:text-sky-100 transition"
          >
            {target.label}
          </a>
        ))}
      </div>
    </div>
  );
}