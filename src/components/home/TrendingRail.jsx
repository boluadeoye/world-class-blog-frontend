"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Zap } from "lucide-react";

const calculateReadTime = (text) => {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
};

export default function TrendingRail({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Zap size={20} className="text-amber-400" />
        </div>
        <h3 className="font-serif text-3xl text-white tracking-tight">Fresh Perspectives</h3>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
        {posts.map((post, i) => (
          <Link 
            key={post.slug} 
            href={`/post/${post.slug}`}
            className="group relative min-w-[280px] md:min-w-[320px] h-[380px] snap-start"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950 rounded-[2rem] border border-white/10 group-hover:border-amber-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
              
              {/* Abstract Background Art */}
              <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${i % 2 === 0 ? 'from-indigo-500/20' : 'from-amber-500/20'} to-transparent blur-[60px] rounded-full`}></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-700/20 blur-[40px] rounded-full"></div>
              </div>

              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-slate-300 uppercase mb-4">
                    {post.meta?.category || "Insight"}
                  </span>
                  <h4 className="font-serif text-2xl text-white leading-tight mb-3 group-hover:text-amber-200 transition-colors">
                    {post.title}
                  </h4>
                  <p className="font-sans text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Clock size={12} />
                    <span>{calculateReadTime(post.content)}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
