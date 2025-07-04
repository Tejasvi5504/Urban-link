"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Layers,
  MapPin,
  Plus,
  Search,
  User,
  Users, // <-- Add this line
  Calendar,
  BadgeCheck,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const ProjectMap = dynamic(() => import("@/components/Map/ProjectMap"), { ssr: false });

export const projectsData = [
  {
    name: "Metro Line Extension",
    id: "PRJ-001",
    status: "Ongoing",
    city: "Mumbai",
    manager: "Rajesh Kumar",
    department: "Urban Transport",
    team: [
      { name: "Rajesh Kumar", role: "Manager" },
      { name: "Anita Desai", role: "Engineer" },
      { name: "Priya Singh", role: "Planner" },
    ],
    budget: "₹120 Cr",
    start: "2024-01-10",
    end: "2025-12-31",
    description:
      "Extending the metro line to connect suburban areas and reduce traffic congestion. Includes new stations, tracks, and smart ticketing.",
    road: null,
    lat: 19.076,
    lng: 72.8777,
  },
  {
    name: "Smart Traffic System",
    id: "PRJ-002",
    status: "Completed",
    city: "Delhi",
    manager: "Priya Singh",
    budget: "₹40 Cr",
    start: "2023-03-01",
    end: "2024-02-15",
    description:
      "Deployment of AI-powered traffic signals and real-time monitoring to improve city traffic flow and reduce accidents.",
    road: "Ring Road",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    name: "Solar Park Installation",
    id: "PRJ-003",
    status: "Ongoing",
    city: "Jaipur",
    manager: "Vikram Mehta",
    budget: "₹60 Cr",
    start: "2024-05-01",
    end: "2025-11-30",
    description:
      "Setting up a large-scale solar park to provide clean energy to the city and nearby industrial zones.",
    road: null,
    lat: 26.9124,
    lng: 75.7873,
  },
  {
    name: "Public Park Renovation",
    id: "PRJ-004",
    status: "Pending",
    city: "Pune",
    manager: "Anita Desai",
    budget: "₹10 Cr",
    start: "2025-01-01",
    end: "2025-09-30",
    description:
      "Renovation of the central public park with new amenities, landscaping, and children’s play areas.",
    road: null,
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    name: "Ring Road Expansion",
    id: "PRJ-005",
    status: "Ongoing",
    city: "Delhi",
    manager: "Amit Sharma",
    budget: "₹80 Cr",
    start: "2024-06-01",
    end: "2026-01-31",
    description:
      "Expansion of the Ring Road to ease traffic and improve connectivity across Delhi.",
    road: "Ring Road",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    name: "Airport Expressway Upgrade",
    id: "PRJ-006",
    status: "Planned",
    city: "Delhi",
    manager: "Sunita Rao",
    budget: "₹150 Cr",
    start: "2025-03-01",
    end: "2026-12-31",
    description:
      "Upgrading the Airport Expressway for faster and safer airport connectivity.",
    road: "Airport Expressway",
    lat: 28.5562,
    lng: 77.1000,
  },
  {
    name: "IT Corridor Flyover",
    id: "PRJ-007",
    status: "Ongoing",
    city: "Hyderabad",
    manager: "Ravi Teja",
    budget: "₹95 Cr",
    start: "2024-08-01",
    end: "2026-02-28",
    description:
      "Construction of a new flyover to support the growing IT corridor traffic.",
    road: "Hitech City Road",
    lat: 17.4448,
    lng: 78.3498,
  },
  {
    name: "Eastern Express Highway Beautification",
    id: "PRJ-008",
    status: "Completed",
    city: "Mumbai",
    manager: "Meera Joshi",
    budget: "₹30 Cr",
    start: "2023-01-15",
    end: "2024-01-15",
    description:
      "Beautification of the Eastern Express Highway with landscaping and public art.",
    road: "Eastern Express Highway",
    lat: 19.1860,
    lng: 72.9781,
  },
];
const statusColor = {
  Ongoing: "bg-blue-100 text-blue-800 border-blue-300",
  Completed: "bg-green-100 text-green-800 border-green-300",
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

const statusIcon = {
  Ongoing: <Clock className="w-5 h-5 text-blue-500" />,
  Completed: <BadgeCheck className="w-5 h-5 text-green-500" />,
  Pending: <AlertCircle className="w-5 h-5 text-yellow-500" />,
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [detailsProject, setDetailsProject] = useState<any | null>(null);
  const [projects, setProjects] = useState(projectsData);
  const [showNewProject, setShowNewProject] = useState(false);

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())
  );

  // Summary stats
  const total = projectsData.length;
  const ongoing = projectsData.filter((p) => p.status === "Ongoing").length;
  const completed = projectsData.filter((p) => p.status === "Completed").length;
  const pending = projectsData.filter((p) => p.status === "Pending").length;

  function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newProject = {
      name: formData.get("name") as string,
      id: formData.get("id") as string,
      status: formData.get("status") as string,
      city: formData.get("city") as string,
      manager: formData.get("manager") as string,
      department: formData.get("department") as string,
      team: [],
      budget: formData.get("budget") as string,
      start: formData.get("start") as string,
      end: formData.get("end") as string,
      description: formData.get("description") as string,
      road: formData.get("road") as string,
      lat: Number(formData.get("lat")),
      lng: Number(formData.get("lng")),
    };
    setProjects([newProject, ...projects]);
    setShowNewProject(false);
    form.reset();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-0 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 dark:text-white flex items-center gap-2">
              <Layers className="w-8 h-8 text-blue-700 dark:text-blue-300" />
              Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              All ongoing, completed, and planned urban projects.
            </p>
          </div>
          <Button
            className="flex items-center gap-2"
            variant="default"
            onClick={() => setShowNewProject(true)}
          >
            <Plus className="w-5 h-5" /> New Project
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <SummaryCard label="Total" value={total} color="from-blue-500 to-blue-400" />
          <SummaryCard label="Ongoing" value={ongoing} color="from-blue-700 to-blue-500" />
          <SummaryCard label="Completed" value={completed} color="from-green-600 to-green-400" />
          <SummaryCard label="Pending" value={pending} color="from-yellow-500 to-yellow-300" />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-1">
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

        {/* Project Cards */}
        <div className="grid gap-6">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No projects found.</div>
          )}
          {filtered.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl shadow-lg bg-white dark:bg-gray-900 border-l-8 ${
                statusColor[p.status as keyof typeof statusColor]
              } transition`}
            >
              <div
                className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 cursor-pointer"
                onClick={() => setExpanded(expanded === p.id ? null : p.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-blue-200 shadow">
                    {statusIcon[p.status as keyof typeof statusIcon]}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-900 dark:text-white">{p.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{p.id} • {p.city}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColor[p.status as keyof typeof statusColor]}`}
                  >
                    {p.status}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <User className="w-4 h-4" /> {p.manager}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <BarChart3 className="w-4 h-4" /> {p.budget}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" /> {p.start} <ChevronRight className="w-4 h-4" /> {p.end}
                  </span>
                  <button className="ml-2">
                    {expanded === p.id ? (
                      <ChevronUp className="w-5 h-5 text-blue-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-500" />
                    )}
                  </button>
                </div>
              </div>
              {expanded === p.id && (
                <div className="px-6 pb-6 pt-2 border-t border-blue-100 dark:border-gray-800">
                  <div className="mb-2 text-gray-700 dark:text-gray-200">{p.description}</div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailsProject(p);
                      }}
                    >
                      View Details
                    </Button>
                    <Link href={`/map?project=${p.id}`}>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> View on Map
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {detailsProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 w-full max-w-2xl shadow-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setDetailsProject(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Layers className="w-7 h-7 text-blue-600" />
                {detailsProject.name}
                <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold border ${statusColor[detailsProject.status as keyof typeof statusColor]}`}>
                  {detailsProject.status}
                </span>
              </h2>
              <div className="mb-4 text-gray-700 dark:text-gray-200">{detailsProject.description}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">Manager:</span> {detailsProject.manager}
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold">Department:</span> {detailsProject.department || "N/A"}
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Budget:</span> {detailsProject.budget}
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">Duration:</span> {detailsProject.start} <ChevronRight className="w-4 h-4" /> {detailsProject.end}
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="font-semibold">City:</span> {detailsProject.city}
                  </div>
                  {detailsProject.road && (
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold">Road:</span> {detailsProject.road}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" /> Team Members:
                  </div>
                  <ul className="mb-4">
                    {detailsProject.team && detailsProject.team.length > 0 ? (
                      detailsProject.team.map((member: any, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-blue-300" />
                          <span>{member.name}</span>
                          <span className="text-xs text-gray-500">({member.role})</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400">No team members listed.</li>
                    )}
                  </ul>
                  <div className="rounded-lg overflow-hidden border border-blue-100 dark:border-gray-800 h-40">
                    <ProjectMap projects={[detailsProject]} />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Link href={`/map?project=${detailsProject.id}`}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> View on Map
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => setDetailsProject(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* New Project Form */}
        {showNewProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <form
              onSubmit={handleCreateProject}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 w-full max-w-lg shadow-lg relative"
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowNewProject(false)}
                type="button"
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
              <div className="grid grid-cols-1 gap-4">
                <input name="name" required placeholder="Project Name" className="input" />
                <input name="id" required placeholder="Project ID" className="input" />
                <select name="status" required className="input">
                  <option value="">Status</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Planned</option>
                </select>
                <input name="city" required placeholder="City" className="input" />
                <input name="manager" required placeholder="Manager" className="input" />
                <input name="department" placeholder="Department" className="input" />
                <input name="budget" required placeholder="Budget" className="input" />
                <input name="start" required type="date" placeholder="Start Date" className="input" />
                <input name="end" required type="date" placeholder="End Date" className="input" />
                <input name="road" placeholder="Road" className="input" />
                <input name="lat" required type="number" step="any" placeholder="Latitude" className="input" />
                <input name="lng" required type="number" step="any" placeholder="Longitude" className="input" />
                <textarea name="description" required placeholder="Description" className="input" />
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary">Create</button>
                <button type="button" className="btn btn-outline" onClick={() => setShowNewProject(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Summary card component
function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      className={`rounded-xl shadow bg-gradient-to-br ${color} text-white flex flex-col items-center justify-center py-6`}
    >
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-widest font-semibold">{label}</div>
    </div>
  );
}

export function NewProjectPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      {/* Add your new project form here */}
      <p>Project creation form coming soon!</p>
    </div>
  );
}

export function MapPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const project = projectsData.find(p => p.id === projectId);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Project Map</h1>
      {project ? (
        <div className="h-96">
          <ProjectMap projects={[project]} />
        </div>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
}
