import { fetchLatestArticles } from "../../lib/homeData";
import Link from "next/link";

export const revalidate = 3600;

const toTitle = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

function normalizeCategory(p) {
  const known = ["health", "finance", "technology", "education"];
  let raw = p?.meta?.category || 
            (typeof p?.category === "string" ? p.category : p?.category?.name) || 
            (Array.isArray(p?.categories) && p?.categories[0]?.name) || 
            "";

  if (raw) {
    const low = String(raw).trim().toLowerCase();
    if (known.includes(low)) return toTitle(low);
    return toTitle(String(raw));
  }
  return "Other";
}

function descFor(cat) {
  switch (cat) {
    case "Health": return "Energy, wellbeing, mental clarity and the systems that sustain us.";
    case "Finance": return "Money, investing, personal finance and building resilient wealth.";
    case "Technology": return "Software, engineering, tools and the future of the web.";
    case "Education": return "Learning, teaching, skill‑building and accelerating growth.";
    default: return "Reflections, stories and everything that doesn’t fit a box.";
  }
}

export default async function Page() {
  const posts = await fetchLatestArticles(200).catch(() => []);
  const byCat = new Map([["Health", []], ["Finance", []], ["Technology", []], ["Education", []], ["Other", []]]);

  (Array.isArray(posts) ? posts : []).forEach(p => {
    const cat = normalizeCategory(p);
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat).push({ id: p?.id || p?.slug, slug: p?.slug, title: p?.title });
  });

  const cats = Array.from(byCat.keys()).filter(c => byCat.get(c).length > 0);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif text-white mb-8">Topics</h1>
        
        <div className="grid gap-8">
          {cats.map((c) => {
            const list = byCat.get(c) || [];
            return (
              <section key={c} className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                <header className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-serif text-white">{c}</h2>
                    <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
                      {list.length} {list.length === 1 ? "post" : "posts"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{descFor(c)}</p>
                </header>
                
                <ul className="space-y-3">
                  {list.slice(0, 5).map(p => (
                    <li key={p.id}>
                      <Link href={`/post/${p.slug}`} className="block text-slate-300 hover:text-amber-400 transition-colors text-base font-medium">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                  {list.length > 5 && (
                    <li className="pt-2">
                      <Link href={`/articles?category=${c}`} className="text-xs text-indigo-400 hover:text-indigo-300 uppercase tracking-wider font-bold">
                        View all {c} posts &rarr;
                      </Link>
                    </li>
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
