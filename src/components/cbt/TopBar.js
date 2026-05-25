"use client";
import { LogOut } from "lucide-react";

export default function TopBar({ isOpen, setIsOpen, triggerLogout }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-1 mr-2 text-slate-700 hover:text-black focus:outline-none"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <span className="font-semibold">ExamForge</span>
        <span className="breadcrumb-active ml-1">/ Dashboard</span>
      </div>
      <div className="topbar-right flex items-center gap-4">
        <span className="topbar-date hidden sm:inline text-xs text-[#7A7870] font-mono">Active Session • 2026 WAT</span>
        <button onClick={triggerLogout} className="topbar-action bg-[#8B2020] hover:bg-red-800 transition-colors flex items-center gap-1.5 border-0 py-2 px-4 rounded text-white text-xs font-mono">
          <LogOut size={12} /> Disconnect
        </button>
      </div>
    </header>
  );
}
