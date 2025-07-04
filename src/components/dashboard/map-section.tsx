"use client"

import { LeafletMapComponent } from "./leaflet-map"

const projects = [
  {
    id: "1",
    name: "Metro Line Extension",
    location: {
      lat: 51.5074,
      lng: -0.1278
    },
    description: "Extension of the metro line to connect Sector 12 with the city center",
    status: "In Progress",
    department: "Transportation",
    timeline: "Q3 2024 - Q2 2025"
  },
  {
    id: "2",
    name: "Smart Traffic System",
    location: {
      lat: 51.5174,
      lng: -0.1378
    },
    description: "Implementation of AI-powered traffic management system in Central District",
    status: "Planning",
    department: "Smart City",
    timeline: "Q4 2024 - Q3 2025"
  },
  {
    id: "3",
    name: "Solar Park Installation",
    location: {
      lat: 51.5274,
      lng: -0.1478
    },
    description: "Large-scale solar park installation in the Outer Zone",
    status: "Completed",
    department: "Energy",
    timeline: "Q1 2024 - Q2 2024"
  },
  {
    id: "4",
    name: "Water Treatment Plant",
    location: {
      lat: 51.5374,
      lng: -0.1578
    },
    description: "Modern water treatment facility at River Front",
    status: "In Progress",
    department: "Water Resources",
    timeline: "Q2 2024 - Q1 2025"
  },
  {
    id: "5",
    name: "Public Park Renovation",
    location: {
      lat: 51.5474,
      lng: -0.1678
    },
    description: "Renovation and modernization of public park in Sector 5",
    status: "Planning",
    department: "Parks & Recreation",
    timeline: "Q3 2024 - Q2 2025"
  }
]

export function MapSection() {
  return <LeafletMapComponent projects={projects} />
}
