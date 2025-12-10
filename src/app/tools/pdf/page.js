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

## 1. Scope of Work
The Engineer agrees to provide high-performance software architecture, full-stack development, and system design services.

## 2. Terms
This contract ensures world-class delivery standards. All code remains the intellectual property of the client upon final payment.

## 3. Payment
Payment shall be made in milestones as agreed upon.

---
*Drafted via The Forge*`);

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // The Document Component
  const DocumentPaper = () => (
    <div 
      className="bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative flex flex-col justify-between mx-auto"
      style={{ fontFamily: 'serif' }} 
    >
      <header className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase leading-none text-black">Boluwatife<br/>Adeoye</h1>
          <p className="text-xs font-bold tracking-[0.3em] uppercase mt-3 text-slate-500">Lead Software Engineer</p>
        </div>
        <div className="w-14 h-14 border-2 border-slate-900 rounded-full flex items-center justify-center font-bold text-xl tracking-tighter text-black">
          BA
        </div>
      </header>

      <div className="flex-1 prose prose-slate max-w-none prose-p:text-justify prose-headings:uppercase prose-headings:tracking-wide prose-li:marker:text-black text-black">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <footer className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <div className="font-serif italic text-3xl text-slate-800 transform -rotate-2 text-black">
            Boluwatife Adeoye
          </div>
          <div className="h-px w-48 bg-black"></div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Authorized Signature</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-black">boluadeoye.com.ng</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Engineering & Strategy</p>
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
            <span className="text-white font-bold text-sm">Preview</span>
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
