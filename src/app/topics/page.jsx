"use client";
import { getLatestPosts } from "../../lib/api";
import Link from "next/link";
import { ArrowRight, FileText, LayoutGrid, Zap } from "lucide-react";
import SearchHub from "../../components/topics/SearchHub";
import { motion } from "framer-motion";

export const revalidate = 3600;

const toTitle = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
const isVideo = (p) => String(p?.type || "").toLowerCase() === "video" || !!(p?.meta?.youtubeUrl) || !!(p?.meta?.youtubeId);

function normalizeCategory(p){
  const known = ["health","finance","technology","education","others"];
  const raw = p?.meta?.category || (typeof p?.category === "string" ? p.category : (p?.category?.name || p?.category?.title || p?.category?.slug)) || (Array.isArray(p?.categories) && (p?.categories[0]?.name || p?.categories[0]?.title || p?.categories[0]?.slug)) || "";
  if (raw){
    const low = String(raw).trim().toLowerCase();
    if (known.includes(low)) return toTitle(low);
    return toTitle(String(raw));
  }
  const tags = Array.isArray(p?.tags) ? p.tags.map(t => String(t).toLowerCase()) : [];
  const hit = tags.find(t => known.includes(t));
  if (hit) return toTitle(hit);
  return "Other";
}

function descFor(cat){
  switch(cat){
    case "Health": return "Energy, wellbeing, mental clarity and the systems that sustain us.";
    case "Finance": return "Money, investing, personal finance and building resilient wealth.";
    case "Technology": return "Software, engineering, tools and the future of the web.";
    case "Education": return "Learning, teaching, skill‑building and accelerating growth.";
    default: return "Reflections, stories and everything that doesn’t fit a box.";
  }
}

// Staggered Container
const containerVars = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Card Animation
const cardVars = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};


export default async function Page(){
  const posts = await getLatestPosts(200).catch(()=>[]);
  const byCat = new Map([["Health",[]],["Finance",[]],["Technology",[]],["Education",[]],["Other",[]]]);

  (Array.isArray(posts) ? posts : [])
    .filter(p => !isVideo(p))
    .forEach(p=>{
      const cat = normalizeCategory(p);
      if (!byCat.has(cat)) byCat.set(cat, []);
      byCat.get(cat).push({ 
        id: p?.id || p?.slug, 
        slug: p?.slug, 
        title: p?.title, 
        excerpt: p?.excerpt 
      });
    });

  const cats = Array.from(byCat.keys()).filter(c => byCat.get(c).length > 0);
  
  return (
    <main className="min-h-dvh bg-slate-950 pt-20 pb-24">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 mb-16 pt-10 text-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-xs tracking-widest uppercase">
            <LayoutGrid size={16} /> Topics Index
          </div>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl text-white tracking-tight mb-4"
        >
          The Knowledge Hub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-xl mx-auto"
        >
          Explore a curated library of expertise, from scalable software design to financial empowerment.
        </motion.p>
      </div>
      
      {/* SEARCH BAR */}
      <SearchHub />

      {/* TOPICS GRID */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {cats.map((c, i)=> {
          const list = byCat.get(c) || [];
          const icon = c === "Technology" ? <Zap size={24} className="text-indigo-400" /> : <FileText size={24} className="text-amber-400" />;
          
          return (
            <motion.div key={c} variants={cardVars}>
              <Link href={`/articles?topic=${c.toLowerCase()}`} className="group relative block p-8 rounded-3xl bg-slate-900/50 border border-slate-700/70 backdrop-blur-sm shadow-xl hover:border-amber-500/50 transition-all duration-300 min-h-[220px]">
                
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl rounded-tr-3xl opacity-20 ${c === "Technology" ? 'bg-indigo-500' : 'bg-amber-500'}`}></div>
                
                <header className="relative z-10 flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">{icon}</div>
                  <div className="flex flex-col">
                    <h2 className="font-serif text-3xl text-white tracking-tight">{c}</h2>
                    <p className="text-xs font-mono text-slate-500 tracking-wider uppercase">{list.length} {list.length === 1 ? "ARTICLE" : "ARTICLES"}</p>
                  </div>
                </header>
                
                <p className="text-slate-400 text-base leading-relaxed mb-6">
                  {descFor(c)}
                </p>
                
                <div className="flex items-center text-amber-400 group-hover:text-amber-300 transition-colors font-bold">
                  View all <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </main>
  );
}
