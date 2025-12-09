"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Check, Hash, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === 1. LIGHTWEIGHT PROGRESS BAR === */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-50" style={{ scaleX }} />;
}

/* === 2. TOAST NOTIFICATION === */
function Toast({ message, show }) {
  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-2xl transition-all duration-300 z-50 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      {message}
    </div>
  );
}

/* === 3. CINEMATIC HERO (With Real Image) === */
export function ArticleHero({ post, readTime }) {
  if (!post) return null;
  
  const date = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const coverImage = post.meta?.cover || post.cover_image_url;

  return (
    <header className="relative min-h-[70vh] flex flex-col justify-end pb-20 px-6 overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        {coverImage ? (
          <img src={coverImage} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-900" />
        )}
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1.5 rounded-full border border-amber-500/50 bg-black/50 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
            {post.meta?.category || "Editorial"}
          </span>
        </div>
        
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl">
          {post.title}
        </h1>
        
        <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 font-medium border-t border-white/20 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 p-[1px]">
               <img src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" className="w-full h-full rounded-full object-cover" alt="BA" />
            </div>
            <span className="text-white">Boluwatife Adeoye</span>
          </div>
          <span className="text-slate-500">•</span>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-amber-500" />
            <span>{date}</span>
          </div>
          <span className="text-slate-500">•</span>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-amber-500" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* === 4. MAIN LAYOUT GRID === */
export function ArticleGrid({ children }) {
  const [toast, setToast] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url }); } catch (err) {}
    } else {
      navigator.clipboard.writeText(url);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }
  };

  return (
    <div className="relative bg-[#020617]">
      <ReadingProgress />
      <Toast message="Link copied to clipboard!" show={toast} />
      
      <div className="max-w-[900px] mx-auto px-6 py-16 relative z-10">
        
        {/* Content */}
        <main>
          {children}
        </main>

        {/* Bottom Actions */}
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group font-bold text-sm uppercase tracking-widest">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back Home</span>
          </Link>
          
          <div className="flex gap-4">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/5"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
