"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 px-6 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl"
        >
          
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Text Content */}
            <div className="text-center md:text-left max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-indigo-300 uppercase mb-4 backdrop-blur-md">
                <Mail size={12} /> The Intel Brief
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 tracking-tight leading-[1.1]">
                Join the Inner Circle.
              </h2>
              <p className="font-sans text-slate-400 text-base md:text-lg leading-relaxed">
                Get curated engineering deep dives, system design breakdowns, and exclusive notes delivered directly to your inbox.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="relative group">
                {/* Glowing Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
                
                <div className="relative flex items-center bg-slate-950 rounded-full p-1.5 border border-white/10">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-transparent text-white placeholder-slate-500 px-6 py-3 outline-none text-sm font-medium rounded-l-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-indigo-50 transition-all disabled:opacity-90 disabled:cursor-not-allowed min-w-[140px] justify-center"
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
        </motion.div>
      </div>
    </section>
  );
}
