import { useState, type ComponentType } from 'react'
import {
  BarChart3,
  Brain,
  DollarSign,
  FileText,
  Globe,
  Headphones,
  LayoutGrid,
  List,
  Mail,
  PanelLeft,
  Rocket,
  Search,
  Settings,
  Sparkles,
  Target,
  User,
  Zap,
} from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/i18n'
import { getCurrentUser } from '@/lib/auth'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

export type NavKey =
  | 'home'
  | 'livefeed'
  | 'intelligence'
  | 'coach'
  | 'interviews'
  | 'salary'
  | 'linkedin'
  | 'cv'
  | 'cover'
  | 'tracker'
  | 'analytics'
  | 'profile'
  | 'settings'
  | 'tokens'
  | 'chrome'
  | 'help'

type IconComponent = ComponentType<{ className?: string }>

type Item = {
  key: NavKey
  icon: IconComponent
  label: Record<Lang, string>
}

type Section = {
  title: Record<Lang, string>
  items: Item[]
}

/* ---------- Icons missing from lucide 1.9 ---------- */

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  )
}

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
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="6" />
      <circle cx="15" cy="15" r="6" />
    </svg>
  )
}

function WLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 8 L9 25 L13 14 L16 19 L19 14 L23 25 L29 8"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

/* ---------- Navigation data ---------- */

const sections: Section[] = [
  {
    title: { en: 'MAIN', ar: 'الرئيسية' },
    items: [
      { key: 'home', icon: LayoutGrid, label: { en: 'Overview', ar: 'نظرة عامة' } },
    ],
  },
  {
    title: { en: 'JOBS', ar: 'الوظائف' },
    items: [
      {
        key: 'livefeed',
        icon: Search,
        label: { en: 'Wynt Live Feed', ar: 'تغذية Wynt المباشرة' },
      },
      {
        key: 'intelligence',
        icon: Target,
        label: { en: 'Wynt Intelligence', ar: 'ذكاء Wynt' },
      },
    ],
  },
  {
    title: { en: 'CAREER TOOLS', ar: 'أدوات المسار المهني' },
    items: [
      { key: 'coach', icon: Sparkles, label: { en: 'AI Coach', ar: 'المدرّب الذكي' } },
      {
        key: 'interviews',
        icon: Brain,
        label: { en: 'Interview Studio', ar: 'استوديو المقابلات' },
      },
      { key: 'salary', icon: DollarSign, label: { en: 'Salary AI', ar: 'ذكاء الراتب' } },
      {
        key: 'linkedin',
        icon: LinkedinIcon,
        label: { en: 'LinkedIn Analysis', ar: 'تحليل LinkedIn' },
      },
    ],
  },
  {
    title: { en: 'DOCUMENTS', ar: 'المستندات' },
    items: [
      { key: 'cv', icon: FileText, label: { en: 'CV Studio', ar: 'استوديو السيرة' } },
      { key: 'cover', icon: Mail, label: { en: 'Cover Letters', ar: 'رسائل التقديم' } },
    ],
  },
  {
    title: { en: 'TRACKING', ar: 'التتبّع' },
    items: [
      {
        key: 'tracker',
        icon: BarChart3,
        label: { en: 'Application Tracker', ar: 'متتبّع الطلبات' },
      },
      {
        key: 'analytics',
        icon: Rocket,
        label: { en: 'Apply Pilot Analytics', ar: 'تحليلات التقديم' },
      },
    ],
  },
  {
    title: { en: 'ACCOUNT', ar: 'الحساب' },
    items: [
      { key: 'profile', icon: User, label: { en: 'Profile', ar: 'الملف الشخصي' } },
      {
        key: 'settings',
        icon: Settings,
        label: { en: 'Settings & Billing', ar: 'الإعدادات والفوترة' },
      },
      {
        key: 'tokens',
        icon: CoinsIcon,
        label: { en: 'Tokens & Usage', ar: 'التوكنات والاستخدام' },
      },
      {
        key: 'chrome',
        icon: Globe,
        label: { en: 'Chrome Extension', ar: 'إضافة Chrome' },
      },
      {
        key: 'help',
        icon: Headphones,
        label: { en: 'Help & Support', ar: 'المساعدة والدعم' },
      },
    ],
  },
]

interface Props {
  active: NavKey
  onNavigate: (key: NavKey) => void
  className?: string
}

export function DashboardSidebar({ active, onNavigate, className }: Props) {
  const { lang } = useLanguage()
  const { navigate } = useRouter()
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const user = getCurrentUser()
  const userName = user?.name || 'aya abohadid'
  const userEmail = user?.email || 'ayayora1188@gmail.com'
  const initial = userName.trim().charAt(0).toUpperCase()

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-e border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex',
        className
      )}
    >
      {/* Brand header */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          <WLogo className="h-7 w-7 text-violet-600" />
          <span className="text-xl font-bold tracking-tight text-violet-600 dark:text-violet-400">
            wynt
          </span>
        </div>
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {sections.map((section) => (
          <div key={section.title.en}>
            <p className="mb-2 px-3 text-[11px] font-semibold tracking-widest text-slate-400 dark:text-slate-500">
              {section.title[lang]}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = active === item.key
                const Icon = item.icon
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.key)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-4 w-4 shrink-0',
                          isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-500 dark:text-slate-400'
                        )}
                      />
                      <span>{item.label[lang]}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        {/* Upgrade Plan CTA */}
        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/pricing')}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-emerald-600 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
          >
            <Zap className="h-4 w-4 shrink-0 fill-emerald-500 text-emerald-500 dark:fill-emerald-400 dark:text-emerald-400" />
            <span>{lang === 'ar' ? 'ترقية الخطة' : 'Upgrade Plan'}</span>
          </button>
        </div>
      </div>

      {/* VIEW toggle + user card */}
      <div className="shrink-0 border-t border-slate-200 px-3 py-3 dark:border-slate-800">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-semibold tracking-widest text-slate-400 dark:text-slate-500">
            {lang === 'ar' ? 'العرض' : 'VIEW'}
          </span>
          <div className="flex items-center gap-0.5 rounded-md bg-slate-100 p-0.5 dark:bg-slate-800">
            <button
              type="button"
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              className={cn(
                'flex h-6 w-7 items-center justify-center rounded transition-colors',
                viewMode === 'list'
                  ? 'bg-white text-violet-600 shadow-sm dark:bg-slate-900 dark:text-violet-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              className={cn(
                'flex h-6 w-7 items-center justify-center rounded transition-colors',
                viewMode === 'grid'
                  ? 'bg-white text-violet-600 shadow-sm dark:bg-slate-900 dark:text-violet-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2.5 rounded-lg px-1 py-1.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {userName}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{userEmail}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
