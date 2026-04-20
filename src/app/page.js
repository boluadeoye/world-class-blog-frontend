"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Moon, Sun, Globe, ChevronDown } from 'lucide-react';

// --- HEAVY ANIMATION WRAPPER ---
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [theme, setTheme] = useState('dark');
  const [activeFaq, setActiveFaq] = useState(null);
  const whatsappUrl = "https://wa.me/2348106293674?text=Hello%20Boluwatife,%20I%20would%20like%20to%20discuss%20a%20project.";

  // Handle Dark/Light Mode Toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const projects = [
    {
      title: "Sleigh Strands",
      tag: "Headless E-Commerce",
      image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png",
      link: "https://sleigh-strands-headless.vercel.app/"
    },
    {
      title: "AutoAM",
      tag: "Automotive Platform",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop",
      link: "https://autoam-web.vercel.app/"
    },
    {
      title: "Peace Academy",
      tag: "EdTech Ecosystem",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
      link: "https://peace-service-academy.org"
    }
  ];

  const faqs = [
    { q: "What is your architectural approach?", a: "I build headless, decoupled systems. By separating the frontend (Next.js) from the backend (WordPress/Node), I eliminate legacy technical debt, ensuring sub-second load times and absolute security." },
    { q: "How do you ensure design fidelity?", a: "I treat Figma as law. I use Tailwind CSS to map exact design tokens, ensuring that spacing, typography, and border-radii are mathematically identical to the designer's intent." },
    { q: "Do you handle complex state and APIs?", a: "Yes. I specialize in bridging frontend interfaces with complex backends, including WooCommerce, payment gateways (Stripe/Paystack), and custom JWT authentication flows." }
  ];

  return (
    <main className="min-h-screen font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* --- FIXED HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 mix-blend-difference text-white">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <span className="font-bold tracking-tighter text-lg">AB.</span>
          <div className="flex items-center gap-6">
            <a 
              href="https://boluadeoye.com.ng" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
            >
              <Globe size={14} /> Main Site
            </a>
            <button onClick={toggleTheme} className="p-2 hover:opacity-50 transition-opacity">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="min-h-[90vh] flex flex-col justify-center pt-20 pb-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal>
                <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter leading-[1.05] mb-8 text-black dark:text-white">
                  Adeoye <br /> Boluwatife.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed tracking-tight font-medium mb-10">
                  Frontend Architect. I engineer high-performance headless ecosystems with absolute visual fidelity.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-500"
                  >
                    Discuss a Project
                  </a>
                  <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-black/10 dark:border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Available</span>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-start lg:justify-end">
              <Reveal delay={0.3}>
                <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                  <Image 
                    src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg" 
                    alt="Adeoye Boluwatife" fill priority unoptimized className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- 2. SELECTED WORKS --- */}
        <section className="py-32 border-t border-black/10 dark:border-white/10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-16 text-black dark:text-white">Selected Works</h2>
          </Reveal>
          
          <div className="space-y-8 md:space-y-12">
            {projects.map((project, i) => (
              <Reveal key={i} delay={0.1}>
                <a 
                  href={project.link} target="_blank" rel="noopener noreferrer"
                  className="group block relative rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-[#111] border border-black/5 dark:border-white/5"
                >
                  <div className="grid md:grid-cols-12 gap-0">
                    <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between min-h-[300px] z-10 relative bg-white dark:bg-[#0A0A0A] transition-colors duration-700">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 block">{project.tag}</span>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black dark:text-white group-hover:opacity-50 transition-opacity">
                        View Project <ArrowUpRight size={16} />
                      </div>
                    </div>
                    <div className="md:col-span-7 relative min-h-[300px] overflow-hidden">
                      <Image 
                        src={project.image} alt={project.title} fill unoptimized
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-apple" 
                      />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- 3. THE PROCESS & FAQS --- */}
        <section className="py-32 border-t border-black/10 dark:border-white/10 grid lg:grid-cols-2 gap-20">
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 text-black dark:text-white">How I Work</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
                I bridge the gap between high-end design and complex engineering. My process is rooted in logic, performance, and absolute precision.
              </p>
            </Reveal>
            
            <div className="space-y-12">
              {[
                { step: "01", title: "Architecture", desc: "Analyzing requirements and selecting the optimal headless stack (Next.js, APIs, State Management)." },
                { step: "02", title: "Development", desc: "Translating Figma designs into pixel-perfect, responsive code with heavy, physics-based animations." },
                { step: "03", title: "Delivery", desc: "Ensuring 100/100 Lighthouse scores, secure payment integrations, and flawless deployment." }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6">
                    <span className="text-sm font-bold text-gray-400 dark:text-gray-600">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold tracking-tight text-black dark:text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-12 text-black dark:text-white">FAQ</h2>
            </Reveal>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#111] transition-colors duration-700">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full px-6 py-6 flex justify-between items-center text-left"
                    >
                      <span className="text-base font-bold tracking-tight text-black dark:text-white pr-4">{faq.q}</span>
                      <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} className="text-gray-400 shrink-0">
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. THE CLOSER --- */}
        <section className="py-40 border-t border-black/10 dark:border-white/10 text-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12 text-black dark:text-white">
              Ready to build?
            </h2>
            <a 
              href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-500"
            >
              Discuss a Project <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </section>

        <footer className="py-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 border-t border-black/10 dark:border-white/10">
          © {new Date().getFullYear()} Adeoye Boluwatife.
        </footer>
      </div>
    </main>
  );
}
