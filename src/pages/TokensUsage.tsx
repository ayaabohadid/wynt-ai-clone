import { useState } from 'react'
import {
  BarChart3,
  FileText,
  Mail,
  Mic2,
  PieChart,
  RefreshCw,
  Send,
  ShoppingCart,
  Sparkles,
  Tag,
  Target,
  TrendingUp,
  Wand2,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

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

type Range = '7d' | '14d' | '30d'

const tokenCosts: {
  icon: React.FC<{ className?: string }>
  label: Record<Lang, string>
  cost: number
  bg: string
  color: string
}[] = [
  { icon: FileText as React.FC<{ className?: string }>, label: { en: 'CV Analysis', ar: 'تحليل السيرة' }, cost: 5, bg: 'bg-blue-100 dark:bg-blue-950/40', color: 'text-blue-600 dark:text-blue-400' },
  { icon: RefreshCw as React.FC<{ className?: string }>, label: { en: 'CV Regeneration', ar: 'إعادة إنشاء السيرة' }, cost: 8, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { icon: Target as React.FC<{ className?: string }>, label: { en: 'Job Matching', ar: 'مطابقة الوظائف' }, cost: 5, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { icon: Mail as React.FC<{ className?: string }>, label: { en: 'Cover Letter', ar: 'رسالة تقديم' }, cost: 4, bg: 'bg-emerald-100 dark:bg-emerald-950/40', color: 'text-emerald-600 dark:text-emerald-400' },
  { icon: Mic2 as React.FC<{ className?: string }>, label: { en: 'Voice Interview', ar: 'مقابلة صوتية' }, cost: 20, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { icon: Wand2 as React.FC<{ className?: string }>, label: { en: 'Text Interview', ar: 'مقابلة نصية' }, cost: 10, bg: 'bg-amber-100 dark:bg-amber-950/40', color: 'text-amber-600 dark:text-amber-400' },
  { icon: Send as React.FC<{ className?: string }>, label: { en: 'Auto-Apply', ar: 'تقديم تلقائي' }, cost: 10, bg: 'bg-indigo-100 dark:bg-indigo-950/40', color: 'text-indigo-600 dark:text-indigo-400' },
  { icon: LinkedinIcon, label: { en: 'LinkedIn Optimise', ar: 'تحسين LinkedIn' }, cost: 12, bg: 'bg-blue-100 dark:bg-blue-950/40', color: 'text-blue-600 dark:text-blue-400' },
  { icon: TrendingUp as React.FC<{ className?: string }>, label: { en: 'Salary Analysis', ar: 'تحليل الراتب' }, cost: 5, bg: 'bg-emerald-100 dark:bg-emerald-950/40', color: 'text-emerald-600 dark:text-emerald-400' },
]

export function TokensUsage() {
  const { lang } = useLanguage()
  const [range, setRange] = useState<Range>('30d')
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const kpis = [
    {
      label: copy('Balance', 'الرصيد'),
      value: '65',
      sub: copy('of 50/mo', 'من 50/شهر'),
      icon: CoinsIcon,
      bg: 'bg-indigo-100 dark:bg-indigo-950/40',
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      label: copy('Total Spent', 'إجمالي المُنفَق'),
      value: '0',
      sub: copy('0 Actions', '0 إجراء'),
      icon: TrendingUp,
      bg: 'bg-emerald-100 dark:bg-emerald-950/40',
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: copy('Avg / Action', 'المتوسط / إجراء'),
      value: '0',
      sub: copy('tokens per use', 'توكن لكل استخدام'),
      icon: BarChart3,
      bg: 'bg-indigo-100 dark:bg-indigo-950/40',
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      label: copy('Utilization', 'الاستفادة'),
      value: '0%',
      sub: copy('Free Plan', 'الخطة المجانية'),
      icon: Zap,
      bg: 'bg-amber-100 dark:bg-amber-950/40',
      color: 'text-amber-600 dark:text-amber-400',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {copy('Tokens & Usage', 'التوكنات والاستخدام')}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'Analytics, spending breakdown, and investment insights.',
              'تحليلات، توزيع الإنفاق، ورؤى الاستثمار.'
            )}
          </p>
        </div>
        <Button
          variant="default"
          size="lg"
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
        >
          <ShoppingCart className="h-4 w-4" />
          {copy('Buy Tokens', 'اشترِ توكنات')}
        </Button>
      </div>

      {/* 4 KPI cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <div
              key={k.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-2">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', k.bg)}>
                  <Icon className={cn('h-4 w-4', k.color)} />
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {k.label}
                </p>
              </div>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {k.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{k.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Token Balance card */}
      <section className="mt-5 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-5 dark:border-indigo-900/40 dark:from-indigo-950/30 dark:to-violet-950/30">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <CoinsIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            {copy('Token Balance', 'رصيد التوكنات')}
          </h2>
          <span className="rounded-md bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            {copy('Pay-As-You-Go', 'ادفع حسب الاستخدام')}
          </span>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
            65
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {copy('tokens available', 'توكن متاح')}
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {copy(
            'Tokens never expire. Purchase more anytime.',
            'التوكنات لا تنتهي صلاحيتها. اشترِ المزيد في أي وقت.'
          )}
        </p>
      </section>

      {/* Usage Analytics */}
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            {copy('Usage Analytics', 'تحليلات الاستخدام')}
          </h2>
          <div className="flex items-center gap-1">
            {(['7d', '14d', '30d'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                  range === r
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Two-up: Spending Breakdown + Token Costs */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Spending Breakdown */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <PieChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            {copy('Spending Breakdown', 'توزيع الإنفاق')}
          </h2>
          <div className="mt-12 mb-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {copy('No spending data yet.', 'لا توجد بيانات إنفاق بعد.')}
            </p>
          </div>
        </section>

        {/* Token Costs */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Tag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            {copy('Token Costs', 'تكاليف التوكنات')}
          </h2>
          <ul className="mt-4 space-y-3">
            {tokenCosts.map((c) => {
              const Icon = c.icon
              return (
                <li
                  key={c.label.en}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', c.bg)}>
                      <Icon className={cn('h-4 w-4', c.color)} />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {c.label[lang]}
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {c.cost} {copy('tokens', 'توكن')}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}
