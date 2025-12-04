'use client';

import { motion } from "framer-motion";
import { Search, Terminal } from "lucide-react";

export default function SearchHub() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="relative w-full max-w-2xl"
    >
      <form action="/articles" className="relative group">
        {/* Gold Ambient Glow */}
        <div className="absolute -inset-0.5 bg-amber-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
        
        {/* Midnight Glass Container */}
        <div className="relative flex items-center bg-[#0B1120]/80 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-2 transition-all duration-300 group-hover:border-amber-500/40 group-hover:bg-[#0B1120]/90">
          <Search className="ml-4 text-amber-500/70 w-5 h-5" />
          
          <input
            name="q"
            type="search"
            placeholder="Search the archives..."
            className="w-full bg-transparent border-none text-slate-200 placeholder-slate-500 focus:ring-0 px-4 py-3 text-base outline-none font-sans"
            autoComplete="off"
          />
          
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Terminal size={16} />
            <span className="text-sm font-medium tracking-wide">QUERY</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
