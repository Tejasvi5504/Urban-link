"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { getDisplayName, getFullRoleDescription } from "@/lib/roles";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get user display information
  const fullName = user ? getDisplayName(user) : "User";
  const userRole = user ? getFullRoleDescription(user) : "Urban Officer";

  // Show the blue gradient sidebar only when user is logged in, not loading, and not on sign-in/sign-up pages
  const showSidebar = mounted && user && !isLoading && !pathname.startsWith("/sign-in") && !pathname.startsWith("/sign-up");

  // Show loading spinner while authentication is being checked, but only on dashboard pages
  if (!mounted || (isLoading && pathname.startsWith("/dashboard"))) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading Urban-Link...</p>
          <p className="mt-2 text-sm text-gray-500">Please wait while we prepare your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
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
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        showSidebar ? (sidebarCollapsed ? "ml-20" : "ml-64") : ""
      }`}>
        {children}
      </div>
    </div>
  );
}