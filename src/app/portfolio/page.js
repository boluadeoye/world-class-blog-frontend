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
  const y = useTransform(scrollYProgress,[0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress,[0, 1], [1.1, 1]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden bg-[#0F172A]">
      <motion.img 
        style={{ y, scale }} 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-all duration-1000" 
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
    <main className="bg-[#0A0C10] text-[#F1F5F9] min-h-screen selection:bg-[#3B82F6] selection:text-white font-sans overflow-x-hidden">
      
      {/* ATMOSPHERIC COBALT GLOWS & MICRO-MESH */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#3B82F6] blur-[150px] opacity-[0.07]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#6366F1] blur-[150px] opacity-[0.05]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      </div>

      {/* 1. STRUCTURED HEADER */}
      <header className="relative z-10 w-full py-6 px-6 md:px-12 border-b border-[#1E293B] bg-[#0A0C10]/80 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="font-medium text-[#F1F5F9] tracking-wide text-sm uppercase">Adeoye Boluwatife</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="https://boluadeoye.com.ng" className="hidden md:flex text-xs font-mono uppercase text-[#94A3B8] hover:text-[#3B82F6] transition-colors items-center gap-2">
              <Globe size={14} /> Index
            </a>
            <a href={WHATSAPP_URL} className="text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2">
              Initiate <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* 2. THE TITANIUM HERO */}
      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#1E293B] rounded-full mb-8 w-fit bg-[#0F172A] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B82F6]">Frontend Architect // Lagos, NG</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-medium tracking-tighter leading-[0.9] text-[#F1F5F9] mb-8">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] italic font-serif">Fidelity.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-2xl font-light text-[#94A3B8] max-w-2xl leading-relaxed">
                I architect high-performance digital artifacts. Transforming complex logic and Figma blueprints into uncompromising, sub-second realities.
              </p>
            </Reveal>
          </div>
          
          <div className="lg:col-span-4">
            <Reveal delay={0.3} y={60}>
              <div className="w-full aspect-[4/5] p-2 border border-[#1E293B] rounded-2xl bg-[#0F172A] relative group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img src={PORTRAIT_URL} alt="Adeoye Boluwatife" className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-[#3B82F6]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. STRUCTURED METRICS */}
      <section className="relative z-10 border-y border-[#1E293B] bg-[#0F172A]/50 backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E293B]">
          {[
            { stat: "Sub-Second", label: "LCP Optimization", icon: Zap },
            { stat: "React 19", label: "Server Components", icon: Code2 },
            { stat: "0ms Shift", label: "Cumulative Layout", icon: Activity }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex items-center gap-6 p-8 md:p-12 hover:bg-[#1E293B]/30 transition-colors">
                <div className="p-4 border border-[#1E293B] rounded-xl bg-[#0A0C10] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"><item.icon size={20} className="text-[#3B82F6]" /></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-[#F1F5F9]">{item.stat}</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mt-2">{item.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. FRAMED ARTIFACTS (The Bento Layout) */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <Reveal><h2 className="text-sm font-mono uppercase tracking-widest text-[#94A3B8] mb-16 flex items-center gap-4"><span className="w-12 h-[1px] bg-[#1E293B]" /> Selected Artifacts</h2></Reveal>
        
        <div className="flex flex-col gap-16">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} y={60}>
              <div className="group relative border border-[#1E293B] rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#0A0C10] p-4 md:p-8 hover:border-[#3B82F6]/50 transition-colors duration-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 w-full aspect-[16/10] md:aspect-[21/10] rounded-2xl overflow-hidden border border-[#1E293B] relative">
                    <a href={p.link} target="_blank" rel="noreferrer" className="block w-full h-full cursor-pointer">
                      <ParallaxImage src={p.image} alt={p.title} />
                      <div className="absolute inset-0 bg-[#0A0C10]/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                    </a>
                  </div>
                  <div className="lg:col-span-4 flex flex-col justify-center p-4 md:p-8">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B82F6] border border-[#1E293B] bg-[#0A0C10] px-3 py-1 rounded-full w-fit mb-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">0{i + 1} — {p.scope}</span>
                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-[#F1F5F9] mb-8">{p.title}</h3>
                    <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#94A3B8] hover:text-[#3B82F6] transition-colors w-fit">
                      Explore Artifact <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. THE PERFECT MATRIX */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-[#F1F5F9]">The Engineering Matrix</h2>
            <p className="text-lg text-[#94A3B8] font-light leading-relaxed">A comprehensive suite of modern tools and frameworks utilized to architect scalable, type-safe, and high-performance applications.</p>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-[#1E293B] border border-[#1E293B] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {ECOSYSTEM.map((tech, i) => (
              <div key={i} className="bg-[#0A0C10] p-8 hover:bg-[#0F172A] transition-colors duration-300 flex flex-col gap-8 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <tech.icon size={28} className="text-[#475569] group-hover:text-[#3B82F6] transition-colors duration-500 relative z-10" />
                <div className="relative z-10">
                  <h3 className="text-lg font-medium text-[#F1F5F9] mb-2">{tech.name}</h3>
                  <p className="text-[10px] font-mono uppercase text-[#94A3B8] tracking-widest">{tech.type}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 6. STICKY METHODOLOGY */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-t border-[#1E293B]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-[#F1F5F9]">Execution<br/>Methodology</h2>
                <p className="text-lg text-[#94A3B8] font-light leading-relaxed">The strict architectural parameters behind every digital artifact.</p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-8">
            {METHODOLOGY.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 md:p-12 border border-[#1E293B] rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#0A0C10] hover:border-[#3B82F6]/30 transition-colors shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                  <span className="text-xs font-mono text-[#3B82F6] border border-[#1E293B] bg-[#0A0C10] px-3 py-1 rounded-full mb-6 inline-block shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">{item.step}</span>
                  <h3 className="text-2xl md:text-3xl font-medium text-[#F1F5F9] mb-4">{item.title}</h3>
                  <p className="text-[#94A3B8] font-light leading-relaxed text-lg">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STRUCTURED INQUIRIES */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-[#1E293B]">
        <Reveal><h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16 text-center text-[#F1F5F9]">Inquiries</h2></Reveal>
        <div className="flex flex-col border-t border-[#1E293B]">
          {[
            { q: "Is Figma Fidelity really mathematical?", a: "Yes. Spacing tokens, precise border radii, Bezier easing curves, and layout gridding from your design files are hardcoded using Tailwind variables and exact CSS functions. No estimations." },
            { q: "How is performance achieved?", a: "Through decoupling. Moving rendering to Vercel's Edge, heavily compressing WebP/AVIF imagery, stripping unused Javascript payloads, and orchestrating strict React Server Component logic." },
            { q: "Data flows & Authentications?", a: "Implementing stateless JWT sessions across Prisma-connected databases (Neon/Supabase) to deliver an interface that requires no buffering or reloading to display mutation states." }
          ].map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-b border-[#1E293B]">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-8 flex justify-between items-center text-left cursor-pointer group">
                  <span className="text-lg md:text-xl font-light text-[#94A3B8] group-hover:text-[#F1F5F9] transition-colors pr-8">{faq.q}</span>
                  <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0 border border-[#1E293B] rounded-full group-hover:border-[#3B82F6] transition-colors bg-[#0F172A]">
                    <div className={`absolute w-3 h-[1px] bg-[#94A3B8] group-hover:bg-[#3B82F6] transition-transform duration-500 ${activeFaq === i ? 'rotate-180' : ''}`} />
                    <div className={`absolute w-[1px] h-3 bg-[#94A3B8] group-hover:bg-[#3B82F6] transition-transform duration-500 ${activeFaq === i ? 'rotate-90 opacity-0' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <p className="pb-8 text-[#94A3B8] text-base leading-relaxed font-light max-w-2xl">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 8. ARCHITECTURAL FOOTER */}
      <footer className="relative z-10 bg-[#0A0C10] border-t border-[#1E293B] pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-32">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] text-[#F1F5F9] mb-12">
              Initiate <br/><span className="font-serif italic text-[#3B82F6]">Project.</span>
            </h2>
            <a href={WHATSAPP_URL} className="inline-flex items-center gap-4 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white px-10 py-5 rounded-xl text-sm font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
              Start a Conversation <ArrowUpRight size={18} />
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-6 text-sm font-mono uppercase tracking-widest text-[#94A3B8]">
              <span className="text-[#F1F5F9] mb-2 border-b border-[#1E293B] pb-4">Connect</span>
              <a href={WHATSAPP_URL} className="hover:text-[#3B82F6] transition-colors flex items-center gap-2"><ArrowRight size={14}/> WhatsApp Line</a>
              <a href="mailto:boluadeoye97@gmail.com" className="hover:text-[#3B82F6] transition-colors flex items-center gap-2"><ArrowRight size={14}/> boluadeoye97@gmail.com</a>
              <a href="https://github.com" className="hover:text-[#3B82F6] transition-colors flex items-center gap-2"><ArrowRight size={14}/> GitHub Profile</a>
            </div>
          </Reveal>
        </div>
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1E293B] text-[10px] font-mono uppercase tracking-widest text-[#475569] gap-4">
          <span>© {new Date().getFullYear()} Adeoye Boluwatife</span>
          <span className="hidden md:block">React // Next.js // TypeScript</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>
    </main>
  );
}
