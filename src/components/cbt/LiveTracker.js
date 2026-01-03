"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LiveTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const generateFingerprint = () => {
      try {
        const signals = [
          navigator.userAgent,
          navigator.language,
          screen.colorDepth,
          screen.width + 'x' + screen.height,
          new Date().getTimezoneOffset(),
          navigator.hardwareConcurrency || 'u'
        ].join('||');

        let hash = 0;
        for (let i = 0; i < signals.length; i++) {
          const char = signals.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        return 'fp_' + Math.abs(hash).toString(36);
      } catch (e) {
        return 'fp_fallback_' + Math.random().toString(36).substring(7);
      }
    };

    const stickyId = generateFingerprint();
    localStorage.setItem("cbt_hw_id", stickyId);

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
            deviceId: stickyId
          })
        });
      } catch (e) {}
    };

    // Pulse immediately on page change
    sendPulse();

    // Set interval to 30 seconds (Sustainable for high traffic)
    const interval = setInterval(sendPulse, 30000);

    // CRITICAL: Proper cleanup to prevent memory leaks
    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
