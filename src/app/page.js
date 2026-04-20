"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, Globe, Layers, Code2, Database, Cpu, Server, 
  Figma, Braces, Sparkles, Workflow, Zap, Activity, Github, 
  Terminal, Network, ArrowRight
} from 'lucide-react';
import Lenis from 'lenis';

// --- CORE CONFIGURATION ---
const EASE =[0.16, 1, 0.3, 1];
const WHATSAPP_URL = "https://wa.me/2348106293674";
const PORTRAIT_URL = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg";

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
  { name: "GraphQL", type: "API Architecture", icon: Network },
  { name: "Git / CI-CD", type: "Version Control", icon: Github },
  { name: "Edge Compute", type: "Vercel Infra", icon: Terminal },
  { name: "Figma UI/UX", type: "Fidelity Mapping", icon: Figma }
];

const METHODOLOGY =[
  { step: "01", title: "Architecture", desc: "Mapping data flow, defining the stack, and establishing schemas before a single component is written." },
  { step: "02", title: "Tokenization", desc: "Extracting exact design tokens and translating them into a strict, mathematical Tailwind configuration." },
  { step: "03", title: "Engineering", desc: "Building polymorphic React components with strict TypeScript interfaces and Server Component optimization." },
  { step: "04", title: "Deployment", desc: "Deploying to Vercel's Edge network, auditing Lighthouse scores, and ensuring sub-second LCP globally." }
];

// --- MICRO-COMPONENTS ---
const Reveal = ({ children, delay = 0, y = 40 }) => (
  <motion.div 
    initial={{ opacity: 0, y }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, margin: "-10%" }} 
    transition={{ duration: 1.2, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

const ParallaxImage = ({ src, alt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1],["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1],[1.1, 1]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden bg-[#0A0A0A]">
      <motion.img 
        style={{ y, scale }} 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
      />
    </div>
  );
};

export default function Portfolio() {
  const[activeFaq, setActiveFaq] = useState(null);

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
  }, []);

  return (
    <main className="bg-[#030303] text-[#EAEAEA] min-h-screen selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
      {/* ARCHITECTURAL GRID BACKGROUND (The "Outline") */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center overflow-hidden opacity-[0.15]">
        <div className="w-full max-w-[100vw] h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem][mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* 1. STRUCTURED HEADER */}
      <header className="relative z-10 w-full py-6 px-6 md:px-12 border-b border-white/10 bg-[#030303]/80 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="font-medium text-white tracking-wide text-sm uppercase">Adeoye Boluwatife</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="https://boluadeoye.com.ng" className="hidden md:flex text-xs font-mono uppercase text-white/50 hover:text-white transition-colors items-center gap-2">
              <Globe size={14} /> Index
            </a>
            <a href={WHATSAPP_URL} className="text-xs font-bold uppercase tracking-widest text-black bg-white px-6 py-3 rounded-none hover:bg-white/80 transition-colors flex items-center gap-2">
              Initiate <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* 2. THE BLUEPRINT HERO */}
      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full mb-8 w-fit bg-white/[0.02]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Frontend Architect // Lagos, NG</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-medium tracking-tighter leading-[0.9] text-white mb-8">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/20 italic font-serif">Fidelity.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-2xl font-light text-white/50 max-w-2xl leading-relaxed">
                I architect high-performance digital artifacts. Transforming complex logic and Figma blueprints into uncompromising, sub-second realities.
              </p>
            </Reveal>
          </div>
          
          <div className="lg:col-span-4">
            <Reveal delay={0.3} y={60}>
              <div className="w-full aspect-[4/5] p-2 border border-white/10 rounded-2xl bg-white/[0.02] relative group">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img src={PORTRAIT_URL} alt="Adeoye Boluwatife" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
                </div>
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white/40" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white/40" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white/40" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white/40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. STRUCTURED METRICS */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { stat: "Sub-Second", label: "LCP Optimization", icon: Zap },
            { stat: "React 19", label: "Server Components", icon: Code2 },
            { stat: "0ms Shift", label: "Cumulative Layout", icon: Activity }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex items-center gap-6 p-8 md:p-12 hover:bg-white/[0.02] transition-colors">
                <div className="p-4 border border-white/10 rounded-full bg-[#030303]"><item.icon size={20} className="text-white/60" /></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-white">{item.stat}</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-2">{item.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. FRAMED ARTIFACTS (The Bento Layout) */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <Reveal><h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-16 flex items-center gap-4"><span className="w-12 h-[1px] bg-white/20" /> Selected Artifacts</h2></Reveal>
        
        <div className="flex flex-col gap-16">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} y={60}>
              <div className="group relative border border-white/10 rounded-3xl bg-white/[0.01] p-4 md:p-8 hover:bg-white/[0.03] transition-colors duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 w-full aspect-[16/10] md:aspect-[21/10] rounded-2xl overflow-hidden border border-white/10 relative">
                    <a href={p.link} target="_blank" rel="noreferrer" className="block w-full h-full cursor-pointer">
                      <ParallaxImage src={p.image} alt={p.title} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                    </a>
                  </div>
                  <div className="lg:col-span-4 flex flex-col justify-center p-4 md:p-8">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full w-fit mb-6">0{i + 1} — {p.scope}</span>
                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-8">{p.title}</h3>
                    <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors w-fit">
                      Explore Artifact <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. THE PERFECT MATRIX (1px Grid Outline) */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">The Engineering Matrix</h2>
            <p className="text-lg text-white/40 font-light leading-relaxed">A comprehensive suite of modern tools and frameworks utilized to architect scalable, type-safe, and high-performance applications.</p>
          </div>
        </Reveal>
        
        {/* The 1px Outline Grid Trick */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {ECOSYSTEM.map((tech, i) => (
              <div key={i} className="bg-[#050505] p-8 hover:bg-[#0A0A0A] transition-colors duration-300 flex flex-col gap-8 group">
                <tech.icon size={28} className="text-white/30 group-hover:text-white transition-colors duration-500" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">{tech.name}</h3>
                  <p className="text-[10px] font-mono uppercase text-white/40 tracking-widest">{tech.type}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 6. STICKY METHODOLOGY */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Execution<br/>Methodology</h2>
                <p className="text-lg text-white/40 font-light leading-relaxed">The strict architectural parameters behind every digital artifact.</p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-8">
            {METHODOLOGY.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 md:p-12 border border-white/10 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                  <span className="text-xs font-mono text-white/40 border border-white/10 px-3 py-1 rounded-full mb-6 inline-block">{item.step}</span>
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">{item.title}</h3>
                  <p className="text-white/50 font-light leading-relaxed text-lg">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STRUCTURED INQUIRIES */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/10">
        <Reveal><h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16 text-center">Inquiries</h2></Reveal>
        <div className="flex flex-col border-t border-white/10">
          {[
            { q: "Is Figma Fidelity really mathematical?", a: "Yes. Spacing tokens, precise border radii, Bezier easing curves, and layout gridding from your design files are hardcoded using Tailwind variables and exact CSS functions. No estimations." },
            { q: "How is performance achieved?", a: "Through decoupling. Moving rendering to Vercel's Edge, heavily compressing WebP/AVIF imagery, stripping unused Javascript payloads, and orchestrating strict React Server Component logic." },
            { q: "Data flows & Authentications?", a: "Implementing stateless JWT sessions across Prisma-connected databases (Neon/Supabase) to deliver an interface that requires no buffering or reloading to display mutation states." }
          ].map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-b border-white/10">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-8 flex justify-between items-center text-left cursor-pointer group">
                  <span className="text-lg md:text-xl font-light text-white/70 group-hover:text-white transition-colors pr-8">{faq.q}</span>
                  <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0 border border-white/20 rounded-full group-hover:bg-white transition-colors">
                    <div className={`absolute w-3 h-[1px] bg-white group-hover:bg-black transition-transform duration-500 ${activeFaq === i ? 'rotate-180' : ''}`} />
                    <div className={`absolute w-[1px] h-3 bg-white group-hover:bg-black transition-transform duration-500 ${activeFaq === i ? 'rotate-90 opacity-0' : ''}`} />
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

      {/* 8. ARCHITECTURAL FOOTER */}
      <footer className="relative z-10 bg-[#050505] border-t border-white/10 pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-32">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] text-white mb-12">
              Initiate <br/><span className="font-serif italic text-white/40">Project.</span>
            </h2>
            <a href={WHATSAPP_URL} className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-none text-sm font-bold uppercase tracking-widest hover:bg-white/80 transition-colors">
              Start a Conversation <ArrowUpRight size={18} />
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-6 text-sm font-mono uppercase tracking-widest text-white/40">
              <span className="text-white mb-2 border-b border-white/10 pb-4">Connect</span>
              <a href={WHATSAPP_URL} className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14}/> WhatsApp Line</a>
              <a href="mailto:boluadeoye97@gmail.com" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14}/> boluadeoye97@gmail.com</a>
              <a href="https://github.com" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14}/> GitHub Profile</a>
            </div>
          </Reveal>
        </div>
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/30 gap-4">
          <span>© {new Date().getFullYear()} Adeoye Boluwatife</span>
          <span className="hidden md:block">React // Next.js // TypeScript</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>
    </main>
  );
}
