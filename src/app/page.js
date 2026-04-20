"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, Plus, Minus, Zap, ShieldCheck, Cpu, Layout, Code2 } from 'lucide-react';
import Lenis from 'lenis';

// --- CORE CONFIGURATION ---
const VISCOUS_EASE =[0.22, 1, 0.36, 1];
const WHATSAPP_URL = "https://wa.me/2348106293674";

const ASSETS = {
  portrait: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg",
  projects:[
    { title: "Sleigh Strands", tag: "Headless E-Commerce", image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png", link: "https://sleigh-strands-headless.vercel.app/" },
    { title: "AutoAM", tag: "Automotive Platform", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop", link: "https://autoam-web.vercel.app/" },
    { title: "Peace Academy", tag: "EdTech Ecosystem", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop", link: "https://peace-service-academy.org" }
  ]
};

const FAQS =[
  { q: "What is your architectural approach?", a: "I build headless, decoupled systems. By separating the frontend (Next.js) from the backend, I eliminate legacy technical debt, ensuring sub-second load times and absolute security." },
  { q: "How do you ensure design fidelity?", a: "I treat Figma as law. I use Tailwind CSS to map exact design tokens, ensuring that spacing, typography, and border-radii are mathematically identical to the designer's intent." },
  { q: "Do you handle complex state and APIs?", a: "Yes. I specialize in bridging frontend interfaces with complex backends, including WooCommerce, payment gateways, and custom JWT authentication flows." }
];

const TECH_STACK =["Next.js 16", "React 19", "Framer Motion", "Tailwind CSS", "TypeScript", "WebGL", "Lenis", "Vercel Edge"];

// --- MICRO-COMPONENTS ---
const Reveal = ({ children, delay = 0, y = 40 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1.2, delay, ease: VISCOUS_EASE }}
  >
    {children}
  </motion.div>
);

const ParallaxImage = ({ src, alt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1],["-15%", "15%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-[2rem] bg-white/5 border border-white/10">
      <motion.img style={{ y, scale: 1.15 }} src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
      <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default function Portfolio() {
  const [activeFaq, setActiveFaq] = useState(null);

  // Initialize Viscous Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  },[]);

  return (
    <main className="bg-[#080808] text-[#F9FAFB] selection:bg-[#6366F1] selection:text-white overflow-hidden">
      {/* Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl">
        <div className="bg-[#080808]/60 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full flex justify-between items-center">
          <span className="font-sans font-black tracking-tighter text-xl text-white">AB.</span>
          <div className="flex items-center gap-6">
            <a href="https://boluadeoye.com.ng" className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors flex items-center gap-2">
              <Globe size={14} /> Index
            </a>
            <a href={WHATSAPP_URL} className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#6366F1] hover:text-white transition-all duration-500">
              Initiate
            </a>
          </div>
        </div>
      </nav>

      {/* --- 1. THE MONOLITH (HERO) --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: VISCOUS_EASE }}
            className="text-[18vw] font-sans font-black tracking-tighter text-white/[0.03] whitespace-nowrap select-none"
          >
            BOLUWATIFE
          </motion.h1>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <Reveal y={60}>
            <div className="w-[60vw] md:w-[25vw] aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group">
              <img src={ASSETS.portrait} alt="Adeoye Boluwatife" className="w-full h-full object-cover saturate-0 group-hover:saturate-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif italic font-light">Frontend Architect</h2>
              <p className="text-sm font-mono uppercase tracking-[0.4em] text-white/40">Absolute Figma Fidelity</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- 2. THE MANIFESTO --- */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="text-3xl md:text-5xl font-serif italic leading-tight text-white/80">
            "I do not build mere websites. I architect <span className="text-white font-medium">digital artifacts</span> engineered for sub-second performance and uncompromising visual authority."
          </p>
        </Reveal>
      </section>

      {/* --- 3. THE ARTIFACTS (SELECTED WORKS) --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-[10vw] md:text-[6vw] font-sans font-black tracking-tighter mb-32 opacity-20">ARTIFACTS</h2></Reveal>
        <div className="space-y-40">
          {ASSETS.projects.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
              <div className="w-full md:w-3/5 aspect-[16/10]">
                <a href={p.link} target="_blank" rel="noreferrer" className="block w-full h-full cursor-none">
                  <ParallaxImage src={p.image} alt={p.title} />
                </a>
              </div>
              <div className="w-full md:w-2/5 space-y-6">
                <Reveal delay={0.1}>
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#6366F1]">{String(i + 1).padStart(2, '0')} — {p.tag}</span>
                  <h3 className="text-4xl md:text-5xl font-serif italic mt-4">{p.title}</h3>
                </Reveal>
                <Reveal delay={0.2}>
                  <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 mt-8 group">
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-[#6366F1] transition-colors">Explore Artifact</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#6366F1] group-hover:border-transparent transition-all duration-500">
                      <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </a>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. THE ENGINE (TECH STACK) --- */}
      <section className="py-32 border-y border-white/5 overflow-hidden bg-white/[0.01]">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x:["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-16 px-8 items-center"
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span key={i} className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 5. THE FIDELITY LAB (PROCESS) --- */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24">
          <Reveal>
            <h2 className="text-5xl font-serif italic mb-8">The Fidelity Lab</h2>
            <p className="text-white/50 leading-relaxed text-lg font-light">
              The bridge between design and engineering is absolute precision. Every shadow, bezier curve, and typographic scale is mathematically translated from Figma into production-ready React architecture.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: Layout, title: "Token Mapping", desc: "1:1 translation of design systems." },
              { icon: Code2, title: "Component Logic", desc: "Scalable, polymorphic React structures." },
              { icon: Zap, title: "State Orchestration", desc: "Fluid data flow and caching." },
              { icon: ShieldCheck, title: "Edge Security", desc: "Hardened API routes and auth." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 hover:border-[#6366F1]/30 transition-colors group">
                  <item.icon size={32} strokeWidth={1} className="text-[#6366F1] mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg font-bold tracking-tight mb-2">{item.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. THE PERFORMANCE AUDIT --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/10 to-white/0 border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#6366F1]/10 blur-[100px] pointer-events-none" />
          <Reveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#6366F1] mb-8 block">Lighthouse Metrics</span>
            <h2 className="text-[15vw] md:text-[10vw] font-sans font-black tracking-tighter leading-none text-white drop-shadow-2xl">100</h2>
            <p className="text-xl md:text-2xl font-serif italic text-white/60 mt-8">Sub-second LCP. Zero layout shift. Uncompromising speed.</p>
          </Reveal>
        </div>
      </section>

      {/* --- 7. THE DIALOGUE (FAQ) --- */}
      <section className="py-40 px-6 max-w-4xl mx-auto">
        <Reveal><h2 className="text-4xl font-serif italic mb-16">Inquiries</h2></Reveal>
        <div className="border-t border-white/10">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-b border-white/10">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-8 flex justify-between items-center text-left group">
                  <span className="text-xl md:text-2xl font-light group-hover:text-[#6366F1] transition-colors pr-8">{faq.q}</span>
                  <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <div className={`absolute w-full h-[1px] bg-white transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-[#6366F1]' : ''}`} />
                    <div className={`absolute w-[1px] h-full bg-white transition-transform duration-500 ${activeFaq === i ? 'rotate-90 bg-[#6366F1] opacity-0' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: VISCOUS_EASE }} className="overflow-hidden">
                      <p className="pb-10 text-white/50 leading-relaxed text-lg font-light max-w-2xl">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- 8. THE INITIATION (CTA) --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#6366F1] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <Reveal>
          <h2 className="text-[12vw] md:text-[8vw] font-sans font-black tracking-tighter leading-none text-center">INITIATE</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-xl md:text-3xl font-serif italic mt-8 mb-16 text-white/80 text-center max-w-2xl">
            Ready to architect your next digital artifact? Let us establish the parameters.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <a href={WHATSAPP_URL} className="group relative px-12 py-6 bg-[#080808] text-white rounded-full overflow-hidden flex items-center gap-4">
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] group-hover:text-black transition-colors duration-500">Start a Conversation</span>
            <ArrowUpRight size={18} className="relative z-10 group-hover:text-black group-hover:rotate-45 transition-all duration-500" />
          </a>
        </Reveal>
        
        <div className="absolute bottom-8 w-full px-12 flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">
          <span>© 2026 Adeoye Boluwatife</span>
          <span>Lagos, NG</span>
        </div>
      </section>
    </main>
  );
}
