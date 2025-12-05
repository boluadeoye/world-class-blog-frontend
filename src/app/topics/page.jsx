import { fetchLatestArticles } from "../../lib/homeData";
import SearchHub from "../../components/topics/SearchHub";
import TopicsGrid from "../../components/topics/TopicsGrid";
import { LayoutGrid } from "lucide-react";

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

function getDescription(cat) {
  switch (cat) {
    case "Health": return "Energy, wellbeing, and biological systems.";
    case "Finance": return "Wealth building and financial psychology.";
    case "Technology": return "Software architecture and digital ecosystems.";
    case "Education": return "Accelerated learning and skill acquisition.";
    default: return "Curated insights and reflections.";
  }
}

export default async function TopicsPage() {
  const posts = await fetchLatestArticles(200).catch(() => []);
  const categoryMap = new Map();
  
  ["Health", "Finance", "Technology", "Education"].forEach(c => {
    categoryMap.set(c, { name: c, count: 0, posts: [], description: getDescription(c) });
  });

  (Array.isArray(posts) ? posts : []).forEach(p => {
    const catName = normalizeCategory(p);
    if (!categoryMap.has(catName)) {
      categoryMap.set(catName, { name: catName, count: 0, posts: [], description: getDescription(catName) });
    }
    categoryMap.get(catName).count += 1;
    categoryMap.get(catName).posts.push({ id: p.id || p.slug, slug: p.slug, title: p.title });
  });

  const topics = Array.from(categoryMap.values())
    .filter(t => t.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-24">
      
      {/* COMPACT HEADER */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono text-[10px] tracking-widest uppercase mb-4">
          <LayoutGrid size={12} /> Topics Index
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-white tracking-tight">
          The Knowledge Hub
        </h1>
      </div>
      
      {/* SEARCH (With Spacing) */}
      <div className="mb-16">
        <SearchHub />
      </div>

      {/* GRID */}
      <TopicsGrid topics={topics} />

    </main>
  );
}
