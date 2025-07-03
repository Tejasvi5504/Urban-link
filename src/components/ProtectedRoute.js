"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  redirectTo = "/" 
}) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
        return
      }
      
      if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.userType)) {
        router.push('/unauthorized')
        return
      }
    }
  }, [isAuthenticated, user, isLoading, router, allowedRoles, redirectTo])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004B8D]"></div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null
  }

  // Show unauthorized message if role doesn't match
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.userType)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return children
}