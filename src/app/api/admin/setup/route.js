/**
 * Admin Setup Utility
 * This script helps create the first admin user for the Urban-Link system
 */

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { hashPassword } from '@/lib/auth'

export async function POST(request) {
  try {
    const body = await request.json()
    const { adminId, password, email, department, secretKey } = body
    
    // Security check - only allow admin creation with secret key
    const ADMIN_SETUP_SECRET = process.env.ADMIN_SETUP_SECRET || "urban-link-admin-2025"
    
    if (secretKey !== ADMIN_SETUP_SECRET) {
      return NextResponse.json(
        { error: 'Invalid setup secret key' },
        { status: 403 }
      )
    }
    
    // Connect to database
    const client = await clientPromise
    const db = client.db('urbanlink')
    const users = db.collection('users')
    
    // Check if any admin already exists
    const existingAdmin = await users.findOne({ role: 'admin' })
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists. Only one admin can be created.' },
        { status: 409 }
      )
    }
    
    // Validate required fields
    if (!adminId || !password || !email || !department) {
      return NextResponse.json(
        { error: 'Admin ID, password, email, and department are required' },
        { status: 400 }
      )
    }
    
    // Check if user with this email or adminId already exists
    const existingUser = await users.findOne({
      $or: [
        { email: email.toLowerCase() },
        { userId: adminId.toLowerCase() }
      ]
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or admin ID already exists' },
        { status: 409 }
      )
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password)
    
    // Create admin user
    const adminUser = {
      userId: adminId.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      userType: 'officer',
      role: 'admin',
      department: department,
      isActive: true,
      isApproved: true,
      createdAt: new Date(),
      createdBy: 'system',
      lastLoginAt: null,
      permissions: [
        'CREATE_USERS',
        'DELETE_USERS',
        'MANAGE_DEPARTMENTS',
        'MANAGE_PROJECTS',
        'MANAGE_SYSTEM_SETTINGS',
        'VIEW_ALL_DATA',
        'APPROVE_USERS'
      ]
    }
    
    // Insert admin user
    const result = await users.insertOne(adminUser)
    
    return NextResponse.json({
      message: 'Admin user created successfully',
      adminId: adminId,
      email: email,
      department: department,
      userId: result.insertedId.toString()
    })
    
  } catch (error) {
    console.error('Admin setup error:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
}

// GET method to check if admin exists
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('urbanlink')
    const users = db.collection('users')
    
    const adminExists = await users.findOne({ role: 'admin' })
    
    return NextResponse.json({
      adminExists: !!adminExists,
      setupRequired: !adminExists
    })
    
  } catch (error) {
    console.error('Admin check error:', error)
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    )
  }
}
