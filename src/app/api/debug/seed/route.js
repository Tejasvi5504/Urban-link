import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { hashPassword } from '@/lib/auth'

export async function POST(request) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Seeding is only available in development mode' },
        { status: 403 }
      )
    }

    const client = await clientPromise
    const db = client.db('urbanlink')
    const users = db.collection('users')

    // Clear existing users (optional)
    await users.deleteMany({})

    // Hash password for all test users
    const hashedPassword = await hashPassword('test123')

    // Sample users with different roles
    const sampleUsers = [
      {
        userType: 'officer',
        email: 'admin@waterworks.gov',
        password: hashedPassword,
        department: 'Water Supply',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isApproved: true,
        approvedBy: null,
        approvedAt: new Date()
      },
      {
        userType: 'officer',
        email: 'head@planning.gov',
        password: hashedPassword,
        department: 'Public Works',
        role: 'dept_head',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isApproved: true,
        approvedBy: null,
        approvedAt: new Date()
      },
      {
        userType: 'officer',
        email: 'engineer@transport.gov',
        password: hashedPassword,
        department: 'Transport',
        role: 'engineer',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: false,
        isApproved: false,
        approvedBy: null,
        approvedAt: null
      },
      {
        userType: 'officer',
        email: 'officer@health.gov',
        password: hashedPassword,
        department: 'Health',
        role: 'officer',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: false,
        isApproved: false,
        approvedBy: null,
        approvedAt: null
      },
      {
        userType: 'officer',
        email: 'pending@waterworks.gov',
        password: hashedPassword,
        department: 'Water Supply',
        role: 'engineer',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: false,
        isApproved: false,
        approvedBy: null,
        approvedAt: null
      },
      {
        userType: 'officer',
        email: 'admin@electricity.gov',
        password: hashedPassword,
        department: 'Electricity',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isApproved: true,
        approvedBy: null,
        approvedAt: new Date()
      },
      {
        userType: 'civilian',
        userId: 'citizen123',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isApproved: true,
        approvedBy: null,
        approvedAt: new Date()
      },
      {
        userType: 'civilian',
        userId: 'resident456',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isApproved: true,
        approvedBy: null,
        approvedAt: new Date()
      }
    ]

    // Insert sample users
    const result = await users.insertMany(sampleUsers)

    return NextResponse.json({
      message: 'Database seeded successfully',
      insertedCount: result.insertedCount,
      users: sampleUsers.map(user => ({
        userType: user.userType,
        email: user.email,
        userId: user.userId,
        department: user.department,
        role: user.role
      }))
    })

  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: 'Seeding failed. Please try again.' },
      { status: 500 }
    )
  }
}
