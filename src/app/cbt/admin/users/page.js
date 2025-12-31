"use client";
import { useState, useEffect } from "react";
import { Search, Users, Crown, Building2, Calendar, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserRegistry() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, premium: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/cbt/admin/users?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
        setStats(data.stats);
      }
      setLoading(false);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    const timer = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 font-sans p-6 pb-20">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
            <Users className="text-green-500" /> The Registry
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 font-mono uppercase">Personnel Intelligence Feed</p>
        </div>
        <button onClick={() => router.back()} className="p-3 bg-gray-900 rounded-full text-white"><ArrowLeft size={20}/></button>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-xl">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Total Recruits</p>
          <p className="text-3xl font-black text-white mt-1">{stats.total}</p>
        </div>
        <div className="bg-green-900/20 border border-green-900/50 p-5 rounded-2xl shadow-xl">
          <p className="text-[9px] font-black text-green-500 uppercase tracking-widest">Premium Elite</p>
          <p className="text-3xl font-black text-green-400 mt-1">{stats.premium}</p>
        </div>
      </div>

      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="Search Name, Email or Dept..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 text-white p-4 pl-12 rounded-2xl focus:outline-none focus:border-green-600 transition-all text-sm font-medium shadow-inner"
        />
        <Search className="absolute left-4 top-4 text-gray-600" size={20} />
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-20 text-xs font-mono text-green-800 animate-pulse uppercase tracking-[0.3em]">Accessing Encrypted Files...</div>
        ) : users.map((user) => (
          <div key={user.id} className="bg-gray-900/40 border border-gray-800/50 p-5 rounded-[1.5rem] flex justify-between items-center hover:border-green-900/50 transition-all group">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-white text-sm flex items-center gap-2 truncate">
                {user.name}
                {user.subscription_status === 'premium' && <Crown size={12} className="text-yellow-500 fill-yellow-500 animate-pulse" />}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">{user.email}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[8px] font-black text-gray-400 flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-md uppercase tracking-tighter">
                  <Building2 size={10} /> {user.department || "General"}
                </span>
                <span className="text-[8px] font-black text-gray-600 flex items-center gap-1 uppercase tracking-tighter">
                  <Calendar size={10} /> {user.joined_at}
                </span>
              </div>
            </div>
            
            <div className="ml-4">
              {user.subscription_status === 'premium' ? (
                <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-sm">Elite</div>
              ) : (
                <div className="bg-gray-800 text-gray-500 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest">Recruit</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
