import { useState } from 'react'
import {
  Bell,
  CheckCircle2,
  CreditCard,
  Lock,
  Package,
  PieChart,
  Settings,
  Shield,
  ShoppingCart,
  Star,
  Tag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage, type Lang } from '@/lib/i18n'
import { getCurrentUser } from '@/lib/auth'
import { cn } from '@/lib/utils'

type Tab = 'tokens' | 'billing' | 'usage' | 'costs' | 'privacy' | 'security' | 'notifications'

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

const tabs: { value: Tab; label: Record<Lang, string>; icon: React.FC<{ className?: string }> }[] = [
  { value: 'tokens', label: { en: 'Tokens', ar: 'التوكنات' }, icon: ShoppingCart as React.FC<{ className?: string }> },
  { value: 'billing', label: { en: 'Billing', ar: 'الفوترة' }, icon: CreditCard as React.FC<{ className?: string }> },
  { value: 'usage', label: { en: 'Usage', ar: 'الاستخدام' }, icon: PieChart as React.FC<{ className?: string }> },
  { value: 'costs', label: { en: 'Costs', ar: 'التكاليف' }, icon: Tag as React.FC<{ className?: string }> },
  { value: 'privacy', label: { en: 'Privacy', ar: 'الخصوصية' }, icon: Shield as React.FC<{ className?: string }> },
  { value: 'security', label: { en: 'Security', ar: 'الأمان' }, icon: Lock as React.FC<{ className?: string }> },
  { value: 'notifications', label: { en: 'Notifications', ar: 'الإشعارات' }, icon: Bell as React.FC<{ className?: string }> },
]

type Pack = {
  tokens: number
  name: Record<Lang, string>
  price: string
  perToken: string
  discount?: string
  saveLabel?: string
  bestValue?: boolean
  includes: Record<Lang, string[]>
}

const packs: Pack[] = [
  {
    tokens: 50,
    name: { en: 'Starter', ar: 'البداية' },
    price: '$2.99',
    perToken: '$0.060/token',
    includes: {
      en: ['10 CV analyses', '10 cover letters', '4 interview preps'],
      ar: ['10 تحليلات سيرة ذاتية', '10 رسائل تقديم', '4 تحضيرات مقابلة'],
    },
  },
  {
    tokens: 100,
    name: { en: 'Basic', ar: 'الأساسي' },
    price: '$4.99',
    perToken: '$0.050/token',
    discount: '17% off',
    saveLabel: 'SAVE 17%',
    includes: {
      en: ['20 CV analyses', '20 cover letters', '8 interview preps', '5 voice interviews'],
      ar: ['20 تحليل سيرة ذاتية', '20 رسالة تقديم', '8 تحضيرات مقابلة', '5 مقابلات صوتية'],
    },
  },
  {
    tokens: 200,
    name: { en: 'Growth', ar: 'النمو' },
    price: '$8.99',
    perToken: '$0.045/token',
    discount: '25% off',
    saveLabel: 'SAVE 25%',
    includes: {
      en: ['40 CV analyses', '40 cover letters', '16 interview preps', '10 voice interviews'],
      ar: ['40 تحليل سيرة ذاتية', '40 رسالة تقديم', '16 تحضير مقابلة', '10 مقابلات صوتية'],
    },
  },
  {
    tokens: 400,
    name: { en: 'Pro', ar: 'احترافي' },
    price: '$15.99',
    perToken: '$0.040/token',
    discount: '33% off',
    bestValue: true,
    includes: {
      en: [
        '80 CV analyses',
        '50 CV tailorings',
        '33 interview preps',
        '20 voice interviews',
        '40 auto-apply packages',
      ],
      ar: [
        '80 تحليل سيرة ذاتية',
        '50 تخصيص سيرة',
        '33 تحضير مقابلة',
        '20 مقابلة صوتية',
        '40 حزمة تقديم تلقائي',
      ],
    },
  },
]

export function SettingsBilling() {
  const { lang } = useLanguage()
  const [tab, setTab] = useState<Tab>('tokens')
  const user = getCurrentUser()
  const userName = user?.name || 'Aya Abo Hadid'
  const userEmail = user?.email || 'ayaabohadid@gmail.com'
  const initial = userName.trim().charAt(0).toUpperCase()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <header className="flex items-center gap-3">
        <Settings className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {copy('Settings & Billing', 'الإعدادات والفوترة')}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {copy('Tokens, billing, and usage', 'التوكنات والفوترة والاستخدام')}
          </p>
        </div>
      </header>

      {/* User card */}
      <section className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-slate-900 dark:text-white">{userName}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{userEmail}</p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
            <CoinsIcon className="h-3 w-3" />
            65 {copy('tokens', 'توكنات')}
          </span>
        </div>
      </section>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-1">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = tab === t.value
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
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

      {/* Tab content */}
      {tab === 'tokens' && <TokensPane lang={lang} copy={copy} />}
      {tab !== 'tokens' && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {copy(
              `${tabs.find((t) => t.value === tab)?.label.en} settings will appear here.`,
              `إعدادات ${tabs.find((t) => t.value === tab)?.label.ar} ستظهر هنا.`
            )}
          </p>
        </section>
      )}
    </div>
  )
}

function TokensPane({
  lang,
  copy,
}: {
  lang: Lang
  copy: (en: string, ar: string) => string
}) {
  return (
    <div className="mt-5">
      <h2 className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        <Package className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        {copy('Token Packs', 'باقات التوكنات')}
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {copy(
          'Larger packs offer better value. Pick the size that fits your career goals.',
          'الباقات الأكبر تقدّم قيمة أفضل. اختر الحجم المناسب لأهدافك المهنية.'
        )}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {packs.map((p) => (
          <div
            key={p.tokens}
            className={cn(
              'relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm dark:bg-slate-900',
              p.bestValue
                ? 'border-indigo-500 ring-2 ring-indigo-500/30 dark:border-indigo-400'
                : 'border-slate-200 dark:border-slate-800'
            )}
          >
            {/* Top badge */}
            {p.bestValue ? (
              <div className="absolute -top-3 end-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                <Star className="h-3 w-3 fill-white" />
                {copy('BEST VALUE', 'أفضل قيمة')}
              </div>
            ) : p.saveLabel ? (
              <div className="absolute -top-3 end-4 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                {copy(p.saveLabel, p.saveLabel.replace('SAVE', 'وفّر'))}
              </div>
            ) : null}

            {/* Header */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl',
                  p.bestValue
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                    : 'bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400'
                )}
              >
                <CoinsIcon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {p.tokens}{' '}
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {copy('tokens', 'توكن')}
                  </span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.name[lang]}</p>
              </div>
            </div>

            {/* Price */}
            <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {p.price}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {p.perToken}
              {p.discount && (
                <span className="ms-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  ({copy(p.discount, p.discount.replace('off', 'خصم'))})
                </span>
              )}
            </p>

            {/* Includes */}
            <p className="mt-5 text-[11px] font-semibold tracking-widest text-slate-500 dark:text-slate-400">
              {copy('INCLUDES', 'يتضمّن')}
            </p>
            <ul className="mt-2 space-y-1.5">
              {p.includes[lang].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {line}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-5 flex-1" />
            <Button
              variant={p.bestValue ? 'default' : 'outline'}
              className={cn(
                'w-full gap-2',
                p.bestValue && 'bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600'
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              {copy(`Buy ${p.tokens} Tokens`, `اشترِ ${p.tokens} توكن`)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
