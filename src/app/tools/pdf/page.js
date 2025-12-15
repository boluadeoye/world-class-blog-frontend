"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Printer, PenTool, ArrowLeft, Eye, X } from "lucide-react";
import Link from "next/link";

export default function ContractForge() {
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState(`# THE ARCHITECTURE OF A DIGITAL TWIN
**Building High-Performance RAG Systems with Next.js**

**Author:** Boluwatife Adeoye
**Date:** December 15, 2025

## 1. ABSTRACT
The modern web is shifting from static content to "Living Interfaces." This paper outlines the architectural decisions behind building a "Digital Consciousness"—an AI agent capable of mimicking a developer's personality and technical knowledge in real-time.

## 2. THE CHALLENGE
Standard chatbots (like ChatGPT wrappers) suffer from hallucination and lack specific context. To build a true "Digital Twin," the system must:
1.  Retain conversation history across sessions (Persistence).
2.  Access a specific knowledge base (The Blog).
3.  Simulate human latency (Typing Physics).

## 3. THE SOLUTION: RAG ARCHITECTURE
Retrieval-Augmented Generation (RAG) was implemented to ground the AI's responses.

### 3.1 The Stack
*   **Frontend:** Next.js 14 (App Router) for server-side rendering.
*   **Inference Engine:** Groq LPU running Llama 3.3 (70B) for sub-100ms latency.
*   **State Management:** LocalStorage synchronization for aggressive persistence.

### 3.2 The "Neural" Typing Engine
To prevent the "Wall of Text" effect common in AI, a custom hook was engineered to stream text character-by-character, mimicking human typing speeds (10ms–30ms variance).

## 4. CONCLUSION
By combining high-performance edge computing with localized state management, we achieved a chat interface that feels less like a tool and more like a conversation.

---
*Generated via Bolu's PDF Engine*`);

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // === THE HIGH-CONTRAST DOCUMENT ===
  const DocumentPaper = () => (
    <div 
      className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl relative flex flex-col justify-between mx-auto overflow-hidden"
      style={{ fontFamily: 'var(--font-serif)' }} 
    >
      {/* WATERMARK (Subtle but visible) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black text-black opacity-[0.02] pointer-events-none select-none z-0">
        BA
      </div>

      {/* HEADER */}
      <header className="relative z-10 border-b-4 border-black pb-8 mb-10 flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-[0.9] text-black">
            Boluwatife<br/>Adeoye
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-1 w-12 bg-black"></div>
            <p className="text-xs font-black tracking-[0.4em] uppercase text-black">Lead Engineer</p>
          </div>
        </div>
        
        {/* LOGO */}
        <div className="w-24 h-24 border-[6px] border-black flex items-center justify-center">
          <span className="text-5xl font-black tracking-tighter text-black">BA</span>
        </div>
      </header>

      {/* BODY (Bold & Black) */}
      <div className="relative z-10 flex-1">
        <ReactMarkdown
          components={{
            // H1: Massive Section Headers
            h1: ({node, ...props}) => (
              <h1 className="text-2xl font-black uppercase tracking-wide border-b-2 border-black pb-2 mt-8 mb-4 text-black" {...props} />
            ),
            // H2: Sub-headers
            h2: ({node, ...props}) => (
              <h2 className="text-xl font-bold uppercase mt-6 mb-3 text-black" {...props} />
            ),
            // H3: Minor headers
            h3: ({node, ...props}) => (
              <h3 className="text-lg font-bold uppercase mt-4 mb-2 text-black" {...props} />
            ),
            // P: Medium weight for solid black look
            p: ({node, ...props}) => (
              <p className="text-justify text-[11pt] leading-[1.6] font-medium mb-4 text-black" {...props} />
            ),
            // Strong: Extra Heavy
            strong: ({node, ...props}) => (
              <strong className="font-black text-black uppercase" {...props} />
            ),
            // Lists
            ul: ({node, ...props}) => <ul className="list-none pl-0 mb-4" {...props} />,
            li: ({node, ...props}) => (
              <li className="flex items-start gap-3 mb-2 text-[11pt] font-medium text-black">
                <span className="mt-1.5 w-1.5 h-1.5 bg-black shrink-0"></span>
                <span>{props.children}</span>
              </li>
            ),
            // Blockquote
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-black pl-4 py-2 my-6 italic font-medium text-black bg-gray-50" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 mt-16 pt-8 border-t-2 border-black flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="font-serif italic text-4xl text-black transform -rotate-2 mb-1">
              Boluwatife Adeoye
            </div>
            <div className="h-0.5 w-64 bg-black"></div>
            <p className="text-[9px] uppercase tracking-[0.2em] font-bold mt-2 text-black">Authorized Signature</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-black text-black tracking-tight">BOLUADEOYE.COM.NG</p>
          <p className="text-[8px] font-bold text-black uppercase tracking-widest mt-1">Engineering & Strategy</p>
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
