import { useState, type FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Zap, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const stats = [
  { value: '10K+', label: 'Active users' },
  { value: '95%', label: 'Match rate' },
  { value: '3x', label: 'Faster hiring' },
]

export function Signup() {
  const { navigate } = useRouter()
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [agree, setAgree] = useState({ terms: false, privacy: false })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.password.length >= 8 &&
    agree.terms &&
    agree.privacy &&
    !submitting

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 900)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-950/40" />
        <div className="absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-950/30" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 py-10 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="mx-auto flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span>
            wynt<span className="text-blue-600 dark:text-blue-400">.ai</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Start your AI-powered{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              career journey
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Join thousands of professionals who are finding their next role with precision AI
            matching, personalised coaching, and one-click applications.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-slate-200 bg-white/70 p-3 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
            >
              <p className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {success ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                Welcome to wynt.ai, {form.name.split(' ')[0]}!
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Check {form.email} for a verification link to activate your account.
              </p>
              <Button
                variant="gradient"
                size="lg"
                className="mt-6 w-full gap-1.5"
                onClick={() => navigate('/')}
              >
                Back to homepage
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Field
                id="name"
                label="Full name"
                icon={<User className="h-4 w-4" />}
                type="text"
                autoComplete="name"
                placeholder="Alex Morgan"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                id="email"
                label="Email address"
                icon={<Mail className="h-4 w-4" />}
                type="email"
                autoComplete="email"
                placeholder="alex@example.com"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
              <Field
                id="password"
                label="Password"
                icon={<Lock className="h-4 w-4" />}
                type={showPwd ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={(v) => setForm((f) => ({ ...f, password: v }))}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              {/* Legal checkboxes */}
              <div className="space-y-2.5 pt-1">
                <Check
                  checked={agree.terms}
                  onChange={(v) => setAgree((a) => ({ ...a, terms: v }))}
                >
                  I agree to the{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                    Acceptable Use Policy
                  </a>
                  .
                </Check>
                <Check
                  checked={agree.privacy}
                  onChange={(v) => setAgree((a) => ({ ...a, privacy: v }))}
                >
                  I have read the{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                    Cookie Policy
                  </a>
                  .
                </Check>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full gap-2"
                disabled={!canSubmit}
              >
                {submitting ? 'Creating account…' : 'Create Account'}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          )}
        </div>

        {/* Sign-in link */}
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Sign in
          </Link>
        </p>

        {/* Footer */}
        <p className="mt-auto pt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          Powered by Wynt.AI — Your Career Copilot
        </p>
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  icon,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  trailing,
}: {
  id: string
  label: string
  icon: React.ReactNode
  type: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoComplete?: string
  trailing?: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition-all',
          'focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30',
          'dark:border-slate-700 dark:bg-slate-950 dark:focus-within:border-blue-400'
        )}
      >
        <span className="text-slate-400">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
        />
        {trailing}
      </div>
    </div>
  )
}

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  children: React.ReactNode
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800"
      />
      <span className="leading-relaxed">{children}</span>
    </label>
  )
}
