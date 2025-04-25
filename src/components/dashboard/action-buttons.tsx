import { CalendarPlus, FileEdit, MessageSquarePlus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ActionButtons() {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Create Project
      </Button>
      <Button variant="outline" className="gap-2">
        <CalendarPlus className="h-4 w-4" />
        Schedule Meeting
      </Button>
      <Button variant="outline" className="gap-2">
        <FileEdit className="h-4 w-4" />
        Add Resource
      </Button>
      <Button variant="outline" className="gap-2">
        <MessageSquarePlus className="h-4 w-4" />
        Post Update
      </Button>
    </div>
  )
}
