"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/authContext"
import { useRouter } from "next/navigation"
import { Mail, Lock, Building2, Eye, EyeOff, X, Briefcase, User, AlertCircle, CheckCircle } from "lucide-react"

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

const roles = [
  { value: "admin", label: "Admin" },
  { value: "dept_head", label: "Department Head" },
  { value: "engineer", label: "Engineer" },
  { value: "officer", label: "Officer" }
]

export default function LoginModal({ isHidden, setIsHidden }) {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState("officer")
  const [department, setDepartment] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [validationErrors, setValidationErrors] = useState([])

  const { login, register, isLoading } = useAuth()
  const router = useRouter()

  const handleClose = () => {
    setIsHidden(true)
    resetForm()
  }

  const resetForm = () => {
    setDepartment("")
    setRole("")
    setEmail("")
    setUserId("")
    setPassword("")
    setError("")
    setSuccess("")
    setValidationErrors([])
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setValidationErrors([])

    const credentials = {
      userType,
      password,
      ...(userType === "officer" ? { email, department, role } : { userId })
    }

    const result = await login(credentials)
    
    if (result.success) {
      setSuccess("Login successful! Redirecting...")
      setTimeout(() => {
        setIsHidden(true)
        router.push("/dashboard")
      }, 1000)
    } else {
      setError(result.error)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setValidationErrors([])

    const userData = {
      userType,
      password,
      ...(userType === "officer" ? { email, department, role } : { userId })
    }

    const result = await register(userData)
    
    if (result.success) {
      setSuccess(result.message)
      setIsLogin(true)
      setPassword("") // Clear password for security
    } else {
      setError(result.error)
      if (result.details && result.details.length > 0) {
        setValidationErrors(result.details)
      }
    }
  }

  return (
    !isHidden && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
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
            <img src="/logo.png" alt="Urban Link Logo" className="h-12 w-12 mr-2" />
            <span className="text-[#004B8D] text-2xl font-bold">Urban Link</span>
          </div>

          {/* User Type Toggle */}
          <div className="flex justify-center mb-4 gap-4">
            <button
              className={`px-4 py-2 rounded-lg border transition-colors ${
                userType === "officer" 
                  ? "bg-[#004B8D] text-white border-[#004B8D]" 
                  : "bg-white text-[#004B8D] border-[#004B8D] hover:bg-gray-50"
              }`}
              onClick={() => { 
                setUserType("officer"); 
                resetForm(); 
              }}
              type="button"
            >
              Officer
            </button>
            <button
              className={`px-4 py-2 rounded-lg border transition-colors ${
                userType === "civilian" 
                  ? "bg-[#004B8D] text-white border-[#004B8D]" 
                  : "bg-white text-[#004B8D] border-[#004B8D] hover:bg-gray-50"
              }`}
              onClick={() => { 
                setUserType("civilian"); 
                resetForm(); 
              }}
              type="button"
            >
              Civilian
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-1">
              {isLogin ? "Login" : "Register"}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? "Please enter your details to login" 
                : "Fill in the details to register"
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {userType === "officer" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <div className="relative">
                    <Briefcase className="w-5 h-5 text-gray-700 absolute left-3 top-3" />
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] transition-colors"
                      required
                    >
                      <option value="">Select department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-700 absolute left-3 top-3" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] transition-colors"
                      required
                    >
                      <option value="">Select role</option>
                      {roles.map((roleOption) => (
                        <option key={roleOption.value} value={roleOption.value}>{roleOption.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] placeholder:text-gray-400 transition-colors"
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] placeholder:text-gray-400 transition-colors"
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
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white focus:ring-2 focus:ring-[#004B8D] focus:border-[#004B8D] placeholder:text-gray-400 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#004B8D] text-white py-2 px-4 rounded-lg hover:bg-[#004B8D]/90 focus:ring-4 focus:ring-[#004B8D]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isLogin ? "Logging in..." : "Registering..."}
                </div>
              ) : (
                isLogin ? "Login" : "Register"
              )}
            </button>
          </form>

          {/* Success Message */}
          {success && (
            <div className="mt-4 p-3 rounded-lg bg-green-100 border border-green-400 text-green-700 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Error Messages */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-100 border border-red-400 text-red-700 flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">{error}</p>
                {validationErrors.length > 0 && (
                  <ul className="mt-2 text-xs list-disc list-inside">
                    {validationErrors.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Toggle Login/Register */}
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-[#004B8D] hover:underline transition-all"
              onClick={() => {
                setIsLogin(!isLogin)
                resetForm()
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
