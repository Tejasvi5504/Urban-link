"use client"

import { useState, useEffect, useCallback } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "./leaflet-map.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// MapEventHandler component to handle map clicks
const MapEventHandler = ({ onClick }: { onClick: (e: L.LeafletMouseEvent) => void }) => {
  useMapEvents({
    click: onClick,
  })
  return null
}

// Custom SVG icons for different project statuses
const createCustomIcon = (status: string) => {
  const getIconSvg = (color: string) => `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="2"/>
      <path d="M16 8v16M8 16h16" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `

  const colors = {
    "In Progress": "#3b82f6",
    "Planning": "#eab308",
    "Completed": "#22c55e",
    "default": "#ef4444"
  }

  return L.divIcon({
    className: 'custom-marker',
    html: getIconSvg(colors[status as keyof typeof colors] || colors.default),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })
}

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

interface MapProps {
  projects?: Project[]
  searchLocation?: { lat: number; lng: number } | null
  onLocationSearch?: (query: string) => void
}

// Component to handle map view changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])
  return null
}

export function LeafletMapComponent({ projects = [], searchLocation, onLocationSearch }: MapProps) {
  const [mapView, setMapView] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(searchLocation ? [searchLocation.lat, searchLocation.lng] : null)
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    description: "",
    department: "",
    timeline: "",
    status: "Planning"
  })
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [activePopup, setActivePopup] = useState<string | null>(null)

  // Default center set to India
  const defaultCenter: [number, number] = [20.5937, 78.9629]

  // Update map center when search location changes
  useEffect(() => {
    if (searchLocation) {
      setSelectedLocation([searchLocation.lat, searchLocation.lng])
    }
  }, [searchLocation])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500"
      case "Planning":
        return "bg-yellow-500"
      case "Completed":
        return "bg-green-500"
      default:
        return "bg-red-500"
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      mapView === "all" ||
      (mapView === "in-progress" && project.status === "In Progress") ||
      (mapView === "planning" && project.status === "Planning") ||
      (mapView === "completed" && project.status === "Completed")
  )

  const handleMapClick = useCallback((e: L.LeafletMouseEvent) => {
    if (isCreatingProject) {
      setSelectedLocation([e.latlng.lat, e.latlng.lng])
    }
  }, [isCreatingProject])

  const handleAddProject = useCallback(() => {
    if (selectedLocation && newProject.name && newProject.department && newProject.timeline) {
      // Here you would typically make an API call to save the new project
      console.log("New project:", {
        ...newProject,
        location: {
          lat: selectedLocation[0],
          lng: selectedLocation[1]
        }
      })
      // Reset form
      setNewProject({
        name: "",
        description: "",
        department: "",
        timeline: "",
        status: "Planning"
      })
      setSelectedLocation(null)
      setIsCreatingProject(false)
    }
  }, [selectedLocation, newProject])

  const startCreatingProject = useCallback(() => {
    setIsCreatingProject(true)
  }, [])

  const handlePopupOpen = useCallback((projectId: string) => {
    setActivePopup(projectId)
  }, [])

  const handlePopupClose = useCallback(() => {
    setActivePopup(null)
  }, [])

  return (
    <div className="h-full w-full">
      <MapContainer
        center={selectedLocation || defaultCenter}
        zoom={selectedLocation ? 13 : 5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <MapEventHandler onClick={handleMapClick} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapController center={selectedLocation || defaultCenter} />
        
        {filteredProjects.map((project) => (
          <Marker
            key={project.id}
            position={[project.location.lat, project.location.lng]}
            icon={createCustomIcon(project.status)}
            eventHandlers={{
              click: () => handlePopupOpen(project.id)
            }}
          >
            <Popup
              eventHandlers={{
                add: () => handlePopupOpen(project.id),
                remove: handlePopupClose
              }}
            >
              <div className="p-2">
                <h3 className="font-bold">{project.name}</h3>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <p className="mt-2">{project.description}</p>
                <p className="mt-1 text-sm text-gray-600">
                  Department: {project.department}
                </p>
                <p className="text-sm text-gray-600">
                  Timeline: {project.timeline}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedLocation && isCreatingProject && (
          <Marker 
            position={selectedLocation}
            icon={createCustomIcon("Planning")}
          >
            <Popup
              eventHandlers={{
                add: () => handlePopupOpen("new"),
                remove: handlePopupClose
              }}
            >
              <div className="p-2">
                <h3 className="font-bold mb-2">Add New Project</h3>
                <div className="space-y-2">
                  <Input
                    placeholder="Project Name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                  <Input
                    placeholder="Department"
                    value={newProject.department}
                    onChange={(e) => setNewProject({ ...newProject, department: e.target.value })}
                  />
                  <Input
                    placeholder="Timeline"
                    value={newProject.timeline}
                    onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value })}
                  />
                  <Input
                    placeholder="Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                  <Button onClick={handleAddProject} className="w-full">
                    Add Project
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
} 