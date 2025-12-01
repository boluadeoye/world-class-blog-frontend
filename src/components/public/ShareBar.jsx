// src/components/public/ShareBar.jsx
"use client";

export default function ShareBar({ url, title }) {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://boluadeoye.com.ng";
  const canonical = url && url.startsWith("http") ? url : `${site}${url || ""}`;
  const encUrl = encodeURIComponent(canonical);
  const encTitle = encodeURIComponent(title || "Check this out");

  const items = [
    { name: "Copy", onClick: async () => { try{ await navigator.clipboard.writeText(canonical); }catch{}; } },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${encUrl}&text=${encTitle}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}` },
    { name: "WhatsApp", href: `https://api.whatsapp.com/send?text=${encTitle}%20${encUrl}` },
    { name: "Telegram", href: `https://t.me/share/url?url=${encUrl}&text=${encTitle}` },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) =>
        it.href ? (
          <a key={i} href={it.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            {it.name}
          </a>
        ) : (
          <button key={i} onClick={it.onClick} className="btn-ghost">{it.name}</button>
        )
      )}
    </div>
  );
}
