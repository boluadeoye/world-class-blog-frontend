"use client";
import { useState, useEffect } from "react";
import { Download, Mail, Phone, MapPin, Linkedin, FileText } from "lucide-react";

export default function OlaoluwaCV() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Olaoluwa_Comfort_Olamide_CV";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-slate-200">
      
      {/* IMPORT PREMIUM FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #cv-render, #cv-render * { visibility: visible; }
          #cv-render { position: absolute; left: 0; top: 0; width: 210mm; height: 297mm; background: #FFFFFF; }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-2xl border-t-8 border-slate-900">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center p-3 border border-slate-200">
            <FileText size={32} className="text-slate-900" />
          </div>

          <h1 className="font-playfair text-2xl font-black text-slate-900 mb-2 uppercase tracking-widest">Olaoluwa Olamide</h1>
          <p className="font-inter text-slate-500 text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Executive CV Engine</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-6 border-l-2 border-slate-900 font-mono text-[10px] text-slate-500 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; COMPILING TYPOGRAPHY...</p>
              <p className="opacity-75">&gt; ALIGNING VERTICAL RHYTHM...</p>
              <p className="text-slate-900 font-bold animate-pulse">&gt; CV_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Download PDF
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE CV (Print Only) === */}
      <div id="cv-render" className="hidden print:block text-slate-900">
        <div className="w-[210mm] h-[297mm] p-[20mm] flex flex-col bg-white box-border">
          
          {/* HEADER */}
          <header className="text-center mb-8">
            <h1 className="font-playfair text-4xl font-black text-[#0F172A] uppercase tracking-tight mb-3">
              Olaoluwa Comfort Olamide
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 font-inter text-[10px] font-medium text-[#334155]">
              <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400"/> Lagos, Nigeria</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><Phone size={12} className="text-slate-400"/> +234 904 770 7190</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><Mail size={12} className="text-slate-400"/> amosolamide003@gmail.com</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><Linkedin size={12} className="text-slate-400"/> linkedin.com/in/olaoluwa-olamide</span>
            </div>
          </header>

          {/* PROFESSIONAL SUMMARY */}
          <section className="mb-6">
            <h2 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-slate-200 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="font-inter text-xs leading-[1.8] text-[#334155] text-justify">
              Dynamic, HP LIFE Certified Lead Marketer, Content Strategist, and Certified Public Speaker with proven expertise in driving brand growth within the tech-education sector. Skilled in building cross-platform multi-channel campaigns, crafting high-impact copy, and delivering professional voice-over audio. Adept at cross-functional leadership, community engagement, and anchoring notable industry events to bridge the gap between technical brands and diverse audiences.
            </p>
          </section>

          {/* CORE COMPETENCIES */}
          <section className="mb-6">
            <h2 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-slate-200 pb-1 mb-3">
              Core Competencies & Skills
            </h2>
            <div className="grid grid-cols-1 gap-2 font-inter text-xs text-[#334155]">
              <p><span className="font-bold text-[#0F172A]">Brand Strategy & Digital Marketing:</span> Campaign Architecture, Content Strategy, Strategic Partnerships, Social Media Management</p>
              <p><span className="font-bold text-[#0F172A]">Content & Copywriting:</span> Creative Scriptwriting, Copywriting, Content Calendars, Narrative Development</p>
              <p><span className="font-bold text-[#0F172A]">Media & Presentation:</span> Public Speaking, Voice-Over Artistry, Audio Narration, Webinar Hosting, Moderating</p>
              <p><span className="font-bold text-[#0F172A]">Platform Ecosystems:</span> X (Twitter), LinkedIn, Quora, Discord, Slack, Community Engagement Spaces</p>
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="mb-6">
            <h2 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-slate-200 pb-1 mb-4">
              Professional Experience
            </h2>
            
            <div className="space-y-5">
              {/* Job 1 */}
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <div>
                    <h3 className="font-inter text-sm font-bold text-[#0F172A]">Lead Marketer</h3>
                    <p className="font-inter text-xs font-medium text-[#334155]">Nazli Tech School</p>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase">Feb 2026 – Jul 2026</span>
                </div>
                <ul className="list-disc pl-4 space-y-1.5 font-inter text-xs leading-relaxed text-[#334155]">
                  <li>Spearheaded comprehensive digital marketing strategies that accelerated brand visibility and boosted student enrollment.</li>
                  <li>Orchestrated multi-platform content creation and targeted campaigns across LinkedIn, X, Quora, Discord, and Slack.</li>
                  <li>Formulated high-impact messaging frameworks, content calendars, and creative promotional scripts to establish industry authority.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <div>
                    <h3 className="font-inter text-sm font-bold text-[#0F172A]">Content Strategist (Volunteer)</h3>
                    <p className="font-inter text-xs font-medium text-[#334155]">Mentor Me In Tech</p>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase">Feb 2026 – Present</span>
                </div>
                <ul className="list-disc pl-4 space-y-1.5 font-inter text-xs leading-relaxed text-[#334155]">
                  <li>Formulate and execute tailored content initiatives that maximize brand footprint and deepen community engagement.</li>
                  <li>Author compelling educational narratives across digital channels to guide, inspire, and support technology mentees.</li>
                  <li>Oversee and direct the content creation team, ensuring all digital outputs align with corporate growth and mentorship metrics.</li>
                </ul>
              </div>

              {/* Job 3 */}
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <div>
                    <h3 className="font-inter text-sm font-bold text-[#0F172A]">Public Speaker & Voice-Over Artist</h3>
                    <p className="font-inter text-xs font-medium text-[#334155]">Freelance / Contract</p>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase">Aug 2025 – Present</span>
                </div>
                <ul className="list-disc pl-4 space-y-1.5 font-inter text-xs leading-relaxed text-[#334155]">
                  <li>Feature as a guest speaker and moderator at premier industry events, including Techies Africa and Creative Connect, presenting on technology trends and digital acceleration.</li>
                  <li>Script, edit, and record high-quality audio narration and vocal storytelling pieces for promotional and corporate media.</li>
                  <li>Engage large, diverse audiences using advanced public speaking frameworks to deliver memorable and interactive event experiences.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* EDUCATION & CERTIFICATIONS (2 Columns) */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <section>
              <h2 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-slate-200 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-inter text-xs font-bold text-[#0F172A]">Federal University Oye Ekiti</h3>
                  <p className="font-inter text-[10px] text-[#334155] mt-0.5">B.Sc. Radiography and Radiation Science | In View</p>
                </div>
                <div>
                  <h3 className="font-inter text-xs font-bold text-[#0F172A]">Femson Immaculate School</h3>
                  <p className="font-inter text-[10px] text-[#334155] mt-0.5">Senior Secondary School Certificate (SSCE) | 2020</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-slate-200 pb-1 mb-3">
                Certifications
              </h2>
              <ul className="list-disc pl-4 space-y-2 font-inter text-xs text-[#334155]">
                <li><span className="font-bold text-[#0F172A]">Certified Public Speaker</span><br/>Junior Chamber International Nigeria | Mar 2026</li>
                <li><span className="font-bold text-[#0F172A]">Certified Social Media Marketer</span><br/>HP LIFE | Jun 2026</li>
              </ul>
            </section>
          </div>

          {/* LANGUAGES & INTERESTS */}
          <section className="mt-auto">
            <h2 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] border-b-2 border-slate-200 pb-1 mb-3">
              Languages & Interests
            </h2>
            <div className="flex justify-between font-inter text-xs text-[#334155]">
              <p><span className="font-bold text-[#0F172A]">Languages:</span> English (Fluent), Yoruba (Native/Conversational)</p>
              <p><span className="font-bold text-[#0F172A]">Interests:</span> Tech Trend Research, Podcasting, Competitive Debate, Travel</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
