"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Check, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === PROGRESS BAR === */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-indigo-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

/* === ARTICLE HERO === */
export function ArticleHero({ post }) {
  if (!post) return null;

  const date = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <span className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            {post.meta?.category || "Editorial"}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] mb-8"
        >
          {post.title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-slate-400 border-t border-b border-white/10 py-4 px-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 overflow-hidden flex items-center justify-center text-[10px] text-white font-bold">
               BA
            </div>
            <span className="text-slate-200 font-medium">Boluwatife Adeoye</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{post.readTime || "5 min read"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* === CONTENT WRAPPER (With Share & Save Logic) === */
export function ArticleContent({ children }) {
  const [isSaved, setIsSaved] = useState(false);
  const [justShared, setJustShared] = useState(false);

  // Check local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("saved_posts");
    if (saved) {
      // Simple check if current URL is in saved list (mock logic for UI)
      setIsSaved(saved.includes(window.location.pathname));
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      setJustShared(true);
      setTimeout(() => setJustShared(false), 2000);
    }
  };

  const handleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    // In a real app, you'd save the slug/ID to localStorage array
    if (newState) {
      // Mock save
      localStorage.setItem("saved_posts", (localStorage.getItem("saved_posts") || "") + window.location.pathname);
    }
  };

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
      <ReadingProgress />
      
      <article className="prose prose-xl prose-invert prose-slate 
        prose-headings:font-serif prose-headings:font-medium prose-headings:text-white 
        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-light
        prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white prose-strong:font-bold
        prose-blockquote:border-l-amber-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
        prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10
        prose-code:text-emerald-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
      ">
        {children}
      </article>

      {/* Share / Action Bar */}
      <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        
        <div className="flex gap-4">
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="group relative p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Share this article"
          >
            {justShared ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
            {justShared && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-emerald-500 text-black px-2 py-1 rounded font-bold">
                Copied!
              </span>
            )}
          </button>

          {/* Save Button */}
          <button 
            onClick={handleSave}
            className={`p-3 rounded-full transition-colors ${isSaved ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'}`}
            title={isSaved ? "Saved" : "Save for later"}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
