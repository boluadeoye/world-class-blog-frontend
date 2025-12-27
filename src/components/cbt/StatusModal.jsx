"use client";
import { CheckCircle, XCircle, AlertTriangle, LogOut } from "lucide-react";

export default function StatusModal({ type, title, message, actionLabel, onAction, onCancel }) {
  const configs = {
    success: { icon: <CheckCircle className="text-green-600" size={40} />, bg: "bg-green-50", btn: "bg-green-700 hover:bg-green-800" },
    error: { icon: <XCircle className="text-red-600" size={40} />, bg: "bg-red-50", btn: "bg-red-600 hover:bg-red-700" },
    warning: { icon: <AlertTriangle className="text-orange-600" size={40} />, bg: "bg-orange-50", btn: "bg-orange-600 hover:bg-orange-700" },
    logout: { icon: <LogOut className="text-red-600" size={40} />, bg: "bg-red-50", btn: "bg-red-600 hover:bg-red-700" }
  };

  const config = configs[type] || configs.error;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100">
        <div className={`${config.bg} p-10 flex flex-col items-center text-center`}>
          <div className="mb-4 drop-shadow-sm">{config.icon}</div>
          <h3 className="font-black text-xl text-gray-900 uppercase tracking-tight mb-2">{title}</h3>
          <p className="text-gray-600 text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <div className="p-6 bg-white flex gap-3">
          {onCancel && (
            <button onClick={onCancel} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black text-gray-400 hover:bg-gray-50 uppercase tracking-widest transition-all">
              Cancel
            </button>
          )}
          <button onClick={onAction} className={`flex-[1.5] py-4 ${config.btn} text-white rounded-2xl text-xs font-black shadow-lg transition-all active:scale-95 uppercase tracking-widest`}>
            {actionLabel || "Acknowledge"}
          </button>
        </div>
      </div>
    </div>
  );
}
