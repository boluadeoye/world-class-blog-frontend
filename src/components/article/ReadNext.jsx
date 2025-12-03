"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1], // Cubic bezier for "premium" feel
    },
  }),
};

export default function ReadNext({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative py-24 px-6 border-t border-white/5 bg-slate-950">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl bg-radial-gradient(circle at 50% 0%, rgba(251,191,36,0.03), transparent 50%) pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-2">Curated for You</h3>
            <p className="font-sans text-slate-400 text-sm tracking-wide uppercase">Continue the Journey</p>
          </div>
          <Link href="/articles" className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-bold text-sm tracking-widest uppercase group">
            View Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              <Link href={`/post/${post.slug}`} className="group relative block h-full">
                {/* Card Container */}
                <div className="relative h-full p-8 rounded-[2rem] bg-slate-900/40 border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-amber-500/30 group-hover:bg-slate-900/60 group-hover:shadow-2xl group-hover:shadow-amber-900/10">
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Meta Top */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-300 group-hover:text-white group-hover:border-amber-500/30 transition-colors">
                        {post.meta?.category || "Article"}
                      </span>
                      <ArrowRight size={20} className="text-slate-600 group-hover:text-amber-400 -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-3xl md:text-4xl text-slate-200 group-hover:text-white leading-tight mb-4 transition-colors">
                      {post.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="font-sans text-slate-400 text-base leading-relaxed line-clamp-2 mb-8 group-hover:text-slate-300 transition-colors">
                      {post.excerpt}
                    </p>

                    {/* Meta Bottom */}
                    <div className="mt-auto flex items-center gap-6 text-xs font-medium text-slate-500 group-hover:text-amber-500/80 transition-colors uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} />
                        <span>{post.readTime || "5 min read"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
