'use client';
import { useRef, useState } from "react";

export default function CoverUpload({ onChange }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState("");

  const pick = () => ref.current?.click();

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      // 1) ask API for a signed upload URL
      const r = await fetch("/api/upload", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ filename: file.name, type: file.type || "image/jpeg" })
      });
      const j = await r.json().catch(()=>({}));
      if (!r.ok || !j?.uploadUrl) throw new Error(j?.error || "Failed to get upload URL");

      // 2) upload the file to Blob (direct)
      const up = await fetch(j.uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type || "image/jpeg", "x-vercel-filename": file.name },
        body: file
      });
      const data = await up.json().catch(()=>({}));
      if (!up.ok || !data?.url) throw new Error(data?.error || "Upload failed");

      setUrl(data.url);
      onChange?.(data.url);
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onFile} />
      <button type="button" className="btn-beam-gold btn-xs" onClick={pick} disabled={busy}>
        {busy ? "Uploading…" : "Upload Cover"}
      </button>
      {url && <a href={url} target="_blank" rel="noreferrer" className="text-sky-300 text-xs underline">Preview</a>}
    </div>
  );
}
