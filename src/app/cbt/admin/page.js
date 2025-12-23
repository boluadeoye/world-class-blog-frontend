"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple API call to verify admin (We will build this API next)
    const res = await fetch("/api/cbt/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      // Store session (Basic for now)
      sessionStorage.setItem("cbt_admin_token", "logged_in");
      router.push("/cbt/admin/dashboard");
    } else {
      alert("Access Denied: Invalid Credentials");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      {/* HIDE GLOBAL HEADER */}
      <style jsx global>{`header { display: none !important; }`}</style>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border-t-4 border-green-700">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-green-100 rounded-full text-green-800 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">CBT Control Center</h1>
          <p className="text-sm text-gray-500 mt-1">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Admin ID</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Passkey</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "Access Dashboard"} <Lock size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
