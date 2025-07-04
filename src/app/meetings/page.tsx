"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  Clock,
  MapPin,
  Plus,
  X,
  Search,
  Video,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3,
  Layers,
  MapPin as MapIcon,
  Settings,
  LogOut,
} from "lucide-react";

// --- Sidebar Link Component ---
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

// --- Main Page ---
const initialMeetings = [
  {
    id: "M-001",
    title: "Metro Line Progress Review",
    date: "2025-07-03",
    time: "10:00 AM",
    location: "Conference Room A",
    department: "Urban Transport",
    organizer: "Rajesh Kumar",
    agenda: "Discuss progress and challenges in Metro Line Extension.",
    attendees: ["Rajesh Kumar", "Priya Singh", "Vikram Mehta"],
    online: false,
  },
  {
    id: "M-002",
    title: "Smart Traffic System Planning",
    date: "2025-07-05",
    time: "2:00 PM",
    location: "Online",
    department: "Urban Planning",
    organizer: "Priya Singh",
    agenda: "Finalize plans for Smart Traffic System deployment.",
    attendees: ["Priya Singh", "Meera Joshi", "Ravi Teja"],
    online: true,
  },
  {
    id: "M-003",
    title: "Solar Park Budget Approval",
    date: "2025-07-07",
    time: "11:30 AM",
    location: "Board Room",
    department: "Renewable Energy",
    organizer: "Vikram Mehta",
    agenda: "Budget approval for Solar Park Installation.",
    attendees: ["Vikram Mehta", "Anita Desai"],
    online: false,
  },
];

export default function MeetingPage() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Placeholder user
  const user = { firstName: "Paras", lastName: "Saini", role: "Urban Planning Officer" };
  const fullName = `${user.firstName} ${user.lastName}`;

  const filteredMeetings = meetings.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase()) ||
      m.organizer.toLowerCase().includes(search.toLowerCase())
  );

  function handleCreateMeeting(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newMeeting = {
      id: `M-${meetings.length + 1}`.padStart(5, "0"),
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      department: formData.get("department") as string,
      organizer: formData.get("organizer") as string,
      agenda: formData.get("agenda") as string,
      attendees: (formData.get("attendees") as string).split(",").map((a) => a.trim()),
      online: formData.get("online") === "on",
    };
    setMeetings([newMeeting, ...meetings]);
    setShowModal(false);
    form.reset();
  }

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
            <SidebarLink href="/departments" icon={<Layers />} label="Departments" collapsed={sidebarCollapsed} />
            <SidebarLink href="/meetings" icon={<CalendarDays />} label="Meetings" active collapsed={sidebarCollapsed} />
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-widest text-blue-200 font-semibold pl-2">
              Collaboration
            </div>
            <SidebarLink href="/map" icon={<MapIcon />} label="Map" collapsed={sidebarCollapsed} />
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
        {/* Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 z-50 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition-all duration-200 focus:ring-4 focus:ring-blue-300"
          onClick={() => setShowModal(true)}
          aria-label="Schedule Meeting"
        >
          <Plus className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Schedule Meeting</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-8 h-8 text-blue-700 dark:text-blue-300" />
            Meetings
          </h1>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search meetings, department, or organizer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-blue-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-50 dark:bg-blue-900">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Department</th>
                <th className="p-4">Organizer</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeetings.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    No meetings found.
                  </td>
                </tr>
              )}
              {filteredMeetings.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-blue-50 dark:hover:bg-blue-800 cursor-pointer transition"
                  onClick={() => setSelected(m)}
                >
                  <td className="p-4 font-semibold flex items-center gap-2">
                    {m.online ? (
                      <Video className="w-4 h-4 text-blue-500" />
                    ) : (
                      <ClipboardList className="w-4 h-4 text-blue-500" />
                    )}
                    {m.title}
                  </td>
                  <td className="p-4">{m.date}</td>
                  <td className="p-4">{m.time}</td>
                  <td className="p-4">{m.department}</td>
                  <td className="p-4">{m.organizer}</td>
                  <td className="p-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(m);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Meeting Details Drawer */}
        {selected && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-blue-200 dark:border-gray-800 shadow-2xl p-6 md:max-w-xl mx-auto rounded-t-2xl animate-slide-up">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-900 dark:text-white">{selected.title}</span>
              {selected.online && (
                <Video className="w-5 h-5 text-green-500 ml-1" />
              )}
            </div>
            <div className="text-gray-700 dark:text-gray-200 mb-2">{selected.agenda}</div>
            <div className="flex flex-wrap gap-4 text-sm mb-2">
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" /> {selected.date} at {selected.time}
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" /> {selected.location}
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4" /> {selected.department}
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <b>Organizer:</b> {selected.organizer}
              </span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-gray-600 dark:text-gray-300">
                Attendees:
              </span>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200">
                {selected.attendees.map((a: string) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Schedule Meeting Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
            <form
              onSubmit={handleCreateMeeting}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative border border-blue-100 dark:border-blue-800"
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowModal(false)}
                type="button"
                aria-label="Close"
              >
                <X />
              </button>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Plus className="w-6 h-6 text-blue-600" />
                Schedule a New Meeting
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                    Meeting Title
                  </label>
                  <input name="title" required placeholder="e.g. Project Review" className="input" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                      Date
                    </label>
                    <input name="date" required type="date" className="input" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                      Time
                    </label>
                    <input name="time" required type="time" className="input" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                    Location or Online Link
                  </label>
                  <input name="location" required placeholder="e.g. Conference Room A or Zoom Link" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                    Department
                  </label>
                  <input name="department" required placeholder="e.g. Urban Transport" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                    Organizer
                  </label>
                  <input name="organizer" required placeholder="e.g. Rajesh Kumar" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                    Agenda
                  </label>
                  <textarea name="agenda" required placeholder="Meeting agenda..." className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">
                    Attendees <span className="text-xs text-gray-400">(comma separated)</span>
                  </label>
                  <input name="attendees" required placeholder="e.g. Rajesh Kumar, Priya Singh" className="input" />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="online" className="accent-blue-600" />
                  Online Meeting
                </label>
              </div>
              <div className="flex gap-2 mt-6">
                <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Schedule
                </button>
                <button type="button" className="btn btn-outline w-full flex items-center justify-center gap-2" onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" /> Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}