"use client";

import { Code2, PenTool, Camera } from "lucide-react";

const cards = [
  {
    title: "Full‑stack Development",
    desc: "Design, build and ship web apps that are fast and reliable.",
    Icon: Code2,
    highlight: true,
  },
  {
    title: "Technical Writing",
    desc: "Clear docs, tutorials and notes that teach and scale your work.",
    Icon: PenTool,
    highlight: false,
  },
  {
    title: "Video & Demos",
    desc: "Concise product videos and walkthroughs people finish.",
    Icon: Camera,
    highlight: false,
  },
];

export default function ServicesSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <div className="relative">
          <p className="section-eyebrow">01.</p>
          <h2 className="section-h2">Services</h2>
          <div aria-hidden className="ghost-title">Services</div>
        </div>
        <a href="/projects" className="btn-ghost">View all services</a>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map(({ title, desc, Icon, highlight }) => (
          <div
            key={title}
            className={[
              "rounded-2xl border shadow-sm overflow-hidden",
              highlight
                ? "border-sky-700/50 bg-gradient-to-br from-sky-700/40 to-sky-900/30"
                : "border-slate-800 bg-slate-900/40",
            ].join(" ")}
          >
            <div className="p-6">
              <div className={[
                "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg",
                highlight ? "bg-sky-600/30 text-sky-200" : "bg-slate-800 text-slate-300",
              ].join(" ")}>
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
