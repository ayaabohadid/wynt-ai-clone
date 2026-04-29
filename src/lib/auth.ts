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
 *
 * Passwords are stored as-is in localStorage. This is a CLIENT-SIDE DEMO
 * only — no real security boundary, no real backend. Do not ship a real
 * product on top of this.
 */

export type RegisteredUser = {
  id: string
  name: string
  email: string
  /** Stored in plain text in localStorage. Demo-only. */
  password?: string
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

export function isEmailRegistered(email: string): boolean {
  return !!findUserByEmail(email)
}

export class EmailAlreadyRegisteredError extends Error {
  constructor() {
    super('Email already registered')
    this.name = 'EmailAlreadyRegisteredError'
  }
}

export class InvalidCredentialsError extends Error {
  reason: 'no_user' | 'wrong_password'
  constructor(reason: 'no_user' | 'wrong_password') {
    super(reason === 'no_user' ? 'No account for that email' : 'Wrong password')
    this.name = 'InvalidCredentialsError'
    this.reason = reason
  }
}

/**
 * Register a new user. Throws EmailAlreadyRegisteredError if an account
 * with that email already exists. On success the new user is set as the
 * current session and returned.
 */
export function registerUser(input: {
  name: string
  email: string
  password?: string
}): RegisteredUser {
  const email = input.email.trim()
  const name = input.name.trim()

  if (findUserByEmail(email)) {
    throw new EmailAlreadyRegisteredError()
  }

  const user: RegisteredUser = {
    id: makeId(),
    name,
    email,
    password: input.password,
    registeredAt: new Date().toISOString(),
  }
  const users = getUsers()
  users.push(user)
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
  setCurrentUser(user)
  return user
}

/**
 * Sign in with email + password. Throws InvalidCredentialsError on failure.
 *
 * Legacy users registered before passwords were stored will accept any
 * password (one-time migration: the password they sign in with becomes
 * their stored password).
 */
export function signIn(email: string, password: string): RegisteredUser {
  const target = email.trim()
  const users = getUsers()
  const idx = users.findIndex((u) => u.email.toLowerCase() === target.toLowerCase())
  if (idx === -1) throw new InvalidCredentialsError('no_user')
  const user = users[idx]

  // Legacy account with no stored password — accept and adopt this one
  if (!user.password) {
    user.password = password
    users[idx] = user
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
    setCurrentUser(user)
    return user
  }

  if (user.password !== password) throw new InvalidCredentialsError('wrong_password')

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
