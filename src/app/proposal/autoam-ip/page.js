"use client";
import { useState, useEffect } from "react";
import { 
  Download, CheckCircle, Code, Database, Cpu, 
  Globe, ShieldCheck, FileSignature, Stamp, ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AutoamIPAssignment() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "AUTOAM_IP_ASSIGNMENT_FINAL";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-[#0a1128] font-sans text-slate-900 selection:bg-[#D97B0C] selection:text-white">
      
      {/* === NUCLEAR CSS RESET & UTILITIES === */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700;900&display=swap');
        
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: 'Geist', sans-serif; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          
          /* THE BLANK PAGE FIX */
          .page { 
            width: 210mm; 
            height: 297mm; 
            overflow: hidden; 
            page-break-after: always; 
            position: relative; 
            background: white; 
            box-sizing: border-box;
          }
          .page:last-of-type { page-break-after: auto; }
          
          /* Paper Texture Simulation */
          .paper-texture {
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          }
        }
      `}</style>

      {/* === VIEW 1: THE OBSIDIAN PORTAL (Screen) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1A2C4E] via-[#0a1128] to-[#0a1128]"></div>
        
        <div className="relative z-10 w-full max-w-md bg-[#1A2C4E] border border-[#2a3c5e] p-10 text-center shadow-2xl">
          <div className="w-20 h-20 mx-auto bg-[#0a1128] flex items-center justify-center mb-6 border border-[#D97B0C] shadow-[0_0_30px_-5px_rgba(217,123,12,0.3)]">
            <FileSignature size={32} className="text-[#D97B0C]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight uppercase">IP Assignment</h1>
          <p className="text-slate-400 text-xs font-mono uppercase tracking-[0.2em] mb-8">Autoam Web Platform</p>

          {!isReady ? (
            <div className="text-[#D97B0C] font-mono text-xs animate-pulse">Generating Legal Assets...</div>
          ) : (
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 bg-[#D97B0C] hover:bg-[#b8670a] text-white font-bold py-4 transition-all uppercase tracking-widest text-xs"
            >
              <Download size={18} />
              <span>Execute Document</span>
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE LEGAL DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block font-sans text-[#1A2C4E]">
        
        {/* ================= PAGE 1: COVER & DECLARATION ================= */}
        <div className="page paper-texture p-[20mm] flex flex-col border-[12px] border-[#1A2C4E]">
          
          {/* Header: Autoam Logo */}
          <header className="flex justify-between items-start mb-24">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1A2C4E] flex items-center justify-center text-white font-black text-2xl tracking-tighter">
                A<span className="text-[#D97B0C]">.</span>
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Autoam</h2>
                <p className="text-[8px] font-bold tracking-[0.3em] text-slate-500 uppercase">Limited</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Document Ref: IP-2026-001</p>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Date: May 2026</p>
            </div>
          </header>

          {/* Main Title */}
          <div className="mb-20">
            <p className="text-sm font-bold text-[#D97B0C] uppercase tracking-[0.3em] mb-4">Final Execution</p>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] text-[#1A2C4E] mb-6">
              Intellectual<br/>Property<br/>Assignment
            </h1>
            <div className="h-1 w-24 bg-[#D97B0C]"></div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-2 border-b-[0.5px] border-slate-300 pb-1">Prepared By (Assignor)</p>
              <p className="text-lg font-black uppercase text-[#1A2C4E]">Bolu Adeoye</p>
              <p className="text-xs font-bold text-[#D97B0C] uppercase">Lead Systems Architect</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-2 border-b-[0.5px] border-slate-300 pb-1">Prepared For (Assignee)</p>
              <p className="text-lg font-black uppercase text-[#1A2C4E]">Favour Nheachika Amusonu</p>
              <p className="text-xs font-bold text-[#D97B0C] uppercase">CEO, Autoam Limited</p>
            </div>
          </div>

          {/* Statement */}
          <div className="mt-auto bg-slate-50 p-8 border-l-4 border-[#D97B0C]">
            <p className="text-sm leading-relaxed font-medium text-[#1A2C4E] text-justify">
              This document confirms the full and final settlement of <strong className="text-lg">₦220,000</strong> for the acquisition of the Autoam proprietary codebase and infrastructure. Upon execution, all intellectual property rights, source code, and administrative controls are irrevocably transferred to the Assignee.
            </p>
          </div>
        </div>

        {/* ================= PAGE 2: ASSET TRANSFER MANIFEST ================= */}
        <div className="page paper-texture p-[20mm] flex flex-col">
          
          <header className="border-b-2 border-[#1A2C4E] pb-4 mb-10 flex justify-between items-end">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Asset Transfer Manifest</h2>
            <span className="text-[10px] font-mono font-bold text-slate-400">Page 2 of 3</span>
          </header>

          {/* Table: Technical Assets Handover */}
          <h3 className="text-sm font-bold text-[#D97B0C] uppercase tracking-widest mb-4">1.0 Technical Assets Handover</h3>
          <div className="border-[0.5px] border-[#1A2C4E] mb-12">
            
            <div className="flex items-center border-b-[0.5px] border-[#1A2C4E] p-4 bg-slate-50">
              <div className="w-10 text-[#1A2C4E]"><Code size={20}/></div>
              <div className="grow">
                <p className="text-xs font-black uppercase">Source Code</p>
                <p className="text-[10px] font-mono text-slate-600">GitHub Repository: autoam-web (Private)</p>
              </div>
              <div className="text-[#D97B0C]"><CheckCircle size={16}/></div>
            </div>

            <div className="flex items-center border-b-[0.5px] border-[#1A2C4E] p-4">
              <div className="w-10 text-[#1A2C4E]"><Database size={20}/></div>
              <div className="grow">
                <p className="text-xs font-black uppercase">Database Infrastructure</p>
                <p className="text-[10px] font-mono text-slate-600">Supabase PostgreSQL Instance (Autoam-Production)</p>
              </div>
              <div className="text-[#D97B0C]"><CheckCircle size={16}/></div>
            </div>

            <div className="flex items-center border-b-[0.5px] border-[#1A2C4E] p-4 bg-slate-50">
              <div className="w-10 text-[#1A2C4E]"><Cpu size={20}/></div>
              <div className="grow">
                <p className="text-xs font-black uppercase">Artificial Intelligence</p>
                <p className="text-[10px] font-mono text-slate-600">Groq AI API Integration (Llama 3.3 70B)</p>
              </div>
              <div className="text-[#D97B0C]"><CheckCircle size={16}/></div>
            </div>

            <div className="flex items-center p-4">
              <div className="w-10 text-[#1A2C4E]"><Globe size={20}/></div>
              <div className="grow">
                <p className="text-xs font-black uppercase">Deployment Environment</p>
                <p className="text-[10px] font-mono text-slate-600">Vercel Edge Infrastructure</p>
              </div>
              <div className="text-[#D97B0C]"><CheckCircle size={16}/></div>
            </div>
          </div>

          {/* Section: Administrative Rights Transfer */}
          <h3 className="text-sm font-bold text-[#D97B0C] uppercase tracking-widest mb-4">2.0 Administrative Rights Transfer</h3>
          <div className="bg-[#1A2C4E] text-white p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Current State</p>
                <p className="text-sm font-black uppercase">Developer Access</p>
              </div>
              <ArrowRight className="text-[#D97B0C]" size={24}/>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Final State</p>
                <p className="text-sm font-black uppercase text-[#D97B0C]">Full Admin Ownership</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed font-medium text-slate-300 text-justify">
              The Assignor confirms the complete revocation of personal administrative privileges across all platforms listed in Section 1.0. The Assignee now holds exclusive root access, billing control, and repository ownership.
            </p>
          </div>

        </div>

        {/* ================= PAGE 3: SIGNATURES & SEAL ================= */}
        <div className="page paper-texture p-[20mm] flex flex-col relative">
          
          <header className="border-b-2 border-[#1A2C4E] pb-4 mb-16 flex justify-between items-end">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Execution & Signatures</h2>
            <span className="text-[10px] font-mono font-bold text-slate-400">Page 3 of 3</span>
          </header>

          <p className="text-sm leading-relaxed font-medium text-[#1A2C4E] mb-16">
            IN WITNESS WHEREOF, the parties have executed this Intellectual Property Assignment Agreement as of the date first written above.
          </p>

          {/* Signatures */}
          <div className="space-y-20">
            
            {/* Signatory A */}
            <div>
              <div className="w-64 border-b-[0.5px] border-[#1A2C4E] h-12 mb-2"></div>
              <p className="text-sm font-black uppercase text-[#1A2C4E]">Bolu Adeoye</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Assignor (Lead Systems Architect)</p>
              <p className="text-[10px] font-mono text-slate-400 mt-1">Date: ___________________</p>
            </div>

            {/* Signatory B */}
            <div>
              <div className="w-64 border-b-[0.5px] border-[#1A2C4E] h-12 mb-2"></div>
              <p className="text-sm font-black uppercase text-[#1A2C4E]">Favour Nheachika Amusonu</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Assignee (CEO, Autoam Limited)</p>
              <p className="text-[10px] font-mono text-slate-400 mt-1">Date: ___________________</p>
            </div>

          </div>

          {/* THE ARCHITECT's SEAL (CSS Generated) */}
          <div className="absolute bottom-[40mm] right-[30mm] transform -rotate-12 opacity-80">
            <div className="w-48 h-48 rounded-full border-4 border-[#D97B0C] flex flex-col items-center justify-center p-2 relative">
              {/* Inner Ring */}
              <div className="absolute inset-2 rounded-full border-[0.5px] border-[#D97B0C] border-dashed"></div>
              
              <Stamp size={32} className="text-[#D97B0C] mb-2" />
              <p className="text-2xl font-black text-[#D97B0C] tracking-widest uppercase">Approved</p>
              <p className="text-[7px] font-bold text-[#D97B0C] uppercase tracking-widest mt-2 text-center">
                Bolu Adeoye<br/>Lead Architect<br/>2026
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
