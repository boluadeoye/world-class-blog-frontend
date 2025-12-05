"use client";
import { motion } from "framer-motion";
import { ArrowRight, Monitor, MessageSquare, Mail, CreditCard, TrendingUp, Home, ShoppingBag, Bot, Search, Menu, User, Bell, Wifi } from "lucide-react";
import Link from "next/link";

/* === 1. HIGH-FIDELITY MINI-UIS === */

const FinTechUI = () => (
  <div className="w-full h-full bg-[#0f172a] p-5 flex flex-col gap-4 font-sans text-white overflow-hidden relative">
    {/* Status Bar */}
    <div className="flex justify-between items-center opacity-50 mb-1">
      <span className="text-[8px]">9:41</span>
      <div className="flex gap-1"><Wifi size={8} /><div className="w-3 h-1.5 bg-white rounded-sm"></div></div>
    </div>
    
    {/* Header */}
    <div className="flex justify-between items-center">
      <div>
        <p className="text-[8px] text-slate-400">Total Balance</p>
        <h3 className="text-lg font-bold">$124,592.00</h3>
      </div>
      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
        <Bell size={12} className="text-emerald-400" />
      </div>
    </div>

    {/* The Card */}
    <div className="w-full aspect-[1.6] rounded-xl bg-gradient-to-br from-emerald-600 to-teal-900 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="flex justify-between items-start z-10">
        <div className="w-8 h-5 rounded bg-yellow-400/80 flex items-center justify-center"><div className="w-4 h-3 border border-black/20 rounded-sm"></div></div>
        <span className="text-[10px] font-bold tracking-widest italic opacity-80">VISA</span>
      </div>
      <div className="z-10">
        <p className="text-[10px] tracking-[0.15em] mb-1 font-mono opacity-90">**** **** **** 4289</p>
        <div className="flex justify-between items-end">
          <span className="text-[8px] opacity-75">BOLU ADEOYE</span>
          <span className="text-[8px] opacity-75">12/28</span>
        </div>
      </div>
    </div>

    {/* Transactions */}
    <div className="flex-1 bg-slate-900/50 rounded-t-xl border-t border-white/5 p-3 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-[8px] text-red-400 font-bold">N</div>
          <div><p className="text-[9px] font-bold">Netflix</p><p className="text-[7px] text-slate-500">Subscription</p></div>
        </div>
        <span className="text-[9px] font-bold text-red-400">-$15.99</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[8px] text-blue-400 font-bold">S</div>
          <div><p className="text-[9px] font-bold">Stripe</p><p className="text-[7px] text-slate-500">Payout</p></div>
        </div>
        <span className="text-[9px] font-bold text-emerald-400">+$2,400.00</span>
      </div>
    </div>
  </div>
);

const RealEstateUI = () => (
  <div className="w-full h-full bg-white flex flex-col font-serif relative">
    {/* Hero Image Simulation */}
    <div className="h-[65%] bg-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-27b88e35eabb?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center"></div>
      
      <div className="absolute top-3 left-3 right-3 flex justify-between text-white">
        <Menu size={12} />
        <span className="text-[8px] tracking-widest uppercase font-bold">Luxe Living</span>
      </div>
      
      <div className="absolute bottom-4 left-4 text-white">
        <span className="bg-amber-500 text-black text-[6px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide mb-1 inline-block">New Listing</span>
        <h3 className="text-lg leading-none mb-0.5">The Onyx Villa</h3>
        <p className="text-[8px] font-sans opacity-90">Beverly Hills, CA</p>
      </div>
    </div>

    {/* Details */}
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div className="flex justify-between items-end border-b border-slate-100 pb-2">
        <div>
          <p className="text-[8px] text-slate-400 font-sans uppercase tracking-wider">Price</p>
          <p className="text-sm font-bold text-slate-900">$4,500,000</p>
        </div>
        <div className="flex gap-2 text-[8px] text-slate-600 font-sans">
          <span>5 Beds</span>
          <span>•</span>
          <span>6 Baths</span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex-1 bg-slate-900 text-white text-[8px] font-sans font-bold py-2 rounded text-center">Book Tour</div>
        <div className="w-8 bg-slate-100 rounded flex items-center justify-center text-slate-900"><MessageSquare size={10} /></div>
      </div>
    </div>
  </div>
);

const AISaaSUI = () => (
  <div className="w-full h-full bg-[#ffffff] flex flex-col font-sans text-slate-800">
    {/* Sidebar & Main */}
    <div className="flex flex-1 overflow-hidden">
      <div className="w-10 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-3 gap-3">
        <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white"><Bot size={10} /></div>
        <div className="w-4 h-4 rounded bg-slate-200"></div>
        <div className="w-4 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3 bg-slate-50/50">
        {/* Bot Message */}
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0"><Bot size={10} /></div>
          <div className="bg-white border border-slate-100 p-2 rounded-2xl rounded-tl-none shadow-sm max-w-[90%]">
            <p className="text-[7px] leading-relaxed text-slate-600">
              Hello! I've analyzed your Q3 data. Revenue is up <span className="text-emerald-600 font-bold">24%</span>. Would you like a breakdown?
            </p>
          </div>
        </div>
        {/* User Message */}
        <div className="flex gap-2 flex-row-reverse">
          <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0"><User size={10} /></div>
          <div className="bg-indigo-600 text-white p-2 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
            <p className="text-[7px] leading-relaxed">Yes, generate the report.</p>
          </div>
        </div>
        {/* Processing */}
        <div className="flex gap-2 items-center opacity-50">
          <div className="w-5 h-5"></div>
          <div className="flex gap-0.5">
            <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      </div>
    </div>
    {/* Input */}
    <div className="p-2 border-t border-slate-100 bg-white">
      <div className="w-full h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center px-3 justify-between">
        <span className="text-[7px] text-slate-400">Ask AI anything...</span>
        <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-white"><ArrowRight size={8} /></div>
      </div>
    </div>
  </div>
);

const EcommerceUI = () => (
  <div className="w-full h-full bg-white p-3 overflow-hidden font-sans flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <span className="font-bold text-[10px] tracking-tighter">NIKE<span className="text-rose-500">.STORE</span></span>
      <ShoppingBag size={10} />
    </div>
    
    {/* Hero Banner */}
    <div className="w-full h-16 bg-slate-100 rounded-lg mb-3 relative overflow-hidden flex items-center px-3">
      <div className="absolute right-[-10px] top-[-10px] w-20 h-20 bg-rose-500/10 rounded-full"></div>
      <div>
        <p className="text-[6px] font-bold text-rose-500 uppercase">New Arrival</p>
        <h4 className="text-[10px] font-bold text-slate-900 leading-tight">Air Max <br/> Pulse</h4>
      </div>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-2 gap-2 flex-1">
      <div className="bg-slate-50 rounded-lg p-1.5 flex flex-col justify-between border border-slate-100">
        <div className="w-full aspect-square bg-white rounded-md mb-1 flex items-center justify-center">
           {/* Shoe Placeholder */}
           <div className="w-8 h-4 bg-rose-500 rounded-full opacity-20 rotate-12"></div>
        </div>
        <div>
          <p className="text-[7px] font-bold text-slate-800">Jordan 1</p>
          <p className="text-[7px] text-slate-500">$140</p>
        </div>
      </div>
      <div className="bg-slate-50 rounded-lg p-1.5 flex flex-col justify-between border border-slate-100">
        <div className="w-full aspect-square bg-white rounded-md mb-1 flex items-center justify-center">
           <div className="w-8 h-4 bg-indigo-500 rounded-full opacity-20 -rotate-12"></div>
        </div>
        <div>
          <p className="text-[7px] font-bold text-slate-800">Dunk Low</p>
          <p className="text-[7px] text-slate-500">$110</p>
        </div>
      </div>
    </div>
  </div>
);

/* === 2. DATA OBJECTS === */
const projects = [
  {
    id: "fintech",
    title: "NeoBank Dashboard",
    price: "$1,200 / ₦1.8M",
    desc: "A high-security financial dashboard with real-time data visualization and dark mode.",
    why: "Builds immediate trust with investors and users through premium aesthetics.",
    stack: ["React", "Recharts", "Node.js"],
    ui: <FinTechUI />,
    color: "emerald"
  },
  {
    id: "realestate",
    title: "Luxury Estate",
    price: "$800 / ₦1.2M",
    desc: "Immersive property showcase with cinematic scroll effects and lead capture.",
    why: "Sells the lifestyle, not just the house. Increases inquiry rates by 40%.",
    stack: ["Next.js", "Framer Motion", "CMS"],
    ui: <RealEstateUI />,
    color: "amber"
  },
  {
    id: "ai-saas",
    title: "Neural Interface",
    price: "$1,500 / ₦2.2M",
    desc: "Clean, distraction-free AI chat interface with history and streaming responses.",
    why: "The standard for modern SaaS. Keeps users engaged with fluid interactions.",
    stack: ["OpenAI API", "Tailwind", "Postgres"],
    ui: <AISaaSUI />,
    color: "indigo"
  },
  {
    id: "ecom",
    title: "Modern Commerce",
    price: "$2,000 / ₦3M",
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
