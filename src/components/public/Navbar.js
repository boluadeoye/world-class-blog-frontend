// Navbar — uses a single portrait everywhere (simple, inline)
import Link from "next/link";

export default function Navbar() {
  const portrait = "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} alt="Site portrait" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20" />
          <span className="text-sm font-semibold text-white">Bolu Adeoye</span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <Link href="/articles" className="text-sm text-slate-300 hover:text-white">Articles</Link>
          <Link href="/projects" className="text-sm text-slate-300 hover:text-white">Projects</Link>
          <Link href="/about" className="text-sm text-slate-300 hover:text-white">About</Link>
          <Link href="/chat" className="text-sm text-white rounded-full border border-white/30 px-3 py-1.5 hover:bg-white hover:text-black transition">Chat</Link>
        </div>

        <div className="md:hidden">
          <Link href="/chat" className="text-sm text-white rounded-full border border-white/30 px-3 py-1.5 hover:bg-white hover:text-black transition">Chat</Link>
        </div>
      </nav>
    </header>
  );
}
