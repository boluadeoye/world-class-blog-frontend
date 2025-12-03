"use client";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Activity } from "lucide-react";
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
    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">
        {text}
      </span>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="hero-section relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-16 md:pt-24">
      
      {/* === 1. ATMOSPHERE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/5 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* === 2. TOP ROW: Status (Left) vs Photo (Right) === */}
        <div className="flex justify-between items-start mb-8">
          
          {/* Left: System Status */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SystemStatus />
          </motion.div>

          {/* Right: Premium Portrait (Floating) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-indigo-600 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 shadow-2xl">
              <img 
                src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
                alt="Bolu Adeoye" 
                className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* === 3. MAIN CONTENT (Left Aligned) === */}
        <div className="max-w-4xl">
          
          {/* Name */}
          <div className="mb-6 relative">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-[4rem] leading-[0.9] md:text-[6rem] lg:text-[7rem] font-medium tracking-tight text-white"
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
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-amber-500"></div>
            <h2 className="text-xs md:text-sm font-mono text-amber-400 tracking-[0.25em] uppercase">
              Full-Stack Engineer & Writer
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-12"
          >
            Architecting high-performance digital ecosystems. 
            Specializing in <span className="text-white font-medium border-b border-slate-700 pb-0.5">React Server Components</span>, <span className="text-white font-medium border-b border-slate-700 pb-0.5">Scalable Systems</span>, and <span className="text-white font-medium border-b border-slate-700 pb-0.5">Human-Centric UI</span>.
          </motion.p>

          {/* === 4. BEAMING ACTIONS (Never Idle) === */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-5"
          >
            {/* Primary: Continuous Beam Sweep */}
            <Link href="/about" className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-sans font-bold tracking-wide overflow-hidden animate-beam shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <span className="relative z-10 flex items-center gap-2">
                Initiate Contact <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            {/* Secondary: Continuous Border Pulse */}
            <Link href="/articles" className="group relative px-8 py-4 bg-slate-900/50 backdrop-blur-md text-slate-300 rounded-full font-sans font-medium border border-slate-700 animate-border-pulse flex items-center gap-2 hover:text-white transition-colors">
              <Cpu size={16} className="text-emerald-400 group-hover:rotate-90 transition-transform duration-500" />
              <span>Access Logs</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
