"use client";
import { useState } from "react";
import { PaystackButton } from "react-paystack";
import { CheckCircle, Crown, X, Loader2 } from "lucide-react";
import StatusModal from "./StatusModal";

export default function UpgradeModal({ student, onClose, onSuccess }) {
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState(null); // { type, title, message }

  const config = {
    reference: (new Date()).getTime().toString(),
    email: student.email,
    amount: 50000,
    publicKey: "pk_test_1654a27f4eae7ea41981edeb2ec5993c029e361d",
  };

  const handleSuccess = async (reference) => {
    setVerifying(true);
    try {
      const res = await fetch("/api/cbt/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: reference.reference, studentId: student.id }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', title: 'Premium Active', message: 'Your account has been upgraded. Welcome to the elite tier.' });
      } else {
        setStatus({ type: 'error', title: 'Verification Failed', message: data.error || 'Payment could not be confirmed.' });
      }
    } catch (e) {
      setStatus({ type: 'error', title: 'Network Error', message: 'Connection lost during verification. Please contact support.' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      {status && <StatusModal {...status} onAction={() => { if(status.type === 'success') onSuccess(); setStatus(null); }} />}
      
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden relative border border-white">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={16} /></button>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-10 text-center text-white">
            <div className="mx-auto w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/30 shadow-xl animate-bounce">
              <Crown size={40} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Go Premium</h2>
            <p className="text-sm font-bold opacity-90">Unlock Full Access for 1 Week</p>
          </div>
          <div className="p-8">
            <div className="space-y-4 mb-8">
              {[ "Unlimited Exam Retakes", "Full 60-Question Bank", "AI Performance Analysis", "Detailed Corrections" ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-tight">{text}</span>
                </div>
              ))}
            </div>
            {verifying ? (
              <div className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 animate-pulse">
                <Loader2 size={20} className="animate-spin" /> VERIFYING...
              </div>
            ) : (
              <PaystackButton {...config} text="PAY ₦500 NOW" onSuccess={handleSuccess} onClose={() => {}} className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-black shadow-xl transform active:scale-95 transition-all uppercase tracking-widest text-xs" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
