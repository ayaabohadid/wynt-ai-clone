import type { ComponentType } from 'react'
import {
  Brain,
  DollarSign,
  FileText,
  LayoutGrid,
  Mail,
  PanelLeft,
  Search,
  Sparkles,
  Target,
} from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type IconComponent = ComponentType<{ className?: string }>

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

type Item = {
  key: NavKey
  icon: IconComponent
  label: Record<Lang, string>
}

type Section = {
  title: Record<Lang, string>
  items: Item[]
}

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
]

interface Props {
  active: NavKey
  onNavigate: (key: NavKey) => void
  className?: string
}

function WLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
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

export function DashboardSidebar({ active, onNavigate, className }: Props) {
  const { lang } = useLanguage()

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-e border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:block',
        className
      )}
    >
      {/* Brand header */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
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

      {/* Sections */}
      <div className="px-3 py-4 space-y-5">
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
      </div>
    </aside>
  )
}
