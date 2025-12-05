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

        <div className="flex gap-3 overflow-x-auto pb-10 px-6 md:px-12 snap-x scroll-pl-6 md:scroll-pl-12 scrollbar-hide">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="min-w-[150px] md:min-w-[200px] h-[260px] rounded-xl bg-white/5 animate-pulse border border-white/5 flex-shrink-0" />
              ))
            : news.map((item, idx) => {
                const bgImage = getImageUrl(item);
                
                return (
                  <Link
                    key={idx}
                    href={item.link}
                    target="_blank"
                    className="group relative min-w-[150px] md:min-w-[200px] h-[260px] snap-start flex-shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* === BACKGROUND IMAGE (Vivid & Bright) === */}
                    {bgImage ? (
                      <img 
                        src={bgImage} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-[1.5] contrast-[1.2] brightness-[1.25]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-900"></div>
                    )}

                    {/* === MINIMAL GRADIENT (Bottom 30% Only) === */}
                    {/* This ensures the top of the image is 100% clear */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-30% to-transparent"></div>
                    
                    {/* === CONTENT === */}
                    <div className="relative z-10 h-full p-4 flex flex-col justify-between">
                      
                      <div className="flex justify-between items-start">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-[7px] font-bold tracking-widest text-white uppercase font-sans backdrop-blur-md shadow-sm">
                          <Globe size={8} /> BBC
                        </span>
                      </div>

                      <div className="mt-auto">
                        <h4 className="font-serif text-sm md:text-base font-bold text-white leading-[1.2] line-clamp-4 mb-3 drop-shadow-lg">
                          {item.title}
                        </h4>
                        
                        <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                          <span className="text-[8px] font-sans font-bold text-slate-300 tracking-wide">
                            {new Date(item.pubDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                          </span>
                          <div className="flex items-center gap-1 text-[8px] font-extrabold text-white uppercase tracking-widest">
                            <span>Read</span>
                            <ArrowRight size={8} className="group-hover:translate-x-1 transition-transform" />
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
