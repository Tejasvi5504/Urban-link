"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Building2, Eye, EyeOff, X } from "lucide-react"

export default function LoginModal({ isHidden, setIsHidden }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleClose = () => {
    setIsHidden(true)
    // Reset form state when closing
    setUsername("")
    setPassword("")
    setError("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Check credentials immediately
      if (username === "officer" && password === "urban123") {
        // Hide modal and redirect in sequence
        setIsHidden(true)
        // Use push to maintain navigation history
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
        <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-lg p-6">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-[#4B8DCC]" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-lg-left">
                <span className="text-[#4B8DCC] text-2xl font-bold">Urban Link</span>
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-1">Welcome</h2>
            <p className="text-gray-600">Please enter Username & password</p>
          </div>

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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white/90 focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] placeholder:text-gray-400"
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white/90 focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] placeholder:text-gray-400"
                  placeholder="Enter the Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4B8DCC] text-white py-2 px-4 rounded-lg hover:bg-[#4B8DCC]/90 focus:ring-4 focus:ring-[#4B8DCC]/30 disabled:opacity-50"
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
