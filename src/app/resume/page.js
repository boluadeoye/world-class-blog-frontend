"use client";
import { Printer, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center py-8 px-4">
      
      {/* === PRINT CSS OVERRIDES === */}
      <style jsx global>{`
        @media print {
          @page { margin: 0; size: auto; }
          body { background: white; }
          /* Hide everything that isn't the resume */
          body * { visibility: hidden; }
          #resume-document, #resume-document * { visibility: visible; }
          #resume-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 15mm !important; /* Enforce our own padding */
          }
        }
      `}</style>

      {/* === HEADER (Hidden on Print) === */}
      <div className="w-full max-w-[210mm] flex justify-between items-center mb-8 print:hidden">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back
        </Link>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black rounded-full font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
        >
          <Download size={18} /> Download PDF
        </button>
      </div>

      {/* === THE RESUME DOCUMENT === */}
      <div 
        id="resume-document"
        className="bg-white text-slate-900 w-full max-w-[210mm] p-[15mm] shadow-2xl print:shadow-none print:w-full print:max-w-none"
      >
        
        {/* HEADER */}
        <header className="border-b-2 border-black pb-5 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight leading-none mb-2">Boluwatife Adeoye</h1>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-[0.2em]">Senior Full-Stack Engineer</p>
          </div>
          <div className="text-right text-xs font-medium text-slate-700 leading-relaxed">
            <p>boluadeoye97@gmail.com</p>
            <p>boluadeoye.com.ng</p>
            <p>+234 810 629 3674</p>
            <p>Lagos, Nigeria</p>
          </div>
        </header>

        {/* SUMMARY */}
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-[10pt] leading-relaxed text-justify text-slate-800">
            High-performance Full-Stack Engineer with specialized expertise in <strong>Web3 Frontend Architecture</strong> and <strong>AI-Driven Applications</strong>. Proven track record of building scalable, decentralized applications (dApps) using Next.js, Wagmi, and Solidity integrations. Expert in bridging complex backend logic (Xano, Supabase) with premium, physics-based user interfaces.
          </p>
        </section>

        {/* SKILLS (Compact Grid) */}
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">Technical Arsenal</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[9pt]">
            <div>
              <span className="font-bold block text-black">Core Stack</span>
              <span className="text-slate-700">Next.js 14, React, TypeScript, Tailwind CSS</span>
            </div>
            <div>
              <span className="font-bold block text-black">Web3 & Blockchain</span>
              <span className="text-slate-700">Wagmi, Viem, RainbowKit, Smart Contracts</span>
            </div>
            <div>
              <span className="font-bold block text-black">Backend & Database</span>
              <span className="text-slate-700">Xano, Supabase, Neon (Postgres), Drizzle</span>
            </div>
            <div>
              <span className="font-bold block text-black">AI & Automation</span>
              <span className="text-slate-700">RAG Systems, Google Gemini SDK, Groq API</span>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Experience</h2>
          
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-[10pt]">Lead Full-Stack Engineer</h3>
              <span className="text-[9pt] font-bold text-slate-500">2023 – Present</span>
            </div>
            <p className="text-[8pt] font-bold text-slate-600 mb-1 uppercase">Freelance / Contract</p>
            <ul className="list-disc pl-4 text-[9pt] space-y-1 text-slate-800">
              <li>Architected <strong>"The Digital Consciousness"</strong>, a custom RAG-based AI agent that autonomously qualifies leads and answers technical queries in real-time.</li>
              <li>Built <strong>"SkillBridge"</strong>, a decentralized time-banking marketplace using Next.js and Xano, implementing atomic database transactions to prevent double-spending.</li>
              <li>Developed <strong>"Lumina Commerce"</strong>, a high-performance e-commerce engine featuring "Maglev" physics animations and real-time inventory management via Neon SQL.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-[10pt]">Frontend Developer</h3>
              <span className="text-[9pt] font-bold text-slate-500">2021 – 2023</span>
            </div>
            <p className="text-[8pt] font-bold text-slate-600 mb-1 uppercase">Various Projects</p>
            <ul className="list-disc pl-4 text-[9pt] space-y-1 text-slate-800">
              <li>Translated complex Figma designs into pixel-perfect, responsive React components.</li>
              <li>Integrated third-party APIs (Paystack, Stripe) to handle secure payments for local businesses.</li>
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Key Projects</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded border border-slate-100">
              <h3 className="font-bold text-[9pt] mb-1">BoluAdeoye.com.ng</h3>
              <p className="text-[8pt] leading-relaxed text-slate-700">
                A "World-Class" personal platform featuring a custom AI Digital Twin, 3D physics animations, and a proprietary Markdown-to-PDF engine.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-100">
              <h3 className="font-bold text-[9pt] mb-1">Contract Forge</h3>
              <p className="text-[8pt] leading-relaxed text-slate-700">
                A browser-based legal document generator that converts Markdown into print-ready, legally formatted PDFs with auto-signatures.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-4 border-t border-slate-200 flex justify-between items-center text-[8pt] text-slate-500">
          <span>© 2025 Adeoye Boluwatife</span>
          <span className="font-mono">Generated via boluadeoye.com.ng/resume</span>
        </footer>

      </div>
    </main>
  );
}
