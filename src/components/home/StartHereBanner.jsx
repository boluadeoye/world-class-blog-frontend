// src/components/home/StartHereBanner.jsx
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { NotebookPen, Clapperboard, User, MessageSquare } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700","800","900"],
});

function Pill({ href, children, icon: Icon }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[13px] text-white/90 hover:bg-white hover:text-black transition"
    >
      <Icon size={16} /> {children}
    </Link>
  );
}

export default function StartHereBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-6xl studio-banner rounded-3xl border border-white/10 p-6 sm:p-8">
        <div className="studio-noise pointer-events-none absolute inset-0 rounded-3xl" />
        {/* Title */}
        <div className={`${playfair.className} text-white text-2xl sm:text-3xl font-extrabold tracking-tight`}>
          New here? Start here.
        </div>
        <p className="mt-2 max-w-2xl text-slate-300">
          A curated path into my best posts and helpful videos. Learn fast, then go deeper anywhere.
        </p>

        {/* Mini links */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <Pill href="/articles" icon={NotebookPen}>Notes</Pill>
          <Pill href="/#videos" icon={Clapperboard}>Videos</Pill>
          <Pill href="/about" icon={User}>About</Pill>
          <Pill href="/chat" icon={MessageSquare}>Chat</Pill>
        </div>
      </div>
    </section>
  );
}
