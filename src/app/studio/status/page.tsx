import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ShannonStatus() {
  const keys = await sql`
    SELECT id, calls_left, tokens_left, is_active, reset_at 
    FROM shannon_api_pool 
    ORDER BY id ASC
  `;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">
          Shannon Studio // Key Pool Monitor
        </h1>
        
        <div className="grid gap-4">
          {keys.map((key: any) => (
            <div key={key.id} className="bg-[#111] border border-white/5 p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Key Identifier</p>
                <p className="font-mono text-emerald-400">SHN-POOL-00{key.id}</p>
              </div>
              
              <div className="flex gap-12">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Calls Left</p>
                  <p className={`text-xl font-black ${key.calls_left < 20 ? 'text-red-500' : 'text-white'}`}>
                    {key.calls_left}/100
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Tokens Left</p>
                  <p className="text-xl font-black text-white">
                    {(key.tokens_left / 1000).toFixed(1)}k
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Status</p>
                  <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${key.is_active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {key.is_active ? 'Active' : 'Cooldown'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[12px] text-white/20 italic">
          * Pool automatically rotates and resets every 4 hours.
        </p>
      </div>
    </div>
  );
}
