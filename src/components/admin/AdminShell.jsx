"use client";

import QueryProvider from "../../lib/providers";
import AdminSidebar from "./AdminSidebar";

/**
 * AdminShell
 * - Provides a polished admin layout with sidebar + content area
 * - Wraps everything in QueryProvider so data hooks can work later if needed
 */
export default function AdminShell({ children }) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-6xl mx-auto flex min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 gap-6">
          <AdminSidebar />
          <main className="flex-1 bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}