"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, Code2, Layers, ShieldCheck, Layout } from 'lucide-react';
import Lenis from 'lenis';

// --- CORE CONFIGURATION ---
const VISCOUS_EASE =[0.22, 1, 0.36, 1];
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

const SmartHeader = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{ visible: { y: 0 }, hidden: { y: "-150%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: VISCOUS_EASE }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-6xl"
    >
      <div className="bg-[#080808]/60 backdrop-blur-2xl border border-white/10 px-6 py-4 rounded-2xl flex justify-between items-center shadow-2xl">
        <span className="font-sans font-bold tracking-widest text-xs text-white uppercase">Adeoye Boluwatife</span>
        <div className="flex items-center gap-8">
          <a href="https://boluadeoye.com.ng" className="hidden md:flex text-[10px] font-mono uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors items-center gap-2">
            <Globe size={14} /> Index
          </a>
          <a href={WHATSAPP_URL} className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 hover:text-white transition-colors flex items-center gap-2">
            Initiate <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default function Portfolio() {
  const[activeFaq, setActiveFaq] = useState(null);

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
    <main className="relative bg-[#020205] text-[#F9FAFB] selection:bg-[#6366F1] selection:text-white">
      {/* Subtle Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      <SmartHeader />

      {/* --- 1. THE EDITORIAL HERO --- */}
      <section className="relative z-10 min-h-screen flex items-center pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          {/* Typography Block */}
          <div className="md:col-span-8 flex flex-col justify-center order-2 md:order-1">
            <Reveal>
              <div className="flex gap-4 mb-8">
                {['React 19', 'Next.js 16', 'TypeScript'].map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono uppercase tracking-widest text-indigo-400/80 border border-indigo-400/20 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[16vw] md:text-[9vw] font-sans font-black leading-[0.85] tracking-tighter text-white">
                ADEOYE
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-[16vw] md:text-[9vw] font-serif italic leading-[0.85] text-indigo-400 md:ml-24">
                Boluwatife
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-12 text-lg md:text-xl font-light text-white/50 max-w-xl leading-relaxed">
                Frontend Architect. Transforming Figma blueprints into uncompromising, sub-second realities.
              </p>
            </Reveal>
          </div>

          {/* Portrait Block */}
          <div className="md:col-span-4 order-1 md:order-2">
            <Reveal delay={0.4} y={60}>
              <div className="w-full max-w-[280px] md:max-w-full mx-auto aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <img src={ASSETS.portrait} alt="Adeoye Boluwatife" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* --- 2. THE CINEMATIC STICKY STACK (ARTIFACTS) --- */}
      <section className="relative z-10 w-full bg-[#020205] pb-32">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
          <Reveal><h2 className="text-4xl md:text-6xl font-serif italic text-white/80">Selected Artifacts</h2></Reveal>
        </div>
        
        <div className="relative w-full">
          {ASSETS.projects.map((p, i) => (
            <div key={i} className="sticky top-0 h-screen w-full flex items-center justify-center pt-24 pb-12 px-6">
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: VISCOUS_EASE }}
                className="w-full max-w-7xl h-full max-h-[800px] bg-[#080808] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_-20px_50px_rgba(0,0,0,0.4)]"
              >
                {/* Image Container */}
                <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden group">
                  <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] md:from-transparent md:bg-gradient-to-r via-transparent to-transparent opacity-80" />
                </div>
                
                {/* Data Container */}
                <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center bg-[#080808] relative z-10">
                  <span className="text-indigo-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-6 block">
                    0{i + 1} — {p.tag}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-serif italic mb-8 text-white">{p.title}</h3>
                  <a href={p.link} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors w-fit">
                    <span className="border-b border-white/20 group-hover:border-white pb-1 transition-colors">Explore Artifact</span>
                    <ArrowUpRight size={18} className="group-hover:rotate-45 group-hover:text-indigo-400 transition-all" />
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. THE ENGINE (TECH STACK MARQUEE) --- */}
      <section className="relative z-10 py-32 border-y border-white/5 overflow-hidden bg-[#050508]">
        <div className="flex whitespace-nowrap">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }} className="flex gap-16 px-8 items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10">REACT</span>
                <span className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-indigo-900/20">NEXT.JS</span>
                <span className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10">TYPESCRIPT</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 4. THE FIDELITY LAB --- */}
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
                <div className="p-8 bg-[#080808] rounded-[1.5rem] border border-white/5 hover:border-indigo-500/30 transition-colors group h-full">
                  <item.icon size={28} strokeWidth={1.5} className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-md font-bold tracking-tight mb-2">{item.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. THE DIALOGUE (FAQ) --- */}
      <section className="relative z-10 py-32 px-6 max-w-4xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-4xl font-serif italic mb-12">Inquiries</h2></Reveal>
        <div className="border-t border-white/10">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-b border-white/10">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-8 flex justify-between items-center text-left group">
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

      {/* --- 6. THE INITIATION (PRE-FOOTER) --- */}
      <section className="relative z-10 py-40 px-6 flex flex-col items-center justify-center text-center">
        <Reveal>
          <h2 className="text-[12vw] md:text-[8vw] font-sans font-black tracking-tighter leading-none mb-8 text-white">INITIATE</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a href={WHATSAPP_URL} className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-serif italic text-indigo-400 hover:text-white transition-colors">
            <span className="border-b border-indigo-400/30 group-hover:border-white pb-1 transition-colors">Start a Conversation</span>
            <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
          </a>
        </Reveal>
      </section>

      {/* --- 7. COMPRESSED COLOPHON (FOOTER) --- */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10 bg-[#050508]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
          <span>© 2026 Adeoye Boluwatife</span>
          <span className="hidden md:block text-indigo-400/50">React // Next.js // TypeScript</span>
          <span>Lagos, NG</span>
        </div>
      </footer>
    </main>
  );
}
