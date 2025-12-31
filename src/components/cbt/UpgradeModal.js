"use client";
import { useState } from "react";
import { X, CheckCircle, Crown, Loader2 } from "lucide-react";

export default function UpgradeModal({ student, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const handleVerify = async () => {
    const ref = prompt("Enter Paystack Reference:");
    if (!ref) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cbt/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref, studentId: student.id })
      });
      const data = await res.json();
      if (data.success) { alert("Success!"); onSuccess(); } 
      else { alert("Failed: " + data.error); }
    } catch (e) { alert("Error"); }
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Premium Access</h2>
        <button onClick={handleVerify} className="bg-green-700 text-white px-6 py-3 rounded-xl w-full font-bold">{loading ? "Verifying..." : "I Have Paid"}</button>
        <button onClick={onClose} className="mt-4 text-gray-500 text-sm">Close</button>
      </div>
    </div>
  );
}
