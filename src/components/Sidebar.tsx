"use client";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  ChevronDown, ChevronLeft, ChevronRight,
  Layers,
  LogOut,
  MapPin, Menu,
  MessageSquare,
  Moon,
  Settings, Sun,
  Users
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ fullName = "User", userRole = "Urban Officer", sidebarCollapsed, setSidebarCollapsed, sidebarOpen, setSidebarOpen }: {
  fullName?: string,
  userRole?: string,
  sidebarCollapsed: boolean,
  setSidebarCollapsed: (v: boolean) => void,
  sidebarOpen: boolean,
  setSidebarOpen: (v: boolean) => void,
}) {
  const router = useRouter();

  return (
    <aside
      className={`fixed z-30 inset-y-0 left-0 ${
        sidebarCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-blue-950 via-blue-800 to-blue-700 text-white shadow-2xl flex flex-col transition-all duration-200 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 border-r border-blue-900`}
    >
      <div className="flex items-center h-20 px-4 border-b border-blue-900 bg-blue-950/80">
        {!sidebarCollapsed && (
          <div>
            <span className="font-extrabold text-2xl tracking-wide text-white block leading-tight">
              URBAN<span className="text-yellow-400">LINK</span>
            </span>
            <span className="text-xs bg-yellow-400 text-blue-900 font-bold px-2 py-0.5 rounded-full mt-1 inline-block shadow-sm">
              GOVT. PORTAL
            </span>
          </div>
        )}
        <button className="ml-auto md:hidden" onClick={() => setSidebarOpen(false)}>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 px-2 py-6 space-y-4 overflow-y-auto">
        <div>
          <div className="mb-2 text-xs uppercase tracking-widest text-blue-200 font-semibold pl-2">
            Main
          </div>
          <SidebarLink href="/dashboard" icon={<Layers />} label="Dashboard" collapsed={sidebarCollapsed} />
          <SidebarLink href="/projects" icon={<BarChart3 />} label="Projects" collapsed={sidebarCollapsed} />
          <SidebarLink href="/departments" icon={<Users />} label="Departments" collapsed={sidebarCollapsed} />
          <SidebarLink href="/resources" icon={<Settings />} label="Resources" collapsed={sidebarCollapsed} />
          <SidebarLink href="/tasks" icon={<MessageSquare />} label="Tasks" collapsed={sidebarCollapsed} />
        </div>
        <div>
          <div className="mb-2 text-xs uppercase tracking-widest text-blue-200 font-semibold pl-2">
            Collaboration
          </div>
          <SidebarLink href="/meetings" icon={<MessageSquare />} label="Meetings" collapsed={sidebarCollapsed} />
          <SidebarLink href="/forum" icon={<MessageSquare />} label="Forum" collapsed={sidebarCollapsed} />
          <SidebarLink href="/map" icon={<MapPin />} label="Map" collapsed={sidebarCollapsed} />
        </div>
        <div>
          <div className="mb-2 text-xs uppercase tracking-widest text-blue-200 font-semibold pl-2">
            Account
          </div>
          <SidebarLink href="/settings" icon={<Settings />} label="Settings" collapsed={sidebarCollapsed} />
          <button 
            onClick={() => { window.location.href = "/"; }}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition-colors font-medium w-full text-left"
          >
            <LogOut className="w-6 h-6" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </nav>
      <div className="border-t border-blue-900 px-2 py-4 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <img src="/avatar.png" alt="User" className="w-8 h-8 rounded-full border-2 border-blue-800" />
            <div>
              <div className="font-semibold text-sm">{fullName}</div>
              <div className="text-xs text-blue-200">{userRole}</div>
            </div>
          </div>
        )}
        <button
          className="bg-blue-800 rounded-full p-1 shadow hover:bg-blue-600 transition-colors ml-auto"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-white" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ href, icon, label, collapsed }: { href: string, icon: React.ReactNode, label: string, collapsed?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition-colors font-medium ${collapsed ? "justify-center" : ""}`}
    >
      <span className="w-6 h-6">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}