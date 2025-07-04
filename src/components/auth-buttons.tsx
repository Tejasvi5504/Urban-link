"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function AuthButtons() {
  const router = useRouter()

  const handleLogin = () => {
    // Redirect directly to dashboard for now (no authentication)
    router.push("/dashboard")
  }

  const handleRegister = () => {
    // Redirect directly to dashboard for now (no authentication)
    router.push("/dashboard")
  }

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        className="border-[#004B8D] text-[#004B8D] hover:bg-[#004B8D] hover:text-white"
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button 
        className="bg-[#FFA500] hover:bg-[#FFA500]/90 text-white"
        onClick={handleRegister}
      >
        Register
      </Button>
    </div>
  )
} 