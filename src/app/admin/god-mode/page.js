"use client";
import { useState, useEffect } from "react";
import { 
  Activity, ShieldAlert, Users, CreditCard, 
  Terminal, Zap, RefreshCw, BrainCircuit 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GodMode() {
  const [data, setData] = useState({ logs: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(false);

  const fetchPulse = async () => {
    setPulse(true);
    try {
      const res = await fetch('/api/admin/monitor');
      const json = await res.json();
      setData(json);
    } catch (e) { console.error(e); }
    finally { 
      setLoading(false); 
      setTimeout(() => setPulse(false), 1000);
    }
  };

  useEffect(() => {
    fetchPulse();
    const interval = setInterval(fetchPulse, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="min-h-screen bg-black text-green-500 flex items-center justify-center font-mono">INITIALIZING OMNISCIENCE...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 font-sans p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
            <Terminal className="text-green-500" /> GOD_MODE <span className="text-green-500 animate-pulse">●</span>
          </h1>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">Bolu Adeoye Ecosystem Control</p>
        </div>
        <div className={`p-3 rounded-full bg-white/5 border border-white/10 ${pulse ? 'animate-spin' : ''}`}>
          <RefreshCw size={20} className="text-green-500" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<Users />} label="24H Registrations" value={data.stats.total_reg} color="text-blue-400" />
        <StatCard icon={<CreditCard />} label="24H Revenue" value={`₦${data.stats.total_pay * 500}`} color="text-emerald-400" />
        <StatCard icon={<ShieldAlert />} label="Critical Failures" value={data.stats.total_crashes} color="text-red-500" />
      </div>

      {/* Live Feed */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <Activity size={16} className="text-green-500" /> Live Event Stream
          </h2>
          <span className="text-[10px] font-mono text-gray-500">REAL-TIME TELEMETRY</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Event</th>
                <th className="p-4">Identifier</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              <AnimatePresence>
                {data.logs.map((log) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={log.id} 
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 text-gray-500">{new Date(log.created_at).toLocaleTimeString()}</td>
                    <td className="p-4 font-bold text-white">{log.event_type}</td>
                    <td className="p-4 text-blue-400">{log.user_identifier}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[9px] font-black ${
                        log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}
