"use client";
import { Printer, Download, ArrowLeft, Globe, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center py-8 px-4 relative z-50">
      
      {/* === CRITICAL PRINT CSS === */}
      <style jsx global>{`
        /* Hide the Website Navigation Bar ONLY */
        body > header, nav { display: none !important; }
        
        @media print {
          @page { margin: 0; size: A4; }
          body { background: white !important; -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
          * { color: black !important; border-color: black !important; }
          .no-print { display: none !important; }
          
          /* Force Single Page */
          .print-container {
            width: 210mm;
            height: 297mm;
            padding: 15mm !important;
            margin: 0 auto !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* === ACTIONS (Hidden on Print) === */}
      <div className="w-full max-w-[210mm] flex justify-between items-center mb-6 no-print sticky top-4 z-50">
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

      {/* === THE DOCUMENT (A4) === */}
      <div className="print-container bg-white text-black w-full max-w-[210mm] min-h-[297mm] p-[15mm] shadow-2xl relative flex flex-col justify-between">
        
        {/* WATERMARK */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[350px] font-black text-slate-900 opacity-[0.03] pointer-events-none select-none z-0 leading-none">
          BA
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          
          {/* HEADER (Changed from <header> to <div> to avoid conflict) */}
          <div id="resume-header" className="border-b-4 border-black pb-4 mb-4 shrink-0">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-2">
                  Boluwatife<br/>Adeoye
                </h1>
                <p className="text-xs font-bold bg-black text-white px-2 py-0.5 inline-block uppercase tracking-[0.2em] print:text-black print:bg-transparent print:border print:border-black">
                  Senior Full-Stack Engineer
                </p>
              </div>
              <div className="text-right flex flex-col items-end gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-600 print:text-black">
                <span className="flex items-center gap-1">boluadeoye.com.ng <Globe size={10} /></span>
                <span className="flex items-center gap-1">boluadeoye97@gmail.com <Mail size={10} /></span>
                <span className="flex items-center gap-1">+234 810 629 3674 <Phone size={10} /></span>
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <section className="mb-4 shrink-0">
            <h2 className="text-[9px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-0.5 mb-2">Executive Summary</h2>
            <p className="text-[9pt] leading-snug text-justify font-medium">
              High-performance <strong>Software Architect</strong> with specialized expertise in <strong>Web3 Frontend Engineering</strong> and <strong>AI-Driven Systems</strong>. Proven ability to bridge complex backend logic (Xano, Supabase) with premium, physics-based user interfaces (Next.js). Pioneer in building "Living" digital ecosystems that drive revenue and operational efficiency.
            </p>
          </section>

          {/* SKILLS GRID */}
          <section className="mb-4 shrink-0">
            <h2 className="text-[9px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-0.5 mb-2">Technical Arsenal</h2>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <div>
                <p className="text-[8px] font-black uppercase text-slate-600 mb-0.5">Core Infrastructure</p>
                <p className="text-[9pt] font-bold leading-tight">Next.js 14 (App Router), React, TypeScript, Node.js, Tailwind CSS</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-600 mb-0.5">Web3 & Blockchain</p>
                <p className="text-[9pt] font-bold leading-tight">Wagmi, Viem, RainbowKit, Smart Contracts</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-600 mb-0.5">Backend & Data</p>
                <p className="text-[9pt] font-bold leading-tight">Xano, Supabase, Neon Postgres, Drizzle ORM</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-600 mb-0.5">AI & Automation</p>
                <p className="text-[9pt] font-bold leading-tight">RAG Systems, LangChain, Gemini SDK, Groq API</p>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="mb-4 shrink-0">
            <h2 className="text-[9px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-0.5 mb-3">Professional Experience</h2>
            
            <div className="mb-3">
              <div className="flex justify-between items-end mb-0.5">
                <h3 className="text-[10pt] font-black uppercase">Lead Full-Stack Engineer</h3>
                <span className="text-[8px] font-bold bg-slate-100 px-2 py-0.5 rounded print:border print:border-slate-300">2023 – PRESENT</span>
              </div>
              <p className="text-[8px] font-bold text-slate-600 uppercase tracking-wider mb-1 print:text-black">Freelance / Contract • Remote</p>
              <ul className="list-disc pl-4 text-[9pt] space-y-0.5 font-medium marker:text-black">
                <li>Architected <strong>"The Digital Consciousness"</strong>, a custom RAG-based AI agent that autonomously qualifies leads and answers technical queries in real-time.</li>
                <li>Built <strong>"SkillBridge"</strong>, a decentralized time-banking marketplace using Next.js and Xano, implementing atomic database transactions.</li>
                <li>Developed <strong>"Lumina Commerce"</strong>, a high-performance e-commerce engine featuring "Maglev" physics animations and real-time inventory via Neon SQL.</li>
                <li>Optimized frontend performance, achieving <strong>99/100 Lighthouse scores</strong> through server-side rendering.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-end mb-0.5">
                <h3 className="text-[10pt] font-black uppercase">Frontend Developer</h3>
                <span className="text-[8px] font-bold bg-slate-100 px-2 py-0.5 rounded print:border print:border-slate-300">2021 – 2023</span>
              </div>
              <p className="text-[8px] font-bold text-slate-600 uppercase tracking-wider mb-1 print:text-black">Various Projects</p>
              <ul className="list-disc pl-4 text-[9pt] space-y-0.5 font-medium marker:text-black">
                <li>Translated complex Figma designs into pixel-perfect, responsive React components.</li>
                <li>Integrated third-party APIs (Paystack, Stripe) to handle secure payments for local businesses.</li>
                <li>Refactored legacy codebases to modern Next.js standards, reducing load times by 40%.</li>
              </ul>
            </div>
          </section>

          {/* PROJECTS */}
          <section className="flex-1 min-h-0">
            <h2 className="text-[9px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-0.5 mb-3">Key Projects</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border-l-2 border-black pl-3">
                <h3 className="text-[9pt] font-black uppercase mb-0.5">BoluAdeoye.com.ng</h3>
                <p className="text-[8pt] leading-tight font-medium">
                  A "World-Class" personal platform featuring a custom AI Digital Twin, 3D physics animations, and a proprietary Markdown-to-PDF engine.
                </p>
              </div>
              <div className="border-l-2 border-black pl-3">
                <h3 className="text-[9pt] font-black uppercase mb-0.5">Contract Forge</h3>
                <p className="text-[8pt] leading-tight font-medium">
                  A browser-based legal document generator that converts Markdown into print-ready, legally formatted PDFs with auto-signatures.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-auto pt-4 border-t border-slate-300 flex justify-between items-end shrink-0">
          <div className="flex flex-col gap-1">
            <div className="font-serif italic text-2xl text-black transform -rotate-2">
              Boluwatife Adeoye
            </div>
            <p className="text-[8px] uppercase tracking-[0.2em] font-bold">Authorized Signature</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-black tracking-tight">BOLUADEOYE.COM.NG</p>
            <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Engineering & Strategy</p>
          </div>
        </footer>

      </div>
    </main>
  );
}
