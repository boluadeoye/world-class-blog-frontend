"use client";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Monitor, Check, MessageSquare, Mail, CreditCard, BarChart3, ShoppingBag, Bot } from "lucide-react";
import Link from "next/link";

/* === 1. MINI-UI RENDERERS (The "Fake" Websites) === */

const FinTechUI = () => (
  <div className="w-full h-full bg-slate-900 p-4 flex flex-col gap-3 overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><div className="w-4 h-4 rounded-full bg-emerald-500"></div></div>
      <div className="w-20 h-2 rounded-full bg-slate-800"></div>
    </div>
    {/* Balance Card */}
    <div className="w-full aspect-[1.6] rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 p-3 flex flex-col justify-between shadow-lg">
      <div className="flex justify-between"><div className="w-8 h-5 rounded bg-white/20"></div><div className="w-4 h-4 rounded-full bg-white/50"></div></div>
      <div className="space-y-1"><div className="w-24 h-2 rounded bg-white/30"></div><div className="w-16 h-2 rounded bg-white/30"></div></div>
    </div>
    {/* Graph */}
    <div className="flex-1 bg-slate-800/50 rounded-xl p-2 flex items-end gap-1">
      {[40, 70, 50, 90, 60, 80].map((h, i) => (
        <div key={i} className="flex-1 bg-emerald-500/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
      ))}
    </div>
  </div>
);

const RealEstateUI = () => (
  <div className="w-full h-full bg-[#0f0f0f] flex flex-col relative overflow-hidden">
    {/* Hero Image Placeholder */}
    <div className="h-[60%] bg-slate-800 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <div className="w-24 h-4 bg-amber-500/80 mb-2"></div>
        <div className="w-32 h-2 bg-white/50"></div>
      </div>
    </div>
    {/* Content */}
    <div className="p-4 flex gap-2">
      <div className="flex-1 h-20 rounded-lg bg-white/5 border border-white/10"></div>
      <div className="flex-1 h-20 rounded-lg bg-white/5 border border-white/10"></div>
    </div>
  </div>
);

const AISaaSUI = () => (
  <div className="w-full h-full bg-white flex flex-col">
    {/* Sidebar & Main */}
    <div className="flex flex-1">
      <div className="w-12 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-4 gap-2">
        <div className="w-6 h-6 rounded-md bg-indigo-600"></div>
        <div className="w-6 h-6 rounded-md bg-slate-200"></div>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="self-end bg-indigo-600 text-white text-[8px] p-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
          Generate a marketing plan for Q4.
        </div>
        <div className="self-start bg-slate-100 text-slate-600 text-[8px] p-2 rounded-r-lg rounded-tl-lg max-w-[80%]">
          Here is a comprehensive strategy focusing on...
          <div className="mt-1 w-full h-1 bg-slate-300 rounded"></div>
          <div className="mt-1 w-2/3 h-1 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
    {/* Input */}
    <div className="p-2 border-t border-slate-100">
      <div className="w-full h-6 rounded-full bg-slate-100"></div>
    </div>
  </div>
);

const EcommerceUI = () => (
  <div className="w-full h-full bg-slate-50 p-3 overflow-hidden">
    <div className="flex justify-between mb-3">
      <div className="w-4 h-4 rounded-full bg-black"></div>
      <div className="w-4 h-4 rounded-full bg-slate-200"></div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="aspect-[3/4] bg-white rounded-lg shadow-sm p-1 flex flex-col">
          <div className="flex-1 bg-slate-100 rounded-md mb-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-orange-50 opacity-50"></div>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded mb-0.5"></div>
          <div className="w-1/2 h-1.5 bg-black rounded"></div>
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
