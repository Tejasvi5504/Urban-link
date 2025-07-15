"use client"

import { useState } from "react"
import { Search, Filter, Plus, Eye, MapPin, Calendar, DollarSign, User, Users } from "lucide-react"

// Sample project data
const projects = [
  {
    id: "PRJ-001",
    name: "Metro Line Extension",
    location: "Mumbai",
    status: "Ongoing",
    statusColor: "blue",
    manager: "Rajesh Kumar",
    budget: "₹120 Cr",
    startDate: "2024-01-10",
    endDate: "2025-12-31",
    progress: 65,
    department: "Urban Transport",
    description: "Extending the metro line to connect suburban areas and reduce traffic congestion. Includes new stations, tracks, and smart ticketing."
  },
  {
    id: "PRJ-002", 
    name: "Smart Traffic System",
    location: "Delhi",
    status: "Completed",
    statusColor: "green",
    manager: "Priya Singh",
    budget: "₹40 Cr",
    startDate: "2023-03-01",
    endDate: "2024-02-15",
    progress: 100,
    department: "Urban Transport",
    description: "Implementation of AI-powered traffic management system with real-time monitoring and automated signal control."
  },
  {
    id: "PRJ-003",
    name: "Solar Park Installation", 
    location: "Jaipur",
    status: "Ongoing",
    statusColor: "blue",
    manager: "Vikram Mehta",
    budget: "₹80 Cr",
    startDate: "2024-05-01",
    endDate: "2025-11-30",
    progress: 45,
    department: "Renewable Energy",
    description: "Large-scale solar power installation to meet 30% of city's energy needs through clean renewable sources."
  },
  {
    id: "PRJ-004",
    name: "Public Park Renovation",
    location: "Pune", 
    status: "Pending",
    statusColor: "yellow",
    manager: "Anita Desai",
    budget: "₹15 Cr",
    startDate: "2025-01-01",
    endDate: "2025-09-30",
    progress: 0,
    department: "Public Works",
    description: "Complete renovation of central park including new recreational facilities, walking paths, and landscaping."
  },
  {
    id: "PRJ-005",
    name: "Ring Road Expansion",
    location: "Delhi",
    status: "Ongoing", 
    statusColor: "blue",
    manager: "Amit Sharma",
    budget: "₹200 Cr",
    startDate: "2024-06-01",
    endDate: "2026-01-31",
    progress: 30,
    department: "Urban Planning",
    description: "Widening and expansion of the outer ring road to accommodate increasing traffic and improve connectivity."
  },
  {
    id: "PRJ-006",
    name: "Airport Expressway Upgrade",
    location: "Delhi",
    status: "Planned",
    statusColor: "gray",
    manager: "Sunita Rao",
    budget: "₹150 Cr",
    startDate: "2025-03-01",
    endDate: "2026-12-31",
    progress: 0,
    department: "Aviation Infrastructure",
    description: "Upgrading airport expressway with modern infrastructure and enhanced safety features."
  },
  {
    id: "PRJ-007",
    name: "IT Corridor Flyover",
    location: "Hyderabad",
    status: "Ongoing",
    statusColor: "blue", 
    manager: "Ravi Teja",
    budget: "₹95 Cr",
    startDate: "2024-08-01",
    endDate: "2026-02-28",
    progress: 20,
    department: "IT & Corridors",
    description: "Construction of flyover in IT corridor to reduce traffic congestion and improve connectivity to tech parks."
  },
  {
    id: "PRJ-008",
    name: "Eastern Express Highway Beautification",
    location: "Mumbai",
    status: "Completed",
    statusColor: "green",
    manager: "Meera Joshi", 
    budget: "₹25 Cr",
    startDate: "2023-01-15",
    endDate: "2023-12-31",
    progress: 100,
    department: "Beautification",
    description: "Landscaping and beautification of Eastern Express Highway with gardens, art installations, and lighting."
  }
]

const statusCounts = {
  total: projects.length,
  ongoing: projects.filter(p => p.status === "Ongoing").length,
  completed: projects.filter(p => p.status === "Completed").length,
  pending: projects.filter(p => p.status === "Pending" || p.status === "Planned").length
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "planned": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">All ongoing, completed, and planned urban projects.</p>
          </div>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">{statusCounts.total}</div>
          <div className="text-blue-100 text-sm">TOTAL</div>
        </div>
        <div className="bg-blue-400 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">{statusCounts.ongoing}</div>
          <div className="text-blue-100 text-sm">ONGOING</div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">{statusCounts.completed}</div>
          <div className="text-green-100 text-sm">COMPLETED</div>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">{statusCounts.pending}</div>
          <div className="text-yellow-100 text-sm">PENDING</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID, or city..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="planned">Planned</option>
        </select>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

function ProjectCard({ project, onClick }: { project: any, onClick: () => void }) {
  const getLeftBorderColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing": return "border-l-blue-400"
      case "completed": return "border-l-green-400" 
      case "pending": return "border-l-yellow-400"
      case "planned": return "border-l-gray-400"
      default: return "border-l-gray-400"
    }
  }

  return (
    <div className={`bg-white rounded-lg border-l-4 ${getLeftBorderColor(project.status)} p-4 hover:shadow-md transition-shadow cursor-pointer`} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            <div className="text-sm text-gray-500 flex items-center gap-4">
              <span>{project.id} • {project.location}</span>
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {project.manager}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {project.budget}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.startDate} → {project.endDate}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <button className="text-blue-600 hover:text-blue-800">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "planned": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🏗️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
              <p className="text-gray-600 text-sm">
                {project.status === "Ongoing" ? "Extending the metro line to connect suburban areas and reduce traffic congestion. Includes new stations, tracks, and smart ticketing." : project.description}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Project Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Manager:</span>
                  <span className="font-medium">{project.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{project.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">{project.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">City:</span>
                  <span className="font-medium">{project.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Team Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">RK</div>
                <div>
                  <div className="font-medium">Rajesh Kumar</div>
                  <div className="text-gray-500 text-xs">(Manager)</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs">AD</div>
                <div>
                  <div className="font-medium">Anita Desai</div>
                  <div className="text-gray-500 text-xs">(Engineer)</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs">PS</div>
                <div>
                  <div className="font-medium">Priya Singh</div>
                  <div className="text-gray-500 text-xs">(Planner)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Project location map</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              View on Map
            </button>
            <button onClick={onClose} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
