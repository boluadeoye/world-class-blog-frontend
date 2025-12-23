import { AboutHero, SkillsGrid, BioSection } from "../../../components/about/AboutUI";

export const metadata = {
  title: "About Bolu Adeoye | The Architect",
  description: "Full-Stack Engineer, Technical Writer, and Digital Strategist.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30">
      <AboutHero />
      <BioSection />
      <SkillsGrid />
    </main>
  );
}
