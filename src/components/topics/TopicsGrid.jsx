"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Zap, TrendingUp, Heart, BookOpen, Hash } from "lucide-react";

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVars = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

// Helper to pick icons based on topic name
const getIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("tech")) return <Zap size={24} className="text-indigo-400" />;
  if (n.includes("finance") || n.includes("wealth")) return <TrendingUp size={24} className="text-emerald-400" />;
  if (n.includes("health")) return <Heart size={24} className="text-rose-400" />;
  if (n.includes("education") || n.includes("learning")) return <BookOpen size={24} className="text-amber-400" />;
  return <Hash size={24} className="text-slate-400" />;
};

// Helper to pick gradient accents
const getAccent = (name) => {
  const n = name.toLowerCase();
  if (n.includes("tech")) return "bg-indigo-500";
  if (n.includes("finance")) return "bg-emerald-500";
  if (n.includes("health")) return "bg-rose-500";
  if (n.includes("education")) return "bg-amber-500";
  return "bg-slate-500";
};

export default function TopicsGrid({ topics }) {
  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {topics.map((topic) => (
        <motion.div key={topic.name} variants={cardVars}>
          <Link 
            href={`/articles?category=${encodeURIComponent(topic.name)}`} 
            className="group relative block h-full p-8 rounded-[2rem] bg-slate-900/40 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-slate-900/80 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1"
          >
            
            {/* Corner Accent */}
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-[3rem] opacity-10 group-hover:opacity-20 transition-opacity ${getAccent(topic.name)}`}></div>
            
            {/* Icon & Header */}
            <header className="relative z-10 flex items-start justify-between mb-6">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                {getIcon(topic.name)}
              </div>
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-lg">
                {topic.count} {topic.count === 1 ? "Post" : "Posts"}
              </span>
            </header>
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="font-serif text-3xl text-white mb-3 tracking-tight group-hover:text-amber-100 transition-colors">
                {topic.name}
              </h2>
              <p className="font-sans text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">
                {topic.description}
              </p>
            </div>
            
            {/* Footer Action */}
            <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group-hover:text-amber-400 transition-colors">
              <span>Explore Topic</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>

          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
