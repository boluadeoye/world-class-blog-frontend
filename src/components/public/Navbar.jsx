"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Home, BookOpen, Hash, User, ChevronRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  { name: "Articles", href: "/articles", icon: <BookOpen size={18} /> },
  { name: "Topics", href: "/topics", icon: <Hash size={18} /> },
  { name: "About", href: "/about", icon: <User size={18} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Smart Scroll: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      {/* === COMPACT SMART HEADER === */}
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 px-4 py-3"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center justify-between p-2 pl-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-lg">
            
            {/* Logo Area */}
            <Link href="/" className="flex items-center gap-3 group logo-area">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-indigo-500 transition-colors">
                <img 
                  src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
                  alt="Bolu" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-white leading-none group-hover:text-indigo-300 transition-colors">
                  Adeoye Boluwatife
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  Software Engineer
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    pathname === link.href
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="mobile-menu-trigger p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/5"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* === SIDE DRAWER === */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-[#020617] border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <span className="font-serif text-lg text-white">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-white/5 text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group flex items-center justify-between p-3 rounded-xl transition-all ${
                      pathname === link.href
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <span className="font-medium text-sm">{link.name}</span>
                    </div>
                    <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 ${pathname === link.href ? 'opacity-100' : ''}`} />
                  </Link>
                ))}
              </div>
              
              <div className="p-5 border-t border-white/5">
                <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest">
                  © 2025 Adeoye Boluwatife
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
