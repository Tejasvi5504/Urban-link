import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set')
}

/**
 * Creates a JWT token with user data
 * @param {Object} payload - User data to encode in token
 * @returns {String} - Signed JWT token
 */
export function createToken(payload) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    { 
      expiresIn: '24h', // Token expires in 24 hours
      issuer: 'urbanlink', // Who issued the token
      audience: 'urbanlink-users' // Who can use the token
    }
  )
}

/**
 * Verifies and decodes a JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object|null} - Decoded payload or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'urbanlink',
      audience: 'urbanlink-users'
    })
  } catch (error) {
    console.error('JWT verification failed:', error.message)
    return null
  }
}

/**
 * Extracts token from Authorization header
 * @param {Request} request - Next.js request object
 * @returns {String|null} - Token or null if not found
 */
export function extractTokenFromHeader(request) {
  const authHeader = request.headers.get('authorization')
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7) // Remove 'Bearer ' prefix
  }
  
  return null
}