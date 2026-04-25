import { useState } from 'react'
import { Briefcase, Filter, Globe, Power } from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/** Two-coins icon — lucide 1.9 has no Coins export */
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

const statusTabs: { value: string; label: Record<Lang, string> }[] = [
  { value: 'all', label: { en: 'All Jobs', ar: 'كل الوظائف' } },
  { value: 'new', label: { en: 'New', ar: 'جديد' } },
  { value: 'saved', label: { en: 'Saved', ar: 'محفوظ' } },
  { value: 'applied', label: { en: 'Applied', ar: 'تم التقديم' } },
  { value: 'declined', label: { en: 'Declined', ar: 'مرفوض' } },
]

const fitTabs: { value: string; label: Record<Lang, string>; dot?: string }[] = [
  { value: 'all', label: { en: 'All Fits', ar: 'كل التوافقات' } },
  { value: 'strong', label: { en: 'Strong Fit', ar: 'توافق قوي' }, dot: 'bg-emerald-500' },
  { value: 'good', label: { en: 'Good Match', ar: 'توافق جيد' }, dot: 'bg-blue-500' },
  { value: 'fair', label: { en: 'Fair Match', ar: 'توافق متوسط' }, dot: 'bg-amber-500' },
  { value: 'weak', label: { en: 'Weak Match', ar: 'توافق ضعيف' }, dot: 'bg-slate-400' },
]

export function BrowseJobs() {
  const { lang } = useLanguage()
  const [active, setActive] = useState(false)
  const [statusTab, setStatusTab] = useState('all')
  const [fitTab, setFitTab] = useState('all')

  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="mx-auto max-w-6xl">
      {/* Page header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {copy('Job Feed', 'تغذية الوظائف')}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {copy('0 jobs matched to your profile', '0 وظيفة مطابقة لملفك')}
        </p>
      </header>

      {/* Live Feed status card */}
      <section className="mt-5 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors',
            active
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          )}
        >
          <Power className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 dark:text-white">
            {active
              ? copy('Live Feed Active', 'التغذية المباشرة نشطة')
              : copy('Live Feed Inactive', 'التغذية المباشرة غير نشطة')}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <CoinsIcon className="h-3 w-3" />
              10 {copy('Tokens', 'توكن')}
            </span>
            <span>{copy('tokens per 50 new jobs', 'توكن لكل 50 وظيفة جديدة')}</span>
            <span>·</span>
            <span>
              {copy('Balance:', 'الرصيد:')}{' '}
              <strong className="text-slate-700 dark:text-slate-200">
                65 {copy('Tokens', 'توكن')}
              </strong>
            </span>
          </div>
        </div>
        <Toggle checked={active} onChange={setActive} />
      </section>

      {/* Coverage note */}
      <section className="mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
        <Globe className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-amber-900 dark:text-amber-200">
            {copy('Coverage Note', 'ملاحظة التغطية')}
          </p>
          <p className="mt-1 text-amber-800 dark:text-amber-300">
            {copy('Best results for:', 'أفضل النتائج في:')}{' '}
            <strong>GCC</strong>{' '}
            {copy(
              '(UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman),',
              '(الإمارات، السعودية، قطر، الكويت، البحرين، عُمان)،'
            )}{' '}
            <strong>UK</strong>, <strong>Ireland</strong>, <strong>Singapore</strong>,{' '}
            <strong>USA</strong>, <strong>Canada</strong>, <strong>Australia</strong>,{' '}
            {copy('and', 'و')} <strong>India</strong>.{' '}
            {copy(
              'Other regions may have limited listings depending on job board availability.',
              'المناطق الأخرى قد تحتوي على قوائم محدودة حسب توفّر منصّات التوظيف.'
            )}
          </p>
        </div>
      </section>

      {/* Tabs row */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap items-center gap-1">
          {statusTabs.map((t) => (
            <TabButton
              key={t.value}
              active={statusTab === t.value}
              onClick={() => setStatusTab(t.value)}
            >
              {t.label[lang]}
            </TabButton>
          ))}
        </div>
        <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-700" />
        <div className="flex flex-wrap items-center gap-1">
          {fitTabs.map((t) => (
            <TabButton
              key={t.value}
              active={fitTab === t.value}
              onClick={() => setFitTab(t.value)}
              dot={t.dot}
            >
              {t.label[lang]}
            </TabButton>
          ))}
        </div>
        <button
          type="button"
          className="ms-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Filter className="h-4 w-4" />
          {copy('Filters', 'فلاتر')}
        </button>
      </div>

      {/* Empty state */}
      <section className="mt-4 rounded-2xl border border-slate-200 bg-white py-20 text-center dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <Briefcase className="h-7 w-7 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
          {copy('No jobs yet', 'لا توجد وظائف بعد')}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          {copy(
            'Activate your Live Feed above to start receiving personalized job matches.',
            'فعِّل التغذية المباشرة بالأعلى لتبدأ استقبال مطابقات وظيفية شخصية.'
          )}
        </p>
      </section>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
        checked ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0.5 rtl:-translate-x-0.5'
        )}
      />
    </button>
  )
}

function TabButton({
  children,
  active,
  onClick,
  dot,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  dot?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'border border-slate-300 bg-white text-slate-900 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white'
          : 'border border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dot)} />}
      {children}
    </button>
  )
}
