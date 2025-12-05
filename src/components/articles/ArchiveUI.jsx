"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Calendar, Clock, Filter, X } from "lucide-react";
import Link from "next/link";

// Helper for read time
const getReadTime = (text) => {
  if (!text) return "1 min";
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200) + " min";
};

const categories = ["All", "Technology", "Finance", "Health", "Education"];

export default function ArchiveUI({ posts }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  // Filter Logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat = filter === "All" || (post.meta?.category || "Other") === filter;
      const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase()) || 
                           post.excerpt?.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [filter, query, posts]);

  const heroPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
      
      {/* === CONTROLS === */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                filter === cat
                  ? "bg-white text-slate-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative group w-full md:w-auto">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full opacity-20 group-hover:opacity-50 transition duration-500 blur"></div>
          <div className="relative flex items-center bg-slate-950 rounded-full border border-white/10 px-4 py-2.5 w-full md:w-[300px]">
            <Search size={16} className="text-slate-500 mr-3" />
            <input 
              type="text" 
              placeholder="Search the archive..." 
              className="bg-transparent outline-none text-sm text-white placeholder-slate-600 w-full font-medium"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-slate-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* === CONTENT AREA === */}
      <AnimatePresence mode="wait">
        {filteredPosts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/5"
          >
            <Filter size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-serif text-white">No entries found</h3>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search filters.</p>
          </motion.div>
        ) : (
          <motion.div 
            key={filter + query} // Force re-render on filter change for animation
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            
            {/* HERO POST (Only show if on first page/no query, or just always show top result) */}
            {heroPost && (
              <Link href={`/post/${heroPost.slug}`} className="group relative block mb-16">
                <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                  {/* Image */}
                  {heroPost.meta?.cover ? (
                    <img 
                      src={heroPost.meta.cover} 
                      alt={heroPost.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                        {heroPost.meta?.category || "Featured"}
                      </span>
                      <span className="text-slate-300 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> {getReadTime(heroPost.content)}
                      </span>
                    </div>
                    
                    <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-6 group-hover:text-amber-100 transition-colors">
                      {heroPost.title}
                    </h2>
                    
                    <p className="font-sans text-lg text-slate-300 line-clamp-2 max-w-2xl mb-8 leading-relaxed">
                      {heroPost.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest group-hover:gap-4 transition-all">
                      <span>Read Article</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* GRID POSTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post, i) => (
                <Link key={post.slug} href={`/post/${post.slug}`} className="group relative block h-full">
                  <div className="h-full p-8 rounded-[2rem] bg-slate-900/40 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-slate-900/80 hover:border-white/20 hover:shadow-2xl transition-all duration-500 flex flex-col">
                    
                    {/* Top Meta */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest border border-indigo-500/20 px-3 py-1 rounded-full bg-indigo-500/10">
                        {post.meta?.category || "Note"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl md:text-3xl text-slate-200 group-hover:text-white mb-4 leading-tight transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-sm text-slate-400 leading-relaxed line-clamp-3 mb-8 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold text-slate-500 group-hover:text-white transition-colors flex items-center gap-2">
                        Read <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[10px] font-mono text-slate-600">
                        {getReadTime(post.content)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
