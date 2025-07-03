import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { hashPassword, validatePassword } from '@/lib/auth'

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json()
    const { userType, email, userId, password, department } = body

    // Validate required fields based on user type
    const validationErrors = []
    
    if (!userType || !['officer', 'civilian'].includes(userType)) {
      validationErrors.push('Valid user type is required (officer or civilian)')
    }
    
    if (!password) {
      validationErrors.push('Password is required')
    } else {
      // Validate password strength
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        validationErrors.push(...passwordValidation.errors)
      }
    }
    
    // User type specific validations
    if (userType === 'officer') {
      if (!email || !email.includes('@')) {
        validationErrors.push('Valid email is required for officers')
      }
      if (!department) {
        validationErrors.push('Department is required for officers')
      }
    } else if (userType === 'civilian') {
      if (!userId || userId.length < 3) {
        validationErrors.push('User ID must be at least 3 characters for civilians')
      }
    }
    
    // Return validation errors if any
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationErrors 
        },
        { status: 400 }
      )
    }

    // Connect to database
    const client = await clientPromise
    const db = client.db('urbanlink')
    const users = db.collection('users')
    
    // Check if user already exists
    let existingUser
    if (userType === 'officer') {
      existingUser = await users.findOne({ 
        email: email.toLowerCase(),
        userType: 'officer' 
      })
      if (existingUser) {
        return NextResponse.json(
          { error: 'An officer with this email already exists' },
          { status: 409 } // Conflict status code
        )
      }
    } else {
      existingUser = await users.findOne({ 
        userId: userId.toLowerCase(),
        userType: 'civilian' 
      })
      if (existingUser) {
        return NextResponse.json(
          { error: 'A civilian with this user ID already exists' },
          { status: 409 }
        )
      }
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password)
    
    // Create user document
    const newUser = {
      userType,
      email: userType === 'officer' ? email.toLowerCase() : null,
      userId: userType === 'civilian' ? userId.toLowerCase() : null,
      password: hashedPassword,
      department: userType === 'officer' ? department : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    }
    
    // Insert user into database
    const result = await users.insertOne(newUser)
    
    // Return success response (never include password!)
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: result.insertedId.toString(),
          userType: newUser.userType,
          email: newUser.email,
          userId: newUser.userId,
          department: newUser.department
        }
      },
      { status: 201 } // Created status code
    )
    
  } catch (error) {
    console.error('Registration error:', error)
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}