"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ModernHero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-12 md:pt-20">
      
      {/* === 1. LIQUID NEON BACKGROUND === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Space Base */}
        <div className="absolute inset-0 bg-slate-950" />
        
        {/* Moving Neon Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-indigo-600/30 rounded-full blur-[100px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[-20%] w-[70vw] h-[70vw] bg-amber-600/20 rounded-full blur-[120px] mix-blend-screen" 
        />
        
        {/* Glass Texture Overlay */}
        <div className="absolute inset-0 bg-slate-950/10 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        
        {/* 2. The "Label" */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="h-[2px] w-8 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-amber-500 uppercase drop-shadow-lg">
            Full-Stack Engineer & Writer
          </span>
        </motion.div>

        {/* 3. The "Headline" (Intense Typography) */}
        <div className="mb-6 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[3.5rem] leading-[1] md:text-8xl lg:text-9xl font-medium tracking-tight text-white"
          >
            Boluwatife <br />
            <span className="italic text-slate-400 relative inline-block">
              Adeoye
              {/* Subtle Underline Glow */}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-2 left-0 h-[6px] bg-amber-500/20 -z-10 skew-x-12"
              />
            </span>
          </motion.h1>
        </div>

        {/* 4. The "Subtext" */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-sans text-lg text-slate-300 max-w-lg leading-relaxed mb-8 border-l-2 border-slate-700/50 pl-5"
        >
          Building digital ecosystems with <span className="text-white font-semibold shadow-amber-500/20 drop-shadow-md">precision</span> and <span className="text-white font-semibold shadow-indigo-500/20 drop-shadow-md">soul</span>. 
          I write about the intersection of engineering, design, and human potential.
        </motion.p>

        {/* 5. The "Actions" (Premium Buttons) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/about" className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-sans font-bold tracking-wide overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow">
            <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
              Initiate Contact <ArrowRight size={18} />
            </span>
          </Link>
          
          <Link href="/articles" className="px-8 py-4 border border-slate-700 bg-slate-900/50 backdrop-blur-md text-slate-300 rounded-full font-sans font-medium hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            Read Notes
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
