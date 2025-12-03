"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === FLOATING READING TIMER === */
function ReadingTimer() {
  const { scrollYProgress } = useScroll();
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setReadingProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-500/20"
    >
      <div className="relative w-5 h-5">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
          <path className="text-amber-400" strokeDasharray={`${readingProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
      <span className="text-xs font-bold text-white tracking-wider">{readingProgress}% READ</span>
    </motion.div>
  );
}

/* === ARTICLE HERO (With Beaming Lights) === */
export function ArticleHero({ post }) {
  if (!post) return null;

  const date = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden flex flex-col items-center text-center">
      
      {/* === BEAMING LIGHTS ATMOSPHERE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-[#020617]"></div>
        {/* Moving Beams */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[4s]"></div>
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-amber-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[6s]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <span className="px-5 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            {post.meta?.category || "Featured Story"}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.05] mb-10 tracking-tight drop-shadow-2xl"
        >
          {post.title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 border-y border-white/10 py-5 px-10 bg-white/5 backdrop-blur-sm rounded-full"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 p-[1px]">
               <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[10px] font-bold text-white">BA</div>
            </div>
            <span className="text-white font-bold tracking-wide">Boluwatife Adeoye</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-500"></div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-amber-400" />
            <span>{date}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-500"></div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-amber-400" />
            <span>{post.readTime || "5 min read"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* === CONTENT WRAPPER === */
export function ArticleContent({ children }) {
  const [isSaved, setIsSaved] = useState(false);
  const [justShared, setJustShared] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("saved_posts");
    if (saved) setIsSaved(saved.includes(window.location.pathname));
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url: window.location.href }); } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setJustShared(true);
      setTimeout(() => setJustShared(false), 2000);
    }
  };

  const handleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    if (newState) localStorage.setItem("saved_posts", (localStorage.getItem("saved_posts") || "") + window.location.pathname);
  };

  return (
    <div className="relative z-10 max-w-[800px] mx-auto px-6 pb-24">
      <ReadingTimer />
      
      {/* === PREMIUM TYPOGRAPHY CONTAINER === */}
      <article className="prose prose-xl prose-invert prose-slate max-w-none
        prose-headings:font-serif prose-headings:font-medium prose-headings:text-white prose-headings:text-center
        prose-p:text-slate-200 prose-p:leading-[2] prose-p:text-lg md:prose-p:text-xl prose-p:font-light prose-p:text-justify
        prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white prose-strong:font-bold
        prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:shadow-xl
        prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10 prose-img:w-full
        prose-li:text-slate-300 prose-li:marker:text-amber-500
      ">
        {children}
      </article>

      {/* Share / Action Bar */}
      <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group font-medium">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        
        <div className="flex gap-4">
          <button 
            onClick={handleShare}
            className="group relative p-4 rounded-full bg-slate-800/50 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all shadow-lg"
          >
            {justShared ? <Check size={20} /> : <Share2 size={20} />}
          </button>

          <button 
            onClick={handleSave}
            className={`p-4 rounded-full transition-all shadow-lg ${isSaved ? 'bg-amber-500 text-black' : 'bg-slate-800/50 hover:bg-white hover:text-black text-slate-300'}`}
          >
            <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
