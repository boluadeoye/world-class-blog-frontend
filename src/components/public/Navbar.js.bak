// Navbar — portrait, Chat button, and a restored hamburger side menu
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";

export default function Navbar() {
  const portrait =
    "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";

  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent background scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  const NavA = ({ href, children }) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: brand */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portrait}
            alt="Site portrait"
            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20"
          />
          <span className="text-sm font-semibold text-white">Bolu Adeoye</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-5 md:flex">
          <Link href="/articles" className="text-sm text-slate-300 hover:text-white">Articles</Link>
          <Link href="/projects" className="text-sm text-slate-300 hover:text-white">Projects</Link>
          <Link href="/about" className="text-sm text-slate-300 hover:text-white">About</Link>
          <Link href="/#videos" className="text-sm text-slate-300 hover:text-white">Videos</Link>
          <Link href="/chat" className="text-sm text-white rounded-full border border-white/30 px-3 py-1.5 hover:bg-white hover:text-black transition flex items-center">
            Chat <MessageCircle size={16} className="ml-1" />
          </Link>
        </div>

        {/* Right: Chat (mobile) + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/chat" className="text-sm text-white rounded-full border border-white/30 px-3 py-1.5 hover:bg-white hover:text-black transition flex items-center">
            Chat <MessageCircle size={16} className="ml-1" />
          </Link>
          <button
            aria-label="Open menu"
            aria-controls="side-menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Slide-over menu */}
      <div
        id="side-menu"
        className={[
          "fixed inset-0 z-50 transition",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <aside
          className={[
            "absolute right-0 top-0 h-full w-72 sm:w-80 bg-slate-950/95",
            "border-l border-white/10 shadow-[0_24px_60px_rgba(0,0,0,.6)]",
            "transition-transform duration-200",
            open ? "translate-x-0" : "translate-x-full"
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portrait}
                alt="Portrait"
                className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
              />
              <span className="text-sm font-semibold text-white">Bolu Adeoye</span>
            </div>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-3 py-2">
            <NavA href="/">Home</NavA>
            <NavA href="/articles">Articles</NavA>
            <NavA href="/projects">Projects</NavA>
            <NavA href="/about">About</NavA>
            <NavA href="/#videos">Videos</NavA>
            <div className="mt-2 border-t border-white/10" />
            <NavA href="/chat">Chat</NavA>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 text-[11px] text-slate-400">
            © {new Date().getFullYear()} Bolu Adeoye
          </div>
        </aside>
      </div>
    </header>
  );
}
