"use client";
import { useState } from "react";
import { PaystackButton } from "react-paystack";
import { CheckCircle, Crown, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function UpgradeModal({ student, onClose, onSuccess }) {
  const [verifying, setVerifying] = useState(false);

  // CONFIGURATION
  const config = {
    reference: (new Date()).getTime().toString(),
    email: student.email,
    amount: 50000, // 500 Naira (in kobo)
    publicKey: "pk_test_YOUR_PAYSTACK_PUBLIC_KEY_HERE", // REPLACE THIS!
  };

  const handleSuccess = async (reference) => {
    setVerifying(true);
    try {
      // Call our Secure Backend API
      const res = await fetch("/api/cbt/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: reference.reference, studentId: student.id }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (e) {
      alert("Network error during verification.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <X size={16} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 text-center text-white">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/30">
            <Crown size={32} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Go Premium</h2>
          <p className="text-sm font-medium opacity-90">Unlock Full Access for 1 Week</p>
        </div>

        {/* Benefits */}
        <div className="p-8">
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle size={20} className="text-green-600 shrink-0" />
              <span className="text-sm font-bold">Unlimited Exam Retakes</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle size={20} className="text-green-600 shrink-0" />
              <span className="text-sm font-bold">Full 60-Question Bank</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle size={20} className="text-green-600 shrink-0" />
              <span className="text-sm font-bold">AI Performance Analysis</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle size={20} className="text-green-600 shrink-0" />
              <span className="text-sm font-bold">Detailed Corrections</span>
            </div>
          </div>

          {/* Pay Button */}
          {verifying ? (
            <button disabled className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2">
              <Loader2 size={20} className="animate-spin" /> Verifying...
            </button>
          ) : (
            <PaystackButton 
              {...config}
              text="Pay ₦500 Now"
              onSuccess={handleSuccess}
              onClose={() => {}}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-lg transform active:scale-95 transition-all"
            />
          )}
          
          <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">
            Secure Payment via Paystack
          </p>
        </div>
      </motion.div>
    </div>
  );
}
