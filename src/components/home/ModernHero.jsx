"use client";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";

function SystemStatus() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="font-mono text-[10px] text-emerald-300 tracking-widest uppercase font-bold">System Online</span>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-4 pt-24 pb-12 overflow-hidden">
      
      {/* === 1. BACKLIGHT STAGE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[60%] bg-amber-600/10 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="relative bg-[#020617]/80 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white/10 p-8 md:p-16 shadow-2xl shadow-black/50">
          
          {/* Inner Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-8">
            <SystemStatus />
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9]">
              Boluwatife <br /> <span className="italic text-slate-500">Adeoye</span>
            </h1>

            <div className="h-1.5 w-24 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>

            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Full-Stack Engineer & AI Architect. Specializing in <span className="text-white font-medium">High-Performance Systems</span> and <span className="text-white font-medium">Automated Sales Infrastructure</span>.
            </p>

            <div className="flex flex-wrap gap-6 mt-4">
              {/* BUTTON WITH FINGER FIX */}
              <div className="relative inline-block group">
                <Link href="/chat" className="relative z-10 flex items-center gap-3 px-8 py-4 rounded-full bg-indigo-600 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  <span>Let's Talk</span>
                  <ArrowRight size={18} />
                </Link>
                <span className="absolute -bottom-3 -right-3 text-4xl animate-finger z-20 pointer-events-none drop-shadow-lg">👆</span>
              </div>

              <Link href="/articles" className="px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2">
                <Cpu size={18} /> <span>Access Logs</span>
              </Link>
            </div>
          </div>

          {/* === RESTORED ORIGINAL IMAGE === */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-12 w-64 h-64 rounded-full border border-white/5 bg-gradient-to-br from-slate-800/50 to-transparent backdrop-blur-md shadow-2xl">
             <img 
                src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
                alt="Bolu Adeoye" 
                className="w-full h-full object-cover rounded-full opacity-90 grayscale hover:grayscale-0 transition-all duration-700" 
             />
          </div>

        </div>
      </div>
    </section>
  );
}
