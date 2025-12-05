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

  const getImageUrl = (item) => {
    let url = null;
    if (item.enclosure && item.enclosure.link) url = item.enclosure.link;
    else if (item.thumbnail) url = item.thumbnail;
    else {
      const match = item.description?.match(/src="([^"]+)"/);
      if (match) url = match[1];
    }
    if (url && url.includes('bbc.co.uk')) {
      return url.replace('/240/', '/800/').replace('/320/', '/800/');
    }
    return url;
  };

  if (!loading && news.length === 0) return null;

  return (
    <section className="py-20 border-t border-white/5 bg-[#020617] relative overflow-hidden">
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

        {/* Horizontal Scroll Container (Ultra-Compact) */}
        <div className="flex gap-3 overflow-x-auto pb-10 px-6 md:px-12 snap-x scroll-pl-6 md:scroll-pl-12 scrollbar-hide">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="min-w-[140px] md:min-w-[180px] h-[240px] rounded-xl bg-white/5 animate-pulse border border-white/5 flex-shrink-0" />
              ))
            : news.map((item, idx) => {
                const bgImage = getImageUrl(item);
                
                return (
                  <Link
                    key={idx}
                    href={item.link}
                    target="_blank"
                    className="group relative min-w-[140px] md:min-w-[180px] h-[240px] snap-start flex-shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* === SPLIT LAYOUT: Image Top (40%), Glass Bottom (60%) === */}
                    
                    {/* 1. Image Section */}
                    <div className="h-[40%] relative overflow-hidden bg-slate-900">
                      {bgImage ? (
                        <img 
                          src={bgImage} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-110 saturate-125"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                      )}
                      {/* Source Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[6px] font-bold tracking-widest text-white uppercase font-sans backdrop-blur-md">
                          <Globe size={6} /> BBC
                        </span>
                      </div>
                    </div>

                    {/* 2. Glass Content Section */}
                    <div className="h-[60%] p-3 flex flex-col justify-between bg-slate-950 relative">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                      <div className="relative z-10">
                        <h4 className="font-serif text-sm font-bold text-white leading-[1.2] line-clamp-4 group-hover:text-indigo-300 transition-colors tracking-tight">
                          {item.title}
                        </h4>
                      </div>
                      
                      <div className="relative z-10 pt-2 border-t border-white/5 flex items-center justify-between mt-auto">
                        <span className="text-[8px] font-sans font-bold text-slate-500 uppercase tracking-wide">
                          {new Date(item.pubDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                          <ArrowRight size={8} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}
