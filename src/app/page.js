"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe, Layers, Code2, Database, Cpu, Server, Figma, Braces, Sparkles, Workflow, Zap, Activity } from 'lucide-react';
import Lenis from 'lenis';

// --- CONFIGURATION ---
const EASE =[0.19, 1.0, 0.22, 1.0];
const WHATSAPP_URL = "https://wa.me/2348106293674";
const PORTRAIT_URL = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg";

const PROJECTS =[
  { title: "Sleigh Strands", scope: "Next.js E-Commerce • Vercel", image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png", link: "https://sleigh-strands-headless.vercel.app/" },
  { title: "AutoAM Web", scope: "React Automotive App • Node.js", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop", link: "https://autoam-web.vercel.app/" },
  { title: "Peace Academy", scope: "EdTech Architecture • TypeScript", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop", link: "https://peace-service-academy.org" }
];

const ECOSYSTEM =[
  { name: "React 19", type: "Interface Engine", icon: Code2, span: "col-span-2 md:col-span-1" },
  { name: "Next.js 16", type: "Full-Stack Meta", icon: Layers, span: "col-span-2" },
  { name: "TypeScript", type: "Strict Type Safety", icon: Braces, span: "col-span-2 md:col-span-1" },
  { name: "Node.js", type: "Backend Runtimes", icon: Server, span: "col-span-1" },
  { name: "PostgreSQL", type: "Relational Data", icon: Database, span: "col-span-1 md:col-span-2" },
  { name: "Tailwind CSS", type: "Atomic Styling", icon: Workflow, span: "col-span-1" },
  { name: "Prisma ORM", type: "Database Layer", icon: Cpu, span: "col-span-1" },
  { name: "Framer Motion", type: "Kinetic UI Physics", icon: Sparkles, span: "col-span-2 md:col-span-1" },
  { name: "Figma UI/UX", type: "High Fidelity Mapping", icon: Figma, span: "col-span-1 md:col-span-2" }
];

// --- MICRO-COMPONENTS ---
const Reveal = ({ children, delay = 0, y = 30, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.2, delay, ease: EASE }}>
    {children}
  </motion.div>
);

const ParallaxImage = ({ src }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:["start end", "end start"] });
  const scale = useTransform(scrollYProgress,[0, 1], [1.1, 1]);
  return (
    <div ref={ref} className="w-full h-full overflow-hidden">
      <motion.img style={{ scale }} src={src} className="w-full h-full object-cover transition-all duration-[2000ms] ease-out hover:scale-[1.12]" />
    </div>
  );
};

export default function Portfolio() {
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="relative bg-[#020202] text-[#E0E0E0] overflow-x-hidden selection:bg-[#4338CA] selection:text-white">
      {/* 1. ATMOSPHERIC ENVIRONMENT */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4338CA] blur-[150px] opacity-20 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[60%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#9D4EDD] blur-[180px] opacity-10 animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-screen" />
      </div>

      {/* 2. THE NON-STICKY HEADER */}
      <header className="absolute top-0 left-0 w-full pt-8 px-6 md:px-12 z-50">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-sans font-medium text-white tracking-wide">Adeoye Boluwatife</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#9D4EDD]">Lagos // NG</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://boluadeoye.com.ng" className="text-xs font-mono uppercase text-white/50 hover:text-white transition-colors flex items-center gap-2">
              <Globe size={14} /> Main Site
            </a>
            <a href={WHATSAPP_URL} className="text-xs font-bold text-white px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all">
              Initiate 
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO VANGUARD */}
      <section className="relative z-10 min-h-screen flex flex-col justify-end pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto pt-48">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
          <div className="md:col-span-8 flex flex-col gap-6">
            <Reveal y={50}>
              <h1 className="text-6xl md:text-8xl lg:text-[140px] font-medium leading-[0.85] tracking-tighter text-white">
                Frontend <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30 italic">Architect.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-2xl font-light text-white/50 max-w-2xl leading-relaxed">
                Transforming complex logic and high-fidelity Figma structures into blazing, uncompromising <span className="text-white">Edge-rendered ecosystems.</span>
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-4 hidden md:block">
            <Reveal delay={0.4}>
              <div className="w-full aspect-[4/5] rounded-[2rem] bg-white/5 border border-white/10 p-2 shadow-2xl relative">
                <img src={PORTRAIT_URL} className="w-full h-full object-cover rounded-[1.5rem] filter saturate-0 hover:saturate-100 transition-all duration-1000" alt="Adeoye Boluwatife" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE & METRICS STRIP */}
      <section className="relative z-10 border-y border-white/5 bg-[#0A0A0A]/60 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { stat: "Sub-Second", label: "LCP Optimization", icon: Zap },
            { stat: "React 19", label: "Server Components", icon: Code2 },
            { stat: "0ms Shift", label: "Cumulative Layout", icon: Activity }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1} className="w-full">
              <div className="flex items-center gap-6 pt-6 md:pt-0 pl-0 md:pl-12 first:pl-0">
                <div className="p-4 bg-white/5 rounded-full border border-white/10"><item.icon size={24} className="text-[#4338CA]" /></div>
                <div>
                  <h3 className="text-2xl font-medium text-white">{item.stat}</h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40">{item.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. IMMERSIVE ARTIFACT GALLERY */}
      <section className="relative z-10 py-40 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <Reveal><h2 className="text-[12vw] md:text-[6vw] font-black tracking-tighter leading-none mb-24 opacity-10 uppercase">Select Artifacts</h2></Reveal>
        
        <div className="flex flex-col gap-32">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} y={80}>
              <div className="relative group block z-20 cursor-default flex flex-col lg:flex-row gap-12 lg:items-center">
                <div className="w-full lg:w-2/3">
                  <div className="relative aspect-[16/10] md:aspect-[21/10] rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20">
                    <a href={p.link} target="_blank" rel="noreferrer" className="block w-full h-full relative cursor-pointer group-hover:scale-100 scale-[0.98] transition-transform duration-700 ease-[0.19,1,0.22,1]">
                       <ParallaxImage src={p.image} />
                       <div className="absolute inset-0 bg-[#4338CA]/20 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </a>
                  </div>
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-6 pl-0 lg:pl-12">
                  <span className="text-[#9D4EDD] text-xs font-mono uppercase tracking-widest border border-[#9D4EDD]/20 px-4 py-2 rounded-full w-fit">
                    0{i + 1} — Live
                  </span>
                  <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white">{p.title}</h3>
                  <p className="text-xl text-white/50">{p.scope}</p>
                  <a href={p.link} target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-3 text-sm uppercase tracking-widest font-bold text-white group/btn w-fit">
                     View Project <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500"><ArrowUpRight size={18} /></div>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. EXPANDED BENTO ECOSYSTEM */}
      <section className="relative z-10 py-40 px-6 md:px-12 border-t border-white/10 bg-[#000000]/40 backdrop-blur-3xl">
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div className="flex flex-col gap-4 mb-20 max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter">The Complete Ecosystem</h2>
              <p className="text-lg text-white/40 leading-relaxed font-light">My expertise is not bound to a single library. It spans the entire JavaScript lifecycle—from Edge databases to dynamic layout choreography.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px]">
            {ECOSYSTEM.map((tech, i) => (
              <Reveal key={i} delay={i * 0.05} className={`group ${tech.span}`}>
                <div className="w-full h-full p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4338CA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <tech.icon size={32} className="text-white/40 group-hover:text-[#9D4EDD] transition-colors duration-500 relative z-10" />
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-xl font-medium text-white mb-1 tracking-tight">{tech.name}</h3>
                    <p className="text-xs font-mono uppercase text-white/30 tracking-wider">{tech.type}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PHILOSOPHY / FAQ BLOCK */}
      <section className="relative z-10 py-40 px-6 md:px-12 max-w-screen-xl mx-auto border-t border-white/10">
        <div className="grid md:grid-cols-12 gap-16 md:gap-24">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-medium mb-6">Execution Parameters.</h2>
              <p className="text-white/40 font-light text-lg">The methodology behind the artifacts.</p>
            </Reveal>
          </div>
          <div className="md:col-span-7 flex flex-col border-t border-white/10">
            {[
              { q: "Is Figma Fidelity really mathematical?", a: "Yes. Spacing tokens, precise border radii, Bezier easing curves, and layout gridding from your design files are hardcoded using Tailwind variables and exact CSS functions. No estimations." },
              { q: "How is performance achieved?", a: "Through decoupling. Moving rendering to Vercel's Edge, heavily compressing WebP/AVIF imagery, stripping unused Javascript payloads, and orchestrating strict React Server Component logic." },
              { q: "Data flows & Authentications?", a: "Implementing stateless JWT sessions across Prisma-connected databases (Neon/Supabase) to deliver an interface that requires no buffering or reloading to display mutation states." }
            ].map((faq, i) => (
              <Reveal key={i}>
                <div className="border-b border-white/10">
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-10 flex justify-between items-center text-left cursor-pointer group">
                    <span className="text-2xl font-light text-white/70 group-hover:text-white transition-colors">{faq.q}</span>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 group-hover:bg-[#4338CA] group-hover:border-transparent transition-all">
                      <span className={`text-white transition-transform duration-500 text-2xl leading-none font-light ${activeFaq === i ? 'rotate-45' : ''}`}>+</span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="overflow-hidden">
                        <p className="pb-10 text-white/50 text-lg leading-relaxed font-light max-w-2xl">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COLOSSAL CTA FOOTER */}
      <footer className="relative z-10 flex flex-col px-6 md:px-12 bg-white text-black min-h-screen justify-between pt-32 pb-8 overflow-hidden rounded-t-[3rem] mt-[-2rem]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, black 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-screen-xl mx-auto w-full relative z-10 mt-auto flex flex-col md:flex-row justify-between items-end gap-16 md:gap-0 pb-32">
          <div className="w-full md:w-auto">
            <Reveal y={100} delay={0.1}>
              <h2 className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-[0.8] mb-8 md:mb-12">
                INITIATE<br/><span className="text-black/30">PROJECT.</span>
              </h2>
            </Reveal>
            <Reveal y={50} delay={0.2}>
              <a href={WHATSAPP_URL} className="group flex items-center gap-6 w-fit bg-black text-white px-10 py-6 rounded-full text-lg uppercase font-bold tracking-widest hover:scale-105 transition-transform duration-500">
                Let's Build It <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
              </a>
            </Reveal>
          </div>
          
          <Reveal delay={0.4}>
             <div className="flex flex-col items-start md:items-end gap-2 text-right">
                <span className="font-bold text-black uppercase tracking-widest">Connect</span>
                <a href={WHATSAPP_URL} className="text-black/60 hover:text-[#4338CA] transition-colors uppercase font-mono tracking-wider">WhatsApp Line</a>
                <a href="mailto:boluadeoye97@gmail.com" className="text-black/60 hover:text-[#4338CA] transition-colors uppercase font-mono tracking-wider">boluadeoye97@gmail.com</a>
             </div>
          </Reveal>
        </div>

        <div className="max-w-screen-xl mx-auto w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 text-xs font-bold uppercase tracking-widest text-black/40">
           <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Availability: Taking Enquiries</span>
           <span>© {new Date().getFullYear()} ADEOYE BOLUWATIFE</span>
           <span>Nigeria Base</span>
        </div>
      </footer>
    </main>
  );
}
