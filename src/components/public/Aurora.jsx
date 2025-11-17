"use client";

export default function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* big soft blobs */}
      <div className="absolute -top-28 -left-40 h-80 w-80 rounded-full bg-sky-500/25 blur-[120px]" />
      <div className="absolute -bottom-36 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />
      {/* faint gradient horizon */}
      <div className="absolute inset-x-0 top-[40%] h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
    </div>
  );
}