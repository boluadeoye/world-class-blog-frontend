"use client";
import { useState, useEffect } from "react";
import {
  Download, CheckCircle2, AlertTriangle, AlertCircle, ShieldCheck,
  Compass, Layers, Eye, EyeOff, ArrowLeft, BookOpen
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
            UNSTOPPABLE PRINTS // SIMPLE WEBSITE HANDBOOK
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
          <div className="font-mono text-[7pt] text-slate-400">UNSTOPPABLE PRINTS STOREFRONT</div>
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
            WHAT THIS IS FOR:
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
      "Loading Easy Website Guide...",
      "Setting Up Simple Instructions...",
      "Preparing 12 Screen Pictures...",
      "Handbook Ready to Download."
    ];
    if (loadingStep < steps.length) {
      const timer = setTimeout(() => setLoadingStep((p) => p + 1), 400);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [loadingStep]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "UNSTOPPABLE_PRINTS_EASY_WEBSITE_GUIDE";
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

      {/* === VIEW A: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/50 via-slate-950 to-slate-950" />

        <div className="relative z-10 w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-emerald-800/50 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-[#052E16] border-2 border-[#FCB52F] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-emerald-950/60">
            <BookOpen size={30} className="text-[#FCB52F]" />
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-700/50 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-emerald-300 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0EA34A] animate-ping" />
            UNSTOPPABLE PRINTS MANUAL
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1">
            Easy Website Guide
          </h1>
          <p className="text-slate-400 text-xs font-mono mb-6">
            Simple Step-by-Step Instructions for Managing Your Online Store
          </p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-black/60 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 mb-4">
              <p>&gt; Loading guide...</p>
              <p>&gt; {loadingStep >= 1 ? "Simple English instructions ready..." : "..."}</p>
              <p>&gt; {loadingStep >= 2 ? "12 helpful screen pictures loaded..." : "..."}</p>
              <p className="text-[#FCB52F] animate-pulse">&gt; {loadingStep >= 3 ? "READY TO PRINT (5 PAGES)..." : "..."}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-3 bg-[#0EA34A] hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-xl transition-all transform hover:scale-[1.01] shadow-xl shadow-emerald-900/30 uppercase tracking-wider text-sm"
              >
                <Download size={18} />
                <span>Download Simple PDF Guide (5 Pages)</span>
              </button>

              <button
                onClick={() => setShowScreenPreview(!showScreenPreview)}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-xl border border-slate-700 transition-all text-xs uppercase tracking-wider"
              >
                {showScreenPreview ? <EyeOff size={15} /> : <Eye size={15} />}
                <span>{showScreenPreview ? "Hide Preview on Screen" : "Read the 5 Pages on Screen"}</span>
              </button>
            </div>
          )}

          <Link href="/" className="inline-flex items-center gap-1.5 mt-6 text-xs text-slate-500 hover:text-slate-300 font-mono">
            <ArrowLeft size={13} /> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW B: THE 5-PAGE DOCUMENT === */}
      <div
        id="print-container"
        className={`${
          showScreenPreview
            ? "block py-10 space-y-10 bg-slate-900 print:py-0 print:space-y-0 print:bg-white"
            : "hidden print:block"
        } w-[210mm] mx-auto bg-white`}
      >
        {/* ================= PAGE 1: HOW TO LOG IN TO YOUR WEBSITE ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <div className="w-full h-2.5 flex mb-4 shrink-0">
            <div className="w-2/3 bg-[#052E16]" />
            <div className="w-1/3 bg-[#FCB52F]" />
          </div>

          <div className="flex justify-between items-center border-b-2 border-[#052E16] pb-3 mb-3 shrink-0">
            <div>
              <p className="text-[8pt] font-mono font-bold uppercase tracking-[0.22em] text-[#4B5563] mb-1">
                UNSTOPPABLE PRINTS // EASY STEP-BY-STEP GUIDE
              </p>
              <h1 className="text-[22pt] font-black uppercase tracking-tight text-[#111827] leading-none">
                WEBSITE OWNER&apos;S HANDBOOK
              </h1>
              <p className="text-[9.5pt] font-semibold text-[#0EA34A] mt-1">
                Simple Steps to Add Products, Publish Stories, and Handle Customer Orders
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
              <span>WHAT IS IN THIS GUIDE</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[8.5pt]">
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-1">
                <span className="font-bold text-[#111827]">1.0 How to Log In to Your Website</span>
                <span className="font-mono font-black text-[#052E16] bg-white px-1.5 py-0.5 rounded text-[7.5pt] border border-slate-200">PAGE 1</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-1">
                <span className="font-bold text-[#111827]">3.0 Adding Items to Sell &amp; Setting Prices</span>
                <span className="font-mono font-black text-[#052E16] bg-white px-1.5 py-0.5 rounded text-[7.5pt] border border-slate-200">PAGE 3-4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#111827]">2.0 Writing Blog Posts &amp; Guides</span>
                <span className="font-mono font-black text-[#052E16] bg-white px-1.5 py-0.5 rounded text-[7.5pt] border border-slate-200">PAGE 2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#111827]">4.0 Seeing Customer Orders &amp; Sending Receipts</span>
                <span className="font-mono font-black text-[#052E16] bg-white px-1.5 py-0.5 rounded text-[7.5pt] border border-slate-200">PAGE 5</span>
              </div>
            </div>
          </div>

          <SectionBanner
            code="PART 1"
            title="HOW TO LOG IN TO YOUR WEBSITE"
            objective="This part shows you how to log in from your computer or phone so you can manage your website, add products, and see customer orders."
          />

          <div className="mb-3 shrink-0">
            <h3 className="text-[8.5pt] font-black uppercase tracking-wider text-[#052E16] mb-1.5">
              FOLLOW THESE 4 SIMPLE STEPS:
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-slate-50 p-2.5 rounded border border-slate-200">
              <StepBadge num="1" title="Open Your Browser">
                Open Chrome, Safari, or whatever browser you use on your phone or computer.
              </StepBadge>
              <StepBadge num="2" title="Go to This Link">
                Type this exact address in the top bar:{" "}
                <span className="font-mono font-bold text-[#052E16] bg-[#E8F7ED] px-1.5 py-0.5 rounded border border-[#0EA34A]/40 text-[8pt]">
                  https://unstoppableprints.ca/wp-admin
                </span>
              </StepBadge>
              <StepBadge num="3" title="Type Login Details">
                Type in your assigned <strong>Username</strong> and <strong>Password</strong> in the login boxes.
              </StepBadge>
              <StepBadge num="4" title="Click Log In">
                Click the blue <strong>&quot;Log In&quot;</strong> button to enter your website control panel.
              </StepBadge>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 mb-3 items-stretch shrink-0">
            <div className="col-span-7">
              <FigureBox
                src={ASSETS.fig1_1}
                label="Picture 1.1"
                caption="This is what the website control screen looks like after you log in."
                imgHeight="h-[165px]"
              />
            </div>
            <div className="col-span-5 bg-[#052E16] text-white rounded p-3 flex flex-col justify-between border-t-4 border-[#FCB52F]">
              <div>
                <h4 className="text-[8.5pt] font-black uppercase tracking-wider text-[#FCB52F] mb-2 flex items-center gap-1.5">
                  <Compass size={13} /> The 4 Main Menu Buttons
                </h4>
                <p className="text-[7.5pt] text-emerald-100/90 mb-2.5 leading-snug">
                  On the dark black bar on the left side, these are the 4 buttons you will use the most:
                </p>
                <ul className="space-y-2 text-[8pt]">
                  <li className="bg-white/10 p-1.5 rounded border-l-2 border-[#0EA34A]">
                    <strong className="text-[#FDE047]">Posts:</strong> Click here to write or edit blog stories and guides.
                  </li>
                  <li className="bg-white/10 p-1.5 rounded border-l-2 border-[#0EA34A]">
                    <strong className="text-[#FDE047]">Media:</strong> Look at or upload pictures and photos.
                  </li>
                  <li className="bg-white/10 p-1.5 rounded border-l-2 border-[#0EA34A]">
                    <strong className="text-[#FDE047]">WooCommerce:</strong> Click here to see what customers ordered.
                  </li>
                  <li className="bg-white/10 p-1.5 rounded border-l-2 border-[#0EA34A]">
                    <strong className="text-[#FDE047]">Products:</strong> Click here to add new items for sale and set prices.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-2 shrink-0">
            <Callout type="expect" title="WHAT YOU WILL SEE">
              After clicking Log In, you will land on the main screen. The dark black menu on the left side gives you access to everything (Posts, Products, Orders).
            </Callout>
            <Callout type="avoid" title="WHAT TO WATCH OUT FOR">
              Always use the exact link <span className="font-mono font-bold">https://unstoppableprints.ca/wp-admin</span> to log in. Do not use random links so your account stays safe and you don&apos;t get locked out.
            </Callout>
          </div>

          <RunningFooter sectionName="1.0 HOW TO LOG IN TO YOUR WEBSITE" pageNum={1} />
        </div>

        {/* ================= PAGE 2: WRITING & PUBLISHING BLOG POSTS ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <RunningHeader
            sectionMarker="PART 2: BLOG STORIES & ARTICLES"
            subMarker="HOW TO WRITE & PUBLISH NEW POSTS"
          />

          <SectionBanner
            code="PART 2"
            title="HOW TO ADD BLOG POSTS & ARTICLES"
            objective="This part shows you how to add news, helpful printing guides, and stories to your live website blog."
          />

          <div className="mb-2.5 shrink-0">
            <h3 className="text-[8pt] font-black uppercase tracking-wider text-[#052E16] mb-1">
              FOLLOW THESE 6 SIMPLE STEPS:
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-slate-50 p-2.5 rounded border border-slate-200">
              <StepBadge num="1" title="Open Post Maker">
                On the left menu, click <strong>Posts</strong>, then click <strong>Add Post</strong> to write a new article. <em>[Look at Picture 2.1A]</em>
              </StepBadge>
              <StepBadge num="4" title="Add a Main Picture">
                On the right side, click <strong>Set Featured Image</strong> and choose a nice photo from your computer or phone. <em>[Look at Picture 2.2]</em>
              </StepBadge>
              <StepBadge num="2" title="Type the Headline">
                Click <strong>&quot;Add title&quot;</strong> at the top and type the headline of your article. <em>[Look at Picture 2.1B]</em>
              </StepBadge>
              <StepBadge num="5" title="Pick the Topic Box">
                On the right side, scroll to <strong>Categories</strong> and check the box that fits your post (for example: <strong>Guides</strong>).
              </StepBadge>
              <StepBadge num="3" title="Write Your Story">
                Click the big white space below the title. Type your words, paragraphs, and bullet points directly. <em>[Look at Picture 2.1B]</em>
              </StepBadge>
              <StepBadge num="6" title="Save Your Article">
                <strong>On Computer:</strong> Click the blue <strong>Save</strong> or <strong>Update</strong> button at top-right. <strong>On Phone:</strong> Tap <strong>[X]</strong> to close the sidebar, then tap blue <strong>Save</strong>.
              </StepBadge>
            </div>
          </div>

          {/* PICTURES 2.1A, 2.1B, 2.2 */}
          <div className="grid grid-cols-3 gap-2.5 mb-2.5 shrink-0">
            <FigureBox
              src={ASSETS.fig2_1a}
              label="Picture 2.1A"
              caption="Click the blue 'Add Post' button at the top to start writing."
              imgHeight="h-[150px]"
            />
            <FigureBox
              src={ASSETS.fig2_1b}
              label="Picture 2.1B"
              caption="Type your headline at the top, then type your words in the space below."
              imgHeight="h-[150px]"
            />
            <FigureBox
              src={ASSETS.fig2_2}
              label="Picture 2.2"
              caption="The right side panel where you pick your cover picture and category."
              imgHeight="h-[150px]"
            />
          </div>

          <div className="space-y-2 mb-2 shrink-0">
            <Callout type="expect" title="WHAT WILL HAPPEN ON YOUR WEBSITE">
              As soon as you save, your article shows up on your website blog page with its picture, headline, and date. When visitors click it, they can read the full story.
            </Callout>
            <Callout type="avoid" title="COMMON MISTAKES TO AVOID">
              • <strong>Forgetting the Picture:</strong> If you don&apos;t pick a picture, your story will look ugly with an empty gray box on the website.{" "}
              • <strong>Forgetting to Pick a Category:</strong> If you don&apos;t check a box like &quot;Guides&quot;, the website will mark it &quot;Uncategorized&quot; and visitors might not find it.
            </Callout>
            <Callout type="alert" title="EASY PHONE FIX">
              <strong>Can&apos;t see the blue Save button on your phone?</strong> Tap the small <strong>[X]</strong> mark in the top right corner of the gray menu to close it. The blue <strong>Save</strong> button will appear right away at the very top.
            </Callout>
          </div>

          <RunningFooter sectionName="2.0 HOW TO ADD BLOG POSTS & ARTICLES" pageNum={2} />
        </div>

        {/* ================= PAGE 3: ADDING PRODUCTS & SETTING PRICES ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <RunningHeader
            sectionMarker="PART 3: STORE ITEMS &amp; PRICING"
            subMarker="HOW TO ADD NEW PRODUCTS &amp; SET PRICES"
          />

          <SectionBanner
            code="PART 3"
            title="HOW TO ADD NEW PRODUCTS & SET PRICES"
            objective="This part shows you how to put new items up for sale (like Tumblers, Bags, Banners) and set what customers will pay."
          />

          <div className="mb-3 shrink-0">
            <h3 className="text-[8pt] font-black uppercase tracking-wider text-[#052E16] mb-1.5">
              FOLLOW THESE 5 SIMPLE STEPS:
            </h3>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5">
              <StepBadge num="1" title="Open the Item Maker">
                On the left menu, click <strong>Products</strong>, then click <strong>Add New</strong> to make a new item.
              </StepBadge>
              <StepBadge num="2" title="Type the Item Name">
                Click the top line that says <strong>&quot;Product name&quot;</strong> and type the name of the item (for example: <em>&quot;Sublimation 20oz Tumblers&quot;</em>). <em>[Look at Picture 3.1]</em>
              </StepBadge>
              <StepBadge num="3" title="Type Item Details">
                Scroll down to the <strong>&quot;Product description&quot;</strong> box. Type care instructions, size, or details (for example: <em>&quot;Use: Hot &amp; Cold&quot;</em>). <em>[Look at Picture 3.1]</em>
              </StepBadge>
              <StepBadge num="4" title="Type the Price">
                Scroll down to the <strong>Product data</strong> box <em>[Look at Picture 3.2]</em>. Find the box that says <strong>&quot;Regular price (CA$)&quot;</strong> and type the price (for example: <span className="font-mono font-bold text-[#052E16]">29.99</span>).
              </StepBadge>
              <StepBadge num="5" title="Click the Blue Update Button">
                Look at the right side panel and click the blue <strong>&quot;Update&quot;</strong> or <strong>&quot;Publish&quot;</strong> button to put it on the website. <em>[Look at Picture 3.2]</em>
              </StepBadge>
            </div>
          </div>

          {/* PICTURES 3.1 & 3.2 */}
          <div className="grid grid-cols-2 gap-3 mb-3 shrink-0">
            <FigureBox
              src={ASSETS.fig3_1}
              label="Picture 3.1"
              caption="Type the item name at the top and type the details in the box below."
              imgHeight="h-[175px]"
            />
            <FigureBox
              src={ASSETS.fig3_2}
              label="Picture 3.2"
              caption="Type the price in the box (29.99) and click the blue Update button."
              imgHeight="h-[175px]"
            />
          </div>

          <div className="space-y-2 mb-2 shrink-0">
            <Callout type="expect" title="WHAT YOUR CUSTOMERS WILL SEE">
              The item will immediately appear in your online shop with its picture, name, and price (<strong>CA$29.99</strong>). Customers can click on it and tap <strong>&quot;Add to Cart&quot;</strong> to buy it.
            </Callout>
            <Callout type="avoid" title="SUPER IMPORTANT: DO NOT TYPE DOLLAR SIGNS">
              Just type numbers and a dot for the price (like <span className="font-mono font-bold">29.99</span>). Do not type <span className="font-mono font-bold">$</span> or <span className="font-mono font-bold">CA$</span> inside the price box, or the website will get confused.
            </Callout>
          </div>

          <RunningFooter sectionName="3.0 HOW TO ADD PRODUCTS & SET PRICES" pageNum={3} />
        </div>

        {/* ================= PAGE 4: PRODUCT PICTURES & CATEGORIES ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <RunningHeader
            sectionMarker="PART 3: STORE ITEMS (CONTINUED)"
            subMarker="HOW TO ADD PICTURES &amp; PICK CATEGORIES"
          />

          <SectionBanner
            code="PART 3.2"
            title="ADDING PRODUCT PICTURES & CATEGORIES"
            objective="This part shows you how to put photos on your products so customers can see what they are buying, and put them in the right shop section."
          />

          <div className="mb-3 shrink-0">
            <h3 className="text-[8pt] font-black uppercase tracking-wider text-[#052E16] mb-1.5">
              FOLLOW THESE 4 SIMPLE STEPS:
            </h3>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5">
              <StepBadge num="1" title="Put the Main Picture">
                Look on the right side for the <strong>&quot;Product image&quot;</strong> box <em>[Look at Picture 3.3]</em>. Click <strong>&quot;Set product image&quot;</strong>, pick a clear photo of the item, and click the blue button to set it.
              </StepBadge>
              <StepBadge num="2" title="Add Extra Photos (If You Have Any)">
                Right below the main picture, click <strong>&quot;Add product gallery images&quot;</strong> if you want to show different angles or close-up photos.
              </StepBadge>
              <StepBadge num="3" title="Check the Category Box">
                On the right side, find <strong>&quot;Product categories&quot;</strong> <em>[Look at Picture 3.3]</em>. Check the box that matches your item (for example: <strong>&quot;Drinkware- Sublimation &amp; Custom&quot;</strong>). Uncheck &quot;Uncategorized&quot;.
              </StepBadge>
              <StepBadge num="4" title="Save Your Work (Or Delete Item)">
                Scroll up on the right side and click the blue <strong>&quot;Update&quot;</strong> button to save. If you ever want to completely delete an old item, click red <strong>&quot;Move to Trash&quot;</strong> <em>[Look at Picture 3.4]</em>.
              </StepBadge>
            </div>
          </div>

          {/* PICTURES 3.3 & 3.4 */}
          <div className="grid grid-cols-2 gap-3 mb-3 shrink-0">
            <FigureBox
              src={ASSETS.fig3_3}
              label="Picture 3.3"
              caption="The right side panel where you pick the main picture and check the category box."
              imgHeight="h-[175px]"
            />
            <FigureBox
              src={ASSETS.fig3_4}
              label="Picture 3.4"
              caption="The blue Update button saves your changes. The red Move to Trash link deletes old items."
              imgHeight="h-[175px]"
            />
          </div>

          <div className="space-y-2 mb-2 shrink-0">
            <Callout type="avoid" title="WHAT HAPPENS IF YOU LEAVE THE PRICE EMPTY?">
              <strong>NEVER LEAVE THE PRICE BOX BLANK!</strong> If you forget to type a price, the website will hide the <strong>&quot;Add to Cart&quot;</strong> button completely, and customers will not be able to buy the item!
            </Callout>
            <Callout type="alert" title="EASY TROUBLESHOOTING FIX">
              <strong>Is the &quot;Add to Cart&quot; button missing on your website?</strong> Don&apos;t panic! Just edit the product, scroll down to the <strong>Regular price (CA$)</strong> box, type the price in numbers (like 29.99), and click the blue <strong>Update</strong> button. The buy button will come right back!
            </Callout>
          </div>

          <RunningFooter sectionName="3.2 PRODUCT PICTURES & CATEGORIES" pageNum={4} />
        </div>

        {/* ================= PAGE 5: CHECKING ORDERS & EMAILING CUSTOMERS ================= */}
        <div className="sop-page w-[210mm] h-[296.5mm] p-[11mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col">
          <RunningHeader
            sectionMarker="PART 4: CUSTOMER ORDERS"
            subMarker="HOW TO HANDLE ORDERS &amp; SEND RECEIPTS"
          />

          <SectionBanner
            code="PART 4"
            title="HOW TO HANDLE CUSTOMER ORDERS"
            objective="This part shows you how to see what people ordered, check their payment, mark when their items are ready or shipped, and email them receipts."
          />

          <div className="mb-2.5 shrink-0">
            <h3 className="text-[8pt] font-black uppercase tracking-wider text-[#052E16] mb-1">
              FOLLOW THESE 5 SIMPLE STEPS:
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-slate-50 p-2.5 rounded border border-slate-200">
              <StepBadge num="1" title="See All Orders">
                On the left menu, click <strong>WooCommerce</strong>, then click <strong>Orders</strong>. <em>[Look at Picture 4.1]</em>
              </StepBadge>
              <StepBadge num="4" title="Change the Order Status">
                In the <strong>General</strong> box, click the <strong>Status</strong> box <em>[Look at Picture 4.2A]</em>. Pick <strong>Processing</strong> when making the item, or <strong>Completed</strong> when you ship it out.
              </StepBadge>
              <StepBadge num="2" title="Click an Order">
                Find the order you want to see. Click the customer name or order number (like <strong>#5655 David Igweamaka</strong>). <em>[Look at Picture 4.1]</em>
              </StepBadge>
              <StepBadge num="5" title="Email Receipt to Customer">
                On the right side under <strong>Order actions</strong>, choose <strong>Send order details to customer</strong> <em>[Look at Picture 4.3]</em>, then click the blue <strong>Update</strong> button.
              </StepBadge>
              <div className="col-span-2 border-t border-slate-200 pt-1">
                <StepBadge num="3" title="Check What They Bought">
                  Look at the item list to see what they purchased, how many, and the total money (example: <em>Tote Bag × 1 — CA$375.00</em>). Check their phone and email in the General box. <em>[Look at Pictures 4.2A &amp; 4.2B]</em>
                </StepBadge>
              </div>
            </div>
          </div>

          {/* PICTURES 4.1, 4.2A, 4.2B, 4.3 */}
          <div className="grid grid-cols-4 gap-2 mb-2.5 shrink-0">
            <FigureBox
              src={ASSETS.fig4_1}
              label="Pic 4.1"
              caption="The list of orders. Click order #5655."
              imgHeight="h-[130px]"
            />
            <FigureBox
              src={ASSETS.fig4_2a}
              label="Pic 4.2A"
              caption="Change status box & click Update."
              imgHeight="h-[130px]"
            />
            <FigureBox
              src={ASSETS.fig4_2b}
              label="Pic 4.2B"
              caption="Check the items and the total money."
              imgHeight="h-[130px]"
            />
            <FigureBox
              src={ASSETS.fig4_3}
              label="Pic 4.3"
              caption="Pick Send order details to email receipt."
              imgHeight="h-[130px]"
            />
          </div>

          <div className="space-y-1.5 mb-2.5 shrink-0">
            <Callout type="expect" title="WHAT HAPPENS WHEN YOU UPDATE AN ORDER">
              When you change the status to <strong>&quot;Processing&quot;</strong> or <strong>&quot;Completed&quot;</strong> and click <strong>Update</strong>, the website automatically sends an email receipt straight to the customer&apos;s email!
            </Callout>
            <Callout type="avoid" title="DON'T FORGET THIS STEP">
              <strong>Always remember to click the blue Update button!</strong> If you change the status dropdown but don&apos;t click Update, the website will not save your change and no email will be sent to the customer.
            </Callout>
            <Callout type="alert" title="DID THE CUSTOMER NOT GET AN EMAIL?">
              <strong>Easy fix:</strong> Open their order, look on the right side under <strong>Order actions</strong>, choose <strong>Send order details to customer</strong> from the list, and click the blue <strong>Update</strong> button.
            </Callout>
          </div>

          {/* APPROVAL & SIGN-OFF BLOCK */}
          <div className="border-t-2 border-[#052E16] pt-2.5 mt-auto mb-2 flex justify-between items-center shrink-0 bg-slate-50 px-3 py-2 rounded">
            <div>
              <p className="text-[8.5pt] font-black uppercase tracking-wider text-[#052E16]">
                END OF EASY WEBSITE GUIDE
              </p>
              <p className="text-[7.5pt] font-medium text-[#4B5563]">
                Unstoppable Prints Website Simple Operations Standard
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
                APPROVED SIMPLE STANDARD
              </span>
            </div>
          </div>

          <RunningFooter sectionName="4.0 HOW TO HANDLE CUSTOMER ORDERS" pageNum={5} />
        </div>
      </div>
    </div>
  );
}
