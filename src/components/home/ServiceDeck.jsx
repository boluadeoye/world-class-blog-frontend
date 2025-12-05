"use client";
import Link from "next/link";
import { ArrowRight, Code2, Brain, Database, Layout, Smartphone, Terminal, LineChart } from "lucide-react";

const services = [
  {
    title: "Premium Web Engineering",
    desc: "High-performance, SEO-optimized corporate platforms that convert visitors into loyal customers.",
    icon: <Layout size={24} className="text-indigo-300" />,
    bg: "from-indigo-500/20 to-purple-900/20"
  },
  {
    title: "AI & Neural Systems",
    desc: "Custom RAG chatbots and automation agents trained on your specific business data.",
    icon: <Brain size={24} className="text-amber-300" />,
    bg: "from-amber-500/20 to-orange-900/20"
  },
  {
    title: "SaaS Architecture",
    desc: "Scalable, multi-tenant web applications with secure authentication and complex databases.",
    icon: <Code2 size={24} className="text-emerald-300" />,
    bg: "from-emerald-500/20 to-teal-900/20"
  },
  {
    title: "Mobile App Development",
    desc: "Native-feel mobile experiences using React Native. iOS and Android from a single codebase.",
    icon: <Smartphone size={24} className="text-rose-300" />,
    bg: "from-rose-500/20 to-pink-900/20"
  },
  {
    title: "API & Backend Systems",
    desc: "Robust, type-safe API design (REST/GraphQL) to power your entire digital ecosystem.",
    icon: <Database size={24} className="text-cyan-300" />,
    bg: "from-cyan-500/20 to-blue-900/20"
  },
  {
    title: "Technical Consultancy",
    desc: "Strategic guidance on tech stacks, system design, and hiring for non-technical founders.",
    icon: <LineChart size={24} className="text-violet-300" />,
    bg: "from-violet-500/20 to-fuchsia-900/20"
  }
];

export default function ServiceDeck() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
            <Terminal size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight leading-none">Services & Solutions</h3>
            <p className="font-sans text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mt-1">
              Engineering Excellence
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto pb-12 snap-x scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {services.map((s, i) => (
            <Link 
              key={i} 
              href="/chat"
              className="group relative min-w-[280px] md:min-w-[320px] h-[360px] snap-start"
            >
              {/* Card Container */}
              <div className="absolute inset-0 rounded-[2rem] bg-slate-950 border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:-translate-y-2">
                
                {/* Dynamic Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div>
                    {/* Icon Box */}
                    <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit shadow-lg group-hover:scale-110 transition-transform duration-500 backdrop-blur-md">
                      {s.icon}
                    </div>
                    
                    {/* Title */}
                    <h4 className="font-serif text-3xl text-white leading-[1.1] mb-4 group-hover:text-white/90 transition-colors">
                      {s.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="font-sans text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {s.desc}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                      Initiate
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
