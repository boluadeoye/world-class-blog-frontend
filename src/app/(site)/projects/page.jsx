import ShowcaseUI from "../../../components/topics/ShowcaseUI";

export const metadata = {
  title: "Project Blueprints | Bolu Adeoye",
  description: "A gallery of high-performance web applications and AI systems.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 pt-24 pb-12 px-6">
      <ShowcaseUI />
    </main>
  );
}
