import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Hash, BookOpen, Terminal, TrendingUp, PenTool, Activity } from 'lucide-react';

const TOPICS = [
  { 
    id: '1', 
    title: 'Education', 
    query: 'education', 
    icon: BookOpen,
    desc: 'Strategies for lifelong learning and academic mastery.'
  },
  { 
    id: '2', 
    title: 'Technology', 
    query: 'technology', 
    icon: Terminal,
    desc: 'Software architecture, Next.js, and digital systems.'
  },
  { 
    id: '3', 
    title: 'Finance', 
    query: 'finance', 
    icon: TrendingUp,
    desc: 'Wealth building, market analysis, and capital allocation.'
  },
  { 
    id: '4', 
    title: 'Design', 
    query: 'design', 
    icon: PenTool,
    desc: 'UI/UX principles and aesthetic engineering.'
  },
  { 
    id: '5', 
    title: 'Lifestyle', 
    query: 'lifestyle', 
    icon: Activity,
    desc: 'Productivity, mindset, and personal philosophy.'
  }
];

export default function TopicsPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-slate-200 selection:bg-amber-500/30 pb-20">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Index Protocol</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
          Library <span className="italic text-slate-500">Categories</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          Access the archives by domain. Select a frequency below to filter the broadcast.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <Link 
            key={topic.id} 
            href={`/articles?q=${topic.query}`}
            className="group relative block h-full"
          >
            <div className="relative h-full p-8 rounded-2xl border border-white/5 bg-[#0B1120] hover:bg-[#111827] transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-1">
              
              <div className="flex flex-col h-full justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-[#020617] transition-colors duration-300">
                      <topic.icon size={24} strokeWidth={1.5} />
                    </div>
                    <Hash className="text-slate-700 group-hover:text-amber-500/50 transition-colors" size={20} />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-serif text-slate-100 group-hover:text-white transition-colors">
                      {topic.title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-amber-500/60 group-hover:text-amber-400 uppercase tracking-widest transition-colors">
                  <span>Access Logs</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
