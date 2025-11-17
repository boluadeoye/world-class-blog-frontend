"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import adeoyePic from "../../../public/adeoye.jpg";
import { Menu, X, Home, BookOpen, Hash, User, FolderKanban } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/articles", label: "Articles", icon: BookOpen },
  { href: "/topics", label: "Topics", icon: Hash },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/about", label: "About", icon: User }
];

export default function Navbar() {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");
  const [open, setOpen] = useState(false);
  if (isAdmin) return null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-sky-500/60 bg-slate-900 shadow-lg shadow-sky-500/40">
              <Image src={adeoyePic} alt="Adeoye Boluwatife" width={36} height={36} className="h-9 w-9 object-cover" priority />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight text-slate-50">Adeoye Boluwatife</span>
              <span className="text-[11px] text-slate-400">Full‑stack developer & writer</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 text-xs sm:flex sm:text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3 py-1.5 transition ${pathname === href
                  ? "bg-sky-500 text-sky-950 shadow-sm shadow-sky-500/50"
                  : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/70"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/80 p-2 text-slate-200 hover:border-sky-500/60 hover:text-sky-200 sm:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col border-l border-slate-800 bg-slate-950/95 shadow-xl">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-sky-500/60 bg-slate-900">
                  <Image src={adeoyePic} alt="Adeoye Boluwatife" width={36} height={36} className="h-9 w-9 object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-slate-50">Adeoye Boluwatife</span>
                  <span className="text-[11px] text-slate-400">Developer & writer</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full border border-slate-700/70 bg-slate-900/80 p-1.5 text-slate-300 hover:text-slate-100" aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-2 border-t border-slate-800 px-4 py-3 space-y-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-100 hover:bg-slate-800/80">
                  <Icon className="h-4 w-4 text-sky-400" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}