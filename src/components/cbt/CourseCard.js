"use client";
import { Play, Sparkles, Database } from "lucide-react";

export default function CourseCard({ course, onLaunch, bentoClass }) {
  const isGstCode = course.code.toUpperCase().startsWith("GST");
  const isGstMain = isGstCode && bentoClass === "unit-gst-main";

  const theme = isGstMain
    ? { bg: "bg-green-50", text: "text-[#004d00]", border: "border-green-100", icon: "text-[#004d00]" }
    : { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-100", icon: "text-blue-600" };

  return (
    <div
      onClick={(e) => { e.preventDefault(); onLaunch(course); }}
      className={`unit-card ${isGstMain ? 'featured unit-gst-main' : bentoClass}`}
    >
      <div className="unit-cat">
        {isGstCode ? "Core Competency" : "Departmental Unit"}
      </div>
      
      <div className={isGstMain ? 'unit-icon-lg' : 'unit-icon'}>
        {isGstCode ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" opacity=".9" />
            <rect x="12" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" opacity=".6" />
            <rect x="2" y="12" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" opacity=".6" />
            <rect x="12" y="12" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" opacity=".3" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 13.5L6.5 9.5L9.5 11.5L13.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )}
      </div>

      <div className="unit-name">
        {course.code} <br /> {course.title}
      </div>

      {isGstMain && (
        <>
          <p className="unit-desc">General Studies: constitutional framework, ethics of service, government structure, and the foundational principles of Nigeria's Civil Service.</p>
          <div className="unit-stats">
            <div className="unit-stat">
              <span className="unit-stat-val">14</span>
              <span className="unit-stat-key">Exams</span>
            </div>
            <div className="unit-stat">
              <span className="unit-stat-val">87%</span>
              <span className="unit-stat-key">Avg</span>
            </div>
            <div className="unit-stat">
              <span className="unit-stat-val">∞</span>
              <span className="unit-stat-key">Retries</span>
            </div>
          </div>
        </>
      )}

      <div className="unit-progress">
        <div className="progress-meta">
          <span className="progress-label">Mastery Progress</span>
          <span className="progress-pct">78%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: '78%' }}></div>
        </div>
      </div>

      <div className="unit-action-row">
        <button className="unit-attempt">Launch Engine →</button>
        <span className="unit-arrow difficulty std">Active</span>
      </div>
    </div>
  );
}
