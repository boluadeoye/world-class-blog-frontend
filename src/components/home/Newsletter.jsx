"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 px-6 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        
        {/* === ANIMATED WRAPPER === */}
        <div className="relative group rounded-[2.5rem] p-[2px] overflow-hidden">
          
          {/* 1. ROTATING BORDER BEAM (Heavy Animation) */}
          <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#6366f1_360deg)] animate-[spin_4s_linear_infinite] opacity-70"></div>
          
          {/* 2. CARD CONTENT */}
          <div className="relative h-full bg-slate-900 rounded-[2.4rem] overflow-hidden">
            
            {/* Internal "Breathing" Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 animate-pulse duration-[5s]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              
              {/* Text Content */}
              <div className="text-center md:text-left max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold tracking-widest text-indigo-300 uppercase mb-4 backdrop-blur-md shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                  <Mail size={12} /> The Intel Brief
                </div>
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 tracking-tight leading-[1.1] drop-shadow-lg">
                  Join the Inner Circle.
                </h2>
                <p className="font-sans text-slate-400 text-base md:text-lg leading-relaxed">
                  Get curated engineering deep dives, system design breakdowns, and exclusive notes delivered directly to your inbox.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="relative group/input">
                  {/* Input Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 group-hover/input:opacity-50 transition duration-500 blur-md"></div>
                  
                  <div className="relative flex items-center bg-slate-950 rounded-full p-1.5 border border-white/10 shadow-2xl">
                    <input 
                      type="email" 
                      placeholder="name@example.com" 
                      className="w-full bg-transparent text-white placeholder-slate-500 px-6 py-3 outline-none text-sm font-medium rounded-l-full min-w-0"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button 
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-indigo-50 transition-all disabled:opacity-90 disabled:cursor-not-allowed min-w-[130px] justify-center shadow-lg"
                    >
                      {status === "loading" ? (
                        <span className="animate-pulse">Joining...</span>
                      ) : status === "success" ? (
                        <>Joined <Check size={16} className="text-emerald-600" /></>
                      ) : (
                        <>Subscribe <ArrowRight size={16} /></>
                      )}
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-center md:text-left text-[10px] text-slate-600 uppercase tracking-wider font-bold">
                  No spam. Unsubscribe anytime.
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
