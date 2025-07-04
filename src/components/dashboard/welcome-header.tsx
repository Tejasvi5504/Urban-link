import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface WelcomeHeaderProps {
  name: string
  role: string
}

export function WelcomeHeader({ name, role }: WelcomeHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Welcome back, {name} 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            {role} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 rounded-full bg-muted pl-8 focus-visible:ring-1"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-600" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
