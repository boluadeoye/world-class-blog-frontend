"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function ProjectCard({ title, tag, link, image, className }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`group relative rounded-[2rem] overflow-hidden bg-white border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgb(0,0,0,0.08)] transition-all flex flex-col ${className}`}
    >
      <div className="absolute inset-0 w-full h-full bg-gray-100">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          unoptimized
        />
      </div>
      
      {/* Tech-style Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        <div className="flex justify-end">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
            <ArrowUpRight size={18} strokeWidth={2} />
          </div>
        </div>
        
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2 block">
            {tag}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      </div>
    </motion.a>
  );
}
