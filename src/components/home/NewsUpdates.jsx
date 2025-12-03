"use client";
import { useState, useEffect } from "react";
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
    <section className="py-24 border-t border-white/5 bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-radial-gradient(circle at 50% 50%, rgba(99,102,241,0.03), transparent 60%) pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="px-6 md:px-12 mb-12 flex items-end justify-between">
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
              <Rss size={20} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-none mb-2 tracking-tight">Global Tech Feed</h3>
              <p className="font-sans text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">Live Intelligence</p>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        {/* Fixed Alignment: Padding matches header exactly. scroll-pl-6 ensures snap alignment is flush. */}
        <div className="flex gap-6 overflow-x-auto pb-12 px-6 md:px-12 snap-x scroll-pl-6 md:scroll-pl-12 scrollbar-hide">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="min-w-[300px] md:min-w-[380px] h-[240px] rounded-2xl bg-white/5 animate-pulse border border-white/5 flex-shrink-0" />
              ))
            : news.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  target="_blank"
                  className="group relative min-w-[300px] md:min-w-[380px] h-[240px] snap-start flex-shrink-0"
                >
                  {/* Card Container */}
                  <div className="h-full p-8 rounded-2xl bg-slate-950 border border-white/10 hover:border-indigo-500/40 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-indigo-900/10">
                    
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Top Row */}
                    <div className="relative z-10 flex justify-between items-start mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold tracking-widest text-indigo-300 uppercase font-sans">
                        <Globe size={10} /> BBC Tech
                      </span>
                      <ExternalLink size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                    </div>

                    {/* Content - MATURE FONT (Serif) */}
                    <div className="relative z-10 flex-1">
                      <h4 className="font-serif text-2xl text-slate-200 leading-snug line-clamp-3 group-hover:text-white transition-colors tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                    
                    {/* Bottom Row */}
                    <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-sans font-medium text-slate-500 group-hover:text-indigo-400 transition-colors tracking-wide">
                        {new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest group-hover:text-slate-300 transition-colors font-sans">
                        <span>Read Brief</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
