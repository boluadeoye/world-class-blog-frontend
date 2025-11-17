export default function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Adeoye Boluwatife. All rights reserved.</p>
        <p className="text-[11px]">
          Built with powerful modern technology, crafted with care.
        </p>
      </div>
    </footer>
  );
}