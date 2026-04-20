"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Globe, Layers, Code2, Database, Cpu, Server, 
  Figma, Braces, Sparkles, Workflow, Zap, Activity, Github, 
  Terminal, Network, MonitorSmartphone, CheckCircle2
} from 'lucide-react';
import Lenis from 'lenis';

// --- CORE CONFIGURATION ---
const EASE =[0.16, 1, 0.3, 1];
const WHATSAPP_URL = "https://wa.me/2348106293674";

const PROJECTS =[
  { title: "Sleigh Strands", scope: "Next.js E-Commerce • Vercel", image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png", link: "https://sleigh-strands-headless.vercel.app/" },
  { title: "AutoAM Web", scope: "React Automotive App • Node.js", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop", link: "https://autoam-web.vercel.app/" },
  { title: "Peace Academy", scope: "EdTech Architecture • TypeScript", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop", link: "https://peace-service-academy.org" }
];

const ECOSYSTEM =[
  { name: "React 19", type: "Interface Engine", icon: Code2 },
  { name: "Next.js 16", type: "Full-Stack Meta", icon: Layers },
  { name: "TypeScript", type: "Strict Type Safety", icon: Braces },
  { name: "Node.js", type: "Backend Runtimes", icon: Server },
  { name: "PostgreSQL", type: "Relational Data", icon: Database },
  { name: "Tailwind CSS", type: "Atomic Styling", icon: Workflow },
  { name: "Prisma ORM", type: "Database Layer", icon: Cpu },
  { name: "Framer Motion", type: "Kinetic UI Physics", icon: Sparkles },
  { name: "GraphQL / REST", type: "API Architecture", icon: Network },
  { name: "Git / CI-CD", type: "Version Control", icon: Github },
  { name: "Edge Computing", type: "Vercel Infrastructure", icon: Terminal },
  { name: "Figma UI/UX", type: "High Fidelity Mapping", icon: Figma }
];

const METHODOLOGY =[
  { step: "01", title: "Discovery & Architecture", desc: "Mapping the data flow, defining the tech stack, and establishing the database schema before a single component is written." },
  { step: "02", title: "Figma Tokenization", desc: "Extracting exact design tokens (spacing, typography, colors) and translating them into a strict Tailwind configuration." },
  { step: "03", title: "Component Engineering", desc: "Building polymorphic, reusable React components with strict TypeScript interfaces and Server Component optimization." },
  { step: "04", title: "Edge Deployment", desc: "Deploying to Vercel's Edge network, auditing Lighthouse scores, and ensuring sub-second LCP globally." }
];

// --- MICRO-COMPONENTS ---
const Reveal = ({ children, delay = 0, y = 30 }) => (
  <motion.div 
    initial={{ opacity: 0, y }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, margin: "-10%" }} 
    transition={{ duration: 1, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical', 
      smooth: true 
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  },[]);

  return (
    <main className="bg-[#050505] text-[#EAEAEA] min-h-screen selection:bg-white selection:text-black font-sans overflow-x-hidden">
      {/* Modest Noise Texture - No loud colors */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      {/* 1. STATIC HEADER (Strictly in document flow, scrolls away naturally) */}
      <header className="relative z-10 w-full py-8 px-6 md:px-12 border-b border-white/5 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-medium text-white tracking-wide text-sm">Adeoye Boluwatife</span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 mt-1">Frontend Architect</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="https://boluadeoye.com.ng" className="hidden md:flex text-xs font-mono uppercase text-white/40 hover:text-white transition-colors items-center gap-2">
            <Globe size={14} /> Index
          </a>
          <a href={WHATSAPP_URL} className="text-xs font-medium text-black bg-white px-5 py-2.5 rounded-full hover:scale-105 transition-transform flex items-center gap-1">
            Initiate <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {/* 2. THE REFINED HERO */}
      <section className="relative z-10 pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <Reveal>
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-10 border border-white/10 p-1">
            <img src={ASSETS.portrait} alt="Adeoye Boluwatife" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-medium tracking-tighter leading-[1.1] text-white mb-6">
            Engineering <span className="font-serif italic text-white/60">Fidelity.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg md:text-xl font-light text-white/50 max-w-2xl leading-relaxed mb-12">
            I architect high-performance digital artifacts. Transforming complex logic and Figma blueprints into uncompromising, sub-second realities.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest text-white/60 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available for Projects
            </span>
            <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest text-white/60">
              Lagos, NG
            </span>
          </div>
        </Reveal>
      </section>

      {/* 3. PERFORMANCE METRICS */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {[
            { stat: "Sub-Second", label: "LCP Optimization", icon: Zap },
            { stat: "React 19", label: "Server Components", icon: Code2 },
            { stat: "0ms Shift", label: "Cumulative Layout", icon: Activity }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex items-center gap-6 pt-6 md:pt-0 md:pl-12 first:pl-0">
                <item.icon size={24} className="text-white/40" />
                <div>
                  <h3 className="text-xl font-medium text-white">{item.stat}</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">{item.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. SELECTED ARTIFACTS */}
      <section className="relative z-10 py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-20">Selected Artifacts</h2></Reveal>
        <div className="flex flex-col gap-32">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} y={40}>
              <div className="group block relative z-20">
                <div className="w-full aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 mb-8 relative">
                  <a href={p.link} target="_blank" rel="noreferrer" className="block w-full h-full cursor-pointer">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  </a>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-3">0{i + 1} — {p.scope}</span>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white">{p.title}</h3>
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    Explore <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><ArrowUpRight size={16} /></div>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. THE EXPANDED TECH ECOSYSTEM */}
      <section className="relative z-10 py-40 px-6 md:px-12 border-t border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-20 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">The Engineering Matrix</h2>
              <p className="text-lg text-white/40 font-light leading-relaxed">A comprehensive suite of modern tools and frameworks utilized to architect scalable, type-safe, and high-performance applications.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ECOSYSTEM.map((tech, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors duration-300 flex flex-col gap-6 h-full">
                  <tech.icon size={24} className="text-white/60" />
                  <div>
                    <h3 className="text-base font-medium text-white mb-1">{tech.name}</h3>
                    <p className="text-[10px] font-mono uppercase text-white/40 tracking-widest">{tech.type}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. METHODOLOGY */}
      <section className="relative z-10 py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <Reveal><h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-20">Execution Methodology</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {METHODOLOGY.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col gap-4">
                <span className="text-sm font-mono text-white/30 border-b border-white/10 pb-4 mb-2">{item.step}</span>
                <h3 className="text-2xl font-medium text-white">{item.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. INQUIRIES (FAQ) */}
      <section className="relative z-10 py-40 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <Reveal><h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16">Inquiries</h2></Reveal>
        <div className="flex flex-col border-t border-white/5">
          {[
            { q: "Is Figma Fidelity really mathematical?", a: "Yes. Spacing tokens, precise border radii, Bezier easing curves, and layout gridding from your design files are hardcoded using Tailwind variables and exact CSS functions. No estimations." },
            { q: "How is performance achieved?", a: "Through decoupling. Moving rendering to Vercel's Edge, heavily compressing WebP/AVIF imagery, stripping unused Javascript payloads, and orchestrating strict React Server Component logic." },
            { q: "Data flows & Authentications?", a: "Implementing stateless JWT sessions across Prisma-connected databases (Neon/Supabase) to deliver an interface that requires no buffering or reloading to display mutation states." }
          ].map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-b border-white/5">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-8 flex justify-between items-center text-left cursor-pointer group">
                  <span className="text-lg md:text-xl font-light text-white/70 group-hover:text-white transition-colors pr-8">{faq.q}</span>
                  <div className="relative w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <div className={`absolute w-full h-[1px] bg-white/50 transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-white' : ''}`} />
                    <div className={`absolute w-[1px] h-full bg-white/50 transition-transform duration-500 ${activeFaq === i ? 'rotate-90 opacity-0' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <p className="pb-8 text-white/40 text-base leading-relaxed font-light max-w-2xl">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 8. PREMIUM DARK FOOTER */}
      <footer className="relative z-10 bg-[#020202] border-t border-white/5 pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-32">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[1.1] text-white mb-8">
              Initiate <br/><span className="font-serif italic text-white/40">Project.</span>
            </h2>
            <a href={WHATSAPP_URL} className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              Start a Conversation <ArrowUpRight size={18} />
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-4 text-sm font-mono uppercase tracking-widest text-white/40">
              <span className="text-white mb-2">Connect</span>
              <a href={WHATSAPP_URL} className="hover:text-white transition-colors">WhatsApp Line</a>
              <a href="mailto:boluadeoye97@gmail.com" className="hover:text-white transition-colors">boluadeoye97@gmail.com</a>
              <a href="https://github.com" className="hover:text-white transition-colors">GitHub Profile</a>
            </div>
          </Reveal>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/30 gap-4">
          <span>© {new Date().getFullYear()} Adeoye Boluwatife</span>
          <span>React // Next.js // TypeScript</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>
    </main>
  );
}
