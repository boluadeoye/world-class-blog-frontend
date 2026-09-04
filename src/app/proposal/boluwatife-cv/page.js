"use client";
import { useState, useEffect } from "react";
import { Download, Mail, Globe, MapPin, FileText, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

export default function BoluwatifeCV() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Adeoye_Boluwatife_Software_Engineer_CV";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 antialiased">
      
      {/* IMPORT EDITORIAL & TECHNICAL TYPOGRAPHY */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR PRINT RESETS === */}
      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0; 
          }
          body { 
            background-color: #FFFFFF !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body * { visibility: hidden; }
          #cv-render, #cv-render * { visibility: visible; }
          #cv-render { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm; 
            height: 297mm; 
            background: #FFFFFF; 
          }
          .no-print { display: none !important; }
          a { text-decoration: none !important; color: inherit !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* PORTAL (Screen View) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-2xl border-t-8 border-[#0F172A]">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#0F172A] rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-xl">
            <Code2 size={32} />
          </div>

          <h1 className="font-playfair text-2xl font-black text-[#0F172A] mb-1 uppercase">Adeoye Boluwatife</h1>
          <p className="font-inter text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-8">Production Engineer CV</p>

          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">Aligning Swiss Grid...</div>
          ) : (
            <button 
              onClick={handlePrint} 
              className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span>Download 1-Page PDF</span>
            </button>
          )}

          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT CANVAS (1-PAGE A4 CONTAINER) */}
      <div id="cv-render" className="hidden print:block text-[#000000]">
        <div className="w-[210mm] h-[297mm] flex bg-white box-border relative overflow-hidden">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: THE TECHNICAL ANCHOR (30%)                   */}
          {/* ========================================================= */}
          <aside className="w-[30%] bg-[#0F172A] text-white p-[11mm] flex flex-col justify-between relative z-10 box-border">
            
            {/* CONTACT & PROFILES */}
            <div>
              <div className="w-8 h-1 bg-[#D4AF37] mb-5"></div>
              
              <div className="space-y-3 font-inter text-[9px] tracking-wide text-slate-300">
                <p className="flex items-center gap-2.5">
                  <MapPin size={11} className="text-[#D4AF37] shrink-0" />
                  <span>Lagos, Nigeria (Remote)</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail size={11} className="text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-[8.5px]">contact@boluadeoye.com.ng</span>
                </p>
                <a 
                  href="https://portfolio.boluadeoye.com.ng" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Globe size={11} className="text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-[8.5px] border-b border-slate-700 pb-0.5">portfolio.boluadeoye.com.ng</span>
                </a>
              </div>
            </div>

            {/* TECHNICAL STACK MATRIX */}
            <div className="space-y-4 my-auto py-2">
              <h2 className="font-inter text-[9.5px] font-black uppercase tracking-[0.2em] text-white border-b border-slate-700 pb-1.5">
                Technical Stack
              </h2>

              <div>
                <p className="font-mono text-[8.5px] font-bold text-[#D4AF37] uppercase mb-1">Frontend &amp; Headless</p>
                <p className="font-inter text-[9px] text-slate-300 leading-relaxed">
                  Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
                </p>
              </div>

              <div>
                <p className="font-mono text-[8.5px] font-bold text-[#D4AF37] uppercase mb-1">CMS &amp; E-Commerce</p>
                <p className="font-inter text-[9px] text-slate-300 leading-relaxed">
                  Headless WordPress, WooCommerce REST API, Stripe, Paystack
                </p>
              </div>

              <div>
                <p className="font-mono text-[8.5px] font-bold text-[#D4AF37] uppercase mb-1">Backend &amp; Data</p>
                <p className="font-inter text-[9px] text-slate-300 leading-relaxed">
                  Node.js, PostgreSQL (Prisma), Redis Caching, REST &amp; GraphQL
                </p>
              </div>

              <div>
                <p className="font-mono text-[8.5px] font-bold text-[#D4AF37] uppercase mb-1">Cloud &amp; DevOps</p>
                <p className="font-inter text-[9px] text-slate-300 leading-relaxed">
                  Vercel Edge Network, Git / GitHub, CI/CD, Docker, Cloudflare
                </p>
              </div>

              <div>
                <p className="font-mono text-[8.5px] font-bold text-[#D4AF37] uppercase mb-1">Specializations</p>
                <p className="font-inter text-[9px] text-slate-300 leading-relaxed">
                  Sub-100ms Edge TTFB, Webhook Pipelines, Offline-First Architecture
                </p>
              </div>
            </div>

            {/* EDUCATION & HIGHLIGHTS */}
            <div className="pt-2 border-t border-slate-800">
              <h2 className="font-inter text-[9.5px] font-black uppercase tracking-[0.2em] text-white mb-2">
                Education
              </h2>
              <p className="font-inter text-[9px] font-bold text-slate-200">Federal University Oye Ekiti</p>
              <p className="font-inter text-[8px] text-slate-400 mt-0.5">B.Sc. In View</p>
            </div>

          </aside>
          {/* ========================================================= */}
          {/* RIGHT COLUMN: THE PROOF OF WORK & NARRATIVE (70%)         */}
          {/* ========================================================= */}
          <main className="w-[70%] p-[13mm] flex flex-col justify-between relative z-10 box-border">
            
            {/* HEADER */}
            <div>
              <h1 className="font-playfair text-3xl font-black text-[#0F172A] uppercase tracking-tight leading-none mb-1.5">
                Adeoye Boluwatife
              </h1>
              <p className="font-mono text-[9.5px] font-bold text-[#D4AF37] uppercase tracking-[0.25em]">
                Software Engineer &amp; Headless E-Commerce Specialist
              </p>
              <div className="h-0.5 w-16 bg-[#0F172A] mt-3"></div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div>
              <h2 className="font-inter text-[9.5px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#D4AF37]"></div> Professional Summary
              </h2>
              <p className="font-inter text-[10px] leading-[1.65] text-slate-800 text-justify">
                Software engineer with 3 years of production experience building high-performance e-commerce platforms, custom headless web applications, and operational telemetry dashboards. Specialized in bridging modern Next.js frontends with headless WordPress backends to deliver sub-second page loads, clean code architecture, and bulletproof third-party API integrations.
              </p>
            </div>

            {/* FLAGSHIP PRODUCTION SYSTEMS */}
            <div>
              <h2 className="font-inter text-[9.5px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-2.5 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#D4AF37]"></div> Production Systems &amp; Case Studies
              </h2>

              <div className="space-y-3">
                {/* System 1: LUMINA */}
                <div className="border border-slate-200 p-2.5 rounded-lg bg-slate-50/50">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-wide">
                      LUMINA &bull; High-Concurrency Digital Commerce Engine
                    </h3>
                    <span className="font-mono text-[8px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      &lt;140ms Checkout
                    </span>
                  </div>
                  <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">
                    Engineered a bespoke digital storefront achieving 72ms Global Edge TTFB and 99.98% uptime. Integrated multi-region edge-cached catalog routing, Stripe idempotency keys, and instant headless inventory synchronization via webhooks.
                  </p>
                </div>

                {/* System 2: Sleigh Strands */}
                <div className="border border-slate-200 p-2.5 rounded-lg bg-slate-50/50">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-wide flex items-center gap-1">
                      <span>Sleigh Strands &bull; Headless WordPress Store</span>
                    </h3>
                    <a 
                      href="https://sleighstrands.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-mono text-[8px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
                    >
                      <span>sleighstrands.com</span>
                      <ExternalLink size={8} />
                    </a>
                  </div>
                  <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">
                    Architected a custom headless e-commerce store decoupling WordPress/WooCommerce as the backend content engine with a high-speed Next.js frontend, ensuring instant catalog filtering and secure checkout.
                  </p>
                </div>

                {/* System 3: Commercial Client Deployments */}
                <div className="border border-slate-200 p-2.5 rounded-lg bg-slate-50/50">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[11px] font-black text-[#0F172A] uppercase tracking-wide">
                      Orekelewa &amp; Skin Silhouette &bull; E-Commerce &amp; Web Apps
                    </h3>
                    <span className="font-mono text-[8px] font-bold text-slate-500">Live Client Builds</span>
                  </div>
                  <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">
                    Developed high-converting web storefronts and brand architectures with mobile-first responsiveness, dynamic cart states, and seamless payment gateway integrations.
                  </p>
                </div>
              </div>
            </div>

            {/* PROFESSIONAL EXPERIENCE */}
            <div>
              <h2 className="font-inter text-[9.5px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#D4AF37]"></div> Professional Experience
              </h2>

              <div className="relative pl-3.5 border-l-2 border-slate-200 space-y-3">
                {/* Role 1 */}
                <div className="relative">
                  <div className="absolute -left-[18px] top-1 w-2 h-2 bg-[#0F172A] rounded-full border border-white"></div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[10.5px] font-bold text-[#0F172A]">
                      Independent Software &amp; Web Developer
                    </h3>
                    <span className="font-mono text-[8px] font-bold text-slate-400">2023 &ndash; Present</span>
                  </div>
                  <ul className="list-disc pl-3.5 space-y-0.5 font-inter text-[9px] leading-relaxed text-slate-700">
                    <li>Design and deploy custom full-stack web applications, headless stores, and REST/GraphQL APIs for businesses.</li>
                    <li>Conduct bug resolution, speed audits, and Core Web Vitals optimization, consistently cutting load times under 1 second.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="relative">
                  <div className="absolute -left-[18px] top-1 w-2 h-2 bg-slate-400 rounded-full border border-white"></div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[10.5px] font-bold text-[#0F172A]">
                      Web Developer &bull; Staymedia Agency (<span className="font-mono text-[8px] text-blue-700">staymedia.ng</span>)
                    </h3>
                    <span className="font-mono text-[8px] font-bold text-slate-400">2023 &ndash; 2024</span>
                  </div>
                  <ul className="list-disc pl-3.5 space-y-0.5 font-inter text-[9px] leading-relaxed text-slate-700">
                    <li>Collaborated on commercial client websites, custom landing pages, and content management architectures.</li>
                    <li>Maintained WordPress installations, configured custom themes/plugins, and resolved cross-browser bottlenecks.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BOTTOM FOOTER */}
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-[8px] font-mono text-slate-400">
              <span>Adeoye Boluwatife &bull; Engineering Dossier</span>
              <a href="https://portfolio.boluadeoye.com.ng" target="_blank" rel="noreferrer" className="text-[#0F172A] font-bold hover:underline">
                portfolio.boluadeoye.com.ng
              </a>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
