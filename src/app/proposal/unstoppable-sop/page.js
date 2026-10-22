"use client";
import { useState, useEffect } from "react";
import {
  Download, CheckCircle2, AlertTriangle, AlertCircle, ShieldCheck,
  Terminal, Layers, Eye, EyeOff, ArrowLeft, BookOpen
} from "lucide-react";
import Link from "next/link";

const ASSETS = {
  fig1_1: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666975/blog_assets/sf9ypjpokmo3nfdqkheb.jpg",
  fig3_1: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666967/blog_assets/jsf0v3hfs3ijjxpqc1ag.png",
  fig3_2: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666958/blog_assets/um5eertndyl2hp8lk9yz.png",
  fig3_4: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666947/blog_assets/tbmtkbhia3ikh4bp13k1.png",
  fig3_3: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666940/blog_assets/p1a8vvu0z9at5bzq0mtr.png",
  fig4_2b: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666933/blog_assets/r1xhlnavveust9uwlwhn.png",
  fig4_3: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666926/blog_assets/apszudgoliwt9y5hcsv1.png",
  fig4_2a: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666919/blog_assets/sclciekrqh2wxndr7j5y.png",
  fig4_1: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666913/blog_assets/qplq5l0mgimeeg6llkkx.png",
  fig2_1a: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666908/blog_assets/cs0a2tuefoyyorzwpsap.png",
  fig2_1b: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666659/blog_assets/gba7c7rp5z1eifnhlnyz.jpg",
  fig2_2: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1792666640/blog_assets/mtzgudhnizmk2vfzqg7q.png",
};

function RunningHeader({ sectionMarker, subMarker }) {
  return (
    <div className="mb-3 shrink-0">
      <div className="bg-[#052E16] text-white px-3.5 py-2 border-b-[3px] border-[#FCB52F] flex justify-between items-center rounded-t-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FCB52F] inline-block" />
          <span className="text-[7.5pt] font-mono font-bold uppercase tracking-[0.18em] text-[#E8F7ED]">
            STAYMEDIA // STANDARD OPERATING PROCEDURE
          </span>
        </div>
        <div className="bg-[#0EA34A]/20 border border-[#0EA34A]/50 px-2.5 py-0.5 rounded text-[7pt] font-mono font-bold text-[#FDE047] tracking-wider">
          REF: UNSTOPPABLE-SOP-2026
        </div>
      </div>
      {sectionMarker && (
        <div className="flex justify-between items-center border-b border-slate-200 py-1 px-1 text-[7.5pt] font-bold uppercase tracking-wider text-[#4B5563]">
          <div>
            <span className="text-[#052E16] font-black">{sectionMarker}</span>
            {subMarker && <span className="text-[#0EA34A] mx-1.5">•</span>}
            {subMarker && <span>{subMarker}</span>}
          </div>
          <div className="font-mono text-[7pt] text-slate-400">UNSTOPPABLE PRINTS DIGITAL ECOSYSTEM</div>
        </div>
      )}
    </div>
  );
}

function RunningFooter({ sectionName, pageNum }) {
  return (
    <footer className="border-t border-slate-300 pt-2 mt-auto flex justify-between items-center text-[7.5pt] font-mono uppercase tracking-wider text-[#4B5563] shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-[#052E16]">UNSTOPPABLE PRINTS</span>
        <span className="text-[#0EA34A]">•</span>
        <span>{sectionName}</span>
      </div>
      <div className="font-bold text-[#111827] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
        PAGE {pageNum} OF 5
      </div>
    </footer>
  );
}

function SectionBanner({ code, title, objective }) {
  return (
    <div className="mb-3 shrink-0">
      <div className="border-l-4 border-[#052E16] pl-3 py-0.5 mb-2">
        <p className="text-[7.5pt] font-mono font-bold uppercase tracking-[0.15em] text-[#0EA34A] leading-none mb-1">
          {code}
        </p>
        <h2 className="text-[13.5pt] font-black uppercase tracking-tight text-[#111827] leading-tight">
          {title}
        </h2>
      </div>
      {objective && (
        <div className="bg-slate-50 border border-slate-200 rounded px-3 py-1.5">
          <span className="text-[7.5pt] font-black uppercase tracking-wider text-[#052E16] mr-1.5">
            OBJECTIVE & OVERVIEW:
          </span>
          <span className="text-[8.5pt] text-[#111827] leading-snug font-medium">
            {objective}
          </span>
        </div>
      )}
    </div>
  );
}

function StepBadge({ num, title, children }) {
  return (
    <div className="flex items-start gap-2.5 py-1">
      <div className="w-5 h-5 rounded-full bg-[#052E16] text-white flex items-center justify-center text-[8pt] font-black shrink-0 mt-0.5 shadow-sm border border-[#0EA34A]/40">
        {num}
      </div>
      <div className="text-[8.5pt] leading-[1.35] text-[#111827]">
        {title && <span className="font-black uppercase text-[#052E16] mr-1">{title}:</span>}
        <span className="font-medium text-slate-800">{children}</span>
      </div>
    </div>
  );
}

function Callout({ type, title, children }) {
  const styles = {
    expect: {
      bg: "bg-[#E8F7ED]",
      border: "border-l-4 border-[#0EA34A]",
      text: "text-[#052E16]",
      titleColor: "text-[#052E16]",
      icon: <CheckCircle2 size={13} className="text-[#0EA34A] shrink-0" />,
    },
    avoid: {
      bg: "bg-[#FEF3C7]",
      border: "border-l-4 border-[#FCB52F]",
      text: "text-[#92400E]",
      titleColor: "text-[#92400E]",
      icon: <AlertTriangle size={13} className="text-[#D97706] shrink-0" />,
    },
    alert: {
      bg: "bg-[#FEE2E2]",
      border: "border-l-4 border-[#EF4444]",
      text: "text-[#991B1B]",
      titleColor: "text-[#991B1B]",
      icon: <AlertCircle size={13} className="text-[#EF4444] shrink-0" />,
    },
  }[type];

  return (
    <div className={`${styles.bg} ${styles.border} rounded-r px-3 py-2 shrink-0`}>
      <div className={`flex items-center gap-1.5 font-black text-[8pt] uppercase tracking-wider ${styles.titleColor} mb-0.5`}>
        {styles.icon}
        <span>{title}</span>
      </div>
      <div className={`text-[8pt] leading-[1.35] font-medium ${styles.text}`}>
        {children}
      </div>
    </div>
  );
}

function FigureBox({ src, label, caption, imgHeight = "h-[145px]" }) {
  return (
    <div className="border border-slate-300 rounded bg-white p-1.5 flex flex-col justify-between shadow-sm">
      <div className={`w-full ${imgHeight} bg-slate-900/5 rounded overflow-hidden flex items-center justify-center border border-slate-200`}>
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-contain"
          loading="eager"
          crossOrigin="anonymous"
        />
      </div>
      <p className="text-[7.5pt] font-bold text-[#111827] text-center mt-1.5 leading-tight px-1">
        <span className="font-black text-[#052E16] uppercase">{label}: </span>
        <span className="italic text-[#4B5563] font-medium">{caption}</span>
      </p>
    </div>
  );
}

export default function UnstoppablePrintsSOP() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showScreenPreview, setShowScreenPreview] = useState(false);

  useEffect(() => {
    Object.values(ASSETS).forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    const steps = [
      "Authenticating StayMedia Brand Tokens...",
      "Pre-caching 12 High-Res Marked-Up Figures...",
      "Enforcing 5-Page ISO A4 Print Geometry...",
      "Master SOP Manual Ready."
    ];
    if (loadingStep < steps.length) {
      const timer = setTimeout(() => setLoadingStep((p) => p + 1), 450);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [loadingStep]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "UNSTOPPABLE_PRINTS_MASTER_SOP_2026";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-[#111827] selection:bg-emerald-200">
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            width: 210mm;
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          body > header, body > nav, body > footer, .no-print {
            display: none !important;
          }
          #print-container, #print-container * {
            visibility: visible !important;
          }
          #print-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            background: #ffffff !important;
          }
          .sop-page {
            width: 210mm !important;
            height: 296.5mm !important;
            max-height: 296.5mm !important;
            padding: 10mm 13mm !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            position: relative !important;
            background: #ffffff !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .sop-page:not(:last-child) {
            page-break-after: always !important;
            break-after: page !important;
          }
          .sop-page:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }
        }
      `}</style>

      {/* === VIEW A: OBSIDIAN COMMAND PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/50 via-slate-950 to-slate-950" />

        <div className="relative z-10 w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-emerald-800/50 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-[#052E16] border-2 border-[#FCB52F] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-emerald-950/60">
            <BookOpen size={30} className="text-[#FCB52F]" />
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-700/50 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-emerald-300 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0EA34A] animate-ping" />
            REF: UNSTOPPABLE-SOP-2026
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1">
            Master Operations Manual
          </h1>
          <p className="text-slate-400 text-xs font-mono mb-6">
            Unstoppable Prints • 5-Page Illustrated A4 Standard Operating Procedure
          </p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-black/60 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 mb-4">
              <p>&gt; Initializing StayMedia SOP Engine...</p>
              <p>&gt; {loadingStep >= 1 ? "Brand Palette (#052E16 / #0EA34A / #FCB52F) Locked..." : "..."}</p>
              <p>&gt; {loadingStep >= 2 ? "12 Annotated Cloudinary Assets Cached..." : "..."}</p>
              <p className="text-[#FCB52F] animate-pulse">&gt; {loadingStep >= 3 ? "A4 PAGINATION VERIFIED (5 SHEETS)..." : "..."}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-3 bg-[#0EA34A] hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-xl transition-all transform hover:scale-[1.01] shadow-xl shadow-emerald-900/30 uppercase tracking-wider text-sm"
              >
                <Download size={18} />
                <span>Download 5-Page Master SOP (PDF)</span>
              </button>

              <button
                onClick={() => setShowScreenPreview(!showScreenPreview)}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-xl border border-slate-700 transition-all text-xs uppercase tracking-wider"
              >
                {showScreenPreview ? <EyeOff size={15} /> : <Eye size={15} />}
                <span>{showScreenPreview ? "Hide On-Screen A4 Preview" : "Inspect 5-Page Document on Screen"}</span>
              </button>
            </div>
          )}

          <Link href="/" className="inline-flex items-center gap-1.5 mt-6 text-xs text-slate-500 hover:text-slate-300 font-mono">
            <ArrowLeft size={13} /> Return to Architect Portal
          </Link>
        </div>
      </div>

      {/* === VIEW B: THE 5-PAGE A4 DOCUMENT === */}
      <div
        id="print-container"
        className={`${
          showScreenPreview
            ? "block py-10 space-y-10 bg-slate-900 print:py-0 print:space-y-0 print:bg-white"
            : "hidden print:block"
        } w-[210mm] mx-auto bg-white`}
      >
        {/* ================= PAGE 1: SYSTEM ACCESS & COMMAND CENTER ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <div className="w-full h-2.5 flex mb-4 shrink-0">
            <div className="w-2/3 bg-[#052E16]" />
            <div className="w-1/3 bg-[#FCB52F]" />
          </div>

          <div className="flex justify-between items-center border-b-2 border-[#052E16] pb-3 mb-3 shrink-0">
            <div>
              <p className="text-[8pt] font-mono font-bold uppercase tracking-[0.22em] text-[#4B5563] mb-1">
                STAYMEDIA // STANDARD OPERATING PROCEDURE
              </p>
              <h1 className="text-[22pt] font-black uppercase tracking-tight text-[#111827] leading-none">
                MASTER OPERATIONS MANUAL
              </h1>
              <p className="text-[9.5pt] font-semibold text-[#0EA34A] mt-1">
                Unstoppable Prints Digital Ecosystem Management
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="bg-[#052E16] text-white px-3 py-1.5 font-mono text-[8pt] font-bold uppercase tracking-wider rounded-sm border-l-4 border-[#FCB52F]">
                REF: UNSTOPPABLE-SOP-2026
              </div>
            </div>
          </div>

          {/* TABLE OF CONTENTS */}
          <div className="bg-[#E8F7ED]/60 border border-[#0EA34A]/30 rounded-md p-3 mb-3.5 shrink-0">
            <div className="flex items-center gap-2 text-[8pt] font-black uppercase tracking-[0.15em] text-[#052E16] border-b border-[#0EA34A]/20 pb-1.5 mb-2">
              <Layers size={13} className="text-[#0EA34A]" />
              <span>TABLE OF CONTENTS &amp; QUICK INDEX</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[8.5pt]">
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-1">
                <span className="font-bold text-[#111827]">1.0 System Access &amp; Command Center</span>
                <span className="font-mono font-black text-[#052E16] bg-white px-1.5 py-0.5 rounded text-[7.5pt] border border-slate-200">PG 1</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-1">
                <span className="font-bold text-[#111827]">3.0 Product Management &amp; Print Catalog</span>
                <span className="font-mono font-black text-[#052E16] bg-white px-1.5 py-0.5 rounded text-[7.5pt] border border-slate-200">PG 3-4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#111827]">2.0 Publishing &amp; Updating Posts (Blog &amp; Guides)</span>
                <span className="font-mono font-black text-[#052E16] bg-white px-1.5 py-0.5 rounded text-[7.5pt] border border-slate-200">PG 2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#111827]">4.0 Order Fulfillment &amp; Customer Processing</span>
                <span className="font-mono font-black text-[#052E16] bg-white px-1.5 py-0.5 rounded text-[7.5pt] border border-slate-200">PG 5</span>
              </div>
            </div>
          </div>

          <SectionBanner
            code="SECTION 1.0"
            title="SYSTEM ACCESS & COMMAND CENTER"
            objective="The Command Center is the central WordPress administration panel where all website posts, print shop products, media files, and customer orders are managed for the Unstoppable Prints storefront."
          />

          <div className="mb-3 shrink-0">
            <h3 className="text-[8.5pt] font-black uppercase tracking-wider text-[#052E16] mb-1.5">
              1.2 STEP-BY-STEP ACCESS EXECUTION
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-slate-50 p-2.5 rounded border border-slate-200">
              <StepBadge num="1" title="Launch Browser">
                Open any standard web browser on a desktop computer or mobile device.
              </StepBadge>
              <StepBadge num="2" title="Admin Gateway URL">
                Navigate to:{" "}
                <span className="font-mono font-bold text-[#052E16] bg-[#E8F7ED] px-1.5 py-0.5 rounded border border-[#0EA34A]/40 text-[8pt]">
                  https://unstoppableprints.ca/wp-admin
                </span>
              </StepBadge>
              <StepBadge num="3" title="Authenticate">
                Enter your assigned administrative <strong>Username</strong> and <strong>Password</strong> credentials into the login boxes.
              </StepBadge>
              <StepBadge num="4" title="Initialize Session">
                Click the <strong>&quot;Log In&quot;</strong> button to enter the main command dashboard.
              </StepBadge>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 mb-3 items-stretch shrink-0">
            <div className="col-span-7">
              <FigureBox
                src={ASSETS.fig1_1}
                label="Figure 1.1"
                caption="Main WordPress Admin Dashboard & Left Sidebar at unstoppableprints.ca/wp-admin."
                imgHeight="h-[165px]"
              />
            </div>
            <div className="col-span-5 bg-[#052E16] text-white rounded p-3 flex flex-col justify-between border-t-4 border-[#FCB52F]">
              <div>
                <h4 className="text-[8.5pt] font-black uppercase tracking-wider text-[#FCB52F] mb-2 flex items-center gap-1.5">
                  <Terminal size={13} /> 1.3 Navigation Menu Map
                </h4>
                <p className="text-[7.5pt] text-emerald-100/90 mb-2.5 leading-snug">
                  Once logged in, locate the dark vertical sidebar on the left side of your screen. Core modules:
                </p>
                <ul className="space-y-2 text-[8pt]">
                  <li className="bg-white/10 p-1.5 rounded border-l-2 border-[#0EA34A]">
                    <strong className="text-[#FDE047] font-mono">Posts:</strong> Manage blog articles, news, and printing guides.
                  </li>
                  <li className="bg-white/10 p-1.5 rounded border-l-2 border-[#0EA34A]">
                    <strong className="text-[#FDE047] font-mono">Media:</strong> View and upload high-res image files.
                  </li>
                  <li className="bg-white/10 p-1.5 rounded border-l-2 border-[#0EA34A]">
                    <strong className="text-[#FDE047] font-mono">WooCommerce:</strong> View, edit, and fulfill customer print orders.
                  </li>
                  <li className="bg-white/10 p-1.5 rounded border-l-2 border-[#0EA34A]">
                    <strong className="text-[#FDE047] font-mono">Products:</strong> Create print items, set prices, and assign categories.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-2 shrink-0">
            <Callout type="expect" title="WHAT TO EXPECT">
              Upon logging in, you will land on the main WordPress Dashboard. The dark left sidebar gives direct access to all site administrative options (Posts, Media, WooCommerce, Products).
            </Callout>
            <Callout type="avoid" title="WHAT TO AVOID">
              Do not attempt to log in using third-party portal links or unverified paths. Always navigate directly to{" "}
              <span className="font-mono font-bold">https://unstoppableprints.ca/wp-admin</span> to prevent security lockout blocks.
            </Callout>
          </div>

          <RunningFooter sectionName="1.0 SYSTEM ACCESS & COMMAND CENTER" pageNum={1} />
        </div>

        {/* ================= PAGE 2: PUBLISHING & UPDATING POSTS ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <RunningHeader
            sectionMarker="2.0 EDITORIAL & CONTENT MANAGEMENT"
            subMarker="2.1 PUBLISHING & UPDATING WRITTEN ARTICLES"
          />

          <SectionBanner
            code="SECTION 2.1"
            title="PUBLISHING & UPDATING WRITTEN ARTICLES"
            objective="Publish new articles, printing guides, and news updates to the live website, or edit existing posts."
          />

          <div className="mb-2.5 shrink-0">
            <h3 className="text-[8pt] font-black uppercase tracking-wider text-[#052E16] mb-1">
              2.1.2 STEP-BY-STEP EXECUTION
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-slate-50 p-2.5 rounded border border-slate-200">
              <StepBadge num="1" title="Open Post Editor">
                In the left sidebar, click <strong>Posts &gt; Add Post</strong> for a new article, or <strong>Posts &gt; All Posts</strong> and click a title to edit.
              </StepBadge>
              <StepBadge num="4" title="Assign Featured Image">
                In the right panel under the <strong>Post</strong> tab, click <strong>Set Featured Image</strong> &gt; upload a JPG/PNG or choose from Media Library. <em>[Ref: Fig 2.2]</em>
              </StepBadge>
              <StepBadge num="2" title="Enter Post Title">
                Click <strong>&quot;Add title&quot;</strong> and type your headline (e.g., <em>&quot;Why Unstoppable Prints Is Your Go-To Printing Partner&quot;</em>). <em>[Ref: Fig 2.1]</em>
              </StepBadge>
              <StepBadge num="5" title="Assign Category">
                In the right-hand panel, scroll to <strong>Categories</strong> and check the relevant category box (for example: <strong>Guides</strong>).
              </StepBadge>
              <StepBadge num="3" title="Enter Article Body">
                Click the main body area below the title. Type or paste your paragraphs and bullet points into the Block Editor. <em>[Ref: Fig 2.1]</em>
              </StepBadge>
              <StepBadge num="6" title="Save & Publish">
                <strong>Desktop:</strong> Click blue <strong>Save/Update</strong> at top-right. <strong>Mobile:</strong> Tap <strong>[X]</strong> to close sidebar if covering header, then tap <strong>Save</strong>.
              </StepBadge>
            </div>
          </div>

          {/* FIGURES 2.1A, 2.1B, 2.2 */}
          <div className="grid grid-cols-3 gap-2.5 mb-2.5 shrink-0">
            <FigureBox
              src={ASSETS.fig2_1a}
              label="Figure 2.1A"
              caption="Clicking 'Add Post' in Left Sidebar Posts Menu."
              imgHeight="h-[150px]"
            />
            <FigureBox
              src={ASSETS.fig2_1b}
              label="Figure 2.1B"
              caption="Entering Post Headline & Bulleted Body Copy in Editor."
              imgHeight="h-[150px]"
            />
            <FigureBox
              src={ASSETS.fig2_2}
              label="Figure 2.2"
              caption="Right Sidebar Inspector — Featured Image & Publish Status."
              imgHeight="h-[150px]"
            />
          </div>

          <div className="space-y-2 mb-2 shrink-0">
            <Callout type="expect" title="WHAT TO EXPECT ON LIVE WEBSITE">
              The article immediately renders on the live blog page as an article card displaying your cover photo, headline, publish date, and excerpt text. Clicking the card opens the full story page.
            </Callout>
            <Callout type="avoid" title="WHAT TO AVOID & CRITICAL PITFALLS">
              • <strong>Skipping Featured Image:</strong> The article card will display on the live website with a blank gray box instead of a cover photo.{" "}
              • <strong>Skipping Category:</strong> The article defaults to &quot;Uncategorized&quot; and will not appear on filtered guide pages.{" "}
              • <strong>Pasting Formatted Text:</strong> Pasting directly from external word processors can corrupt styling; type directly or paste as plain text.
            </Callout>
            <Callout type="alert" title="TROUBLESHOOTING ALERT">
              <strong>Issue:</strong> The blue &quot;Save&quot; or &quot;Update&quot; button is not visible on mobile screens.{" "}
              <strong>Fix:</strong> Tap the panel toggle icon <span className="font-mono font-bold">[X]</span> at the top right of the gray sidebar panel to close it. The blue &quot;Save&quot; button will appear in the top header bar. Alternatively, rotate your phone horizontally to landscape mode.
            </Callout>
          </div>

          <RunningFooter sectionName="2.0 PUBLISHING & UPDATING POSTS (BLOG & GUIDES)" pageNum={2} />
        </div>

        {/* ================= PAGE 3: PRODUCT MANAGEMENT & PRINT CATALOG (PART 1) ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <RunningHeader
            sectionMarker="3.0 THE PRINT SHOP (PRODUCT CATALOG MANAGEMENT)"
            subMarker="3.1 CREATING & EDITING PRINT PRODUCTS"
          />

          <SectionBanner
            code="SECTION 3.1"
            title="CREATING & EDITING PRINT PRODUCTS"
            objective="Create new print shop products (such as Sublimation Tumblers, Banners, Tote Bags, or Canvas) and configure regular retail prices."
          />

          <div className="mb-3 shrink-0">
            <h3 className="text-[8pt] font-black uppercase tracking-wider text-[#052E16] mb-1.5">
              3.1.2 STEP-BY-STEP EXECUTION
            </h3>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5">
              <StepBadge num="1" title="Open Product Editor">
                In the left sidebar, click <strong>Products &gt; Add New</strong> to create a new print product, or click <strong>Products &gt; All Products</strong> and click an existing product name to edit.
              </StepBadge>
              <StepBadge num="2" title="Enter Product Title">
                Click the top field labeled <strong>&quot;Product name&quot;</strong> and type the complete item name (for example: <em>&quot;Sublimation 20oz Tumblers&quot;</em>). <em>[Reference: Figure 3.1]</em>
              </StepBadge>
              <StepBadge num="3" title="Enter Product Description">
                Scroll to the <strong>&quot;Product description&quot;</strong> text box. Type item specifications, usage details, and printing features (for example: <em>&quot;Use: Hot &amp; Cold&quot;</em>). <em>[Reference: Figure 3.1]</em>
              </StepBadge>
              <StepBadge num="4" title="Configure Product Data & Regular Price">
                Scroll down the middle of the page to the <strong>&quot;Product data&quot;</strong> box <em>[Reference: Figure 3.2]</em>: Confirm that <strong>&quot;Simple product&quot;</strong> is selected in the dropdown menu. Under the <strong>General</strong> tab, locate the field labeled <strong>&quot;Regular price (CA$)&quot;</strong> and enter the item price (for example: <span className="font-mono font-bold text-[#052E16]">29.99</span>).
              </StepBadge>
              <StepBadge num="5" title="Save Product Changes">
                Click the blue <strong>&quot;Update&quot;</strong> or <strong>&quot;Publish&quot;</strong> button located in the <strong>Publish</strong> panel on the right sidebar. <em>[Reference: Figure 3.2]</em>
              </StepBadge>
            </div>
          </div>

          {/* FIGURES 3.1 & 3.2 */}
          <div className="grid grid-cols-2 gap-3 mb-3 shrink-0">
            <FigureBox
              src={ASSETS.fig3_1}
              label="Figure 3.1"
              caption="Entering Product Title ('Sublimation 20oz Tumblers') and Product Description ('Use: Hot & Cold')."
              imgHeight="h-[175px]"
            />
            <FigureBox
              src={ASSETS.fig3_2}
              label="Figure 3.2"
              caption="Product Data Panel with Regular Price Set to CA$ 29.99 and Blue Update Button Highlighted."
              imgHeight="h-[175px]"
            />
          </div>

          <div className="space-y-2 mb-2 shrink-0">
            <Callout type="expect" title="WHAT TO EXPECT ON LIVE WEBSITE">
              The product appears on the live shop page displaying its title, main photo, and retail price (<strong>CA$29.99</strong>). Clicking the item opens the single product page with an active <strong>&quot;Add to Cart&quot;</strong> button ready for customer checkout.
            </Callout>
            <Callout type="avoid" title="WHAT TO AVOID (PRICING FORMATTING)">
              Do not type currency symbols (<span className="font-mono font-bold">$</span> or <span className="font-mono font-bold">CA$</span>) inside the Regular price input box. Enter only numeric digits and decimals (such as <span className="font-mono font-bold">29.99</span>) and always click the blue <strong>Update</strong> button before leaving the page.
            </Callout>
          </div>

          <RunningFooter sectionName="3.1 PRODUCT CATALOG & PRICING" pageNum={3} />
        </div>

        {/* ================= PAGE 4: PRODUCT IMAGES & CATEGORIES (PART 2) ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <RunningHeader
            sectionMarker="3.0 THE PRINT SHOP (PRODUCT CATALOG MANAGEMENT)"
            subMarker="3.2 PRODUCT IMAGES, GALLERY & CATEGORY ASSIGNMENT"
          />

          <SectionBanner
            code="SECTION 3.2"
            title="PRODUCT IMAGES, GALLERY & CATEGORY ASSIGNMENT"
            objective="Upload primary display images, additional gallery photos, and assign product categories so items appear in the correct storefront sections."
          />

          <div className="mb-3 shrink-0">
            <h3 className="text-[8pt] font-black uppercase tracking-wider text-[#052E16] mb-1.5">
              3.2.2 STEP-BY-STEP EXECUTION
            </h3>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5">
              <StepBadge num="1" title="Assign Main Product Image">
                In the right sidebar panel, locate the <strong>&quot;Product image&quot;</strong> box <em>[Reference: Figure 3.3]</em>. Click <strong>&quot;Set product image&quot;</strong> (or click the existing image to change it), upload a clear photo of the finished print item or select from the Media Library, and click <strong>&quot;Set product image&quot;</strong>.
              </StepBadge>
              <StepBadge num="2" title="Add Extra Gallery Images (Optional)">
                Directly below the Product Image box, locate <strong>&quot;Product gallery&quot;</strong> &gt; click <strong>&quot;Add product gallery images&quot;</strong> &gt; select additional product angles or close-up print photos to display on the product page.
              </StepBadge>
              <StepBadge num="3" title="Assign Product Category">
                In the right sidebar panel, locate <strong>&quot;Product categories&quot;</strong> <em>[Reference: Figure 3.3]</em>. Scroll through the checkbox list, check the box matching the item (for example: <strong>&quot;Drinkware- Sublimation &amp; Custom&quot;</strong>), and uncheck <strong>&quot;Uncategorized&quot;</strong>.
              </StepBadge>
              <StepBadge num="4" title="Update & Save (Or Trash Obsolete Products)">
                Scroll up to the <strong>&quot;Publish&quot;</strong> box on the right panel and click the blue <strong>&quot;Update&quot;</strong> button. To remove discontinued or test products, click red <strong>&quot;Move to Trash&quot;</strong> <em>[Reference: Figure 3.4]</em>.
              </StepBadge>
            </div>
          </div>

          {/* FIGURES 3.3 & 3.4 */}
          <div className="grid grid-cols-2 gap-3 mb-3 shrink-0">
            <FigureBox
              src={ASSETS.fig3_3}
              label="Figure 3.3"
              caption="Right Sidebar with Main Product Image, Gallery & Checked Category ('Drinkware- Sublimation & Custom')."
              imgHeight="h-[175px]"
            />
            <FigureBox
              src={ASSETS.fig3_4}
              label="Figure 3.4"
              caption="Publish Box Actions — Blue 'Update' Button & 'Move to Trash' Option for Catalog Cleanup."
              imgHeight="h-[175px]"
            />
          </div>

          <div className="space-y-2 mb-2 shrink-0">
            <Callout type="avoid" title="WHAT TO AVOID (CRITICAL PRICING & IMAGE RULES)">
              • <strong>Leaving Price Empty ($0 or Blank):</strong> Every product MUST have a price entered in the &quot;Regular price (CA$)&quot; box. If left empty, WooCommerce marks the product unavailable and the <strong>&quot;Add to Cart&quot;</strong> button completely disappears from the website.{" "}
              • <strong>Missing Product Image:</strong> Products published without a main image display on the shop page as a blank gray box.
            </Callout>
            <Callout type="alert" title="TROUBLESHOOTING ALERT">
              <strong>Issue:</strong> The &quot;Add to Cart&quot; button is missing on the product page.{" "}
              <strong>Fix:</strong> Go to <strong>Products &gt; All Products</strong>, edit the product, scroll to <strong>Product Data</strong>, and verify that a valid number is typed inside the <strong>&quot;Regular price (CA$)&quot;</strong> box. Click <strong>Update</strong>.
            </Callout>
          </div>

          <RunningFooter sectionName="3.2 PRODUCT IMAGES & CATEGORIES" pageNum={4} />
        </div>

        {/* ================= PAGE 5: ORDER FULFILLMENT & CUSTOMER PROCESSING ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <RunningHeader
            sectionMarker="4.0 ORDER FULFILLMENT & PROCESSING"
            subMarker="4.1 MANAGING & FULFILLING CUSTOMER ORDERS"
          />

          <SectionBanner
            code="SECTION 4.1"
            title="MANAGING & FULFILLING CUSTOMER ORDERS"
            objective="View incoming customer print orders, verify items and payment status, update fulfillment progress, and dispatch email notifications to buyers."
          />

          <div className="mb-2.5 shrink-0">
            <h3 className="text-[8pt] font-black uppercase tracking-wider text-[#052E16] mb-1">
              4.1.2 STEP-BY-STEP EXECUTION
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-slate-50 p-2.5 rounded border border-slate-200">
              <StepBadge num="1" title="Open Orders Dashboard">
                In the left sidebar, click <strong>WooCommerce &gt; Orders</strong>. <em>[Ref: Fig 4.1]</em>
              </StepBadge>
              <StepBadge num="4" title="Update Order Status">
                In the <strong>General</strong> box, click the <strong>Status</strong> dropdown <em>[Ref: Fig 4.2A]</em>: Select <strong>Processing</strong> once payment is verified and printing begins; select <strong>Completed</strong> once shipped.
              </StepBadge>
              <StepBadge num="2" title="View Orders Table">
                Locate the customer order row. Verify Order #, Customer Name, Date, Status pill, and Total ($). Click <strong>#5655 David Igweamaka</strong> to open details. <em>[Ref: Fig 4.1]</em>
              </StepBadge>
              <StepBadge num="5" title="Dispatch Email Notifications">
                Under <strong>Order actions</strong> (right panel), select <strong>Send order details to customer</strong> or <strong>Resend new order notification</strong> <em>[Ref: Fig 4.3]</em>, then click blue <strong>Update</strong>.
              </StepBadge>
              <div className="col-span-2 border-t border-slate-200 pt-1">
                <StepBadge num="3" title="Verify Order Items & Customer Contact">
                  Review ordered item, quantity, and total (e.g., <em>Custom Natural Cotton Tote Bag Bulk × 1 — CA$375.00</em>; click <strong>Recalculate</strong> if adjusted) and check customer email/phone in the General box. <em>[Ref: Fig 4.2A &amp; 4.2B]</em>
                </StepBadge>
              </div>
            </div>
          </div>

          {/* FIGURES 4.1, 4.2A, 4.2B, 4.3 */}
          <div className="grid grid-cols-4 gap-2 mb-2.5 shrink-0">
            <FigureBox
              src={ASSETS.fig4_1}
              label="Fig 4.1"
              caption="Orders Table (#5655 Highlighted)."
              imgHeight="h-[130px]"
            />
            <FigureBox
              src={ASSETS.fig4_2a}
              label="Fig 4.2A"
              caption="Order #5655 Status & Update."
              imgHeight="h-[130px]"
            />
            <FigureBox
              src={ASSETS.fig4_2b}
              label="Fig 4.2B"
              caption="Order Line Items & Recalculate."
              imgHeight="h-[130px]"
            />
            <FigureBox
              src={ASSETS.fig4_3}
              label="Fig 4.3"
              caption="Order Actions Notification Menu."
              imgHeight="h-[130px]"
            />
          </div>

          <div className="space-y-1.5 mb-2.5 shrink-0">
            <Callout type="expect" title="WHAT TO EXPECT ON LIVE WEBSITE">
              Changing an order status to <strong>&quot;Processing&quot;</strong> or <strong>&quot;Completed&quot;</strong> and clicking <strong>Update</strong> triggers an automatic email receipt sent directly to the customer&apos;s email address.
            </Callout>
            <Callout type="avoid" title="WHAT TO AVOID (CRITICAL)">
              • <strong>Forgetting to Click Update:</strong> Changing the Status dropdown without clicking the blue <strong>&quot;Update&quot;</strong> button will NOT save the new status, and no email will be sent.{" "}
              • <strong>Leaving Orders on &quot;On Hold&quot;:</strong> Orders must be updated to &quot;Processing&quot; or &quot;Completed&quot; so sales records remain accurate.
            </Callout>
            <Callout type="alert" title="TROUBLESHOOTING ALERT">
              <strong>Issue:</strong> Customer states they did not receive an order confirmation email.{" "}
              <strong>Fix:</strong> Open the order in <strong>WooCommerce &gt; Orders</strong>. In the right panel under <strong>&quot;Order actions&quot;</strong>, select <strong>&quot;Send order details to customer&quot;</strong> from the dropdown, then click the blue <strong>&quot;Update&quot;</strong> button.
            </Callout>
          </div>

          {/* OFFICIAL VERIFICATION & SIGN-OFF BLOCK */}
          <div className="border-t-2 border-[#052E16] pt-2.5 mt-auto mb-2 flex justify-between items-center shrink-0 bg-slate-50 px-3 py-2 rounded">
            <div>
              <p className="text-[8.5pt] font-black uppercase tracking-wider text-[#052E16]">
                END OF MASTER OPERATIONS MANUAL
              </p>
              <p className="text-[7.5pt] font-medium text-[#4B5563]">
                StayMedia • Unstoppable Prints Digital Administration
              </p>
            </div>
            <div className="text-center border-x border-slate-200 px-4">
              <p className="text-[6.5pt] font-mono uppercase tracking-widest text-slate-400">Architectural Approval</p>
              <p className="font-serif italic font-bold text-[10pt] text-[#111827]">
                Boluwatife Adeoye — Lead Technical Architect
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#052E16] text-white px-3 py-1.5 rounded border border-[#FCB52F]">
              <ShieldCheck size={14} className="text-[#FCB52F]" />
              <span className="text-[7pt] font-mono font-bold uppercase tracking-wider text-[#FDE047]">
                VERIFIED PRODUCTION STANDARD
              </span>
            </div>
          </div>

          <RunningFooter sectionName="4.0 ORDER FULFILLMENT & CUSTOMER PROCESSING" pageNum={5} />
        </div>
      </div>
    </div>
  );
}
