import { ArrowUpDown, Calendar, CheckCircle2, Clock, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function TasksTable() {
  const tasks = [
    {
      id: "TASK-8782",
      title: "Review Sector 7 Infrastructure Plan",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-06-28",
      department: "Urban Planning",
    },
    {
      id: "TASK-7891",
      title: "Approve Water Supply Project Budget",
      status: "Pending",
      priority: "Medium",
      dueDate: "2023-06-30",
      department: "Water Resources",
    },
    {
      id: "TASK-6543",
      title: "Coordinate with Transport Department",
      status: "Completed",
      priority: "Medium",
      dueDate: "2023-06-25",
      department: "Urban Planning",
    },
    {
      id: "TASK-5432",
      title: "Finalize Smart City Proposal",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-07-05",
      department: "Smart City Cell",
    },
  ]

  const meetings = [
    {
      id: "MTG-3456",
      title: "Weekly Department Heads Meeting",
      date: "2023-06-29",
      time: "10:00 AM",
      location: "Conference Room A",
      attendees: 12,
    },
    {
      id: "MTG-2345",
      title: "Smart City Project Review",
      date: "2023-06-30",
      time: "02:00 PM",
      location: "Virtual Meeting",
      attendees: 8,
    },
    {
      id: "MTG-1234",
      title: "Budget Allocation Discussion",
      date: "2023-07-03",
      time: "11:30 AM",
      location: "Conference Room B",
      attendees: 5,
    },
  ]

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Upcoming Tasks & Meetings</CardTitle>
        </div>
        <Button variant="outline" size="sm" className="ml-auto gap-1">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tasks">
          <TabsList className="mb-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-6 border-b p-3 text-sm font-medium">
                <div className="col-span-3 flex items-center gap-2">
                  Task
                  <Button variant="ghost" size="icon" className="h-4 w-4">
                    <ArrowUpDown className="h-3 w-3" />
                    <span className="sr-only">Sort by task</span>
                  </Button>
                </div>
                <div>Status</div>
                <div>Priority</div>
                <div>Due Date</div>
              </div>
              {tasks.map((task) => (
                <div key={task.id} className="grid grid-cols-6 items-center p-3 text-sm">
                  <div className="col-span-3">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {task.id} • {task.department}
                    </div>
                  </div>
                  <div>
                    <Badge
                      variant={
                        task.status === "Completed"
                          ? "outline"
                          : task.status === "In Progress"
                            ? "secondary"
                            : "default"
                      }
                      className="flex w-fit items-center gap-1"
                    >
                      {task.status === "Completed" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : task.status === "In Progress" ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {task.status}
                    </Badge>
                  </div>
                  <div>
                    <Badge
                      variant="outline"
                      className={
                        task.priority === "High" ? "border-red-500 text-red-500" : "border-orange-500 text-orange-500"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="meetings" className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-4 border-b p-3 text-sm font-medium">
                <div className="col-span-2">Meeting</div>
                <div>Date & Time</div>
                <div>Location</div>
              </div>
              {meetings.map((meeting) => (
                <div key={meeting.id} className="grid grid-cols-4 items-center p-3 text-sm">
                  <div className="col-span-2">
                    <div className="font-medium">{meeting.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {meeting.id} • {meeting.attendees} attendees
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(meeting.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at {meeting.time}
                  </div>
                  <div>{meeting.location}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="calendar"
            className="min-h-[300px] flex items-center justify-center text-muted-foreground"
          >
            Calendar view will be implemented here
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
