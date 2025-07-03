import bcrypt from 'bcryptjs'

/**
 * Hashes a plain text password
 * @param {String} password - Plain text password
 * @returns {String} - Hashed password
 */
export async function hashPassword(password) {
  // Salt rounds: higher = more secure but slower
  // 12 rounds is a good balance for 2024
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

/**
 * Compares plain text password with hashed password
 * @param {String} password - Plain text password
 * @param {String} hashedPassword - Previously hashed password
 * @returns {Boolean} - True if passwords match
 */
export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

/**
 * Validates password strength
 * @param {String} password - Password to validate
 * @returns {Object} - Validation result
 */
export function validatePassword(password) {
  const errors = []
  
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}