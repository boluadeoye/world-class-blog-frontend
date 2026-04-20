"use client";
import { motion } from 'framer-motion';

const techs = [
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'WooCommerce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' }
];

export default function TechStack() {
  return (
    <div className="w-full py-20 border-y border-black/5 my-32 overflow-hidden bg-white relative flex flex-col items-center">
      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-ink/30 mb-12">The Arsenal</span>
      
      {/* Infinite Marquee */}
      <div className="flex w-[200%]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex w-full justify-around items-center"
        >
          {[...techs, ...techs, ...techs].map((tech, i) => (
            <div key={i} className="flex flex-col items-center gap-4 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-500 grayscale hover:grayscale-0 px-8">
              <img src={tech.icon} alt={tech.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-ink/80">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
}
