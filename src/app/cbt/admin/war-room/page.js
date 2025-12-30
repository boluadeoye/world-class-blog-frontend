"use client";
import { useState, useEffect } from "react";
import { Activity, Users, DollarSign, Radio, ShieldAlert, RefreshCw } from "lucide-react";

export default function WarRoom() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = async () => {
    try {
      const res = await fetch("/api/cbt/admin/war-room");
      const json = await res.json();
      setData(json);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="min-h-screen bg-black text-green-500 flex items-center justify-center font-mono">INITIALIZING SATELLITE UPLINK...</div>;

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono p-6">
      <header className="flex justify-between items-center mb-8 border-b border-green-900 pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
            <Radio className="animate-pulse text-red-500" /> WAR ROOM
          </h1>
          <p className="text-xs text-green-700 mt-1">LIVE INTELLIGENCE FEED • {lastUpdate.toLocaleTimeString()}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-white">{data?.online_count || 0}</div>
          <div className="text-[10px] uppercase tracking-widest text-green-600">Active Users</div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* CARD 1: TRAFFIC */}
        <div className="bg-green-900/10 border border-green-900/50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2 text-green-400">
            <Users size={18} /> <span className="text-xs font-bold uppercase">Live Traffic</span>
          </div>
          <div className="text-4xl font-black text-white mb-1">{data?.online_count}</div>
          <p className="text-[10px] text-green-600">Users online right now</p>
        </div>

        {/* CARD 2: REVENUE */}
        <div className="bg-green-900/10 border border-green-900/50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2 text-green-400">
            <DollarSign size={18} /> <span className="text-xs font-bold uppercase">24h Revenue</span>
          </div>
          <div className="text-4xl font-black text-white mb-1">₦{data?.revenue?.toLocaleString()}</div>
          <p className="text-[10px] text-green-600"> Confirmed Transactions</p>
        </div>

        {/* CARD 3: SYSTEM STATUS */}
        <div className="bg-green-900/10 border border-green-900/50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2 text-green-400">
            <Activity size={18} /> <span className="text-xs font-bold uppercase">System Health</span>
          </div>
          <div className="text-4xl font-black text-emerald-400 mb-1">100%</div>
          <p className="text-[10px] text-green-600">Operational</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LIVE USER LIST */}
        <section className="bg-black border border-green-900 rounded-xl overflow-hidden">
          <div className="bg-green-900/20 p-4 border-b border-green-900 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest">Active Sessions</h3>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <div className="divide-y divide-green-900/30 max-h-[400px] overflow-y-auto">
            {data?.users?.map((user) => (
              <div key={user.student_id} className="p-4 flex justify-between items-center hover:bg-green-900/10 transition-colors">
                <div>
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <p className="text-[10px] text-green-600">{user.action}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-900/30 rounded text-[9px] font-mono text-green-400">
                    {user.page.split('/').pop() || 'Home'}
                  </span>
                </div>
              </div>
            ))}
            {data?.users?.length === 0 && (
              <div className="p-8 text-center text-green-800 text-xs">NO ACTIVE SIGNALS DETECTED</div>
            )}
          </div>
        </section>

        {/* RECENT ACTIVITY FEED */}
        <section className="bg-black border border-green-900 rounded-xl overflow-hidden">
          <div className="bg-green-900/20 p-4 border-b border-green-900">
            <h3 className="text-xs font-black uppercase tracking-widest">Submission Feed</h3>
          </div>
          <div className="divide-y divide-green-900/30">
            {data?.feed?.map((item, i) => (
              <div key={i} className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-gray-300">{item.name}</p>
                  <p className="text-[10px] text-gray-600">Submitted Exam</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-white">{Math.round((item.score/item.total)*100)}%</p>
                  <p className="text-[9px] text-gray-500">{new Date(item.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
             {data?.feed?.length === 0 && (
              <div className="p-8 text-center text-green-800 text-xs">NO RECENT SUBMISSIONS</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
