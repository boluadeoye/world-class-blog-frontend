"use client";
import { motion } from "framer-motion";
import { ArrowRight, MoveDownRight, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === RAW DATA STREAM (The "Live" Element) === */
function DataStream() {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toISOString().split('T')[1].slice(0, 8));
    };
    const timer = setInterval(update, 100);
    update();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col font-mono text-[10px] text-slate-500 tracking-widest uppercase gap-1 mb-6 border-l border-slate-800 pl-3">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
        <span>SYS.ONLINE // {time}</span>
      </div>
      <div>LOC: LAGOS, NG // 6.5244° N</div>
      <div>MEM: OPTIMAL // RENDER: SERVER</div>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-start px-6 md:px-12 overflow-hidden pt-20 md:pt-32">
      
      {/* === 1. ATMOSPHERE: Dark Prism === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Mesh Gradient */}
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-transparent blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-transparent blur-[80px] mix-blend-screen" />
        
        {/* Noise Texture for "Film" Grain */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* === LEFT COLUMN: Typography === */}
        <div className="lg:col-span-8 flex flex-col justify-start">
          
          {/* 2. DATA STREAM (Replaces the "Pill") */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DataStream />
          </motion.div>

          {/* 3. MASSIVE EDITORIAL HEADLINE */}
          <div className="relative mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[4.5rem] leading-[0.85] md:text-[7rem] lg:text-[8rem] font-medium tracking-tighter text-slate-100"
            >
              Boluwatife <br />
              <span className="text-slate-500 italic pr-4">Adeoye</span>
            </motion.h1>
            
            {/* Decorative "Stamp" */}
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute top-0 right-0 md:right-20 w-24 h-24 border border-slate-700 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]"
            >
              <div className="w-20 h-20 border border-dashed border-slate-600 rounded-full"></div>
            </motion.div>
          </div>

          {/* 4. ACTIONS (Architectural) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link href="/about" className="group flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-950 rounded-full font-sans font-bold tracking-wide hover:bg-white transition-colors">
              <span>Initiate Contact</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/articles" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest border-b border-transparent hover:border-amber-500 pb-1">
              <Cpu size={14} className="text-amber-500" />
              <span>View System Logs</span>
            </Link>
          </motion.div>
        </div>

        {/* === RIGHT COLUMN: Abstract Description === */}
        <div className="lg:col-span-4 flex flex-col justify-end pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="border-t border-slate-800 pt-6"
          >
            <p className="font-sans text-lg text-slate-300 leading-relaxed mb-4">
              Building digital ecosystems with <span className="text-white font-medium">precision</span> and <span className="text-white font-medium">soul</span>.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 uppercase">
              <MoveDownRight size={12} />
              <span>Scroll to explore</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
