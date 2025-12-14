"use client";
import { motion } from "framer-motion";
import { Download, Mail, Globe, Phone, MapPin, ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-amber-500/30 print:bg-white print:text-black">
      
      {/* === FLOATING DOWNLOAD BUTTON (Screen Only) === */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 right-8 z-50 print:hidden"
      >
        <button 
          onClick={handlePrint}
          className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 transition-all uppercase tracking-widest text-xs"
        >
          <Download size={18} /> Download PDF
        </button>
      </motion.div>

      {/* === RESUME CONTAINER === */}
      <div className="max-w-[210mm] mx-auto bg-[#0a0a0a] min-h-screen shadow-2xl print:shadow-none print:bg-white print:text-black print:p-0">
        
        {/* === HEADER === */}
        <header className="p-12 md:p-16 border-b border-white/10 print:border-black print:p-0 print:mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight print:text-black print:text-4xl">
                ADE OYE <br/>
                <span className="text-slate-500 print:text-slate-600">BOLUWATIFE</span>
              </h1>
              <p className="text-amber-500 font-mono text-sm font-bold tracking-[0.2em] uppercase print:text-black print:text-xs">
                Senior Full-Stack Engineer & AI Architect
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="text-right space-y-2 text-sm text-slate-400 print:text-black print:text-xs">
              <div className="flex items-center justify-end gap-2">
                <span>boluadeoye.com.ng</span>
                <Globe size={14} className="text-amber-500 print:text-black" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span>boluadeoye97@gmail.com</span>
                <Mail size={14} className="text-amber-500 print:text-black" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span>+234 810 629 3674</span>
                <Phone size={14} className="text-amber-500 print:text-black" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span>Lagos, Nigeria</span>
                <MapPin size={14} className="text-amber-500 print:text-black" />
              </div>
            </div>
          </div>
        </header>

        {/* === CONTENT BODY === */}
        <div className="p-12 md:p-16 pt-8 grid grid-cols-1 md:grid-cols-12 gap-12 print:p-0 print:grid-cols-12 print:gap-8">
          
          {/* LEFT COLUMN (Skills & Stack) */}
          <aside className="md:col-span-4 space-y-10 print:col-span-4">
            
            {/* Section: Core Competencies */}
            <div>
              <h3 className="font-serif text-xl text-white border-b border-white/10 pb-2 mb-4 print:text-black print:border-black">
                Core Competencies
              </h3>
              <ul className="space-y-2 text-sm text-slate-400 print:text-slate-800">
                <li className="flex items-start gap-2"><ChevronRight size={14} className="text-amber-500 mt-0.5 print:text-black" /> Full-Stack Architecture</li>
                <li className="flex items-start gap-2"><ChevronRight size={14} className="text-amber-500 mt-0.5 print:text-black" /> AI Agent Integration</li>
                <li className="flex items-start gap-2"><ChevronRight size={14} className="text-amber-500 mt-0.5 print:text-black" /> Database Design</li>
                <li className="flex items-start gap-2"><ChevronRight size={14} className="text-amber-500 mt-0.5 print:text-black" /> Technical Writing</li>
                <li className="flex items-start gap-2"><ChevronRight size={14} className="text-amber-500 mt-0.5 print:text-black" /> Performance Optimization</li>
              </ul>
            </div>

            {/* Section: Tech Stack */}
            <div>
              <h3 className="font-serif text-xl text-white border-b border-white/10 pb-2 mb-4 print:text-black print:border-black">
                Technical Arsenal
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 print:text-black">Frontend</p>
                  <p className="text-sm text-slate-500 print:text-slate-700">Next.js 14, React, Tailwind CSS, Framer Motion</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 print:text-black">Backend</p>
                  <p className="text-sm text-slate-500 print:text-slate-700">Node.js, Xano, Supabase, Neon (Postgres)</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 print:text-black">AI / ML</p>
                  <p className="text-sm text-slate-500 print:text-slate-700">Groq (Llama 3), Gemini SDK, RAG Systems</p>
                </div>
              </div>
            </div>

          </aside>

          {/* RIGHT COLUMN (Experience & Projects) */}
          <main className="md:col-span-8 space-y-10 print:col-span-8">
            
            {/* Section: Profile */}
            <div>
              <h3 className="font-serif text-xl text-white border-b border-white/10 pb-2 mb-4 print:text-black print:border-black">
                Executive Profile
              </h3>
              <p className="text-sm leading-relaxed text-slate-300 text-justify print:text-black">
                High-performance Full-Stack Engineer specializing in building scalable digital ecosystems. Expert in merging complex backend architectures with premium, physics-based frontend interfaces. Pioneer in "AI-First" web applications, integrating Large Language Models into consumer-facing products to drive automation and revenue.
              </p>
            </div>

            {/* Section: Featured Projects */}
            <div>
              <h3 className="font-serif text-xl text-white border-b border-white/10 pb-2 mb-6 print:text-black print:border-black">
                Selected Engineering
              </h3>
              
              <div className="space-y-8">
                {/* Project 1 */}
                <div className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-white text-lg print:text-black">The Digital Consciousness</h4>
                    <span className="text-xs font-mono text-amber-500 print:text-black">Live Portfolio</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2 print:text-slate-700">Next.js 14 • Tailwind • Groq AI • RAG</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300 print:text-black">
                    <li>Architected a custom RAG-based AI Digital Twin capable of answering visitor queries in real-time based on blog context.</li>
                    <li>Engineered a neural typing simulator and aggressive state persistence engine for seamless UX.</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-white text-lg print:text-black">SkillBridge Marketplace</h4>
                    <span className="text-xs font-mono text-amber-500 print:text-black">FinTech / EdTech</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2 print:text-slate-700">Xano • Postgres • Next.js</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300 print:text-black">
                    <li>Built a decentralized time-banking economy allowing users to exchange skills without currency.</li>
                    <li>Implemented atomic database transactions to prevent double-spending and ensure data integrity.</li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-white text-lg print:text-black">Lumina Commerce</h4>
                    <span className="text-xs font-mono text-amber-500 print:text-black">E-commerce Engine</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2 print:text-slate-700">Neon DB • Drizzle ORM • Monorepo</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300 print:text-black">
                    <li>Developed a high-performance, monorepo-based e-commerce template with real-time inventory management.</li>
                    <li>Achieved 99/100 Lighthouse performance scores via server-side rendering and edge caching.</li>
                  </ul>
                </div>
              </div>
            </div>

          </main>
        </div>

        {/* === FOOTER === */}
        <footer className="p-12 md:p-16 pt-0 mt-auto print:p-0 print:mt-8">
          <div className="border-t border-white/10 pt-6 flex justify-between items-center print:border-black">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest print:text-black">
              Reference: boluadeoye.com.ng
            </p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest print:text-black">
              Status: Available for Contract
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}
