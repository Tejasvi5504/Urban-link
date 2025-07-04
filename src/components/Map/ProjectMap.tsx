import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Example road coordinates (replace with real ones as needed)
const roadCoordinates: Record<string, [number, number][]> = {
  "Ring Road": [
    [28.6139, 77.209], // Connaught Place
    [28.6518, 77.2219], // Kashmere Gate
    [28.6096, 77.2430], // Lajpat Nagar
    [28.6139, 77.209], // Back to Connaught Place
  ],
  "Airport Expressway": [
    [28.5562, 77.1000], // IGI Airport
    [28.5796, 77.1122], // Mahipalpur
    [28.6139, 77.209],  // Connaught Place
  ],
  "Hitech City Road": [
    [17.4448, 78.3498], // Hitech City
    [17.4500, 78.3800], // Mindspace
    [17.4250, 78.4500], // Gachibowli
  ],
  "Eastern Express Highway": [
    [19.1860, 72.9781], // Mulund
    [19.1140, 72.9080], // Sion
    [18.9900, 72.8258], // Chembur
  ],
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

type Project = {
  name: string;
  id: string;
  status: string;
  city: string;
  lat: number;
  lng: number;
  road?: string;
};

type ProjectMapProps = {
  projects: Project[];
};

const ProjectMap: React.FC<ProjectMapProps> = ({ projects }) => {
  // Find the first completed project, or fallback to the first project
  const completed = projects.find(p => p.status === "Completed") || projects[0];
  const center = completed ? [completed.lat, completed.lng] : [22.9734, 78.6569];
  const zoom = completed ? 11 : 5;

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true} // <-- This enables mouse wheel zoom
      className="rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={markerIcon}>
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
            <div>
              <div className="font-bold">{p.name}</div>
              <div className="text-xs">{p.city} ({p.status})</div>
              <div className="text-xs text-gray-400">{p.id}</div>
            </div>
          </Tooltip>
        </Marker>
      ))}
      {/* Highlight roads for projects with a road property */}
      {projects
        .filter(p => p.road && roadCoordinates[p.road])
        .map(p => (
          <Polyline
            key={p.road}
            positions={roadCoordinates[p.road]}
            pathOptions={{ color: "red", weight: 5, opacity: 0.7 }}
          />
        ))}
    </MapContainer>
  );
};

export default ProjectMap;

