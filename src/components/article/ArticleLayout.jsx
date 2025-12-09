"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Check, Hash } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === PROGRESS BAR === */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-50" style={{ scaleX }} />;
}

/* === STICKY TABLE OF CONTENTS === */
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

/* === ARTICLE HERO === */
export function ArticleHero({ post }) {
  if (!post) return null;
  const date = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="relative pt-32 pb-16 px-6 border-b border-white/5 bg-[#020617]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <span className="px-3 py-1 rounded-md border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            {post.meta?.category || "Engineering"}
          </span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-[1.05] mb-10 tracking-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold">BA</div>
            <span>Boluwatife Adeoye</span>
          </div>
          <span>•</span>
          <time>{date}</time>
          <span>•</span>
          <span>{post.readTime || "5 min read"}</span>
        </div>
      </div>
    </header>
  );
}

/* === MAIN LAYOUT GRID === */
export function ArticleGrid({ children, headings }) {
  return (
    <div className="relative min-h-screen bg-[#020617]">
      <ReadingProgress />
      
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
        
        {/* LEFT: Share (Sticky) */}
        <aside className="hidden lg:block lg:col-span-2 relative">
          <div className="sticky top-32 flex flex-col gap-4 items-end pr-8">
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <Bookmark size={20} />
            </button>
          </div>
        </aside>

        {/* CENTER: Content */}
        <main className="lg:col-span-7 min-w-0">
          <div className="prose prose-xl prose-invert prose-slate max-w-none 
            prose-headings:font-serif prose-headings:font-medium prose-headings:text-white prose-headings:scroll-mt-32
            prose-p:text-slate-300 prose-p:leading-[1.8] prose-p:font-light
            prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-blockquote:border-l-2 prose-blockquote:border-amber-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-400
            prose-img:rounded-xl prose-img:border prose-img:border-white/10
            prose-code:text-emerald-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          ">
            {children}
          </div>
          
          {/* Mobile Share Bar */}
          <div className="lg:hidden mt-12 pt-8 border-t border-white/10 flex justify-between">
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
