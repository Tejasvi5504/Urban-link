import { NextResponse } from 'next/server'
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request) {
  try {
    // Extract token from Authorization header
    const token = extractTokenFromHeader(request)
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }
    
    // Verify token
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }
    
    // Optional: Verify user still exists and is active
    const client = await clientPromise
    const db = client.db('urbanlink')
    const users = db.collection('users')
    
    const user = await users.findOne({
      _id: new ObjectId(decoded.userId),
      isActive: true
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      )
    }
    
    // Return user info (without password)
    return NextResponse.json({
      valid: true,
      user: {
        id: user._id.toString(),
        userType: user.userType,
        email: user.email,
        userId: user.userId,
        department: user.department
      }
    })
    
  } catch (error) {
    console.error('Token verification error:', error)
    
    return NextResponse.json(
      { error: 'Token verification failed' },
      { status: 500 }
    )
  }
}