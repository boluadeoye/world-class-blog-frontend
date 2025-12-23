import ShowcaseUI from "../../components/topics/ShowcaseUI";

export const metadata = {
  title: "Project Blueprints | Bolu Adeoye",
  description: "A curated collection of premium software architectures available for deployment.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-24">
      <ShowcaseUI />
    </main>
  );
}
