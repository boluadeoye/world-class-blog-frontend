"use client";
import { useState, useEffect } from "react";
import { 
  Download, CheckCircle2, AlertTriangle, AlertOctagon, 
  ExternalLink, Layers, ShoppingBag, Video, Image as ImageIcon, 
  FileText, Lock, Globe, ShieldCheck, ArrowRight, BookOpen
} from "lucide-react";
import Link from "next/link";

export default function StayMediaManual() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "StayMedia_Z2_Master_Operations_Manual_2026";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-[#1E5631] selection:text-white antialiased">
      
      {/* IMPORT HIGH-FIDELITY TYPOGRAPHY */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR PRINT STYLESHEET === */}
      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0; 
          }
          body { 
            background: #FFFFFF !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            counter-reset: pageCounter;
          }
          body * { visibility: hidden; }
          #manual-print-container, #manual-print-container * { visibility: visible; }
          #manual-print-container { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm; 
            background: #FFFFFF; 
          }
          .a4-page { 
            height: 297mm; 
            width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background: #FFFFFF; 
            box-sizing: border-box; 
            overflow: hidden; 
            display: flex; 
            flex-direction: column; 
            justify-content: space-between;
            padding: 14mm 16mm 12mm 16mm;
          }
          .page-num::after {
            counter-increment: pageCounter;
            content: "PAGE " counter(pageCounter) " OF 5";
          }
          .no-print { display: none !important; }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .thin-border { border: 0.5pt solid #E2E8F0; }
      `}</style>

      {/* === VIEW 1: THE INTERACTIVE PORTAL (Screen View) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1E5631]/30 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-10 text-center shadow-2xl border-t-8 border-[#1E5631]">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#1E5631]/10 rounded-2xl flex items-center justify-center border border-[#1E5631]/20 shadow-inner">
            <BookOpen size={36} className="text-[#1E5631]" />
          </div>

          <div className="inline-block bg-[#FFC107]/20 border border-[#FFC107] text-[#1E5631] px-3 py-1 rounded-full font-mono text-[9px] font-black uppercase tracking-widest mb-3">
            Ultra-Detailed Edition // 2026
          </div>

          <h1 className="font-inter text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">StayMedia Master Document</h1>
          <p className="font-inter text-slate-500 text-xs tracking-wider uppercase mb-8">Z2 Concepts Operations Manual</p>

          <div className="grid grid-cols-2 gap-3 text-left mb-8 font-inter text-[11px] bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-700"><CheckCircle2 size={14} className="text-[#1E5631]"/> 4 Core Modules</div>
            <div className="flex items-center gap-2 text-slate-700"><CheckCircle2 size={14} className="text-[#1E5631]"/> 9 Verified UI Anchors</div>
            <div className="flex items-center gap-2 text-slate-700"><CheckCircle2 size={14} className="text-[#1E5631]"/> Full Troubleshooting</div>
            <div className="flex items-center gap-2 text-slate-700"><CheckCircle2 size={14} className="text-[#1E5631]"/> Print-Ready A4 PDF</div>
          </div>

          {!isReady ? (
            <div className="text-slate-400 font-mono text-xs animate-pulse">PREPARING ASSET MANIFEST...</div>
          ) : (
            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 bg-[#1E5631] hover:bg-[#153f24] text-white font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl shadow-[#1E5631]/30"
            >
              <Download size={18} />
              <span>Download Master Manual (PDF)</span>
            </button>
          )}

          <Link href="/" className="block mt-6 text-xs font-mono text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-widest">
            &larr; Return to Base
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE 5-PAGE MASTER MANUAL (Print Engine) === */}
      <div id="manual-print-container" className="hidden print:block text-slate-800">
        
        {/* ========================================================================= */}
        {/* PAGE 1: TITLE, EXECUTIVE TOC & SECTION 1: COMMAND CENTER ACCESS           */}
        {/* ========================================================================= */}
        <div className="a4-page">
          {/* Top Brand Ribbon */}
          <div className="w-full flex h-2 absolute top-0 left-0">
            <div className="bg-[#1E5631] w-2/3"></div>
            <div className="bg-[#FFC107] w-1/3"></div>
          </div>

          <div className="pt-2">
            {/* Header Identity */}
            <header className="flex justify-between items-start border-b-2 border-slate-200 pb-4 mb-4">
              <div>
                <p className="font-mono text-[8px] font-black uppercase tracking-[0.3em] text-[#1E5631] mb-0.5">StayMedia // Standard Operating Procedure</p>
                <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-slate-900 leading-none">
                  Master Operations Manual
                </h1>
                <p className="font-inter text-[10px] font-semibold text-slate-500 mt-1">Z2 Concepts Digital Ecosystem Management</p>
              </div>
              <div className="text-right">
                <span className="bg-[#1E5631] text-white px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-widest rounded-sm inline-block">
                  REF: STAYMEDIA-SOP-2026
                </span>
                <p className="font-mono text-[8px] text-slate-400 mt-1">ISSUED: MARCH 2026</p>
              </div>
            </header>

            {/* Table of Contents Modular Grid */}
            <section className="mb-5 bg-slate-50 border border-slate-200 rounded-lg p-3">
              <h2 className="font-inter text-[9px] font-black uppercase tracking-[0.2em] text-[#1E5631] mb-2 flex items-center gap-1.5">
                <Layers size={12} className="text-[#1E5631]" /> Table of Contents &amp; Quick Index
              </h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-inter text-[9px] text-slate-700">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <span><strong>1.0</strong> System Access &amp; Command Center</span>
                  <span className="font-mono font-bold text-[#1E5631]">PG 1</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <span><strong>3.0</strong> The Print Shop (Variable Products)</span>
                  <span className="font-mono font-bold text-[#1E5631]">PG 4</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <span><strong>2.0</strong> Editorial Journal &amp; Cinema Engine</span>
                  <span className="font-mono font-bold text-[#1E5631]">PG 2-3</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <span><strong>4.0</strong> The Visual Archive (Gallery)</span>
                  <span className="font-mono font-bold text-[#1E5631]">PG 5</span>
                </div>
              </div>
            </section>

            {/* SECTION 1: SYSTEM ACCESS & COMMAND CENTER */}
            <section className="space-y-3">
              <div className="border-l-4 border-[#1E5631] pl-3">
                <span className="font-mono text-[8px] font-black text-[#1E5631] uppercase tracking-widest">Section 1.0</span>
                <h2 className="font-inter text-base font-black uppercase text-slate-900 leading-tight">System Access &amp; Command Center</h2>
              </div>

              <div>
                <h3 className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">1.1 Objective &amp; Overview</h3>
                <p className="font-inter text-[10px] leading-relaxed text-slate-700 text-justify">
                  The Command Center is the central administration panel where all content, products, and media are managed for the entire StayMedia &amp; Z2 Concepts digital storefront.
                </p>
              </div>

              <div>
                <h3 className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">1.2 Step-by-Step Access Execution</h3>
                <div className="space-y-1.5 font-inter text-[10px] text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-[#1E5631] text-white rounded-full flex items-center justify-center font-mono text-[8px] font-bold shrink-0 mt-0.5">1</span>
                    <p>Open any standard web browser on desktop or mobile.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-[#1E5631] text-white rounded-full flex items-center justify-center font-mono text-[8px] font-bold shrink-0 mt-0.5">2</span>
                    <p>Navigate directly to the admin gateway endpoint: <code className="font-mono font-bold text-[#1E5631] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">https://admin.z2concepts.com/wp-admin</code></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-[#1E5631] text-white rounded-full flex items-center justify-center font-mono text-[8px] font-bold shrink-0 mt-0.5">3</span>
                    <p>Enter your administrative <strong>Username</strong> and <strong>Password</strong> credentials.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-[#1E5631] text-white rounded-full flex items-center justify-center font-mono text-[8px] font-bold shrink-0 mt-0.5">4</span>
                    <p>Click <strong>Log In</strong>.</p>
                  </div>
                </div>
              </div>

              {/* Callout Blocks for Section 1 */}
              <div className="space-y-2 pt-1">
                <SuccessBlock 
                  title="What to Expect"
                  content="Upon logging in, you will see the main WordPress Dashboard. The black navigation sidebar on the left gives access to all site modules (Posts, Products, Gallery)."
                />
                <WarningBlock 
                  title="What to Avoid"
                  content="Do not attempt to log in using the public website URL (z2concepts.com/wp-admin). Always use admin.z2concepts.com/wp-admin to avoid security lockout blocks."
                />
              </div>
            </section>
          </div>

          <FooterSection section="1.0 SYSTEM ACCESS" />
        </div>

        {/* ========================================================================= */}
        {/* PAGE 2: SECTION 2.1 — EDITORIAL JOURNAL (WRITTEN ARTICLES)                */}
        {/* ========================================================================= */}
        <div className="a4-page">
          <HeaderSection section="2.0 EDITORIAL JOURNAL &amp; CINEMA" sub="2.1 WRITTEN ARTICLES" />

          <main className="grow space-y-3">
            <div className="border-l-4 border-[#1E5631] pl-3">
              <span className="font-mono text-[8px] font-black text-[#1E5631] uppercase tracking-widest">Section 2.1</span>
              <h2 className="font-inter text-base font-black uppercase text-slate-900 leading-tight">Publishing Standard Written Articles</h2>
            </div>

            <div>
              <h3 className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-wider mb-0.5">A. Objective</h3>
              <p className="font-inter text-[10px] text-slate-700">Publish written news, editorial pieces, and brand stories to the live Journal page (<code className="font-mono text-[#1E5631] font-bold">/blog</code>).</p>
            </div>

            <div>
              <h3 className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">B. Step-by-Step Execution</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-inter text-[9.5px] text-slate-700">
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold text-[#1E5631]">1.</span>
                  <p>In the left navigation sidebar, click <strong>Posts</strong>.</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold text-[#1E5631]">2.</span>
                  <p>From the flyout menu, click <strong>Add Post</strong>.</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold text-[#1E5631]">3.</span>
                  <p>Enter headline into the <strong>Title</strong> field.</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold text-[#1E5631]">4.</span>
                  <p>Paste text into the body editor.</p>
                </div>
                <div className="flex items-start gap-1.5 col-span-2">
                  <span className="font-mono font-bold text-[#1E5631]">5.</span>
                  <p>In right panel, click <strong>Set Featured Image</strong> and upload high-res cover photo.</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold text-[#1E5631]">6.</span>
                  <p>Under <strong>Categories</strong>, check <strong>Blog</strong>.</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-mono font-bold text-[#1E5631]">7.</span>
                  <p>Click blue <strong>Publish</strong> button.</p>
                </div>
              </div>
            </div>

            {/* Figures 2.1 & 2.2 Dual Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786970953/blog_assets/cju4ln7o3bmzml7gvblz.png"
                caption="Figure 2.1: Navigating to New Post Screen via Left Sidebar."
              />
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786971076/blog_assets/zbc4c9euoybx960bwgec.png"
                caption="Figure 2.2: Uploading and Setting the Cover Photo."
              />
            </div>

            {/* Callout Blocks */}
            <div className="space-y-2 pt-1">
              <SuccessBlock 
                title="What to Expect on Live Website"
                content="The article immediately renders on the /blog page as a card featuring your cover photo, title, date, and excerpt. Clicking the card opens the full story page."
              />
              <WarningBlock 
                title="What to Avoid &amp; Pitfalls"
                content="• Skipping Featured Image: Story card renders with a blank gray box. • Skipping Category: Article defaults to 'Uncategorized' and will not appear on the main Journal page."
              />
              <AlertBlock 
                issue="Article shows HTML code like &#8217; instead of apostrophes."
                fix="Ensure you are typing directly into the editor rather than pasting formatted text from external word processors."
              />
            </div>
          </main>

          <FooterSection section="2.1 WRITTEN ARTICLES" />
        </div>

        {/* ========================================================================= */}
        {/* PAGE 3: SECTION 2.2 — CINEMA ENGINE (BTS YOUTUBE VIDEOS)                  */}
        {/* ========================================================================= */}
        <div className="a4-page">
          <HeaderSection section="2.0 EDITORIAL JOURNAL &amp; CINEMA" sub="2.2 BTS VIDEOS" />

          <main className="grow space-y-3">
            <div className="border-l-4 border-[#1E5631] pl-3">
              <span className="font-mono text-[8px] font-black text-[#1E5631] uppercase tracking-widest">Section 2.2</span>
              <h2 className="font-inter text-base font-black uppercase text-slate-900 leading-tight">Publishing Behind-the-Scenes (BTS) YouTube Videos</h2>
            </div>

            <div>
              <h3 className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-wider mb-0.5">A. Objective</h3>
              <p className="font-inter text-[10px] text-slate-700">Embed YouTube video productions directly into the Journal and homepage video slider.</p>
            </div>

            <div>
              <h3 className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">B. Step-by-Step Execution</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-inter text-[9.5px] text-slate-700">
                <div className="flex items-start gap-1.5"><span className="font-mono font-bold text-[#1E5631]">1.</span><p>Go to <strong>Posts</strong> &gt; <strong>Add Post</strong>.</p></div>
                <div className="flex items-start gap-1.5"><span className="font-mono font-bold text-[#1E5631]">2.</span><p>Enter video title in <strong>Title</strong> field.</p></div>
                <div className="flex items-start gap-1.5 col-span-2"><span className="font-mono font-bold text-[#1E5631]">3.</span><p>Scroll down below main text box to the section labeled <strong>Video Data</strong>.</p></div>
                <div className="flex items-start gap-1.5 col-span-2"><span className="font-mono font-bold text-[#1E5631]">4.</span><p>Paste full YouTube link (e.g., <code className="font-mono text-[#1E5631] text-[8.5px]">https://www.youtube.com/watch?v=...</code>) into <strong>Video URL</strong> box.</p></div>
                <div className="flex items-start gap-1.5"><span className="font-mono font-bold text-[#1E5631]">5.</span><p>Under <strong>Categories</strong>, check <strong>BTS</strong>.</p></div>
                <div className="flex items-start gap-1.5"><span className="font-mono font-bold text-[#1E5631]">6.</span><p>(Optional) Check <strong>Featured</strong> for homepage slider.</p></div>
                <div className="flex items-start gap-1.5"><span className="font-mono font-bold text-[#1E5631]">7.</span><p>Set <strong>Featured Image</strong> (video thumbnail).</p></div>
                <div className="flex items-start gap-1.5"><span className="font-mono font-bold text-[#1E5631]">8.</span><p>Click <strong>Publish</strong>.</p></div>
              </div>
            </div>

            {/* Figure 2.3 Frame */}
            <div className="w-full pt-1">
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786971165/blog_assets/qwqju6choly8nwly8zry.png"
                caption="Figure 2.3: Entering Title, YouTube URL, and Assigning the BTS Category."
                tall={true}
              />
            </div>

            {/* Callout Blocks */}
            <div className="space-y-2 pt-1">
              <SuccessBlock 
                title="What to Expect on Live Website"
                content="• On /blog, post renders with a Play Icon overlay. • Clicking opens the article with a responsive HD YouTube player embedded at top. • If Featured is checked, video appears in homepage slider and auto-pauses when played."
              />
              <WarningBlock 
                title="What to Avoid"
                content="• Forgetting 'BTS' Category: Post will treat content as standard article and omit Play Icon and video embed. • Pasting Embed Code: Do not paste <iframe> HTML code into Video URL box. Paste only raw URL."
              />
            </div>
          </main>

          <FooterSection section="2.2 BTS YOUTUBE VIDEOS" />
        </div>

        {/* ========================================================================= */}
        {/* PAGE 4: SECTION 3 — THE PRINT SHOP (VARIABLE PRODUCTS & PRICING)          */}
        {/* ========================================================================= */}
        <div className="a4-page">
          <HeaderSection section="3.0 THE PRINT SHOP" sub="VARIABLE FRAME PRODUCTS" />

          <main className="grow space-y-3">
            <div className="border-l-4 border-[#1E5631] pl-3">
              <span className="font-mono text-[8px] font-black text-[#1E5631] uppercase tracking-widest">Section 3.0</span>
              <h2 className="font-inter text-base font-black uppercase text-slate-900 leading-tight">The Print Shop (Variable Frame Products)</h2>
            </div>

            {/* 3.1 Product Init */}
            <div className="space-y-1">
              <h3 className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-wider">3.1 Product Initialization &amp; Type Selection</h3>
              <p className="font-inter text-[9.5px] text-slate-700"><strong>A. Objective:</strong> Create print products (e.g., Alu-Dibond, Canvas) offering multiple selectable sizes.</p>
              <div className="grid grid-cols-2 gap-2 font-inter text-[9px] text-slate-700 pt-0.5">
                <p>1. Go to <strong>Products</strong> &gt; <strong>Add New</strong>.</p>
                <p>2. Enter product title (e.g., <em>Alu-Dibond</em>).</p>
                <p>3. Scroll to <strong>Product Data</strong> panel in center.</p>
                <p>4. Select <strong>Variable Product</strong> from dropdown.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-0.5">
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786971215/blog_assets/abmc79pvdy1bxmxs4yee.png"
                caption="Figure 3.1: Changing Product Data from Simple to Variable Product."
              />
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786971294/blog_assets/zmuw9osrehldycwlbpag.jpg"
                caption="Figure 3.2: Expanding Size Variations to Enter Mandatory Regular Price."
              />
            </div>

            {/* 3.2 Variations & Pricing */}
            <div className="space-y-1">
              <h3 className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-wider">3.2 Size Variation &amp; Mandatory Pricing Rules</h3>
              <p className="font-inter text-[9.5px] text-slate-700"><strong>A. Objective:</strong> Assign dimensions (20x30, 30x40) and mandatory prices for each size.</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-inter text-[9px] text-slate-700">
                <p>1. In <strong>Attributes</strong>, select <strong>Size</strong> &gt; <strong>Add</strong> &gt; Check <strong>Used for Variations</strong> &gt; <strong>Save</strong>.</p>
                <p>2. Click <strong>Variations</strong> tab &gt; Click specific variation (e.g., <code className="font-mono">#4656 30x40</code>).</p>
                <p>3. Enter cost in <strong>Regular Price ($)</strong> field.</p>
                <p>4. Repeat for all sizes &gt; Click <strong>Update / Publish</strong>.</p>
              </div>
            </div>

            {/* Critical Callouts */}
            <div className="space-y-2 pt-1">
              <SuccessBlock 
                title="What to Expect on Live Website"
                content="Storefront product page renders size selection buttons (e.g., 30x20, 30x40) below price. Selecting a size dynamically updates price and enables 'Add to Cart' button."
              />
              <WarningBlock 
                title="What to Avoid (CRITICAL)"
                content="Leaving Price Empty: Every single size variation MUST have a price in Regular Price ($). If one size is blank, WooCommerce marks it unavailable and the 'Add to Cart' button completely disappears."
              />
              <AlertBlock 
                issue="'Add to Cart' button is missing on the product page."
                fix="Go to Products > Edit Product > Variations, expand every size, and verify that no Regular Price ($) field is left empty."
              />
            </div>
          </main>

          <FooterSection section="3.0 THE PRINT SHOP" />
        </div>

        {/* ========================================================================= */}
        {/* PAGE 5: SECTION 4 — THE VISUAL ARCHIVE (PORTFOLIO & GALLERY)               */}
        {/* ========================================================================= */}
        <div className="a4-page">
          <HeaderSection section="4.0 THE VISUAL ARCHIVE" sub="PORTFOLIO &amp; GALLERY" />

          <main className="grow space-y-2.5">
            <div className="border-l-4 border-[#1E5631] pl-3">
              <span className="font-mono text-[8px] font-black text-[#1E5631] uppercase tracking-widest">Section 4.0</span>
              <h2 className="font-inter text-base font-black uppercase text-slate-900 leading-tight">The Visual Archive (Portfolio &amp; Gallery)</h2>
            </div>

            {/* 4.1 Project Creation */}
            <div className="space-y-0.5">
              <h3 className="font-inter text-[9.5px] font-black uppercase text-slate-500 tracking-wider">4.1 Project Creation &amp; Media Asset Uploads</h3>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 font-inter text-[9px] text-slate-700">
                <p>1. Go to <strong>Gallery</strong> &gt; <strong>Add Post</strong>.</p>
                <p>2. Enter project title (e.g., <em>The Kefee Editorial</em>).</p>
                <p>3. Enter project credits into body text editor.</p>
                <p>4. Click <strong>Add Media</strong> &gt; Upload photos &gt; <strong>Insert into Post</strong>.</p>
              </div>
            </div>

            {/* Dual Grid Figures 4.1 & 4.2 */}
            <div className="grid grid-cols-2 gap-2.5">
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786971443/blog_assets/ccacqpockfhjikrkbjn8.png"
                caption="Figure 4.1: Accessing Portfolio Gallery Module."
                compact={true}
              />
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786971595/blog_assets/mt2n7dyhxc6gknrzskl2.png"
                caption="Figure 4.2: Entering Title and Inserting Photos."
                compact={true}
              />
            </div>

            {/* 4.2 Categorization */}
            <div className="space-y-0.5">
              <h3 className="font-inter text-[9.5px] font-black uppercase text-slate-500 tracking-wider">4.2 Gallery Categorization &amp; Live Filter Alignment</h3>
              <p className="font-inter text-[8.5px] text-slate-700">In right panel under <strong>Gallery Categories</strong>, check category (e.g., <strong>Modeling</strong>, <strong>Weddings</strong>) &gt; Click <strong>Publish</strong>.</p>
            </div>

            {/* Dual Grid Figures 4.3 & 4.4 */}
            <div className="grid grid-cols-2 gap-2.5">
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786971605/blog_assets/fwg7yiflhq6uwx6tzwjf.png"
                caption="Figure 4.3: Category Checkbox Panel."
                compact={true}
              />
              <ImageContainer 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1786971613/blog_assets/w1mflurwgjhwxn0tc1wz.png"
                caption="Figure 4.4: Complete Gallery Panel Layout."
                compact={true}
              />
            </div>

            {/* Final Callout & Troubleshooting */}
            <div className="space-y-1.5">
              <WarningBlock 
                title="What to Avoid"
                content="Do not type plain text file names into the editor. You must click Add Media and insert actual image files."
              />
              <SuccessBlock 
                title="What to Expect on Live Website"
                content="On /gallery, project appears inside fluid grid. Category tabs dynamically filter the display instantly."
              />
              <AlertBlock 
                issue="Project appears under 'All' but disappears when clicking a filter tab."
                fix="Edit the gallery post and verify that a category checkbox is marked under Gallery Categories."
              />
            </div>

            {/* Master End Sign-off */}
            <div className="border-t-2 border-[#1E5631] pt-2 flex justify-between items-center font-inter text-[8px]">
              <div>
                <p className="font-black uppercase text-[#1E5631] tracking-widest">End of Master Operations Manual</p>
                <p className="text-slate-400">StayMedia &bull; Z2 Concepts Digital Administration</p>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1E5631]" />
                <span className="font-mono font-bold text-slate-700 uppercase">Verified Production Standard</span>
              </div>
            </div>
          </main>

          <FooterSection section="4.0 THE VISUAL ARCHIVE" />
        </div>

      </div>
    </div>
  );
}

// === REUSABLE DESIGN SYSTEM COMPONENTS ===

function HeaderSection({ section, sub }) {
  return (
    <header className="flex justify-between items-center border-b border-slate-200 pb-2 mb-3 relative z-10">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-[#1E5631]">{section}</span>
        <span className="text-slate-300 font-bold">&bull;</span>
        <span className="font-inter text-[8px] font-bold text-slate-500 uppercase tracking-widest">{sub}</span>
      </div>
      <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest">StayMedia SOP</span>
    </header>
  );
}

function FooterSection({ section }) {
  return (
    <footer className="border-t border-slate-200 pt-2 flex justify-between items-center font-mono text-[8px] text-slate-400 uppercase tracking-widest relative z-10 bg-white">
      <span>Z2 Concepts &bull; {section}</span>
      <span className="page-num font-bold text-[#1E5631]"></span>
    </footer>
  );
}

function SuccessBlock({ title, content }) {
  return (
    <div className="bg-[#1E5631]/5 border-l-4 border-[#1E5631] p-2 rounded-r-md">
      <p className="font-inter text-[8.5px] font-black uppercase tracking-wider text-[#1E5631] flex items-center gap-1.5 mb-0.5">
        <CheckCircle2 size={11} className="text-[#1E5631]" /> {title}
      </p>
      <p className="font-inter text-[8.5px] text-slate-700 leading-snug text-justify">{content}</p>
    </div>
  );
}

function WarningBlock({ title, content }) {
  return (
    <div className="bg-[#FFC107]/15 border-l-4 border-[#FFC107] p-2 rounded-r-md">
      <p className="font-inter text-[8.5px] font-black uppercase tracking-wider text-[#B45309] flex items-center gap-1.5 mb-0.5">
        <AlertTriangle size={11} className="text-[#D97B0C]" /> {title}
      </p>
      <p className="font-inter text-[8.5px] text-slate-800 leading-snug text-justify">{content}</p>
    </div>
  );
}

function AlertBlock({ issue, fix }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-600 p-2 rounded-r-md">
      <p className="font-inter text-[8.5px] font-black uppercase tracking-wider text-red-700 flex items-center gap-1.5 mb-0.5">
        <AlertOctagon size={11} className="text-red-600" /> Troubleshooting Alert
      </p>
      <p className="font-inter text-[8.5px] text-red-900 leading-snug">
        <strong className="text-red-950">Issue:</strong> {issue} <br />
        <strong className="text-red-950">Fix:</strong> {fix}
      </p>
    </div>
  );
}

function ImageContainer({ src, caption, tall = false, compact = false }) {
  return (
    <div className="border border-[#1E5631] bg-white p-1 rounded-sm shadow-sm flex flex-col items-center">
      <div className={`w-full overflow-hidden flex items-center justify-center bg-slate-100 ${tall ? 'h-[62mm]' : compact ? 'h-[30mm]' : 'h-[44mm]'}`}>
        <img 
          src={src} 
          alt={caption} 
          className="w-full h-full object-contain"
          crossOrigin="anonymous"
        />
      </div>
      <p className="font-inter text-[7px] font-bold text-slate-600 italic text-center mt-1 px-1 line-clamp-1">
        {caption}
      </p>
    </div>
  );
}
