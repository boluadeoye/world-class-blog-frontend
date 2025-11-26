export const metadata = { title: "About • Boluwatife" };

export default function AboutPage() {
  const portrait = "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg";
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-7">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">About Boluwatife</h1>
          <p className="mt-3 text-slate-300">
            I’m a full‑stack developer and writer. I share fast, practical notes on building
            products, clean engineering, and writing in public.
          </p>
          <p className="mt-3 text-slate-400">
            You’ll find articles, demos, and projects I’m actively working on. If you’d like to
            collaborate or have a question, the chat is always open.
          </p>
        </div>

        <div className="col-span-12 md:col-span-5">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_24px_60px_rgba(0,0,0,.5)] bg-[radial-gradient(120%_90%_at_60%_0%,rgba(36,99,235,.18),transparent_60%),linear-gradient(180deg,#0f172a,#0b1220_80%)] min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portrait}
              alt="Portrait"
              className="absolute bottom-0 right-0 h-full w-full object-cover"
              style={{
                objectPosition: "center 22%",
                WebkitMaskImage: "linear-gradient(to bottom, #000 78%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to bottom, #000 78%, rgba(0,0,0,0) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
