"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LiveTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const sendPulse = async () => {
      const stored = sessionStorage.getItem("cbt_student");
      if (!stored) return;
      
      const student = JSON.parse(stored);
      
      try {
        await fetch("/api/cbt/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: student.id,
            name: student.name,
            page: pathname,
            action: pathname.includes("exam") ? "Taking Exam" : "Browsing Dashboard"
          })
        });
      } catch (e) {
        // Silent fail
      }
    };

    // Pulse immediately, then every 15 seconds
    sendPulse();
    const interval = setInterval(sendPulse, 15000);
    return () => clearInterval(interval);
  }, [pathname]);

  return null; // Invisible
}
