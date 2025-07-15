"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Lock, Mail, Building2, Key, CheckCircle, AlertTriangle } from "lucide-react"

export default function AdminSetupPage() {
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
    confirmPassword: "",
    email: "",
    department: "",
    secretKey: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [adminExists, setAdminExists] = useState(false)
  const [checking, setChecking] = useState(true)
  
  const router = useRouter()

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
    "Parks & Recreation",
    "Urban Planning",
    "IT Department"
  ]

  // Check if admin already exists
  useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/setup')
      const data = await response.json()
      
      if (response.ok) {
        setAdminExists(data.adminExists)
        if (data.adminExists) {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
    } finally {
      setChecking(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (!formData.adminId || !formData.email || !formData.department || !formData.secretKey) {
      setError("All fields are required")
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Admin user created successfully! You can now login.")
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        setError(data.error || 'Failed to create admin user')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking system status...</p>
        </div>
      </div>
    )
  }

  if (adminExists) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Already Exists</h1>
          <p className="text-gray-600 mb-6">The system has already been set up with an admin user.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Setup</h1>
          <p className="text-gray-600">Create the first admin user for Urban-Link</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Admin ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin ID
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="adminId"
                  value={formData.adminId}
                  onChange={handleChange}
                  placeholder="Enter admin ID (e.g., admin001)"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@urbanlink.gov"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <div className="relative">
                <Building2 className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter secure password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Setup Secret Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Setup Secret Key
              </label>
              <div className="relative">
                <Key className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="secretKey"
                  value={formData.secretKey}
                  onChange={handleChange}
                  placeholder="Enter setup secret key"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Contact your system administrator for the setup secret key
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success Display */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating Admin...' : 'Create Admin User'}
          </button>
        </form>

        {/* Setup Instructions */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Setup Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• This creates the first admin user for the system</li>
            <li>• Only one admin user can be created this way</li>
            <li>• Use a strong password with at least 8 characters</li>
            <li>• The secret key prevents unauthorized admin creation</li>
            <li>• Contact your system administrator if you need help</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
