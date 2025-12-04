'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Terminal, TrendingUp, PenTool, Activity, Layers, ArrowRight } from 'lucide-react';
import SearchHub from '../../components/topics/SearchHub';

const TOPICS = [
  { id: 'edu', title: 'Education', link: '/articles?q=Education', icon: BookOpen, desc: 'Lifelong learning strategies.' },
  { id: 'tech', title: 'Technology', link: '/articles?q=Technology', icon: Terminal, desc: 'Software and digital systems.' },
  { id: 'fin', title: 'Finance', link: '/articles?q=Finance', icon: TrendingUp, desc: 'Markets and capital allocation.' },
  { id: 'des', title: 'Design', link: '/articles?q=Design', icon: PenTool, desc: 'Aesthetics and UI engineering.' },
  { id: 'life', title: 'Lifestyle', link: '/articles?q=Lifestyle', icon: Activity, desc: 'Philosophy and personal growth.' },
  { id: 'all', title: 'Browse All', link: '/articles', icon: Layers, desc: 'View the complete archive.' }
];

export default function TopicsPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-slate-200 p-6 md:p-12 pt-24">
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-serif text-white">Topics</h1>
            <p className="text-slate-400 max-w-xl">Explore the archives by category.</p>
          </div>
          <div className="w-full md:w-auto min-w-[320px]">
            <SearchHub />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <Link key={topic.id} href={topic.link} className="group block">
            <div className="h-full p-8 rounded-2xl bg-[#0B1120] border border-white/5 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-lg bg-white/5 text-amber-500 group-hover:bg-amber-500 group-hover:text-[#020617] transition-colors duration-300">
                  <topic.icon size={24} />
                </div>
                <ArrowRight className="text-slate-600 group-hover:text-amber-500 transition-colors" size={20} />
              </div>
              <h2 className="text-2xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">{topic.title}</h2>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{topic.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
