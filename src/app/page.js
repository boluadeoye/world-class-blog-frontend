"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, Code2, Layers, ShieldCheck, Layout } from 'lucide-react';
import Lenis from 'lenis';

// --- CORE CONFIGURATION ---
const EASE =[0.16, 1, 0.3, 1]; // Apple-style ultra-smooth ease
const WHATSAPP_URL = "https://wa.me/2348106293674";

const ASSETS = {
  portrait: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg",
  projects:[
    { title: "Sleigh Strands", tag: "Next.js E-Commerce", image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png", link: "https://sleigh-strands-headless.vercel.app/" },
    { title: "AutoAM", tag: "React Ecosystem", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop", link: "https://autoam-web.vercel.app/" },
    { title: "Peace Academy", tag: "TypeScript Architecture", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop", link: "https://peace-service-academy.org" }
  ]
};

const FAQS =[
  { q: "Architectural Approach", a: "Headless, decoupled systems exclusively with Next.js and React. Server Components and TypeScript eliminate legacy debt, ensuring sub-second load times." },
  { q: "Design Fidelity", a: "Figma is law. Tailwind CSS is used to map exact design tokens, ensuring spacing, typography, and border-radii are mathematically identical to the designer's intent." },
  { q: "State & APIs", a: "Bridging React interfaces with complex backends, utilizing TypeScript for end-to-end type safety across payment gateways and custom JWT flows." }
];

// --- MICRO-COMPONENTS ---
const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5%" }}
    transition={{ duration: 0.8, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [activeFaq, setActiveFaq] = useState(null);

  // Flawless Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  },[]);

  return (
    <main className="relative bg-black text-white selection:bg-white selection:text-black min-h-screen font-sans">
      {/* Pure Noise Overlay - Strictly Non-Interactive */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      {/* --- ULTRA-MINIMAL HEADER --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent pt-6 pb-12 px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <span className="font-sans font-medium tracking-tight text-sm text-white/90">Adeoye Boluwatife</span>
          <div className="flex items-center gap-6">
            <a href="https://boluadeoye.com.ng" className="text-xs font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2">
              <Globe size={14} /> Index
            </a>
            <a href={WHATSAPP_URL} className="text-xs font-medium text-white hover:text-white/70 transition-colors flex items-center gap-1">
              Initiate <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      {/* --- 1. THE PURIST HERO --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <FadeIn>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-8 border border-white/10">
              <img src={ASSETS.portrait} alt="Adeoye Boluwatife" className="w-full h-full object-cover grayscale" />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6">
              Frontend Architect. <br className="hidden md:block" />
              <span className="text-white/40">Engineering fidelity.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed mb-12">
              I transform Figma blueprints into uncompromising, sub-second realities using React, Next.js, and TypeScript.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <a href={WHATSAPP_URL} className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300">
              Start a Conversation <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* --- 2. THE ARTIFACTS (FLAWLESS LIST) --- */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn><h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-16">Selected Works</h2></FadeIn>
        
        <div className="flex flex-col gap-32">
          {ASSETS.projects.map((p, i) => (
            <FadeIn key={i}>
              <a href={p.link} target="_blank" rel="noreferrer" className="group block relative z-20 cursor-pointer">
                <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-8 relative">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-2 group-hover:text-white/80 transition-colors">{p.title}</h3>
                    <p className="text-white/50 text-sm">{p.tag}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- 3. THE ENGINEERING CORE --- */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">The Architecture</h2>
              <p className="text-white/50 leading-relaxed font-light">
                Beautiful design is irrelevant if the foundation crumbles. I enforce strict type safety, component polymorphism, and edge-runtime rendering.
              </p>
            </FadeIn>
          </div>
          
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-8">
            {[
              { icon: Code2, title: "React 19", desc: "Server Components & concurrent rendering." },
              { icon: Layers, title: "Next.js 16", desc: "App Router, Edge caching, & API routes." },
              { icon: ShieldCheck, title: "TypeScript", desc: "End-to-end type safety & strict interfaces." },
              { icon: Layout, title: "Tailwind", desc: "Mathematical token mapping from Figma." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <item.icon size={24} className="text-white/80 mb-4" />
                  <h4 className="text-lg font-medium tracking-tight mb-2">{item.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. INQUIRIES (FAQ) --- */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/10">
        <FadeIn><h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16">Inquiries</h2></FadeIn>
        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border-b border-white/10">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)} 
                  className="w-full py-8 flex justify-between items-center text-left group cursor-pointer relative z-20"
                >
                  <span className="text-lg md:text-xl font-light text-white/80 group-hover:text-white transition-colors pr-8">{faq.q}</span>
                  <div className="relative w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <div className={`absolute w-full h-[1px] bg-white transition-transform duration-500 ${activeFaq === i ? 'rotate-180' : ''}`} />
                    <div className={`absolute w-[1px] h-full bg-white transition-transform duration-500 ${activeFaq === i ? 'rotate-90 opacity-0' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{ duration: 0.4, ease: EASE }} 
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-white/50 leading-relaxed text-base font-light max-w-2xl">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- 5. FOOTER --- */}
      <footer className="relative z-10 py-12 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-medium text-white/60">Available for new opportunities</span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-white/40">
            <span>© 2026 Adeoye Boluwatife</span>
            <span>Lagos, NG</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
