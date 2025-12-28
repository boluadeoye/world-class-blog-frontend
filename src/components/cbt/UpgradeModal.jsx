"use client";
import { useState } from "react";
import { PaystackButton } from "react-paystack";
import { CheckCircle, Crown, X, Loader2, Sparkles, Zap, Clock, BookOpen } from "lucide-react";
import StatusModal from "./StatusModal";

export default function UpgradeModal({ student, onClose, onSuccess }) {
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState(null);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: student.email,
    amount: 50000,
    publicKey: "pk_test_1654a27f4eae7ea41981edeb2ec5993c029e361d",
  };

  const benefits = [
    { icon: <Sparkles size={16}/>, text: "Personalized AI Analysis" },
    { icon: <BookOpen size={16}/>, text: "Full 100+ Question Bank" },
    { icon: <Zap size={16}/>, text: "Unlimited Exam Retakes" },
    { icon: <Clock size={16}/>, text: "Customize Exam Duration" }
  ];

  const handleSuccess = async (reference) => {
    setVerifying(true);
    try {
      const res = await fetch("/api/cbt/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: reference.reference, studentId: student.id }),
      });
      if (res.ok) {
        setStatus({ type: 'success', title: 'Access Granted', message: 'Premium features are now active on your account.' });
      } else {
        setStatus({ type: 'error', title: 'Verification Failed', message: 'Payment could not be confirmed.' });
      }
    } catch (e) {
      setStatus({ type: 'error', title: 'Network Error', message: 'Connection lost.' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      {status && <StatusModal {...status} onAction={() => { if(status.type === 'success') onSuccess(); setStatus(null); }} />}
      
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden relative border border-white animate-in zoom-in duration-300">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-20"><X size={16} /></button>
          
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 p-10 text-center text-white relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="relative z-10">
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/30 shadow-xl animate-bounce">
                <Crown size={40} fill="currentColor" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Go Premium</h2>
              <p className="text-sm font-bold opacity-90">Unlock the Full Arsenal</p>
            </div>
          </div>

          <div className="p-8 bg-white">
            <div className="space-y-4 mb-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-4 text-gray-700 group">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {b.icon}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{b.text}</span>
                </div>
              ))}
            </div>

            {verifying ? (
              <div className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 animate-pulse">
                <Loader2 size={20} className="animate-spin" /> VERIFYING...
              </div>
            ) : (
              <PaystackButton {...config} text="PAY ₦500 NOW" onSuccess={handleSuccess} onClose={() => {}} className="w-full py-5 bg-gray-900 hover:bg-black text-white rounded-2xl font-black shadow-xl transform active:scale-95 transition-all uppercase tracking-[0.2em] text-xs" />
            )}
            <p className="text-center text-[9px] text-gray-400 mt-4 font-bold uppercase tracking-widest">Secure 7-Day Access • Paystack Secured</p>
          </div>
        </div>
      </div>
    </>
  );
}
