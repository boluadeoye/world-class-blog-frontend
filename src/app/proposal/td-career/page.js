"use client";
import { useState, useEffect } from "react";
import { 
  Download, ArrowRight, CheckCircle, FileText, 
  Linkedin, ShieldCheck, Briefcase, Target, Zap
} from "lucide-react";

export default function TDCareerArchitecture() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "TD_CAREER_ARCHITECTURE_2026";
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1773905999/blog_assets/penfqat1quony3kafa7s.jpg";

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-slate-900 selection:bg-red-200">
      
      {/* IMPORT LUXURY FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;0,900;1,400&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700&family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #F9F9F9 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #td-render, #td-render * { visibility: visible; }
          #td-render { position: absolute; left: 0; top: 0; width: 100%; background: #F9F9F9; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #F9F9F9; box-sizing: border-box; overflow: hidden; }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-newsreader { font-family: 'Newsreader', serif; }
        
        /* 1% PAPER GRAIN TEXTURE */
        .paper-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-4 border-[#DC2626]">
          <div className="w-24 h-24 mx-auto mb-8 bg-slate-100 rounded-full flex items-center justify-center p-2 border border-slate-200">
            <img src={logoUrl} alt="TD Logo" className="w-full h-full object-contain rounded-full mix-blend-multiply" />
          </div>

          <h1 className="font-playfair text-3xl font-black text-[#0F172A] mb-2 uppercase tracking-widest">Titanium Digital</h1>
          <p className="font-inter text-[#DC2626] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Career Architecture Engine</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-6 border-l-2 border-[#DC2626] font-mono text-[10px] text-slate-500 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; COMPILING 6-PAGE DOSSIER...</p>
              <p className="opacity-75">&gt; INJECTING DIGITAL TRUST SEAL...</p>
              <p className="text-[#0F172A] font-bold animate-pulse">&gt; ASSET_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Extract Document
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 6-PAGE DOCUMENT (Print Only) === */}
      <div id="td-render" className="hidden print:block text-[#0F172A]">
        
        {/* PAGE 1: COVER */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 mix-blend-multiply">
            <img src={logoUrl} alt="TD Watermark" className="w-[180mm] h-[180mm] object-contain grayscale" />
          </div>
          <div className="relative z-10 h-full flex flex-col border-l-2 border-[#DC2626] pl-[15mm]">
            <header className="flex justify-between items-start mb-32">
              <img src={logoUrl} alt="TD Logo" className="w-16 h-16 mix-blend-multiply" />
              <div className="text-right">
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Document ID</p>
                <p className="font-mono text-[10px] font-black text-[#0F172A] uppercase tracking-widest">TD-CAREER-2026</p>
              </div>
            </header>
            <main className="grow flex flex-col justify-center">
              <p className="font-inter text-sm font-black text-[#DC2626] uppercase tracking-[0.4em] mb-6">Strategic Branding</p>
              <h1 className="font-playfair text-6xl font-black text-[#0F172A] uppercase tracking-tighter leading-[0.9] mb-10">Titanium<br/>Digital</h1>
              <p className="font-inter text-xl font-medium text-slate-600 leading-relaxed max-w-md">Career Architecture & Strategic Branding for High-Value Technical Assets.</p>
            </main>
            <footer className="mt-auto pt-12 border-t border-slate-200 flex justify-between items-end">
              <div>
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Lead Architect</p>
                <p className="font-inter text-xl font-black text-[#0F172A] uppercase tracking-widest">Bolu Adeoye</p>
              </div>
              <div className="text-right font-mono text-sm font-black text-[#0F172A] uppercase tracking-widest">2026 Edition</div>
            </footer>
          </div>
        </div>

        {/* PAGE 2: THE METHODOLOGY (TABLE) */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain relative">
          <Header title="The Methodology" />
          <main className="grow relative z-10 mt-12">
            <h2 className="font-playfair text-4xl font-black text-[#0F172A] mb-12">Standard CV vs. Titanium Technical Manifesto</h2>
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#0F172A] font-inter text-[10px] uppercase tracking-widest text-slate-400">
                  <th className="pb-4 w-1/4">Feature</th>
                  <th className="pb-4 w-1/3">Traditional Approach</th>
                  <th className="pb-4 w-5/12 text-[#0F172A] font-black">Titanium Standard</th>
                </tr>
              </thead>
              <tbody className="font-newsreader text-sm text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="py-6 font-inter font-bold text-[#0F172A] text-xs uppercase tracking-widest">Format</td>
                  <td className="py-6 pr-4">Static Word Document or generic Canva template. Easily ignored by ATS systems.</td>
                  <td className="py-6 font-bold text-[#0F172A] border-l border-slate-100 pl-4">Dual-View CSS Injection. A live, interactive web portal that compiles into a defense-grade PDF.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-6 font-inter font-bold text-[#0F172A] text-xs uppercase tracking-widest">Content</td>
                  <td className="py-6 pr-4">Task-based bullet points ("Responsible for managing database").</td>
                  <td className="py-6 font-bold text-[#0F172A] border-l border-slate-100 pl-4">Metric-Driven Impact. Focuses on architectural wins, latency reduction, and revenue generation.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-6 font-inter font-bold text-[#0F172A] text-xs uppercase tracking-widest">Visuals</td>
                  <td className="py-6 pr-4">Text-heavy walls of information with zero visual hierarchy.</td>
                  <td className="py-6 font-bold text-[#0F172A] border-l border-slate-100 pl-4">Pure CSS Architectural Diagrams. Visualizes complex systems (e.g., RAG pipelines) directly on the page.</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-6 font-inter font-bold text-[#0F172A] text-xs uppercase tracking-widest">Perception</td>
                  <td className="py-6 pr-4">Positions the candidate as a "Worker" seeking employment.</td>
                  <td className="py-6 font-bold text-[#DC2626] border-l border-slate-100 pl-4">Positions the candidate as a "Sovereign Asset" delivering high-ticket business solutions.</td>
                </tr>
              </tbody>
            </table>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: ANATOMY OF AUTHORITY (DIAGRAM) */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain relative">
          <Header title="The Anatomy of Authority" />
          <main className="grow relative z-10 mt-12 flex flex-col">
            <h2 className="font-playfair text-4xl font-black text-[#0F172A] mb-16">The Executive Anomaly</h2>
            
            <div className="grow relative flex items-center justify-center">
              {/* Central Resume Wireframe */}
              <div className="w-64 h-96 bg-white border-2 border-[#0F172A] shadow-xl relative p-4 flex flex-col gap-4 z-10">
                <div className="h-8 bg-slate-100 border border-slate-200 w-full"></div>
                <div className="h-24 bg-slate-50 border border-slate-200 w-full relative">
                  {/* Connection Point 1 */}
                  <div className="absolute top-1/2 -left-2 w-2 h-2 bg-[#DC2626] rounded-full -translate-y-1/2"></div>
                </div>
                <div className="h-32 bg-slate-50 border border-slate-200 w-full relative">
                  {/* Connection Point 2 */}
                  <div className="absolute top-1/2 -right-2 w-2 h-2 bg-[#0F172A] rounded-full -translate-y-1/2"></div>
                </div>
                <div className="h-12 bg-slate-100 border border-slate-200 w-full relative">
                  {/* Connection Point 3 */}
                  <div className="absolute top-1/2 -left-2 w-2 h-2 bg-[#DC2626] rounded-full -translate-y-1/2"></div>
                </div>
              </div>

              {/* Callout 1 (Left Top) */}
              <div className="absolute top-32 left-0 w-48">
                <div className="border-t-2 border-[#DC2626] w-24 absolute top-4 left-48"></div>
                <h3 className="font-inter text-xs font-black uppercase text-[#DC2626] mb-1 flex items-center gap-2"><Target size={14}/> Metric-Driven Impact</h3>
                <p className="font-newsreader text-xs text-slate-600">Replacing generic tasks with hard data (e.g., "Reduced latency by 40%").</p>
              </div>

              {/* Callout 2 (Right Middle) */}
              <div className="absolute top-64 right-0 w-48 text-right">
                <div className="border-t-2 border-[#0F172A] w-24 absolute top-4 right-48"></div>
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1 flex items-center justify-end gap-2">Architectural Narrative <Zap size={14}/></h3>
                <p className="font-newsreader text-xs text-slate-600">Structuring experience as a series of successful system deployments.</p>
              </div>

              {/* Callout 3 (Left Bottom) */}
              <div className="absolute bottom-32 left-0 w-48">
                <div className="border-t-2 border-[#DC2626] w-24 absolute top-4 left-48"></div>
                <h3 className="font-inter text-xs font-black uppercase text-[#DC2626] mb-1 flex items-center gap-2"><ShieldCheck size={14}/> ATS-Shattering</h3>
                <p className="font-newsreader text-xs text-slate-600">Strategic keyword injection that bypasses automated HR filters.</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: THE LINKEDIN ECOSYSTEM (FLOW) */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain relative">
          <Header title="The Professional Infrastructure" />
          <main className="grow relative z-10 mt-12 flex flex-col">
            <h2 className="font-playfair text-4xl font-black text-[#0F172A] mb-6">The Unified Ecosystem</h2>
            <p className="font-newsreader text-lg text-slate-700 mb-20 max-w-prose">A resume does not exist in a vacuum. It is part of a tri-fold infrastructure designed to capture, convince, and convert high-tier recruiters.</p>
            
            <div className="flex flex-col items-center gap-8 grow">
              
              {/* Node 1 */}
              <div className="w-full max-w-md border border-[#0F172A] bg-white p-6 flex items-center gap-6 shadow-sm">
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center shrink-0"><FileText className="text-[#0F172A]"/></div>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest text-[#0F172A]">1. The Cover Letter</h3>
                  <p className="font-newsreader text-xs text-slate-600 mt-1">The "Hook". A highly targeted, 3-paragraph anomaly pitch.</p>
                </div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-[#DC2626]"></div>

              {/* Node 2 */}
              <div className="w-full max-w-md border-2 border-[#0F172A] bg-slate-50 p-6 flex items-center gap-6 shadow-md relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#DC2626] rounded-full flex items-center justify-center"><CheckCircle size={12} className="text-white"/></div>
                <div className="w-12 h-12 bg-[#0F172A] flex items-center justify-center shrink-0"><Briefcase className="text-white"/></div>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest text-[#0F172A]">2. The Titanium Resume</h3>
                  <p className="font-newsreader text-xs text-slate-600 mt-1">The "Proof". The 1-page technical specification of your career.</p>
                </div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-[#DC2626]"></div>

              {/* Node 3 */}
              <div className="w-full max-w-md border border-[#0F172A] bg-white p-6 flex items-center gap-6 shadow-sm">
                <div className="w-12 h-12 bg-[#0077b5] flex items-center justify-center shrink-0"><Linkedin className="text-white"/></div>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest text-[#0F172A]">3. The LinkedIn Profile</h3>
                  <p className="font-newsreader text-xs text-slate-600 mt-1">The "Landing Page". Optimized for inbound recruiter search algorithms.</p>
                </div>
              </div>

            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 5: CASE STUDY (DATA TABLE) */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain relative">
          <Header title="Performance Metrics" />
          <main className="grow relative z-10 mt-12">
            <h2 className="font-playfair text-4xl font-black text-[#0F172A] mb-6">Case Study: The $250k Pivot</h2>
            <p className="font-newsreader text-lg text-slate-700 mb-16 max-w-prose">Data extracted from a Senior Engineer transitioning from a standard Word document to the Titanium Digital infrastructure.</p>
            
            <div className="bg-white border border-[#0F172A] shadow-xl">
              <div className="grid grid-cols-3 bg-[#0F172A] text-white font-inter text-[10px] font-black uppercase tracking-widest p-4">
                <div>Key Metric</div>
                <div>Before (Standard)</div>
                <div className="text-[#DC2626]">After (Titanium)</div>
              </div>
              
              <div className="grid grid-cols-3 p-6 border-b border-slate-100 items-center">
                <div className="font-inter text-xs font-bold uppercase text-slate-500">Interview Rate</div>
                <div className="font-mono text-lg text-slate-800">2.4%</div>
                <div className="font-mono text-2xl font-black text-[#0F172A]">68.0%</div>
              </div>
              
              <div className="grid grid-cols-3 p-6 border-b border-slate-100 items-center bg-slate-50">
                <div className="font-inter text-xs font-bold uppercase text-slate-500">Recruiter Inbound</div>
                <div className="font-mono text-lg text-slate-800">1 / Month</div>
                <div className="font-mono text-2xl font-black text-[#0F172A]">12 / Week</div>
              </div>
              
              <div className="grid grid-cols-3 p-6 items-center">
                <div className="font-inter text-xs font-bold uppercase text-slate-500">Salary Offer</div>
                <div className="font-mono text-lg text-slate-800">$120,000</div>
                <div className="font-mono text-2xl font-black text-[#DC2626]">$250,000 <span className="text-xs text-[#0F172A]">+ Equity</span></div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 6: THE SEAL OF INTEGRITY */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain relative items-center justify-center text-center">
          
          {/* Subtle Background Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0 mix-blend-multiply">
            <img src={logoUrl} alt="TD Watermark" className="w-[200mm] h-[200mm] object-contain grayscale" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-md">
            
            {/* The Digital Trust Seal */}
            <div className="w-32 h-32 mb-16 relative flex items-center justify-center">
              <div className="absolute inset-0 border border-slate-300 rounded-full"></div>
              <div className="absolute inset-2 border border-slate-200 rounded-full"></div>
              <img src={logoUrl} alt="TD Seal" className="w-20 h-20 object-contain mix-blend-multiply grayscale opacity-80" />
            </div>

            {/* The APPROVED Stamp */}
            <div className="border-4 border-[#DC2626] text-[#DC2626] font-inter font-black text-5xl tracking-[0.4em] px-10 py-4 mb-24 transform -rotate-6 opacity-90 shadow-sm">
              APPROVED
            </div>

            {/* Signature Line */}
            <div className="w-full flex flex-col items-center">
              <div className="w-64 border-b-2 border-[#0F172A] mb-4"></div>
              <h2 className="font-playfair text-3xl font-black text-[#0F172A] uppercase tracking-widest">Bolu Adeoye</h2>
              <p className="font-inter text-[10px] font-bold text-slate-500 tracking-[0.4em] uppercase mt-2">Lead Architect</p>
              <p className="font-mono text-[8px] text-slate-400 mt-6">VERIFICATION HASH: 0xTD9A4...F2B1</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Header/Footer Components
function Header({ title }) {
  return (
    <header className="flex justify-between items-end border-b border-slate-200 pb-4 relative z-10">
      <h2 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-widest">{title}</h2>
      <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">TD-CAREER-2026</div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center relative z-10">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
        TITANIUM DIGITAL // PAGE <span className="page-num text-[#0F172A]"></span>
      </span>
      <div className="w-2 h-2 bg-[#DC2626]"></div>
    </footer>
  );
}
