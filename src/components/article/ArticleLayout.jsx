"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Check, Hash } from "lucide-react";
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
    <nav className="hidden lg:block sticky top-32 self-start w-64 pl-8 border-l border-white/10">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
        <Hash size={12} /> On this page
      </h4>
      <ul className="space-y-3">
        {headings.map((slug) => (
          <li key={slug}>
            <a
              href={`#${slug}`}
              className={`block text-sm transition-colors duration-200 ${
                activeId === slug
                  ? "text-amber-400 font-medium translate-x-1"
                  : "text-slate-500 hover:text-slate-300"
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

/* === 4. SEPARATED HERO SECTION === */
export function ArticleHero({ post, readTime }) {
  if (!post) return null;
  
  const date = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const coverImage = post.meta?.cover || post.cover_image_url;

  return (
    // h-[50vh] ensures it takes up exactly half the viewport height
    // relative positioning keeps it in the flow (no overlap)
    <header className="relative h-[50vh] min-h-[400px] w-full flex flex-col justify-end pb-12 px-6 bg-slate-900 overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover blur-[2px] opacity-80" 
          />
        ) : (
          <div className="w-full h-full bg-slate-900" />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/60 to-transparent"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        <div className="flex justify-center mb-6">
          <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg">
            {post.meta?.category || "Editorial"}
          </span>
        </div>
        
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl">
          {post.title}
        </h1>
        
        {/* META DOCK */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-slate-300 font-medium bg-black/40 backdrop-blur-md border border-white/10 py-3 px-6 rounded-full shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-500 p-[1px]">
               <img src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" className="w-full h-full rounded-full object-cover" alt="BA" />
            </div>
            <span className="text-white font-bold">Boluwatife Adeoye</span>
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

/* === 5. SEPARATED CONTENT GRID === */
export function ArticleGrid({ children, headings }) {
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
    // Added border-t to visually separate from hero
    // Added pt-16 to push content down
    <div className="relative bg-[#020617] border-t border-white/10">
      <ReadingProgress />
      <Toast message="Link copied to clipboard!" show={toast} />
      
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
        
        {/* LEFT: Share (Sticky) */}
        <aside className="hidden lg:block lg:col-span-2 relative">
          <div className="sticky top-32 flex flex-col gap-4 items-end pr-8 border-r border-white/5">
            <button 
              onClick={handleShare}
              className="p-3 rounded-full bg-white/5 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all shadow-lg"
              title="Share"
            >
              <Share2 size={20} />
            </button>
            <button className="p-3 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black text-slate-400 transition-all shadow-lg">
              <Bookmark size={20} />
            </button>
          </div>
        </aside>

        {/* CENTER: Content */}
        <main className="lg:col-span-7 min-w-0">
          {children}
          
          {/* Mobile Share Bar */}
          <div className="lg:hidden mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <ArrowLeft size={16} /> Back
            </Link>
            <div className="flex gap-4">
              <button onClick={handleShare} className="p-2 text-slate-400 hover:text-white"><Share2 size={20} /></button>
              <button className="p-2 text-slate-400 hover:text-white"><Bookmark size={20} /></button>
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
