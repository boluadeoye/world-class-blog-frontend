"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "../../lib/apiClient";

export default function AdminSidebar() {
  const pathname = usePathname() || "";
  const router = useRouter();
  const logout = useLogout();

  const isActive = (p) => pathname === p || pathname.startsWith(p + "/");

  const handleLogout = () => {
    logout.mutate(null, { onSuccess: () => router.push("/admin/login") });
  };

  return (
    <aside className="w-64 bg-slate-900/70 border-r border-slate-800 p-4 rounded-2xl m-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-100">Admin</h2>
      </div>

      <nav className="space-y-2">
        <Link href="/admin/dashboard" className={isActive("/admin/dashboard") ? "font-semibold text-slate-50" : "text-slate-300"}>
          Dashboard
        </Link>
        <Link href="/admin/editor" className={isActive("/admin/editor") ? "font-semibold text-slate-50" : "text-slate-300"}>
          New Post
        </Link>
        <Link href="/admin/projects" className={isActive("/admin/projects") ? "font-semibold text-slate-50" : "text-slate-300"}>
          Projects
        </Link>
      </nav>

      <div className="mt-6">
        <button className="text-red-400" onClick={handleLogout} disabled={logout.isLoading}>
          {logout.isLoading ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </aside>
  );
}