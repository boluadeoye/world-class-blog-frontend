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
      const fd = new FormData();
      fd.append("file", file);

      const r = await fetch("/api/upload", { method: "POST", body: fd });
      if (!r.ok) throw new Error("Upload failed");
      const data = await r.json();
      setUrl(data.url);
      onChange?.(data.url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
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
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="text-sky-300 text-xs underline">
          Preview
        </a>
      )}
    </div>
  );
}
