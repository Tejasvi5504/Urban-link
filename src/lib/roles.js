/**
 * Role-based access control utilities
 */

// Role hierarchy levels (higher number = higher authority)
export const ROLE_LEVELS = {
  officer: 1,
  engineer: 2,
  dept_head: 3,
  admin: 4
}

// Role display names
export const ROLE_NAMES = {
  admin: "Administrator",
  dept_head: "Department Head", 
  engineer: "Engineer",
  officer: "Officer"
}

/**
 * Check if a user has a specific role
 * @param {Object} user - User object containing role
 * @param {string} requiredRole - Required role
 * @returns {boolean} - True if user has the role
 */
export function hasRole(user, requiredRole) {
  if (!user || !user.role) return false
  return user.role === requiredRole
}

/**
 * Check if a user has minimum role level (equal or higher authority)
 * @param {Object} user - User object containing role
 * @param {string} minimumRole - Minimum required role
 * @returns {boolean} - True if user meets minimum role requirement
 */
export function hasMinimumRole(user, minimumRole) {
  if (!user || !user.role) return false
  
  const userLevel = ROLE_LEVELS[user.role] || 0
  const requiredLevel = ROLE_LEVELS[minimumRole] || 0
  
  return userLevel >= requiredLevel
}

/**
 * Check if a user can access admin features
 * @param {Object} user - User object
 * @returns {boolean} - True if user is admin
 */
export function isAdmin(user) {
  return hasRole(user, 'admin')
}

/**
 * Check if a user can access department head features
 * @param {Object} user - User object
 * @returns {boolean} - True if user is dept head or higher
 */
export function isDeptHeadOrHigher(user) {
  return hasMinimumRole(user, 'dept_head')
}

/**
 * Check if a user can access engineer features
 * @param {Object} user - User object
 * @returns {boolean} - True if user is engineer or higher
 */
export function isEngineerOrHigher(user) {
  return hasMinimumRole(user, 'engineer')
}

/**
 * Get formatted role display name
 * @param {string} role - Role key
 * @returns {string} - Formatted role name
 */
export function formatRole(role) {
  return ROLE_NAMES[role] || "Officer"
}

/**
 * Get user's display name from email or userId
 * @param {Object} user - User object
 * @returns {string} - Display name
 */
export function getDisplayName(user) {
  if (!user) return "User"
  
  if (user.email) {
    return user.email.split('@')[0]
  }
  
  if (user.userId) {
    return user.userId
  }
  
  return "User"
}

/**
 * Get user's full role description
 * @param {Object} user - User object
 * @returns {string} - Role description with department
 */
export function getFullRoleDescription(user) {
  if (!user) return "User"
  
  const roleName = formatRole(user.role)
  
  if (user.department) {
    return `${roleName} - ${user.department}`
  }
  
  return roleName
}
