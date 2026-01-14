"use client";
import { Download, BookOpen, PenTool, GraduationCap, Globe, LayoutTemplate, CheckSquare, Palette } from "lucide-react";
import Link from "next/link";

export default function JPSAProposal() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "JPSA_Architectural_Blueprint_v2";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-serif text-slate-900">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        body > header, body > footer, nav { display: none !important; }
        @media print {
          @page { size: A4; margin: 0mm; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; margin-top: 0; display: block; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50 bg-[#0a0f1c]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
        <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-2xl text-center font-sans">
          <div className="w-20 h-20 mx-auto bg-[#0a0f1c] rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-[#c5a059]">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">JPSA Blueprint</h1>
          <p className="text-slate-500 text-sm mb-8 font-medium">Comprehensive Architecture • v2.0</p>
          <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0a0f1c] hover:bg-slate-800 text-white font-bold py-4 rounded-lg transition-all shadow-xl uppercase tracking-widest text-xs">
            <Download size={18} /> <span>Download PDF</span>
          </button>
          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-600 transition-colors">← Return to Dashboard</Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* === PAGE 1: STRATEGY & VISUALS === */}
        <div className="p-[20mm] min-h-[297mm] relative flex flex-col">
          
          {/* Header */}
          <div className="text-center border-b-[6px] border-double border-slate-900 pb-8 mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 border-4 border-slate-900 rounded-full mb-4">
              <span className="font-black text-3xl font-serif">JP</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-widest mb-2 text-slate-900">Project Blueprint</h1>
            <p className="text-sm font-sans font-bold text-[#c5a059] uppercase tracking-[0.4em]">Journal of Peace Service Academy</p>
          </div>

          {/* 1. Executive Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-b-2 border-slate-900 pb-2 mb-4 flex items-center gap-3">
              <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">01</span> 
              Executive Summary
            </h2>
            <p className="text-sm leading-relaxed text-justify mb-4 font-sans font-bold text-slate-900">
              The <strong>Journal of Peace Service Academy (JPSA)</strong> requires a distinguished digital platform that functions as both an <strong>Academic Institution</strong> and a <strong>Scholarly Repository</strong>.
            </p>
            <p className="text-sm leading-relaxed text-justify font-sans font-medium text-slate-800">
              This blueprint outlines the architecture for a "Static Prestige" platform. It is designed to mirror the authority of federal institutions (e.g., FUOYE) while utilizing a <strong>Zero-Cost Infrastructure</strong> model to ensure sustainability without monthly server fees.
            </p>
          </section>

          {/* 2. Visual Identity (The UNISCO Theme) */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-b-2 border-slate-900 pb-2 mb-4 flex items-center gap-3">
              <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">02</span> 
              Visual Identity Strategy
            </h2>
            <div className="bg-slate-50 p-6 border-l-4 border-[#c5a059]">
              <p className="text-sm font-sans font-bold mb-4 uppercase tracking-wide">Reference Theme: "Classic Academia"</p>
              <p className="text-xs font-sans text-slate-700 mb-4">
                Based on the reference provided, the design will strictly adhere to the following aesthetic codes:
              </p>
              <ul className="grid grid-cols-2 gap-6 text-xs font-sans text-slate-900 font-bold">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#1a202c] border border-black"></div>
                  <span><strong>Primary:</strong> Obsidian / Oxford Blue</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#c5a059] border border-black"></div>
                  <span><strong>Accent:</strong> Antique Gold</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-serif font-black text-xl">Aa</span>
                  <span><strong>Headers:</strong> Playfair Display (Serif)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-sans font-bold text-xl">Aa</span>
                  <span><strong>Body:</strong> Lato / Open Sans</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Detailed Scope of Work */}
          <section className="flex-1">
            <h2 className="text-xl font-black uppercase border-b-2 border-slate-900 pb-2 mb-6 flex items-center gap-3">
              <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">03</span> 
              Detailed Scope of Work
            </h2>
            
            <div className="grid grid-cols-2 gap-8">
              {/* ACADEMY WING */}
              <div className="border-2 border-slate-200 p-4">
                <h3 className="font-black text-sm uppercase mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <GraduationCap size={18} /> The Academy Wing
                </h3>
                <ul className="text-xs font-sans font-bold space-y-3 text-slate-800 list-disc pl-4">
                  <li><strong>Hero Section:</strong> Dark overlay with "Creative Thinking" headline and Gold CTA buttons.</li>
                  <li><strong>Dean's Welcome:</strong> Formal address with digital signature.</li>
                  <li><strong>Course Grid:</strong> 4-Column layout displaying available programs.</li>
                  <li><strong>Admissions Portal:</strong> Static guidelines and downloadable forms.</li>
                  <li><strong>Leadership:</strong> Profiles of the Governing Council.</li>
                </ul>
              </div>

              {/* JOURNAL WING */}
              <div className="border-2 border-slate-200 p-4">
                <h3 className="font-black text-sm uppercase mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <PenTool size={18} /> The Journal Wing
                </h3>
                <ul className="text-xs font-sans font-bold space-y-3 text-slate-800 list-disc pl-4">
                  <li><strong>Current Issue:</strong> Abstract view of latest research.</li>
                  <li><strong>Archives:</strong> Organized list of past volumes (PDF links).</li>
                  <li><strong>Editorial Board:</strong> Hierarchical list of editors.</li>
                  <li><strong>Submission Guide:</strong> "Call for Papers" instructions.</li>
                  <li><strong>Peer Review Policy:</strong> Static informational page.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-right text-xs font-sans font-bold text-slate-400 mt-auto">Page 1/2</div>
        </div>

        <div className="page-break"></div>

        {/* === PAGE 2: TECHNICAL & LAYOUT === */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 4. The "UNISCO" Layout Wireframe */}
          <section className="mb-12">
            <h2 className="text-xl font-black uppercase border-b-2 border-slate-900 pb-2 mb-6 flex items-center gap-3">
              <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">04</span> 
              Layout Wireframe
            </h2>
            
            {/* VISUAL WIREFRAME */}
            <div className="border-4 border-slate-900 p-1 bg-white">
              {/* Nav */}
              <div className="flex justify-between items-center p-4 border-b-2 border-slate-200 bg-white">
                <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-600">About • Admissions</div>
                <div className="w-12 h-12 rounded-full border-4 border-slate-900 flex items-center justify-center font-serif font-black text-sm bg-white z-10 -mb-8">LOGO</div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-600">Journal • Contact</div>
              </div>
              
              {/* Hero */}
              <div className="h-40 bg-slate-800 flex flex-col items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center">
                  <p className="font-serif text-2xl font-bold mb-2 tracking-wide">Creative Thinking & Innovation</p>
                  <p className="font-sans text-[9px] font-medium max-w-xs mx-auto opacity-90 uppercase tracking-widest">Empowering the next generation of peace-builders</p>
                  <div className="mt-4 flex gap-3 justify-center">
                    <span className="px-4 py-1.5 bg-[#c5a059] text-black text-[9px] font-black uppercase tracking-wider">View Programs</span>
                    <span className="px-4 py-1.5 border border-white text-white text-[9px] font-black uppercase tracking-wider">Read Journal</span>
                  </div>
                </div>
              </div>

              {/* Welcome */}
              <div className="text-center py-8 bg-slate-50">
                <p className="font-serif font-black text-lg mb-2 text-slate-900">Welcome from the Director</p>
                <div className="w-12 h-1 bg-[#c5a059] mx-auto mb-4"></div>
                <p className="font-sans text-[10px] font-medium text-slate-600 max-w-md mx-auto leading-relaxed">
                  "JPSA is committed to fostering a culture of peace through rigorous academic inquiry and practical service..."
                </p>
                <p className="font-script text-xl mt-4 text-slate-800" style={{ fontFamily: 'cursive' }}>Prof. A. O. Adeoye</p>
              </div>
            </div>
            <p className="text-xs font-sans font-bold text-slate-500 mt-3 italic text-center">*Wireframe based on the UNISCO reference theme.*</p>
          </section>

          {/* 5. Technical Specifications */}
          <section className="mb-12">
            <h2 className="text-xl font-black uppercase border-b-2 border-slate-900 pb-2 mb-6 flex items-center gap-3">
              <span className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-sm">05</span> 
              Technical Specifications
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 border-l-4 border-slate-900 p-5">
                <h3 className="font-black text-sm mb-2 flex items-center gap-2 uppercase"><Globe size={16}/> Hosting & Infrastructure</h3>
                <p className="text-xs font-sans font-bold text-slate-700 leading-relaxed">
                  <strong>Zero-Cost Architecture:</strong> The site will be built as a Static Web Application (Next.js) hosted on Vercel. This ensures <strong>$0 monthly hosting fees</strong> while maintaining enterprise-grade speed and security.
                </p>
              </div>
              <div className="bg-slate-50 border-l-4 border-[#c5a059] p-5">
                <h3 className="font-black text-sm mb-2 flex items-center gap-2 uppercase"><LayoutTemplate size={16}/> Content Management</h3>
                <p className="text-xs font-sans font-bold text-slate-700 leading-relaxed">
                  <strong>JSON-Based CMS:</strong> To avoid database costs, journal articles and courses will be managed via structured data files. This allows for easy updates without complex backend maintenance.
                </p>
              </div>
            </div>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-auto pt-8 border-t-[6px] border-slate-900 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Prepared By</p>
              <div className="font-serif italic text-4xl text-slate-900 mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <p className="text-sm font-black text-slate-900 uppercase">Lead Technical Architect</p>
              <p className="text-xs font-bold text-slate-500">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-slate-900 text-white flex items-center justify-center font-serif font-black text-3xl border-4 border-[#c5a059]">
                BA
              </div>
            </div>
          </footer>
          
          <div className="text-right text-xs font-sans font-bold text-slate-400 mt-2">Page 2/2</div>

        </div>

      </div>
    </div>
  );
}
