"use client"
import { Button } from "@/components/ui/button";
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
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal";
import ShareResourceModal from "@/components/ShareResourceModal";

// Dynamic import for ProjectMap component (client-side only)
// Update the import path below if your ProjectMap component is in a different location
const ProjectMap = dynamic(() => import("@/components/Map/ProjectMap"), { ssr: false });
const recentProjects = [
  { name: "Metro Line Extension", id: "PRJ-001", status: "Ongoing", city: "Mumbai", lat: 19.076, lng: 72.8777, road: null },
  { name: "Smart Traffic System", id: "PRJ-002", status: "Completed", city: "Delhi", lat: 28.6139, lng: 77.209, road: "Ring Road" },
  { name: "Solar Park Installation", id: "PRJ-003", status: "Ongoing", city: "Jaipur", lat: 26.9124, lng: 75.7873, road: null },
  { name: "Public Park Renovation", id: "PRJ-004", status: "Pending", city: "Pune", lat: 18.5204, lng: 73.8567, road: null },
  { name: "Ring Road Expansion", id: "PRJ-005", status: "Ongoing", city: "Delhi", lat: 28.6139, lng: 77.209, road: "Ring Road" },
  { name: "Airport Expressway Upgrade", id: "PRJ-006", status: "Planned", city: "Delhi", lat: 28.5562, lng: 77.1000, road: "Airport Expressway" },
  { name: "IT Corridor Flyover", id: "PRJ-007", status: "Ongoing", city: "Hyderabad", lat: 17.4448, lng: 78.3498, road: "Hitech City Road" },
  { name: "Eastern Express Highway Beautification", id: "PRJ-008", status: "Completed", city: "Mumbai", lat: 19.1860, lng: 72.9781, road: "Eastern Express Highway" },
]

const notifications = [
  { text: "New project assigned: Metro Line Extension", time: "1h ago" },
  { text: "Budget approved for Smart Traffic System", time: "3h ago" },
  { text: "Meeting scheduled with Water Dept.", time: "Today" },
]

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [search, setSearch] = useState("")
  const [darkMode, setDarkMode] = useState(false) // Optional: implement dark mode
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);

  // Placeholder user
  const user = { firstName: "Paras", lastName: "Saini", role: "Urban Planning Officer" }
  const fullName = `${user.firstName} ${user.lastName}`

  // Project search suggestions
  const projectSuggestions = recentProjects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50"} flex min-h-screen transition-colors duration-300`}>
      {/* Sidebar */}
      {/* <aside
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
            <SidebarLink href="/dashboard" icon={<Layers />} label="Dashboard" active={!sidebarCollapsed} collapsed={sidebarCollapsed} />
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
      </aside> */}

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-30 transition-opacity md:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        {/* Top Bar */}
        <header className={`sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 shadow flex items-center h-16 px-4 md:px-8`}>
          <button className="md:hidden mr-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 rounded px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {search && (
              <div className="absolute left-0 top-12 bg-white dark:bg-gray-800 shadow rounded w-full max-w-xs z-20">
                {projectSuggestions.length === 0 && (
                  <div className="p-3 text-gray-400">No projects found</div>
                )}
                {projectSuggestions.map(p => (
                  <Link key={p.id} href={`/projects/${p.id}`} className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900">
                    <span className="font-semibold">{p.name}</span> <span className="text-xs text-gray-400">{p.id}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4">
            {/* Dark mode toggle */}
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setNotifOpen(!notifOpen)}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">3</span>
              </Button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-30">
                  <div className="p-3 font-semibold border-b dark:border-gray-700">Notifications</div>
                  <ul>
                    {notifications.map((n, i) => (
                      <li key={i} className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
                        <span>{n.text}</span>
                        <span className="block text-xs text-gray-400">{n.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Profile */}
            <div className="relative">
              <button className="flex items-center gap-2" onClick={() => setProfileOpen(!profileOpen)}>
                <img src="/avatar.png" alt="User" className="w-8 h-8 rounded-full border" />
                <span className="hidden md:block font-semibold">{fullName}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-30">
                  <div className="p-4 border-b dark:border-gray-700">
                    <div className="font-semibold">{fullName}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <Link href="/settings" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900">Settings</Link>
                  <Link href="/logout" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900">Logout</Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
          {/* Welcome & Quick Actions */}
          <section className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-1 animate-fade-in">
                Welcome, {fullName} 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Your Urban-Link Control Center</p>
            </div>
            <TodayCard />
          </section>

          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Projects" value="24" change="+2 from last month" color="blue" />
            <StatCard label="Active Team Members" value="156" change="+8 new members" color="purple" />
            <StatCard label="Tasks Pending" value="8" change="-3 from last week" color="yellow" />
            <StatCard label="Budget Utilization" value="68%" change="On track" color="green" />
          </section>

          {/* Main Content Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Quick Actions, Activity, Recent Projects */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                  <Link href="/projects/new"><Button variant="default">+ New Project</Button></Link>
                  <Link href="/tasks"><Button variant="outline">View Tasks</Button></Link>
                  <Button variant="outline" onClick={() => setShowMeetingModal(true)}>Schedule Meeting</Button>
                  <Button variant="outline" onClick={() => setShowResourceModal(true)}>Share Resource</Button>
                </div>
              </div>
              {/* Recent Projects Carousel */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Projects</h2>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setCarouselIdx(i => Math.max(i - 1, 0))}><ChevronLeft /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setCarouselIdx(i => Math.min(i + 1, recentProjects.length - 1))}><ChevronRight /></Button>
                  </div>
                </div>
                <div className="flex gap-6 overflow-x-auto">
                  {recentProjects.map((p, idx) => (
                    <div key={p.id} className="min-w-[220px] bg-blue-50 dark:bg-blue-900 rounded-lg p-4 shadow hover:scale-105 transition-transform">
                      <div className="font-bold text-lg">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.id} • {p.city}</div>
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${p.status === "Ongoing" ? "bg-blue-200 text-blue-800" : p.status === "Completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                          {p.status}
                        </span>
                      </div>
                      <Link href={`/projects/${p.id}`}>
                        <Button variant="link" className="mt-2 p-0">View Project &rarr;</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <ul className="divide-y dark:divide-gray-800">
                  <li className="py-2 flex justify-between">
                    <span><b>Rajesh Kumar</b> commented on Metro Line Extension</span>
                    <span className="text-xs text-gray-400">2h ago</span>
                  </li>
                  <li className="py-2 flex justify-between">
                    <span><b>Priya Singh</b> uploaded Smart Traffic System plans</span>
                    <span className="text-xs text-gray-400">4h ago</span>
                  </li>
                  <li className="py-2 flex justify-between">
                    <span><b>Vikram Mehta</b> updated Solar Park status</span>
                    <span className="text-xs text-gray-400">Yesterday</span>
                  </li>
                  <li className="py-2 flex justify-between">
                    <span><b>Anita Desai</b> approved Water Treatment budget</span>
                    <span className="text-xs text-gray-400">Yesterday</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Right: Map & Calendar */}
            <div className="flex flex-col gap-8">
              {/* Map */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 flex flex-col" style={{ height: "730px", minWidth: "100%" }}>
                <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-200">Project Map</h2>
                <div className="flex-1 relative">
                  <ProjectMap projects={recentProjects} />
                </div>
                <Link href="/map">
                  <Button variant="link" className="mt-4 p-0 text-blue-700 dark:text-blue-300">Open Full Map &rarr;</Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
      {showMeetingModal && (
        <ScheduleMeetingModal onClose={() => setShowMeetingModal(false)} />
      )}
      {showResourceModal && (
        <ShareResourceModal onClose={() => setShowResourceModal(false)} />
      )}
    </div>
  )
}

// Sidebar link component
function SidebarLink({ href, icon, label, active, collapsed }: { href: string, icon: React.ReactNode, label: string, active?: boolean, collapsed?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition-colors font-medium ${active ? "bg-blue-400" : ""} ${collapsed ? "justify-center" : ""}`}
    >
      <span className="w-6 h-6">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}

// Stat card component with animation
function StatCard({ label, value, change, color }: { label: string, value: string, change: string, color: "blue" | "purple" | "yellow" | "green" }) {
  const colorMap = {
    blue: "text-blue-700 dark:text-blue-300",
    purple: "text-purple-700 dark:text-purple-300",
    yellow: "text-yellow-700 dark:text-yellow-300",
    green: "text-green-700 dark:text-green-300",
  }
  const changeColor = color === "yellow" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-start animate-fade-in">
      <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">{label}</span>
      <span className={`text-3xl font-bold ${colorMap[color]}`}>{value}</span>
      <span className={`text-xs mt-1 ${changeColor}`}>{change}</span>
    </div>
  )
}

// Mini calendar widget (static, for demo)
function MiniCalendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"]
  const dates = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, null, null, null],
  ]
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">June 2025</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon"><ChevronLeft className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
        {days.map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {dates.flat().map((date, i) =>
          date ? (
            <div key={i} className="rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 cursor-pointer py-1">{date}</div>
          ) : (
            <div key={i}></div>
          )
        )}
      </div>
    </div>
  )
}

// Today card component
function TodayCard() {
  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const year = today.getFullYear();

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-900 dark:to-blue-700 text-white rounded-2xl shadow-lg px-4 py-4 min-w-[160px]">
      <div className="text-xs uppercase tracking-widest opacity-80">{day}</div>
      <div className="text-4xl font-extrabold my-1">{date}</div>
      <div className="text-sm font-semibold">{month} {year}</div>
    </div>
  );
}
