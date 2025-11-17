export const metadata = {
  title: "About | Adeoye Boluwatife",
};

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] items-start">
        {/* Text column */}
        <section className="space-y-5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            About
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Adeoye Boluwatife
          </h1>
          <h2 className="text-sm font-medium text-slate-300 sm:text-base">
            Full‑stack developer & writer — exploring health, finance,
            technology and education.
          </h2>

          <p className="text-sm text-slate-300/90">
            I build things on the web and write about how we can live better
            lives with technology, money and knowledge. This blog has one goal:
            to turn complex ideas into tools you can actually use.
          </p>

          <p className="text-sm text-slate-300/90">
            On the engineering side, I care about clear abstractions,
            performance and reliability. On the human side, I care about sleep,
            energy, focus, habits, how we think about money, and how we learn
            new skills quickly but sustainably.
          </p>

          <p className="text-sm text-slate-300/90">
            You&apos;ll see essays that connect these worlds: how to design
            systems, how to think about risk, how to grow as an engineer, how
            to protect your health while you push hard, and how to keep learning
            long after school ends.
          </p>

          <section className="mt-4 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <h3 className="text-xs font-semibold text-slate-100">
                Things I write about
              </h3>
              <ul className="mt-2 space-y-1 text-xs text-slate-300/90">
                <li>• Health as a foundation for deep work</li>
                <li>• Finance and long‑term decision‑making</li>
                <li>• Software, infrastructure, and the web</li>
                <li>• Learning, teaching and compounding skills</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <h3 className="text-xs font-semibold text-slate-100">
                What you can expect
              </h3>
              <ul className="mt-2 space-y-1 text-xs text-slate-300/90">
                <li>• Essays, not clickbait</li>
                <li>• Practical frameworks and mental models</li>
                <li>• Honest reflections from real projects</li>
                <li>• Systems you can adapt to your own life</li>
              </ul>
            </div>
          </section>
        </section>

        {/* Photo column */}
        <section className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xs">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sky-500/20 via-cyan-400/10 to-emerald-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-sky-500/60 bg-slate-950/80 shadow-2xl shadow-sky-500/40">
              <img
                src="/adeoye.jpg"
                alt="Adeoye Boluwatife"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}