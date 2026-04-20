"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ title, tag, link, className, isHero }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`group relative bg-white rounded-[2.5rem] border border-black/[0.03] shadow-sm hover:shadow-[0_40px_80px_rgba(139,38,50,0.08)] transition-all overflow-hidden flex flex-col ${className}`}
    >
      <div className="p-10 md:p-14 flex flex-col h-full justify-between relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-burgundy/40 group-hover:text-burgundy transition-colors">
              {tag}
            </span>
          </div>
          <h3 className={`${isHero ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'} font-serif text-ink leading-tight tracking-tighter`}>
            {title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mt-12">
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink/20 group-hover:text-ink/50 transition-colors">View Case Study</span>
          <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-burgundy group-hover:text-white transition-all duration-700 ease-out">
            <ArrowUpRight size={24} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Expensive Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blush/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.a>
  );
}
