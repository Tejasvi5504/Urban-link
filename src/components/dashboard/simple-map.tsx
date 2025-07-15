"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react"

interface Project {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  description: string
  status: string
  department: string
  timeline: string
}

interface SimpleMapProps {
  projects?: Project[]
}

export function SimpleMapComponent({ projects = [] }: SimpleMapProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Sample India coordinates for the map center
  const center = { lat: 20.5937, lng: 78.9629 }

  // Map the projects to relative positions on our custom map
  const projectPositions = projects.map((project, index) => ({
    ...project,
    x: 20 + (index * 15) % 60, // Distribute horizontally
    y: 30 + ((index * 20) % 40), // Distribute vertically
  }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500 border-blue-600"
      case "Completed":
        return "bg-green-500 border-green-600"
      case "Planning":
        return "bg-yellow-500 border-yellow-600"
      default:
        return "bg-red-500 border-red-600"
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 opacity-50"></div>
      
      {/* Map Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
          <ZoomIn className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
          <ZoomOut className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
          <Navigation className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Project Markers */}
      {projectPositions.map((project) => (
        <div
          key={project.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
          style={{
            left: `${project.x}%`,
            top: `${project.y}%`,
          }}
          onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
        >
          <div className={`w-6 h-6 ${getStatusColor(project.status)} rounded-full border-2 shadow-lg hover:scale-110 transition-transform flex items-center justify-center`}>
            <MapPin className="w-3 h-3 text-white" />
          </div>
          
          {/* Project Label */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap border border-gray-200">
            {project.name}
          </div>
        </div>
      ))}

      {/* Project Details Popup */}
      {selectedProject && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-30 max-w-sm">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{selectedProject.name}</h3>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">{selectedProject.description}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-1 rounded-full ${getStatusColor(selectedProject.status)} text-white`}>
              {selectedProject.status}
            </span>
            <span className="text-gray-500">{selectedProject.department}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{selectedProject.timeline}</div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md border border-gray-200 p-3 z-10">
        <h4 className="text-xs font-semibold text-gray-900 mb-2">Project Status</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Planning</span>
          </div>
        </div>
      </div>

      {/* No Projects Message */}
      {projects.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No projects to display</p>
            <p className="text-sm text-gray-400">Projects will appear here once added</p>
          </div>
        </div>
      )}
    </div>
  )
}
