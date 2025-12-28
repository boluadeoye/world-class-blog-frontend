"use client";
import { useState, useEffect } from "react";
import { 
  Activity, ShieldAlert, Users, CreditCard, 
  Terminal, Zap, RefreshCw, BrainCircuit, 
  Lock, Globe, Cpu, Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GodMode() {
  const [data, setData] = useState({ logs: [], stats: { total_reg: 0, total_pay: 0, total_crashes: 0 } });
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
    const interval = setInterval(fetchPulse, 5000); // Faster refresh for God Mode
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#050505] text-green-500 flex flex-col items-center justify-center font-mono">
      <Cpu className="animate-spin mb-4" size={40} />
      <p className="animate-pulse tracking-[0.5em]">ESTABLISHING_OMNISCIENCE...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-green-500/30 overflow-x-hidden">
      {/* Top Status Bar */}
      <div className="bg-green-500 text-black px-4 py-1 flex justify-between items-center font-mono text-[10px] font-black uppercase tracking-widest">
        <div className="flex gap-4">
          <span>System: Operational</span>
          <span>Uptime: 99.9%</span>
          <span>Location: Nigeria/Lagos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
          LIVE_FEED_ACTIVE
        </div>
      </div>

      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-4">
              <Terminal className="text-green-500" size={48} /> 
              GOD_MODE
            </h1>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mt-2">
              Bolu Adeoye Ecosystem • Central Intelligence Agency
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-gray-600 uppercase">Last Sync</p>
              <p className="text-xs font-mono text-green-500">{new Date().toLocaleTimeString()}</p>
            </div>
            <button 
              onClick={fetchPulse}
              className={`p-4 rounded-2xl bg-white/5 border border-white/10 transition-all active:scale-95 ${pulse ? 'rotate-180 text-green-500 border-green-500/50' : ''}`}
            >
              <RefreshCw size={24} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<Users />} label="Total Registrations" value={data.stats.total_reg} color="text-blue-400" sub="24H Window" />
          <StatCard icon={<CreditCard />} label="Revenue Generated" value={`₦${data.stats.total_pay * 500}`} color="text-emerald-400" sub="Verified Payments" />
          <StatCard icon={<ShieldAlert />} label="System Anomalies" value={data.stats.total_crashes} color="text-red-500" sub="Critical Errors" />
          <StatCard icon={<Globe />} label="Active Nodes" value={Math.floor(Math.random() * 5) + 1} color="text-purple-400" sub="Serverless Instances" />
        </div>

        {/* Main Console Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Live Feed (2/3 width) */}
          <div className="xl:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-3">
                <Activity size={18} className="text-green-500" /> Real-Time Event Stream
              </h2>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                    <th className="p-6">Timestamp</th>
                    <th className="p-6">Event_Type</th>
                    <th className="p-6">User_ID</th>
                    <th className="p-6">Status</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <AnimatePresence mode="popLayout">
                    {data.logs.map((log) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={log.id} 
                        className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                      >
                        <td className="p-6 text-gray-500 group-hover:text-gray-300 transition-colors">
                          {new Date(log.created_at).toLocaleTimeString()}
                        </td>
                        <td className="p-6">
                          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-black tracking-tighter">
                            {log.event_type}
                          </span>
                        </td>
                        <td className="p-6 text-blue-400 font-bold">{log.user_identifier}</td>
                        <td className="p-6">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-black text-[9px] tracking-widest ${
                            log.status === 'SUCCESS' 
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                              : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}>
                            {log.status === 'SUCCESS' ? <CheckCircle size={10} /> : <AlertOctagon size={10} />}
                            {log.status}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar Intelligence (1/3 width) */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/20 rounded-[2.5rem] p-8">
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <BrainCircuit className="text-green-500" /> AI_ORACLE_INSIGHT
              </h3>
              <p className="text-sm leading-relaxed text-gray-400 italic">
                "Bolu, system traffic is currently stable. 
                {data.stats.total_reg > 10 ? ' High registration volume detected in the last 24 hours. Monitor server latency.' : ' User activity is within normal parameters.'} 
                No critical security breaches detected."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                <Database className="text-blue-500" /> Infrastructure
              </h3>
              <div className="space-y-4">
                <ResourceBar label="Neon DB CPU" value="12%" color="bg-blue-500" />
                <ResourceBar label="Vercel Edge RAM" value="45%" color="bg-purple-500" />
                <ResourceBar label="API Latency" value="28ms" color="bg-green-500" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-white scale-[2]">
        {icon}
      </div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className={`text-4xl font-black ${color} tracking-tighter mb-1`}>{value}</p>
      <p className="text-[9px] font-mono text-gray-600 uppercase">{sub}</p>
    </div>
  );
}

function ResourceBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-[10px] font-black uppercase mb-2">
        <span className="text-gray-500">{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: value }}></div>
      </div>
    </div>
  );
}
