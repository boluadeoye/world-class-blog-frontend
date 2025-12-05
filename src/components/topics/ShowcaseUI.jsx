"use client";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Wifi, Battery, Signal, Search, Bell, Menu, Home, User, ShoppingBag, Heart, ArrowRight, Monitor, Bot, PenTool, BookOpen } from "lucide-react";
import Link from "next/link";

/* === 1. HIGH-DENSITY MINI-UIS === */

const FinTechUI = () => (
  <div className="w-full h-full bg-[#0f172a] flex font-sans text-white overflow-hidden relative">
    {/* Sidebar */}
    <div className="w-12 bg-slate-900 border-r border-white/5 flex flex-col items-center py-4 gap-4">
      <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-[10px] font-bold">N</div>
      <div className="w-4 h-4 rounded bg-white/10"></div>
      <div className="w-4 h-4 rounded bg-white/10"></div>
      <div className="w-4 h-4 rounded bg-white/10"></div>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[8px] text-slate-400">Total Balance</p>
          <h3 className="text-xl font-bold">$24,592.00</h3>
        </div>
        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
          <Bell size={10} className="text-emerald-400" />
        </div>
      </div>

      {/* Card */}
      <div className="w-full aspect-[1.8] rounded-xl bg-gradient-to-br from-emerald-600 to-teal-900 p-3 flex flex-col justify-between shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex justify-between items-start z-10">
          <div className="w-6 h-4 rounded bg-yellow-400/80 flex items-center justify-center"><div className="w-3 h-2 border border-black/20 rounded-sm"></div></div>
          <span className="text-[8px] font-bold tracking-widest italic opacity-80">VISA</span>
        </div>
        <div className="z-10">
          <p className="text-[8px] tracking-[0.15em] mb-1 font-mono opacity-90">**** 4289</p>
          <span className="text-[6px] opacity-75">BOLU ADEOYE</span>
        </div>
      </div>

      {/* Quick Send */}
      <div>
        <p className="text-[8px] text-slate-400 mb-2">Quick Send</p>
        <div className="flex gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] font-bold">
              U{i}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-[10px]">+</div>
        </div>
      </div>
    </div>
  </div>
);

const PersonalBlogUI = () => (
  <div className="w-full h-full bg-[#111] flex flex-col font-sans text-white relative overflow-hidden">
    {/* Nav */}
    <div className="flex justify-between items-center p-4 border-b border-white/10">
      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black font-bold text-[8px]">B</div>
      <div className="flex gap-2">
        <div className="w-8 h-1.5 bg-white/20 rounded-full"></div>
        <div className="w-8 h-1.5 bg-white/20 rounded-full"></div>
      </div>
    </div>

    {/* Hero Article */}
    <div className="p-4 flex-1 flex flex-col">
      <div className="mb-4">
        <span className="text-[6px] font-bold text-amber-400 uppercase tracking-widest mb-1 block">Featured</span>
        <h3 className="font-serif text-lg leading-tight mb-2">The Art of <br/>Minimalism</h3>
        <div className="space-y-1">
          <div className="w-full h-1 bg-white/30 rounded"></div>
          <div className="w-5/6 h-1 bg-white/30 rounded"></div>
          <div className="w-4/6 h-1 bg-white/30 rounded"></div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="aspect-square bg-white/5 rounded-lg border border-white/10 p-2 flex flex-col justify-end">
          <div className="w-6 h-6 rounded bg-indigo-500/20 flex items-center justify-center mb-2 text-indigo-400"><PenTool size={10} /></div>
          <div className="w-full h-1 bg-white/20 rounded mb-1"></div>
          <div className="w-1/2 h-1 bg-white/20 rounded"></div>
        </div>
        <div className="aspect-square bg-white/5 rounded-lg border border-white/10 p-2 flex flex-col justify-end">
          <div className="w-6 h-6 rounded bg-rose-500/20 flex items-center justify-center mb-2 text-rose-400"><BookOpen size={10} /></div>
          <div className="w-full h-1 bg-white/20 rounded mb-1"></div>
          <div className="w-1/2 h-1 bg-white/20 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const AISaaSUI = () => (
  <div className="w-full h-full bg-white flex flex-col font-sans text-slate-800">
    {/* Header */}
    <div className="h-8 border-b border-slate-100 flex items-center justify-between px-3">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
        <span className="text-[8px] font-bold">Nexus AI</span>
      </div>
      <User size={10} className="text-slate-400" />
    </div>

    {/* Chat Area */}
    <div className="flex-1 p-3 flex flex-col gap-3 bg-slate-50/50 overflow-hidden">
      <div className="flex gap-2">
        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0"><Bot size={10} /></div>
        <div className="bg-white border border-slate-100 p-2 rounded-2xl rounded-tl-none shadow-sm max-w-[90%]">
          <p className="text-[7px] leading-relaxed text-slate-600">
            I've analyzed the Q3 metrics. Revenue is up <span className="text-emerald-600 font-bold">24%</span>.
          </p>
          <div className="mt-2 h-8 bg-slate-50 rounded border border-slate-100 flex items-end p-1 gap-0.5">
            {[40, 60, 30, 80, 50].map((h,i) => <div key={i} className="flex-1 bg-indigo-200 rounded-sm" style={{height: `${h}%`}}></div>)}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 flex-row-reverse">
        <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0"><User size={10} /></div>
        <div className="bg-indigo-600 text-white p-2 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
          <p className="text-[7px] leading-relaxed">Generate the PDF report.</p>
        </div>
      </div>
    </div>

    {/* Input */}
    <div className="p-2 border-t border-slate-100 bg-white">
      <div className="w-full h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center px-3 justify-between">
        <span className="text-[7px] text-slate-400">Type a command...</span>
        <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-white"><ArrowRight size={8} /></div>
      </div>
    </div>
  </div>
);

const EcommerceUI = () => (
  <div className="w-full h-full bg-white p-3 overflow-hidden font-sans flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <span className="font-bold text-[10px] tracking-tighter">NIKE<span className="text-rose-500">.STORE</span></span>
      <div className="relative">
        <ShoppingBag size={10} />
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
      </div>
    </div>
    
    {/* Hero Banner */}
    <div className="w-full h-20 bg-slate-100 rounded-lg mb-3 relative overflow-hidden flex items-center px-3">
      <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80" className="absolute right-[-20px] top-[-10px] w-24 h-24 object-contain rotate-[-15deg]" alt="Shoe" />
      <div className="relative z-10">
        <p className="text-[6px] font-bold text-rose-500 uppercase mb-0.5">Just Dropped</p>
        <h4 className="text-[10px] font-bold text-slate-900 leading-tight">Air Max <br/> Pulse</h4>
        <div className="mt-1 bg-black text-white text-[6px] px-1.5 py-0.5 rounded w-fit">Shop Now</div>
      </div>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-2 gap-2 flex-1">
      {[1, 2].map((i) => (
        <div key={i} className="bg-slate-50 rounded-lg p-1.5 flex flex-col justify-between border border-slate-100">
          <div className="w-full aspect-square bg-white rounded-md mb-1 flex items-center justify-center relative">
             <Heart size={6} className="absolute top-1 right-1 text-slate-300" />
             <div className={`w-8 h-4 rounded-full opacity-20 rotate-12 ${i===1 ? 'bg-indigo-500' : 'bg-rose-500'}`}></div>
          </div>
          <div>
            <p className="text-[7px] font-bold text-slate-800">Jordan 1</p>
            <p className="text-[7px] text-slate-500">$140</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* === 2. DATA OBJECTS === */
const projects = [
  {
    id: "fintech",
    title: "NeoBank Dashboard",
    price: "$400 / ₦600k",
    desc: "A high-security financial dashboard with real-time data visualization and dark mode.",
    why: "Builds immediate trust with investors and users through premium aesthetics.",
    stack: ["React", "Recharts", "Node.js"],
    ui: <FinTechUI />,
    color: "emerald"
  },
  {
    id: "blog",
    title: "Personal Brand & Blog",
    price: "$300 / ₦450k",
    desc: "A high-performance digital garden for thought leaders. Features markdown support and SEO optimization.",
    why: "Establishes authority and owns your audience. Faster and more secure than WordPress.",
    stack: ["Next.js", "MDX", "Tailwind"],
    ui: <PersonalBlogUI />,
    color: "amber"
  },
  {
    id: "ai-saas",
    title: "Neural Interface",
    price: "$500 / ₦750k",
    desc: "Clean, distraction-free AI chat interface with history and streaming responses.",
    why: "The standard for modern SaaS. Keeps users engaged with fluid interactions.",
    stack: ["OpenAI API", "Tailwind", "Postgres"],
    ui: <AISaaSUI />,
    color: "indigo"
  },
  {
    id: "ecom",
    title: "Modern Commerce",
    price: "$600 / ₦900k",
    desc: "High-conversion storefront with instant search and seamless checkout flow.",
    why: "Optimized for speed and sales. Reduces cart abandonment.",
    stack: ["Shopify/Stripe", "Next.js", "Redis"],
    ui: <EcommerceUI />,
    color: "rose"
  }
];

/* === 3. MAIN COMPONENT === */
export default function ShowcaseUI() {
  
  const handleContact = (project, method) => {
    const subject = `Inquiry: ${project.title} Blueprint`;
    const body = `Hi Bolu,\n\nI am interested in the ${project.title} (${project.price}).\n\nI need a similar solution for my business.\n\nTimeline:\nBudget:\n\nLet's discuss.`;
    
    if (method === 'whatsapp') {
      const text = `Hi Bolu, I'm interested in the *${project.title}* (${project.price}). I need a similar solution. Let's discuss.`;
      window.open(`https://wa.me/2348106293674?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      window.open(`mailto:boluadeoye97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
      
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-bold text-[10px] tracking-widest uppercase backdrop-blur-md mb-6">
          <Monitor size={12} /> Digital Showroom
        </div>
        <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-6">
          The Blueprint Collection
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Production-ready architectures available for deployment. Select a blueprint to initiate a contract.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative"
          >
            {/* Card Container */}
            <div className="relative rounded-[2.5rem] bg-slate-900 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
              
              {/* === THE MINI-BROWSER (Visuals) === */}
              <div className="h-[300px] bg-slate-950 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                {/* Browser Bar */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center px-4 gap-2 z-20 border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                
                {/* The UI Component (Scaled & Tilted) */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[80%] h-[400px] rounded-t-2xl overflow-hidden shadow-2xl transform group-hover:translate-y-2 transition-transform duration-500">
                  {p.ui}
                </div>
                
                {/* Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-30"></div>
              </div>

              {/* === THE SPECS (Details) === */}
              <div className="p-8 md:p-10 bg-slate-900 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-3xl text-white">{p.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${p.color}-500/10 text-${p.color}-400 border border-${p.color}-500/20`}>
                    {p.price}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {p.desc} <span className="text-slate-200 font-medium block mt-2">{p.why}</span>
                </p>

                {/* Tech Stack */}
                <div className="flex gap-2 mb-8">
                  {p.stack.map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-slate-500 border border-white/5 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleContact(p, 'whatsapp')}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-indigo-50 transition-colors"
                  >
                    <MessageSquare size={16} /> WhatsApp
                  </button>
                  <button 
                    onClick={() => handleContact(p, 'email')}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <Mail size={16} /> Email
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
