"use client";
import { Code2, Layers, PenTool, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "../ui/ScrollReveal";

const services = [
  {
    id: "engineering",
    icon: <Code2 size={24} />,
    title: "Full-Stack Engineering",
    desc: "Building scalable, high-performance applications using Next.js, React Server Components, and Edge computing.",
    tags: ["React", "Node.js", "Postgres"]
  },
  {
    id: "architecture",
    icon: <Layers size={24} />,
    title: "System Architecture",
    desc: "Designing robust database schemas and cloud infrastructure that scale from zero to millions of users.",
    tags: ["Neon DB", "System Design", "API"]
  },
  {
    id: "strategy",
    icon: <PenTool size={24} />,
    title: "Technical Strategy",
    desc: "Translating complex engineering concepts into clear, actionable business value through technical writing.",
    tags: ["Documentation", "Consulting", "Growth"]
  }
];

export default function ServiceDeck() {
  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-4">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-1">Expertise</h2>
              <p className="font-sans text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                Engineering • Architecture • Strategy
              </p>
            </div>
            <Link href="/about" className="hidden md:flex items-center gap-2 text-amber-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
              Work With Me <ArrowUpRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        {/* The Deck (Staggered Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.15}>
              <div className="group relative p-6 rounded-[2rem] bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-500 hover:bg-slate-900 hover:shadow-2xl hover:shadow-amber-900/10 flex flex-col h-full cursor-default">
                
                {/* Icon */}
                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-500 w-fit shadow-inner">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-slate-200 group-hover:text-white mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="font-sans text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-slate-300 transition-colors flex-1">
                  {service.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-amber-500/80 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
