"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Moon, Sun, Globe, ChevronDown, Code2, Layers, Zap, MessageSquare } from 'lucide-react';

// --- HEAVY ANIMATION WRAPPERS ---
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, type: "spring", stiffness: 100, damping: 20 }}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.15 } }
    }}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children }) => (
  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}>
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [theme, setTheme] = useState('dark');
  const [activeFaq, setActiveFaq] = useState(null);
  const whatsappUrl = "https://wa.me/2348106293674?text=Hello%20Boluwatife,%20I%20am%20impressed%20by%20your%20portfolio.%20Let's%20discuss%20a%20project.";

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const projects = [
    { title: "Sleigh Strands", tag: "Headless E-Commerce", image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png", link: "https://sleigh-strands-headless.vercel.app/", colSpan: "md:col-span-2" },
    { title: "AutoAM", tag: "Automotive Platform", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop", link: "https://autoam-web.vercel.app/", colSpan: "md:col-span-1" },
    { title: "Peace Academy", tag: "EdTech Ecosystem", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop", link: "https://peace-service-academy.org", colSpan: "md:col-span-1" }
  ];

  const faqs = [
    { q: "What is your architectural approach?", a: "I build headless, decoupled systems. By separating the frontend (Next.js) from the backend (WordPress/Node), I eliminate legacy technical debt, ensuring sub-second load times and absolute security." },
    { q: "How do you ensure design fidelity?", a: "I treat Figma as law. I use Tailwind CSS to map exact design tokens, ensuring that spacing, typography, and border-radii are mathematically identical to the designer's intent." },
    { q: "Do you handle complex state and APIs?", a: "Yes. I specialize in bridging frontend interfaces with complex backends, including WooCommerce, payment gateways (Stripe/Paystack), and custom JWT authentication flows." }
  ];

  return (
    <main className="min-h-screen font-sans bg-[#F8F9FA] text-[#0A0A0A] dark:bg-[#050505] dark:text-[#F8F9FA] transition-colors duration-500 selection:bg-[#4F46E5] selection:text-white">
      
      {/* --- FIXED HEADER (FIXED OVERLAP ISSUE) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-black tracking-tighter text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#FF4D4D]">AB.</span>
          <div className="flex items-center gap-6">
            <a href="https://boluadeoye.com.ng" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#4F46E5] transition-colors">
              <Globe size={14} /> Main Site
            </a>
            <button onClick={toggleTheme} className="p-2 bg-black/5 dark:bg-white/10 rounded-full hover:scale-110 transition-transform">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- 1. HERO SECTION (FULL COLOR, NO OVERLAP) --- */}
      <section className="relative pt-32 md:pt-48 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-[#4F46E5]/10 dark:bg-[#4F46E5]/20 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#FF4D4D]/10 dark:bg-[#FF4D4D]/20 blur-[100px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: "spring" }}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Available for Projects</span>
              </div>
              <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.9]">
                Adeoye <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#FF4D4D]">Boluwatife.</span>
              </h1>
            </motion.div>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="text-lg md:text-2xl text-black/60 dark:text-white/60 max-w-2xl leading-relaxed font-medium">
              Frontend Architect. I engineer high-performance headless ecosystems with <strong className="text-black dark:text-white">absolute visual fidelity</strong> and heavy motion physics.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="pt-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all duration-300">
                Initiate Project <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>

          {/* Full Color Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative w-full max-w-[400px] aspect-[4/5] rounded-[3rem] p-2 bg-gradient-to-br from-[#4F46E5] to-[#FF4D4D] shadow-2xl"
            >
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-white dark:bg-black">
                <Image 
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg" 
                  alt="Adeoye Boluwatife" fill priority unoptimized
                  className="object-cover saturate-110 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-sm font-bold uppercase tracking-widest">The Architect</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. SELECTED WORKS (HEAVY BENTO GRID) --- */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <FadeUp>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-16">Selected <span className="text-[#4F46E5]">Works.</span></h2>
        </FadeUp>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.a
                href={project.link} target="_blank" rel="noopener noreferrer"
                whileHover="hover"
                className={`group relative block w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden bg-black shadow-xl ${project.colSpan}`}
              >
                <motion.img 
                  variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                  <div className="flex justify-end">
                    <motion.div 
                      variants={{ hover: { scale: 1.1, backgroundColor: "#4F46E5", color: "#ffffff", rotate: 45 } }}
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white transition-colors duration-300"
                    >
                      <ArrowUpRight size={24} />
                    </motion.div>
                  </div>
                  <motion.div variants={{ hover: { y: -10 } }} transition={{ duration: 0.4 }}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D4D] mb-4 block">{project.tag}</span>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white">{project.title}</h3>
                  </motion.div>
                </div>
              </motion.a>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* --- 3. HOW I WORK (THE PROCESS) --- */}
      <section className="py-32 px-6 md:px-12 bg-white dark:bg-[#0A0A0A] border-y border-black/5 dark:border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20">The <span className="text-[#FF4D4D]">Process.</span></h2>
          </FadeUp>
          
          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-12 relative">
              {[
                { icon: Layers, title: "01. Architecture", desc: "I don't just write code; I plan ecosystems. I analyze the PRD, select the optimal headless stack, and map the API bridges before a single component is built." },
                { icon: Code2, title: "02. Execution", desc: "Absolute Figma Fidelity. I translate high-end designs into pixel-perfect, responsive Tailwind CSS, powered by physics-based Framer Motion animations." },
                { icon: Zap, title: "03. Performance", desc: "Speed is a design feature. I optimize rendering, enforce strict client/server boundaries, and guarantee 100/100 Lighthouse scores." }
              ].map((step, i) => (
                <StaggerItem key={i}>
                  <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center mb-8 shadow-sm">
                    <step.icon size={32} className="text-[#4F46E5]" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-4">{step.title}</h3>
                  <p className="text-black/60 dark:text-white/50 leading-relaxed">{step.desc}</p>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* --- 4. FAQS --- */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-16 text-center">Questions?</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-bold tracking-tight pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} className="text-[#4F46E5]">
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
                      <div className="px-8 pb-8 text-black/60 dark:text-white/50 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* --- 5. THE CLOSER --- */}
      <section className="py-40 px-6 md:px-12 relative overflow-hidden bg-[#050505] text-white mt-20 rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 to-[#FF4D4D]/20 opacity-50" />
        <FadeUp className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-[100px] font-black tracking-tighter leading-[0.9] mb-12">
            Ready to deploy <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#FF4D4D]">excellence?</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-16 max-w-2xl mx-auto font-medium">
            Stop settling for generic templates. Let's build a high-performance digital asset that dominates your industry.
          </p>
          <motion.a 
            href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <MessageSquare size={20} className="text-[#25D366]" />
            Connect via WhatsApp
          </motion.a>
        </FadeUp>
      </section>
    </main>
  );
}
