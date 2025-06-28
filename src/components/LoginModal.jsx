"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Building2, Eye, EyeOff, X, Briefcase, User } from "lucide-react"

const departments = [
  "Water Supply",
  "Sanitation",
  "Public Works",
  "Electricity",
  "Transport",
  "Health",
  "Education",
  "Fire Department",
  "Police",
  "Parks & Recreation"
]

export default function LoginModal({ isHidden, setIsHidden }) {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState("officer") // "officer" or "civilian"
  const [department, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleClose = () => {
    setIsHidden(true)
    setDepartment("")
    setEmail("")
    setUserId("")
    setPassword("")
    setError("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      if (userType === "officer") {
        // Replace with your real officer authentication logic
        if (email === "officer@gmail.com" && password === "1234" && department === "Water Supply") {
          setIsHidden(true)
          router.push("/dashboard")
        } else {
          setError("All officer fields are required.")
        }
      } else {
        // Civilian login
        if (userId && password) {
          setIsHidden(true)
          router.push("/dashboard")
        } else {
          setError("User ID and password are required.")
        }
      }
    } catch (err) {
      setError("Something went wrong. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      if (userType === "officer") {
        if (department && email && password) {
          setIsHidden(true)
          router.push("/dashboard")
        } else {
          setError("All officer fields are required.")
        }
      } else {
        if (userId && password) {
          setIsHidden(true)
          router.push("/dashboard")
        } else {
          setError("User ID and password are required.")
        }
      }
    } catch (err) {
      setError("Registration failed. Try again.")
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
            <h2 className="text-2xl font-bold text-gray-700 mb-1">
              {isLogin ? "Login" : "Register"}
            </h2>
            <p className="text-gray-600">
              {isLogin ? "Please enter your details to login" : "Fill in the details to register"}
            </p>
          </div>
          
           {/* User Type Toggle */}
          <div className="flex justify-center mb-4 gap-4">
            <button
              className={`px-4 py-2 rounded-lg border ${userType === "officer" ? "bg-[#4B8DCC] text-white" : "bg-white text-[#4B8DCC] border-[#4B8DCC]"}`}
              onClick={() => { setUserType("officer"); setError(""); }}
              type="button"
            >
              Officer
            </button>
            <button
              className={`px-4 py-2 rounded-lg border ${userType === "civilian" ? "bg-[#4B8DCC] text-white" : "bg-white text-[#4B8DCC] border-[#4B8DCC]"}`}
              onClick={() => { setUserType("civilian"); setError(""); }}
              type="button"
            >
              Civilian
            </button>
          </div>


          {/* Login/Register Form */}
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
            {userType === "officer" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <div className="relative">
                  <Briefcase className="w-5 h-5 text-gray-700 absolute left-3 top-3" />
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white/90 focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D]"
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {userType === "officer" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-700 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white/90 focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] placeholder:text-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">User ID</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-700 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white/90 focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] placeholder:text-gray-400"
                    placeholder="Enter your User ID"
                    required
                  />
                </div>
              </div>
            )}
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
              {isLoading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "Login" : "Register")}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded bg-red-100 border border-red-400 text-red-700">
              <p className="text-center">{error}</p>
            </div>
          )}

          {/* Toggle Login/Register */}
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-[#4B8DCC] hover:underline"
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
              }}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    )
  )
}
