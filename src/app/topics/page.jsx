import { getPublicPosts } from "../../lib/api";

export const metadata = { title: "Topics | Adeoye Boluwatife" };

const TOPICS = [
  { key: "health", label: "Health", description: "Energy, wellbeing, mental clarity and the systems that sustain us." },
  { key: "finance", label: "Finance", description: "Money, investing, personal finance and building resilient wealth." },
  { key: "technology", label: "Technology", description: "Software, engineering, tools and the future of the web." },
  { key: "education", label: "Education", description: "Learning, teaching, skill‑building and accelerating growth." },
  { key: "other", label: "Other", description: "Reflections, stories and everything that doesn’t fit a box." },
];

export default async function TopicsPage() {
  let posts = [];
  try {
    posts = await getPublicPosts();
  } catch {}

  const counts = countByCategory(posts);

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Topics</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          What I write about
        </h1>
        <p className="max-w-2xl text-sm text-slate-300/90">
          My work lives at the intersection of code, health, money and learning. These are the main lenses I use to understand the world.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic) => (
          <a
            key={topic.key}
            href={`/articles?topic=${encodeURIComponent(topic.label)}`}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/60 hover:border-sky-500/60 transition"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-50 sm:text-base">{topic.label}</h2>
              <span className="inline-flex items-center rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                {counts[topic.key] || 0} posts
              </span>
            </div>
            <p className="text-xs text-slate-300/90">{topic.description}</p>
          </a>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 text-xs text-slate-300/90 sm:px-6 sm:py-5">
        <p>
          Looking for something specific? Head over to the{" "}
          <a href="/articles" className="text-sky-400 hover:text-sky-300 underline-offset-2 hover:underline">articles</a>{" "}
          page and filter by topic or search terms.
        </p>
      </section>
    </div>
  );
}

function countByCategory(posts) {
  const counts = { health: 0, finance: 0, technology: 0, education: 0, other: 0 };
  if (!Array.isArray(posts)) return counts;
  for (const post of posts) {
    const v = String(post.category || "").trim().toLowerCase();
    if (v === "health") counts.health++;
    else if (v === "finance") counts.finance++;
    else if (v === "technology" || v === "tech") counts.technology++;
    else if (v === "education") counts.education++;
    else counts.other++;
  }
  return counts;
}