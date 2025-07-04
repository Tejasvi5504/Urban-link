"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fullName = "Paras Saini";
  const userRole = "Urban Planning Officer";
  const pathname = usePathname();

  // List of routes where you want the sidebar to show
  const showSidebar = pathname.startsWith("/dashboard") || pathname.startsWith("/projects");

  return (
    <div className="flex min-h-screen">
      {showSidebar && (
        <Sidebar
          fullName={fullName}
          userRole={userRole}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}
      {/* Remove the margin classes here */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-200">
        {children}
      </div>
    </div>
  );
}