import { useState, type FormEvent } from 'react'
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n'
import { InvalidCredentialsError, signIn } from '@/lib/auth'
import { cn } from '@/lib/utils'

export function SignIn() {
  const { navigate } = useRouter()
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = form.email.trim() && form.password.length > 0 && !submitting

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setError(null)
    setSubmitting(true)
    setTimeout(() => {
      try {
        signIn(form.email, form.password)
        setSubmitting(false)
        navigate('/dashboard')
      } catch (err) {
        setSubmitting(false)
        if (err instanceof InvalidCredentialsError) {
          if (err.reason === 'no_user') {
            setError(
              copy(
                "We can't find an account for that email. Sign up instead.",
                'لا يوجد حساب بهذا الإيميل. سجّلي حساب جديد بدلاً من ذلك.'
              )
            )
          } else {
            setError(
              copy(
                'That password is incorrect. Try again.',
                'كلمة المرور غير صحيحة. حاولي مرّة أخرى.'
              )
            )
          }
        } else {
          setError(
            copy(
              'Something went wrong. Please try again.',
              'حدث خطأ غير متوقّع. حاولي مرّة أخرى.'
            )
          )
        }
      }
    }, 500)
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950"
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
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
        <div className="mt-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {copy('Welcome', 'مرحباً')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {copy('back', 'بعودتك')}
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {copy(
              'Sign in with the email you registered with.',
              'سجّلي الدخول بالإيميل اللي سجّلتي بيه.'
            )}
          </p>
        </div>

        {/* Form card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <Field
              id="email"
              label={copy('Email address', 'البريد الإلكتروني')}
              icon={<Mail className="h-4 w-4" />}
              type="email"
              autoComplete="email"
              placeholder={copy('you@example.com', 'you@example.com')}
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            />
            <Field
              id="password"
              label={copy('Password', 'كلمة المرور')}
              icon={<Lock className="h-4 w-4" />}
              type={showPwd ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder={copy('Enter your password', 'أدخلي كلمة المرور')}
              value={form.password}
              onChange={(v) => setForm((f) => ({ ...f, password: v }))}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={
                    showPwd ? copy('Hide password', 'إخفاء كلمة المرور') : copy('Show password', 'إظهار كلمة المرور')
                  }
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full gap-2"
              disabled={!canSubmit}
            >
              {submitting ? copy('Signing in...', 'جاري تسجيل الدخول...') : copy('Sign in', 'تسجيل الدخول')}
              {!submitting && <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />}
            </Button>
          </form>
        </div>

        {/* Sign-up link */}
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {copy("Don't have an account?", 'ليس لديك حساب؟')}{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {copy('Create one', 'أنشئ حساباً')}
          </Link>
        </p>

        <p className="mt-auto pt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          {copy('Powered by Wynt.AI', 'مدعوم من Wynt.AI')}
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
