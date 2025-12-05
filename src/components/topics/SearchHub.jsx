"use client";
import { motion } from "framer-motion";
import { Search, Terminal } from "lucide-react";

export default function SearchHub() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="max-w-3xl mx-auto mb-16"
    >
      <form action="/articles" className="relative group" role="search">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
        <div className="relative flex items-center bg-slate-900 rounded-2xl border border-white/10 shadow-2xl">
          <Search size={20} className="absolute left-5 text-slate-500" />
          <input
            name="q"
            type="search"
            placeholder="Search topics, tags, or keywords..."
            className="w-full bg-transparent text-white placeholder-slate-500 py-4 pl-14 pr-32 text-base outline-none rounded-2xl"
            aria-label="Search posts"
          />
          <button 
            className="absolute right-2 top-2 bottom-2 flex items-center gap-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium transition-all border border-white/5" 
            type="submit"
          >
            <Terminal size={16} />
            <span className="hidden sm:inline text-sm">Search</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
