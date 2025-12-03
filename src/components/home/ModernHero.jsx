"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ModernHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-20">
      
      {/* 1. Background Atmosphere (Aurora) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        
        {/* 2. The "Label" */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-amber-500/50"></div>
          <span className="font-sans text-xs md:text-sm font-bold tracking-[0.2em] text-amber-500 uppercase">
            Full-Stack Engineer & Writer
          </span>
        </motion.div>

        {/* 3. The "Headline" (Editorial Typography) */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.95] tracking-tight text-slate-100"
          >
            Boluwatife <br />
            <span className="italic text-slate-400">Adeoye</span>
          </motion.h1>
        </div>

        {/* 4. The "Subtext" */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-sans text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-10 border-l-2 border-slate-800 pl-6"
        >
          Building digital ecosystems with <span className="text-slate-200 font-medium">precision</span> and <span className="text-slate-200 font-medium">soul</span>. 
          I write about the intersection of engineering, design, and human potential.
        </motion.p>

        {/* 5. The "Actions" */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/about" className="group relative px-8 py-4 bg-slate-100 text-slate-950 rounded-full font-sans font-bold tracking-wide overflow-hidden">
            <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
              Initiate Contact <ArrowRight size={18} />
            </span>
          </Link>
          
          <Link href="/articles" className="px-8 py-4 border border-slate-800 text-slate-300 rounded-full font-sans font-medium hover:bg-slate-900 hover:text-white transition-colors flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            Read Notes
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
