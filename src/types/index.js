/**
 * @fileoverview Shared type definitions (JSDoc — no TypeScript runtime needed)
 *
 * Design Pattern: Value Objects / Domain Model
 * All shape definitions live here so every layer imports from one source of truth.
 */

/**
 * @typedef {Object} User
 * @property {number}  id
 * @property {string}  name
 * @property {string}  email
 * @property {'Admin'|'Manager'|'Staff'} role
 * @property {'Active'|'Inactive'} status
 * @property {string}  avatar   - Two-letter initials
 * @property {string}  joined   - ISO date string
 */

/**
 * @typedef {Object} Employee
 * @property {number}  id
 * @property {string}  name
 * @property {string}  dept
 * @property {string}  position
 * @property {number}  salary
 * @property {string}  joined
 * @property {'Active'|'Inactive'|'On Leave'} status
 */

/**
 * @typedef {Object} Student
 * @property {number}  id
 * @property {string}  name
 * @property {string}  grade
 * @property {string}  section
 * @property {number}  gpa
 * @property {'Enrolled'|'Graduated'|'Suspended'} status
 * @property {string}  guardian
 * @property {string}  phone
 */

/**
 * @typedef {Object} School
 * @property {number}  id
 * @property {string}  name
 * @property {string}  city
 * @property {number}  students
 * @property {number}  employees
 * @property {number}  founded
 * @property {number}  rating
 * @property {'Active'|'Inactive'} status
 */

/**
 * @typedef {'dashboard'|'users'|'employees'|'students'|'schools'} ViewId
 */

export {};
