import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt'
import { ObjectId } from 'mongodb'

export async function GET(request) {
  try {
    // Extract and verify token
    const token = extractTokenFromHeader(request)
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Check if user has admin or dept_head role
    if (!['admin', 'dept_head'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const client = await clientPromise
    const db = client.db('urbanlink')
    const users = db.collection('users')

    // Get all officers in the same department (except current user)
    const officers = await users.find({
      userType: 'officer',
      department: decoded.department,
      _id: { $ne: new ObjectId(decoded.userId) }
    }).project({
      password: 0 // Exclude password field
    }).toArray()

    return NextResponse.json({
      officers: officers.map(officer => ({
        id: officer._id.toString(),
        email: officer.email,
        role: officer.role,
        department: officer.department,
        isActive: officer.isActive,
        isApproved: officer.isApproved,
        createdAt: officer.createdAt,
        approvedBy: officer.approvedBy,
        approvedAt: officer.approvedAt
      }))
    })

  } catch (error) {
    console.error('User management GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    // Extract and verify token
    const token = extractTokenFromHeader(request)
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Check if user has admin or dept_head role
    if (!['admin', 'dept_head'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const body = await request.json()
    const { action, userId } = body

    if (!action || !userId) {
      return NextResponse.json({ error: 'Action and userId are required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('urbanlink')
    const users = db.collection('users')

    // Verify the target user is in the same department
    const targetUser = await users.findOne({
      _id: new ObjectId(userId),
      userType: 'officer',
      department: decoded.department
    })

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found or not in your department' }, { status: 404 })
    }

    // Prevent admin from modifying other admins unless they are admin themselves
    if (targetUser.role === 'admin' && decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Cannot modify admin users' }, { status: 403 })
    }

    let updateData = {}
    let message = ''

    switch (action) {
      case 'approve':
        updateData = {
          isApproved: true,
          isActive: true,
          approvedBy: decoded.userId,
          approvedAt: new Date()
        }
        message = 'User approved successfully'
        break

      case 'activate':
        updateData = { isActive: true }
        message = 'User activated successfully'
        break

      case 'deactivate':
        updateData = { isActive: false }
        message = 'User deactivated successfully'
        break

      case 'delete':
        // Only admins can delete users
        if (decoded.role !== 'admin') {
          return NextResponse.json({ error: 'Only admins can delete users' }, { status: 403 })
        }
        await users.deleteOne({ _id: new ObjectId(userId) })
        return NextResponse.json({ message: 'User deleted successfully' })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    // Update user
    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    )

    return NextResponse.json({ message })

  } catch (error) {
    console.error('User management POST error:', error)
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 })
  }
}
