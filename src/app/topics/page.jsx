import { fetchLatestArticles } from "../../lib/homeData";
import SearchHub from "../../components/topics/SearchHub";
import TopicsGrid from "../../components/topics/TopicsGrid";
import { LayoutGrid } from "lucide-react";

export const revalidate = 3600;

// Helper to normalize category names
const toTitle = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

function normalizeCategory(p) {
  const known = ["health", "finance", "technology", "education"];
  
  // Try to find category in meta, direct property, or array
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
    case "Health": return "Energy, wellbeing, mental clarity, and the biological systems that sustain peak performance.";
    case "Finance": return "Investment strategies, wealth building, and the psychology of money management.";
    case "Technology": return "Software architecture, emerging tools, and the future of digital ecosystems.";
    case "Education": return "Accelerated learning, skill acquisition, and the art of mastering new domains.";
    default: return "Curated insights, reflections, and stories that defy standard categorization.";
  }
}

export default async function TopicsPage() {
  // 1. Fetch Data
  const posts = await fetchLatestArticles(200).catch(() => []);
  
  // 2. Process Categories
  const categoryMap = new Map();

  // Initialize known categories to ensure they appear even if empty (optional, but good for structure)
  ["Health", "Finance", "Technology", "Education"].forEach(c => {
    categoryMap.set(c, { name: c, count: 0, description: getDescription(c) });
  });

  (Array.isArray(posts) ? posts : []).forEach(p => {
    const catName = normalizeCategory(p);
    if (!categoryMap.has(catName)) {
      categoryMap.set(catName, { name: catName, count: 0, description: getDescription(catName) });
    }
    categoryMap.get(catName).count += 1;
  });

  // Convert to array and sort: Known categories first, then by count
  const topics = Array.from(categoryMap.values())
    .filter(t => t.count > 0) // Only show topics with posts
    .sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-24">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 mb-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-[10px] tracking-widest uppercase">
            <LayoutGrid size={14} /> Topics Index
          </div>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-6">
          The Knowledge Hub
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Explore a curated library of expertise. Select a topic to dive into the archive.
        </p>
      </div>
      
      {/* SEARCH */}
      <SearchHub />

      {/* GRID (Client Component) */}
      <TopicsGrid topics={topics} />

    </main>
  );
}
