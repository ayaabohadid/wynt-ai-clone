import { useState } from 'react'
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Mail,
  Minus,
  Package,
  PieChart,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Tab = 'trends' | 'breakdown' | 'recent'

export function ApplyPilotAnalytics() {
  const { lang } = useLanguage()
  const [tab, setTab] = useState<Tab>('trends')
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const tabs: { value: Tab; label: Record<Lang, string>; icon: React.FC<{ className?: string }> }[] = [
    { value: 'trends', label: { en: 'Trends', ar: 'الاتجاهات' }, icon: BarChart3 as React.FC<{ className?: string }> },
    { value: 'breakdown', label: { en: 'Breakdown', ar: 'التقسيم' }, icon: PieChart as React.FC<{ className?: string }> },
    { value: 'recent', label: { en: 'Recent', ar: 'الأخيرة' }, icon: FileText as React.FC<{ className?: string }> },
  ]

  const kpis = [
    {
      label: copy('TOTAL PACKAGES', 'إجمالي الحزم'),
      value: '0',
      icon: Package,
      bg: 'bg-indigo-100 dark:bg-indigo-950/40',
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      label: copy('SUBMITTED', 'تم التقديم'),
      value: '0',
      icon: Send,
      bg: 'bg-emerald-100 dark:bg-emerald-950/40',
      color: 'text-emerald-600 dark:text-emerald-400',
      subline: copy('— 0% vs last week', '— 0% مقابل الأسبوع الماضي'),
    },
    {
      label: copy('SUCCESS RATE', 'نسبة النجاح'),
      value: '0%',
      icon: Target,
      bg: 'bg-indigo-100 dark:bg-indigo-950/40',
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      label: copy('AVG TOKENS', 'متوسط التوكنات'),
      value: '0',
      icon: Zap,
      bg: 'bg-amber-100 dark:bg-amber-950/40',
      color: 'text-amber-600 dark:text-amber-400',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {copy('Apply Pilot Analytics', 'تحليلات طيّار التقديم')}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'Track your application performance and trends',
              'تتبّع أداء طلباتك واتجاهاتها'
            )}
          </p>
        </div>
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
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                  {k.label}
                </p>
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', k.bg)}>
                  <Icon className={cn('h-4 w-4', k.color)} />
                </div>
              </div>
              <p className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {k.value}
              </p>
              {k.subline && (
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <Minus className="h-3 w-3" />
                  <span className="font-semibold text-slate-500 dark:text-slate-300">0%</span>{' '}
                  <span>{copy('vs last week', 'مقابل الأسبوع الماضي')}</span>
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Weekly Summary + Quick Insights */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Weekly Summary */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            {copy('Weekly Summary', 'ملخّص الأسبوع')}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {copy('This Week', 'هذا الأسبوع')}
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">0</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {copy('packages created', 'حزم تم إنشاؤها')}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {copy('Submitted', 'تم التقديم')}
              </p>
              <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">0</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {copy('applications sent', 'طلبات مُرسلة')}
              </p>
            </div>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            <Minus className="h-3 w-3" />
            {copy('Same as last week', 'مثل الأسبوع الماضي')}
          </div>
        </section>

        {/* Quick Insights */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            {copy('Quick Insights', 'رؤى سريعة')}
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            <InsightRow
              icon={CheckCircle2}
              iconColor="text-emerald-500"
              label={copy('Completion rate', 'نسبة الإكمال')}
              value="N/A"
            />
            <InsightRow
              icon={Mail}
              iconColor="text-blue-500"
              label={copy('Email applications', 'طلبات بريدية')}
              value="0"
            />
            <InsightRow
              icon={Globe}
              iconColor="text-indigo-500"
              label={copy('Direct link applications', 'طلبات روابط مباشرة')}
              value="0"
            />
            <InsightRow
              icon={Clock}
              iconColor="text-amber-500"
              label={copy('Pending review', 'قيد المراجعة')}
              value="0"
            />
          </ul>
        </section>
      </div>

      {/* Tab buttons */}
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = tab === t.value
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-slate-700'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4',
                  active ? 'text-indigo-600 dark:text-indigo-400' : ''
                )}
              />
              {t.label[lang]}
            </button>
          )
        })}
      </div>

      {/* Bottom chart card */}
      <section className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            {tab === 'trends' && copy('Weekly Application Trend', 'اتجاه الطلبات الأسبوعي')}
            {tab === 'breakdown' && copy('Status Breakdown', 'تقسيم الحالات')}
            {tab === 'recent' && copy('Recent Activity', 'النشاط الأخير')}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {tab === 'trends' && copy('Last 12 weeks', 'آخر 12 أسبوع')}
            {tab === 'breakdown' && copy('All time', 'كل الوقت')}
            {tab === 'recent' && copy('Last 30 days', 'آخر 30 يوم')}
          </span>
        </div>

        {/* Empty chart */}
        <div className="mt-8 flex h-56 flex-col items-center justify-center text-center">
          <BarChart3 className="h-10 w-10 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {copy('No data yet', 'لا توجد بيانات بعد')}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {copy(
              'Send your first application to start seeing analytics here.',
              'أرسل أوّل طلب لتبدأ رؤية التحليلات هنا.'
            )}
          </p>
        </div>
      </section>
    </div>
  )
}

function InsightRow({
  icon: Icon,
  iconColor,
  label,
  value,
}: {
  icon: React.FC<{ className?: string }>
  iconColor: string
  label: string
  value: string
}) {
  return (
    <li className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
        <Icon className={cn('h-4 w-4', iconColor)} />
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-500 dark:text-slate-300">{value}</span>
    </li>
  )
}
