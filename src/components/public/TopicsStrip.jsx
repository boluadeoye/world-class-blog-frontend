"use client";

const TOPICS = ["Health", "Finance", "Technology", "Education", "Other"];

export default function TopicsStrip() {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        Topics I write about
      </p>
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => (
          <a
            key={topic}
            href={`/articles#posts`} // simple link; filtering lives on the articles page
            className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-200 shadow-sm shadow-slate-900/60 hover:border-sky-500/70 hover:text-sky-100 transition"
          >
            {topic}
          </a>
        ))}
      </div>
    </div>
  );
}