"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Rss } from "lucide-react";
import Link from "next/link";

export default function NewsUpdates() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        // Using rss2json to fetch BBC Technology and The Verge without an API key
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/technology/rss.xml"
        );
        const data = await res.json();
        if (data.items) {
          setNews(data.items.slice(0, 6)); // Top 6 stories
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
    <section className="py-12 border-t border-slate-800/50 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <Rss size={18} className="text-indigo-400" />
          </div>
          <h3 className="font-serif text-2xl text-slate-200">Tech Updates</h3>
          <div className="h-px flex-1 bg-slate-800 ml-4"></div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-5 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="min-w-[280px] h-[160px] rounded-xl bg-slate-900/50 animate-pulse border border-slate-800" />
              ))
            : news.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  target="_blank"
                  className="group relative min-w-[300px] md:min-w-[340px] h-[180px] p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all snap-start flex flex-col justify-between overflow-hidden"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        BBC Tech
                      </span>
                      <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h4 className="font-medium text-slate-200 leading-snug line-clamp-3 group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-auto">
                    <Globe size={12} />
                    <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
