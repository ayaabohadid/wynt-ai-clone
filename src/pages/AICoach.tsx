import { useState, type ComponentType } from 'react'
import {
  BarChart3,
  Briefcase,
  ChevronRight,
  FileText,
  Home,
  LayoutGrid,
  List,
  Mail,
  MessageSquare,
  Mic2,
  PanelLeft,
  PanelRight,
  Plus,
  Rocket,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/i18n'
import { useRouter } from '@/lib/router'
import { getCurrentUser } from '@/lib/auth'
import { cn } from '@/lib/utils'

/* ---------- Two-coins icon ---------- */
function CoinsIcon({ className }: { className?: string }) {
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
    >
      <circle cx="9" cy="9" r="6" />
      <circle cx="15" cy="15" r="6" />
    </svg>
  )
}

type IconC = ComponentType<{ className?: string }>

const quickActions: {
  key: string
  icon: IconC
  label: Record<Lang, string>
  bg: string
  color: string
}[] = [
  { key: 'livefeed', icon: Briefcase as IconC, label: { en: 'Wynt Live Feed', ar: 'تغذية Wynt المباشرة' }, bg: 'bg-teal-100 dark:bg-teal-950/40', color: 'text-teal-600 dark:text-teal-400' },
  { key: 'intelligence', icon: Target as IconC, label: { en: 'Wynt Intelligence', ar: 'ذكاء Wynt' }, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { key: 'cv', icon: FileText as IconC, label: { en: 'CV Studio', ar: 'استوديو السيرة' }, bg: 'bg-blue-100 dark:bg-blue-950/40', color: 'text-blue-600 dark:text-blue-400' },
  { key: 'interviews', icon: Mic2 as IconC, label: { en: 'Interview Studio', ar: 'استوديو المقابلات' }, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { key: 'tracker', icon: BarChart3 as IconC, label: { en: 'Application Tracker', ar: 'متتبّع الطلبات' }, bg: 'bg-pink-100 dark:bg-pink-950/40', color: 'text-pink-600 dark:text-pink-400' },
  { key: 'salary', icon: TrendingUp as IconC, label: { en: 'Salary AI', ar: 'ذكاء الراتب' }, bg: 'bg-emerald-100 dark:bg-emerald-950/40', color: 'text-emerald-600 dark:text-emerald-400' },
  { key: 'cover', icon: Mail as IconC, label: { en: 'Cover Letters', ar: 'رسائل التقديم' }, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { key: 'analytics', icon: Rocket as IconC, label: { en: 'Apply Pilot', ar: 'طيّار التقديم' }, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { key: 'tokens', icon: CoinsIcon, label: { en: 'Tokens & Usage', ar: 'التوكنات والاستخدام' }, bg: 'bg-amber-100 dark:bg-amber-950/40', color: 'text-amber-600 dark:text-amber-400' },
  { key: 'profile', icon: User as IconC, label: { en: 'Profile', ar: 'الملف الشخصي' }, bg: 'bg-slate-100 dark:bg-slate-800', color: 'text-slate-600 dark:text-slate-300' },
  { key: 'upgrade', icon: Zap as IconC, label: { en: 'Upgrade Plan', ar: 'ترقية الخطة' }, bg: 'bg-emerald-100 dark:bg-emerald-950/40', color: 'text-emerald-600 dark:text-emerald-400' },
]

const popularTopics: { icon: IconC; label: Record<Lang, string>; color: string }[] = [
  { icon: FileText as IconC, label: { en: 'CV Review & Optimization', ar: 'مراجعة وتحسين السيرة' }, color: 'text-blue-500' },
  { icon: Mic2 as IconC, label: { en: 'Interview Preparation', ar: 'التحضير للمقابلات' }, color: 'text-violet-500' },
  { icon: TrendingUp as IconC, label: { en: 'Salary Negotiation', ar: 'التفاوض على الراتب' }, color: 'text-emerald-500' },
  { icon: Target as IconC, label: { en: 'Career Path Planning', ar: 'تخطيط المسار المهني' }, color: 'text-amber-500' },
]

const suggestedPrompts: Record<Lang, string>[] = [
  { en: 'Review my CV and suggest improvements', ar: 'راجع سيرتي الذاتية واقترح تحسينات' },
  { en: 'Help me prepare for a PM interview', ar: 'ساعدني في التحضير لمقابلة مدير منتج' },
  { en: 'Find jobs matching my profile', ar: 'ابحث عن وظائف تناسب ملفّي' },
  { en: 'How to negotiate a higher salary?', ar: 'كيف أتفاوض على راتب أعلى؟' },
]

interface Props {
  onExitToDashboard: () => void
}

export function AICoach({ onExitToDashboard }: Props) {
  const { lang } = useLanguage()
  const { navigate } = useRouter()
  const user = getCurrentUser()
  const userName = user?.name || 'Aya Abo Hadid'
  const initial = userName.trim().charAt(0).toUpperCase()
  const [sessionView, setSessionView] = useState<'list' | 'grid'>('list')
  const [search, setSearch] = useState('')
  const [input, setInput] = useState('')
  const [insightsOpen, setInsightsOpen] = useState(true)
  const [leftOpen, setLeftOpen] = useState(true)

  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div
      className="flex h-screen bg-slate-50 dark:bg-slate-950"
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* LEFT: Sessions sidebar */}
      {leftOpen && (
        <aside className="hidden w-72 shrink-0 flex-col border-e border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:flex">
          {/* Brand header */}
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-slate-900 dark:text-white">
                    {copy('AI Coach', 'المدرّب الذكي')}
                  </h2>
                  <BetaPill />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {copy('Career strategist', 'استراتيجي مهني')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onExitToDashboard}
                aria-label={copy('Back to dashboard', 'العودة إلى اللوحة')}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Home className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setLeftOpen(false)}
                aria-label={copy('Collapse sidebar', 'طيّ الشريط')}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* New Session */}
          <div className="p-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              {copy('New Session', 'جلسة جديدة')}
            </button>
          </div>

          {/* Search + view */}
          <div className="flex items-center gap-2 px-3 pb-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={copy('Search sessions...', 'ابحث في الجلسات...')}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 ps-9 pe-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div className="flex items-center rounded-md bg-slate-100 p-0.5 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setSessionView('list')}
                aria-label="List view"
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded transition-colors',
                  sessionView === 'list'
                    ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400'
                )}
              >
                <List className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => setSessionView('grid')}
                aria-label="Grid view"
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded transition-colors',
                  sessionView === 'grid'
                    ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400'
                )}
              >
                <LayoutGrid className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Sessions list (empty state) */}
          <div className="flex flex-1 items-center justify-center px-3 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {copy('No sessions yet', 'لا توجد جلسات بعد')}
            </p>
          </div>

          {/* User card */}
          <div className="border-t border-slate-200 p-3 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {userName}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  0 {copy('sessions', 'جلسة')}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* CENTER: Chat */}
      <main className="flex min-w-0 flex-1 flex-col bg-white dark:bg-slate-950">
        {/* Chat header */}
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-3.5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {!leftOpen && (
              <button
                type="button"
                onClick={() => setLeftOpen(true)}
                aria-label={copy('Show sessions', 'إظهار الجلسات')}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <MessageSquare className="h-4 w-4" />
            </div>
            <h1 className="font-bold text-slate-900 dark:text-white">
              {copy('AI Coach', 'المدرّب الذكي')}
            </h1>
            <BetaPill />
          </div>
        </header>

        {/* Empty state */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="mt-5 inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {copy('Welcome to AI Coach', 'أهلاً بك في المدرّب الذكي')}
            <BetaPill />
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'Your personal career strategist. Ask about CV optimization, interview prep, job matching, salary negotiation, or career planning.',
              'استراتيجي مسيرتك المهنية الشخصي. اسأل عن تحسين السيرة، التحضير للمقابلات، مطابقة الوظائف، التفاوض على الراتب، أو تخطيط المسار المهني.'
            )}
          </p>

          <div className="mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
            {suggestedPrompts.map((p) => (
              <button
                key={p.en}
                type="button"
                onClick={() => setInput(p[lang])}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-start text-sm text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50/40 hover:text-indigo-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-300"
              >
                {p[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={copy('Ask your AI Coach anything...', 'اسأل مدرّبك الذكي عن أي شيء...')}
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
              />
            </div>
            <button
              type="button"
              aria-label={copy('Send message', 'إرسال')}
              disabled={!input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm transition-all hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300 dark:disabled:bg-violet-950"
            >
              <Send className="h-4 w-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </main>

      {/* RIGHT: Insights */}
      {insightsOpen && (
        <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto border-s border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {copy('Insights', 'الرؤى')}
            </h2>
            <button
              type="button"
              onClick={() => setInsightsOpen(false)}
              aria-label={copy('Close insights', 'إغلاق الرؤى')}
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <PanelRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-5">
            {/* Quick Actions */}
            <section>
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 dark:text-slate-500">
                {copy('QUICK ACTIONS', 'إجراءات سريعة')}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {quickActions.map((a) => {
                  const Icon = a.icon
                  return (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => {
                        if (a.key === 'upgrade') {
                          navigate('/pricing')
                          return
                        }
                        if (a.key === 'profile') {
                          navigate('/dashboard?section=profile')
                          return
                        }
                        navigate(`/dashboard?section=${a.key}`)
                      }}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-3 text-center transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500/50"
                    >
                      <div className={cn('flex h-9 w-9 items-center justify-center rounded-full', a.bg)}>
                        <Icon className={cn('h-4 w-4', a.color)} />
                      </div>
                      <span className="text-[10px] leading-tight text-slate-600 dark:text-slate-300">
                        {a.label[lang]}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Coach Memory */}
            <section>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-widest text-slate-400 dark:text-slate-500">
                  {copy('COACH MEMORY', 'ذاكرة المدرّب')}
                </p>
                <button
                  type="button"
                  className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {copy('Manage', 'إدارة')}
                </button>
              </div>
              <p className="mt-3 text-xs italic leading-relaxed text-slate-500 dark:text-slate-400">
                {copy(
                  'No preferences remembered yet. Chat with the Coach and it will learn your preferences automatically.',
                  'لا توجد تفضيلات محفوظة بعد. تحدّث مع المدرّب وسيتعلّم تفضيلاتك تلقائيًا.'
                )}
              </p>
            </section>

            {/* Popular Topics */}
            <section>
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 dark:text-slate-500">
                {copy('POPULAR TOPICS', 'مواضيع شائعة')}
              </p>
              <ul className="mt-3 space-y-1">
                {popularTopics.map((topic) => {
                  const Icon = topic.icon
                  return (
                    <li key={topic.label.en}>
                      <button
                        type="button"
                        onClick={() => setInput(topic.label[lang])}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-start text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Icon className={cn('h-4 w-4 shrink-0', topic.color)} />
                        {topic.label[lang]}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          </div>
        </aside>
      )}

      {/* Insights collapsed: floating button to reopen */}
      {!insightsOpen && (
        <button
          type="button"
          onClick={() => setInsightsOpen(true)}
          aria-label={copy('Open insights', 'فتح الرؤى')}
          className="fixed end-4 top-20 z-40 flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <PanelRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function BetaPill() {
  const { lang } = useLanguage()
  return (
    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
      {lang === 'ar' ? 'تجريبي' : 'BETA'}
    </span>
  )
}
