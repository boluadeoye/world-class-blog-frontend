"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LiveTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // === FINGERPRINT V2: THE STICKY HASH ===
    const generateFingerprint = () => {
      try {
        // 1. Gather Stable Hardware Signals
        const signals = [
          navigator.userAgent,                // Browser & OS Version
          navigator.language,                 // Language Settings
          screen.colorDepth,                  // Screen Color
          screen.width + 'x' + screen.height, // Screen Resolution
          new Date().getTimezoneOffset(),     // Timezone
          navigator.hardwareConcurrency || 'u' // CPU Cores
        ].join('||');

        // 2. Create a Hash (Turn signals into a unique ID)
        let hash = 0;
        for (let i = 0; i < signals.length; i++) {
          const char = signals.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return 'fp_' + Math.abs(hash).toString(36);
      } catch (e) {
        // Fallback if something blocks access
        return 'fp_fallback_' + Math.random().toString(36).substring(7);
      }
    };

    const initTracker = async () => {
      // Generate the ID based on hardware (Always the same for this phone)
      const stickyId = generateFingerprint();
      
      // Force save it (Overwriting any random ID)
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
              deviceId: stickyId // Send the Sticky ID
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
    };

    initTracker();
  }, [pathname]);

  return null; // Invisible
}
