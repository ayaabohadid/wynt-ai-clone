import {
  Briefcase,
  ChevronRight,
  FileText,
  Search,
  ShoppingCart,
  Sparkles,
  Target,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import { getCurrentUser } from '@/lib/auth'
import { cn } from '@/lib/utils'
import type { NavKey } from '@/components/layout/DashboardSidebar'

/** Two-coins icon (lucide 1.9 has no Coins export) */
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

type KPIColor = 'violet' | 'teal' | 'amber'

const kpiIconStyles: Record<KPIColor, string> = {
  violet: 'bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400',
  teal: 'bg-teal-100 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400',
  amber: 'bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
}

interface Props {
  onNavigate: (key: NavKey) => void
}

export function DashboardOverview({ onNavigate }: Props) {
  const { lang } = useLanguage()
  const user = getCurrentUser()
  const firstName = user?.name?.split(' ')[0] || (lang === 'ar' ? 'أية' : 'Aya')
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const kpis: Array<{
    label: string
    value: string
    subtitle: string
    icon: React.FC<{ className?: string }>
    color: KPIColor
  }> = [
    {
      label: copy('TOKEN BALANCE', 'رصيد التوكنات'),
      value: '65',
      subtitle: copy('50/mo on Free', '50/شهر على المجاني'),
      icon: CoinsIcon,
      color: 'violet',
    },
    {
      label: copy('CVS UPLOADED', 'السِّيَر المرفوعة'),
      value: '0',
      subtitle: copy('Max 1 on Free', 'الحد الأقصى 1 على المجاني'),
      icon: FileText as unknown as React.FC<{ className?: string }>,
      color: 'violet',
    },
    {
      label: copy('WYNT INTELLIGENCE', 'ذكاء Wynt'),
      value: '0',
      subtitle: copy('Total analyses run', 'إجمالي التحليلات'),
      icon: Target as unknown as React.FC<{ className?: string }>,
      color: 'teal',
    },
    {
      label: copy('APPLICATIONS', 'الطلبات'),
      value: '0',
      subtitle: copy('In your tracker', 'في متتبّعك'),
      icon: Briefcase as unknown as React.FC<{ className?: string }>,
      color: 'amber',
    },
  ]

  const quickActions = [
    {
      title: copy('Wynt Live Feed', 'تغذية Wynt المباشرة'),
      desc: copy('Find your next opportunity', 'اعثر على فرصتك التالية'),
      icon: Search as React.FC<{ className?: string }>,
      color: 'violet' as KPIColor,
      nav: 'livefeed' as NavKey,
    },
    {
      title: copy('Upload CV', 'رفع السيرة الذاتية'),
      desc: copy('Add or manage your resumes', 'أضف أو أدر سيرك الذاتية'),
      icon: Upload as React.FC<{ className?: string }>,
      color: 'violet' as KPIColor,
      nav: 'cv' as NavKey,
    },
    {
      title: copy('Buy Tokens', 'شراء التوكنات'),
      desc: copy('Power your AI career tools', 'شغّل أدوات مسيرتك المهنية'),
      icon: ShoppingCart as React.FC<{ className?: string }>,
      color: 'teal' as KPIColor,
      nav: 'tokens' as NavKey,
    },
  ]

  type Pack = {
    name: string
    tokens: number
    price: string
    perToken: string
    badge?: string
    popular: boolean
  }

  const packs: Pack[] = [
    {
      name: 'Basic',
      tokens: 100,
      price: '$4.99',
      perToken: '$0.050/token',
      badge: copy('Save 17%', 'وفّر 17%'),
      popular: false,
    },
    {
      name: 'Pro',
      tokens: 400,
      price: '$15.99',
      perToken: '$0.040/token',
      badge: copy('Best Value', 'أفضل قيمة'),
      popular: true,
    },
    {
      name: 'Business',
      tokens: 750,
      price: '$26.99',
      perToken: '$0.036/token',
      badge: copy('Save 40%', 'وفّر 40%'),
      popular: false,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      {/* Welcome */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {copy(`Welcome back, ${firstName}`, `مرحبًا بعودتك، ${firstName}`)}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {copy(
            'Manage your career journey from one place.',
            'أدِر مسيرتك المهنية من مكان واحد.'
          )}
        </p>
      </section>

      {/* KPI cards */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                  {kpi.label}
                </p>
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', kpiIconStyles[kpi.color])}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{kpi.subtitle}</p>
            </div>
          )
        })}
      </section>

      {/* Quick actions */}
      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        {quickActions.map((qa) => {
          const Icon = qa.icon
          return (
            <button
              key={qa.title}
              type="button"
              onClick={() => onNavigate(qa.nav)}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-start shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50"
            >
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', kpiIconStyles[qa.color])}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">{qa.title}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{qa.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500 dark:text-slate-600" />
            </button>
          )
        })}
      </section>

      {/* Popular Token Packs */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <Sparkles className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            {copy('Popular Token Packs', 'باقات التوكنات الشائعة')}
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('tokens')}
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {copy('View All', 'عرض الكل')}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm dark:bg-slate-900',
                pack.popular
                  ? 'border-indigo-500 ring-2 ring-indigo-500/30 dark:border-indigo-400'
                  : 'border-slate-200 dark:border-slate-800'
              )}
            >
              {pack.popular && pack.badge && (
                <div className="absolute -top-3 end-4 flex items-center gap-1 rounded-full bg-indigo-900 px-2.5 py-1 text-xs font-semibold text-white shadow-sm dark:bg-indigo-700">
                  <span className="text-yellow-300">★</span>
                  {pack.badge}
                </div>
              )}

              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl',
                    pack.popular
                      ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                      : 'bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400'
                  )}
                >
                  <CoinsIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{pack.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {pack.tokens} {copy('Tokens', 'توكن')}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {pack.price}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{pack.perToken}</span>
              </div>

              {!pack.popular && pack.badge && (
                <span className="mt-2 inline-flex w-fit items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {pack.badge}
                </span>
              )}
              {pack.popular && (
                <span className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="h-3 w-3" />
                  {pack.badge}
                </span>
              )}

              <div className="mt-5 flex-1" />

              {pack.popular ? (
                <Button
                  variant="default"
                  size="lg"
                  className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {copy(`Get ${pack.tokens} Tokens`, `احصل على ${pack.tokens} توكن`)}
                </Button>
              ) : (
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  {copy(`Get ${pack.tokens} Tokens`, `احصل على ${pack.tokens} توكن`)}
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
