import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Hash, Database, Layers, Activity } from 'lucide-react';
import SearchHub from '../../components/topics/SearchHub';
// Import the REAL data fetcher you shared earlier
import { fetchLatestArticles } from "../../lib/homeData";

// --- TYPE DEFINITION (Loose for safety) ---
interface Post {
  id: string | number;
  title: string;
  category?: string;
  tags?: string[];
  [key: string]: any;
}

export default async function TopicsPage() {
  // 1. FETCH REAL DATA FROM YOUR BACKEND
  let posts: Post[] = [];
  let totalCount = 0;
  let categories: Record<string, number> = {};

  try {
    // Fetch up to 500 articles to analyze their categories
    const data = await fetchLatestArticles(500, "");
    if (Array.isArray(data)) {
      posts = data;
      totalCount = posts.length;

      // 2. DYNAMICALLY EXTRACT TOPICS
      // We scan every post. If it has a category, we count it.
      posts.forEach((post) => {
        const cat = post.category || post.tag || "General"; // Fallback if data is messy
        if (cat) {
          // Normalize string (e.g., "Tech" -> "tech")
          const key = String(cat).trim();
          categories[key] = (categories[key] || 0) + 1;
        }
      });
    }
  } catch (e) {
    console.error("Failed to fetch topics:", e);
    // Fallback is handled by empty arrays
  }

  // 3. PREPARE DISPLAY DATA
  // If we found real categories in the DB, use them. 
  // If not (e.g. posts have no tags), use the Standard Navigation Map but inject REAL counts if possible.
  const hasRealCategories = Object.keys(categories).length > 1;

  const DISPLAY_TOPICS = hasRealCategories 
    ? Object.entries(categories).map(([name, count], idx) => ({
        id: `dyn-${idx}`,
        title: name,
        query: name.toLowerCase(),
        count: count,
        desc: `Browse ${count} articles in ${name}.`
      }))
    : [
        // FALLBACK: If DB has posts but no category tags, we show standard sections
        { id: '1', title: 'Education', query: 'education', count: 0, desc: 'Academic and instructional archives.' },
        { id: '2', title: 'Technology', query: 'technology', count: 0, desc: 'Engineering and software protocols.' },
        { id: '3', title: 'Finance', query: 'finance', count: 0, desc: 'Market analysis and capital.' },
        { id: '4', title: 'Lifestyle', query: 'lifestyle', count: 0, desc: 'Personal philosophy and design.' },
      ];

  return (
    <main className="min-h-screen w-full bg-[#020617] text-slate-200 selection:bg-amber-500/30 pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className={`w-1.5 h-1.5 rounded-full ${totalCount > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{totalCount > 0 ? 'System Online' : 'Connecting...'}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-white">
              Index <span className="italic text-slate-600">Protocol</span>
            </h1>
            
            <div className="flex items-center gap-4 text-slate-400 text-sm font-mono">
              <div className="flex items-center gap-2">
                <Database size={14} />
                <span>{totalCount} ENTRIES FOUND</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <Activity size={14} />
                <span>LIVE FEED</span>
              </div>
            </div>
          </div>

          {/* --- RESTORED SEARCH BAR --- */}
          <div className="w-full md:w-auto min-w-[300px]">
            <SearchHub />
          </div>
        </div>
      </div>

      {/* --- DYNAMIC GRID SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DISPLAY_TOPICS.map((topic) => (
          <Link 
            key={topic.id} 
            href={`/articles?q=${topic.query}`}
            className="group relative block h-full"
          >
            <div className="relative h-full p-8 rounded-2xl border border-white/5 bg-[#0B1120] hover:bg-[#111827] transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-amber-900/10">
              
              <div className="flex flex-col h-full justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-[#020617] transition-colors duration-300">
                      <Layers size={24} strokeWidth={1.5} />
                    </div>
                    {/* Show Real Count if available */}
                    {topic.count > 0 && (
                      <span className="text-xs font-mono text-amber-500/60 border border-amber-500/20 px-2 py-1 rounded">
                        {topic.count} POSTS
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-serif text-slate-100 group-hover:text-white transition-colors capitalize">
                      {topic.title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed line-clamp-2">
                      {topic.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 group-hover:text-amber-400 uppercase tracking-widest transition-colors">
                  <span>Access Category</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* --- LATEST RAW FEED (Proof of Connection) --- */}
      {posts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-20 border-t border-white/5 pt-12">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Latest Ingested Data</h3>
          <div className="space-y-4">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/articles/${post.slug || post.id}`} className="block group">
                <div className="flex items-center justify-between py-4 border-b border-white/5 hover:border-amber-500/30 transition-colors">
                  <span className="text-lg text-slate-300 group-hover:text-amber-400 font-serif truncate max-w-2xl">
                    {post.title}
                  </span>
                  <span className="text-xs text-slate-600 font-mono hidden md:block">
                    ID: {post.id}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
