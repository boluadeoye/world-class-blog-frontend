"use client";
import { motion } from "framer-motion";
import { Search, Terminal, ArrowRight } from "lucide-react";

export default function SearchHub() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="max-w-4xl mx-auto mb-16"
    >
      <form action="/articles" className="relative" role="search">
        <input
          name="q"
          type="search"
          placeholder="Search: System Design, Next.js, Financial Wellness..."
          className="w-full bg-slate-900/50 text-white placeholder-slate-500 border border-slate-700/80 rounded-2xl py-4 pl-14 pr-6 text-lg font-medium shadow-xl shadow-black/30 focus:border-indigo-500 transition-all outline-none"
          aria-label="Search posts"
        />
        <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
        
        <button 
          className="absolute right-3 top-3 bottom-3 flex items-center gap-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md" 
          type="submit"
        >
          <Terminal size={18} />
          <span className="hidden sm:inline">Run Query</span>
        </button>
      </form>
    </motion.div>
  );
}
