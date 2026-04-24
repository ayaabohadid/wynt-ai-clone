import { useState } from 'react'
import {
  Bell,
  Briefcase,
  ChevronRight,
  FileText,
  Globe,
  LayoutDashboard,
  LineChart,
  LogOut,
  MessageSquare,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  User,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Link, useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const nav = [
  { key: 'home', icon: LayoutDashboard, label: { en: 'Dashboard', ar: 'الرئيسية' } },
  { key: 'cv', icon: FileText, label: { en: 'CV Analysis', ar: 'تحليل السيرة' } },
  { key: 'search', icon: Search, label: { en: 'Job Search', ar: 'البحث عن وظائف' } },
  { key: 'interviews', icon: MessageSquare, label: { en: 'Interviews', ar: 'المقابلات' } },
  { key: 'applications', icon: Briefcase, label: { en: 'Applications', ar: 'الطلبات' } },
  { key: 'insights', icon: LineChart, label: { en: 'Insights', ar: 'الإحصاءات' } },
]

const matches = [
  {
    title: { en: 'Senior React Developer', ar: 'مطوّر React أول' },
    company: 'Stripe',
    tags: { en: ['Remote', 'Senior'], ar: ['عن بُعد', 'أول'] },
    match: 94,
    posted: { en: '2h ago', ar: 'قبل ساعتين' },
  },
  {
    title: { en: 'Full Stack Engineer', ar: 'مهندس Full Stack' },
    company: 'Vercel',
    tags: { en: ['Remote', 'Mid'], ar: ['عن بُعد', 'متوسط'] },
    match: 89,
    posted: { en: '5h ago', ar: 'قبل 5 ساعات' },
  },
  {
    title: { en: 'Frontend Lead', ar: 'قائد الواجهة الأمامية' },
    company: 'Linear',
    tags: { en: ['Hybrid', 'Lead'], ar: ['هجين', 'قائد'] },
    match: 82,
    posted: { en: '1d ago', ar: 'قبل يوم' },
  },
  {
    title: { en: 'Staff Engineer, Platform', ar: 'مهندس منصّة Staff' },
    company: 'Pitch',
    tags: { en: ['Remote EU', 'Staff'], ar: ['عن بُعد EU', 'Staff'] },
    match: 78,
    posted: { en: '1d ago', ar: 'قبل يوم' },
  },
]

const recent = [
  {
    co: 'Stripe',
    role: { en: 'Senior React Developer', ar: 'مطوّر React أول' },
    status: 'interview',
    date: 'Apr 22',
  },
  {
    co: 'Vercel',
    role: { en: 'Full Stack Engineer', ar: 'مهندس Full Stack' },
    status: 'applied',
    date: 'Apr 21',
  },
  {
    co: 'Linear',
    role: { en: 'Frontend Lead', ar: 'قائد الواجهة الأمامية' },
    status: 'screening',
    date: 'Apr 20',
  },
  {
    co: 'Figma',
    role: { en: 'Product Engineer', ar: 'مهندس منتج' },
    status: 'rejected',
    date: 'Apr 18',
  },
]

const statusLabel: Record<string, { en: string; ar: string }> = {
  interview: { en: 'Interview', ar: 'مقابلة' },
  applied: { en: 'Applied', ar: 'تم التقديم' },
  screening: { en: 'Screening', ar: 'فحص' },
  rejected: { en: 'Rejected', ar: 'مرفوض' },
}
const statusStyles: Record<string, string> = {
  interview:
    'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300',
  applied:
    'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
  screening:
    'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  rejected:
    'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
}

export function Dashboard() {
  const { lang, t } = useLanguage()
  const { navigate } = useRouter()
  const [activeNav, setActiveNav] = useState('home')
  const firstName =
    localStorage.getItem('wynt-user-name')?.split(' ')[0] ||
    (lang === 'ar' ? 'أحمد' : 'Alex')

  const greeting =
    lang === 'ar' ? `مرحبًا بعودتك، ${firstName}!` : `Welcome back, ${firstName}!`
  const subGreeting =
    lang === 'ar' ? 'لديك 3 مطابقات جديدة و مقابلة قادمة.' : "You have 3 new matches and 1 upcoming interview."

  const quickActions = [
    {
      icon: Upload,
      title: lang === 'ar' ? 'رفع سيرة ذاتية' : 'Upload CV',
      desc: lang === 'ar' ? 'حلّل سيرتك واحصل على تقييم' : 'Analyse and score it',
      color: 'blue',
    },
    {
      icon: Target,
      title: lang === 'ar' ? 'ابحث عن وظائف' : 'Find Jobs',
      desc: lang === 'ar' ? 'تطابق ذكي في 50+ منصّة' : 'Smart match on 50+ boards',
      color: 'violet',
    },
    {
      icon: MessageSquare,
      title: lang === 'ar' ? 'تدرّب على مقابلة' : 'Practice Interview',
      desc: lang === 'ar' ? '5 شخصيات ذكاء اصطناعي' : '5 AI personas',
      color: 'emerald',
    },
    {
      icon: FileText,
      title: lang === 'ar' ? 'أنشئ رسالة تقديم' : 'Cover Letter',
      desc: lang === 'ar' ? 'مخصّصة في ثوانٍ' : 'Personalised in seconds',
      color: 'amber',
    },
  ]

  const stats = [
    {
      label: lang === 'ar' ? 'الطلبات' : 'Applications',
      value: '12',
      change: '+4',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      label: lang === 'ar' ? 'المقابلات' : 'Interviews',
      value: '4',
      change: '+2',
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/40',
    },
    {
      label: lang === 'ar' ? 'متوسط المطابقة' : 'Avg Match',
      value: '87%',
      change: '+5%',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      label: lang === 'ar' ? 'التوكنات المتبقية' : 'Tokens Left',
      value: '240',
      change: lang === 'ar' ? 'من 500' : 'of 500',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="hidden sm:inline">
              wynt<span className="text-blue-600 dark:text-blue-400">.ai</span>
            </span>
          </Link>
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'ابحث عن وظائف أو شركات' : 'Search jobs, companies…'}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 ps-9 pe-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <div className="ms-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="relative rounded-md border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <UserMenu onSignOut={() => navigate('/')} firstName={firstName} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 border-e border-slate-200 bg-white px-3 py-6 dark:border-slate-800 dark:bg-slate-950 lg:block">
          <nav className="space-y-1">
            {nav.map((item) => {
              const active = activeNav === item.key
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label[lang]}</span>
                </button>
              )
            })}
          </nav>
          <div className="mt-6 rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-violet-50 p-4 dark:border-slate-800 dark:from-blue-950/40 dark:to-violet-950/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              {lang === 'ar' ? 'نصيحة اليوم' : 'Tip of the day'}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {lang === 'ar'
                ? 'اضبط رسالتك التقديم حسب ثقافة الشركة لتحسين فرصك بنسبة 40%.'
                : 'Tailor your cover letter to the company culture to boost your chances by 40%.'}
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Greeting */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                {greeting} 👋
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subGreeting}</p>
            </div>
            <Button variant="gradient" className="gap-2">
              <Sparkles className="h-4 w-4" />
              {lang === 'ar' ? 'اسأل المساعد الذكي' : 'Ask AI Wizard'}
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className={cn(
                  'rounded-xl border border-slate-200 p-4 dark:border-slate-800',
                  s.bg
                )}
              >
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className={cn('text-3xl font-bold tracking-tight', s.color)}>{s.value}</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {s.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {lang === 'ar' ? 'إجراءات سريعة' : 'Quick actions'}
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((a) => {
              const Icon = a.icon
              const colorBg: Record<string, string> = {
                blue: 'bg-blue-600',
                violet: 'bg-violet-600',
                emerald: 'bg-emerald-600',
                amber: 'bg-amber-500',
              }
              return (
                <button
                  key={a.title}
                  className="group rounded-xl border border-slate-200 bg-white p-4 text-start shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg text-white',
                      colorBg[a.color]
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 font-semibold text-slate-900 dark:text-white">{a.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{a.desc}</p>
                </button>
              )
            })}
          </div>

          {/* Two columns: matches + recent applications */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Top matches */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {lang === 'ar' ? 'أفضل المطابقات' : 'Top matches'}
                </h2>
                <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                  {lang === 'ar' ? 'عرض الكل' : 'View all'}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-4 px-4 py-3',
                      i !== matches.length - 1 && 'border-b border-slate-100 dark:border-slate-800'
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {m.company.slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {m.title[lang]}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{m.company}</span>
                        <span>·</span>
                        <span>{m.posted[lang]}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {m.tags[lang].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-end">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold',
                          m.match >= 90
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : m.match >= 80
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                        )}
                      >
                        {m.match}%
                      </span>
                      <button className="mt-1 block text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                        {lang === 'ar' ? 'تقديم' : 'Apply'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent applications */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {lang === 'ar' ? 'أحدث الطلبات' : 'Recent applications'}
                </h2>
              </div>
              <div className="mt-3 space-y-2">
                {recent.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {r.role[lang]}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {r.co} · {r.date}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold',
                        statusStyles[r.status]
                      )}
                    >
                      {statusLabel[r.status][lang]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  {lang === 'ar' ? 'تقدّمك هذا الأسبوع' : 'Your week at a glance'}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {lang === 'ar'
                    ? 'تقدّمت بطلب 4 وظائف، حصلت على مقابلة واحدة. استمرّ!'
                    : "You applied to 4 jobs and landed 1 interview. Keep it up!"}
                </p>
                <div className="mt-3 flex gap-1">
                  {[40, 70, 90, 60, 85, 50, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-blue-500 to-violet-500"
                      style={{ height: `${h / 2}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-slate-400 dark:text-slate-500">
            {t('signup.poweredBy')}
          </p>
        </main>
      </div>
    </div>
  )
}

function UserMenu({ onSignOut, firstName }: { onSignOut: () => void; firstName: string }) {
  const [open, setOpen] = useState(false)
  const { lang } = useLanguage()
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-bold text-white">
          {firstName.slice(0, 1).toUpperCase()}
        </div>
        <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:inline">
          {firstName}
        </span>
      </button>
      {open && (
        <div
          className="absolute end-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900"
          onMouseLeave={() => setOpen(false)}
        >
          <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
            <User className="h-4 w-4" />
            {lang === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
            <Globe className="h-4 w-4" />
            {lang === 'ar' ? 'الإعدادات' : 'Settings'}
          </button>
          <button
            onClick={onSignOut}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
          >
            <LogOut className="h-4 w-4" />
            {lang === 'ar' ? 'تسجيل الخروج' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  )
}
