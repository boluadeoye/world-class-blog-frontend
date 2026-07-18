"use client";
import { useState, useEffect } from "react";
import { Download, Mail, Phone, MapPin, Linkedin, FileText, Award, BookOpen, Globe } from "lucide-react";

export default function OlaoluwaCV() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Olaoluwa_Comfort_Olamide_Executive_CV";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200">
      
      {/* IMPORT LUXURY EDITORIAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />

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
        .font-lora { font-family: 'Lora', serif; }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-none border-t-8 border-[#0F172A]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center p-3 border border-slate-200">
            <FileText size={32} className="text-[#0F172A]" />
          </div>

          <h1 className="font-playfair text-2xl font-black text-[#0F172A] mb-2 uppercase tracking-widest">Olaoluwa Olamide</h1>
          <p className="font-inter text-[#D4AF37] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Editorial CV Engine</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-6 border-l-2 border-[#0F172A] font-mono text-[10px] text-slate-500 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; INJECTING SWISS GRID...</p>
              <p className="opacity-75">&gt; ALIGNING EDITORIAL TYPOGRAPHY...</p>
              <p className="text-[#0F172A] font-bold animate-pulse">&gt; ASSET_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Extract Executive CV
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE EDITORIAL CV (Print Only) === */}
      <div id="cv-render" className="hidden print:block">
        <div className="w-[210mm] h-[297mm] flex bg-white box-border relative overflow-hidden">
          
          {/* WATERMARK (Dry Stamp) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none z-0">
            <h1 className="font-playfair text-[200px] font-black tracking-tighter">OCO</h1>
          </div>

          {/* ========================================== */}
          {/* LEFT COLUMN: THE ANCHOR (Navy Sidebar)     */}
          {/* ========================================== */}
          <aside className="w-[32%] bg-[#0F172A] text-white p-[12mm] flex flex-col relative z-10">
            
            {/* CONTACT INFO */}
            <div className="mb-10">
              <div className="w-8 h-1 bg-[#D4AF37] mb-6"></div>
              <div className="space-y-4 font-inter text-[9px] tracking-wider text-slate-300">
                <p className="flex items-center gap-3"><MapPin size={12} className="text-[#D4AF37]"/> Lagos, Nigeria</p>
                <p className="flex items-center gap-3"><Phone size={12} className="text-[#D4AF37]"/> +234 904 770 7190</p>
                <p className="flex items-center gap-3"><Mail size={12} className="text-[#D4AF37]"/> amosolamide003@gmail.com</p>
                <p className="flex items-center gap-3"><Linkedin size={12} className="text-[#D4AF37]"/> in/olaoluwa-olamide</p>
              </div>
            </div>

            {/* CORE COMPETENCIES */}
            <div className="mb-10">
              <h2 className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 border-b border-slate-700 pb-2">
                Core Competencies
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase mb-1">Brand Strategy</p>
                  <p className="font-lora text-[10px] text-slate-300 leading-snug">Campaign Architecture, Content Strategy, Strategic Partnerships, Social Media Management</p>
                </div>
                <div>
                  <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase mb-1">Content & Copy</p>
                  <p className="font-lora text-[10px] text-slate-300 leading-snug">Creative Scriptwriting, Copywriting, Content Calendars, Narrative Development</p>
                </div>
                <div>
                  <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase mb-1">Media & Presentation</p>
                  <p className="font-lora text-[10px] text-slate-300 leading-snug">Public Speaking, Voice-Over Artistry, Audio Narration, Webinar Hosting, Moderating</p>
                </div>
                <div>
                  <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase mb-1">Platform Ecosystems</p>
                  <p className="font-lora text-[10px] text-slate-300 leading-snug">X (Twitter), LinkedIn, Quora, Discord, Slack, Community Engagement</p>
                </div>
              </div>
            </div>

            {/* EDUCATION */}
            <div className="mb-10">
              <h2 className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 border-b border-slate-700 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase mb-1">Federal University Oye Ekiti</p>
                  <p className="font-lora text-[10px] text-slate-300 leading-snug">B.Sc. Radiography and Radiation Science (In View)</p>
                </div>
                <div>
                  <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase mb-1">Femson Immaculate School</p>
                  <p className="font-lora text-[10px] text-slate-300 leading-snug">Senior Secondary School Certificate (2020)</p>
                </div>
              </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="mb-10">
              <h2 className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 border-b border-slate-700 pb-2">
                Certifications
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Award size={12} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-inter text-[9px] font-bold text-white">Certified Public Speaker</p>
                    <p className="font-lora text-[9px] text-slate-400">JCIN | Mar 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award size={12} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-inter text-[9px] font-bold text-white">Certified Social Media Marketer</p>
                    <p className="font-lora text-[9px] text-slate-400">HP LIFE | Jun 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LANGUAGES & INTERESTS */}
            <div className="mt-auto">
              <h2 className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-white mb-3 border-b border-slate-700 pb-2">
                Profile
              </h2>
              <p className="font-inter text-[9px] text-slate-300 mb-2"><span className="text-[#D4AF37] font-bold">Languages:</span> English (Fluent), Yoruba</p>
              <p className="font-inter text-[9px] text-slate-300"><span className="text-[#D4AF37] font-bold">Interests:</span> Tech Trends, Podcasting, Debate</p>
            </div>

          </aside>

          {/* ========================================== */}
          {/* RIGHT COLUMN: THE NARRATIVE (White Main)   */}
          {/* ========================================== */}
          <main className="w-[68%] p-[15mm] flex flex-col relative z-10">
            
            {/* HEADER */}
            <header className="mb-10">
              <h1 className="font-playfair text-5xl font-black text-[#0F172A] uppercase tracking-tighter leading-[0.9] mb-4">
                Olaoluwa<br/>Comfort<br/>Olamide
              </h1>
              <p className="font-inter text-xs font-black text-[#D4AF37] uppercase tracking-[0.3em]">
                Lead Marketer & Content Strategist
              </p>
            </header>

            {/* EXECUTIVE SUMMARY */}
            <section className="mb-10">
              <h2 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#D4AF37]"></div> Executive Summary
              </h2>
              <p className="font-lora text-[11px] leading-[1.9] text-slate-700 text-justify">
                Dynamic, HP LIFE Certified Lead Marketer, Content Strategist, and Certified Public Speaker with proven expertise in driving brand growth within the tech-education sector. Skilled in building cross-platform multi-channel campaigns, crafting high-impact copy, and delivering professional voice-over audio. Adept at cross-functional leadership, community engagement, and anchoring notable industry events to bridge the gap between technical brands and diverse audiences.
              </p>
            </section>

            {/* PROFESSIONAL EXPERIENCE (Vertical Timeline) */}
            <section className="grow">
              <h2 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#D4AF37]"></div> Professional Experience
              </h2>
              
              <div className="relative pl-4 border-l border-slate-200 space-y-8">
                
                {/* Role 1 */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-[#0F172A] rounded-full border-2 border-white"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-inter text-sm font-black text-[#0F172A] uppercase tracking-wide">Lead Marketer</h3>
                      <p className="font-lora text-xs font-bold text-[#D4AF37] italic">Nazli Tech School</p>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded">Feb 2026 – Jul 2026</span>
                  </div>
                  <ul className="space-y-2 font-lora text-[11px] leading-[1.7] text-slate-700">
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Spearheaded comprehensive digital marketing strategies that accelerated brand visibility and boosted student enrollment.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Orchestrated multi-platform content creation and targeted campaigns across LinkedIn, X, Quora, Discord, and Slack.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Formulated high-impact messaging frameworks, content calendars, and creative promotional scripts to establish industry authority.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-[#0F172A] rounded-full border-2 border-white"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-inter text-sm font-black text-[#0F172A] uppercase tracking-wide">Content Strategist <span className="text-[10px] font-normal text-slate-400">(Volunteer)</span></h3>
                      <p className="font-lora text-xs font-bold text-[#D4AF37] italic">Mentor Me In Tech</p>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded">Feb 2026 – Present</span>
                  </div>
                  <ul className="space-y-2 font-lora text-[11px] leading-[1.7] text-slate-700">
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Formulate and execute tailored content initiatives that maximize brand footprint and deepen community engagement.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Author compelling educational narratives across digital channels to guide, inspire, and support technology mentees.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Oversee and direct the content creation team, ensuring all digital outputs align with corporate growth and mentorship metrics.</li>
                  </ul>
                </div>

                {/* Role 3 */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-[#0F172A] rounded-full border-2 border-white"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-inter text-sm font-black text-[#0F172A] uppercase tracking-wide">Public Speaker & Voice Artist</h3>
                      <p className="font-lora text-xs font-bold text-[#D4AF37] italic">Freelance / Contract</p>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded">Aug 2025 – Present</span>
                  </div>
                  <ul className="space-y-2 font-lora text-[11px] leading-[1.7] text-slate-700">
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Feature as a guest speaker and moderator at premier industry events, including Techies Africa and Creative Connect, presenting on technology trends.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Script, edit, and record high-quality audio narration and vocal storytelling pieces for promotional and corporate media.</li>
                    <li className="flex gap-2 items-start"><span className="text-[#D4AF37] font-bold">•</span> Engage large, diverse audiences using advanced public speaking frameworks to deliver memorable and interactive event experiences.</li>
                  </ul>
                </div>

              </div>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
