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
    <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg whitespace-nowrap">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <span className="font-mono text-[10px] md:text-xs text-emerald-400 tracking-widest uppercase font-bold">
        {text}<span className="animate-pulse">_</span>
      </span>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="hero-section relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 pt-4 pb-12 overflow-hidden">
      
      {/* === 1. BACKLIGHT STAGE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050b14]"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-indigo-600/20 blur-[100px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[60%] bg-amber-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* === 2. SOLID HERO CARD === */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="relative bg-[#020617] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/80">
          
          {/* === PREMIUM PATTERN (Dot Matrix) === */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03), transparent 70%)"></div>
          </div>

          {/* Card Border Glow */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none z-20"></div>

          {/* === CONTENT === */}
          <div className="relative z-10 p-6 md:p-16 flex flex-col">
            
            {/* === TOP ROW: SIDE-BY-SIDE ALIGNMENT === */}
            <div className="flex flex-row justify-between items-center mb-6 md:mb-8">
              
              {/* Status Pill (Left) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0"
              >
                <SystemStatus />
              </motion.div>

              {/* Portrait (Right) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl"></div>
                <div className="relative w-24 h-24 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-br from-slate-700 to-black border border-slate-600 shadow-2xl">
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
              
              {/* Name */}
              <div className="mb-6 relative">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-serif text-[3.5rem] leading-[0.95] md:text-[6rem] lg:text-[7rem] font-medium tracking-tight text-white drop-shadow-lg"
                >
                  Boluwatife <br />
                  <span className="italic text-slate-500">Adeoye</span>
                </motion.h1>
              </div>

              {/* Role Line (Restored to Stable Layout) */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-[3px] w-20 bg-amber-500 rounded-full"></div>
                <h2 className="text-xs md:text-sm font-mono text-amber-400 tracking-[0.25em] uppercase font-bold shadow-black drop-shadow-md">
                  Full-Stack Engineer & Writer
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="font-sans text-lg md:text-2xl text-slate-300 max-w-2xl leading-relaxed mb-10"
              >
                Architecting high-performance digital ecosystems. 
                Specializing in <span className="text-white font-medium border-b border-slate-700 pb-0.5">React Server Components</span>, <span className="text-white font-medium border-b border-slate-700 pb-0.5">Scalable Systems</span>, and <span className="text-white font-medium border-b border-slate-700 pb-0.5">Human-Centric UI</span>.
              </motion.p>

              {/* === ACTIONS === */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-5"
              >
                {/* Primary: Let's Talk (With Finger Animation) */}
                <Link href="/chat" className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-sans font-bold tracking-wide overflow-hidden animate-beam shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform">
                  <span className="relative z-10 flex items-center gap-2">
                    Let's Talk <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* The Clicking Finger */}
                  <span className="absolute -bottom-2 -right-2 text-2xl animate-finger pointer-events-none z-20">
                    👆
                  </span>
                </Link>
                
                {/* Secondary: Access Logs */}
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
