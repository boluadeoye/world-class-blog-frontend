"use client";
import { motion } from 'framer-motion';
import ProjectCard from '@/components/portfolio/ProjectCard';
import TechStack from '@/components/portfolio/TechStack';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F0] text-[#0C0608] selection:bg-[#8B2632] selection:text-white font-sans">
      
      {/* HERO STATEMENT */}
      <section className="pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-[clamp(3rem,11vw,120px)] font-serif leading-[0.85] tracking-tighter mb-8">
              Adeoye <br />
              <span className="italic text-[#8B2632] ml-[5vw] md:ml-[10vw]">Boluwatife.</span>
            </h1>
            <p className="text-lg md:text-2xl text-black/60 max-w-2xl leading-relaxed tracking-tight">
              Frontend Architect specializing in <strong className="text-black">high-performance headless ecosystems</strong> and absolute visual fidelity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK LOGOS */}
      <TechStack />

      {/* THE BENTO GALLERY (RICH MEDIA) */}
      <section className="px-6 md:px-12 py-12">
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

            {/* Portrait Module (Sleek & Sharp) */}
            <div className="md:col-span-1 md:row-span-1 bg-white rounded-[2.5rem] border border-black/[0.03] overflow-hidden shadow-sm relative flex items-center justify-center p-6">
              <motion.div whileHover={{ scale: 1.02 }} className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-inner">
                <Image
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg"
                  alt="Adeoye Boluwatife"
                  fill
                  className="object-cover saturate-[1.1] contrast-[1.05]"
                  priority
                  unoptimized
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-6 py-4 rounded-2xl shadow-2xl flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">The Architect</span>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>

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
              className="md:col-span-2 md:row-span-1"
            />

          </div>
        </div>
      </section>

      {/* THE CLOSER */}
      <section className="px-6 md:px-12 py-40 bg-[#0C0608] text-white text-center mt-20 rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl md:text-[100px] font-serif italic leading-none tracking-tighter">
            Let&apos;s build something undeniable.
          </h2>
          <div className="pt-8">
            <a href="mailto:boluadeoye97@gmail.com" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-[#0C0608] rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#FF6B35] hover:text-white transition-all duration-500 shadow-2xl">
              Start a Conversation <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
