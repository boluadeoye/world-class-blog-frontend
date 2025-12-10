"use client";
import { useState, useEffect } from "react";

export default function DebugPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/debug")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <main className="min-h-screen bg-black text-green-400 p-6 font-mono text-xs overflow-x-hidden">
      <h1 className="text-xl font-bold text-white mb-4">Available AI Models</h1>
      {data ? (
        <pre className="whitespace-pre-wrap break-all">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p className="animate-pulse">Querying Google Servers...</p>
      )}
    </main>
  );
}
