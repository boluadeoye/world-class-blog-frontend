"use client";
import { Printer, Download, ArrowLeft, Globe, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center py-8 px-4 relative z-50">
      
      {/* === PRINT OPTIMIZATION === */}
      <style jsx global>{`
        header { display: none !important; }
        @media print {
          @page { margin: 0.5cm; size: A4; }
          body { background: white; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-force { display: block !important; }
        }
      `}</style>

      {/* === ACTIONS (Hidden on Print) === */}
      <div className="w-full max-w-[210mm] flex justify-between items-center mb-8 no-print sticky top-4 z-50">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <ArrowLeft size={14} /> Return
        </Link>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all shadow-xl"
        >
          <Download size={16} /> Save as PDF
        </button>
      </div>

      {/* === THE DOCUMENT === */}
      <div className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] p-[15mm] shadow-2xl relative overflow-hidden print:shadow-none print:w-full print:max-w-none print:h-auto print:overflow-visible print:p-[10mm]">
        
        {/* WATERMARK */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black text-slate-900 opacity-[0.03] pointer-events-none select-none z-0 leading-none">
          BA
        </div>

        <div className="relative z-10">
          {/* HEADER */}
          <header className="border-b-4 border-black pb-4 mb-6 print-force">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-3">
              Boluwatife<br/>Adeoye
            </h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-sm font-bold bg-black text-white px-2 py-1 inline-block uppercase tracking-[0.2em] print:text-black print:bg-transparent print:border print:border-black">
                Senior Full-Stack Engineer
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[9px] font-bold uppercase tracking-wider text-slate-600 print:text-black">
                <span className="flex items-center gap-1">boluadeoye.com.ng</span>
                <span className="flex items-center gap-1">boluadeoye97@gmail.com</span>
                <span className="flex items-center gap-1">+234 810 629 3674</span>
              </div>
            </div>
          </header>

          {/* SUMMARY */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 mb-2">Executive Summary</h2>
            <p className="text-[10pt] leading-relaxed text-justify font-medium text-slate-800 print:text-black">
              High-performance <strong>Software Architect</strong> with specialized expertise in <strong>Web3 Frontend Engineering</strong> and <strong>AI-Driven Systems</strong>. Proven ability to bridge complex backend logic (Xano, Supabase) with premium, physics-based user interfaces (Next.js). Pioneer in building "Living" digital ecosystems that drive revenue, user engagement, and operational efficiency.
            </p>
          </section>

          {/* SKILLS GRID */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 mb-2">Technical Arsenal</h2>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              <div>
                <p className="text-[9px] font-black uppercase text-slate-500 mb-0.5 print:text-black">Core Infrastructure</p>
                <p className="text-[9pt] font-bold leading-tight">Next.js 14 (App Router), React, TypeScript, Node.js, Tailwind CSS</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-500 mb-0.5 print:text-black">Web3 & Blockchain</p>
                <p className="text-[9pt] font-bold leading-tight">Wagmi, Viem, RainbowKit, Smart Contract Integration, dApp Architecture</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-500 mb-0.5 print:text-black">Backend & Data</p>
                <p className="text-[9pt] font-bold leading-tight">Xano (No-Code), Supabase, Neon (Serverless Postgres), Drizzle ORM</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-500 mb-0.5 print:text-black">AI & Automation</p>
                <p className="text-[9pt] font-bold leading-tight">RAG Systems, LangChain, Google Gemini SDK, Groq API, Vector DBs</p>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 mb-3">Professional Experience</h2>
            
            <div className="mb-4">
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-[10pt] font-black uppercase">Lead Full-Stack Engineer</h3>
                <span className="text-[9px] font-bold bg-slate-100 px-2 py-0.5 rounded print:border print:border-slate-300">2023 – PRESENT</span>
              </div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 print:text-black">Freelance / Contract • Remote</p>
              <ul className="list-disc pl-4 text-[9pt] space-y-1 font-medium text-slate-800 marker:text-black print:text-black">
                <li>Architected <strong>"The Digital Consciousness"</strong>, a custom RAG-based AI agent that autonomously qualifies leads and answers technical queries in real-time.</li>
                <li>Built <strong>"SkillBridge"</strong>, a decentralized time-banking marketplace using Next.js and Xano, implementing atomic database transactions to prevent double-spending.</li>
                <li>Developed <strong>"Lumina Commerce"</strong>, a high-performance e-commerce engine featuring "Maglev" physics animations and real-time inventory management via Neon SQL.</li>
                <li>Optimized frontend performance for multiple clients, achieving consistent <strong>99/100 Lighthouse scores</strong> through server-side rendering and edge caching.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-[10pt] font-black uppercase">Frontend Developer</h3>
                <span className="text-[9px] font-bold bg-slate-100 px-2 py-0.5 rounded print:border print:border-slate-300">2021 – 2023</span>
              </div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 print:text-black">Various Projects</p>
              <ul className="list-disc pl-4 text-[9pt] space-y-1 font-medium text-slate-800 marker:text-black print:text-black">
                <li>Translated complex Figma designs into pixel-perfect, responsive React components.</li>
                <li>Integrated third-party APIs (Paystack, Stripe) to handle secure payments for local businesses.</li>
                <li>Refactored legacy codebases to modern Next.js standards, reducing load times by 40%.</li>
              </ul>
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 mb-3">Key Projects</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-black pl-3">
                <h3 className="text-[9pt] font-black uppercase mb-1">BoluAdeoye.com.ng</h3>
                <p className="text-[8pt] leading-tight font-medium text-slate-700 print:text-black">
                  A "World-Class" personal platform featuring a custom AI Digital Twin, 3D physics animations, and a proprietary Markdown-to-PDF engine.
                </p>
              </div>
              <div className="border-l-2 border-black pl-3">
                <h3 className="text-[9pt] font-black uppercase mb-1">Contract Forge</h3>
                <p className="text-[8pt] leading-tight font-medium text-slate-700 print:text-black">
                  A browser-based legal document generator that converts Markdown into print-ready, legally formatted PDFs with auto-signatures.
                </p>
              </div>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}
