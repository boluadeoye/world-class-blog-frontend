"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Check, Hash, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === 1. FLUID ATMOSPHERE (The "Life") === */
function FluidBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#020617]"></div>
      
      {/* Moving Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen"
      />
      
      <motion.div 
        animate={{ 
          x: [0, -100, 0], 
          y: [0, 50, 0],
          scale: [1, 1.3, 1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/5 blur-[100px] rounded-full mix-blend-screen"
      />

      {/* Grain Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
    </div>
  );
}

/* === 2. PROGRESS BEAM === */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 origin-left z-50 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
      style={{ scaleX }} 
    />
  );
}

/* === 3. STICKY TOC === */
function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    headings.forEach((slug) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-32 self-start w-64 pl-8 border-l border-white/5">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
        <Hash size={12} /> On this page
      </h4>
      <ul className="space-y-4">
        {headings.map((slug) => (
          <li key={slug}>
            <a
              href={`#${slug}`}
              className={`block text-sm transition-all duration-300 ${
                activeId === slug
                  ? "text-amber-400 font-medium translate-x-2"
                  : "text-slate-500 hover:text-slate-300 hover:translate-x-1"
              }`}
            >
              {slug.replace(/-/g, " ")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* === 4. PARALLAX HERO === */
export function ArticleHero({ post }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Fade out effect

  if (!post) return null;
  const date = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 overflow-hidden">
      <FluidBackground />
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <div className="flex justify-center mb-8">
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-amber-300 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-lg">
            {post.meta?.category || "Engineering"}
          </span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.05] mb-10 tracking-tight drop-shadow-2xl">
          {post.title}
        </h1>
        
        <div className="inline-flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300 font-mono border-t border-white/10 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 p-[1px] shadow-lg">
               <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[10px] font-bold text-white">BA</div>
            </div>
            <span className="font-bold tracking-wide">Boluwatife Adeoye</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock size={14} />
            <span>{post.readTime || "5 min read"}</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown size={24} />
      </motion.div>
    </header>
  );
}

/* === 5. MAIN LAYOUT GRID === */
export function ArticleGrid({ children, headings }) {
  return (
    <div className="relative bg-[#020617]">
      <ReadingProgress />
      
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 relative z-10">
        
        {/* LEFT: Share (Sticky) */}
        <aside className="hidden lg:block lg:col-span-2 relative">
          <div className="sticky top-32 flex flex-col gap-6 items-end pr-8 border-r border-white/5">
            <button className="group p-3 rounded-full bg-white/5 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all shadow-lg">
              <Share2 size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button className="group p-3 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black text-slate-400 transition-all shadow-lg">
              <Bookmark size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </aside>

        {/* CENTER: Content */}
        <main className="lg:col-span-7 min-w-0">
          {/* Glass Panel for Text */}
          <div className="relative">
            <div className="prose prose-xl prose-invert prose-slate max-w-none 
              prose-headings:font-serif prose-headings:font-medium prose-headings:text-white prose-headings:scroll-mt-32
              prose-p:text-slate-300 prose-p:leading-[1.9] prose-p:font-light prose-p:text-lg md:prose-p:text-[1.2rem]
              prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:text-slate-200 prose-blockquote:font-serif
              prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10
              prose-code:text-emerald-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            ">
              {children}
            </div>
          </div>
          
          {/* Mobile Share Bar */}
          <div className="lg:hidden mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <ArrowLeft size={16} /> Back
            </Link>
            <div className="flex gap-4">
              <Share2 size={20} className="text-slate-400" />
              <Bookmark size={20} className="text-slate-400" />
            </div>
          </div>
        </main>

        {/* RIGHT: TOC (Sticky) */}
        <aside className="hidden lg:block lg:col-span-3 relative">
          <TableOfContents headings={headings} />
        </aside>

      </div>
    </div>
  );
}
