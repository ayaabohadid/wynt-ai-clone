/**
 * Lightweight client-side mock auth — stores registered users and the
 * currently signed-in user in localStorage. No real server calls.
 *
 * Current user:
 *   wynt-user-name   → display name
 *   wynt-user-email  → email address
 *   wynt-user-id     → unique id for the active session
 *
 * All registered users (array):
 *   wynt-users       → RegisteredUser[]
 */

export type RegisteredUser = {
  id: string
  name: string
  email: string
  registeredAt: string // ISO
}

const USERS_KEY = 'wynt-users'
const NAME_KEY = 'wynt-user-name'
const EMAIL_KEY = 'wynt-user-email'
const ID_KEY = 'wynt-user-id'

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function getUsers(): RegisteredUser[] {
  if (typeof window === 'undefined') return []
  return safeParse<RegisteredUser[]>(window.localStorage.getItem(USERS_KEY), [])
}

export function findUserByEmail(email: string): RegisteredUser | undefined {
  const target = email.trim().toLowerCase()
  return getUsers().find((u) => u.email.toLowerCase() === target)
}

/**
 * Register a new user. If the email already exists, returns the existing
 * record unchanged (idempotent). Always sets the current session.
 */
export function registerUser(input: { name: string; email: string }): RegisteredUser {
  const email = input.email.trim()
  const name = input.name.trim()

  const existing = findUserByEmail(email)
  if (existing) {
    setCurrentUser(existing)
    return existing
  }

  const user: RegisteredUser = {
    id: makeId(),
    name,
    email,
    registeredAt: new Date().toISOString(),
  }
  const users = getUsers()
  users.push(user)
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
  setCurrentUser(user)
  return user
}

export function setCurrentUser(user: RegisteredUser) {
  window.localStorage.setItem(NAME_KEY, user.name)
  window.localStorage.setItem(EMAIL_KEY, user.email)
  window.localStorage.setItem(ID_KEY, user.id)
}

export function getCurrentUser(): RegisteredUser | null {
  if (typeof window === 'undefined') return null
  const name = window.localStorage.getItem(NAME_KEY)
  const email = window.localStorage.getItem(EMAIL_KEY)
  const id = window.localStorage.getItem(ID_KEY)
  if (!name || !email || !id) return null
  const match = getUsers().find((u) => u.id === id)
  if (match) return match
  // Session exists but user record is missing — return a minimal shape
  return { id, name, email, registeredAt: new Date().toISOString() }
}

export function signOut() {
  window.localStorage.removeItem(NAME_KEY)
  window.localStorage.removeItem(EMAIL_KEY)
  window.localStorage.removeItem(ID_KEY)
}
