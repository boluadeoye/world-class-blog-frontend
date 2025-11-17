import ProjectsGrid from "../../components/public/ProjectsGrid";

export const metadata = { title: "Projects | Adeoye Boluwatife" };

export default function ProjectsPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6 space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Projects</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          My recent work
        </h1>
        <p className="max-w-2xl text-sm text-slate-300/90">
          Websites, apps and tools — snapshots are live previews. Click any card to open the real site.
        </p>
      </header>
      <ProjectsGrid />
    </div>
  );
}