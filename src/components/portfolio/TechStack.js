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
    <div className="w-full py-12 border-y border-black/5 my-20 overflow-hidden flex flex-col items-center">
      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-black/40 mb-10">Core Arsenal</span>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-6">
        {techs.map((tech, i) => (
          <motion.div 
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
          >
            <img src={tech.icon} alt={tech.name} className="w-10 h-10 md:w-14 md:h-14 object-contain" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-black/60">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
