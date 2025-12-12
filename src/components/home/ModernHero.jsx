"use client";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

function SystemStatus() {
  const [text, setText] = useState("");
  const fullText = "SYSTEM ONLINE. READY._";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-lg mb-8 whitespace-nowrap">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <span className="font-mono text-[10px] md:text-xs text-emerald-400 tracking-widest font-bold">{text}</span>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center px-6 pt-10 pb-12 overflow-hidden bg-[#020617]">
      
      {/* === BACKGROUND === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* === TOP ROW === */}
        <div className="flex justify-between items-start mb-4">
          <SystemStatus />
          
          {/* IMAGE */}
          <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-slate-800 p-1 bg-slate-900/50 backdrop-blur-sm shadow-2xl shrink-0">
            <img 
              src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
              alt="Bolu Adeoye" 
              className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500" 
            />
          </div>
        </div>

        {/* === MAIN CONTENT === */}
        <div className="max-w-4xl mt-[-10px]">
          {/* NAME - Adjusted size to prevent cramping on mobile */}
          <h1 className="font-serif text-[3.2rem] md:text-8xl text-white leading-[1.1] md:leading-[0.9] mb-8 tracking-tight">
            Boluwatife <br /> 
            <span className="italic text-slate-400 font-light">Adeoye</span>
          </h1>

          {/* YELLOW LINE & TITLE */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-12 md:w-16 bg-amber-500 rounded-full"></div>
            <h2 className="text-xs md:text-base font-mono text-amber-400 tracking-[0.2em] uppercase font-bold whitespace-nowrap">
              Full-Stack Engineer & Writer
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p className="text-base md:text-xl text-slate-300 leading-relaxed font-light mb-12 max-w-2xl">
            Architecting high-performance digital ecosystems. Specializing in <span className="text-amber-200 italic">React Server Components</span>, <span className="text-amber-200 italic">Scalable Systems</span>, and <span className="text-amber-200 italic">Human-Centric UI</span>.
          </p>

          {/* === BUTTONS === */}
          <div className="flex flex-wrap gap-6 items-center">
            <div className="relative group">
              <Link href="/chat" className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold tracking-wide shadow-lg hover:scale-105 transition-transform border border-white/10">
                <span>Let's Talk</span>
                <ArrowRight size={18} />
              </Link>
              <span className="absolute -bottom-3 -right-3 text-4xl animate-finger z-20 pointer-events-none drop-shadow-xl">👆</span>
            </div>

            <Link href="/articles" className="px-8 py-4 rounded-full border border-slate-800 text-slate-400 font-medium hover:text-white hover:border-slate-600 transition-all flex items-center gap-2 bg-slate-900/50">
              <Cpu size={18} /> <span>Access Logs</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
