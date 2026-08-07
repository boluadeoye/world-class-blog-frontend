"use client";
import { useState, useEffect } from "react";
import { Download, Feather, Compass, BookOpen, Share2, Globe, Hash, Award } from "lucide-react";
import Link from "next/link";

export default function WritersClubPublication() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Writers_Club_Global_Publication_Issue_01";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 antialiased subpixel-antialiased">
      
      {/* IMPORT LITERARY & EDITORIAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: #FBF9F5 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #publication-render, #publication-render * { visibility: visible; }
          #publication-render { position: absolute; left: 0; top: 0; width: 100%; background: #FBF9F5; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background: #FBF9F5;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 20mm;
          }
          .no-print { display: none !important; }
        }
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lora { font-family: 'Lora', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* ARCHIVAL COLOR PALETTE */
        .bg-cream { background-color: #FBF9F5; }
        .bg-forest { background-color: #0A2F1D; }
        .text-forest { color: #0A2F1D; }
        .text-gold { color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        .bg-sienna { background-color: #C2410C; }
        .text-sienna { color: #C2410C; }
        .text-carbon { color: #0F1E15; }
        
        /* DROP CAP STYLING */
        .drop-cap::first-letter {
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          font-weight: 900;
          float: left;
          line-height: 0.8;
          margin-right: 0.75rem;
          color: #C2410C;
        }

        /* 2-COLUMN JOURNAL LAYOUT */
        .journal-columns {
          column-count: 2;
          column-gap: 2rem;
          column-rule: 0.5pt solid #D4AF37;
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-[#FBF9F5] p-10 text-center shadow-2xl border-t-8 border-[#0A2F1D]">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#0A2F1D] flex items-center justify-center rounded-full text-[#D4AF37]">
            <Feather size={28} />
          </div>

          <h1 className="font-playfair text-3xl font-black text-[#0A2F1D] mb-2 uppercase tracking-tight">The Writer&apos;s Club</h1>
          <p className="font-inter text-[#C2410C] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Global Literary Publication // Issue 01</p>

          {!isReady ? (
            <div className="text-slate-400 font-mono text-xs animate-pulse">PREPARING ARCHIVAL SPANS...</div>
          ) : (
            <button 
              onClick={handlePrint} 
              className="w-full bg-[#0A2F1D] hover:bg-[#133E2B] text-[#D4AF37] font-inter font-black py-4 uppercase tracking-widest transition-all shadow-xl"
            >
              <Download size={18} className="inline mr-2" />
              Extract Master Issue (PDF)
            </button>
          )}
          
          <Link href="/" className="block mt-8 text-xs text-slate-500 hover:text-slate-800 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE PUBLICATION (Print Only) === */}
      <div id="publication-render" className="hidden print:block text-carbon">
        
        {/* ================= PAGE 1: THE COVER ================= */}
        <div className="a4-page !p-0 bg-forest text-white border-[12mm] border-forest relative">
          <div className="h-full border border-[#D4AF37]/40 p-[15mm] flex flex-col justify-between relative z-10">
            
            {/* Header / Issue Badge */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mb-1">Global Literary Journal</p>
                <p className="font-playfair italic text-xs text-slate-300">The Writer&apos;s Club Press</p>
              </div>
              <div className="bg-[#C2410C] text-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">
                ISSUE 01 // SPRING 2026
              </div>
            </div>

            {/* Master Title */}
            <div className="my-auto text-center py-12">
              <div className="w-12 h-12 mx-auto mb-8 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Feather size={24} />
              </div>
              <h1 className="font-playfair text-6xl font-black uppercase tracking-tight text-white leading-[0.9] mb-6">
                The Sovereign<br/><span className="text-[#D4AF37] italic font-normal">Voice</span>
              </h1>
              <div className="h-px w-24 bg-[#D4AF37] mx-auto mb-6"></div>
              <p className="font-inter text-xs font-semibold text-slate-300 uppercase tracking-[0.3em] max-w-md mx-auto leading-relaxed">
                A Global Compendium of Essays, Poetry, &amp; Short Fiction
              </p>
            </div>

            {/* Footer / Highlights */}
            <div className="border-t border-[#D4AF37]/30 pt-6 flex justify-between items-end">
              <div>
                <p className="font-mono text-[8px] text-[#D4AF37] uppercase tracking-widest mb-1">Featured In This Issue</p>
                <p className="font-playfair text-sm italic text-white">Bolu Adeoye &bull; Mayowa Olaoluwa &bull; Director Bim</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Edition</p>
                <p className="font-mono text-xs font-bold text-white">INTERNATIONAL 1.0</p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= PAGE 2: MASTHEAD & TOC ================= */}
        <div className="a4-page">
          <JournalHeader currentSection="MASTHEAD & CONTENTS" pageNum="02" />
          
          <main className="grow grid grid-cols-12 gap-8 my-auto">
            
            {/* Left Column: Masthead (4 Cols) */}
            <div className="col-span-4 bg-[#F5F2EB] p-6 border-l-2 border-[#0A2F1D] flex flex-col justify-between">
              <div>
                <h3 className="font-playfair text-lg font-black uppercase text-[#0A2F1D] mb-4 pb-2 border-b border-[#D4AF37]">
                  The Masthead
                </h3>
                
                <div className="space-y-4 font-inter text-[10px] text-slate-700">
                  <div>
                    <p className="font-bold uppercase text-[#C2410C]">Editor-in-Chief</p>
                    <p className="font-playfair italic text-xs font-bold text-[#0A2F1D]">Boluwatife Adeoye</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase text-[#C2410C]">Senior Editorial Board</p>
                    <p className="font-playfair text-xs text-[#0A2F1D]">Olaoluwa Mayowa</p>
                    <p className="font-playfair text-xs text-[#0A2F1D]">Praise Oluwole</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase text-[#C2410C]">Patron &amp; Mentor</p>
                    <p className="font-playfair italic text-xs font-bold text-[#0A2F1D]">Director Bim</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-300">
                <p className="font-mono text-[8px] text-slate-500 uppercase leading-relaxed">
                  Published quarterly by The Writer&apos;s Club Press. All rights reserved. No part of this publication may be reproduced without written consent.
                </p>
              </div>
            </div>

            {/* Right Column: Table of Contents (8 Cols) */}
            <div className="col-span-8 flex flex-col justify-between">
              <div>
                <h2 className="font-playfair text-3xl font-black uppercase text-[#0A2F1D] mb-8 pb-2 border-b-2 border-[#0A2F1D]">
                  Table of Contents
                </h2>

                <div className="space-y-6">
                  {/* Item 1 */}
                  <div className="flex justify-between items-baseline border-b border-slate-200 pb-3">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-[#C2410C] uppercase tracking-widest">ESSAY &bull; PAGE 03</span>
                      <h4 className="font-playfair text-lg font-bold text-[#0A2F1D] mt-0.5">On the Architecture of Thought</h4>
                      <p className="font-inter text-xs text-slate-600 italic">By Bolu Adeoye</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0A2F1D]">03</span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex justify-between items-baseline border-b border-slate-200 pb-3">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-[#C2410C] uppercase tracking-widest">POETRY &bull; PAGE 04</span>
                      <h4 className="font-playfair text-lg font-bold text-[#0A2F1D] mt-0.5">The Unwritten Script</h4>
                      <p className="font-inter text-xs text-slate-600 italic">By Olaoluwa Mayowa</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0A2F1D]">04</span>
                  </div>

                  {/* Item 3 */}
                  <div className="flex justify-between items-baseline border-b border-slate-200 pb-3">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-[#C2410C] uppercase tracking-widest">CRITIQUE &bull; PAGE 05</span>
                      <h4 className="font-playfair text-lg font-bold text-[#0A2F1D] mt-0.5">Building Men of Stature</h4>
                      <p className="font-inter text-xs text-slate-600 italic">By Praise Oluwole</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0A2F1D]">05</span>
                  </div>
                </div>
              </div>

              {/* Editor's Note */}
              <div className="bg-white p-6 border border-[#D4AF37]">
                <p className="font-inter text-[9px] font-black uppercase text-[#C2410C] tracking-widest mb-1">Editor&apos;s Manifesto</p>
                <p className="font-lora text-xs italic leading-relaxed text-slate-700">
                  &ldquo;Words are not merely symbols; they are structural beams. In this inaugural issue, we explore the intersection of discipline, creativity, and purpose.&rdquo;
                </p>
              </div>
            </div>

          </main>
          <JournalFooter />
        </div>

        {/* ================= PAGE 3: FEATURE ESSAY (2-COLUMN SPREAD) ================= */}
        <div className="a4-page">
          <JournalHeader currentSection="FEATURE ESSAY" pageNum="03" />
          
          <main className="grow flex flex-col justify-between">
            {/* Title Block */}
            <div className="mb-8 border-b-2 border-[#0A2F1D] pb-4">
              <span className="font-mono text-[9px] font-bold text-[#C2410C] uppercase tracking-[0.3em]">ESSAY &bull; CRITICAL THEORY</span>
              <h1 className="font-playfair text-4xl font-black uppercase text-[#0A2F1D] mt-1 mb-2">On the Architecture of Thought</h1>
              <p className="font-inter text-xs font-semibold text-slate-600">BY BOLU ADEOYE &bull; LEAD SYSTEMS ARCHITECT</p>
            </div>

            {/* 2-Column Body Text */}
            <div className="journal-columns font-lora text-[11px] leading-[1.8] text-justify text-[#0F1E15] grow">
              <p className="drop-cap mb-4">
                In the modern era, clarity of expression is often sacrificed on the altar of velocity. We rush to publish, to post, and to communicate without first laying down the structural foundations required for ideas to endure.
              </p>
              <p className="mb-4">
                True thought is architectural. It demands a blueprint, an understanding of load-bearing concepts, and a refusal to rely on cheap ornamentation or stiff jargon. When we strip away the noise, what remains is the pure integrity of the argument.
              </p>

              {/* PULL QUOTE */}
              <div className="my-6 p-4 border-y-2 border-[#D4AF37] text-center font-playfair italic text-sm font-bold text-[#0A2F1D] leading-relaxed break-inside-avoid">
                &ldquo;A wall built without structural integrity will collapse under the slightest environmental pressure. So too will a weak narrative.&rdquo;
              </div>

              <p className="mb-4">
                This principles applies equally to software systems, church administration, and literary craft. Whether we are writing a line of code, designing an order of service, or penning an essay on identity, the requirement remains unchanged: precision.
              </p>
              <p className="mb-4">
                As writers within this global collective, our assignment is clear. We must cultivate the discipline to refine our thoughts until every word carries weight, purpose, and mathematical clarity.
              </p>
            </div>
          </main>
          <JournalFooter />
        </div>

        {/* ================= PAGE 4: POETRY CANVAS ================= */}
        <div className="a4-page">
          <JournalHeader currentSection="POETRY" pageNum="04" />
          
          <main className="grow flex flex-col justify-center pl-16">
            <div className="max-w-md">
              <span className="font-mono text-[9px] font-bold text-[#C2410C] uppercase tracking-[0.3em] block mb-2">POETRY &bull; SELECTION 01</span>
              <h1 className="font-playfair text-4xl font-black uppercase text-[#0A2F1D] mb-2">The Unwritten Script</h1>
              <p className="font-inter text-xs font-semibold text-slate-500 italic mb-10">By Olaoluwa Mayowa</p>

              <div className="font-lora text-sm leading-[2.2] text-[#0F1E15] space-y-6">
                <p>
                  They handed me a script I never wrote,<br/>
                  A stage prepared before my eyes could see,<br/>
                  And every line was spoken from a throat<br/>
                  That never asked what lived inside of me.
                </p>

                <div className="text-[#C2410C] text-xs font-mono font-bold tracking-widest pl-4">&diams; &diams; &diams;</div>

                <p>
                  They said a man must carry every weight,<br/>
                  And stand like stone when rivers flood the floor,<br/>
                  To hide his tears behind an iron gate,<br/>
                  And lock his fears behind a silent door.
                </p>

                <div className="text-[#C2410C] text-xs font-mono font-bold tracking-widest pl-4">&diams; &diams; &diams;</div>

                <p>
                  But growth begins where silent performance ends,<br/>
                  When burden turns to purpose in the light,<br/>
                  And truth becomes the anchor that defends<br/>
                  The boy who steps from darkness into sight.
                </p>
              </div>
            </div>
          </main>
          <JournalFooter />
        </div>

        {/* ================= PAGE 5: BACK COVER / COLOPHON ================= */}
        <div className="a4-page !p-0 bg-forest text-white border-[12mm] border-forest relative">
          <div className="h-full border border-[#D4AF37]/40 p-[15mm] flex flex-col justify-between relative z-10">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-4">
              <span className="font-playfair italic text-xs text-[#D4AF37]">The Writer&apos;s Club Press</span>
              <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest">Colophon &bull; Issue 01</span>
            </div>

            {/* Center Callout */}
            <div className="max-w-md mx-auto text-center space-y-6 my-auto">
              <div className="w-12 h-12 mx-auto border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Compass size={24} />
              </div>
              <h2 className="font-playfair text-3xl font-black uppercase text-white tracking-tight">
                Join the Global Movement
              </h2>
              <p className="font-lora text-xs leading-relaxed text-slate-300 italic">
                &ldquo;We are raising a generation of writers, thinkers, and architects who understand that language is the ultimate instrument of influence.&rdquo;
              </p>
              <div className="h-px w-16 bg-[#D4AF37] mx-auto"></div>
            </div>

            {/* Footer Specifications */}
            <div className="border-t border-[#D4AF37]/30 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 font-mono text-[8px] text-slate-300 uppercase tracking-wider">
                <div>
                  <p className="text-[#D4AF37] font-bold">Paper Specification</p>
                  <p>Archival Cream #FBF9F5 // 120gsm</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-bold">Typography</p>
                  <p>Playfair Display &bull; Lora &bull; Inter</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-[#D4AF37]/20 pt-4 text-[9px] font-mono">
                <span className="text-slate-400">https://boluadeoye.com.ng</span>
                <span className="text-[#D4AF37] font-bold">&copy; 2026 THE WRITER&apos;S CLUB WORLDWIDE</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Header & Footer Components
function JournalHeader({ currentSection, pageNum }) {
  return (
    <header className="flex justify-between items-end border-b-2 border-[#0A2F1D] pb-3 mb-8 relative z-10">
      <div className="flex items-center gap-3">
        <span className="font-playfair font-black text-sm text-[#0A2F1D]">THE WRITER&apos;S CLUB</span>
        <span className="text-slate-300">&bull;</span>
        <span className="font-mono text-[9px] font-bold text-[#C2410C] uppercase tracking-widest">{currentSection}</span>
      </div>
      <span className="font-mono text-xs font-bold text-[#0A2F1D]">{pageNum}</span>
    </header>
  );
}

function JournalFooter() {
  return (
    <footer className="border-t border-slate-200 pt-3 mt-auto flex justify-between items-center font-mono text-[8px] text-slate-400 uppercase tracking-widest relative z-10">
      <span>ISSUE 01 &bull; SPRING 2026</span>
      <div className="flex items-center gap-2">
        <span className="text-[#0A2F1D] font-bold">THE SOVEREIGN VOICE</span>
        <div className="w-1.5 h-1.5 bg-[#C2410C]"></div>
      </div>
    </footer>
  );
}
