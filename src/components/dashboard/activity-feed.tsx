import { FileText, MessageSquare, Upload, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "message",
      user: {
        name: "Rajesh Kumar",
        avatar: "/placeholder.svg?height=32&width=32",
        department: "Water Resources",
      },
      content: "Left a comment on Metro Line Extension project",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "file",
      user: {
        name: "Priya Singh",
        avatar: "/placeholder.svg?height=32&width=32",
        department: "Urban Planning",
      },
      content: "Uploaded revised plans for Smart Traffic System",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "update",
      user: {
        name: "Vikram Mehta",
        avatar: "/placeholder.svg?height=32&width=32",
        department: "Smart City Cell",
      },
      content: "Updated status of Solar Park Installation to Completed",
      time: "Yesterday",
    },
    {
      id: 4,
      type: "message",
      user: {
        name: "Anita Desai",
        avatar: "/placeholder.svg?height=32&width=32",
        department: "Finance",
      },
      content: "Approved budget for Water Treatment Plant",
      time: "Yesterday",
    },
    {
      id: 5,
      type: "file",
      user: {
        name: "Sanjay Patel",
        avatar: "/placeholder.svg?height=32&width=32",
        department: "Parks & Recreation",
      },
      content: "Shared Public Park Renovation timeline document",
      time: "2 days ago",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "file":
        return <Upload className="h-4 w-4" />
      case "update":
        return <FileText className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name}
                  <span className="ml-2 text-xs text-muted-foreground">{activity.user.department}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    {getActivityIcon(activity.type)}
                    {activity.content}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
