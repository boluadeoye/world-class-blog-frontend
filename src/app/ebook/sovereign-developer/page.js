"use client";
import { useState, useEffect } from "react";
import { 
  Download, Terminal, Cpu, Globe, Database, Server, Bot, 
  Youtube, Code2, Lightbulb, Layers, MonitorSmartphone, 
  Shield, Zap, GitBranch, Box, Search, Layout
} from "lucide-react";

export default function SovereignDeveloperEbook() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 1000); }, []);

  const handlePrint = () => {
    document.title = "THE_SOVEREIGN_DEVELOPER_TEXTBOOK";
    window.print();
  };

  const pages = [
    { type: 'COVER', title: "The Sovereign Developer", subtitle: "A Blueprint for Modern Web Engineering & AI-Assisted Architecture" },
    { type: 'TOC', items: ["Mental Models", "AI Co-Pilot", "War Room Setup", "HTML/CSS Mastery", "Tailwind CSS", "JS Fundamentals", "The DOM & APIs", "React & Next.js", "Server Actions", "Databases", "Deployment"] },
    { type: 'EDITORIAL', title: "01. The Architect's Mindset", content: "Coding is no longer about typing; it is about directing. In the age of AI, your value is not in your ability to remember syntax, but in your ability to architect systems. This manual teaches you to think in components, data flows, and security layers." },
    { type: 'CONTENT', title: "02. Web Anatomy", content: "The web is a conversation between three entities:\n\n1. THE CLIENT: The browser (Chrome/Safari). It renders HTML/CSS.\n2. THE SERVER: The logic gate. It processes requests and enforces rules.\n3. THE DATABASE: The source of truth. Where user data is persisted.", proTip: "Always assume the Client is compromised. Never trust user input without Server-side validation." },
    { type: 'DIAGRAM', title: "03. The Request-Response Cycle", diag: "WEB" },
    { type: 'CONTENT', title: "04. AI Co-Pilot Mastery", content: "AI is your Senior Engineer. Use it to explain, not just to fix.\n\n- PROMPT: 'Explain the difference between Map and Filter in JS with a real-world analogy.'\n- DEBUG: 'I am getting a 404 on this route. Here is my folder structure. Why?'\n- TOOLS: Use Cursor IDE for AI-native coding.", code: "// Sovereign Prompting:\n// Act as a Senior Architect. Review this React component for performance bottlenecks." },
    { type: 'CONTENT', title: "05. The War Room Setup", content: "Your environment is your cockpit. Set it up for speed.\n\n1. VS CODE: Install 'Tailwind CSS IntelliSense' and 'ESLint'.\n2. TERMINAL: Master 'cd', 'ls', 'mkdir', and 'git'.\n3. GIT: Use 'git commit -m' for every small win. It is your save point.", youtube: "Watch: 'VS Code Setup for 2026' by Traversy Media." },
    { type: 'CONTENT', title: "06. HTML5 Semantics", content: "HTML is the skeleton. Use semantic tags like <header>, <main>, and <article>.\n\nWhy? Accessibility (Screen readers) and SEO (Search engines). A website made of only <div> tags is a 'Div-Soup' and is unprofessional.", code: "<header>\n  <nav>\n    <ul><li>Home</li></ul>\n  </nav>\n</header>" },
    { type: 'DIAGRAM', title: "07. The CSS Box Model", diag: "BOX" },
    { type: 'CONTENT', title: "08. Flexbox & Grid", content: "Layout is about distribution of space.\n\n- FLEXBOX: Best for 1D layouts (Rows or Columns).\n- GRID: Best for 2D layouts (Complex dashboards).\n- ALIGNMENT: 'justify-center' and 'items-center' are your best friends.", youtube: "Watch: 'Flexbox in 100 Seconds' by Fireship." },
    { type: 'CONTENT', title: "09. Tailwind CSS", content: "Tailwind is utility-first CSS. Instead of writing custom CSS files, you apply classes directly to HTML.\n\n- PRO: No context switching between files.\n- PRO: Design system is baked in (colors, spacing).\n- CLASS: 'bg-blue-950 text-white p-8 rounded-xl shadow-2xl'.", code: "<div className=\"flex gap-4 p-6 bg-slate-50 border-2\">\n  <p>Tailwind is the Agency Standard.</p>\n</div>" },
    { type: 'RESOURCES', title: "10. Phase 1 & 2 Watchlist", links: [{t: "HTML Full Course", c: "SuperSimpleDev"}, {t: "Tailwind CSS for Beginners", c: "The Net Ninja"}] },
    { type: 'CONTENT', title: "11. JS Fundamentals", content: "JavaScript is the engine. It makes things happen.\n\n- VARIABLES: const (fixed) vs let (changeable).\n- TYPES: String, Number, Boolean, Object, Array.\n- LOGIC: if/else statements and Switch cases.", code: "const user = { name: 'Bolu', role: 'Architect' };\nif (user.role === 'Architect') { deploy(); }" },
    { type: 'CONTENT', title: "12. JS Functions", content: "Functions are reusable machines. They take an input and return an output.\n\n- ARROW FUNCTIONS: The modern standard.\n- PARAMETERS: The data you pass in.\n- RETURN: The result of the machine.", code: "const calculateTax = (price) => price * 0.15;\nconst total = calculateTax(1000); // 150" },
    { type: 'DIAGRAM', title: "13. The DOM Tree", diag: "DOM" },
    { type: 'CONTENT', title: "14. Async JS & APIs", content: "The web is asynchronous. You don't wait for data; you handle it when it arrives.\n\n- FETCH: The built-in tool to get data from URLs.\n- PROMISES: A placeholder for a future value.\n- ASYNC/AWAIT: The cleanest way to write async code.", code: "const getData = async () => {\n  const res = await fetch('https://api.com/data');\n  const data = await res.json();\n  console.log(data);\n};" },
    { type: 'RESOURCES', title: "15. JavaScript Mastery", links: [{t: "JS Promises in 10 Minutes", c: "Web Dev Simplified"}, {t: "Async Await Explained", c: "Theo - t3.gg"}] },
    { type: 'CONTENT', title: "16. React Basics", content: "React is a library for building UIs out of Components.\n\n- COMPONENTS: Independent, reusable pieces of UI.\n- PROPS: Data passed from parent to child.\n- JSX: Writing HTML-like code inside JavaScript.", code: "function Button({ label }) {\n  return <button className=\"p-2\">{label}</button>;\n}" },
    { type: 'CONTENT', title: "17. State Management", content: "State is the 'Memory' of a component. When state changes, React re-renders the UI.\n\n- useState: The primary hook for local memory.\n- useEffect: For side effects (like fetching data).", code: "const [count, setCount] = useState(0);\nreturn <button onClick={() => setCount(count + 1)}>{count}</button>;" },
    { type: 'CONTENT', title: "18. Next.js 15 App Router", content: "Next.js is the framework for production. It handles routing, optimization, and server-side logic.\n\n- FOLDER ROUTING: Every folder in 'app/' is a URL path.\n- PAGE.JS: The entry point for that route.\n- LAYOUT.JS: Shared UI across pages.", youtube: "Watch: 'Next.js 15 Crash Course' by JavaScript Mastery." },
    { type: 'CONTENT', title: "19. Server Actions", content: "The 'Engine' of modern Next.js. It allows you to write server-side code (like database queries) directly inside your components.\n\n- 'use server': The directive that tells Next.js to run this on the server.\n- SECURITY: No more exposed API endpoints.", code: "async function createPost(formData) {\n  'use server';\n  const title = formData.get('title');\n  await db.insert(title);\n}" },
    { type: 'CONTENT', title: "20. Databases & Supabase", content: "Supabase is 'Backend as a Service'. It gives you a Postgres database, Auth, and Storage instantly.\n\n- RLS: Row-Level Security. It ensures User A cannot see User B's data.\n- SQL: The language of databases.", youtube: "Watch: 'Supabase in 6 Minutes' by Fireship." },
    { type: 'DIAGRAM', title: "21. Git Flow & Deployment", diag: "GIT" },
    { type: 'CONTENT', title: "22. Vercel Deployment", content: "Vercel is the home of Next.js. Deployment is as simple as pushing to GitHub.\n\n1. Connect GitHub to Vercel.\n2. Select your repository.\n3. Click Deploy.\n4. Your site is live on a global CDN.", proTip: "Use Environment Variables (.env) to hide your API keys from the public." },
    { type: 'EDITORIAL', title: "23. The Path Forward", content: "You have the blueprint. Now you must build. The difference between a student and an engineer is 'Proof of Work'. Build 5 projects. Deploy them. Document them. The world is waiting for your systems." },
    { type: 'RESOURCES', title: "24. The Ultimate Vault", links: [{t: "MDN Web Docs", c: "Documentation"}, {t: "Frontend Mentor", c: "Practice Projects"}] },
    { type: 'COVER', title: "End of Volume I", subtitle: "Go Forth and Build Sovereign Systems." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #textbook, #textbook * { visibility: visible; }
          #textbook { position: absolute; left: 0; top: 0; width: 100%; }
          .page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background: white; }
          .page-num::after { counter-increment: pageCounter; content: counter(pageCounter); }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="text-center max-w-md">
          <Code2 size={64} className="text-blue-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-white mb-4 uppercase">The Sovereign Developer</h1>
          <p className="text-slate-400 mb-8">25-Page Comprehensive Technical Manual</p>
          {!isReady ? <div className="text-blue-500 animate-pulse">COMPILING...</div> : 
          <button onClick={handlePrint} className="w-full bg-white text-blue-950 font-black py-4 rounded uppercase tracking-widest">Download Textbook</button>}
        </div>
      </div>

      <div id="textbook" className="hidden print:block bg-white text-blue-950">
        {pages.map((page, i) => (
          <div key={i} className="page flex flex-col">
            {page.type !== 'COVER' && (
              <header className="h-[15mm] px-[20mm] flex items-end justify-between border-b border-slate-100 pb-2">
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Sovereign Developer // Vol. 1</span>
                <span className="page-num text-[10px] font-black"></span>
              </header>
            )}
            <main className="grow px-[20mm] py-[15mm] flex flex-col">
              {page.type === 'COVER' && (
                <div className="h-full bg-blue-950 text-white p-[15mm] -m-[15mm] flex flex-col justify-between border-[10mm] border-slate-900">
                  <div className="mt-20">
                    <Terminal size={64} className="text-yellow-500 mb-8" />
                    <h1 className="text-6xl font-black uppercase leading-none tracking-tighter">{page.title}</h1>
                    <div className="h-2 w-32 bg-yellow-500 my-8"></div>
                    <p className="text-xl font-medium text-blue-200">{page.subtitle}</p>
                  </div>
                  <div className="border-t border-blue-800 pt-8 flex justify-between font-black uppercase text-xs tracking-widest">
                    <span>Boluwatife Adeoye</span>
                    <span>2026 Edition</span>
                  </div>
                </div>
              )}
              {page.type === 'TOC' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-4xl font-black uppercase mb-10 border-b-4 border-blue-950 pb-2">Contents</h2>
                  <div className="space-y-4">
                    {page.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 border-b border-slate-100 pb-2">
                        <span className="font-mono text-yellow-600 font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                        <span className="font-bold text-slate-800 uppercase">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {page.type === 'EDITORIAL' && (
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-4xl font-black uppercase mb-8 text-blue-950">{page.title}</h2>
                  <p className="text-2xl font-serif leading-relaxed text-justify first-letter:text-7xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left">{page.content}</p>
                </div>
              )}
              {page.type === 'CONTENT' && (
                <div className="h-full flex flex-col">
                  <h2 className="text-3xl font-black uppercase mb-6 border-l-8 border-yellow-500 pl-4">{page.title}</h2>
                  <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap mb-8">{page.content}</p>
                  {page.code && <pre className="bg-slate-900 text-green-400 p-6 rounded-lg font-mono text-xs mb-8 whitespace-pre-wrap">{page.code}</pre>}
                  {page.proTip && <div className="mt-auto bg-blue-50 border-l-4 border-blue-950 p-4 font-bold text-sm italic">Pro-Tip: {page.proTip}</div>}
                  {page.youtube && <div className="mt-4 flex items-center gap-2 text-red-600 font-bold text-xs uppercase"><Youtube size={16}/> {page.youtube}</div>}
                </div>
              )}
              {page.type === 'DIAGRAM' && (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <h2 className="text-3xl font-black uppercase mb-12">{page.title}</h2>
                  {page.diag === 'WEB' && (
                    <div className="flex items-center gap-4 w-full justify-center">
                      <div className="p-4 border-4 border-blue-950 rounded-xl font-black">CLIENT</div>
                      <div className="h-1 w-20 bg-slate-300 relative"><div className="absolute -top-4 left-0 text-[8px] font-bold">REQUEST</div></div>
                      <div className="p-4 bg-blue-950 text-white rounded-xl font-black">SERVER</div>
                      <div className="h-1 w-20 bg-slate-300 relative"><div className="absolute -top-4 left-0 text-[8px] font-bold">RESPONSE</div></div>
                      <div className="p-4 border-4 border-green-600 rounded-xl font-black">DB</div>
                    </div>
                  )}
                  {page.diag === 'BOX' && (
                    <div className="border-4 border-dashed border-slate-300 p-10 relative">
                      <span className="absolute top-1 left-1 text-[8px] font-bold">MARGIN</span>
                      <div className="border-4 border-blue-950 p-10 relative bg-blue-50">
                        <span className="absolute top-1 left-1 text-[8px] font-bold">BORDER</span>
                        <div className="border-4 border-dotted border-blue-300 p-10 bg-white">
                          <span className="absolute top-1 left-1 text-[8px] font-bold">PADDING</span>
                          <div className="bg-blue-950 text-white p-4 font-black">CONTENT</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {page.diag === 'GIT' && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-3 border-2 border-blue-950 rounded">Local Code</div>
                      <ArrowRight className="rotate-90" />
                      <div className="p-3 bg-blue-950 text-white rounded">GitHub Repo</div>
                      <ArrowRight className="rotate-90" />
                      <div className="p-3 bg-green-600 text-white rounded font-black uppercase">Vercel Live</div>
                    </div>
                  )}
                </div>
              )}
              {page.type === 'RESOURCES' && (
                <div className="h-full flex flex-col">
                  <h2 className="text-3xl font-black uppercase mb-8 border-l-8 border-red-600 pl-4">{page.title}</h2>
                  <div className="space-y-4">
                    {page.links.map((l, idx) => (
                      <div key={idx} className="p-4 border-2 border-slate-100 rounded-lg flex items-center gap-4">
                        <Youtube className="text-red-600" />
                        <div><p className="font-bold text-slate-900">{l.t}</p><p className="text-[10px] font-black text-slate-400 uppercase">Channel: {l.c}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
            <footer className="h-[10mm] px-[20mm] flex items-center justify-between border-t border-slate-100 opacity-50 text-[8px] font-bold uppercase tracking-widest">
              <span>© 2026 Boluwatife Adeoye</span>
              <span>Sovereign Systems Design</span>
            </footer>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowRight({ className }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
}
