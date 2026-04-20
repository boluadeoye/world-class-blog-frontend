"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, MessageSquare, ChevronDown, Zap, ShieldCheck, Cpu, Layout } from 'lucide-react';

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [activeFaq, setActiveFaq] = useState(null);
  const whatsappUrl = "https://wa.me/2348106293674";

  const projects = [
    { title: "Sleigh Strands", tag: "Headless E-Commerce", image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png", link: "https://sleigh-strands-headless.vercel.app/" },
    { title: "AutoAM", tag: "Automotive Platform", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop", link: "https://autoam-web.vercel.app/" },
    { title: "Peace Academy", tag: "EdTech Ecosystem", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop", link: "https://peace-service-academy.org" }
  ];

  const faqs = [
    { q: "What is your architectural approach?", a: "I build headless, decoupled systems. By separating the frontend (Next.js) from the backend (WordPress/Node), I eliminate legacy technical debt, ensuring sub-second load times and absolute security." },
    { q: "How do you ensure design fidelity?", a: "I treat Figma as law. I use Tailwind CSS to map exact design tokens, ensuring that spacing, typography, and border-radii are mathematically identical to the designer's intent." },
    { q: "Do you handle complex state and APIs?", a: "Yes. I specialize in bridging frontend interfaces with complex backends, including WooCommerce, payment gateways (Stripe/Paystack), and custom JWT authentication flows." }
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-indigo-500 selection:text-white">
      <div className="fixed inset-0 bg-grain pointer-events-none z-50" />
      
      {/* --- FLOATING NAV --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-full flex justify-between items-center shadow-2xl">
          <span className="font-black tracking-tighter text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">AB.</span>
          <div className="flex items-center gap-8">
            <a href="https://boluadeoye.com.ng" target="_blank" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-indigo-400 transition-colors flex items-center gap-2">
              <Globe size={14} /> Main Site
            </a>
            <a href={whatsappUrl} className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 space-y-10">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Available for Hire</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[110px] font-serif leading-[0.85] tracking-tighter">
                <span className="text-sm font-sans block uppercase tracking-[0.6em] mb-6 opacity-30">Hi, I&apos;m</span>
                Adeoye <br /> <span className="italic text-indigo-400">Boluwatife.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-3xl text-white/40 max-w-2xl leading-tight tracking-tight">
                Frontend Architect. I engineer <span className="text-white">high-performance headless ecosystems</span> with absolute visual fidelity.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <a href={whatsappUrl} className="group inline-flex items-center gap-6 px-12 py-6 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-indigo-600/20">
                Discuss a Project <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
              </a>
            </Reveal>
          </div>
          
          <div className="lg:col-span-5">
            <Reveal delay={0.6}>
              <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg" 
                  alt="Adeoye" 
                  className="w-full h-full object-cover saturate-[1.2] contrast-[1.1] group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- 2. SELECTED WORKS --- */}
      <section className="py-32 px-6 max-w-[1440px] mx-auto">
        <Reveal><h2 className="text-4xl md:text-6xl font-serif italic mb-24 text-center">Selected Works</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href={p.link} target="_blank" className="group block space-y-8">
                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-end px-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-400">{p.tag}</span>
                    <h3 className="text-3xl font-serif mt-2">{p.title}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- 3. THE PROCESS --- */}
      <section className="py-40 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-[1440px] mx-auto">
          <Reveal><h2 className="text-4xl md:text-6xl font-serif italic mb-24">The Process</h2></Reveal>
          <div className="grid lg:grid-cols-4 gap-12">
            {[
              { icon: Cpu, title: "Architecture", desc: "Mapping the headless bridge and data flow." },
              { icon: Layout, title: "Fidelity", desc: "Pixel-perfect translation of Figma to code." },
              { icon: Zap, title: "Performance", desc: "Optimizing for sub-second load times." },
              { icon: ShieldCheck, title: "Security", desc: "Hardened JWT and API authentication." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/50 transition-colors group">
                  <item.icon size={40} strokeWidth={1} className="text-indigo-400 mb-8 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold uppercase tracking-tighter mb-4">{item.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. FAQ --- */}
      <section className="py-40 px-6 max-w-3xl mx-auto">
        <Reveal><h2 className="text-4xl md:text-6xl font-serif italic text-center mb-24">Inquiries</h2></Reveal>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full px-10 py-8 flex justify-between items-center text-left group">
                  <span className="text-xl font-medium group-hover:text-indigo-400 transition-colors">{faq.q}</span>
                  <ChevronDown size={24} className={`text-indigo-400 transition-transform duration-500 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-10 pb-10 text-white/40 leading-relaxed text-lg border-t border-white/5 pt-6">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- 5. COMPACT FOOTER --- */}
      <footer className="py-12 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">© 2024 Adeoye Boluwatife</span>
        </div>
        <div className="flex gap-12">
          <a href={whatsappUrl} className="text-[10px] font-bold uppercase tracking-[0.4em] hover:text-indigo-400 transition-colors">WhatsApp</a>
          <a href="mailto:boluadeoye97@gmail.com" className="text-[10px] font-bold uppercase tracking-[0.4em] hover:text-indigo-400 transition-colors">Email</a>
        </div>
      </footer>
    </main>
  );
}
