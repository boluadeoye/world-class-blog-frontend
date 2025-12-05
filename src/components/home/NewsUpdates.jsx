"use client";
import { useState, useEffect } from "react";
import { ExternalLink, Globe, Rss, ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";

const SOURCES = [
  { id: "cnn", name: "CNN", url: "http://rss.cnn.com/rss/edition.rss", color: "bg-red-600" },
  { id: "fox", name: "Fox News", url: "http://feeds.foxnews.com/foxnews/latest", color: "bg-blue-700" },
  { id: "punch", name: "Punch NG", url: "https://punchng.com/feed/", color: "bg-emerald-600" }
];

export default function NewsUpdates() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllNews() {
      try {
        const promises = SOURCES.map(source => 
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`)
            .then(res => res.json())
            .then(data => {
              if (!data.items) return [];
              return data.items.map(item => ({
                ...item,
                source: source.name,
                sourceColor: source.color,
                timestamp: new Date(item.pubDate).getTime()
              }));
            })
        );

        const results = await Promise.all(promises);
        const allNews = results.flat().sort((a, b) => b.timestamp - a.timestamp); // Sort by newest
        
        // Remove duplicates and limit to 15
        const uniqueNews = Array.from(new Map(allNews.map(item => [item.title, item])).values());
        setNews(uniqueNews.slice(0, 15));

      } catch (e) {
        console.error("News fetch failed", e);
      } finally {
        setLoading(false);
      }
    }
    fetchAllNews();
  }, []);

  const getImageUrl = (item) => {
    let url = null;
    if (item.enclosure && item.enclosure.link) url = item.enclosure.link;
    else if (item.thumbnail) url = item.thumbnail;
    else {
      const match = item.description?.match(/src="([^"]+)"/);
      if (match) url = match[1];
    }
    return url;
  };

  if (!loading && news.length === 0) return null;

  return (
    <section className="py-24 border-t border-white/5 bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 60%) pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="px-6 md:px-12 mb-10 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
              <Newspaper size={20} className="text-slate-200" />
            </div>
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-none mb-1.5 tracking-tight">Global Briefing</h3>
              <p className="font-sans text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Live Updates • CNN • Fox • Punch</p>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-12 px-6 md:px-12 snap-x scroll-pl-6 md:scroll-pl-12 scrollbar-hide">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="min-w-[200px] md:min-w-[240px] h-[340px] rounded-[1.5rem] bg-white/5 animate-pulse border border-white/5 flex-shrink-0" />
              ))
            : news.map((item, idx) => {
                const bgImage = getImageUrl(item);
                
                return (
                  <Link
                    key={idx}
                    href={item.link}
                    target="_blank"
                    className="group relative min-w-[200px] md:min-w-[240px] h-[340px] snap-start flex-shrink-0"
                  >
                    {/* === CARD CONTAINER === */}
                    <div className="relative h-full rounded-[1.5rem] overflow-hidden bg-slate-950 border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-white/5">
                      
                      {/* 1. IMAGE SECTION (Top 50%) */}
                      <div className="h-[50%] relative overflow-hidden bg-slate-900">
                        {bgImage ? (
                          <img 
                            src={bgImage} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-110 saturate-125"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <Globe size={32} className="text-white/10" />
                          </div>
                        )}
                        
                        {/* Source Badge (Floating) */}
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${item.sourceColor} text-white text-[8px] font-bold tracking-widest uppercase font-sans shadow-lg`}>
                            {item.source}
                          </span>
                        </div>
                      </div>

                      {/* 2. GLASS CONTENT SECTION (Bottom 50%) */}
                      <div className="h-[50%] p-5 flex flex-col justify-between bg-slate-950 relative">
                        {/* Glass Highlight */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        <div className="relative z-10">
                          <h4 className="font-serif text-lg text-white leading-[1.3] line-clamp-3 group-hover:text-slate-200 transition-colors tracking-tight">
                            {item.title}
                          </h4>
                        </div>
                        
                        <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                          <span className="text-[9px] font-sans font-bold text-slate-500 uppercase tracking-wide">
                            {new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowRight size={10} />
                          </div>
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
