import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Terminal, TrendingUp, PenTool, Activity, Layers } from 'lucide-react';
import SearchHub from '../../components/topics/SearchHub';

// --- CONFIGURATION ---
const TOPIC_CARDS = [
  { 
    id: 'edu', 
    title: 'Education', 
    slug: 'education',
    icon: BookOpen,
    color: 'text-blue-400',
    desc: 'Lifelong learning & academic mastery.'
  },
  { 
    id: 'tech', 
    title: 'Technology', 
    slug: 'technology',
    icon: Terminal,
    color: 'text-emerald-400',
    desc: 'Next.js, Systems, and Code.'
  },
  { 
    id: 'fin', 
    title: 'Finance', 
    slug: 'finance',
    icon: TrendingUp,
    color: 'text-amber-400',
    desc: 'Capital allocation & markets.'
  },
  { 
    id: 'des', 
    title: 'Design', 
    slug: 'design',
    icon: PenTool,
    color: 'text-purple-400',
    desc: 'Aesthetics & User Experience.'
  },
  { 
    id: 'life', 
    title: 'Lifestyle', 
    slug: 'lifestyle',
    icon: Activity,
    color: 'text-rose-400',
    desc: 'Philosophy & Personal Growth.'
  },
  { 
    id: 'misc', 
    title: 'General', 
    slug: 'general',
    icon: Layers,
    color: 'text-slate-400',
    desc: 'Uncategorized thoughts.'
  }
];

export default function TopicsGridPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-slate-200 selection:bg-amber-500/30 pb-24">
      
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Library Index</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white">
              Explore <span className="italic text-slate-600">Domains</span>
            </h1>
          </div>
          <div className="w-full md:w-auto min-w-[300px]">
            <SearchHub />
          </div>
        </div>
      </div>

      {/* --- THE BEAUTIFUL GRID --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPIC_CARDS.map((topic) => (
          <Link 
            key={topic.id} 
            href={`/topics/${topic.slug}`}
            className="group relative block h-full"
          >
            {/* Card Container */}
            <div className="relative h-full p-8 rounded-3xl border border-white/5 bg-[#0B1120] overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50">
              
              {/* Subtle Gradient Blob Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.color.replace('text-', 'from-')}/10 to-transparent blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                
                {/* Icon & Title */}
                <div className="space-y-6">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500 ${topic.color}`}>
                    <topic.icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-serif text-slate-100 group-hover:text-white transition-colors">
                      {topic.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed font-medium">
                      {topic.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-600 group-hover:text-amber-500 uppercase transition-colors">
                    View Collection
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-amber-500 group-hover:text-[#020617] transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
