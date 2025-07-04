"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, FileText, Home, Layers, LogOut, MessageSquare, Settings, Users, Building2, MapPin, Target } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import React from "react"

export function DashboardSidebar() {
  const pathname = usePathname()

  const mainMenuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: Layers,
    },
  ]

  const planningMenuItems = [
    {
      title: "Urban Planning",
      href: "/planning",
      icon: Building2,
    },
    {
      title: "Resources",
      href: "/resources",
      icon: FileText,
    },
    {
      title: "Locations",
      href: "/locations",
      icon: MapPin,
    },
  ]

  const managementMenuItems = [
    {
      title: "Tasks",
      href: "/tasks",
      icon: BarChart3,
    },
    {
      title: "Meetings",
      href: "/meetings",
      icon: Calendar,
    },
    {
      title: "Goals",
      href: "/goals",
      icon: Target,
    },
  ]

  const communityMenuItems = [
    {
      title: "Forum",
      href: "/forum",
      icon: MessageSquare,
    },
    {
      title: "Training",
      href: "/training",
      icon: Users,
    },
  ]

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border/40 bg-gradient-to-b from-background to-background/80 backdrop-blur-xl">
      <SidebarHeader className="flex h-16 items-center px-4 border-b border-border/40">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
              <path d="M3 9h4" />
              <path d="M17 9h4" />
              <path d="M13 13v5" />
              <path d="M9 13v5" />
              <path d="M17 13v5" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">UrbanLink</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator className="opacity-50" />
      <SidebarContent className="px-2 py-4 space-y-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">Main</SidebarGroupLabel>
          <SidebarMenu>
            {mainMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href} 
                  tooltip={item.title}
                  className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-accent/50"
                >
                  <Link href={item.href} className="flex items-center gap-3 px-3 py-2.5">
                    <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="font-medium">{item.title}</span>
                    {pathname === item.href && (
                      <div className="absolute inset-0 bg-accent/50 rounded-lg" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Planning Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">Planning</SidebarGroupLabel>
          <SidebarMenu>
            {planningMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href} 
                  tooltip={item.title}
                  className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-accent/50"
                >
                  <Link href={item.href} className="flex items-center gap-3 px-3 py-2.5">
                    <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="font-medium">{item.title}</span>
                    {pathname === item.href && (
                      <div className="absolute inset-0 bg-accent/50 rounded-lg" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">Management</SidebarGroupLabel>
          <SidebarMenu>
            {managementMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href} 
                  tooltip={item.title}
                  className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-accent/50"
                >
                  <Link href={item.href} className="flex items-center gap-3 px-3 py-2.5">
                    <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="font-medium">{item.title}</span>
                    {pathname === item.href && (
                      <div className="absolute inset-0 bg-accent/50 rounded-lg" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Community Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">Community</SidebarGroupLabel>
          <SidebarMenu>
            {communityMenuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href} 
                  tooltip={item.title}
                  className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-accent/50"
                >
                  <Link href={item.href} className="flex items-center gap-3 px-3 py-2.5">
                    <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="font-medium">{item.title}</span>
                    {pathname === item.href && (
                      <div className="absolute inset-0 bg-accent/50 rounded-lg" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="opacity-50" />
      <SidebarFooter className="px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Settings"
              className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-accent/50"
            >
              <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5">
                <Settings className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Logout"
              className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-accent/50"
            >
              <button className="flex w-full items-center gap-3 px-3 py-2.5">
                <LogOut className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="font-medium">Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};
