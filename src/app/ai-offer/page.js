"use client";
import { motion } from "framer-motion";
import { Phone, ShieldCheck, Zap, BrainCircuit, MessageCircle, ArrowRight, Building2, Truck, ShoppingBag, Check } from "lucide-react";
import Link from "next/link";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AIOfferPage() {
  return (
    // Z-INDEX 9999 forces this page to cover the global header/footer
    <main className="fixed inset-0 z-[9999] bg-[#020617] text-slate-200 overflow-y-auto font-sans selection:bg-amber-500/30">
      
      {/* === 1. MINIMALIST LUXURY HEADER === */}
      <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="font-serif text-xl font-bold tracking-tight text-white">Bolu.Dev</div>
        <a href="https://wa.me/2348106293674" className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/20 hover:bg-amber-400/20 transition-colors uppercase tracking-widest">
          <Phone size={12} /> Book Strategy
        </a>
      </nav>

      {/* === 2. HERO: THE PROMISE === */}
      <section className="px-6 pt-20 pb-24 text-center max-w-4xl mx-auto relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Accepting New Clients
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl font-medium text-white leading-[1.05] mb-8 tracking-tight">
            The Digital Employee <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">That Never Sleeps.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Automate your customer support, sales negotiation, and payment verification with a custom AI Architect.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              Get Your Proposal <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* === 3. THE COMPARISON (PAIN VS GAIN) === */}
      <section className="px-6 py-20 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Old Way */}
            <div className="p-8 rounded-3xl bg-red-900/5 border border-red-500/10">
              <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Manual Operations
              </h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3"><span className="text-red-500">✕</span> Missed DMs at night = Lost Revenue.</li>
                <li className="flex items-start gap-3"><span className="text-red-500">✕</span> Slow responses kill customer interest.</li>
                <li className="flex items-start gap-3"><span className="text-red-500">✕</span> Risk of fake alerts & payment fraud.</li>
              </ul>
            </div>

            {/* The New Way */}
            <div className="p-8 rounded-3xl bg-emerald-900/5 border border-emerald-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full"></div>
              <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> AI Automation
              </h3>
              <ul className="space-y-4 text-slate-200">
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 mt-0.5" /> <strong>Instant Replies</strong> (Under 2 seconds).</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 mt-0.5" /> <strong>24/7 Availability</strong> (Even while you sleep).</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 mt-0.5" /> <strong>Payment Verification</strong> before delivery.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* === 4. INDUSTRY SOLUTIONS (REPLACES DEPLOYMENTS) === */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">Industry Solutions</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Tailored for Nigerian Business</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Real Estate */}
          <div className="group p-8 rounded-[2rem] bg-slate-900 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 mb-6 group-hover:text-amber-400 transition-colors">
              <Building2 size={24} />
            </div>
            <h3 className="font-serif text-2xl text-white mb-3">Real Estate</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Auto-schedule inspections, answer "How much?", and qualify high-net-worth buyers instantly.
            </p>
          </div>

          {/* Logistics */}
          <div className="group p-8 rounded-[2rem] bg-slate-900 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 mb-6 group-hover:text-amber-400 transition-colors">
              <Truck size={24} />
            </div>
            <h3 className="font-serif text-2xl text-white mb-3">Logistics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automated tracking updates and delivery quotes. Reduce support calls by 80%.
            </p>
          </div>

          {/* Retail */}
          <div className="group p-8 rounded-[2rem] bg-slate-900 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 mb-6 group-hover:text-amber-400 transition-colors">
              <ShoppingBag size={24} />
            </div>
            <h3 className="font-serif text-2xl text-white mb-3">Luxury Retail</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your digital sales rep. Negotiates deals within your set limits and closes sales automatically.
            </p>
          </div>
        </div>
      </section>

      {/* === 5. TECH AUTHORITY (NO GEMINI) === */}
      <section className="py-12 border-y border-white/5 bg-black/50 text-center">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-6">Enterprise-Grade Infrastructure</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-lg font-bold text-slate-300">Next.js 14</span>
          <span className="text-lg font-bold text-slate-300">Neural Engine</span>
          <span className="text-lg font-bold text-slate-300">Paystack</span>
          <span className="text-lg font-bold text-slate-300">99.9% Uptime</span>
        </div>
      </section>

      {/* === 6. THE CLOSE (CTA) === */}
      <section id="contact" className="px-6 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-600/5 pointer-events-none"></div>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">Ready to Scale?</h2>
          <p className="text-slate-400 mb-10 text-lg font-light">
            I only onboard <span className="text-white font-bold">3 partners</span> per month to ensure quality. Secure your slot.
          </p>
          
          <a 
            href="https://wa.me/2348106293674?text=Hi%20Bolu%2C%20I%20saw%20your%20page.%20I%27m%20interested%20in%20automating%20my%20business."
            target="_blank"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle size={24} fill="white" className="text-[#25D366]" />
            Chat on WhatsApp
          </a>
          
          <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest">
            Direct Line to Lead Engineer
          </p>
        </div>
      </section>

    </main>
  );
}
