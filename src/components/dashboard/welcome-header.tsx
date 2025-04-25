import { ModeToggle } from "@/components/mode-toggle"

interface WelcomeHeaderProps {
  name: string
  role: string
}

export function WelcomeHeader({ name, role }: WelcomeHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {name} 👋</h1>
        <p className="text-muted-foreground">{role} Dashboard</p>
      </div>
      <ModeToggle />
    </div>
  )
}
