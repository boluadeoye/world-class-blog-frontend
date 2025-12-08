"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import ArticleActions from "./ArticleActions"; // Import the new component

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
      className="fixed top-6 right-6 z-[100] hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-500/20 pointer-events-none"
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

/* === ARTICLE HERO === */
export function ArticleHero({ post }) {
  if (!post) return null;

  const date = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <section className="relative pt-28 pb-12 px-6 overflow-hidden flex flex-col items-center text-center z-10">
      
      {/* === ATMOSPHERE (Pointer Events None) === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-[#020617]"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[4s]"></div>
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-amber-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[6s]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <span className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            {post.meta?.category || "Featured Story"}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl"
        >
          {post.title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-slate-400 border-y border-white/10 py-4 px-8 bg-white/5 backdrop-blur-sm rounded-full"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 p-[1px]">
               <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[8px] font-bold text-white">BA</div>
            </div>
            <span className="text-slate-200 font-medium tracking-wide">Boluwatife Adeoye</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <Calendar size={12} className="text-amber-500" />
            <span>{date}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-amber-500" />
            <span>{post.readTime || "5 min read"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* === CONTENT WRAPPER === */
export function ArticleContent({ children }) {
  return (
    <div className="relative z-20 max-w-[720px] mx-auto px-6 pb-24">
      <ReadingTimer />
      
      {/* === TYPOGRAPHY === */}
      <article className="prose prose-lg md:prose-xl prose-invert prose-slate max-w-none
        prose-headings:font-serif prose-headings:font-medium prose-headings:text-white prose-headings:tracking-tight
        prose-p:text-slate-300 prose-p:leading-[1.8] prose-p:text-lg md:prose-p:text-[1.15rem] prose-p:text-left
        prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white prose-strong:font-semibold prose-strong:bg-white/5 prose-strong:px-1 prose-strong:rounded
        prose-blockquote:border-l-2 prose-blockquote:border-amber-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-400
        prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10 prose-img:w-full
        prose-li:text-slate-300 prose-li:marker:text-amber-500
      ">
        {children}
      </article>

      {/* Share / Action Bar (High Z-Index) */}
      <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center relative z-[100]">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group font-medium text-sm pointer-events-auto">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        
        {/* NEW DEDICATED COMPONENT */}
        <ArticleActions />
      </div>
    </div>
  );
}
