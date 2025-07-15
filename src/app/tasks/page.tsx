"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/authContext"
import { getDisplayName, getFullRoleDescription } from "@/lib/roles"
import { Search, Plus, Filter, Calendar, Clock, CheckCircle, AlertTriangle, User } from "lucide-react"

export default function TasksPage() {
  const { user } = useAuth()
  const displayName = getDisplayName(user)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample tasks data
  const tasks = [
    {
      id: "TSK-001",
      title: "Review Metro Line Extension Budget",
      description: "Analyze and approve the revised budget for the metro extension project",
      priority: "high",
      status: "pending",
      assignee: "Rajesh Kumar",
      dueDate: "2025-07-10",
      project: "Metro Line Extension",
      department: "Urban Transport"
    },
    {
      id: "TSK-002",
      title: "Update Traffic System Documentation",
      description: "Document the new AI-powered traffic management system specifications",
      priority: "medium",
      status: "in-progress",
      assignee: "Priya Singh",
      dueDate: "2025-07-15",
      project: "Smart Traffic System",
      department: "Urban Transport"
    },
    {
      id: "TSK-003",
      title: "Site Inspection for Solar Park",
      description: "Conduct environmental impact assessment for the solar park location",
      priority: "high",
      status: "pending",
      assignee: "Vikram Mehta",
      dueDate: "2025-07-08",
      project: "Solar Park Installation",
      department: "Renewable Energy"
    },
    {
      id: "TSK-004",
      title: "Public Park Design Approval",
      description: "Review and approve architectural designs for park renovation",
      priority: "low",
      status: "completed",
      assignee: "Anjali Sharma",
      dueDate: "2025-07-02",
      project: "Public Park Renovation",
      department: "Parks & Recreation"
    }
  ]

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || task.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200"
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending": return "bg-orange-100 text-orange-800 border-orange-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />
      case "in-progress": return <Clock className="w-4 h-4" />
      case "pending": return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Management</h1>
        <p className="text-gray-600 text-lg">Manage and track project tasks efficiently</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks, projects, or assignees..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)} flex items-center gap-1`}>
                    {task.priority.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)} flex items-center gap-1`}>
                    {getStatusIcon(task.status)}
                    {task.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{task.description}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {task.assignee}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div>Project: {task.project}</div>
                  <div>Dept: {task.department}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
