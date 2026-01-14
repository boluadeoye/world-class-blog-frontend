"use client";
import { Download, BookOpen, PenTool, GraduationCap, Globe, ShieldCheck, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export default function JPSAProposal() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "JPSA_Digital_Platform_Blueprint";
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
          .page-break { page-break-before: always; margin-top: 2rem; display: block; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50 bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
        <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-2xl text-center font-sans">
          <div className="w-20 h-20 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-amber-500">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">JPSA Architecture</h1>
          <p className="text-slate-500 text-sm mb-8">Journal of Peace Service Academy</p>
          <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg transition-all shadow-xl">
            <Download size={20} /> <span>Download Blueprint PDF</span>
          </button>
          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-600 transition-colors">← Return to Dashboard</Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* === PAGE 1: COVER & EXECUTIVE SUMMARY === */}
        <div className="p-[20mm] min-h-[297mm] relative flex flex-col">
          
          {/* Header */}
          <div className="text-center border-b-4 border-double border-slate-900 pb-8 mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-slate-900 rounded-full mb-4">
              <span className="font-black text-2xl">JP</span>
            </div>
            <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">Project Blueprint</h1>
            <p className="text-sm font-sans font-bold text-amber-600 uppercase tracking-[0.3em]">Journal of Peace Service Academy</p>
          </div>

          {/* 1. Executive Summary */}
          <section className="mb-10">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-2 mb-4 flex items-center gap-2">
              <span className="text-amber-600">01.</span> Executive Summary
            </h2>
            <p className="text-sm leading-relaxed text-justify mb-4 font-sans text-slate-700">
              The <strong>Journal of Peace Service Academy (JPSA)</strong> requires a hybrid digital platform that seamlessly integrates <strong>Academic Training</strong> with <strong>Scholarly Publishing</strong>. 
            </p>
            <p className="text-sm leading-relaxed text-justify font-sans text-slate-700">
              Drawing inspiration from institutional benchmarks (e.g., FUOYE), this architecture prioritizes <strong>Institutional Integrity</strong>, <strong>Ease of Access</strong>, and <strong>Cost-Efficiency</strong>. The platform will serve as both a recruitment funnel for the Academy's "Creative Thinking & Innovation" programs and a repository for academic research.
            </p>
          </section>

          {/* 2. Visual Identity Strategy */}
          <section className="mb-10">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-2 mb-4 flex items-center gap-2">
              <span className="text-amber-600">02.</span> Visual Identity Strategy
            </h2>
            <div className="bg-slate-50 p-6 border border-slate-200">
              <p className="text-sm font-sans font-bold mb-4">Theme: "The Prestige Academic"</p>
              <ul className="grid grid-cols-2 gap-4 text-xs font-sans text-slate-700">
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-slate-900 shrink-0"></div>
                  <span><strong>Primary:</strong> Oxford Blue (Authority)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-amber-500 shrink-0"></div>
                  <span><strong>Accent:</strong> Gold/Beige (Excellence)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-serif font-bold text-lg leading-none">Aa</span>
                  <span><strong>Headings:</strong> Serif (Tradition)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-sans font-bold text-lg leading-none">Aa</span>
                  <span><strong>Body:</strong> Sans-Serif (Modernity)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Site Architecture (The Hybrid Model) */}
          <section className="flex-1">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-2 mb-6 flex items-center gap-2">
              <span className="text-amber-600">03.</span> Platform Structure
            </h2>
            
            <div className="grid grid-cols-2 gap-8">
              {/* ACADEMY WING */}
              <div className="border-t-4 border-slate-900 pt-4">
                <h3 className="font-bold text-sm uppercase mb-3 flex items-center gap-2">
                  <GraduationCap size={16} /> The Academy Wing
                </h3>
                <ul className="text-xs font-sans space-y-2 text-slate-700 list-disc pl-4">
                  <li><strong>Home/Landing:</strong> Dean's Welcome, Vision & Mission.</li>
                  <li><strong>Programmes:</strong> "Creative Thinking & Innovation" Course Details.</li>
                  <li><strong>Admissions:</strong> Requirements & Application Guide.</li>
                  <li><strong>Leadership:</strong> Profiles of the Governing Council.</li>
                </ul>
              </div>

              {/* JOURNAL WING */}
              <div className="border-t-4 border-amber-500 pt-4">
                <h3 className="font-bold text-sm uppercase mb-3 flex items-center gap-2">
                  <PenTool size={16} /> The Journal Wing
                </h3>
                <ul className="text-xs font-sans space-y-2 text-slate-700 list-disc pl-4">
                  <li><strong>Current Issue:</strong> Featured Articles & Abstracts.</li>
                  <li><strong>Archives:</strong> Searchable database of past volumes.</li>
                  <li><strong>Editorial Board:</strong> List of Editors & Reviewers.</li>
                  <li><strong>Call for Papers:</strong> Submission guidelines & deadlines.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-right text-xs font-sans text-slate-400 mt-auto">Page 1/2</div>
        </div>

        <div className="page-break"></div>

        {/* === PAGE 2: TECHNICAL & LAYOUT === */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 4. The "UNISCO" Layout Wireframe */}
          <section className="mb-12">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-2 mb-6 flex items-center gap-2">
              <span className="text-amber-600">04.</span> Proposed Layout (Wireframe)
            </h2>
            
            {/* VISUAL WIREFRAME */}
            <div className="border-2 border-slate-200 p-4 bg-slate-50">
              {/* Nav */}
              <div className="flex justify-between items-center mb-4 border-b border-slate-300 pb-2">
                <div className="text-[8px] font-sans uppercase tracking-widest">About • Admissions</div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center font-serif font-bold text-xs bg-white">LOGO</div>
                <div className="text-[8px] font-sans uppercase tracking-widest">Journal • Contact</div>
              </div>
              
              {/* Hero */}
              <div className="h-32 bg-slate-800 flex flex-col items-center justify-center text-white mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center">
                  <p className="font-serif text-lg font-bold mb-1">Creative Thinking & Innovation</p>
                  <p className="font-sans text-[8px] max-w-xs mx-auto opacity-80">Empowering the next generation of peace-builders through academic excellence.</p>
                  <div className="mt-3 flex gap-2 justify-center">
                    <span className="px-3 py-1 bg-amber-500 text-black text-[8px] font-bold uppercase">View Programs</span>
                    <span className="px-3 py-1 border border-white text-white text-[8px] font-bold uppercase">Read Journal</span>
                  </div>
                </div>
              </div>

              {/* Welcome */}
              <div className="text-center py-4">
                <p className="font-serif font-bold text-sm mb-1">Welcome from the Director</p>
                <div className="w-8 h-0.5 bg-amber-500 mx-auto mb-2"></div>
                <p className="font-sans text-[8px] text-slate-600 max-w-md mx-auto">"JPSA is committed to fostering a culture of peace..."</p>
                <p className="font-script text-xs mt-2 text-slate-500">Signature</p>
              </div>
            </div>
            <p className="text-xs font-sans text-slate-500 mt-2 italic text-center">*Based on the reference theme provided.*</p>
          </section>

          {/* 5. Technical Specifications (Low Budget Optimization) */}
          <section className="mb-12">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 pb-2 mb-6 flex items-center gap-2">
              <span className="text-amber-600">05.</span> Technical Specifications
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><Globe size={14}/> Hosting & Infrastructure</h3>
                <p className="text-xs font-sans text-slate-600 leading-relaxed">
                  <strong>Zero-Cost Architecture:</strong> The site will be built as a Static Web Application (Next.js) hosted on Vercel. This ensures <strong>$0 monthly hosting fees</strong> while maintaining enterprise-grade speed and security.
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><LayoutTemplate size={14}/> Content Management</h3>
                <p className="text-xs font-sans text-slate-600 leading-relaxed">
                  <strong>JSON-Based CMS:</strong> To avoid database costs, journal articles and courses will be managed via structured data files. This allows for easy updates without complex backend maintenance.
                </p>
              </div>
            </div>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-auto pt-8 border-t-4 border-slate-900 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Prepared By</p>
              <div className="font-serif italic text-3xl text-slate-900 mb-1" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <p className="text-xs font-bold text-slate-900 uppercase">Lead Developer</p>
              <p className="text-[10px] text-slate-500">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-slate-900 text-white flex items-center justify-center font-serif font-bold text-xl border-2 border-amber-500">
                BA
              </div>
            </div>
          </footer>
          
          <div className="text-right text-xs font-sans text-slate-400 mt-2">Page 2/2</div>

        </div>

      </div>
    </div>
  );
}
