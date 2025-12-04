'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Hash } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import SearchHub from '../../components/topics/SearchHub';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- MOCK DATA (Updated for the new theme) ---
const TOPICS = [
  { 
    id: '1', 
    title: 'Education', 
    slug: 'education', 
    count: 12, 
    description: 'Empowering minds through lifelong learning strategies.',
  },
  { 
    id: '2', 
    title: 'Technology', 
    slug: 'technology', 
    count: 8, 
    description: 'Navigating the digital frontier and software architecture.',
  },
  { 
    id: '3', 
    title: 'Philosophy', 
    slug: 'philosophy', 
    count: 5, 
    description: 'Deep dives into stoicism and modern thought.',
  },
  { 
    id: '4', 
    title: 'Finance', 
    slug: 'finance', 
    count: 15, 
    description: 'Building wealth and understanding market dynamics.',
  },
  { 
    id: '5', 
    title: 'Design', 
    slug: 'design', 
    count: 21, 
    description: 'The intersection of aesthetics and functionality.',
  },
  { 
    id: '6', 
    title: 'Lifestyle', 
    slug: 'lifestyle', 
    count: 7, 
    description: 'Curating a life of purpose and intentionality.',
  }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 50, damping: 20 }
  },
};

export default function TopicsPage() {
  return (
    // Deep Midnight Blue Background matching the screenshot
    <main className="min-h-screen w-full bg-[#020617] text-slate-200 selection:bg-amber-500/30">
      
      {/* Subtle Gradient Overlay for depth */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0f172a] to-[#020617] opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 space-y-8 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Library Index</span>
          </div>
          
          <div className="space-y-4">
            {/* Serif Font for that "Magazine" feel */}
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-white">
              Explore <span className="italic text-slate-400">Categories</span>
            </h1>
            <p className="max-w-xl text-lg text-slate-400 leading-relaxed md:mx-0 mx-auto font-sans">
              A curated collection of thoughts, guides, and insights. Select a domain to begin reading.
            </p>
          </div>

          {/* Integrated Search Hub */}
          <div className="pt-4 flex justify-center md:justify-start">
            <SearchHub />
          </div>
        </motion.div>

        {/* Grid Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TOPICS.map((topic) => (
            <motion.div key={topic.id} variants={itemVariants}>
              <Link href={`/topics/${topic.slug}`} className="group block h-full">
                <div className="relative h-full p-8 rounded-2xl border border-white/5 bg-[#0B1120] hover:bg-[#111827] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-amber-500/30 group-hover:shadow-2xl group-hover:shadow-amber-900/10">
                  
                  <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        {/* Gold Icon Box */}
                        <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-[#020617] transition-all duration-300">
                          <Hash size={20} strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold tracking-wider text-slate-500 group-hover:text-amber-500/80 transition-colors">
                          {topic.count} ARTICLES
                        </span>
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-serif text-slate-100 group-hover:text-white transition-colors">
                          {topic.title}
                        </h2>
                        <p className="mt-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                          {topic.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-amber-500/80 group-hover:text-amber-400 transition-colors uppercase tracking-wide">
                      <span>View Posts</span>
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
