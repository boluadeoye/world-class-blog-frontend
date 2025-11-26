"use client";

const f = (v, fallback) => (process.env[v] && String(process.env[v]).trim()) || fallback;

export default function StatsBar() {
  const items = [
    { k: "NEXT_PUBLIC_STAT_SUBSCRIBERS", label: "Subscribers", value: f("NEXT_PUBLIC_STAT_SUBSCRIBERS","459K") },
    { k: "NEXT_PUBLIC_STAT_PROJECTS", label: "Projects", value: f("NEXT_PUBLIC_STAT_PROJECTS","300+") },
    { k: "NEXT_PUBLIC_STAT_MUSIC", label: "Music Videos", value: f("NEXT_PUBLIC_STAT_MUSIC","400") },
    { k: "NEXT_PUBLIC_STAT_COMMERCIALS", label: "Commercials", value: f("NEXT_PUBLIC_STAT_COMMERCIALS","200") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-5 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-slate-50">{value}</div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
