"use client";
import { useState, useEffect } from "react";
import { Download, Mail, Phone, Github, MapPin, Globe, ExternalLink } from "lucide-react";

export default function UwanaCV() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Boluwatife_Adeoye_Frontend_Engineer_Uwana";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-stone-900 font-sans text-slate-900 selection:bg-slate-200">
      
      {/* === NUCLEAR CSS RESET & UTILITIES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container { position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden; }
          .no-print { display: none !important; }
          a { text-decoration: none; color: inherit; }
        }
      `}</style>

      {/* === VIEW 1: THE OBSIDIAN PORTAL (Screen) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-stone-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-stone-950 border border-stone-800 p-10 text-center shadow-2xl">
          <img 
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg" 
            alt="Boluwatife Adeoye" 
            className="w-24 h-24 mx-auto object-cover rounded-full grayscale border-2 border-stone-700 mb-6"
          />
          <h1 className="text-3xl font-serif text-white mb-2 tracking-tight">Boluwatife Adeoye</h1>
          <p className="text-stone-400 text-xs font-mono uppercase tracking-[0.2em] mb-8">Frontend Engineer</p>

          {!isReady ? (
            <div className="text-stone-500 font-mono text-xs animate-pulse">Compiling Executive Dossier...</div>
          ) : (
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-200 text-stone-950 font-bold py-4 transition-all"
            >
              <Download size={18} />
              <span className="uppercase tracking-widest text-xs">Download Premium CV</span>
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE LUXURY DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block font-sans text-slate-900">
        
        {/* FIX: Changed h-[297mm] to h-[295mm] and added overflow-hidden to kill the blank page */}
        <div className="h-[295mm] p-[20mm] relative flex flex-col overflow-hidden">
          
          {/* HEADER: EDITORIAL LUXURY */}
          <header className="flex items-center justify-between border-b-2 border-slate-900 pb-8 mb-8">
            <div className="flex items-center gap-6">
              <img 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg" 
                alt="Boluwatife Adeoye" 
                className="w-28 h-28 object-cover grayscale border border-slate-300 p-1"
              />
              <div>
                <h1 className="text-5xl font-serif font-black text-slate-900 tracking-tighter mb-2 uppercase">
                  Adeoye<br/>Boluwatife
                </h1>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">Frontend Engineer</p>
              </div>
            </div>

            <div className="text-right space-y-1.5 text-[10px] font-medium text-slate-600">
              <div className="flex items-center justify-end gap-2">
                <MapPin size={12} className="text-slate-400"/> Oye Ekiti, Ekiti State
              </div>
              <a href="mailto:contact@boluadeoye.com.ng" className="flex items-center justify-end gap-2 hover:text-slate-900">
                <Mail size={12} className="text-slate-400"/> contact@boluadeoye.com.ng
              </a>
              <a href="tel:08106293674" className="flex items-center justify-end gap-2 hover:text-slate-900">
                <Phone size={12} className="text-slate-400"/> 0810 629 3674
              </a>
              <a href="https://github.com/boluadeoye" target="_blank" className="flex items-center justify-end gap-2 hover:text-slate-900">
                <Github size={12} className="text-slate-400"/> github.com/boluadeoye
              </a>
              <a href="https://boluadeoye.com.ng" target="_blank" className="flex items-center justify-end gap-2 font-bold text-slate-900">
                <Globe size={12} className="text-slate-400"/> boluadeoye.com.ng
              </a>
            </div>
          </header>

          {/* CAREER SUMMARY */}
          <section className="mb-8">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3 border-l-4 border-slate-900 pl-3">Career Summary</h2>
            <p className="text-xs leading-relaxed text-justify text-slate-700 font-medium">
              Frontend Engineer specializing in high-performance <strong>React, Next.js, and TypeScript</strong> architectures. Proven expertise in collaborating closely with UI/UX teams to translate complex design mockups into pixel-perfect, scalable interfaces. Strong focus on clean code, performance optimization, and delivering seamless user experiences across both <strong>public-facing pages and authenticated dashboards</strong>.
            </p>
          </section>

          {/* EXPERIENCE */}
          <section className="mb-8">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">Professional Experience</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Frontend Developer</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stay Media</p>
                </div>
                <div className="text-[10px] font-bold text-slate-900 bg-slate-100 px-2 py-1">2024 – 2025 (Remote)</div>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside marker:text-slate-400">
                <li>Engineered responsive, high-fidelity web applications using <strong>React and Next.js</strong>, improving user experience across all devices.</li>
                <li>Collaborated directly with UI/UX designers to implement high-quality, pixel-perfect interfaces for public-facing platforms.</li>
                <li>Improved page load performance through rigorous code optimization and efficient component structuring.</li>
                <li>Integrated RESTful APIs and managed complex state for dynamic data rendering in real-time authenticated environments.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Software Developer</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    Autoam 
                    <a href="https://autoam-web.vercel.app/" target="_blank" className="text-blue-600 flex items-center gap-0.5 hover:underline">
                      <ExternalLink size={10}/> Live Link
                    </a>
                  </p>
                </div>
                <div className="text-[10px] font-bold text-slate-900 bg-slate-100 px-2 py-1">2023 – 2024 (Remote)</div>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside marker:text-slate-400">
                <li>Architected and deployed the frontend infrastructure for a live production web platform using modern React tools.</li>
                <li>Built highly reusable, scalable component libraries, significantly improving development speed and UI consistency.</li>
                <li>Implemented strict responsive design principles, ensuring seamless performance on mobile and desktop interfaces.</li>
                <li>Collaborated on debugging, state management, and improving overall application stability and usability.</li>
              </ul>
            </div>
          </section>

          {/* SKILLS & EDUCATION GRID */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">Technical Arsenal</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Core Stack</p>
                  <p className="text-xs font-medium text-slate-900">React.js, Next.js, TypeScript, JavaScript (ES6+)</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Styling & UI</p>
                  <p className="text-xs font-medium text-slate-900">Tailwind CSS, CSS3, Responsive Design</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Architecture & Tools</p>
                  <p className="text-xs font-medium text-slate-900">Component Architecture, State Management, API Integration, Git, GitHub, Vercel</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 border-l-4 border-slate-900 pl-3">Education & Competencies</h2>
              <div className="mb-4">
                <h3 className="text-xs font-black text-slate-900">BSc. Computer Science</h3>
                <p className="text-[10px] font-medium text-slate-600">Federal University Oye Ekiti (FUOYE)</p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">2022 – 2025 (Graduated)</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 mb-1.5">Professional Traits</p>
                <ul className="text-[11px] text-slate-700 space-y-1 font-medium">
                  <li>• Cross-functional team collaboration</li>
                  <li>• Clean and maintainable code practices</li>
                  <li>• Advanced problem-solving capabilities</li>
                  <li>• Rapid adaptability to new technologies</li>
                </ul>
              </div>
            </section>
          </div>

          {/* FOOTER */}
          <footer className="mt-auto border-t border-slate-200 pt-4 flex justify-between items-center">
            <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Generated via Sovereign Protocol</p>
            <p className="text-[8px] font-mono text-slate-900 font-bold">CONFIDENTIAL DOSSIER</p>
          </footer>

        </div>
      </div>
    </div>
  );
}
