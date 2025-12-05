"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Brain, Database, Layout, Smartphone } from "lucide-react";

const services = [
  {
    title: "Premium Web Development",
    price: "From ₦150k",
    desc: "High-performance landing pages and corporate sites that convert visitors into customers.",
    icon: <Layout size={24} className="text-indigo-400" />,
    bg: "from-indigo-500/10 to-purple-500/5"
  },
  {
    title: "AI & Chatbot Systems",
    price: "From ₦200k",
    desc: "Custom AI assistants (like this one) trained on your business data to automate support.",
    icon: <Brain size={24} className="text-amber-400" />,
    bg: "from-amber-500/10 to-orange-500/5"
  },
  {
    title: "SaaS & Web Apps",
    price: "From ₦800k",
    desc: "Complex dashboards, user authentication, and database management systems.",
    icon: <Code2 size={24} className="text-emerald-400" />,
    bg: "from-emerald-500/10 to-teal-500/5"
  },
  {
    title: "API Architecture",
    price: "From ₦150k",
    desc: "Robust backend systems and API integrations to power your mobile or web apps.",
    icon: <Database size={24} className="text-rose-400" />,
    bg: "from-rose-500/10 to-pink-500/5"
  }
];

export default function ServiceDeck() {
  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <Smartphone size={20} className="text-white" />
          </div>
          <h3 className="font-serif text-3xl text-white tracking-tight">Services & Solutions</h3>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {services.map((s, i) => (
            <div 
              key={i} 
              className="group relative min-w-[260px] md:min-w-[300px] h-[320px] snap-start"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.bg} rounded-[2rem] border border-white/10 group-hover:border-white/20 transition-all duration-500 overflow-hidden`}>
                
                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm group-hover:bg-slate-950/60 transition-colors duration-500"></div>

                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div>
                    <div className="mb-6 p-3 rounded-2xl bg-white/5 border border-white/10 w-fit shadow-lg group-hover:scale-110 transition-transform duration-500">
                      {s.icon}
                    </div>
                    <h4 className="font-serif text-2xl text-white leading-tight mb-2">
                      {s.title}
                    </h4>
                    <p className="font-sans text-sm text-slate-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {s.price}
                    </span>
                    <Link href="/chat" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
