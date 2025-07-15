"use client"

import { useState, useEffect } from "react"
import {
  Building,
  CheckCircle,
  Clock,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Timer,
  Users,
  Search,
  Eye,
  FileText,
  TrendingUp,
  User,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useIsMobile } from "@/hooks/use-mobile"

// State-City mapping
const stateCityMapping = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Delhi: ["New Delhi"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  Telangana: ["Hyderabad", "Warangal"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
}

interface Employee {
  id: string
  name: string
  designation: string
  department: string
  avatar?: string
}

interface ProjectHead {
  name: string
  title: string
  department: string
  avatar?: string
}

interface Project {
  id: string
  name: string
  city: string
  state: string
  status: "ongoing" | "pending" | "completed"
  departments: string[]
  projectHead: ProjectHead
  assignedEmployees: Employee[]
  budget: string
  progress: number
  startDate: string
  endDate: string
  description: string
  documents: number
  tasks: number
  completedTasks: number
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "ongoing":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "ongoing":
      return <Clock className="w-3 h-3" />
    case "pending":
      return <Timer className="w-3 h-3" />
    case "completed":
      return <CheckCircle className="w-3 h-3" />
    default:
      return null
  }
}

// Project Detail Modal Component
function ProjectDetailModal({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{project.name}</DialogTitle>
              <DialogDescription className="flex items-center mt-1">
                <span className="font-mono text-sm">{project.id}</span>
                <span className="mx-2">•</span>
                <MapPin className="w-3 h-3 mr-1" />
                {project.city}, {project.state}
              </DialogDescription>
            </div>
            <Badge className={`${getStatusColor(project.status)} flex items-center gap-1`}>
              {getStatusIcon(project.status)}
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-6 mt-6">
          {/* Project Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Budget</label>
                  <p className="text-lg font-semibold">{project.budget}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Progress</label>
                  <div className="mt-2">
                    <Progress value={project.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">{project.progress}% Complete</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                    <p className="font-medium">{project.startDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">End Date</label>
                    <p className="font-medium">{project.endDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      {project.city}, {project.state}
                    </p>
                    <p className="text-xs text-gray-400">Map integration pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Head & Team */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Project Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Project Head */}
              <div>
                <h4 className="font-medium mb-2">Project Head</h4>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={project.projectHead.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {project.projectHead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{project.projectHead.name}</p>
                    <p className="text-sm text-muted-foreground">{project.projectHead.title}</p>
                    <p className="text-xs text-muted-foreground">{project.projectHead.department}</p>
                  </div>
                </div>
              </div>

              {/* Assigned Employees */}
              <div>
                <h4 className="font-medium mb-2">Assigned Team ({project.assignedEmployees.length})</h4>
                <div className="grid gap-2">
                  {project.assignedEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {employee.designation} • {employee.department}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {employee.id}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks & Documents */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Tasks
                  </span>
                  <Badge variant="secondary">
                    {project.completedTasks}/{project.tasks}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed Tasks</span>
                    <span>{Math.round((project.completedTasks / project.tasks) * 100)}%</span>
                  </div>
                  <Progress value={(project.completedTasks / project.tasks) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {project.completedTasks} of {project.tasks} tasks completed
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Documents
                  </span>
                  <Badge variant="secondary">{project.documents}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Project documents, reports, and attachments</p>
                <Button variant="outline" size="sm" className="mt-3">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Documents
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ProjectsPage() {
  const [selectedState, setSelectedState] = useState("Maharashtra")
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [activeTab, setActiveTab] = useState("ongoing")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useIsMobile()

  // Get available cities for selected state
  const availableCities = stateCityMapping[selectedState as keyof typeof stateCityMapping] || []

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/dashboard/projects")
        const data = await response.json()
        setProjects(data.projects || [])
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Update city when state changes
  useEffect(() => {
    if (availableCities.length > 0 && !availableCities.includes(selectedCity)) {
      setSelectedCity(availableCities[0])
    }
  }, [selectedState, availableCities, selectedCity])

  const filteredProjects = projects.filter((project) => {
    const matchesState = selectedState === "All States" || project.state === selectedState
    const matchesCity = selectedCity === "All Cities" || project.city === selectedCity
    const matchesStatus = activeTab === "all" || project.status === activeTab
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesState && matchesCity && matchesStatus && matchesSearch
  })

  const getStatsForFilters = () => {
    const filteredByLocation = projects.filter(
      (p) =>
        (selectedState === "All States" || p.state === selectedState) &&
        (selectedCity === "All Cities" || p.city === selectedCity),
    )

    return {
      total: filteredByLocation.length,
      ongoing: filteredByLocation.filter((p) => p.status === "ongoing").length,
      completed: filteredByLocation.filter((p) => p.status === "completed").length,
      pending: filteredByLocation.filter((p) => p.status === "pending").length,
    }
  }

  const stats = getStatsForFilters()

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor inter-departmental projects across cities</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>By Department</DropdownMenuItem>
              <DropdownMenuItem>By Budget Range</DropdownMenuItem>
              <DropdownMenuItem>By Due Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All States">All States</SelectItem>
              {Object.keys(stateCityMapping).map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Cities">All Cities</SelectItem>
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {city}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {selectedState === "All States" ? "Across all states" : `In ${selectedState}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Projects</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.ongoing}</div>
            <p className="text-xs text-muted-foreground">Active development</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Projects</CardTitle>
            <Timer className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Projects Grid/List */}
          <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <span className="font-mono text-sm">{project.id}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.city}, {project.state}
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(project.status)} flex items-center gap-1`}>
                      {getStatusIcon(project.status)}
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                  {/* Departments */}
                  <div className="flex flex-wrap gap-1">
                    {project.departments.map((dept) => (
                      <Badge key={dept} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                  </div>

                  {/* Project Head */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium">
                      <User className="w-4 h-4 mr-2" />
                      Project Head
                    </div>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={project.projectHead.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {project.projectHead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{project.projectHead.name}</p>
                        <p className="text-xs text-muted-foreground">{project.projectHead.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Start:</span>
                      <p className="font-medium">{project.startDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">End:</span>
                      <p className="font-medium">{project.endDate}</p>
                    </div>
                  </div>

                  {/* Assigned Employees */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Team ({project.assignedEmployees.length})
                      </span>
                    </div>
                    <div className="flex -space-x-2">
                      {project.assignedEmployees.slice(0, 4).map((employee, index) => (
                        <div key={index} className="relative group">
                          <Avatar className="border-2 border-white w-8 h-8">
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                            <AvatarFallback className="text-xs">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {employee.name} - {employee.designation}
                          </div>
                        </div>
                      ))}
                      {project.assignedEmployees.length > 4 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium">+{project.assignedEmployees.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mini Map Placeholder */}
                  <div className="h-20 bg-gray-100 rounded-md flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">Map Preview</span>
                  </div>

                  {/* Action Button */}
                  <Button variant="outline" className="w-full" onClick={() => openProjectModal(project)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Building className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
