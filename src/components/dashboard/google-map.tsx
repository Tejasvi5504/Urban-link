"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLoadScript, GoogleMap, Marker, InfoWindow, DrawingManager } from "@react-google-maps/api"
import type { Libraries } from "@react-google-maps/api"

// Define the libraries array with additional features
const libraries: Libraries = ["places", "drawing", "geometry"]

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

// Debug: Log API key presence (not the actual key)
console.log('API Key available:', !!GOOGLE_MAPS_API_KEY)

const containerStyle = {
  width: "100%",
  height: "500px",
}

const defaultCenter = {
  lat: 51.5074,
  lng: -0.1278
}

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }]
    }
  ]
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
}

interface MapProps {
  projects?: Project[]
}

export function MapComponent({ projects = [] }: MapProps) {
  const [mapView, setMapView] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null)
  const [drawingMode, setDrawingMode] = useState<string>("none")
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  })

  // Debug: Log loading status
  useEffect(() => {
    console.log('Map loading status:', { isLoaded, hasError: !!loadError })
  }, [isLoaded, loadError])

  // Initialize search box
  useEffect(() => {
    if (isLoaded && map && searchInputRef.current) {
      const searchBox = new google.maps.places.SearchBox(searchInputRef.current)
      setSearchBox(searchBox)

      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds)
      })

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces()
        if (places?.length === 0) return

        const bounds = new google.maps.LatLngBounds()
        places?.forEach((place) => {
          if (!place.geometry?.location) return
          bounds.extend(place.geometry.location)
        })
        map.fitBounds(bounds)
      })
    }
  }, [isLoaded, map])

  // Handle drawing tools
  const onDrawingComplete = useCallback((e: google.maps.drawing.OverlayCompleteEvent) => {
    if (e.type === 'polygon') {
      const polygon = e.overlay as google.maps.Polygon
      const path = polygon.getPath()
      const coordinates = Array.from({ length: path.getLength() }, (_, i) => {
        const point = path.getAt(i)
        return { lat: point.lat(), lng: point.lng() }
      })
      console.log('Drawn area coordinates:', coordinates)
    }
    setDrawingMode("none")
  }, [])

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      case "Planning":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
      case "Completed":
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      default:
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    }
  }

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

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log("Map loaded successfully")
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    console.log("Map unmounted")
    setMap(null)
  }, [])

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>Google Maps API key is missing. Please add it to your .env.local file.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loadError) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>Error loading Google Maps: {loadError.message || 'Failed to load Google Maps'}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isLoaded) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-center">
            <p>Loading Google Maps...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Project Map</CardTitle>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search location..."
            className="w-[200px]"
          />
          <Select value={mapView} onValueChange={setMapView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={drawingMode} onValueChange={setDrawingMode}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Drawing tools" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="polygon">Draw Area</SelectItem>
              <SelectItem value="marker">Add Marker</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div style={containerStyle}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={12}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {filteredProjects.map((project) => (
              <Marker
                key={project.id}
                position={project.location}
                icon={{
                  url: getMarkerColor(project.status),
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                onClick={() => setSelectedProject(project)}
              />
            ))}

            {drawingMode !== "none" && (
              <DrawingManager
                onOverlayComplete={onDrawingComplete}
                options={{
                  drawingControl: true,
                  drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                      drawingMode === 'polygon' ? google.maps.drawing.OverlayType.POLYGON : null,
                      drawingMode === 'marker' ? google.maps.drawing.OverlayType.MARKER : null,
                    ].filter(Boolean) as google.maps.drawing.OverlayType[],
                  },
                }}
              />
            )}

            {selectedProject && (
              <InfoWindow
                position={selectedProject.location}
                onCloseClick={() => setSelectedProject(null)}
              >
                <div className="p-3 max-w-xs bg-white rounded-lg shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{selectedProject.name}</h3>
                    <Badge className={getStatusColor(selectedProject.status)}>
                      {selectedProject.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{selectedProject.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Location:</span>
                      <span className="text-gray-600">
                        {selectedProject.location.lat.toFixed(4)}, {selectedProject.location.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </CardContent>
    </Card>
  )
} 