import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { comparePassword } from '@/lib/auth'
import { createToken } from '@/lib/jwt'

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json()
    const { userType, email, userId, password, department } = body
    
    // Validate required fields
    if (!userType || !password) {
      return NextResponse.json(
        { error: 'User type and password are required' },
        { status: 400 }
      )
    }
    
    if (userType === 'officer' && (!email || !department)) {
      return NextResponse.json(
        { error: 'Email and department are required for officers' },
        { status: 400 }
      )
    }
    
    if (userType === 'civilian' && !userId) {
      return NextResponse.json(
        { error: 'User ID is required for civilians' },
        { status: 400 }
      )
    }
    
    // Connect to database
    const client = await clientPromise
    const db = client.db('urbanlink')
    const users = db.collection('users')
    
    // Find user based on type and credentials
    let user
    if (userType === 'officer') {
      user = await users.findOne({ 
        email: email.toLowerCase(),
        department: department,
        userType: 'officer',
        isActive: true // Only active users can login
      })
    } else {
      user = await users.findOne({ 
        userId: userId.toLowerCase(),
        userType: 'civilian',
        isActive: true
      })
    }
    
    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 } // Unauthorized
      )
    }
    
    // Verify password
    const isPasswordValid = await comparePassword(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Create JWT token payload
    const tokenPayload = {
      userId: user._id.toString(),
      userType: user.userType,
      email: user.email,
      userId: user.userId,
      department: user.department,
      iat: Math.floor(Date.now() / 1000) // Issued at time
    }
    
    // Generate JWT token
    const token = createToken(tokenPayload)
    
    // Update user's last login time
    await users.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date() } }
    )
    
    // Return success response with token and user info
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        userType: user.userType,
        email: user.email,
        userId: user.userId,
        department: user.department,
        createdAt: user.createdAt
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}