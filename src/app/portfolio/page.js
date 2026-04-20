"use client";
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import Portrait from '@/components/Portrait';
import { ArrowUpRight } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen py-16 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* HERO STATEMENT */}
        <header className="mb-24 md:mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl"
          >
            <h1 className="text-6xl md:text-[120px] font-serif text-ink leading-[0.9] tracking-tighter">
              Adeoye <br />
              <span className="italic text-burgundy ml-0 md:ml-24">Boluwatife.</span>
            </h1>
            <p className="text-xl md:text-2xl text-ink/40 font-sans mt-12 max-w-2xl leading-relaxed tracking-tight">
              Frontend Architect specializing in high-performance headless ecosystems and absolute visual fidelity.
            </p>
          </motion.div>
        </header>

        {/* BENTO GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-[350px] md:auto-rows-[400px]">
          {/* Sleigh Strands - Hero Module */}
          <ProjectCard 
            isHero
            tag="E-commerce / Headless"
            title="Sleigh Strands"
            link="https://sleigh-strands-headless.vercel.app/"
            className="md:col-span-2 md:row-span-2 bg-[#FDF8F0]"
          />

          {/* Portrait Module */}
          <div className="md:col-span-1 md:row-span-1 bg-white rounded-[2.5rem] border border-black/[0.03] overflow-hidden shadow-sm">
            <Portrait />
          </div>

          {/* AutoAM Module */}
          <ProjectCard 
            tag="Automotive / Precision"
            title="AutoAM"
            link="https://autoam-web.vercel.app/"
            className="md:col-span-1 md:row-span-1"
          />

          {/* Peace Service Academy Module */}
          <ProjectCard 
            tag="Education / Impact"
            title="Peace Service Academy"
            link="https://peace-service-academy.org"
            className="md:col-span-2 md:row-span-1"
          />

          {/* Technical Receipt Module */}
          <div className="md:col-span-2 md:row-span-1 bg-burgundy rounded-[2.5rem] p-12 md:p-16 flex flex-col justify-center text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-50 mb-6 block">Engineering Standard</span>
              <h3 className="text-5xl md:text-7xl font-serif italic leading-none">100/100</h3>
              <p className="text-sm md:text-base opacity-70 mt-6 max-w-sm font-light leading-relaxed">
                Average Lighthouse performance score across all deployed headless architectures.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          </div>
        </div>

        {/* FOOTER CONVERSION */}
        <footer className="mt-40 pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20 block">Availability</span>
            <p className="text-lg font-medium text-ink/60">Open for high-impact collaborations.</p>
          </div>
          <a href="mailto:boluadeoye97@gmail.com" className="group flex items-center gap-6">
            <span className="text-3xl md:text-5xl font-serif italic text-burgundy group-hover:text-coral transition-colors duration-500">
              Start a project
            </span>
            <div className="w-16 h-16 rounded-full bg-burgundy text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <ArrowUpRight size={32} />
            </div>
          </a>
        </footer>
      </div>
    </main>
  );
}
