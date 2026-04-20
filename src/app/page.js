"use client";
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import Portrait from '@/components/Portrait';
import TechStack from '@/components/TechStack';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

export default function Home() {
  const whatsappUrl = "https://wa.me/2348106293674?text=Hello%20Boluwatife,%20I%20would%20like%20to%20discuss%20a%20frontend%20architecture%20project.";

  return (
    <main className="mesh-bg min-h-screen selection:bg-[#4F46E5] selection:text-white font-sans">
      
      {/* SECTION 1: HERO STATEMENT */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-[100px] font-extrabold text-[#0A0A0A] leading-[0.9] tracking-tighter mb-8">
              Adeoye <br />
              <span className="text-[#4F46E5]">Boluwatife.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-8 mt-12">
              <p className="text-lg md:text-2xl text-gray-600 max-w-2xl leading-relaxed tracking-tight font-medium">
                Frontend Architect. I engineer high-performance headless ecosystems with absolute visual fidelity.
              </p>
              
              <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 w-fit">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800">Available for Projects</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <TechStack />

      {/* SECTION 2: THE BENTO GALLERY */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
            
            {/* Sleigh Strands - Hero Module */}
            <ProjectCard 
              tag="Headless E-commerce"
              title="Sleigh Strands"
              link="https://sleigh-strands-headless.vercel.app/"
              image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png"
              className="md:col-span-2 md:row-span-2"
            />

            {/* Portrait Module */}
            <div className="md:col-span-1 md:row-span-1 bg-white rounded-[2rem] border border-black/[0.04] overflow-hidden shadow-sm p-2">
              <Portrait />
            </div>

            {/* AutoAM Module */}
            <ProjectCard 
              tag="Automotive Platform"
              title="AutoAM"
              link="https://autoam-web.vercel.app/"
              image="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop"
              className="md:col-span-1 md:row-span-1"
            />

            {/* Peace Service Academy Module */}
            <ProjectCard 
              tag="EdTech Platform"
              title="Peace Service Academy"
              link="https://peace-service-academy.org"
              image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
              className="md:col-span-2 md:row-span-1"
            />

            {/* Technical Receipt Module */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 bg-[#0A0A0A] rounded-[2rem] p-10 flex flex-col justify-center text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Performance Standard</span>
                <h3 className="text-6xl font-bold tracking-tighter text-white">100<span className="text-[#4F46E5]">/</span>100</h3>
                <p className="text-sm text-gray-400 mt-4 font-medium leading-relaxed">
                  Lighthouse performance score baseline. Speed is a design feature.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PROFESSIONAL CLOSER */}
      <section className="px-6 md:px-12 py-32 mt-10">
        <div className="max-w-[1200px] mx-auto bg-[#0A0A0A] rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4F46E5] opacity-20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
              Ready to deploy <br className="hidden md:block" /> excellence?
            </h2>
            
            <div className="pt-8 flex justify-center">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-8 py-5 bg-white text-[#0A0A0A] rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <MessageSquare size={20} className="text-[#25D366]" />
                Connect via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 md:px-12 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
        © {new Date().getFullYear()} Adeoye Boluwatife. All Rights Reserved.
      </footer>
    </main>
  );
}
