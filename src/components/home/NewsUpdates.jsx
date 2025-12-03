"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Rss, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewsUpdates() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/technology/rss.xml"
        );
        const data = await res.json();
        if (data.items) {
          setNews(data.items.slice(0, 6));
        }
      } catch (e) {
        console.error("News fetch failed", e);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (!loading && news.length === 0) return null;

  return (
    <section className="py-20 border-t border-white/5 bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-radial-gradient(circle at 50% 50%, rgba(99,102,241,0.03), transparent 60%) pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header (Aligned) */}
        <div className="px-6 md:px-12 mb-10 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <Rss size={20} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-none mb-1">Global Tech Feed</h3>
              <p className="font-sans text-xs font-bold text-slate-500 tracking-widest uppercase">Live Updates</p>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-600 uppercase tracking-widest">
            <span>Scroll</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Horizontal Scroll Container (Fixed Alignment) */}
        {/* We use padding on the container itself to ensure the first item aligns perfectly */}
        <div className="flex gap-6 overflow-x-auto pb-12 px-6 md:px-12 snap-x scrollbar-hide">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="min-w-[300px] md:min-w-[360px] h-[200px] rounded-3xl bg-white/5 animate-pulse border border-white/5" />
              ))
            : news.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  target="_blank"
                  className="group relative min-w-[300px] md:min-w-[360px] h-[220px] snap-start"
                >
                  {/* Card Container */}
                  <div className="h-full p-6 rounded-[2rem] bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 hover:border-indigo-500/50 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-indigo-900/20">
                    
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Top Row */}
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-indigo-300 uppercase backdrop-blur-md">
                        <Globe size={10} /> BBC Tech
                      </span>
                      <ExternalLink size={16} className="text-slate-600 group-hover:text-white transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-4">
                      <h4 className="font-serif text-xl md:text-2xl text-slate-200 leading-snug line-clamp-3 group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    
                    {/* Bottom Row */}
                    <div className="relative z-10 mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">
                        {new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider group-hover:text-slate-400 transition-colors">
                        Read Story
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
