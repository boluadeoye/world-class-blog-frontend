import ModernHero from "@/components/home/ModernHero";

export default async function Page() {
  return (
    <main className="fixed inset-0 z-[9999] isolate overflow-y-auto bg-slate-950">
      <ModernHero />
      {/* Other sections... */}
    </main>
  );
}
