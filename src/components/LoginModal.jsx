"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Building2 } from "lucide-react"

export function LoginModal({ isHidden, setIsHidden }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock auth logic: check hardcoded credentials
      if (username === "officer" && password === "urban123") {
        // Hide modal
        setIsHidden(true)

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError("Invalid username or password.")
      }
    } catch (err) {
      console.error("Login failed:", err)
      setError("Something went wrong. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    !isHidden && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-lg p-8">
          <div
            className="absolute top-0 right-7 text-5xl rotate-45 cursor-pointer close hover:text-gray-700"
            onClick={() => setIsHidden(true)}
          >
            +
          </div>

          {/* Logo & Branding */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-20 h-20 flex items-center justify-center">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-lg-left">
                <span className="text-gray-700 text-3xl font-bold">Urban</span>{" "}
                <span className="text-primary text-3xl font-bold">Link</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Smart Collaboration for Smart Cities
              </p>
            </div>
          </div>

          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Welcome</h2>
          <p className="text-gray-600 mb-8">Please enter Username & password</p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-700 absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-700 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the Password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#004B8D] text-white py-2 px-4 rounded-lg hover:bg-[#004B8D]/90 focus:ring-4 focus:ring-[#004B8D]/30 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded bg-red-100 border border-red-400 text-red-700">
              <p className="text-center">{error}</p>
            </div>
          )}
        </div>
      </div>
    )
  )
}
