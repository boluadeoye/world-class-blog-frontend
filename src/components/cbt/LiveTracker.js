"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LiveTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate or Retrieve Device ID
    let deviceId = localStorage.getItem("cbt_hw_id");
    if (!deviceId) {
      deviceId = 'hw_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("cbt_hw_id", deviceId);
    }

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
            action: pathname.includes("exam") ? "Taking Exam" : "Browsing Dashboard",
            deviceId: deviceId // Send hardware ID
          })
        });
      } catch (e) {}
    };

    sendPulse();
    const interval = setInterval(sendPulse, 15000);
    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
