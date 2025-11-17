export default function PostCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow skel">
      <div className="mb-4 h-5 w-28 rounded bg-slate-800/80" />
      <div className="mb-2 h-5 w-3/4 rounded bg-slate-800/80" />
      <div className="mb-1 h-4 w-full rounded bg-slate-800/80" />
      <div className="mb-1 h-4 w-5/6 rounded bg-slate-800/80" />
      <div className="mt-4 h-4 w-24 rounded bg-slate-800/80" />
    </div>
  );
}