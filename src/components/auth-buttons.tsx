"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/authContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export function AuthButtons() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogin = () => {
    // This will open the login modal instead of redirecting
    // The LoginModal component handles JWT authentication
    const loginModal = document.querySelector('[data-login-modal]') as HTMLElement
    if (loginModal) {
      loginModal.click()
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (isAuthenticated && user) {
    const firstName = user.name?.split(' ')[0] || "User"
    const lastName = user.name?.split(' ')[1] || ""
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{user.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        className="border-[#004B8D] text-[#004B8D] hover:bg-[#004B8D] hover:text-white"
        onClick={handleLogin}
        data-login-modal-trigger
      >
        Login
      </Button>
      <Button 
        className="bg-[#FFA500] hover:bg-[#FFA500]/90 text-white"
        onClick={handleLogin}
      >
        Register
      </Button>
    </div>
  )
} 