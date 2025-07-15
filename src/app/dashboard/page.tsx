"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/authContext"
import { getDisplayName, getFullRoleDescription } from "@/lib/roles"
import { Search, Bell, Calendar, BarChart3, Users, FileText, MapPin, TrendingUp, Clock, CheckCircle, AlertTriangle, Plus, Eye, Calendar as CalendarIcon, Share2 } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const LeafletMapComponent = dynamic(
  () => import("@/components/dashboard/leaflet-map").then((mod) => ({ default: mod.LeafletMapComponent })),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl h-64 flex items-center justify-center border border-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-blue-700 font-medium">Loading Map...</p>
        </div>
      </div>
    )
  }
)

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  
  // Get user display information
  const displayName = getDisplayName(user)
  const roleDescription = getFullRoleDescription(user)

  // State management for dashboard functionality
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New project approval required", type: "warning" },
    { id: 2, message: "Budget threshold exceeded", type: "error" },
    { id: 3, message: "Team meeting scheduled", type: "info" }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  // State for map location search
  const [mapSearchQuery, setMapSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedSearchLocation, setSelectedSearchLocation] = useState(null)

  // Sample project data for the map
  const mapProjects = [
    {
      id: "PRJ-001",
      name: "Metro Line Extension",
      location: { lat: 19.0760, lng: 72.8777 }, // Mumbai
      description: "Extending the metro line to connect suburban areas",
      status: "In Progress",
      department: "Urban Transport",
      timeline: "2024-2025"
    },
    {
      id: "PRJ-002",
      name: "Smart Traffic System",
      location: { lat: 28.6139, lng: 77.2090 }, // Delhi
      description: "AI-powered traffic management system",
      status: "Completed",
      department: "Urban Transport",
      timeline: "2023-2024"
    },
    {
      id: "PRJ-003",
      name: "Solar Park Installation",
      location: { lat: 26.9124, lng: 75.7873 }, // Jaipur
      description: "Large-scale solar power installation",
      status: "In Progress",
      department: "Renewable Energy",
      timeline: "2024-2025"
    },
    {
      id: "PRJ-004",
      name: "Public Park Renovation",
      location: { lat: 18.5204, lng: 73.8567 }, // Pune
      description: "Renovating public parks with modern facilities",
      status: "Planning",
      department: "Parks & Recreation",
      timeline: "2025"
    }
  ]

  // Handler functions for dashboard interactions
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery)
      // Here you would typically make an API call to search
      alert(`Searching for: ${searchQuery}`)
    }
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  const handleProjectCardClick = (project) => {
    setSelectedProject(project)
    // Navigate to project details or open modal
    console.log("Opening project:", project)
  }

  const handleNewProject = () => {
    setShowNewProjectModal(true)
    // This would typically open a project creation form
    alert("Opening New Project Form...")
  }

  const handleViewTasks = () => {
    // Navigate to tasks page
    router.push("/tasks")
  }

  const handleScheduleMeeting = () => {
    // Navigate to meetings page or open meeting scheduler
    router.push("/meetings")
  }

  const handleShareResource = () => {
    // Open resource sharing modal
    alert("Opening Resource Sharing...")
  }

  const handleStatsCardClick = (cardType) => {
    switch(cardType) {
      case 'projects':
        router.push("/projects")
        break
      case 'members':
        router.push("/departments")
        break
      case 'tasks':
        router.push("/tasks")
        break
      case 'budget':
        alert("Opening Budget Overview...")
        break
    }
  }

  // Handler for map location search
  const handleMapSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    
    setIsSearching(true)
    try {
      // Simulate geocoding API call (replace with actual API like Nominatim or Google Geocoding)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
      const results = await response.json()
      setSearchResults(results.map(result => ({
        id: result.place_id,
        name: result.display_name,
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon)
      })))
    } catch (error) {
      console.error("Geocoding error:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleLocationSelect = (location) => {
    // This would update the map center
    console.log("Selected location:", location)
    setMapSearchQuery(location.name)
    setSearchResults([])
    setSelectedSearchLocation({ lat: location.lat, lng: location.lng })
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <form onSubmit={handleSearch} className="flex-1 max-w-lg relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, departments, resources..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
          />
        </form>
        <div className="flex items-center gap-6">
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="p-3 text-gray-600 hover:text-gray-900 relative bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                        notification.type === 'error' ? 'bg-red-100 text-red-800' :
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 border border-gray-200">
            <img src="/avatar.png" alt="User" className="w-8 h-8 rounded-full" />
            <div>
              <div className="font-semibold text-sm text-gray-900">{displayName}</div>
              <div className="text-xs text-gray-500">{roleDescription}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {displayName}! 👋
            </h1>
            <p className="text-gray-600 text-lg">Here's what's happening with your projects today.</p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl text-center shadow-lg">
            <div className="text-sm text-blue-100 uppercase tracking-wide">Friday</div>
            <div className="text-3xl font-bold">4</div>
            <div className="text-sm text-blue-100">July 2025</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div 
          onClick={() => handleStatsCardClick('projects')}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
              <p className="text-green-600 text-sm mt-1 font-medium">+2 from last month</p>
            </div>
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleStatsCardClick('members')}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Members</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">156</p>
              <p className="text-green-600 text-sm mt-1 font-medium">+8 new members</p>
            </div>
            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleStatsCardClick('tasks')}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Tasks Pending</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">8</p>
              <p className="text-red-600 text-sm mt-1 font-medium">-3 from last week</p>
            </div>
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleStatsCardClick('budget')}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Budget Usage</p>
              <p className="text-3xl font-bold text-green-600 mt-1">68%</p>
              <p className="text-green-600 text-sm mt-1 font-medium">On track</p>
            </div>
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Recent Projects and Project Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Quick Actions, Recent Projects and Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleNewProject}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
              <button 
                onClick={handleViewTasks}
                className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Tasks
              </button>
              <button 
                onClick={handleScheduleMeeting}
                className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                Schedule Meeting
              </button>
              <button 
                onClick={handleShareResource}
                className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Resource
              </button>
            </div>
          </div>
          {/* Recent Projects */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Projects</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                <div className="flex-shrink-0 w-80">
                  <ProjectCard 
                    title="Metro Line Extension"
                    code="PRJ-001"
                    location="Mumbai"
                    status="Ongoing"
                    statusColor="blue"
                  />
                </div>
                <div className="flex-shrink-0 w-80">
                  <ProjectCard 
                    title="Smart Traffic System"
                    code="PRJ-002"
                    location="Delhi"
                    status="Completed"
                    statusColor="green"
                  />
                </div>
                <div className="flex-shrink-0 w-80">
                  <ProjectCard 
                    title="Solar Park Installation"
                    code="PRJ-003"
                    location="Jaipur"
                    status="Ongoing"
                    statusColor="blue"
                  />
                </div>
                <div className="flex-shrink-0 w-80">
                  <ProjectCard 
                    title="Public Park Renovation"
                    code="PRJ-004"
                    location="Pune"
                    status="Pending"
                    statusColor="yellow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Rajesh Kumar</p>
                  <p className="text-sm text-gray-600 mt-1">commented on Metro Line Extension</p>
                  <p className="text-xs text-gray-400 mt-1">2h ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Priya Singh</p>
                  <p className="text-sm text-gray-600 mt-1">uploaded Smart Traffic System plans</p>
                  <p className="text-xs text-gray-400 mt-1">4h ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Project Map */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Map</h2>
          <div className="rounded-xl overflow-hidden h-[500px] border border-gray-200">
            <LeafletMapComponent 
              projects={mapProjects} 
              searchLocation={selectedSearchLocation}
              onLocationSearch={handleMapSearch}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ title, code, location, status, statusColor }: {
  title: string
  code: string
  location: string
  status: string
  statusColor: string
}) {
  const router = useRouter()
  
  const statusColors = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    red: "bg-red-100 text-red-800 border-red-200"
  }

  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case "ongoing": return <Clock className="w-3 h-3" />
      case "completed": return <CheckCircle className="w-3 h-3" />
      case "pending": return <AlertTriangle className="w-3 h-3" />
      default: return <Clock className="w-3 h-3" />
    }
  }

  const handleViewDetails = () => {
    router.push(`/projects?code=${code}`)
  }

  return (
    <div className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-blue-200 cursor-pointer bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
          <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[statusColor as keyof typeof statusColors]} flex items-center gap-1`}>
          {getStatusIcon()}
          {status}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">{code} • {location}</p>
      <button 
        onClick={handleViewDetails}
        className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline"
      >
        View Details →
      </button>
    </div>
  )
}
