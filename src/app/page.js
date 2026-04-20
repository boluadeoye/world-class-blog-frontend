"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, Zap, ShieldCheck, Cpu, Layout, Code2, Layers } from 'lucide-react';
import Lenis from 'lenis';

// --- CORE CONFIGURATION ---
const VISCOUS_EASE = [0.22, 1, 0.36, 1];
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
  { q: "What is your architectural approach?", a: "I build headless, decoupled systems exclusively with Next.js and React. By leveraging Server Components and TypeScript, I eliminate legacy technical debt, ensuring sub-second load times." },
  { q: "How do you ensure design fidelity?", a: "I treat Figma as law. I use Tailwind CSS to map exact design tokens, ensuring that spacing, typography, and border-radii are mathematically identical to the designer's intent." },
  { q: "Do you handle complex state and APIs?", a: "Yes. I specialize in bridging React interfaces with complex backends, utilizing TypeScript for end-to-end type safety across payment gateways and custom JWT flows." }
];

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
  const { scrollYProgress } = useScroll({ target: ref, offset:["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1],["-15%", "15%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-[2rem] bg-white/5 border border-white/10">
      <motion.img style={{ y, scale: 1.15 }} src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
      <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

const MeshBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020205]">
    <motion.div animate={{ scale: [1, 1.2, 1], opacity:[0.15, 0.3, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600 blur-[120px]" />
    <motion.div animate={{ scale: [1, 1.5, 1], opacity:[0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 2, ease: "easeInOut" }} className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-teal-600 blur-[120px]" />
    <motion.div animate={{ scale: [1, 1.3, 1], opacity:[0.15, 0.25, 0.15] }} transition={{ duration: 12, repeat: Infinity, delay: 4, ease: "easeInOut" }} className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-violet-600 blur-[120px]" />
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.04] mix-blend-overlay" />
  </div>
);

export default function Portfolio() {
  const [activeFaq, setActiveFaq] = useState(null);

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
  }, []);

  return (
    <main className="relative text-[#F9FAFB] selection:bg-[#6366F1] selection:text-white overflow-hidden">
      <MeshBackground />

      {/* --- THIN GLASS HEADER --- */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-5xl">
        <div className="bg-[#080808]/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex justify-between items-center shadow-2xl">
          <span className="font-sans font-bold tracking-widest text-xs text-white uppercase">Adeoye Boluwatife</span>
          <div className="flex items-center gap-6">
            <a href="https://boluadeoye.com.ng" className="hidden md:flex text-[10px] font-mono uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors items-center gap-2">
              <Globe size={14} /> Index
            </a>
            <a href={WHATSAPP_URL} className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 hover:text-white transition-colors flex items-center gap-1">
              Initiate <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </nav>

      {/* --- 1. THE MONOLITH (HERO) --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-[20vh] pb-20 px-6">
        <Reveal y={20}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['React 19', 'Next.js 16', 'TypeScript'].map((tech, i) => (
              <div key={i} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                {tech}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative flex flex-col items-center w-full max-w-5xl">
          <Reveal delay={0.1}>
            <h1 className="text-[15vw] md:text-[9vw] leading-[0.8] text-center flex flex-col items-center relative z-20">
              <span className="font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl">ADEOYE</span>
              <span className="font-serif italic font-light text-indigo-400 -mt-4 md:-mt-8 drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]">Boluwatife</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3} y={60}>
            <div className="mt-12 w-[55vw] md:w-[22vw] aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)] relative group z-10">
              <img src={ASSETS.portrait} alt="Adeoye Boluwatife" className="w-full h-full object-cover saturate-50 group-hover:saturate-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-90" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- 2. THE MANIFESTO --- */}
      <section className="relative z-10 py-32 px-6 max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="text-2xl md:text-4xl font-serif italic leading-relaxed text-white/80">
            "I architect high-performance digital artifacts. By leveraging the absolute power of <span className="text-indigo-400 font-medium">React</span>, <span className="text-indigo-400 font-medium">Next.js</span>, and <span className="text-indigo-400 font-medium">TypeScript</span>, I transform Figma blueprints into uncompromising, sub-second realities."
          </p>
        </Reveal>
      </section>

      {/* --- 3. THE ARTIFACTS --- */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <Reveal><h2 className="text-[12vw] md:text-[6vw] font-sans font-black tracking-tighter mb-24 opacity-10">ARTIFACTS</h2></Reveal>
        <div className="space-y-32">
          {ASSETS.projects.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-20`}>
              <div className="w-full md:w-3/5 aspect-[16/10]">
                <a href={p.link} target="_blank" rel="noreferrer" className="block w-full h-full">
                  <ParallaxImage src={p.image} alt={p.title} />
                </a>
              </div>
              <div className="w-full md:w-2/5 space-y-4">
                <Reveal delay={0.1}>
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-indigo-400">{String(i + 1).padStart(2, '0')} — {p.tag}</span>
                  <h3 className="text-3xl md:text-5xl font-serif italic mt-2">{p.title}</h3>
                </Reveal>
                <Reveal delay={0.2}>
                  <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 mt-6 group">
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Explore</span>
                    <ArrowUpRight size={16} className="text-white/40 group-hover:text-indigo-400 group-hover:rotate-45 transition-all" />
                  </a>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. THE ENGINE (TECH STACK) --- */}
      <section className="relative z-10 py-32 border-y border-white/5 overflow-hidden bg-white/[0.01] backdrop-blur-sm">
        <div className="flex whitespace-nowrap">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }} className="flex gap-16 px-8 items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-indigo-900/20">REACT</span>
                <span className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">NEXT.JS</span>
                <span className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-teal-400 to-teal-900/20">TYPESCRIPT</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 5. THE FIDELITY LAB --- */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">The Engineering Core</h2>
            <p className="text-white/50 leading-relaxed text-lg font-light">
              Beautiful design is irrelevant if the architecture crumbles. I enforce strict type safety, component polymorphism, and edge-runtime rendering to ensure the code is as flawless as the interface.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Code2, title: "React 19", desc: "Server Components & concurrent rendering." },
              { icon: Layers, title: "Next.js 16", desc: "App Router, Edge caching, & API routes." },
              { icon: ShieldCheck, title: "TypeScript", desc: "End-to-end type safety & strict interfaces." },
              { icon: Layout, title: "Tailwind", desc: "Mathematical token mapping from Figma." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:border-indigo-500/30 transition-colors group">
                  <item.icon size={28} strokeWidth={1.5} className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-md font-bold tracking-tight mb-2">{item.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. THE DIALOGUE (FAQ) --- */}
      <section className="relative z-10 py-32 px-6 max-w-4xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-4xl font-serif italic mb-12">Inquiries</h2></Reveal>
        <div className="border-t border-white/10">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-b border-white/10">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-6 flex justify-between items-center text-left group">
                  <span className="text-lg md:text-xl font-light group-hover:text-indigo-400 transition-colors pr-8">{faq.q}</span>
                  <div className="relative w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <div className={`absolute w-full h-[1px] bg-white transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-indigo-400' : ''}`} />
                    <div className={`absolute w-[1px] h-full bg-white transition-transform duration-500 ${activeFaq === i ? 'rotate-90 bg-indigo-400 opacity-0' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: VISCOUS_EASE }} className="overflow-hidden">
                      <p className="pb-8 text-white/50 leading-relaxed text-base font-light max-w-2xl">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- 7. THE INITIATION (PRE-FOOTER) --- */}
      <section className="relative z-10 py-40 px-6 flex flex-col items-center justify-center text-center">
        <Reveal>
          <h2 className="text-[10vw] md:text-[6vw] font-sans font-black tracking-tighter leading-none mb-8">INITIATE</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href={WHATSAPP_URL} className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-serif italic text-indigo-400 hover:text-white transition-colors">
            <span className="border-b border-indigo-400/30 group-hover:border-white pb-1 transition-colors">Start a Conversation</span>
            <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
          </a>
        </Reveal>
      </section>

      {/* --- 8. COMPRESSED COLOPHON (FOOTER) --- */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10 bg-[#020205]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
          <span>© 2026 Adeoye Boluwatife</span>
          <span className="hidden md:block text-indigo-400/50">React // Next.js // TypeScript</span>
          <span>Lagos, NG</span>
        </div>
      </footer>
    </main>
  );
}
