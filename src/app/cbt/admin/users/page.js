"use client";
import { useState, useEffect } from "react";
import { Search, Users, Crown, ShieldCheck, Building2, Calendar } from "lucide-react";

export default function UserRegistry() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, premium: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Debounce search to prevent server spam
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/cbt/admin/users?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
        setStats(data.stats);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-300 font-sans p-6 pb-20">
      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
          <Users className="text-green-500" /> The Registry
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-mono">TOTAL DATABASE POPULATION</p>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Recruits</p>
          <p className="text-3xl font-black text-white mt-1">{stats.total}</p>
        </div>
        <div className="bg-green-900/20 border border-green-900 p-5 rounded-2xl">
          <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Premium Agents</p>
          <p className="text-3xl font-black text-green-400 mt-1">{stats.premium}</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search by Name, Email or Dept..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-green-600 transition-colors text-sm font-medium"
        />
        <Search className="absolute left-4 top-4 text-gray-500" size={20} />
      </div>

      {/* USER LIST */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-xs font-mono text-gray-600 animate-pulse">ACCESSING DATABASE...</div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="bg-gray-900/50 border border-gray-800 p-4 rounded-2xl flex justify-between items-center group hover:border-gray-700 transition-all">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  {user.name}
                  {user.subscription_status === 'premium' && <Crown size={12} className="text-yellow-500 fill-yellow-500" />}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[9px] font-mono text-gray-600 flex items-center gap-1 bg-gray-800 px-2 py-0.5 rounded">
                    <Building2 size={8} /> {user.department || "General"}
                  </span>
                  <span className="text-[9px] font-mono text-gray-600 flex items-center gap-1">
                    <Calendar size={8} /> {user.joined_at}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                {user.subscription_status === 'premium' ? (
                  <span className="bg-green-900/30 text-green-400 border border-green-800 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    Premium
                  </span>
                ) : (
                  <span className="bg-gray-800 text-gray-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    Basic
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-600 text-xs">No agents found matching criteria.</div>
        )}
      </div>
    </main>
  );
}
