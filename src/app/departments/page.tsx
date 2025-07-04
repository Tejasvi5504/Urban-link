"use client";
import { useState } from "react";
import Link from "next/link";
import {
	BarChart3,
	Bell,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Layers,
	LogOut,
	MapPin,
	Menu,
	MessageSquare,
	Moon,
	Settings,
	Sun,
	Users,
	User as UserIcon, // <-- Rename here
	FolderKanban,
	Home,
	Building2,
} from "lucide-react";

const departments = [
	{
		name: "Urban Transport",
		head: "Rajesh Kumar",
		teamSize: 12,
		projects: ["Metro Line Extension"],
		description:
			"Responsible for planning, development, and maintenance of urban transport infrastructure.",
	},
	{
		name: "Urban Planning",
		head: "Priya Singh",
		teamSize: 9,
		projects: ["Smart Traffic System", "Ring Road Expansion"],
		description: "Focuses on city planning, zoning, and sustainable urban growth.",
	},
	{
		name: "Renewable Energy",
		head: "Vikram Mehta",
		teamSize: 7,
		projects: ["Solar Park Installation"],
		description: "Leads the adoption and implementation of renewable energy projects.",
	},
	{
		name: "Public Works",
		head: "Anita Desai",
		teamSize: 10,
		projects: ["Public Park Renovation"],
		description: "Handles public amenities, parks, and recreational spaces.",
	},
	{
		name: "Beautification",
		head: "Meera Joshi",
		teamSize: 5,
		projects: ["Eastern Express Highway Beautification"],
		description: "Works on city beautification, landscaping, and public art.",
	},
	{
		name: "Aviation Infrastructure",
		head: "Sunita Rao",
		teamSize: 6,
		projects: ["Airport Expressway Upgrade"],
		description: "Manages airport and expressway infrastructure projects.",
	},
	{
		name: "IT & Corridors",
		head: "Ravi Teja",
		teamSize: 8,
		projects: ["IT Corridor Flyover"],
		description: "Supports IT infrastructure and corridor development.",
	},
];

export default function DepartmentsPage() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	// Placeholder user
	const user = {
		firstName: "Paras",
		lastName: "Saini",
		role: "Urban Planning Officer",
	};
	const fullName = `${user.firstName} ${user.lastName}`;

	return (
		<div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
			{/* Sidebar */}
			<aside
				className={`fixed z-30 inset-y-0 left-0 ${
					sidebarCollapsed ? "w-20" : "w-64"
				} bg-gradient-to-b from-blue-950 via-blue-800 to-blue-700 text-white shadow-2xl flex flex-col transition-all duration-200 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 border-r border-blue-900`}
			>
				<div className="flex items-center h-20 px-4 border-b border-blue-900 bg-blue-950/80">
					{!sidebarCollapsed && (
						<div>
							<span className="font-extrabold text-2xl tracking-wide text-white block leading-tight">
								URBAN
								<span className="text-yellow-400">LINK</span>
							</span>
							<span className="text-xs bg-yellow-400 text-blue-900 font-bold px-2 py-0.5 rounded-full mt-1 inline-block shadow-sm">
								GOVT. PORTAL
							</span>
						</div>
					)}
					<button
						className="ml-auto md:hidden"
						onClick={() => setSidebarOpen(false)}
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
				</div>
				<nav className="flex-1 px-2 py-6 space-y-4 overflow-y-auto">
					<div>
						<div className="mb-2 text-xs uppercase tracking-widest text-blue-200 font-semibold pl-2">
							Main
						</div>
						<SidebarLink
							href="/dashboard"
							icon={<Home />}
							label="Dashboard"
							collapsed={sidebarCollapsed}
						/>
						<SidebarLink
							href="/projects"
							icon={<BarChart3 />}
							label="Projects"
							collapsed={sidebarCollapsed}
						/>
						<SidebarLink
							href="/departments"
							icon={<Users />}
							label="Departments"
							active
							collapsed={sidebarCollapsed}
						/>
					</div>
					<div>
						<div className="mb-2 text-xs uppercase tracking-widest text-blue-200 font-semibold pl-2">
							Collaboration
						</div>
						<SidebarLink
							href="/map"
							icon={<MapPin />}
							label="Map"
							collapsed={sidebarCollapsed}
						/>
						<SidebarLink
							href="/settings"
							icon={<Settings />}
							label="Settings"
							collapsed={sidebarCollapsed}
						/>
						<SidebarLink
							href="/logout"
							icon={<LogOut />}
							label="Logout"
							collapsed={sidebarCollapsed}
						/>
					</div>
				</nav>
				<div className="border-t border-blue-900 px-2 py-4 flex items-center justify-between">
					{!sidebarCollapsed && (
						<div className="flex items-center gap-2">
							<img
								src="/avatar.png"
								alt="User"
								className="w-8 h-8 rounded-full border-2 border-blue-800"
							/>
							<div>
								<div className="font-semibold text-sm">{fullName}</div>
								<div className="text-xs text-blue-200">{user.role}</div>
							</div>
						</div>
					)}
					<button
						className="bg-blue-800 rounded-full p-1 shadow hover:bg-blue-600 transition-colors ml-auto"
						onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
						aria-label="Toggle sidebar"
					>
						{sidebarCollapsed ? (
							<ChevronRight className="w-5 h-5 text-white" />
						) : (
							<ChevronLeft className="w-5 h-5 text-white" />
						)}
					</button>
				</div>
			</aside>

			{/* Overlay for mobile sidebar */}
			<div
				className={`fixed inset-0 z-20 bg-black bg-opacity-30 transition-opacity md:hidden ${
					sidebarOpen ? "block" : "hidden"
				}`}
				onClick={() => setSidebarOpen(false)}
			/>

			{/* Main Content */}
			<main
				className={`flex-1 p-6 md:p-12 transition-all duration-200 ${
					sidebarCollapsed ? "md:ml-20" : "md:ml-64"
				}`}
			>
				<button
					className="md:hidden mb-4"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<Menu className="w-6 h-6" />
				</button>
				<h1 className="text-3xl font-bold text-blue-900 dark:text-white flex items-center gap-2 mb-8">
					<Building2 className="w-8 h-8 text-blue-700 dark:text-blue-300" />
					Departments
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{departments.map((dept) => (
						<div
							key={dept.name}
							className="rounded-2xl shadow-lg bg-white dark:bg-gray-900 border-l-8 border-blue-300 transition p-6 flex flex-col gap-3 hover:scale-[1.02] hover:shadow-xl duration-200"
						>
							<div className="flex items-center gap-3 mb-2">
								<Layers className="w-7 h-7 text-blue-600" />
								<span className="text-xl font-bold text-blue-900 dark:text-white">
									{dept.name}
								</span>
							</div>
							<div className="text-gray-700 dark:text-gray-200 mb-2">
								{dept.description}
							</div>
							<div className="flex flex-wrap gap-4 text-sm">
								<span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
									<UserIcon className="w-4 h-4 text-blue-400" /> <b>Head:</b> {dept.head}
								</span>
								<span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
									<Users className="w-4 h-4 text-green-400" /> <b>Team:</b>{" "}
									{dept.teamSize}
								</span>
								<span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
									<BarChart3 className="w-4 h-4 text-purple-400" />{" "}
									<b>Projects:</b> {dept.projects.length}
								</span>
							</div>
							<div className="mt-2">
								<span className="font-semibold text-gray-600 dark:text-gray-300">
									Key Projects:
								</span>
								<ul className="list-disc ml-6 text-gray-700 dark:text-gray-200">
									{dept.projects.map((proj) => (
										<li key={proj}>{proj}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

// Sidebar link component
function SidebarLink({
	href,
	icon,
	label,
	active,
	collapsed,
}: {
	href: string;
	icon: React.ReactNode;
	label: string;
	active?: boolean;
	collapsed?: boolean;
}) {
	return (
		<Link
			href={href}
			className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 transition-colors font-medium ${
				active ? "bg-blue-400 text-blue-900" : ""
			} ${collapsed ? "justify-center" : ""}`}
		>
			<span className="w-6 h-6">{icon}</span>
			{!collapsed && <span>{label}</span>}
		</Link>
	);
}