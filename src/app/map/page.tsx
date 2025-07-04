"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
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
  Users,
  FolderKanban,
  Home,
  Building2,
  BadgeCheck,
  Search, // <-- Add this line
} from "lucide-react";
import { projectsData } from "@/app/projects/page"; // Or your shared data file

const ProjectMap = dynamic(() => import("@/components/Map/ProjectMap"), { ssr: false });

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);

  // Placeholder user
  const user = { firstName: "Paras", lastName: "Saini", role: "Urban Planning Officer" };
  const fullName = `${user.firstName} ${user.lastName}`;

  // Filter projects by search
  const filteredProjects = projectsData.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Sidebar */}
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
            <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" collapsed={sidebarCollapsed} />
            <SidebarLink href="/projects" icon={<BarChart3 />} label="Projects" collapsed={sidebarCollapsed} />
            <SidebarLink href="/departments" icon={<Users />} label="Departments" collapsed={sidebarCollapsed} />
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-widest text-blue-200 font-semibold pl-2">
              Collaboration
            </div>
            <SidebarLink href="/map" icon={<MapPin />} label="Map" active collapsed={sidebarCollapsed} />
            <SidebarLink href="/settings" icon={<Settings />} label="Settings" collapsed={sidebarCollapsed} />
            <SidebarLink href="/logout" icon={<LogOut />} label="Logout" collapsed={sidebarCollapsed} />
          </div>
        </nav>
        <div className="border-t border-blue-900 px-2 py-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <img src="/avatar.png" alt="User" className="w-8 h-8 rounded-full border-2 border-blue-800" />
              <div>
                <div className="font-semibold text-sm">{fullName}</div>
                <div className="text-xs text-blue-200">{user.role}</div>
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

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-30 transition-opacity md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className={`flex-1 p-6 md:p-12 transition-all duration-200 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        <button className="md:hidden mb-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-8 h-8 text-blue-700 dark:text-blue-300" />
            Project Map
          </h1>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, ID, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
        </div>

        <div className="rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-800 overflow-hidden mb-8">
          <div className="h-[800px] w-full">
            <ProjectMap
              projects={filteredProjects}
              onMarkerClick={setSelected}
              selectedProject={selected}
            />
          </div>
        </div>

        {/* Project Details Drawer */}
        {selected && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-blue-200 dark:border-gray-800 shadow-2xl p-6 md:max-w-xl mx-auto rounded-t-2xl animate-slide-up">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-900 dark:text-white">{selected.name}</span>
              <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold border border-blue-300 bg-blue-50 dark:bg-blue-800 text-blue-700 dark:text-blue-200">
                {selected.status}
              </span>
              {selected.status === "Completed" && (
                <BadgeCheck className="w-5 h-5 text-green-500 ml-1" />
              )}
            </div>
            <div className="text-gray-700 dark:text-gray-200 mb-2">{selected.description}</div>
            <div className="flex flex-wrap gap-4 text-sm mb-2">
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" /> {selected.city}
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <b>ID:</b> {selected.id}
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <b>Manager:</b> {selected.manager}
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <b>Budget:</b> {selected.budget}
              </span>
            </div>
            <button
              className="mt-2 text-blue-600 hover:underline"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// Sidebar link component
function SidebarLink({
  href,
  icon,
  label,
  active,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition-colors font-medium ${
        active ? "bg-blue-400 text-blue-900" : ""
      } ${collapsed ? "justify-center" : ""}`}
    >
      <span className="w-6 h-6">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

// ProjectMap component props type
export type ProjectMapProps = {
  projects: any[];
  selectedProject?: any | null;
  onMarkerClick?: (project: any) => void;
};