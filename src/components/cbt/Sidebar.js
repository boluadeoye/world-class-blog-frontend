"use client";
import Link from "next/link";
import { Layers, BookOpen, MessageCircle, Crown, User, History, Settings } from "lucide-react";

export default function Sidebar({ student, unreadCount, handleForumEnter, isOpen, setIsOpen }) {
  const displayName = student?.name ? student.name.split(" ")[0] : "Student";
  const displayAvatar = student?.name ? student.name.slice(0, 2).toUpperCase() : "ST";
  const displayId = student?.id ? String(student.id).slice(0, 6) : "000000";

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <a className="logo-mark" href="#">
          <div className="logo-icon">
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="6" height="6" rx="1" fill="#002800" />
              <rect x="10" y="2" width="6" height="6" rx="1" fill="#002800" opacity=".6" />
              <rect x="2" y="10" width="6" height="6" rx="1" fill="#002800" opacity=".6" />
              <rect x="10" y="10" width="6" height="6" rx="1" fill="#002800" opacity=".3" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">ExamForge</span>
            <span className="logo-suite">Heritage Intel</span>
          </div>
        </a>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Workspace</div>
        <a className="nav-item active" href="#">
          <Layers className="nav-icon text-white" size={16} />
          <span className="nav-text">Dashboard</span>
        </a>

        <a className="nav-item" href="https://wa.me/2348106293674" target="_blank" rel="noopener noreferrer">
          <BookOpen className="nav-icon text-white" size={16} />
          <span className="nav-text">Enquiries</span>
        </a>

        <Link className="nav-item" href="/cbt/community" onClick={handleForumEnter}>
          <MessageCircle className="nav-icon text-white" size={16} />
          <span className="nav-text">Forum</span>
          {unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
        </Link>

        <div className="nav-label">Account</div>
        <a className="nav-item" href="#">
          <User className="nav-icon text-white" size={16} />
          <span className="nav-text">Profile</span>
        </a>
        <a className="nav-item" href="#">
          <History className="nav-icon text-white" size={16} />
          <span className="nav-text">Exam History</span>
        </a>
        <a className="nav-item" href="#">
          <Settings className="nav-icon text-white" size={16} />
          <span className="nav-text">Settings</span>
        </a>
      </nav>

      <div className="forge-status">
        <div className="forge-badge">
          <div className="forge-badge-dot"></div>
          <span className="forge-badge-text">Sovereign Access</span>
        </div>
        <div className="forge-stat">
          <span className="forge-stat-num">∞</span>
          <span className="forge-stat-unit">Attempts</span>
        </div>
        <p className="forge-desc">No limits. No paywalls.<br />The Forge is yours.</p>
        <div className="sidebar-user">
          <div className="user-avatar">{displayAvatar}</div>
          <div className="user-info">
            <div className="user-name">{displayName}</div>
            <div className="user-id">ID • {displayId}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
