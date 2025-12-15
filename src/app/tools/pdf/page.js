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

  // === THE DOCUMENT ===
  const DocumentPaper = () => (
    <div 
      className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative flex flex-col justify-between mx-auto overflow-hidden"
    >
      {/* HEADER */}
      <header className="border-b-[3px] border-black pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-black">Boluwatife<br/>Adeoye</h1>
          <p className="text-xs font-bold tracking-[0.3em] uppercase mt-3 text-black">Lead Software Engineer</p>
        </div>
        <div className="w-14 h-14 border-[3px] border-black rounded-full flex items-center justify-center font-bold text-xl tracking-tighter text-black">
          BA
        </div>
      </header>

      {/* BODY */}
      <div className="relative z-10 flex-1">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => (
              <h1 className="text-xl font-black uppercase tracking-wide border-b-2 border-black pb-2 mt-8 mb-4 text-black" {...props} />
            ),
            h2: ({node, ...props}) => (
              <h2 className="text-lg font-bold uppercase mt-6 mb-3 text-black" {...props} />
            ),
            p: ({node, ...props}) => (
              <p className="text-justify text-[12pt] leading-[1.5] font-semibold mb-4 text-black" {...props} />
            ),
            strong: ({node, ...props}) => (
              <strong className="font-black text-black uppercase" {...props} />
            ),
            ul: ({node, ...props}) => <ul className="list-none pl-0 mb-4" {...props} />,
            li: ({node, ...props}) => (
              <li className="flex items-start gap-3 mb-2 text-[12pt] font-semibold text-black">
                <span className="mt-2 w-1.5 h-1.5 bg-black shrink-0"></span>
                <span>{props.children}</span>
              </li>
            ),
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-black pl-4 py-2 my-6 italic font-bold text-black bg-gray-100" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 mt-16 pt-8 border-t-[3px] border-black flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="font-serif italic text-3xl text-black transform -rotate-2 mb-1 font-bold">
              Boluwatife Adeoye
            </div>
            <div className="h-[2px] w-64 bg-black"></div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black mt-2 text-black">Authorized Signature</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-black text-black tracking-tight">BOLUADEOYE.COM.NG</p>
          <p className="text-[9px] font-bold text-black uppercase tracking-widest mt-1">Engineering & Strategy</p>
        </div>
      </footer>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans">
      
      {/* === CRITICAL PRINT CSS === */}
      <style jsx global>{`
        header { display: none !important; }
        
        @media print {
          @page { margin: 0; size: A4; }
          
          /* FORCE BLACK & THICKNESS */
          body, p, h1, h2, h3, span, div { 
            color: #000000 !important; 
            text-shadow: 0 0 0 #000000 !important; /* The Thickener Hack */
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* USE SYSTEM FONTS FOR DARKER RENDER */
          .print-container {
            font-family: Georgia, 'Times New Roman', serif !important;
          }

          /* HIDE UI */
          .no-print { display: none !important; }
          
          /* LAYOUT */
          .print-container {
            width: 100%;
            height: auto;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
      
      {/* === 1. EDITOR SECTION === */}
      <div className={`flex flex-col h-screen ${showPreview ? 'hidden md:flex' : 'flex'} md:flex-row`}>
        
        {/* LEFT: INPUT */}
        <div className="w-full md:w-1/2 flex flex-col border-r border-white/10 h-full">
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-slate-900/50 shrink-0">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase">
              <ArrowLeft size={14} /> Exit
            </Link>
            
            <div className="flex items-center gap-3 md:hidden">
              <button onClick={() => setShowPreview(true)} className="px-3 py-1.5 rounded bg-white/10 text-white text-xs font-bold uppercase border border-white/10">Preview</button>
              <button onClick={handlePrint} className="px-3 py-1.5 rounded bg-amber-500 text-black text-xs font-bold uppercase shadow-lg">Export PDF</button>
            </div>

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
              <div className="print-container bg-white text-black w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative flex flex-col justify-between">
                 <DocumentPaper />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === 2. MOBILE PREVIEW MODAL === */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col md:hidden">
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 bg-slate-900 shrink-0">
            <button onClick={() => setShowPreview(false)} className="text-slate-400 flex items-center gap-2 text-xs font-bold uppercase"><X size={16} /> Edit</button>
            <span className="text-white font-bold text-sm">Preview</span>
            <button onClick={handlePrint} className="px-3 py-1.5 rounded bg-amber-500 text-black text-xs font-bold uppercase shadow-lg">Export PDF</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-slate-800">
            <div className="scale-[0.5] origin-top-left w-[200%]">
               <div className="print-container bg-white text-black w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative flex flex-col justify-between">
                 <DocumentPaper />
               </div>
            </div>
          </div>
        </div>
      )}

      {/* === 3. PRINT LAYER === */}
      <div className="hidden print:block print:absolute print:top-0 print:left-0 print:w-full print:z-[9999] print:bg-white">
        <div className="print-container">
           <DocumentPaper />
        </div>
      </div>

    </main>
  );
}
