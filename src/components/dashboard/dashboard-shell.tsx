"use client"

import type { ReactNode } from "react"
import { Topbar } from "@/components/dashboard/topbar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Topbar />
        <div className="flex flex-1">
          <DashboardSidebar />
          <SidebarInset>
            <main className="flex-1 overflow-y-auto p-6">
              <div className="mx-auto max-w-7xl space-y-6">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
