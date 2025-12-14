"use client";
import { Printer, Download, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center py-12 px-4">
      
      {/* === HEADER (Hidden on Print) === */}
      <div className="w-full max-w-[210mm] flex justify-between items-center mb-8 print:hidden">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black rounded-full font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
        >
          <Download size={18} /> Download PDF
        </button>
      </div>

      {/* === THE RESUME DOCUMENT === */}
      <div className="bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl print:shadow-none print:w-full print:max-w-none print:p-0 print:m-0">
        
        {/* HEADER */}
        <header className="border-b-2 border-slate-900 pb-6 mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Boluwatife Adeoye</h1>
          <p className="text-lg font-bold text-slate-700 uppercase tracking-widest mb-4">Senior Full-Stack & Web3 Engineer</p>
          
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            <span>📧 boluadeoye97@gmail.com</span>
            <span>🌐 boluadeoye.com.ng</span>
            <span>📱 +234 810 629 3674</span>
            <span>📍 Lagos, Nigeria (Remote Ready)</span>
          </div>
        </header>

        {/* SUMMARY */}
        <section className="mb-8">
          <h2 className="text-sm font-black uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-justify">
            High-performance Full-Stack Engineer with specialized expertise in <strong>Web3 Frontend Architecture</strong> and <strong>AI-Driven Applications</strong>. Proven track record of building scalable, decentralized applications (dApps) using Next.js, Wagmi, and Solidity integrations. Expert in bridging complex backend logic (Xano, Supabase) with premium, physics-based user interfaces. Passionate about building "Living" digital ecosystems that drive revenue and user engagement.
          </p>
        </section>

        {/* SKILLS */}
        <section className="mb-8">
          <h2 className="text-sm font-black uppercase tracking-widest border-b border-slate-300 pb-1 mb-3">Technical Arsenal</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-bold mb-1">Core Stack</p>
              <p>Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Node.js</p>
            </div>
            <div>
              <p className="font-bold mb-1">Web3 & Blockchain</p>
              <p>Wagmi, Viem, RainbowKit, Ethers.js, Smart Contract Integration</p>
            </div>
            <div>
              <p className="font-bold mb-1">Backend & Database</p>
              <p>Xano (No-Code), Supabase, Neon (Serverless Postgres), Drizzle ORM</p>
            </div>
            <div>
              <p className="font-bold mb-1">AI & Automation</p>
              <p>RAG Systems, LangChain, Google Gemini SDK, Groq API</p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-8">
          <h2 className="text-sm font-black uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Engineering Experience</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-base">Lead Full-Stack Engineer</h3>
              <span className="text-xs font-bold text-slate-500">2023 – Present</span>
            </div>
            <p className="text-xs font-bold text-slate-600 mb-2 uppercase">Freelance / Contract</p>
            <ul className="list-disc pl-4 text-sm space-y-1.5">
              <li>Architected <strong>"The Digital Consciousness"</strong>, a custom RAG-based AI agent that autonomously qualifies leads and answers technical queries in real-time.</li>
              <li>Built <strong>"SkillBridge"</strong>, a decentralized time-banking marketplace using Next.js and Xano, implementing atomic database transactions to prevent double-spending.</li>
              <li>Developed <strong>"Lumina Commerce"</strong>, a high-performance e-commerce engine featuring "Maglev" physics animations and real-time inventory management via Neon SQL.</li>
              <li>Optimized frontend performance for multiple clients, achieving consistent <strong>99/100 Lighthouse scores</strong> through server-side rendering and edge caching.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-base">Frontend Developer</h3>
              <span className="text-xs font-bold text-slate-500">2021 – 2023</span>
            </div>
            <p className="text-xs font-bold text-slate-600 mb-2 uppercase">Various Projects</p>
            <ul className="list-disc pl-4 text-sm space-y-1.5">
              <li>Translated complex Figma designs into pixel-perfect, responsive React components.</li>
              <li>Integrated third-party APIs (Paystack, Stripe) to handle secure payments for local businesses.</li>
              <li>Refactored legacy codebases to modern Next.js standards, reducing load times by 40%.</li>
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <h2 className="text-sm font-black uppercase tracking-widest border-b border-slate-300 pb-1 mb-4">Key Projects</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-sm mb-1">BoluAdeoye.com.ng</h3>
              <p className="text-xs leading-relaxed">
                A "World-Class" personal platform featuring a custom AI Digital Twin, 3D physics animations, and a proprietary Markdown-to-PDF engine.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Contract Forge</h3>
              <p className="text-xs leading-relaxed">
                A browser-based legal document generator that converts Markdown into print-ready, legally formatted PDFs with auto-signatures.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
