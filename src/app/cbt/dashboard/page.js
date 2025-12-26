"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, User, Trophy, BookOpen, Play, Award, 
  ChevronDown, Info, Crown, Clock, ChevronRight, AlertTriangle, Grid 
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const UpgradeModal = dynamic(() => import("../../../components/cbt/UpgradeModal"), { ssr: false });

/* === LOGOUT MODAL === */
function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden border-t-4 border-red-600">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut size={32} className="text-red-600" />
          </div>
          <h3 className="font-black text-lg uppercase text-gray-900 mb-2">Disconnect?</h3>
          <p className="text-gray-500 text-xs font-medium mb-6">You are about to terminate your session.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 border-2 border-gray-100 rounded-xl text-xs font-black text-gray-400 hover:bg-gray-50">STAY</button>
            <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-black shadow-lg hover:bg-red-700">LOGOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === DISCLAIMER ACCORDION === */
function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-[#FFF8F0] border border-orange-100 rounded-3xl overflow-hidden mb-8 shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 w-10 h-10 flex items-center justify-center rounded-full text-orange-600"><Info size={20} /></div>
          <div>
            <h3 className="font-black text-sm text-[#5A3A29] uppercase tracking-wide">Important Disclaimer</h3>
            <p className="text-[10px] text-orange-400 font-bold">Read before starting</p>
          </div>
        </div>
        <ChevronDown size={20} className={`text-orange-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-8 text-xs text-[#8B5E3C] leading-relaxed">
          <p className="mb-3 font-bold text-[#5A3A29]">Strict Warning:</p>
          <ul className="list-disc pl-4 space-y-2 font-medium">
            <li>The purpose of this mock examination is <strong>NOT</strong> to expose likely questions.</li>
            <li>The aim is to <strong>simulate the environment</strong> and prepare you psychologically for the real exam.</li>
            <li>Use this tool to practice <strong>time management</strong> and pressure handling.</li>
            <li>Success here does not guarantee success in the main exam, but it builds the necessary resilience.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [greeting, setGreeting] = useState("Good Day");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    
    // 1. Time-Aware Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("GOOD MORNING");
    else if (hour < 18) setGreeting("GOOD AFTERNOON");
    else setGreeting("GOOD EVENING");

    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const parsed = JSON.parse(stored);
    setStudent(parsed);

    // 2. STABLE AVATAR GENERATION (Micah Style - Professional)
    // Using v7.x which is stable. 'micah' style is clean and corporate.
    const seed = parsed.name.replace(/\s/g, '');
    setAvatarUrl(`https://api.dicebear.com/7.x/micah/svg?seed=${seed}&backgroundColor=b6e3f4`);

    async function fetchData() {
      try {
        const courseRes = await fetch(`/api/cbt/courses?studentId=${parsed.id}`);
        const courseData = await courseRes.json();
        setCourses(Array.isArray(courseData.courses) ? courseData.courses : []);

        const lbRes = await fetch('/api/cbt/leaderboard');
        const lbData = await lbRes.json();
        setLeaders(Array.isArray(lbData) ? lbData : []); 
      } catch (e) {
        console.error("Load Error", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_student");
    router.push("/cbt");
  };

  if (!mounted || !student) return null;
  const isPremium = student.subscription_status === 'premium';

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#004d00] gap-4">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      <p className="text-white font-black text-xs uppercase tracking-[0.3em]">Loading HQ...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfdfc] font-sans text-gray-900 pb-40 relative">
      <LogoutModal isOpen={showLogout} onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />
      
      {showUpgrade && (
        <UpgradeModal
          student={student}
          onClose={() => setShowUpgrade(false)}
          onSuccess={() => { setShowUpgrade(false); window.location.reload(); }}
        />
      )}
      
      {/* === HEADER (FIXED AVATAR & GREETING) === */}
      <header className="bg-[#004d00] text-white pt-8 pb-16 px-6 rounded-b-[40px] shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {/* AVATAR CONTAINER */}
            <div className="w-16 h-16 bg-[#006400] rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden relative">
              {avatarUrl && (
                <img 
                  src={avatarUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }} // Hide if broken
                />
              )}
              {/* Fallback Initial if image fails */}
              {!avatarUrl && <span className="text-2xl font-black">{student.name.charAt(0)}</span>}
              
              {isPremium && (
                <div className="absolute top-0 right-0 bg-yellow-400 p-1 rounded-bl-lg shadow-sm">
                  <Crown size={10} className="text-black" fill="currentColor" />
                </div>
              )}
            </div>
            
            <div>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-widest mb-1">{greeting}</p>
              <h1 className="text-xl font-black leading-none truncate w-48">{student.name.split(" ")[0]}</h1>
            </div>
          </div>
          
          <button onClick={() => setShowLogout(true)} className="bg-[#006400] p-3 rounded-xl border border-white/10 hover:bg-red-600 transition-colors shadow-lg">
            <LogOut size={20} />
          </button>
        </div>

        {/* Current Session Card */}
        <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Current Session</p>
            <p className="font-black text-sm text-white">FUOYE 2026 GST MOCK</p>
          </div>
          <div className="bg-white text-[#004d00] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide shadow-sm">Active</div>
        </div>
      </header>

      <div className="px-6 -mt-8 relative z-20 space-y-8">
        
        {/* === DISCLAIMER === */}
        <DisclaimerCard />

        {/* === AVAILABLE COURSES === */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-[#004d00]" />
            <h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Available Courses</h2>
          </div>
          
          <div className="grid gap-4">
            {courses.length > 0 ? courses.map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#004d00] font-black text-sm border border-green-100">
                    {course.code.slice(0,3)}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-sm">{course.code}</h3>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{course.title}</p>
                  </div>
                </div>
                <Link href={`/cbt/exam/${course.id}`} className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#004d00] transition-colors">
                  <Play size={14} fill="currentColor" />
                </Link>
              </div>
            )) : (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <AlertTriangle size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">No Active Sessions Found</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-[10px] font-bold text-[#004d00] underline">Refresh Data</button>
              </div>
            )}
          </div>
        </section>

        {/* === LEADERBOARD === */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-yellow-600" />
            <h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Top Performers</h2>
          </div>
          
          {leaders.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 overflow-x-auto flex gap-4 custom-scrollbar">
              {leaders.map((user, i) => (
                <div key={i} className="min-w-[140px] bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center relative">
                  {i === 0 && <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1 rounded-full shadow-sm"><Crown size={12} fill="currentColor" /></div>}
                  
                  {/* Leaderboard Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm mb-3 overflow-hidden border-2 ${i === 0 ? 'border-yellow-400' : 'border-gray-100'}`}>
                     <img 
                        src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.name}&backgroundColor=transparent`} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                  </div>
                  
                  <h3 className="font-bold text-xs text-gray-900 truncate w-full mb-1">{user.name}</h3>
                  <p className="text-[10px] text-gray-500 font-medium mb-2">{user.course || user.code}</p>
                  <div className="bg-[#004d00] text-white px-3 py-0.5 rounded-full text-[10px] font-black">{user.score}%</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-400 text-xs font-medium">Leaderboard updating...</p>
            </div>
          )}
        </section>
      </div>

      {/* === FLOATING FOOTER === */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-[2rem] p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#004d00] rounded-full flex items-center justify-center text-white shadow-md shrink-0">
            <Award size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">Engineered By</p>
            <h4 className="font-black text-xs text-gray-900 truncate">BOLU ADEOYE</h4>
            <p className="text-[9px] text-[#004d00] font-bold truncate opacity-80">Dept. of English & Literary Studies</p>
          </div>
          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
          <div className="text-right shrink-0">
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">FUOYE</p>
            <p className="text-[10px] font-black text-gray-900">2026</p>
          </div>
        </div>
      </div>

    </main>
  );
}
