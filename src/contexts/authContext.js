"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus()
  }, [])

  /**
   * Checks if user is authenticated by verifying stored token
   */
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true)
      
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        setIsLoading(false)
        return
      }

      // Verify token with server
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setIsAuthenticated(true)
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Auth status check failed:', error)
      // Clear potentially corrupted data
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logs in a user with provided credentials
   * @param {Object} credentials - Login credentials
   * @returns {Object} - Result object with success status and error message
   */
  const login = async (credentials) => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userData', JSON.stringify(data.user))
        
        setUser(data.user)
        setIsAuthenticated(true)
        
        return { success: true }
      } else {
        return { 
          success: false, 
          error: data.error || 'Login failed' 
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Registers a new user
   * @param {Object} userData - Registration data
   * @returns {Object} - Result object with success status and error message
   */
  const register = async (userData) => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (response.ok) {
        return { 
          success: true, 
          message: 'Registration successful! Please login with your credentials.' 
        }
      } else {
        return { 
          success: false, 
          error: data.error || 'Registration failed',
          details: data.details || []
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logs out the current user
   */
  const logout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      
      // Reset state
      setUser(null)
      setIsAuthenticated(false)
      
      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  /**
   * Gets the current authentication token
   * @returns {String|null} - Auth token or null
   */
  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    getToken,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use authentication context
 * @returns {Object} - Authentication context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}