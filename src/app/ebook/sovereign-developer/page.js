"use client";
import { useState, useEffect } from "react";
import { 
  Download, BookOpen, Terminal, Cpu, Globe, 
  Database, Server, Bot, Youtube, Code2, 
  Lightbulb, ArrowRight, Layers, MonitorSmartphone,
  CheckCircle2, Folder, ExternalLink, HelpCircle
} from "lucide-react";
import Link from "next/link";

export default function WebDevBeginnerHandbook() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Web_Development_Handbook_Beginner_Guide";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 antialiased subpixel-antialiased">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #handbook-render, #handbook-render * { visibility: visible; }
          #handbook-render { position: absolute; left: 0; top: 0; width: 210mm; background: #FFFFFF; }
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
          .page-num::after { counter-increment: pageCounter; content: counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-none border-t-8 border-[#0F172A]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center p-3 border border-slate-200">
            <BookOpen size={32} className="text-[#0F172A]" />
          </div>

          <h1 className="font-playfair text-2xl font-black text-[#0F172A] mb-2 uppercase tracking-widest">Web Dev Handbook</h1>
          <p className="font-inter text-[#ca8a04] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">15-Page Comprehensive Guide</p>

          {!isReady ? (
            <div className="text-slate-500 font-mono text-xs animate-pulse">PREPARING MANUSCRIPT...</div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Extract 15-Page PDF Guide
            </button>
          )}
          
          <Link href="/" className="block mt-8 text-xs text-slate-500 hover:text-slate-800 uppercase tracking-widest">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE 15-PAGE HANDBOOK (Print Only) === */}
      <div id="handbook-render" className="hidden print:block text-slate-800">
        
        {/* PAGE 1: COVER PAGE */}
        <div className="a4-page">
          <div className="flex h-3 w-full absolute top-0 left-0 z-10">
            <div className="bg-[#0F172A] w-1/2"></div><div className="bg-[#ca8a04] w-1/4"></div><div className="bg-[#991b1b] w-1/4"></div>
          </div>
          
          <main className="grow flex flex-col justify-between pt-16">
            <div>
              <p className="font-mono text-[10px] font-bold text-[#ca8a04] uppercase tracking-[0.4em] mb-4">Complete Beginner Curriculum</p>
              <h1 className="font-playfair text-5xl font-black text-[#0F172A] uppercase tracking-tight leading-[1.1] mb-6">
                Web Development<br/>Handbook: From<br/>Zero to Production
              </h1>
              <div className="h-1 w-28 bg-[#991b1b] mb-8"></div>
              <p className="font-inter text-sm font-semibold text-slate-600 uppercase tracking-wider max-w-md leading-relaxed">
                A Comprehensive Guide to HTML, CSS, JavaScript, React, Vite, Tooling, and AI Workflows
              </p>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#0F172A] p-6 mb-8">
              <p className="font-inter text-[10px] font-black uppercase text-[#0F172A] tracking-widest mb-2">Notice for the Reader</p>
              <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
                This manual is structured specifically for individuals with zero prior programming experience. It breaks down complex technical systems using practical real-world analogies, detailed step-by-step setup guides, and practical AI workflow practices.
              </p>
            </div>

            <div className="border-t-2 border-slate-200 pt-6 flex justify-between items-end">
              <div>
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Author &amp; Instructor</p>
                <p className="font-inter text-base font-black text-[#0F172A] uppercase">Adeoye Boluwatife</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Version</p>
                <p className="font-mono text-xs font-bold text-[#991b1b]">2026.1.0 (Beginner Standard)</p>
              </div>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 2: TABLE OF CONTENTS */}
        <div className="a4-page">
          <PageHeader title="CURRICULUM ROADMAP" pageNum="2" />
          <main className="grow flex flex-col justify-center">
            <h2 className="font-playfair text-4xl font-black text-[#0F172A] uppercase mb-8 border-b-2 border-slate-200 pb-3">Table of Contents</h2>
            <div className="grid grid-cols-1 gap-3 font-inter text-xs">
              <TocItem num="01" title="What is Web Development? (The Core Foundations)" page="03" />
              <TocItem num="02" title="The Developer's Toolkit (Setup & Installation)" page="04" />
              <TocItem num="03" title="The Command Line (Terminal Mastery)" page="05" />
              <TocItem num="04" title="HTML5: Building the Structural Skeleton" page="06" />
              <TocItem num="05" title="CSS3: Designing the Visual Experience" page="07" />
              <TocItem num="06" title="Tailwind CSS: Modern Utility-First Styling" page="08" />
              <TocItem num="07" title="JavaScript: Bringing Pages to Life" page="09" />
              <TocItem num="08" title="Asynchronous JS & Connecting to APIs" page="10" />
              <TocItem num="09" title="React & Vite: Building Component Architectures" page="11" />
              <TocItem num="10" title="AI for Developers: Gemini & Claude Workflows" page="12" />
              <TocItem num="11" title="Version Control with Git & GitHub" page="13" />
              <TocItem num="12" title="Deployment with Vercel: Going Live" page="14" />
              <TocItem num="13" title="First Project Checklist & Recommended Resources" page="15" />
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 3: WHAT IS WEB DEVELOPMENT? */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 1 // THE CORE FOUNDATIONS" pageNum="3" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">01. What is Web Development?</h2>
            
            <div className="bg-amber-50/50 border-l-4 border-[#ca8a04] p-5">
              <p className="font-inter text-xs font-black uppercase text-[#ca8a04] tracking-widest mb-2">The House Construction Analogy</p>
              <p className="font-inter text-xs leading-relaxed text-slate-800 text-justify">
                Building a website is exactly like building a house from scratch:
                <br/><br/>
                • <strong>HTML (The Bricks &amp; Foundation):</strong> Provides the physical layout—walls, doors, windows, and structural rooms. Without HTML, there is nothing on the page.
                <br/>
                • <strong>CSS (The Paint &amp; Interior Design):</strong> Controls the colors, wallpapers, furniture placement, and overall appearance. It turns raw cement into a beautiful living space.
                <br/>
                • <strong>JavaScript (The Electricity &amp; Plumbing):</strong> Makes things functional. When you flip a switch, the light turns on. When you click a button on a website, JavaScript opens a menu or sends a message.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5">
              <p className="font-inter text-xs font-black uppercase text-[#0F172A] tracking-widest mb-2">The Restaurant Analogy (Client vs. Server vs. Database)</p>
              <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
                When you open a website on your phone or laptop, three entities work together:
                <br/><br/>
                1. <strong>The Client (The Customer in the Dining Room):</strong> This is your web browser (Chrome, Safari). You look at the menu (UI) and place an order.
                <br/>
                2. <strong>The Server (The Waiter):</strong> The waiter takes your order, carries it back to the kitchen, waits for the meal to be prepared, and brings it back to your table.
                <br/>
                3. <strong>The Database (The Kitchen &amp; Pantry):</strong> Where all ingredients (user accounts, passwords, posts, photos) are stored safely until needed.
              </p>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 4: THE TOOLKIT */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 2 // THE DEVELOPER'S TOOLKIT" pageNum="4" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">02. Setting Up Your Work Environment</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              Before writing code, professionals install industry-standard tools. Do not use plain notepad applications; install these exact software packages:
            </p>

            <div className="space-y-4">
              <div className="border border-slate-200 p-4 rounded bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <Code2 size={16} className="text-[#991b1b]" />
                  <h3 className="font-inter text-sm font-bold text-[#0F172A]">1. Visual Studio Code (VS Code)</h3>
                </div>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  VS Code is a free, powerful code editor built by Microsoft. It provides syntax highlighting (coloring code so it is easy to read), auto-completion, and instant error detection.
                  <br/><strong>Essential Extensions to Install:</strong> <em>Prettier</em> (auto-formats messy code) and <em>Tailwind CSS IntelliSense</em>.
                </p>
              </div>

              <div className="border border-slate-200 p-4 rounded bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <Server size={16} className="text-[#991b1b]" />
                  <h3 className="font-inter text-sm font-bold text-[#0F172A]">2. Node.js (The JavaScript Engine)</h3>
                </div>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  Browsers natively run JavaScript. However, <strong>Node.js</strong> allows your local computer terminal to run JavaScript tools and install third-party packages using <strong>NPM (Node Package Manager)</strong>. Download the <em>LTS (Long Term Support)</em> version from nodejs.org.
                </p>
              </div>

              <div className="border border-slate-200 p-4 rounded bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <Globe size={16} className="text-[#991b1b]" />
                  <h3 className="font-inter text-sm font-bold text-[#0F172A]">3. Modern Web Browser &amp; DevTools</h3>
                </div>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  Google Chrome or Brave. Right-clicking any webpage and choosing <strong>Inspect</strong> opens Developer Tools. This allows you to inspect elements, test CSS changes, and view JavaScript console error logs live.
                </p>
              </div>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 5: THE TERMINAL */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 3 // COMMAND LINE MASTERY" pageNum="5" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">03. The Command Line (Terminal)</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              The terminal (Command Prompt on Windows, Terminal on Mac/Linux, or Termux on Android) is a direct text interface to your computer operating system. Instead of clicking icons with a mouse, you type precise text commands.
            </p>

            <div className="bg-[#0F172A] text-white p-5 rounded font-mono text-xs space-y-3">
              <p className="text-[#ca8a04] font-bold">// Essential Terminal Commands You Must Memorize:</p>
              
              <div>
                <span className="text-emerald-400 font-bold">$ pwd</span>
                <p className="text-slate-400 text-[10px] pl-4">"Print Working Directory" - Tells you exactly which folder you are currently standing inside.</p>
              </div>

              <div>
                <span className="text-emerald-400 font-bold">$ ls</span>
                <p className="text-slate-400 text-[10px] pl-4">"List" - Displays all files and sub-folders located inside your current folder.</p>
              </div>

              <div>
                <span className="text-emerald-400 font-bold">$ cd [folder_name]</span>
                <p className="text-slate-400 text-[10px] pl-4">"Change Directory" - Moves you inside a specific folder. Example: <span className="text-white">cd my-project</span></p>
              </div>

              <div>
                <span className="text-emerald-400 font-bold">$ cd ..</span>
                <p className="text-slate-400 text-[10px] pl-4">Moves you backward out of the current folder into the parent folder above it.</p>
              </div>

              <div>
                <span className="text-emerald-400 font-bold">$ mkdir [new_folder_name]</span>
                <p className="text-slate-400 text-[10px] pl-4">"Make Directory" - Creates a brand-new empty folder on your computer storage.</p>
              </div>
            </div>
          </main>
          <PageFooter />
        </div>
        {/* PAGE 6: HTML5 */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 4 // HTML5 STRUCTURE" pageNum="6" />
          <main className="grow flex flex-col gap-5">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">04. HTML5: Building the Skeleton</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              HTML stands for <strong>HyperText Markup Language</strong>. It uses "Tags" wrapped in angle brackets to define content elements on a web page.
            </p>

            <div className="bg-slate-50 border border-slate-200 p-4">
              <h3 className="font-inter text-xs font-bold text-[#0F172A] mb-2 uppercase">Semantic vs. Non-Semantic HTML</h3>
              <p className="font-inter text-xs text-slate-600 leading-relaxed">
                A non-semantic tag like <code className="bg-slate-200 px-1">&lt;div&gt;</code> tells us nothing about its content. 
                Semantic tags explicitly tell both the browser and search engines what data they hold:
                <br/><br/>
                • <code className="text-[#991b1b] font-bold">&lt;header&gt;</code>: Top navigation and logo area.
                <br/>
                • <code className="text-[#991b1b] font-bold">&lt;main&gt;</code>: The primary unique content of the page.
                <br/>
                • <code className="text-[#991b1b] font-bold">&lt;article&gt;</code> / <code className="text-[#991b1b] font-bold">&lt;section&gt;</code>: Self-contained narrative sections.
                <br/>
                • <code className="text-[#991b1b] font-bold">&lt;footer&gt;</code>: Bottom page details, copyright, and secondary links.
              </p>
            </div>

            <div className="bg-[#0F172A] p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#ca8a04] mb-2">// Standard HTML Document Structure:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Website</title>
  </head>
  <body>
    <header>
      <h1>Welcome to My Site</h1>
    </header>
    <main>
      <p>This is where my main content lives.</p>
    </main>
  </body>
</html>`}
              </pre>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 7: CSS3 & BOX MODEL */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 5 // CSS3 & THE BOX MODEL" pageNum="7" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">05. CSS3: Designing the Experience</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              CSS (Cascading Style Sheets) specifies fonts, colors, dimensions, and positioning for HTML elements.
            </p>

            <div className="border-2 border-[#0F172A] p-6 bg-slate-50 text-center relative">
              <p className="font-inter text-xs font-black text-[#0F172A] uppercase tracking-widest mb-4">The CSS Box Model Diagram</p>
              <div className="border-2 border-dashed border-slate-400 p-6 bg-amber-50/50 relative">
                <span className="font-mono text-[9px] font-bold text-amber-800 uppercase block mb-2">Margin (Space Outside Element)</span>
                <div className="border-2 border-[#991b1b] p-6 bg-slate-100 relative">
                  <span className="font-mono text-[9px] font-bold text-[#991b1b] uppercase block mb-2">Border (The Edge Line)</span>
                  <div className="border border-slate-300 p-6 bg-white">
                    <span className="font-mono text-[9px] font-bold text-blue-600 uppercase block mb-2">Padding (Space Inside Element)</span>
                    <div className="bg-[#0F172A] text-white p-3 font-mono text-xs font-bold">Content Text / Image</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-inter text-xs leading-relaxed text-slate-600 text-justify">
              Understanding the difference between <strong>Margin</strong> (pushes away neighboring elements) and <strong>Padding</strong> (expands internal spacing inside the border) is the key to mastering web layout alignment.
            </p>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 8: TAILWIND CSS */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 6 // TAILWIND CSS UTILITIES" pageNum="8" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">06. Tailwind CSS: Modern Styling</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              In traditional web development, you write HTML in one file and custom CSS rules in another file. This causes constant switching between files and leads to bloated, unmaintainable stylesheets.
              <br/><br/>
              <strong>Tailwind CSS</strong> changes this by providing pre-built utility classes that you apply directly inside your markup.
            </p>

            <div className="bg-[#0F172A] p-5 rounded font-mono text-xs text-slate-300 space-y-4">
              <p className="text-[#ca8a04] font-bold">// How Tailwind Utility Classes Translate:</p>
              
              <div className="border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">flex flex-col items-center</span>
                <p className="text-slate-400 text-[10px] mt-1">Arranges elements vertically in a straight centered line.</p>
              </div>

              <div className="border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">bg-slate-900 text-white</span>
                <p className="text-slate-400 text-[10px] mt-1">Sets a deep charcoal background color and crisp white text color.</p>
              </div>

              <div className="border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">p-6 gap-4 rounded-xl</span>
                <p className="text-slate-400 text-[10px] mt-1">Adds 24px internal padding, 16px space between items, and rounded corners.</p>
              </div>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 9: JAVASCRIPT FUNDAMENTALS */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 7 // JAVASCRIPT LOGIC" pageNum="9" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">07. JavaScript: Bringing Pages to Life</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              JavaScript is the programming language that gives interactive life to static HTML layouts. It stores user data, calculates math, handles button clicks, and communicates with servers.
            </p>

            <div className="bg-[#0F172A] p-5 rounded font-mono text-[11px] text-slate-300 space-y-3">
              <p className="text-[#ca8a04] font-bold">// Variables &amp; Functions Example:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`// 1. Storing data in variables
const studentName = "Mayowa";
let score = 85;

// 2. Creating a functional decision rule
function checkGrade(userScore) {
  if (userScore >= 80) {
    return "Pass with Distinction";
  } else {
    return "Needs Improvement";
  }
}

// 3. Executing the function
const result = checkGrade(score);
console.log(result); // Outputs: "Pass with Distinction"`}
              </pre>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 10: ASYNC JS & APIS */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 8 // ASYNC JS & APIS" pageNum="10" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">08. Asynchronous JavaScript &amp; APIs</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              An <strong>API (Application Programming Interface)</strong> is a messenger that lets your application fetch live data from external servers (e.g., getting live weather updates or payment confirmations).
              <br/><br/>
              Because network requests take time to travel across the internet, JavaScript handles them <strong>Asynchronously</strong> (without freezing your screen while waiting).
            </p>

            <div className="bg-[#0F172A] p-5 rounded font-mono text-[10px] text-slate-300">
              <p className="text-[#ca8a04] mb-2">// Fetching Live API Data with Async / Await:</p>
              <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
{`async function fetchUserData() {
  try {
    // Wait for response from the remote server
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Network request failed:", error);
  }
}`}
              </pre>
            </div>
          </main>
          <PageFooter />
        </div>
        {/* PAGE 11: REACT & VITE */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 9 // REACT & VITE" pageNum="11" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">09. React &amp; Vite: Modern Frameworks</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              Writing complex apps in raw HTML/JS becomes messy. <strong>React</strong> allows you to split your web interface into independent, reusable <strong>Components</strong> (like Lego blocks).
              <br/><br/>
              <strong>Vite</strong> is the modern, ultra-fast build engine used to create new React projects in seconds by running <code className="bg-slate-200 px-1 text-slate-900 font-bold">npm create vite@latest</code> in your terminal.
            </p>

            <div className="bg-slate-50 border border-slate-200 p-5">
              <h3 className="font-inter text-xs font-bold text-[#0F172A] mb-2 uppercase">Understanding State (useState)</h3>
              <p className="font-inter text-xs text-slate-600 leading-relaxed">
                "State" is the memory of a React component. When the state value changes (for instance, when a user increments an item counter), React automatically updates the screen UI instantly without refreshing the webpage.
              </p>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 12: AI FOR DEVELOPERS */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 10 // AI CO-PILOT WORKFLOWS" pageNum="12" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">10. AI for Developers (Gemini &amp; Claude)</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              In modern software development, AI tools like <strong>Gemini</strong> and <strong>Claude</strong> act as your dedicated Senior Engineers. They assist in debugging errors, writing boilerplate code, and explaining complex concepts.
            </p>

            <div className="bg-amber-50/60 border-l-4 border-[#ca8a04] p-5">
              <p className="font-inter text-xs font-black uppercase text-[#ca8a04] tracking-widest mb-2">Effective AI Prompting Rules</p>
              <p className="font-inter text-xs leading-relaxed text-slate-800">
                1. <strong>Do Not Say:</strong> "Fix my broken code." (This teaches you nothing).
                <br/><br/>
                2. <strong>Say Instead:</strong> "I am getting a TypeError on line 14 of my React component. Here is the code snippet and the exact error log. Explain why this error occurred and guide me step-by-step on how to fix it."
              </p>
            </div>

            <div className="border border-slate-200 p-4 rounded bg-slate-50">
              <h3 className="font-inter text-xs font-bold text-[#0F172A] mb-1">Introducing Cursor IDE</h3>
              <p className="font-inter text-xs text-slate-600 leading-relaxed">
                Cursor is an AI-first fork of VS Code. It allows you to highlight any section of code and press <code className="bg-slate-200 px-1 font-bold">Cmd+K</code> or <code className="bg-slate-200 px-1 font-bold">Ctrl+K</code> to ask questions or generate modifications directly inside your editor.
              </p>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 13: GIT & GITHUB */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 11 // VERSION CONTROL" pageNum="13" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">11. Version Control with Git &amp; GitHub</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              <strong>Git</strong> is a version control system (a time machine for your source code). If you make a mistake, Git allows you to revert back to a point when your app was working smoothly. <strong>GitHub</strong> is the cloud website where your Git repositories are stored and showcased.
            </p>

            <div className="bg-[#0F172A] p-5 rounded font-mono text-xs text-slate-300 space-y-3">
              <p className="text-[#ca8a04] font-bold">// The 4-Step Git Push Command Sequence:</p>
              <p><span className="text-emerald-400 font-bold">$ git init</span> &rarr; Initializes Git tracking inside your local project folder.</p>
              <p><span className="text-emerald-400 font-bold">$ git add .</span> &rarr; Stages all changed files for saving.</p>
              <p><span className="text-emerald-400 font-bold">$ git commit -m "Message"</span> &rarr; Saves a snapshot checkpoint with a clear description.</p>
              <p><span className="text-emerald-400 font-bold">$ git push</span> &rarr; Uploads the committed snapshots to your GitHub cloud repository.</p>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 14: DEPLOYMENT WITH VERCEL */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 12 // GOING LIVE" pageNum="14" />
          <main className="grow flex flex-col gap-6">
            <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight">12. Deployment with Vercel</h2>
            
            <p className="font-inter text-xs leading-relaxed text-slate-700 text-justify">
              Code residing on your personal computer cannot be viewed by the public. <strong>Vercel</strong> connects directly to your GitHub account, reads your React/Next.js source code, builds it automatically, and deploys it to a live worldwide web link.
            </p>

            <div className="bg-slate-50 border-l-4 border-[#0F172A] p-5 space-y-3">
              <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] tracking-wider">Automated Deployment Workflow</h3>
              <p className="font-inter text-xs leading-relaxed text-slate-700">
                1. Create a free account on Vercel.com and link your GitHub profile.
                <br/>
                2. Select <strong>Add New Project</strong> and choose your repository.
                <br/>
                3. Click <strong>Deploy</strong>. Vercel automatically generates a live, SSL-secured URL.
                <br/>
                4. Every time you push new code updates to GitHub in the future, Vercel rebuilds and updates your live site automatically!
              </p>
            </div>
          </main>
          <PageFooter />
        </div>

        {/* PAGE 15: CHECKLIST & RESOURCES */}
        <div className="a4-page">
          <PageHeader title="CHAPTER 13 // ROADMAP TO MASTERY" pageNum="15" />
          <main className="grow flex flex-col justify-between">
            <div>
              <h2 className="font-inter text-2xl font-black text-[#0F172A] uppercase tracking-tight mb-6">13. Your First Project &amp; Recommended Resources</h2>
              
              <div className="bg-slate-50 border border-slate-200 p-5 mb-6">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-2">First Project Milestone</h3>
                <p className="font-inter text-xs text-slate-700 leading-relaxed">
                  Build a <strong>Personal Responsive Portfolio Website</strong> containing your biography, list of skills, and links to your projects. Deploy it live on Vercel and share the link on LinkedIn!
                </p>
              </div>

              <h3 className="font-inter text-xs font-black uppercase text-[#991b1b] tracking-wider mb-3">Curated Free Learning Channels:</h3>
              <div className="space-y-3 font-inter text-xs">
                <div className="p-3 border rounded border-slate-200 flex items-center gap-3">
                  <Youtube size={20} className="text-red-600 shrink-0"/>
                  <div><p className="font-bold text-slate-900">Fireship</p><p className="text-[10px] text-slate-500">Fast, high-density 100-second tool explanations.</p></div>
                </div>
                <div className="p-3 border rounded border-slate-200 flex items-center gap-3">
                  <Youtube size={20} className="text-red-600 shrink-0"/>
                  <div><p className="font-bold text-slate-900">Web Dev Simplified</p><p className="text-[10px] text-slate-500">In-depth, clear explanations of React &amp; JavaScript concepts.</p></div>
                </div>
                <div className="p-3 border rounded border-slate-200 flex items-center gap-3">
                  <Youtube size={20} className="text-red-600 shrink-0"/>
                  <div><p className="font-bold text-slate-900">The Net Ninja</p><p className="text-[10px] text-slate-500">Step-by-step complete playlist courses for absolute beginners.</p></div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-6">
              <p className="font-playfair text-lg italic text-[#0F172A] mb-2">"The journey of a thousand miles begins with a single line of code."</p>
              <p className="font-inter text-xs font-black uppercase text-[#ca8a04]">Adeoye Boluwatife // Lead Instructor</p>
            </div>
          </main>
          <PageFooter />
        </div>

      </div>
    </div>
  );
}

function PageHeader({ title, pageNum }) {
  return (
    <header className="border-b-2 border-slate-200 pb-3 mb-6 flex justify-between items-end relative z-10">
      <div>
        <p className="font-mono text-[7px] font-bold text-slate-400 uppercase tracking-widest">BEGINNER WEB DEVELOPMENT HANDBOOK</p>
        <h2 className="font-inter text-[10px] font-black text-[#0F172A] tracking-wider uppercase mt-0.5">{title}</h2>
      </div>
      <span className="font-inter text-xs font-black text-[#0F172A]">PAGE {pageNum}</span>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="border-t-2 border-slate-200 pt-3 mt-auto flex justify-between items-center relative z-10 bg-white">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">© 2026 ADEOYE BOLUWATIFE // ALL RIGHTS RESERVED</span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#0F172A]"></div>
        <div className="w-1.5 h-1.5 bg-[#ca8a04]"></div>
        <div className="w-1.5 h-1.5 bg-[#991b1b]"></div>
      </div>
    </footer>
  );
}

function TocItem({ num, title, page }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-bold text-[#ca8a04]">{num}</span>
        <span className="font-inter text-xs font-bold text-slate-800 uppercase">{title}</span>
      </div>
      <span className="font-mono text-xs font-bold text-slate-400">{page}</span>
    </div>
  );
}
