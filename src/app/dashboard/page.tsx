import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { TasksTable } from "@/components/dashboard/tasks-table"
import { WelcomeHeader } from "@/components/dashboard/welcome-header"
import { MapSection } from "@/components/dashboard/map-section"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { ActionButtons } from "@/components/dashboard/action-buttons"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <WelcomeHeader name="Officer Sharma" role="Urban Planning Officer" />
      <StatsCards />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <TasksTable />
        </div>
        <div className="col-span-1">
          <ActivityFeed />
        </div>
      </div>
      <MapSection />
      <ActionButtons />
    </DashboardShell>
  )
}
