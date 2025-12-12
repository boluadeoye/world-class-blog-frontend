"use client";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

function SystemStatus() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
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
    <section className="relative min-h-[85vh] flex flex-col justify-center px-4 pt-20 pb-10 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="relative bg-[#020617]/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 p-6 md:p-12">
          
          <div className="flex flex-col gap-6">
            <SystemStatus />
            
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
              Boluwatife <br /> <span className="italic text-slate-500">Adeoye</span>
            </h1>

            <div className="h-1 w-20 bg-amber-500 rounded-full"></div>

            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              Full-Stack Engineer & AI Architect. Specializing in <span className="text-amber-400">High-Performance Systems</span> and <span className="text-amber-400">Automated Sales Infrastructure</span>.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              {/* BUTTON WITH FINGER FIX */}
              <div className="relative inline-block">
                <Link href="/chat" className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white font-bold shadow-lg hover:scale-105 transition-transform">
                  <span>Let's Talk</span>
                  <ArrowRight size={18} />
                </Link>
                {/* Finger positioned relative to this specific block */}
                <span className="absolute -bottom-2 -right-2 text-3xl animate-finger z-20 pointer-events-none">👆</span>
              </div>

              <Link href="/articles" className="px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
                <Cpu size={16} /> <span>Access Logs</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
