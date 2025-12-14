"use client";
import { motion } from "framer-motion";
import { Phone, ShieldCheck, Zap, BrainCircuit, MessageCircle, ArrowRight, Building2, Truck, ShoppingBag, Check } from "lucide-react";
import Link from "next/link";

// === ANIMATION VARIANTS ===
const revealVars = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerVars = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

function ScrollSection({ children, className }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerVars}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AIOfferPage() {
  return (
    <main className="fixed inset-0 z-[9999] bg-[#020617] text-slate-200 overflow-y-auto font-sans selection:bg-amber-500/30">
      
      {/* === 1. HEADER === */}
      <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="font-serif text-xl font-bold tracking-tight text-white">Bolu.Dev</div>
        <a href="https://wa.me/2348106293674" className="flex items-center gap-2 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/20 hover:bg-amber-400/20 transition-colors uppercase tracking-widest">
          <Phone size={12} /> Book Strategy
        </a>
      </nav>

      {/* === 2. HERO: THE HOOK === */}
      <section className="px-6 pt-16 pb-20 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse duration-[4s]"></div>
        
        <ScrollSection className="relative z-10">
          <motion.div variants={revealVars} className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            Urgent: Revenue Leak Detected
          </motion.div>
          
          <motion.h1 variants={revealVars} className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
            Your Business is <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Leaking Money.</span>
          </motion.h1>
          
          <motion.p variants={revealVars} className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Every missed DM is a lost sale. Stop relying on human speed. Hire a Digital Employee that works 24/7.
          </motion.p>

          <motion.div variants={revealVars}>
            <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Fix It Now <ArrowRight size={16} />
            </a>
          </motion.div>
        </ScrollSection>
      </section>

      {/* === 3. THE COMPARISON (PAIN VS GAIN) === */}
      <section className="px-6 py-16 bg-slate-900/30 border-y border-white/5">
        <ScrollSection className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* The Old Way */}
          <motion.div variants={revealVars} className="p-8 rounded-[2rem] bg-red-950/10 border border-red-500/10">
            <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> The Problem (Manual)
            </h3>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex items-start gap-3"><span className="text-red-500">✕</span> Sleeping = 8 hours of lost sales.</li>
              <li className="flex items-start gap-3"><span className="text-red-500">✕</span> Slow replies kill impulse buys.</li>
              <li className="flex items-start gap-3"><span className="text-red-500">✕</span> Fake alerts & payment fraud.</li>
            </ul>
          </motion.div>

          {/* The New Way */}
          <motion.div variants={revealVars} className="p-8 rounded-[2rem] bg-emerald-950/10 border border-emerald-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full"></div>
            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> The Solution (AI)
            </h3>
            <ul className="space-y-4 text-slate-200 text-sm font-bold">
              <li className="flex items-start gap-3"><Check size={16} className="text-emerald-500 mt-0.5" /> Instant Replies (Under 1s).</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-emerald-500 mt-0.5" /> 24/7 Sales & Support.</li>
              <li className="flex items-start gap-3"><Check size={16} className="text-emerald-500 mt-0.5" /> Auto-Verify Payments.</li>
            </ul>
          </motion.div>

        </ScrollSection>
      </section>

      {/* === 4. INDUSTRY SOLUTIONS === */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <ScrollSection>
          <div className="text-center mb-12">
            <motion.h2 variants={revealVars} className="font-serif text-3xl md:text-5xl text-white mb-3">Who Needs This?</motion.h2>
            <motion.p variants={revealVars} className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Tailored for Nigerian Business</motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Real Estate */}
            <motion.div variants={revealVars} className="group p-8 rounded-[2rem] bg-slate-900 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 mb-6 group-hover:text-amber-400 transition-colors">
                <Building2 size={20} />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">Real Estate</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Auto-schedule inspections and qualify high-net-worth buyers instantly.
              </p>
            </motion.div>

            {/* Logistics */}
            <motion.div variants={revealVars} className="group p-8 rounded-[2rem] bg-slate-900 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 mb-6 group-hover:text-amber-400 transition-colors">
                <Truck size={20} />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">Logistics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automated tracking updates and delivery quotes. Reduce support calls by 80%.
              </p>
            </motion.div>

            {/* Retail */}
            <motion.div variants={revealVars} className="group p-8 rounded-[2rem] bg-slate-900 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 mb-6 group-hover:text-amber-400 transition-colors">
                <ShoppingBag size={20} />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">Luxury Retail</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your digital sales rep. Negotiates deals and closes sales automatically.
              </p>
            </motion.div>
          </div>
        </ScrollSection>
      </section>

      {/* === 5. THE CLOSE (CTA) === */}
      <section id="contact" className="px-6 py-20 text-center relative overflow-hidden border-t border-white/5 bg-black">
        <div className="absolute inset-0 bg-amber-600/5 pointer-events-none"></div>
        
        <ScrollSection className="max-w-2xl mx-auto relative z-10">
          <motion.h2 variants={revealVars} className="font-serif text-4xl md:text-6xl text-white mb-6">Ready to Scale?</motion.h2>
          <motion.p variants={revealVars} className="text-slate-400 mb-10 text-lg font-light">
            I only onboard <span className="text-white font-bold">3 partners</span> per month. Secure your slot.
          </motion.p>
          
          <motion.div variants={revealVars}>
            <a 
              href="https://wa.me/2348106293674?text=Hi%20Bolu%2C%20I%20saw%20your%20page.%20I%27m%20interested%20in%20automating%20my%20business."
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle size={24} fill="white" className="text-[#25D366]" />
              Chat on WhatsApp
            </a>
          </motion.div>
          
          <motion.p variants={revealVars} className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest">
            Direct Line to Lead Engineer
          </motion.p>
        </ScrollSection>
      </section>

    </main>
  );
}
