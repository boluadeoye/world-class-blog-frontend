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
          setNews(data.items.slice(0, 10));
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
        
        {/* Section Header */}
        <div className="px-6 md:px-12 mb-8 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 shadow-inner">
              <Rss size={16} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-white leading-none mb-1 tracking-tight">Global Tech Feed</h3>
              <p className="font-sans text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Live Intelligence</p>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-3 overflow-x-auto pb-10 px-6 md:px-12 snap-x scroll-pl-6 md:scroll-pl-12 scrollbar-hide">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="min-w-[150px] md:min-w-[200px] h-[260px] rounded-xl bg-white/5 animate-pulse border border-white/5 flex-shrink-0" />
              ))
            : news.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  target="_blank"
                  className="group relative min-w-[150px] md:min-w-[200px] h-[260px] snap-start flex-shrink-0"
                >
                  {/* Card Container */}
                  <div className="h-full p-4 rounded-xl bg-slate-950 border border-white/10 hover:border-indigo-500/40 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg group-hover:shadow-xl group-hover:shadow-indigo-900/10 group-hover:-translate-y-1">
                    
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Top Row */}
                    <div className="relative z-10 flex justify-between items-start mb-3">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[7px] font-bold tracking-widest text-indigo-300 uppercase font-sans">
                        <Globe size={8} /> BBC
                      </span>
                      <ExternalLink size={10} className="text-slate-500 group-hover:text-white transition-colors" />
                    </div>

                    {/* Content - BOLD & CONFIDENT */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h4 className="font-serif text-base md:text-lg font-bold text-white leading-[1.1] line-clamp-5 group-hover:text-indigo-200 transition-colors tracking-tight drop-shadow-md">
                        {item.title}
                      </h4>
                      {/* Decorative Line */}
                      <div className="w-4 h-0.5 bg-indigo-500 mt-3 group-hover:w-8 transition-all duration-500"></div>
                    </div>
                    
                    {/* Bottom Row */}
                    <div className="relative z-10 mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[8px] font-sans font-bold text-slate-400 group-hover:text-indigo-300 transition-colors tracking-wide">
                        {new Date(item.pubDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                      </span>
                      <div className="flex items-center gap-1 text-[8px] font-extrabold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors font-sans">
                        <span>Read</span>
                        <ArrowRight size={8} className="group-hover:translate-x-1 transition-transform" />
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
