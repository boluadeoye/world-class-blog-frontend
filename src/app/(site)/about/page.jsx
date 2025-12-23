import { AboutHero, SkillsGrid, BioSection } from "../../components/about/AboutUI";

export const metadata = {
  title: "About Bolu Adeoye | The Architect",
  description: "Full-Stack Engineer, API Expert, and AI Specialist building world-class digital ecosystems.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30 overflow-x-hidden">
      <AboutHero />
      <SkillsGrid />
      <BioSection />
    </main>
  );
}
