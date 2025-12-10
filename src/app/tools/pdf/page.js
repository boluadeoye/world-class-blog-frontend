"use client";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useReactToPrint } from "react-to-print";
import { Printer, FileText, PenTool, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContractForge() {
  const [content, setContent] = useState(`# SERVICE AGREEMENT

**Date:** ${new Date().toLocaleDateString()}

**Between:**
Boluwatife Adeoye (Lead Engineer)
AND
[Client Name]

## 1. Scope of Work
The Engineer agrees to provide high-performance software architecture, full-stack development, and system design services as detailed in the attached proposal.

## 2. Terms
This contract ensures world-class delivery standards. All code remains the intellectual property of the client upon final payment.

## 3. Payment
Payment shall be made in milestones as agreed upon.

---
*Drafted via The Forge*`);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Contract_Boluwatife_${new Date().toISOString().split('T')[0]}`,
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* === LEFT: THE EDITOR (Dark Mode) === */}
      <div className="w-full md:w-1/2 h-screen flex flex-col border-r border-white/10">
        
        {/* Toolbar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900/50">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Exit
          </Link>
          <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-widest">
            <PenTool size={16} /> The Forge
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-[#050505] text-slate-300 p-8 resize-none focus:outline-none font-mono text-sm leading-relaxed custom-scrollbar"
          placeholder="# Start typing your contract..."
          spellCheck={false}
        />
      </div>

      {/* === RIGHT: THE PREVIEW (Paper Mode) === */}
      <div className="w-full md:w-1/2 h-screen bg-slate-900 flex flex-col relative">
        
        {/* Print Toolbar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-end px-6 bg-slate-900/50 gap-4">
          <span className="text-xs text-slate-500 font-mono">A4 PREVIEW</span>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-bold text-xs hover:bg-amber-400 transition-colors"
          >
            <Printer size={14} /> Export PDF
          </button>
        </div>

        {/* The Paper Canvas (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-800/50 flex justify-center">
          
          {/* === THE A4 DOCUMENT === */}
          <div 
            ref={componentRef}
            className="bg-white text-slate-900 w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative flex flex-col justify-between"
            style={{ fontFamily: 'var(--font-serif)' }} // Uses Cormorant Garamond
          >
            
            {/* 1. HEADER */}
            <header className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold tracking-tight uppercase">Boluwatife<br/>Adeoye</h1>
                <p className="text-xs font-bold tracking-[0.3em] uppercase mt-2 text-slate-500">Lead Software Engineer</p>
              </div>
              <div className="w-12 h-12 border-2 border-slate-900 rounded-full flex items-center justify-center font-bold text-xl tracking-tighter">
                BA
              </div>
            </header>

            {/* 2. CONTENT BODY */}
            <div className="flex-1 prose prose-slate max-w-none prose-p:text-justify prose-headings:font-serif prose-headings:uppercase prose-headings:tracking-wide prose-li:marker:text-slate-900">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>

            {/* 3. FOOTER & SIGNATURE */}
            <footer className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-end">
              
              {/* Signature Block */}
              <div className="flex flex-col gap-2">
                {/* Simulated Signature Font */}
                <div className="font-serif italic text-3xl text-slate-800 transform -rotate-2">
                  Boluwatife Adeoye
                </div>
                <div className="h-px w-48 bg-slate-900"></div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Authorized Signature</p>
              </div>

              {/* Branding */}
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">boluadeoye.com.ng</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Engineering & Strategy</p>
              </div>

            </footer>

          </div>
        </div>
      </div>

    </main>
  );
}
