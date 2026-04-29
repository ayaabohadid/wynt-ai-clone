import { useState, type FormEvent } from 'react'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n'
import { EmailAlreadyRegisteredError, registerUser } from '@/lib/auth'
import { cn } from '@/lib/utils'

export function Signup() {
  const { navigate } = useRouter()
  const { t, lang } = useLanguage()
  const stats = [
    { value: '10K+', label: t('signup.statUsers') },
    { value: '95%', label: t('signup.statMatch') },
    { value: '3x', label: t('signup.statHire') },
  ]
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [agree, setAgree] = useState({ terms: false, privacy: false })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setError(null)
    setSubmitting(true)
    setTimeout(() => {
      try {
        registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        })
        setSubmitting(false)
        setSuccess(true)
        // Route into onboarding after a brief celebratory pause
        setTimeout(() => navigate('/onboarding'), 1600)
      } catch (err) {
        setSubmitting(false)
        if (err instanceof EmailAlreadyRegisteredError) {
          setError(
            lang === 'ar'
              ? 'هذا الإيميل مسجَّل بالفعل. سجّلي الدخول بدلاً من ذلك.'
              : 'This email is already registered. Sign in instead.'
          )
        } else {
          setError(
            lang === 'ar'
              ? 'حدث خطأ غير متوقّع. حاولي مرّة أخرى.'
              : 'Something went wrong. Please try again.'
          )
        }
      }
    }, 700)
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
            {t('signup.title1')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {t('signup.title2')}
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t('signup.subtitle')}
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
                {t('signup.welcome')} {form.name.split(' ')[0]}!
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {t('signup.ready')}
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="truncate font-medium text-slate-700 dark:text-slate-200">
                  {form.email}
                </span>
                <CheckCircle2 className="ms-auto h-4 w-4 shrink-0 text-emerald-500" />
              </div>
              <Button
                variant="gradient"
                size="lg"
                className="mt-6 w-full gap-1.5"
                onClick={() => navigate('/onboarding')}
              >
                {t('signup.continueOnboarding')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Field
                id="name"
                label={t('signup.fullName')}
                icon={<User className="h-4 w-4" />}
                type="text"
                autoComplete="name"
                placeholder={t('signup.namePh')}
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                id="email"
                label={t('signup.email')}
                icon={<Mail className="h-4 w-4" />}
                type="email"
                autoComplete="email"
                placeholder={t('signup.emailPh')}
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
              <Field
                id="password"
                label={t('signup.password')}
                icon={<Lock className="h-4 w-4" />}
                type={showPwd ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder={t('signup.pwdPh')}
                value={form.password}
                onChange={(v) => setForm((f) => ({ ...f, password: v }))}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? t('signup.hidePwd') : t('signup.showPwd')}
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
                  {t('signup.termsAgree')}{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                    {t('signup.terms')}
                  </a>{' '}
                  {t('signup.and')}{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                    {t('signup.aup')}
                  </a>
                  .
                </Check>
                <Check
                  checked={agree.privacy}
                  onChange={(v) => setAgree((a) => ({ ...a, privacy: v }))}
                >
                  {t('signup.privacyRead')}{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                    {t('signup.privacy')}
                  </a>{' '}
                  {t('signup.and')}{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                    {t('signup.cookie')}
                  </a>
                  .
                </Check>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="leading-relaxed">
                    {error}{' '}
                    <Link
                      to="/signin"
                      className="font-semibold underline underline-offset-2 hover:no-underline"
                    >
                      {lang === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
                    </Link>
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full gap-2"
                disabled={!canSubmit}
              >
                {submitting ? t('signup.creating') : t('signup.create')}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          )}
        </div>

        {/* Sign-in link */}
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {t('signup.already')}{' '}
          <Link
            to="/signin"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {t('signup.signin')}
          </Link>
        </p>

        {/* Footer */}
        <p className="mt-auto pt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          {t('signup.poweredBy')}
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
