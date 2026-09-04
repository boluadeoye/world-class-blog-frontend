"use client";
import { useState, useEffect } from "react";
import { Download, Mail, Globe, MapPin, ExternalLink, Code2 } from "lucide-react";
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
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

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
          <aside className="w-[30%] bg-[#0F172A] text-white p-[10mm] flex flex-col justify-between relative z-10 box-border">
            
            {/* CONTACT */}
            <div>
              <div className="w-8 h-1 bg-[#D4AF37] mb-4"></div>
              
              <div className="space-y-2.5 font-inter text-[9px] tracking-wide text-slate-300">
                <p className="flex items-center gap-2">
                  <MapPin size={11} className="text-[#D4AF37] shrink-0" />
                  <span>Lagos, Nigeria (Remote)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={11} className="text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-[8px]">contact@boluadeoye.com.ng</span>
                </p>
                <a 
                  href="https://portfolio.boluadeoye.com.ng" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Globe size={11} className="text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-[8px] border-b border-slate-700 pb-0.5">portfolio.boluadeoye.com.ng</span>
                </a>
              </div>
            </div>

            {/* TECHNICAL STACK MATRIX */}
            <div className="space-y-3.5 my-auto py-1">
              <h2 className="font-inter text-[9px] font-black uppercase tracking-[0.2em] text-white border-b border-slate-700 pb-1">
                Technical Stack
              </h2>

              <div>
                <p className="font-mono text-[8px] font-bold text-[#D4AF37] uppercase mb-0.5">Frontend &amp; Headless</p>
                <p className="font-inter text-[8.5px] text-slate-300 leading-snug">
                  Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
                </p>
              </div>

              <div>
                <p className="font-mono text-[8px] font-bold text-[#D4AF37] uppercase mb-0.5">CMS &amp; E-Commerce</p>
                <p className="font-inter text-[8.5px] text-slate-300 leading-snug">
                  Headless WordPress, WooCommerce REST API, Stripe, Paystack
                </p>
              </div>

              <div>
                <p className="font-mono text-[8px] font-bold text-[#D4AF37] uppercase mb-0.5">Backend &amp; Data</p>
                <p className="font-inter text-[8.5px] text-slate-300 leading-snug">
                  Node.js, PostgreSQL (Prisma), Redis Caching, REST &amp; GraphQL
                </p>
              </div>

              <div>
                <p className="font-mono text-[8px] font-bold text-[#D4AF37] uppercase mb-0.5">Cloud &amp; DevOps</p>
                <p className="font-inter text-[8.5px] text-slate-300 leading-snug">
                  Vercel Edge Network, Git / GitHub, CI/CD, Docker, Cloudflare
                </p>
              </div>

              <div>
                <p className="font-mono text-[8px] font-bold text-[#D4AF37] uppercase mb-0.5">Specializations</p>
                <p className="font-inter text-[8.5px] text-slate-300 leading-snug">
                  Sub-100ms Edge TTFB, Webhook Pipelines, Offline-First Systems
                </p>
              </div>
            </div>

            {/* EDUCATION */}
            <div className="pt-2 border-t border-slate-800">
              <h2 className="font-inter text-[9px] font-black uppercase tracking-[0.2em] text-white mb-1.5">
                Education
              </h2>
              <p className="font-inter text-[8.5px] font-bold text-slate-200">Federal University Oye Ekiti</p>
              <p className="font-inter text-[8px] text-slate-400 mt-0.5">B.Sc. Computer Science</p>
            </div>

          </aside>
          {/* ========================================================= */}
          {/* RIGHT COLUMN: PROOF OF WORK & NARRATIVE (70%)             */}
          {/* ========================================================= */}
          <main className="w-[70%] p-[11mm] flex flex-col justify-between relative z-10 box-border">
            
            {/* HEADER */}
            <div>
              <h1 className="font-playfair text-3xl font-black text-[#0F172A] uppercase tracking-tight leading-none mb-1">
                Adeoye Boluwatife
              </h1>
              <p className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.25em]">
                Software Engineer &amp; Headless E-Commerce Specialist
              </p>
              <div className="h-0.5 w-14 bg-[#0F172A] mt-2.5"></div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div>
              <h2 className="font-inter text-[9px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#D4AF37]"></div> Professional Summary
              </h2>
              <p className="font-inter text-[9.5px] leading-[1.6] text-slate-800 text-justify">
                Software engineer with 3 years of production experience building high-performance e-commerce platforms, custom headless web applications, and operational telemetry dashboards. Specialized in bridging modern Next.js frontends with headless WordPress backends to deliver sub-second page loads, clean code architecture, and reliable third-party API integrations.
              </p>
            </div>

            {/* FLAGSHIP PRODUCTION SYSTEMS & LIVE PROJECTS */}
            <div>
              <h2 className="font-inter text-[9px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#D4AF37]"></div> Production Systems &amp; Case Studies
              </h2>

              <div className="space-y-2">
                {/* 1. LUMINA */}
                <div className="border border-slate-200 p-2 rounded-lg bg-slate-50/50">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-wide">
                      LUMINA &bull; High-Concurrency Digital Commerce Engine
                    </h3>
                    <span className="font-mono text-[7.5px] font-bold text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded">
                      &lt;140ms Checkout
                    </span>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-snug">
                    Bespoke digital storefront achieving 72ms Global Edge TTFB and 99.98% uptime. Integrated multi-region edge-cached catalog routing, Stripe idempotency keys, and instant headless inventory synchronization via webhooks.
                  </p>
                </div>

                {/* 2. Sleigh Strands */}
                <div className="border border-slate-200 p-2 rounded-lg bg-slate-50/50">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-wide">
                      Sleigh Strands &bull; Headless WordPress E-Commerce
                    </h3>
                    <a 
                      href="https://sleighstrands.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-mono text-[7.5px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
                    >
                      <span>sleighstrands.com</span>
                      <ExternalLink size={7.5} />
                    </a>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-snug">
                    Custom headless store decoupling WordPress/WooCommerce as the backend content engine with a Next.js frontend, ensuring instant catalog filtering, custom checkout, and automated inventory sync.
                  </p>
                </div>

                {/* 3. Orekelewa */}
                <div className="border border-slate-200 p-2 rounded-lg bg-slate-50/50">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-wide">
                      Orekelewa Store &bull; E-Commerce Web Application
                    </h3>
                    <a 
                      href="https://orekelewa-sepia.vercel.app" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-mono text-[7.5px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
                    >
                      <span>orekelewa-sepia.vercel.app</span>
                      <ExternalLink size={7.5} />
                    </a>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-snug">
                    Modern e-commerce platform built with responsive catalog views, persistent cart state management, mobile-first performance, and seamless payment integration.
                  </p>
                </div>

                {/* 4. Skin Silhouette */}
                <div className="border border-slate-200 p-2 rounded-lg bg-slate-50/50">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-wide">
                      Skin Silhouette &bull; Commercial Brand Platform
                    </h3>
                    <a 
                      href="https://skinsilhouette.vercel.app" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-mono text-[7.5px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
                    >
                      <span>skinsilhouette.vercel.app</span>
                      <ExternalLink size={7.5} />
                    </a>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-snug">
                    High-conversion brand website featuring custom interactive UI components, Core Web Vitals optimization, and clean architectural design.
                  </p>
                </div>
              </div>
            </div>

            {/* PROFESSIONAL EXPERIENCE */}
            <div>
              <h2 className="font-inter text-[9px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#D4AF37]"></div> Professional Experience
              </h2>

              <div className="relative pl-3 border-l-2 border-slate-200 space-y-2">
                {/* Role 1 */}
                <div className="relative">
                  <div className="absolute -left-[16px] top-1 w-1.5 h-1.5 bg-[#0F172A] rounded-full border border-white"></div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[10px] font-bold text-[#0F172A]">
                      Independent Software &amp; Web Developer
                    </h3>
                    <span className="font-mono text-[7.5px] font-bold text-slate-400">2023 &ndash; Present</span>
                  </div>
                  <ul className="list-disc pl-3 space-y-0.5 font-inter text-[8.5px] leading-snug text-slate-700">
                    <li>Design and deploy custom full-stack web applications, headless stores, and REST/GraphQL APIs for businesses.</li>
                    <li>Conduct speed audits and performance optimization, consistently cutting load times under 1 second.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="relative">
                  <div className="absolute -left-[16px] top-1 w-1.5 h-1.5 bg-slate-400 rounded-full border border-white"></div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-inter text-[10px] font-bold text-[#0F172A]">
                      Web Developer &bull; Staymedia Agency (<span className="font-mono text-[7.5px] text-blue-700">staymedia.ng</span>)
                    </h3>
                    <span className="font-mono text-[7.5px] font-bold text-slate-400">2023 &ndash; 2024</span>
                  </div>
                  <ul className="list-disc pl-3 space-y-0.5 font-inter text-[8.5px] leading-snug text-slate-700">
                    <li>Collaborated on client web projects, high-conversion landing pages, and custom CMS architectures.</li>
                    <li>Maintained WordPress installations, custom themes, and resolved cross-browser bottlenecks.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BOTTOM FOOTER */}
            <div className="border-t border-slate-200 pt-1.5 flex justify-between items-center text-[7.5px] font-mono text-slate-400">
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
