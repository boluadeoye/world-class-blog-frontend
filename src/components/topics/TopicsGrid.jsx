"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, Heart, BookOpen, Hash, FileText } from "lucide-react";

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

const getIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("tech")) return <Zap size={24} className="text-indigo-400" />;
  if (n.includes("finance")) return <TrendingUp size={24} className="text-emerald-400" />;
  if (n.includes("health")) return <Heart size={24} className="text-rose-400" />;
  if (n.includes("education")) return <BookOpen size={24} className="text-amber-400" />;
  return <Hash size={24} className="text-slate-400" />;
};

export default function TopicsGrid({ topics }) {
  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6"
    >
      {topics.map((topic) => (
        <motion.div key={topic.name} variants={cardVars}>
          <div className="group relative h-full p-8 rounded-[2rem] bg-slate-900/40 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-slate-900/80 hover:border-white/20 hover:shadow-2xl transition-all duration-500">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                {getIcon(topic.name)}
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-lg">
                {topic.posts.length} Posts
              </span>
            </div>
            
            {/* Title */}
            <h2 className="font-serif text-3xl text-white mb-2 tracking-tight group-hover:text-amber-100 transition-colors">
              {topic.name}
            </h2>
            <p className="text-sm text-slate-400 mb-6 line-clamp-2">{topic.description}</p>
            
            {/* POSTS LIST (The Functional Part) */}
            <ul className="space-y-3 mb-6">
              {topic.posts.slice(0, 4).map((post) => (
                <li key={post.id}>
                  <Link 
                    href={`/post/${post.slug}`}
                    className="block text-sm font-medium text-slate-300 hover:text-white hover:translate-x-1 transition-all truncate"
                  >
                    <span className="text-amber-500/50 mr-2">•</span>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer Link */}
            <Link 
              href={`/articles?category=${encodeURIComponent(topic.name)}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors"
            >
              View All <ArrowRight size={12} />
            </Link>

          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
