"use client";
import { useState, useEffect } from "react";

export default function DebugPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/debug')
      .then(res => res.json())
      .then(setReport)
      .catch(err => alert("Debug Failed"));
  }, []);

  if (!report) return <div className="p-10 font-mono">RUNNING DIAGNOSTICS...</div>;

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono text-sm">
      <h1 className="text-2xl font-bold mb-6 border-b border-green-800 pb-2">SYSTEM DIAGNOSTIC REPORT</h1>
      
      <div className="space-y-4">
        <div>
          <span className="text-gray-500">DATABASE CONNECTION:</span>
          <div className="font-bold">{report.connection}</div>
        </div>

        <div>
          <span className="text-gray-500">DETECTED TABLES:</span>
          <div className="text-white">{report.tables.join(", ") || "NONE"}</div>
        </div>

        <div className={`p-4 border ${report.results_table_exists ? 'border-green-600' : 'border-red-600'} rounded`}>
          <div className="font-bold mb-2">CBT RESULTS TABLE STATUS</div>
          <div>EXISTS: {report.results_table_exists ? "YES" : "NO ❌"}</div>
          <div>ROW COUNT: {report.results_count}</div>
          <div>WRITE TEST: <span className={report.test_insert.includes("SUCCESS") ? "text-green-400" : "text-red-500 font-bold"}>{report.test_insert}</span></div>
        </div>

        {!report.results_table_exists && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500 text-red-300">
            CRITICAL FAILURE: The results table is missing. The security system cannot save attempts.
            <br/>
            <strong>ACTION:</strong> Run the Fix-DB script again.
          </div>
        )}
      </div>
    </div>
  );
}
