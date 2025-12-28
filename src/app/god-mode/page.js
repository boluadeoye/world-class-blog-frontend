"use client";
import { useState, useEffect } from "react";
import { Activity, ShieldAlert, Users, CreditCard, Terminal, RefreshCw, Cpu, Database, CheckCircle, AlertOctagon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GodMode() {
  const [data, setData] = useState({ logs: [], stats: { total_reg: 0, total_pay: 0, total_errors: 0 } });
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(false);

  const fetchPulse = async () => {
    setPulse(true);
    try {
      const res = await fetch('/api/admin/monitor');
      const json = await res.json();
      if (json) setData(json);
    } catch (e) { console.error("UI_FETCH_ERROR:", e); }
    finally { setLoading(false); setTimeout(() => setPulse(false), 1000); }
  };

  useEffect(() => {
    fetchPulse();
    const interval = setInterval(fetchPulse, 8000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="min-h-screen bg-black text-green-500 flex items-center justify-center font-mono uppercase tracking-[0.5em]">Establishing_Omniscience...</div>;

  return (
    <main className="min-h-screen bg-[#020202] text-gray-300 font-sans p-4 md:p-10 selection:bg-green-500/30">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              <Terminal className="text-green-500" size={32} /> GOD_MODE
            </h1>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mt-2">ExamForge Ecosystem • Live Intelligence Feed</p>
          </div>
          <button onClick={fetchPulse} className={`p-4 rounded-2xl bg-white/5 border border-white/10 transition-all ${pulse ? 'rotate-180 text-green-500' : ''}`}><RefreshCw size={20} /></button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">24H Registrations</p>
            <p className="text-4xl font-black text-blue-400 tracking-tighter">{data.stats?.total_reg || 0}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">24H Revenue</p>
            <p className="text-4xl font-black text-emerald-400 tracking-tighter">₦{(data.stats?.total_pay || 0) * 500}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">System Anomalies</p>
            <p className="text-4xl font-black text-red-500 tracking-tighter">{data.stats?.total_errors || 0}</p>
          </div>
        </div>

        {/* Live Stream */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h2 className="font-black text-xs uppercase tracking-widest flex items-center gap-3 text-green-500"><Activity size={16} /> Real-Time Telemetry</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                  <th className="p-6">Time</th>
                  <th className="p-6">Event</th>
                  <th className="p-6">User</th>
                  <th className="p-6">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[11px]">
                {data.logs?.map((log) => (
                  <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-gray-500">{new Date(log.created_at).toLocaleTimeString()}</td>
                    <td className="p-6 font-bold text-white">{log.event_type}</td>
                    <td className="p-6 text-blue-400">{log.user_identifier}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full font-black text-[9px] ${log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.logs?.length === 0 && <div className="p-20 text-center text-gray-600 font-bold uppercase tracking-widest">No events recorded in ledger</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
