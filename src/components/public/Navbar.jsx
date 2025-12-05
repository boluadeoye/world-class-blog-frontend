"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Home, BookOpen, Hash, User, MessageSquare, ChevronRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/", icon: <Home size={20} /> },
  { name: "Articles", href: "/articles", icon: <BookOpen size={20} /> },
  { name: "Topics", href: "/topics", icon: <Hash size={20} /> },
  { name: "About", href: "/about", icon: <User size={20} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Smart Scroll Logic: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* === SMART GLASS HEADER === */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center justify-between p-3 rounded-full bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
            
            {/* Logo Area */}
            <Link href="/" className="flex items-center gap-3 pl-2 group logo-area">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 group-hover:border-indigo-500 transition-colors">
                <img 
                  src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
                  alt="Bolu" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-white leading-none group-hover:text-indigo-300 transition-colors">
                  Boluwatife
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Engineer
                </span>
              </div>
            </Link>

            {/* Desktop Nav (Hidden on Mobile) */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-white text-slate-950 shadow-lg"
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
              className="mobile-menu-trigger p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/5"
              aria-label="Open Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* === PREMIUM SIDE DRAWER === */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#020617] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="font-serif text-xl text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Links Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${
                        pathname === link.href
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
                          : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {link.icon}
                        <span className="font-medium text-lg">{link.name}</span>
                      </div>
                      <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${pathname === link.href ? 'opacity-100' : ''}`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-white/5 bg-slate-950">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/chat"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    <MessageSquare size={20} />
                    Chat with AI
                  </Link>
                  <p className="text-center text-[10px] text-slate-600 mt-4 uppercase tracking-widest">
                    © 2025 Boluwatife Adeoye
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
