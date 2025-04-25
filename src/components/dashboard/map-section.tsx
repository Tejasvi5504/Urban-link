"use client"

import { useState } from "react"
import { MapPin, ZoomIn } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MapSection() {
  const [mapView, setMapView] = useState("all")

  const projects = [
    {
      id: 1,
      name: "Metro Line Extension",
      location: "Sector 12",
      status: "In Progress",
      type: "Infrastructure",
      x: 30,
      y: 40,
    },
    {
      id: 2,
      name: "Smart Traffic System",
      location: "Central District",
      status: "Planning",
      type: "Smart City",
      x: 50,
      y: 60,
    },
    {
      id: 3,
      name: "Solar Park Installation",
      location: "Outer Zone",
      status: "Completed",
      type: "Energy",
      x: 70,
      y: 30,
    },
    {
      id: 4,
      name: "Water Treatment Plant",
      location: "River Front",
      status: "In Progress",
      type: "Utilities",
      x: 40,
      y: 70,
    },
    {
      id: 5,
      name: "Public Park Renovation",
      location: "Sector 5",
      status: "Planning",
      type: "Recreation",
      x: 60,
      y: 50,
    },
  ]

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Project Map</CardTitle>
        </div>
        <div className="ml-auto flex items-center gap-2">
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
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
          {/* Map background with grid lines */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-700" />
            ))}
          </div>

          {/* City outline */}
          <div className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600" />
          <div className="absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600" />
          <div className="absolute left-1/2 top-1/2 h-2/5 w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600" />

          {/* Roads */}
          <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-slate-300 dark:bg-slate-600" />
          <div className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 bg-slate-300 dark:bg-slate-600" />

          {/* Project markers */}
          {projects
            .filter(
              (project) =>
                mapView === "all" ||
                (mapView === "in-progress" && project.status === "In Progress") ||
                (mapView === "planning" && project.status === "Planning") ||
                (mapView === "completed" && project.status === "Completed"),
            )
            .map((project) => (
              <div
                key={project.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${project.x}%`,
                  top: `${project.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full 
                    ${
                      project.status === "In Progress"
                        ? "bg-blue-500"
                        : project.status === "Planning"
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }
                  `}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="mt-1 rounded-md bg-background px-2 py-1 text-xs font-medium shadow-sm">
                  {project.name}
                </div>
              </div>
            ))}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-md bg-background p-2 shadow-md">
            <div className="text-xs font-medium">Project Status</div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span className="text-xs">Planning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Completed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
