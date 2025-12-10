"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Printer, PenTool, ArrowLeft, Eye, X } from "lucide-react";
import Link from "next/link";

export default function ContractForge() {
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState(`# SERVICE AGREEMENT

**Date:** ${new Date().toLocaleDateString()}

**Between:**
Boluwatife Adeoye (Lead Engineer)
AND
[Client Name]

# 1. SCOPE OF WORK
The Engineer agrees to provide high-performance software architecture, full-stack development, and system design services.

# 2. TERMS
This contract ensures world-class delivery standards. All code remains the intellectual property of the client upon final payment.

# 3. PAYMENT
Payment shall be made in milestones as agreed upon.

---
*Drafted via The Forge*`);

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // === THE AUTHORITATIVE DOCUMENT ===
  const DocumentPaper = () => (
    <div 
      className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative flex flex-col justify-between mx-auto overflow-hidden"
      style={{ fontFamily: 'var(--font-serif)' }} 
    >
      {/* WATERMARK */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-bold text-slate-50 opacity-[0.04] pointer-events-none select-none z-0">
        BA
      </div>

      {/* HEADER */}
      <header className="relative z-10 border-b-4 border-black pb-8 mb-10 flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">
            Boluwatife<br/>Adeoye
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-1 w-12 bg-black"></div>
            <p className="text-xs font-bold tracking-[0.4em] uppercase">Lead Engineer</p>
          </div>
        </div>
        
        {/* THE BOLD HERO LOGO */}
        <div className="w-24 h-24 border-[6px] border-black flex items-center justify-center">
          <span className="text-5xl font-black tracking-tighter">BA</span>
        </div>
      </header>

      {/* BODY (Intelligent Rendering) */}
      <div className="relative z-10 flex-1">
        <ReactMarkdown
          components={{
            // H1: Section Headers (Massive, Uppercase, Underlined)
            h1: ({node, ...props}) => (
              <h1 className="text-2xl font-black uppercase tracking-wide border-b-2 border-black pb-2 mt-8 mb-4" {...props} />
            ),
            // H2: Sub-headers (Bold, Serif)
            h2: ({node, ...props}) => (
              <h2 className="text-xl font-bold uppercase mt-6 mb-3 text-slate-800" {...props} />
            ),
            // P: Justified, Medium Weight for readability
            p: ({node, ...props}) => (
              <p className="text-justify text-[11pt] leading-[1.6] font-medium mb-4 text-slate-900" {...props} />
            ),
            // Strong: Heavy Black & Uppercase for defined terms
            strong: ({node, ...props}) => (
              <strong className="font-black text-black uppercase" {...props} />
            ),
            // Lists: Custom Square Bullets
            ul: ({node, ...props}) => <ul className="list-none pl-0 mb-4" {...props} />,
            li: ({node, ...props}) => (
              <li className="flex items-start gap-3 mb-2 text-[11pt] font-medium">
                <span className="mt-1.5 w-1.5 h-1.5 bg-black shrink-0"></span>
                <span>{props.children}</span>
              </li>
            ),
            // Blockquote: Legal Note style
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-black pl-4 py-2 my-6 italic font-medium text-slate-700 bg-slate-50" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 mt-16 pt-8 border-t border-slate-300 flex justify-between items-end">
        <div className="flex flex-col gap-4">
          {/* Signature Line */}
          <div className="flex flex-col">
            <div className="font-serif italic text-4xl text-black transform -rotate-2 mb-1">
              Boluwatife Adeoye
            </div>
            <div className="h-0.5 w-64 bg-black"></div>
            <p className="text-[9px] uppercase tracking-[0.2em] font-bold mt-2">Authorized Signature</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-black text-black tracking-tight">BOLUADEOYE.COM.NG</p>
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Engineering & Strategy</p>
        </div>
      </footer>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans">
      
      {/* === HIDE GLOBAL HEADER === */}
      <style jsx global>{`
        header { display: none !important; }
      `}</style>
      
      {/* === 1. EDITOR SECTION === */}
      <div className={`flex flex-col h-screen ${showPreview ? 'hidden md:flex' : 'flex'} md:flex-row`}>
        
        {/* LEFT: INPUT */}
        <div className="w-full md:w-1/2 flex flex-col border-r border-white/10 h-full">
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-slate-900/50 shrink-0">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase">
              <ArrowLeft size={14} /> Exit
            </Link>
            
            {/* MOBILE ACTIONS */}
            <div className="flex items-center gap-3 md:hidden">
              <button 
                onClick={() => setShowPreview(true)} 
                className="px-3 py-1.5 rounded bg-white/10 text-white text-xs font-bold uppercase border border-white/10"
              >
                Preview
              </button>
              <button 
                onClick={handlePrint} 
                className="px-3 py-1.5 rounded bg-amber-500 text-black text-xs font-bold uppercase shadow-lg shadow-amber-500/20"
              >
                Export PDF
              </button>
            </div>

            {/* DESKTOP TITLE */}
            <div className="hidden md:flex items-center gap-2 text-amber-500 font-bold text-sm uppercase">
              <PenTool size={16} /> The Forge
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-[#050505] text-slate-300 p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed"
            placeholder="# Start typing..."
          />
          
          <div className="md:hidden p-2 text-center text-[10px] text-slate-600 bg-slate-900">
            Tip: Click Export, then select "Save as PDF"
          </div>
        </div>

        {/* RIGHT: DESKTOP PREVIEW */}
        <div className="hidden md:flex w-1/2 bg-slate-900 flex-col h-full">
          <div className="h-16 border-b border-white/10 flex items-center justify-end px-6 bg-slate-900/50 shrink-0">
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-bold text-xs hover:bg-amber-400 transition-colors">
              <Printer size={14} /> Export PDF
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 flex justify-center">
            <div className="scale-[0.6] origin-top">
              <DocumentPaper />
            </div>
          </div>
        </div>
      </div>

      {/* === 2. MOBILE PREVIEW MODAL === */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col md:hidden">
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-slate-900 shrink-0">
            <button onClick={() => setShowPreview(false)} className="text-slate-400 flex items-center gap-2 text-xs font-bold uppercase">
              <X size={16} /> Edit
            </button>
            <span className="text-white font-bold text-sm">Document Preview</span>
            <button 
              onClick={handlePrint} 
              className="px-3 py-1.5 rounded bg-amber-500 text-black text-xs font-bold uppercase shadow-lg"
            >
              Export PDF
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-slate-800">
            <div className="scale-[0.5] origin-top-left w-[200%]">
              <DocumentPaper />
            </div>
          </div>
        </div>
      )}

      {/* === 3. PRINT LAYER === */}
      <div className="hidden print:block print:absolute print:top-0 print:left-0 print:w-full print:z-[9999] print:bg-white">
        <DocumentPaper />
      </div>

    </main>
  );
}
