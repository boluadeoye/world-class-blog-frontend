"use client";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === LIVE SYSTEM STATUS === */
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
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-lg">
      <div className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </div>
      <span className="font-mono text-[11px] md:text-xs text-emerald-400 tracking-widest uppercase font-bold">
        {text}
      </span>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="hero-section relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 pt-20 pb-12">
      
      {/* === 1. SOLID CARD CONTAINER === */}
      <div className="relative w-full max-w-6xl mx-auto bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
        
        {/* Background Effects (Subtle & Shiny) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          
          {/* Deep Radial Glow (The "Shine") */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)]"></div>
        </div>

        {/* === CONTENT PADDING === */}
        <div className="relative z-10 p-8 md:p-16 flex flex-col">
          
          {/* === 2. TOP ROW: PERFECT ALIGNMENT === */}
          <div className="flex justify-between items-center mb-12 md:mb-16">
            
            {/* Left: System Status */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SystemStatus />
            </motion.div>

            {/* Right: Larger Premium Portrait */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative group"
            >
              {/* Glow behind photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-indigo-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              {/* The Photo Container */}
              <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 shadow-2xl">
                <img 
                  src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
                  alt="Bolu Adeoye" 
                  className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
          </div>

          {/* === 3. MAIN TYPOGRAPHY === */}
          <div className="max-w-4xl">
            
            {/* Name */}
            <div className="mb-8 relative">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-[3.5rem] leading-[0.95] md:text-[6rem] lg:text-[7rem] font-medium tracking-tight text-white"
              >
                Boluwatife <br />
                <span className="italic text-slate-500">Adeoye</span>
              </motion.h1>
            </div>

            {/* Role Line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-[2px] w-16 bg-amber-500"></div>
              <h2 className="text-xs md:text-sm font-mono text-amber-400 tracking-[0.25em] uppercase font-bold">
                Full-Stack Engineer & Writer
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-sans text-lg md:text-2xl text-slate-300 max-w-2xl leading-relaxed mb-12"
            >
              Architecting high-performance digital ecosystems. 
              Specializing in <span className="text-white font-medium border-b border-slate-600 pb-0.5">React Server Components</span>, <span className="text-white font-medium border-b border-slate-600 pb-0.5">Scalable Systems</span>, and <span className="text-white font-medium border-b border-slate-600 pb-0.5">Human-Centric UI</span>.
            </motion.p>

            {/* === 4. BEAMING ACTIONS === */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-5"
            >
              {/* Primary: Continuous Beam Sweep */}
              <Link href="/about" className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-sans font-bold tracking-wide overflow-hidden animate-beam shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform">
                <span className="relative z-10 flex items-center gap-2">
                  Initiate Contact <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              {/* Secondary: Continuous Border Pulse */}
              <Link href="/articles" className="group relative px-8 py-4 bg-slate-900/50 backdrop-blur-md text-slate-300 rounded-full font-sans font-medium border border-slate-700 animate-border-pulse flex items-center gap-2 hover:text-white transition-colors hover:bg-slate-800">
                <Cpu size={16} className="text-emerald-400 group-hover:rotate-90 transition-transform duration-500" />
                <span>Access Logs</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
