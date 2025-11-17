"use client";

import { useId } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * RichTextEditor (Markdown)
 * - Props:
 *    - value: string (markdown)
 *    - onChange: (newValue: string) => void
 */
export default function RichTextEditor({ value, onChange }) {
  const id = useId();
  const text = value || "";

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 text-[11px] text-slate-400 md:flex-row md:items-center md:justify-between">
        <span className="font-medium text-slate-300">Content</span>
        <span>
          Markdown supported: <code>**bold**</code>, <code>_italic_</code>,{" "}
          <code>`code`</code>, lists, links, tables and more.
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {/* Write */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={id}
            className="text-[11px] font-medium text-slate-400"
          >
            Write
          </label>
          <textarea
            id={id}
            className="h-64 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your post in Markdown..."
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium text-slate-400">
            Preview
          </span>
          <div className="h-64 overflow-y-auto rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100">
            {text ? (
              <div className="prose prose-invert prose-slate max-w-none text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {text}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Live preview will appear here as you type.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}