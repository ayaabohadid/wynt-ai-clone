import {
  BrainCircuit,
  DollarSign,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  Link2,
  LogOut,
  Mic2,
  Radio,
  Settings,
  Sparkles,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import { useRouter } from '@/lib/router'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export type NavKey =
  | 'home'
  | 'livefeed'
  | 'intelligence'
  | 'coach'
  | 'interviews'
  | 'cv'
  | 'cover'
  | 'salary'
  | 'linkedin'
  | 'settings'
  | 'help'

type Item = {
  key: NavKey
  icon: LucideIcon
  label: Record<Lang, string>
}

const topNav: Item[] = [
  { key: 'home', icon: Home, label: { en: 'Overview', ar: 'نظرة عامة' } },
  { key: 'livefeed', icon: Radio, label: { en: 'Wynt Live Feed', ar: 'تغذية Wynt المباشرة' } },
  { key: 'intelligence', icon: BrainCircuit, label: { en: 'Wynt Intelligence', ar: 'ذكاء Wynt' } },
  { key: 'coach', icon: GraduationCap, label: { en: 'AI Coach', ar: 'المدرّب الذكي' } },
  { key: 'interviews', icon: Mic2, label: { en: 'Interview Studio', ar: 'استوديو المقابلات' } },
  { key: 'cv', icon: FileText, label: { en: 'My CV', ar: 'سيرتي الذاتية' } },
  { key: 'cover', icon: Wand2, label: { en: 'Cover Letters', ar: 'رسائل التقديم' } },
  { key: 'salary', icon: DollarSign, label: { en: 'Salary', ar: 'الراتب' } },
  { key: 'linkedin', icon: Link2, label: { en: 'LinkedIn', ar: 'LinkedIn' } },
]

const bottomNav: Item[] = [
  { key: 'settings', icon: Settings, label: { en: 'Settings', ar: 'الإعدادات' } },
  { key: 'help', icon: HelpCircle, label: { en: 'Help & Support', ar: 'المساعدة والدعم' } },
]

interface Props {
  active: NavKey
  onNavigate: (key: NavKey) => void
  /** Render inline as a sticky sidebar (default) or as a slide-out drawer */
  className?: string
  /** Whether to show the 'Tip of the day' card between sections */
  showTip?: boolean
}

export function DashboardSidebar({
  active,
  onNavigate,
  className,
  showTip = true,
}: Props) {
  const { lang } = useLanguage()
  const { navigate } = useRouter()

  return (
    <aside
      className={cn(
        'sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col justify-between overflow-y-auto border-e border-slate-200 bg-white px-3 py-6 dark:border-slate-800 dark:bg-slate-950 lg:flex',
        className
      )}
    >
      <div>
        <nav className="space-y-1">
          {topNav.map((item) => {
            const isActive = active === item.key
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
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

        {showTip && (
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
        )}
      </div>

      {/* Bottom section */}
      <div className="mt-4 space-y-1 border-t border-slate-200 pt-3 dark:border-slate-800">
        {bottomNav.map((item) => {
          const isActive = active === item.key
          const Icon = item.icon
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label[lang]}</span>
            </button>
          )
        })}
        <button
          onClick={() => navigate('/')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
        >
          <LogOut className="h-4 w-4" />
          <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Sign out'}</span>
        </button>
      </div>
    </aside>
  )
}
