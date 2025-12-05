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
  // 1. Fetch Data
  const posts = await fetchLatestArticles(200).catch(() => []);
  
  // 2. Group Data
  const categoryMap = new Map();
  ["Health", "Finance", "Technology", "Education"].forEach(c => {
    categoryMap.set(c, { name: c, posts: [], description: getDescription(c) });
  });

  (Array.isArray(posts) ? posts : []).forEach(p => {
    const catName = normalizeCategory(p);
    if (!categoryMap.has(catName)) {
      categoryMap.set(catName, { name: catName, posts: [], description: getDescription(catName) });
    }
    // Add post to category list
    categoryMap.get(catName).posts.push({
      id: p.id || p.slug,
      slug: p.slug,
      title: p.title
    });
  });

  const topics = Array.from(categoryMap.values()).filter(t => t.posts.length > 0);

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-24">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 mb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-[10px] tracking-widest uppercase">
            <LayoutGrid size={14} /> Topics Index
          </div>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl text-white tracking-tight mb-4">
          The Knowledge Hub
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Curated collections of engineering, finance, and health insights.
        </p>
      </div>
      
      {/* SEARCH */}
      <SearchHub />

      {/* GRID (With Live Posts) */}
      <TopicsGrid topics={topics} />

    </main>
  );
}
