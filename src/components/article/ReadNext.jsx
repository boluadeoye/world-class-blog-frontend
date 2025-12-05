"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles } from "lucide-react";

const calculateReadTime = (text) => {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

export default function ReadNext({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative py-24 px-6 border-t border-white/5 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Sparkles size={20} className="text-indigo-400" />
          <h3 className="font-serif text-3xl md:text-4xl text-white">Curated for You</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="group relative block h-full">
              <div className="relative h-full p-8 rounded-[2.5rem] bg-slate-900 border border-white/10 overflow-hidden transition-all duration-500 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/20">
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-300">
                      {post.meta?.category || "Article"}
                    </span>
                    <ArrowRight size={24} className="text-slate-600 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                  </div>

                  <h4 className="font-serif text-3xl text-slate-200 group-hover:text-white leading-tight mb-4 transition-colors">
                    {post.title}
                  </h4>

                  <p className="font-sans text-slate-400 text-base leading-relaxed line-clamp-2 mb-8">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <Clock size={12} />
                    <span>{calculateReadTime(post.content)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
