"use client";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, MessageSquare, Code2, Layers, Zap, ChevronDown, Terminal } from 'lucide-react';
import { useState } from 'react';

// --- REUSABLE ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const whatsappUrl = "https://wa.me/2348106293674?text=Hello%20Boluwatife,%20I%20am%20blown%20away%20by%20your%20portfolio.%20Let's%20talk.";
  const [activeFaq, setActiveFaq] = useState(null);

  const projects = [
    {
      title: "Sleigh Strands",
      tag: "Headless E-Commerce",
      image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png",
      link: "https://sleigh-strands-headless.vercel.app/",
      colSpan: "md:col-span-2"
    },
    {
      title: "AutoAM",
      tag: "Automotive Platform",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop",
      link: "https://autoam-web.vercel.app/",
      colSpan: "md:col-span-1"
    },
    {
      title: "Peace Academy",
      tag: "EdTech Ecosystem",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
      link: "https://peace-service-academy.org",
      colSpan: "md:col-span-1"
    }
  ];

  const faqs = [
    { q: "What is your core tech stack?", a: "I specialize in the modern React ecosystem: Next.js (App Router/Turbopack), TypeScript, Tailwind CSS v4, and Framer Motion for physics-based animations. I build headless architectures that consume REST/GraphQL APIs." },
    { q: "Do you handle backend integration?", a: "Absolutely. I am an expert at bridging frontend interfaces with complex backends like WooCommerce, Stripe, Paystack, and custom Node.js/Python microservices." },
    { q: "What does 'Absolute Figma Fidelity' mean?", a: "It means zero compromises. If a designer draws it, I engineer it to the exact pixel, border-radius, and easing curve. I don't use generic UI libraries that dilute the brand's identity." }
  ];

  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-[#4F46E5] selection:text-white overflow-hidden font-sans">
      
      {/* --- 1. CINEMATIC HERO SECTION --- */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#4F46E5]/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 flex flex-col items-center justify-center h-full">
          
          {/* BACKGROUND TEXT (Z-0) */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-[15%] md:top-[20%] text-[20vw] md:text-[15vw] font-black tracking-tighter text-transparent uppercase z-0"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}
          >
            ADEOYE
          </motion.h1>

          {/* THE PORTRAIT (Z-10) */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[70vw] md:w-[30vw] max-w-[400px] aspect-[3/4] rounded-t-full overflow-hidden border-b-0 border border-white/10"
          >
            <Image 
              src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg" 
              alt="Adeoye Boluwatife" fill priority unoptimized
              className="object-cover saturate-0 hover:saturate-100 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </motion.div>

          {/* FOREGROUND TEXT (Z-20) */}
          <motion.h1 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[20%] md:bottom-[15%] text-[15vw] md:text-[12vw] font-black tracking-tighter text-white uppercase z-20 leading-none drop-shadow-2xl"
          >
            BOLUWATIFE
          </motion.h1>

          {/* FLOATING BADGE */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="absolute bottom-10 flex flex-col items-center gap-4 z-30"
          >
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">Frontend Architect</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. THE ARSENAL (TECH STACK) --- */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden relative">
        <div className="flex w-[200%]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex w-full justify-around items-center"
          >
            {['NEXT.JS 16', 'REACT', 'TYPESCRIPT', 'TAILWIND V4', 'FRAMER MOTION', 'HEADLESS CMS', 'REST APIs'].map((tech, i) => (
              <div key={i} className="flex items-center gap-8 px-8">
                <span className="text-2xl md:text-4xl font-black text-white/10 uppercase tracking-tighter">{tech}</span>
                <Terminal size={24} className="text-[#4F46E5]/50" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 3. SELECTED WORKS (HEAVY BENTO GRID) --- */}
      <section className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16">Selected <span className="text-[#4F46E5]">Works.</span></h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.1} className={project.colSpan}>
              <motion.a
                href={project.link} target="_blank" rel="noopener noreferrer"
                whileHover="hover"
                className="group relative block w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden bg-[#111] border border-white/5"
              >
                <motion.img 
                  variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                  <div className="flex justify-end">
                    <motion.div 
                      variants={{ hover: { scale: 1.1, backgroundColor: "#4F46E5", color: "#ffffff", rotate: 45 } }}
                      className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white transition-colors duration-300"
                    >
                      <ArrowUpRight size={24} />
                    </motion.div>
                  </div>
                  <motion.div variants={{ hover: { y: -10 } }} transition={{ duration: 0.4 }}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F46E5] mb-4 block">{project.tag}</span>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white">{project.title}</h3>
                  </motion.div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- 4. HOW I WORK (THE PROCESS) --- */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-20">The <span className="text-[#4F46E5]">Process.</span></h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-[1px] bg-gradient-to-r from-[#4F46E5]/0 via-[#4F46E5] to-[#4F46E5]/0 opacity-30" />
            
            {[
              { icon: Layers, title: "01. Architecture", desc: "I don't just write code; I plan ecosystems. I analyze the PRD, select the optimal headless stack, and map the API bridges before a single component is built." },
              { icon: Code2, title: "02. Execution", desc: "Absolute Figma Fidelity. I translate high-end designs into pixel-perfect, responsive Tailwind CSS, powered by physics-based Framer Motion animations." },
              { icon: Zap, title: "03. Performance", desc: "Speed is a design feature. I optimize rendering, enforce strict client/server boundaries, and guarantee 100/100 Lighthouse scores." }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.2} className="relative z-10">
                <div className="w-24 h-24 rounded-3xl bg-[#050505] border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
                  <step.icon size={32} className="text-[#4F46E5]" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FAQS --- */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center">Questions?</h2>
        </FadeIn>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-lg font-bold tracking-tight">{faq.q}</span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} className="text-[#4F46E5]">
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-white/50 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- 6. THE CLOSER (WHATSAPP CTA) --- */}
      <section className="py-40 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4F46E5]/10 blur-[150px] rounded-full pointer-events-none" />
        <FadeIn className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.9] mb-12">
            Ready to deploy <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-purple-500">excellence?</span>
          </h2>
          <p className="text-xl text-white/50 mb-16 max-w-2xl mx-auto">
            Stop settling for generic templates. Let's build a high-performance digital asset that dominates your industry.
          </p>
          <motion.a 
            href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <MessageSquare size={20} className="text-[#25D366]" />
            Hire Me Now
          </motion.a>
        </FadeIn>
      </section>

      <footer className="py-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 border-t border-white/5">
        © {new Date().getFullYear()} Adeoye Boluwatife. Engineered with precision.
      </footer>
    </main>
  );
}
