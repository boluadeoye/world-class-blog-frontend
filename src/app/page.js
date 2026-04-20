"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Moon, Sun, Globe, ChevronDown, Zap, ShieldCheck, Cpu } from 'lucide-react';

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

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [theme, setTheme] = useState('dark');
  const [activeFaq, setActiveFaq] = useState(null);
  const whatsappUrl = "https://wa.me/2348106293674";

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <main className="min-h-screen font-sans transition-colors duration-1000">
      
      {/* --- FIXED HEADER --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <span className="font-bold tracking-tighter text-xl">AB.</span>
        <div className="flex items-center gap-8">
          <a href="https://boluadeoye.com.ng" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:opacity-50 transition-opacity flex items-center gap-2">
            <Globe size={12} /> Main Site
          </a>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 hover:scale-110 transition-transform">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* --- 1. EDITORIAL HERO --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
        <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Available for Hire</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-[90px] font-serif leading-[0.95] tracking-tighter text-black dark:text-white">
                <span className="text-sm font-sans block uppercase tracking-[0.5em] mb-4 opacity-40">Hi, I&apos;m</span>
                Adeoye <br /> <span className="italic opacity-60">Boluwatife.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-2xl text-black/50 dark:text-white/40 max-w-xl leading-relaxed tracking-tight">
                Frontend Architect. I engineer high-performance headless ecosystems with <span className="text-black dark:text-white font-medium">absolute visual fidelity.</span>
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-6 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all duration-500 shadow-2xl">
                Discuss a Project <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.6}>
              <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl group">
                <Image src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg" alt="Adeoye" fill unoptimized className="object-cover saturate-[1.1] group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- 2. SELECTED WORKS --- */}
      <section className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <Reveal><h2 className="text-3xl md:text-5xl font-serif italic mb-20 text-black dark:text-white">Selected Works</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="group block space-y-6">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <Image src={p.image} alt={p.title} fill unoptimized className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                </div>
                <div className="flex justify-between items-end px-4">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 text-black dark:text-white">{p.tag}</span>
                    <h3 className="text-2xl font-serif mt-1 text-black dark:text-white">{p.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- 3. THE PROCESS --- */}
      <section className="py-32 bg-white dark:bg-white/[0.02] border-y border-black/5 dark:border-white/5 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-3 gap-16">
          {[
            { icon: Cpu, title: "Architecture", desc: "Selecting the optimal headless stack to eliminate technical debt." },
            { icon: ShieldCheck, title: "Fidelity", desc: "Translating Figma into pixel-perfect, responsive codebases." },
            { icon: Zap, title: "Performance", desc: "Guaranteeing 100/100 Lighthouse scores as a baseline." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.2}>
              <div className="space-y-6">
                <item.icon size={32} strokeWidth={1} className="text-accent" />
                <h4 className="text-xl font-serif font-bold uppercase tracking-tighter text-black dark:text-white">{item.title}</h4>
                <p className="text-sm text-black/50 dark:text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- 4. FAQ --- */}
      <section className="py-32 px-6 md:px-12 max-w-3xl mx-auto">
        <Reveal><h2 className="text-3xl md:text-5xl font-serif italic text-center mb-20 text-black dark:text-white">Common Inquiries</h2></Reveal>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-b border-black/10 dark:border-white/10">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-8 flex justify-between items-center text-left group">
                  <span className="text-lg font-medium group-hover:opacity-50 transition-opacity text-black dark:text-white">{faq.q}</span>
                  <ChevronDown size={20} className={`transition-transform duration-500 text-black dark:text-white ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="pb-8 text-sm text-black/50 dark:text-white/40 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- 5. COMPACT FOOTER --- */}
      <footer className="py-12 px-6 md:px-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] opacity-20 text-black dark:text-white">© 2024 Adeoye Boluwatife</span>
        <div className="flex gap-8">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors text-black dark:text-white">WhatsApp</a>
          <a href="mailto:boluadeoye97@gmail.com" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors text-black dark:text-white">Email</a>
        </div>
      </footer>
    </main>
  );
}
