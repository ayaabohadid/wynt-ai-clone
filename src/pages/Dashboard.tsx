import { useState } from 'react'
import {
  BarChart3,
  Bell,
  Brain,
  ChevronRight,
  DollarSign,
  FileText,
  Globe,
  Home,
  Link2,
  LogOut,
  Mic2,
  PlayCircle,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Upload,
  User,
  Wand2,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { DashboardSidebar, type NavKey } from '@/components/layout/DashboardSidebar'
import { BrowseJobs } from '@/pages/BrowseJobs'
import { DashboardOverview } from '@/pages/DashboardOverview'
import { WyntIntelligence } from '@/pages/WyntIntelligence'
import { AICoach } from '@/pages/AICoach'
import { InterviewStudio } from '@/pages/InterviewStudio'
import { SalaryAI } from '@/pages/SalaryAI'
import { LinkedInAnalysis } from '@/pages/LinkedInAnalysis'
import { CVStudio } from '@/pages/CVStudio'
import { CoverLetters } from '@/pages/CoverLetters'
import { ApplicationTracker } from '@/pages/ApplicationTracker'
import { ApplyPilotAnalytics } from '@/pages/ApplyPilotAnalytics'
import { Profile } from '@/pages/Profile'
import { SettingsBilling } from '@/pages/SettingsBilling'
import { TokensUsage } from '@/pages/TokensUsage'
import { ChromeExtension } from '@/pages/ChromeExtension'
import { Link, useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n'
import { getCurrentUser, signOut } from '@/lib/auth'
import { cn } from '@/lib/utils'

/** Two-coins icon used in the top-bar token pill */
function TopBarCoins({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="6" />
      <circle cx="15" cy="15" r="6" />
    </svg>
  )
}

const sectionTitles: Record<NavKey, { en: string; ar: string }> = {
  home: { en: 'Overview', ar: 'نظرة عامة' },
  livefeed: { en: 'Wynt Live Feed', ar: 'تغذية Wynt المباشرة' },
  intelligence: { en: 'Wynt Intelligence', ar: 'ذكاء Wynt' },
  coach: { en: 'AI Coach', ar: 'المدرّب الذكي' },
  interviews: { en: 'Interview Studio', ar: 'استوديو المقابلات' },
  salary: { en: 'Salary AI', ar: 'ذكاء الراتب' },
  linkedin: { en: 'LinkedIn Analysis', ar: 'تحليل LinkedIn' },
  cv: { en: 'CV Studio', ar: 'استوديو السيرة' },
  cover: { en: 'Cover Letters', ar: 'رسائل التقديم' },
  tracker: { en: 'Application Tracker', ar: 'متتبّع الطلبات' },
  analytics: { en: 'Apply Pilot Analytics', ar: 'تحليلات التقديم' },
  profile: { en: 'Profile', ar: 'الملف الشخصي' },
  settings: { en: 'Settings & Billing', ar: 'الإعدادات والفوترة' },
  tokens: { en: 'Tokens & Usage', ar: 'التوكنات والاستخدام' },
  chrome: { en: 'Chrome Extension', ar: 'إضافة Chrome' },
  help: { en: 'Help & Support', ar: 'المساعدة والدعم' },
}

const matches = [
  {
    title: { en: 'Senior React Developer', ar: 'مطوّر React أول' },
    company: 'Stripe',
    tags: { en: ['Remote', 'Senior', '$140–180K'], ar: ['عن بُعد', 'أول', '$140–180K'] },
    match: 94,
    posted: { en: '2h ago', ar: 'قبل ساعتين' },
  },
  {
    title: { en: 'Full Stack Engineer', ar: 'مهندس Full Stack' },
    company: 'Vercel',
    tags: { en: ['Remote', 'Mid', '$120–150K'], ar: ['عن بُعد', 'متوسط', '$120–150K'] },
    match: 89,
    posted: { en: '5h ago', ar: 'قبل 5 ساعات' },
  },
  {
    title: { en: 'Frontend Lead', ar: 'قائد الواجهة الأمامية' },
    company: 'Linear',
    tags: { en: ['Hybrid', 'Lead', '$160–200K'], ar: ['هجين', 'قائد', '$160–200K'] },
    match: 82,
    posted: { en: '1d ago', ar: 'قبل يوم' },
  },
]

const recent = [
  { co: 'Stripe', role: { en: 'Senior React Developer', ar: 'مطوّر React أول' }, status: 'interview', date: 'Apr 22' },
  { co: 'Vercel', role: { en: 'Full Stack Engineer', ar: 'مهندس Full Stack' }, status: 'applied', date: 'Apr 21' },
  { co: 'Linear', role: { en: 'Frontend Lead', ar: 'قائد الواجهة الأمامية' }, status: 'screening', date: 'Apr 20' },
  { co: 'Figma', role: { en: 'Product Engineer', ar: 'مهندس منتج' }, status: 'rejected', date: 'Apr 18' },
]

const statusLabel: Record<string, { en: string; ar: string }> = {
  interview: { en: 'Interview', ar: 'مقابلة' },
  applied: { en: 'Applied', ar: 'تم التقديم' },
  screening: { en: 'Screening', ar: 'فحص' },
  rejected: { en: 'Rejected', ar: 'مرفوض' },
}
const statusStyles: Record<string, string> = {
  interview: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300',
  applied: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
  screening: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
}

const interviewPersonas = [
  { emoji: '💻', name: { en: 'Alex', ar: 'أليكس' }, role: { en: 'Technical', ar: 'تقني' } },
  { emoji: '😊', name: { en: 'Maya', ar: 'مايا' }, role: { en: 'HR', ar: 'موارد بشرية' } },
  { emoji: '👔', name: { en: 'Sam', ar: 'سام' }, role: { en: 'Executive', ar: 'تنفيذي' } },
  { emoji: '📋', name: { en: 'Priya', ar: 'بريا' }, role: { en: 'Product', ar: 'منتج' } },
  { emoji: '🎯', name: { en: 'Kai', ar: 'كاي' }, role: { en: 'Culture', ar: 'ثقافة' } },
]

const sectionByNav: Partial<Record<NavKey, string>> = {
  livefeed: 'browse-jobs',
  intelligence: 'intelligence',
  coach: 'coach',
  interviews: 'interviews',
  salary: 'salary',
  linkedin: 'linkedin',
  cv: 'cv',
  cover: 'cover',
  tracker: 'tracker',
  analytics: 'analytics',
  profile: 'profile',
  settings: 'settings',
  tokens: 'tokens',
  chrome: 'chrome',
  help: 'help',
}

const navBySection: Record<string, NavKey> = Object.fromEntries(
  Object.entries(sectionByNav).map(([k, v]) => [v as string, k as NavKey])
) as Record<string, NavKey>

export function Dashboard() {
  const { lang, t } = useLanguage()
  const { navigate, params } = useRouter()
  const sectionParam = params.get('section') || ''
  const initialNav: NavKey = navBySection[sectionParam] || 'home'
  const [activeNav, setActiveNav] = useState<NavKey>(initialNav)
  const [wizardInput, setWizardInput] = useState('')
  const currentUser = getCurrentUser()
  const firstName =
    currentUser?.name?.split(' ')[0] || (lang === 'ar' ? 'أحمد' : 'Alex')

  const handleNavigate = (key: NavKey) => {
    setActiveNav(key)
    const section = sectionByNav[key]
    const url = section ? `/dashboard?section=${section}` : '/dashboard'
    navigate(url)
  }

  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const stats = [
    { label: copy('Applications', 'الطلبات'), value: '12', change: '+4', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40' },
    { label: copy('Interviews', 'المقابلات'), value: '4', change: '+2', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40' },
    { label: copy('Avg Match', 'متوسط المطابقة'), value: '87%', change: '+5%', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
    { label: copy('Tokens Left', 'التوكنات المتبقية'), value: '240', change: copy('of 500', 'من 500'), color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  ]

  // AI Coach takes the full viewport — different layout (3 columns), no Dashboard chrome
  if (activeNav === 'coach') {
    return (
      <AICoach
        onExitToDashboard={() => {
          setActiveNav('home')
          navigate('/dashboard')
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar (full height, own brand header) */}
      <DashboardSidebar active={activeNav} onNavigate={handleNavigate} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            {/* Breadcrumb / page title */}
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <Home className="h-4 w-4 text-slate-400" />
              <span className="font-medium">{sectionTitles[activeNav][lang]}</span>
            </div>

            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="hidden sm:inline">
                wynt<span className="text-indigo-600 dark:text-indigo-400">.ai</span>
              </span>
            </Link>

            <div className="ms-auto flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              {/* Token balance pill */}
              <button
                type="button"
                onClick={() => handleNavigate('tokens')}
                className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:hover:bg-violet-950/70"
                aria-label="Token balance"
              >
                <TopBarCoins className="h-3.5 w-3.5" />
                65
              </button>
              {/* Plan pill */}
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                {copy('Free', 'مجاني')}
              </span>
              <UserMenu
                onSignOut={() => {
                  signOut()
                  navigate('/')
                }}
                firstName={firstName}
              />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {activeNav === 'livefeed' ? (
            <BrowseJobs />
          ) : activeNav === 'intelligence' ? (
            <WyntIntelligence />
          ) : activeNav === 'interviews' ? (
            <InterviewStudio />
          ) : activeNav === 'salary' ? (
            <SalaryAI />
          ) : activeNav === 'linkedin' ? (
            <LinkedInAnalysis />
          ) : activeNav === 'cv' ? (
            <CVStudio />
          ) : activeNav === 'cover' ? (
            <CoverLetters />
          ) : activeNav === 'tracker' ? (
            <ApplicationTracker onNavigate={handleNavigate} />
          ) : activeNav === 'analytics' ? (
            <ApplyPilotAnalytics />
          ) : activeNav === 'profile' ? (
            <Profile />
          ) : activeNav === 'settings' ? (
            <SettingsBilling />
          ) : activeNav === 'tokens' ? (
            <TokensUsage />
          ) : activeNav === 'chrome' ? (
            <ChromeExtension />
          ) : activeNav === 'home' ? (
            <DashboardOverview onNavigate={handleNavigate} />
          ) : (<>
          {/* Greeting */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                {copy(`Welcome back, ${firstName}!`, `مرحبًا بعودتك، ${firstName}!`)} 👋
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {copy('You have 3 new matches and 1 upcoming interview.', 'لديك 3 مطابقات جديدة ومقابلة قادمة.')}
              </p>
            </div>
          </div>

          {/* AI Wizard */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 via-violet-50 to-pink-50 p-5 dark:border-slate-800 dark:from-blue-950/40 dark:via-violet-950/40 dark:to-pink-950/30">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-sm">
                <Wand2 className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-700 dark:text-violet-300">
                  {copy('AI Wizard', 'المساعد الذكي')}
                </p>
                <h2 className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
                  {copy('Describe your dream role in plain language', 'صِف وظيفتك المثالية بلغة طبيعية')}
                </h2>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={wizardInput}
                onChange={(e) => setWizardInput(e.target.value)}
                placeholder={copy(
                  'e.g. Remote senior full-stack role at a Series B startup, EU time zone, meaningful equity',
                  'مثال: دور Full Stack أول عن بُعد في شركة Series B، توقيت أوروبا، أسهم مجزية'
                )}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              <Button variant="gradient" className="gap-2 whitespace-nowrap">
                <Sparkles className="h-4 w-4" />
                {copy('Find matches', 'ابحث عن مطابقات')}
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                copy('Remote fintech', 'فينتك عن بُعد'),
                copy('Senior + equity', 'أول + أسهم'),
                copy('Berlin timezone', 'توقيت برلين'),
                copy('Series B', 'Series B'),
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setWizardInput(wizardInput ? `${wizardInput}, ${chip}` : chip)}
                  className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-0.5 text-xs text-slate-600 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Top Match spotlight + CV Intelligence */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                    <Brain className="h-3 w-3" />
                    {copy('AI Deep Match', 'مطابقة ذكية عميقة')}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                    {copy('Senior Product Manager', 'مدير منتج أول')}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Stripe · {copy('Remote · $150–200K', 'عن بُعد · $150–200K')}
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">87%</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {copy('overall fit', 'التوافق الإجمالي')}
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { label: copy('Technical Skills', 'المهارات التقنية'), pct: 92, color: 'bg-blue-500' },
                  { label: copy('Experience', 'الخبرة'), pct: 85, color: 'bg-violet-500' },
                  { label: copy('Industry Alignment', 'التوافق الصناعي'), pct: 78, color: 'bg-emerald-500' },
                  { label: copy('Culture Fit', 'التوافق الثقافي'), pct: 81, color: 'bg-amber-500' },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="mb-1 flex justify-between text-xs text-slate-600 dark:text-slate-300">
                      <span>{row.label}</span>
                      <span className="font-semibold">{row.pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {copy(
                    'Skill gap: Advanced SQL · Strengthen with our interview prep',
                    'فجوة مهارة: SQL متقدّم · عزّزها عبر تدريب المقابلات'
                  )}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {copy('View details', 'عرض التفاصيل')}
                  </Button>
                  <Button variant="gradient" size="sm" className="gap-1.5">
                    <Send className="h-3.5 w-3.5" />
                    {copy('Auto-Apply', 'تقديم تلقائي')}
                  </Button>
                </div>
              </div>
            </div>

            {/* CV Intelligence */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                  <BarChart3 className="h-3 w-3" />
                  {copy('CV Intelligence', 'ذكاء السيرة')}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {copy('Overall score', 'التقييم الإجمالي')}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold text-blue-600 dark:text-blue-400">94</span>
                    <span className="mb-1 text-lg text-slate-400">/100</span>
                  </div>
                </div>
                <svg viewBox="0 0 36 36" className="h-20 w-20 rotate-[-90deg]">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#cvgrad)"
                    strokeWidth="3"
                    strokeDasharray="94, 100"
                  />
                  <defs>
                    <linearGradient id="cvgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
                {[
                  { label: copy('ATS Compatibility', 'توافق ATS'), score: 'A+', ok: true },
                  { label: copy('Keyword Coverage', 'تغطية الكلمات'), score: '91%', ok: true },
                  { label: copy('Formatting', 'التنسيق'), score: '✓', ok: true },
                  { label: copy('Quantified Impact', 'الأثر الكمّي'), score: copy('Improve', 'حسّن'), ok: false },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">{row.label}</span>
                    <span className={row.ok ? 'font-semibold text-emerald-600 dark:text-emerald-400' : 'font-semibold text-amber-500 dark:text-amber-400'}>
                      {row.score}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <Upload className="h-3.5 w-3.5" />
                {copy('Re-upload & re-score', 'إعادة رفع وتقييم')}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className={cn('rounded-xl border border-slate-200 p-4 dark:border-slate-800', s.bg)}
              >
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className={cn('text-3xl font-bold tracking-tight', s.color)}>{s.value}</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interview Studio */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  <Mic2 className="h-3 w-3" />
                  {copy('Interview Studio', 'استوديو المقابلات')}
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  {copy('Practice with 5 AI interviewer personas', 'تدرّب مع 5 شخصيات ذكاء اصطناعي')}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {copy('Voice interviews with real-time feedback.', 'مقابلات صوتية بملاحظات فورية.')}
                </p>
              </div>
              <Button variant="gradient" className="gap-1.5">
                <PlayCircle className="h-4 w-4" />
                {copy('Start practice', 'ابدأ التدريب')}
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {interviewPersonas.map((p, i) => (
                <button
                  key={p.name.en}
                  className={cn(
                    'flex flex-col items-center rounded-xl border p-3 text-center transition-all',
                    i === 0
                      ? 'border-violet-500 bg-violet-50 ring-2 ring-violet-500/30 dark:border-violet-400 dark:bg-violet-950/40'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-slate-700'
                  )}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{p.name[lang]}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.role[lang]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Top matches + Recent applications */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {copy('Top matches', 'أفضل المطابقات')}
                </h2>
                <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                  {copy('View all', 'عرض الكل')}
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
                        {copy('Apply', 'تقديم')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent applications + mini chart */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {copy('Recent applications', 'أحدث الطلبات')}
              </h2>
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
                  {copy('Your week at a glance', 'تقدّمك هذا الأسبوع')}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {copy(
                    'You applied to 4 jobs and landed 1 interview. Keep it up!',
                    'تقدّمت بطلب 4 وظائف، حصلت على مقابلة واحدة. استمرّ!'
                  )}
                </p>
                <div className="mt-3 flex items-end gap-1 h-16">
                  {[40, 70, 90, 60, 85, 50, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-blue-500 to-violet-500"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                  {(lang === 'ar'
                    ? ['س', 'ح', 'ث', 'ر', 'خ', 'ج', 'س']
                    : ['M', 'T', 'W', 'T', 'F', 'S', 'S']
                  ).map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary tools strip */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Send, en: 'Cover Letter', ar: 'رسالة تقديم', desc: { en: 'Generate in seconds', ar: 'أنشئ في ثوانٍ' }, color: 'emerald' },
              { icon: DollarSign, en: 'Salary Coach', ar: 'مدرّب الراتب', desc: { en: 'Negotiate smarter', ar: 'تفاوض بذكاء' }, color: 'amber' },
              { icon: Link2, en: 'LinkedIn Sync', ar: 'مزامنة LinkedIn', desc: { en: 'One-click import', ar: 'استيراد بنقرة' }, color: 'blue' },
              { icon: Globe, en: 'CV Translate', ar: 'ترجمة السيرة', desc: { en: '12 languages', ar: '12 لغة' }, color: 'violet' },
            ].map((a) => {
              const Icon = a.icon
              const colorBg: Record<string, string> = {
                blue: 'bg-blue-600',
                violet: 'bg-violet-600',
                emerald: 'bg-emerald-600',
                amber: 'bg-amber-500',
              }
              return (
                <button
                  key={a.en}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-start shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-white shrink-0', colorBg[a.color])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {copy(a.en, a.ar)}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {a.desc[lang]}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <p className="mt-10 text-center text-xs text-slate-400 dark:text-slate-500">
            {t('signup.poweredBy')}
          </p>
          </>)}
        </main>
      </div>

      {/* Floating AI assistant */}
      <button
        type="button"
        aria-label={lang === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
        className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-110 hover:shadow-xl"
      >
        <Sparkles className="h-6 w-6" />
      </button>
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

