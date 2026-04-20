"use client";
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import TechStack from '@/components/TechStack';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export default function Home() {
  const whatsappUrl = "https://wa.me/2348106293674?text=Hello%20Boluwatife,%20I%20am%20interested%20in%20your%20frontend%20architecture%20services.";

  return (
    <main className="bg-cream selection:bg-burgundy selection:text-white overflow-hidden relative">
      
      {/* FLOATING BACKGROUND ORBS (HEAVY DESIGN) */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blush/40 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

      {/* SECTION 1: HERO STATEMENT */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-20 relative z-10">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16vw] md:text-[11vw] font-serif text-ink leading-[0.85] tracking-tighter"
            >
              Adeoye
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1 
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16vw] md:text-[11vw] font-serif text-burgundy leading-[0.85] tracking-tighter italic md:ml-[10vw]"
            >
              Boluwatife.
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-12 border-t border-black/10 pt-12"
          >
            <p className="text-xl md:text-3xl text-ink/60 font-sans max-w-3xl leading-tight tracking-tight">
              Frontend Architect specializing in <strong className="text-ink">high-performance headless ecosystems</strong> and absolute visual fidelity.
            </p>
            
            {/* Portrait Badge */}
            <div className="flex items-center gap-6 bg-white p-3 pr-8 rounded-full shadow-xl border border-black/5">
              <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg" alt="Adeoye" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink">The Architect</p>
                <p className="text-[10px] text-ink/40 uppercase tracking-widest">Available for Hire</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE BENTO GALLERY */}
      <section className="px-6 md:px-12 py-20 relative z-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 auto-rows-[400px] md:auto-rows-[450px]">
            
            {/* Sleigh Strands - Hero Module */}
            <ProjectCard 
              isHero
              tag="E-commerce / Headless"
              title="Sleigh Strands"
              link="https://sleigh-strands-headless.vercel.app/"
              image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png"
              className="md:col-span-2 md:row-span-2"
            />

            {/* Technical Receipt Module */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="md:col-span-2 md:row-span-1 bg-burgundy rounded-[3rem] p-12 md:p-16 flex flex-col justify-center text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-50 mb-6 block">Engineering Standard</span>
                <h3 className="text-6xl md:text-8xl font-serif italic leading-none group-hover:scale-105 transition-transform duration-700 origin-left">100/100</h3>
                <p className="text-sm md:text-base opacity-80 mt-6 max-w-md font-light leading-relaxed">
                  Average Lighthouse performance score across all deployed headless architectures. Speed is a design feature.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl group-hover:bg-coral/20 transition-colors duration-700" />
            </motion.div>

            {/* AutoAM Module */}
            <ProjectCard 
              tag="Automotive / Precision"
              title="AutoAM"
              link="https://autoam-web.vercel.app/"
              image="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop"
              className="md:col-span-1 md:row-span-1"
            />

            {/* Peace Service Academy Module */}
            <ProjectCard 
              tag="Education / Impact"
              title="Peace Service Academy"
              link="https://peace-service-academy.org"
              image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
              className="md:col-span-1 md:row-span-1"
            />
          </div>
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <TechStack />

      {/* SECTION 5: THE WHATSAPP CLOSER */}
      <section className="px-6 md:px-12 py-40 bg-ink text-white text-center mt-20 rounded-t-[4rem] md:rounded-t-[6rem] relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-6xl md:text-[130px] font-serif italic leading-[0.9] tracking-tighter"
          >
            Let&apos;s build something undeniable.
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} delay={0.2}
            className="pt-12 flex justify-center"
          >
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-6 px-12 py-6 bg-[#25D366] text-white rounded-full text-sm font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all duration-500 shadow-[0_20px_50px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle size={28} className="group-hover:animate-bounce" />
              Hire Me Now
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
