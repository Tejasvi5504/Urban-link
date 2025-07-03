"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/authContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  Users, 
  UserCheck, 
  UserX, 
  Trash2, 
  Shield, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react"
import { formatRole } from "@/lib/roles"

export function RoleBasedAccessControl() {
  const [officers, setOfficers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)
  const { user, getToken } = useAuth()

  useEffect(() => {
    fetchOfficers()
  }, [])

  const fetchOfficers = async () => {
    try {
      const token = getToken()
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setOfficers(data.officers || [])
      } else {
        console.error('Failed to fetch officers')
      }
    } catch (error) {
      console.error('Error fetching officers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (action, userId) => {
    setActionLoading(userId)
    
    try {
      const token = getToken()
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, userId })
      })

      if (response.ok) {
        const data = await response.json()
        // Refresh the list
        await fetchOfficers()
        // Show success message (you can add a toast here)
        console.log(data.message)
      } else {
        const error = await response.json()
        console.error('Action failed:', error.error)
      }
    } catch (error) {
      console.error('Error performing action:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (officer) => {
    if (!officer.isApproved) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
        <Clock className="w-3 h-3 mr-1" />
        Pending Approval
      </Badge>
    }
    
    if (!officer.isActive) {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    }
    
    return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
      <CheckCircle className="w-3 h-3 mr-1" />
      Active
    </Badge>
  }

  const getActionButtons = (officer) => {
    const isLoading = actionLoading === officer.id
    
    return (
      <div className="flex gap-2">
        {!officer.isApproved && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction('approve', officer.id)}
            disabled={isLoading}
            className="text-green-600 border-green-200 hover:bg-green-50"
          >
            <UserCheck className="w-4 h-4 mr-1" />
            Approve
          </Button>
        )}
        
        {officer.isApproved && (
          <>
            {officer.isActive ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction('deactivate', officer.id)}
                disabled={isLoading}
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <UserX className="w-4 h-4 mr-1" />
                Deactivate
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction('activate', officer.id)}
                disabled={isLoading}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <UserCheck className="w-4 h-4 mr-1" />
                Activate
              </Button>
            )}
          </>
        )}
        
        {user?.role === 'admin' && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                disabled={isLoading}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Delete User
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {officer.email}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleAction('delete', officer.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Role-Based Access Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading officers...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Role-Based Access Control
        </CardTitle>
        <p className="text-sm text-gray-600">
          Manage officers in your department - {user?.department}
        </p>
      </CardHeader>
      <CardContent>
        {officers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No officers found</h3>
            <p className="text-gray-500">There are no officers in your department to manage.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officers.map((officer) => (
                  <TableRow key={officer.id}>
                    <TableCell className="font-medium">{officer.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {formatRole(officer.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(officer)}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(officer.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getActionButtons(officer)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
