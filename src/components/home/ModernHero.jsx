"use client";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === GLASS STATUS PILL === */
function SystemStatus() {
  const [text, setText] = useState("");
  const fullText = "System Online. Ready.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)] whitespace-nowrap">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <span className="font-mono text-[10px] md:text-xs text-emerald-300 tracking-widest uppercase font-bold">
        {text}<span className="animate-pulse">_</span>
      </span>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="hero-section relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 pt-4 pb-12 overflow-hidden">
      
      {/* === 1. BRIGHTER BACKLIGHT STAGE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050b14]"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140%] h-[90%] bg-indigo-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[70%] bg-amber-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* === 2. SOLID HERO CARD === */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="relative bg-[#020617]/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-900/20 border border-white/10">
          
          {/* === PREMIUM PATTERN === */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_95%)]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%)"></div>
          </div>

          {/* === CONTENT === */}
          <div className="relative z-10 p-6 md:p-16 flex flex-col">
            
            {/* === TOP ROW === */}
            <div className="flex flex-row justify-between items-center mb-6 md:mb-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0"
              >
                <SystemStatus />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-indigo-500/40 rounded-full blur-xl"></div>
                <div className="relative w-24 h-24 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-br from-slate-700 to-black border border-slate-500 shadow-2xl">
                  <img 
                    src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
                    alt="Bolu Adeoye" 
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </motion.div>
            </div>

            {/* === MAIN TYPOGRAPHY === */}
            <div className="max-w-4xl">
              <div className="mb-6 relative">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-serif text-[3.5rem] leading-[0.95] md:text-[6rem] lg:text-[7rem] font-medium tracking-tight text-white drop-shadow-2xl"
                >
                  Boluwatife <br />
                  <span className="italic text-slate-400">Adeoye</span>
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-[3px] w-20 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                <h2 className="text-xs md:text-sm font-mono text-amber-400 tracking-[0.25em] uppercase font-bold shadow-black drop-shadow-md">
                  Full-Stack Engineer & Writer
                </h2>
              </motion.div>

              {/* === DESCRIPTION WITH SHARP GLASS TILES === */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="font-sans text-lg md:text-2xl text-slate-300 max-w-3xl leading-loose mb-10 font-light"
              >
                Architecting high-performance digital ecosystems. Specializing in
                <span className="inline-block px-3 py-1 mx-1.5 bg-white/5 border border-white/10 rounded-sm text-white font-serif italic text-xl md:text-2xl hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                  React Server Components
                </span>
                ,
                <span className="inline-block px-3 py-1 mx-1.5 bg-white/5 border border-white/10 rounded-sm text-white font-serif italic text-xl md:text-2xl hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                  Scalable Systems
                </span>
                , and
                <span className="inline-block px-3 py-1 mx-1.5 bg-white/5 border border-white/10 rounded-sm text-white font-serif italic text-xl md:text-2xl hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                  Human-Centric UI
                </span>
                .
              </motion.p>

              {/* === ACTIONS === */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-6 items-center"
              >
                {/* Modern Chip Button */}
                <div className="relative group inline-block">
                  <Link href="/chat" className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-105 transition-all duration-300 border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    <span>Let's Talk</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="absolute -bottom-3 -right-3 text-3xl animate-finger z-20 pointer-events-none drop-shadow-lg">
                    👆
                  </span>
                </div>
                
                {/* Secondary Button */}
                <Link href="/articles" className="group relative px-8 py-4 bg-slate-900/50 backdrop-blur-md text-slate-300 rounded-full font-sans font-medium border border-slate-700 animate-border-pulse flex items-center gap-2 hover:text-white transition-colors hover:bg-slate-800">
                  <Cpu size={16} className="text-emerald-400 group-hover:rotate-90 transition-transform duration-500" />
                  <span>Access Logs</span>
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
