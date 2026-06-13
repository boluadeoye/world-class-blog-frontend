"use client";
import { useState, useEffect } from "react";
import { Download, Mail, Globe, MapPin, Award, BookOpen, FileText } from "lucide-react";
import Link from "next/link";

export default function AIWriterCV() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Bolu_Adeoye_AI_Writer_Resume";
    window.print();
    document.title = originalTitle;
  };

  const photoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781340188/blog_assets/bjvw4405zvvun59tnw7f.jpg";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      
      {/* IMPORT PREMIUM TYPOGRAPHY */}
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #resume-render, #resume-render * { visibility: visible; }
          #resume-render { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FFFFFF;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 20mm 20mm 15mm 20mm;
          }
          .no-print { display: none !important; }
        }
        .font-lora { font-family: 'Lora', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-2xl border-t-8 border-slate-900">
          <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-2 border-slate-200">
            <img src={photoUrl} alt="Bolu Adeoye" className="w-full h-full object-cover" />
          </div>

          <h1 className="font-lora text-2xl font-bold text-slate-900 mb-2">Boluwatife Adeoye</h1>
          <p className="font-inter text-slate-400 text-xs tracking-widest uppercase mb-8">AI Trainer - Writer Resume</p>

          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">ALIGNING SPECIFICATION...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest transition-all">
              <Download size={18} className="inline mr-2" />
              Download Resume (PDF)
            </button>
          )}
          
          <Link href="/" className="block mt-8 text-xs text-slate-500 hover:text-slate-800 uppercase tracking-widest">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE RESUME (Print) === */}
      <div id="resume-render" className="hidden print:block text-slate-800">
        <div className="a4-page">
          
          {/* HEADER SECTION */}
          <header className="flex justify-between items-center border-b-2 border-slate-200 pb-6 mb-8">
            <div className="flex gap-6 items-center">
              {/* Headshot */}
              <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-300 shrink-0">
                <img src={photoUrl} alt="Boluwatife Adeoye" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="font-lora text-4xl font-bold text-slate-900 leading-tight">Boluwatife Adeoye</h1>
                <p className="font-inter text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Professional Writer & Information Architect</p>
              </div>
            </div>
            
            <div className="text-right font-inter text-xs space-y-1 text-slate-600">
              <p className="flex items-center justify-end gap-2"><Mail size={12}/> contact@boluadeoye.com.ng</p>
              <p className="flex items-center justify-end gap-2"><Globe size={12}/> boluadeoye.com.ng</p>
              <p className="flex items-center justify-end gap-2"><MapPin size={12}/> Lagos, Nigeria</p>
            </div>
          </header>

          <main className="grow grid grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: SUMMARY & EXPERIENCE (8 Cols) */}
            <div className="col-span-8 space-y-8">
              
              {/* SUMMARY */}
              <section>
                <h2 className="font-inter text-xs font-black uppercase text-slate-900 tracking-wider mb-3 border-b pb-1">Professional Profile</h2>
                <p className="font-lora text-sm leading-relaxed text-justify text-slate-700">
                  A dedicated writer and document designer specializing in the translation of complex conceptual frameworks into clear, logical, and human-friendly narratives. Committed to rigorous fact-checking and precise communication, I excel at structuring information to teach clarity and logical flow.
                </p>
              </section>

              {/* EXPERIENCE */}
              <section className="space-y-6">
                <h2 className="font-inter text-xs font-black uppercase text-slate-900 tracking-wider mb-4 border-b pb-1">Professional Experience</h2>

                {/* Role 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-inter text-sm font-bold text-slate-900">Technical Writer / Document Lead</h3>
                      <p className="font-inter text-xs text-slate-500 uppercase">Freelance / Project-Based</p>
                    </div>
                    <span className="font-mono text-xs text-slate-400">2024 - PRESENT</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 font-lora text-xs leading-relaxed text-slate-600">
                    <li>Author comprehensive user manuals and structural documentation guides for software and organizational pipelines, ensuring 100% factual accuracy.</li>
                    <li>Deconstruct intricate operational workflows into simple, step-by-step guides requiring zero ambiguity.</li>
                    <li>Adhere strictly to distinct client style guides and editorial standards, maintaining absolute consistency in tone and layout.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-inter text-sm font-bold text-slate-900">Content Developer / Researcher</h3>
                      <p className="font-inter text-xs text-slate-500 uppercase">Educational / Community Initiatives</p>
                    </div>
                    <span className="font-mono text-xs text-slate-400">2022 - 2024</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 font-lora text-xs leading-relaxed text-slate-600">
                    <li>Researched and drafted detailed presentation scripts and instructional slide decks, organizing logical paths to enhance learner comprehension.</li>
                    <li>Conducted rigorous fact-checking and context verification for formal letters, notifications, and administrative reports.</li>
                    <li>Optimized written correspondence to remove stiff jargon, prioritizing natural, fluent, and highly intelligent English communication.</li>
                  </ul>
                </div>

              </section>

            </div>

            {/* RIGHT COLUMN: SKILLS & EDUCATION (4 Cols) */}
            <div className="col-span-4 space-y-8 border-l border-slate-200 pl-6">
              
              {/* COMPETENCIES */}
              <section>
                <h2 className="font-inter text-xs font-black uppercase text-slate-900 tracking-wider mb-4 border-b pb-1">Core Competencies</h2>
                <div className="space-y-4 font-inter text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckIcon />
                    <span>Linguistic Nuance & Clarity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon />
                    <span>Logical Fact-Checking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon />
                    <span>Style-Guide Adherence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon />
                    <span>Instructional Writing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon />
                    <span>Information Architecture</span>
                  </div>
                </div>
              </section>

              {/* ENGLISH PROFICIENCY */}
              <section>
                <h2 className="font-inter text-xs font-black uppercase text-slate-900 tracking-wider mb-3 border-b pb-1">Linguistic Level</h2>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded">
                  <p className="font-inter text-sm font-black text-slate-900">English: C2 Native</p>
                  <p className="font-inter text-[10px] text-slate-500 uppercase mt-1">Excellent written & oral fluency</p>
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <h2 className="font-inter text-xs font-black uppercase text-slate-900 tracking-wider mb-4 border-b pb-1">Education</h2>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <BookOpen size={14} className="text-slate-400 mt-0.5" />
                    <div>
                      <h4 className="font-inter text-xs font-bold text-slate-900">Bachelor's Degree</h4>
                      <p className="font-inter text-[10px] text-slate-500 uppercase">Class of 2024</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>

          </main>

          <footer className="border-t border-slate-100 pt-4 flex justify-between items-center text-[8px] font-inter font-bold uppercase tracking-widest text-slate-400">
            <span>Boluwatife Adeoye // Professional Resume</span>
            <span>https://boluadeoye.com.ng</span>
          </footer>

        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-900">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
