"use client"

import { RoleBasedAccessControl } from "@/components/dashboard/role-based-access"
import { useAuth } from "@/contexts/authContext"
import { isDeptHeadOrHigher } from "@/lib/roles"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AccessControlPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if user doesn't have required role
    if (!isLoading && user && !isDeptHeadOrHigher(user)) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  // Show loading or redirect if not authorized
  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !isDeptHeadOrHigher(user)) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex-1 p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
          <p className="text-muted-foreground">
            Manage user access and permissions for your department
          </p>
        </div>
        
        <RoleBasedAccessControl />
      </div>
    </div>
  )
}
