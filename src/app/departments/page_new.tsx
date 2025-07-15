"use client";
import React from "react";
import { Building, Users, FolderKanban, User } from "lucide-react";

const departments = [
  {
    id: 1,
    name: "Urban Transport",
    head: "Rajesh Kumar",
    teamSize: 12,
    projects: 1,
    description: "Responsible for planning, development, and maintenance of urban transport infrastructure.",
    keyProjects: ["Metro Line Extension"],
    icon: "🚇",
    borderColor: "border-l-blue-400"
  },
  {
    id: 2,
    name: "Urban Planning", 
    head: "Priya Singh",
    teamSize: 9,
    projects: 2,
    description: "Focuses on city planning, zoning, and sustainable urban growth.",
    keyProjects: ["Smart Traffic System", "Ring Road Expansion"],
    icon: "🏗️",
    borderColor: "border-l-blue-400"
  },
  {
    id: 3,
    name: "Renewable Energy",
    head: "Vikram Mehta", 
    teamSize: 7,
    projects: 1,
    description: "Leads the adoption and implementation of renewable energy projects.",
    keyProjects: ["Solar Park Installation"],
    icon: "🔋",
    borderColor: "border-l-blue-400"
  },
  {
    id: 4,
    name: "Public Works",
    head: "Anita Desai",
    teamSize: 10,
    projects: 1,
    description: "Handles public amenities, parks, and recreational spaces.",
    keyProjects: ["Public Park Renovation"],
    icon: "🏢",
    borderColor: "border-l-blue-400"
  },
  {
    id: 5,
    name: "Beautification",
    head: "Meera Joshi",
    teamSize: 5,
    projects: 1,
    description: "Works on city beautification, landscaping, and public art.",
    keyProjects: ["Eastern Express Highway Beautification"],
    icon: "🌺",
    borderColor: "border-l-blue-400"
  },
  {
    id: 6,
    name: "Aviation Infrastructure",
    head: "Sunita Rao",
    teamSize: 6,
    projects: 1,
    description: "Manages airport and expressway infrastructure projects.",
    keyProjects: ["Airport Expressway Upgrade"],
    icon: "✈️",
    borderColor: "border-l-blue-400"
  },
  {
    id: 7,
    name: "IT & Corridors",
    head: "Ravi Teja",
    teamSize: 8,
    projects: 1,
    description: "Supports IT infrastructure and corridor development.",
    keyProjects: ["IT Corridor Phase 2"],
    icon: "💻",
    borderColor: "border-l-blue-400"
  }
];

export default function DepartmentsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Building className="w-8 h-8 text-blue-600" />
          Departments
        </h1>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <DepartmentCard key={dept.id} department={dept} />
        ))}
      </div>
    </div>
  );
}

function DepartmentCard({ department }: { department: typeof departments[0] }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${department.borderColor} p-6 hover:shadow-md transition-shadow`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <span className="text-xl">{department.icon}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{department.name}</h2>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {department.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4 text-blue-500" />
          <span className="font-medium">Head:</span> {department.head}
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-green-500" />
          <span className="font-medium">Team:</span> {department.teamSize}
        </div>
        <div className="flex items-center gap-1">
          <FolderKanban className="w-4 h-4 text-purple-500" />
          <span className="font-medium">Projects:</span> {department.projects}
        </div>
      </div>

      {/* Key Projects */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Projects:</h4>
        <ul className="text-sm text-gray-600">
          {department.keyProjects.map((project, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              {project}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
