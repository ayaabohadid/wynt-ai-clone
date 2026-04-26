import { type ComponentType } from 'react'
import {
  Brain,
  Briefcase,
  Building2,
  Clock,
  FileText,
  Gift,
  Mail,
  Mic2,
  Package,
  Search,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Target,
  TrendingUp,
  Wand2,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

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

type IconC = ComponentType<{ className?: string }>

const tokenCosts: {
  icon: IconC
  label: Record<Lang, string>
  cost: number
  bg: string
  color: string
}[] = [
  { icon: FileText as IconC, label: { en: 'CV Analysis', ar: 'تحليل السيرة' }, cost: 5, bg: 'bg-blue-100 dark:bg-blue-950/40', color: 'text-blue-600 dark:text-blue-400' },
  { icon: Wand2 as IconC, label: { en: 'CV Regeneration', ar: 'إعادة إنشاء السيرة' }, cost: 8, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { icon: Target as IconC, label: { en: 'Job Matching', ar: 'مطابقة الوظائف' }, cost: 5, bg: 'bg-violet-100 dark:bg-violet-950/40', color: 'text-violet-600 dark:text-violet-400' },
  { icon: Mail as IconC, label: { en: 'Cover Letter', ar: 'رسالة تقديم' }, cost: 5, bg: 'bg-emerald-100 dark:bg-emerald-950/40', color: 'text-emerald-600 dark:text-emerald-400' },
  { icon: Sparkles as IconC, label: { en: 'Auto-Apply', ar: 'تقديم تلقائي' }, cost: 10, bg: 'bg-emerald-100 dark:bg-emerald-950/40', color: 'text-emerald-600 dark:text-emerald-400' },
  { icon: Brain as IconC, label: { en: 'Interview Prep', ar: 'تحضير مقابلة' }, cost: 12, bg: 'bg-amber-100 dark:bg-amber-950/40', color: 'text-amber-600 dark:text-amber-400' },
  { icon: Mic2 as IconC, label: { en: 'Voice Interview', ar: 'مقابلة صوتية' }, cost: 20, bg: 'bg-rose-100 dark:bg-rose-950/40', color: 'text-rose-600 dark:text-rose-400' },
  { icon: LinkedinIcon, label: { en: 'LinkedIn Analysis', ar: 'تحليل LinkedIn' }, cost: 5, bg: 'bg-blue-100 dark:bg-blue-950/40', color: 'text-blue-600 dark:text-blue-400' },
  { icon: Building2 as IconC, label: { en: 'Company Lookup', ar: 'بحث عن شركة' }, cost: 1, bg: 'bg-slate-100 dark:bg-slate-800', color: 'text-slate-600 dark:text-slate-300' },
  { icon: Zap as IconC, label: { en: 'Live Feed (per 50 jobs)', ar: 'تغذية مباشرة (لكل 50 وظيفة)' }, cost: 10, bg: 'bg-indigo-100 dark:bg-indigo-950/40', color: 'text-indigo-600 dark:text-indigo-400' },
  { icon: Sparkles as IconC, label: { en: 'Coach (after 10 free/day)', ar: 'المدرّب (بعد 10 مجانية/يوم)' }, cost: 1, bg: 'bg-rose-100 dark:bg-rose-950/40', color: 'text-rose-600 dark:text-rose-400' },
  { icon: Search as IconC, label: { en: 'Job Search', ar: 'بحث الوظائف' }, cost: 2, bg: 'bg-indigo-100 dark:bg-indigo-950/40', color: 'text-indigo-600 dark:text-indigo-400' },
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
    name: { en: 'Starter', ar: 'مبتدئ' },
    price: '$2.99',
    perToken: '$0.060/token',
    includes: {
      en: ['10 CV analyses', '10 cover letters', '4 interview preps'],
      ar: ['10 تحليلات سيرة', '10 رسائل تقديم', '4 تحضيرات مقابلة'],
    },
  },
  {
    tokens: 100,
    name: { en: 'Basic', ar: 'أساسي' },
    price: '$4.99',
    perToken: '$0.050/token',
    discount: '17% off',
    saveLabel: 'SAVE 17%',
    includes: {
      en: ['20 CV analyses', '20 cover letters', '8 interview preps', '5 voice interviews'],
      ar: ['20 تحليل سيرة', '20 رسالة تقديم', '8 تحضير مقابلة', '5 مقابلات صوتية'],
    },
  },
  {
    tokens: 200,
    name: { en: 'Growth', ar: 'نمو' },
    price: '$8.99',
    perToken: '$0.045/token',
    discount: '25% off',
    saveLabel: 'SAVE 25%',
    includes: {
      en: [
        '40 CV analyses',
        '40 cover letters',
        '16 interview preps',
        '10 voice interviews',
      ],
      ar: ['40 تحليل سيرة', '40 رسالة تقديم', '16 تحضير مقابلة', '10 مقابلات صوتية'],
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
        '80 تحليل سيرة',
        '50 تخصيص سيرة',
        '33 تحضير مقابلة',
        '20 مقابلة صوتية',
        '40 حزمة تقديم تلقائي',
      ],
    },
  },
  {
    tokens: 750,
    name: { en: 'Business', ar: 'أعمال' },
    price: '$26.99',
    perToken: '$0.036/token',
    discount: '40% off',
    saveLabel: 'SAVE 40%',
    includes: {
      en: [
        '150 CV analyses',
        '93 CV tailorings',
        '62 interview preps',
        '37 voice interviews',
        '75 auto-apply packages',
      ],
      ar: [
        '150 تحليل سيرة',
        '93 تخصيص سيرة',
        '62 تحضير مقابلة',
        '37 مقابلة صوتية',
        '75 حزمة تقديم تلقائي',
      ],
    },
  },
  {
    tokens: 1000,
    name: { en: 'Enterprise', ar: 'مؤسّسات' },
    price: '$32.99',
    perToken: '$0.033/token',
    discount: '45% off',
    saveLabel: 'SAVE 45%',
    includes: {
      en: [
        '200 CV analyses',
        '125 CV tailorings',
        '83 interview preps',
        '50 voice interviews',
        '100 auto-apply packages',
      ],
      ar: [
        '200 تحليل سيرة',
        '125 تخصيص سيرة',
        '83 تحضير مقابلة',
        '50 مقابلة صوتية',
        '100 حزمة تقديم تلقائي',
      ],
    },
  },
  {
    tokens: 1500,
    name: { en: 'Ultimate', ar: 'الأقصى' },
    price: '$44.99',
    perToken: '$0.030/token',
    discount: '50% off',
    saveLabel: 'SAVE 50%',
    includes: {
      en: [
        '300 CV analyses',
        '187 CV tailorings',
        '125 interview preps',
        '75 voice interviews',
        '150 auto-apply packages',
      ],
      ar: [
        '300 تحليل سيرة',
        '187 تخصيص سيرة',
        '125 تحضير مقابلة',
        '75 مقابلة صوتية',
        '150 حزمة تقديم تلقائي',
      ],
    },
  },
]

const miniPacks = [
  { tokens: 10, price: '$0.99', cents: '9.9' },
  { tokens: 25, price: '$1.99', cents: '8.0' },
  { tokens: 50, price: '$3.49', cents: '7.0' },
  { tokens: 75, price: '$4.49', cents: '6.0' },
]

export function PricingPage() {
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const features = [
    {
      icon: Gift,
      bg: 'bg-violet-100 dark:bg-violet-950/40',
      color: 'text-violet-600 dark:text-violet-400',
      title: copy('50 Free Tokens', '50 توكن مجاني'),
      desc: copy(
        'Every new account gets 50 tokens to explore all features',
        'كل حساب جديد يحصل على 50 توكن لتجربة كل المميزات'
      ),
    },
    {
      icon: Clock,
      bg: 'bg-blue-100 dark:bg-blue-950/40',
      color: 'text-blue-600 dark:text-blue-400',
      title: copy('Tokens Never Expire', 'التوكنات لا تنتهي'),
      desc: copy(
        'Use your tokens at your own pace — no monthly reset',
        'استخدم توكناتك على راحتك — لا إعادة تعيين شهرية'
      ),
    },
    {
      icon: Shield,
      bg: 'bg-indigo-100 dark:bg-indigo-950/40',
      color: 'text-indigo-600 dark:text-indigo-400',
      title: copy('Secure Payments', 'دفع آمن'),
      desc: copy(
        'Powered by Stripe with bank-grade encryption',
        'مدعوم بواسطة Stripe بتشفير على مستوى البنوك'
      ),
    },
    {
      icon: TrendingUp,
      bg: 'bg-emerald-100 dark:bg-emerald-950/40',
      color: 'text-emerald-600 dark:text-emerald-400',
      title: copy('Volume Savings', 'توفير بالكمّ'),
      desc: copy(
        'Bigger packs mean lower cost per token',
        'الباقات الأكبر تعني تكلفة أقل لكل توكن'
      ),
    },
  ]

  return (
    <div
      className="min-h-screen bg-white font-sans antialiased dark:bg-slate-950 dark:text-slate-100"
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Soft gradient backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[640px] bg-gradient-to-b from-violet-50/40 via-indigo-50/30 to-transparent dark:from-violet-950/20 dark:via-indigo-950/10"
        />

        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 text-center sm:px-6 lg:px-8 lg:pt-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            {copy('Pay-As-You-Go Tokens', 'توكنات ادفع حسب الاستخدام')}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            {copy('Buy Tokens,', 'اشترِ توكنات،')}{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {copy('Use Anytime', 'استخدمها وقت ما تحب')}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
            {copy(
              'No subscriptions. No monthly fees. Purchase token packs and use them across all AI features at your own pace. Tokens never expire.',
              'بدون اشتراكات. بدون رسوم شهرية. اشترِ باقات توكنات واستخدمها عبر كل مميزات الذكاء الاصطناعي بسرعتك الخاصة. التوكنات لا تنتهي صلاحيتها.'
            )}
          </p>

          {/* 4 feature cards */}
          <div className="mt-12 grid gap-4 text-start sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                        f.bg
                      )}
                    >
                      <Icon className={cn('h-5 w-5', f.color)} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white">{f.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Token Packs */}
        <section className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <Package className="h-3.5 w-3.5 text-indigo-500" />
            {copy('Token Packs', 'باقات التوكنات')}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {copy('Choose Your Token Pack', 'اختر باقة التوكنات')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            {copy(
              'Larger packs offer better value. Pick the size that fits your career goals.',
              'الباقات الأكبر توفّر قيمة أفضل. اختر الحجم المناسب لأهدافك المهنية.'
            )}
          </p>

          <div className="mt-8 grid gap-5 text-start sm:grid-cols-2 lg:grid-cols-4">
            {packs.map((p) => (
              <PackCard key={p.tokens} pack={p} />
            ))}
          </div>
        </section>

        {/* Quick Top-Ups */}
        <section className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <Zap className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            {copy('Quick Top-Ups', 'إعادة شحن سريعة')}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {copy('Need a Quick Refill?', 'محتاج إعادة شحن سريعة؟')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            {copy(
              'Running low? Grab a quick top-up to keep your momentum going.',
              'رصيدك على وشك ينتهي؟ خد إعادة شحن سريعة عشان تكمّل بنفس الزخم.'
            )}
          </p>
          <div className="mt-8 grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
            {miniPacks.map((m) => (
              <div
                key={m.tokens}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                  <Zap className="h-4 w-4" />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                  {m.tokens}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {copy('tokens', 'توكن')}
                </p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {m.price}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {m.cents}¢ {copy('per token', 'لكل توكن')}
                </p>
                <Button variant="outline" className="mt-5 w-full">
                  {copy('Top Up', 'إعادة شحن')}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Token Costs / What Each Action Costs */}
        <section className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <Tag className="h-3.5 w-3.5 text-indigo-500" />
            {copy('Token Costs', 'تكاليف التوكنات')}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {copy('What Each Action Costs', 'كم يكلّف كل إجراء')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            {copy(
              'Transparent pricing for every AI-powered feature. No hidden fees.',
              'تسعير شفاف لكل ميزة مدعومة بالذكاء الاصطناعي. لا رسوم خفية.'
            )}
          </p>
          <div className="mt-8 grid gap-3 text-start sm:grid-cols-2 lg:grid-cols-3">
            {tokenCosts.map((c) => {
              const Icon = c.icon
              return (
                <div
                  key={c.label.en}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', c.bg)}>
                      <Icon className={cn('h-4 w-4', c.color)} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {c.label[lang]}
                    </span>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                    {c.cost} {copy('tokens', 'توكن')}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function PackCard({ pack }: { pack: Pack }) {
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition-all dark:bg-slate-900',
        pack.bestValue
          ? 'border-indigo-500 ring-2 ring-indigo-500/30 dark:border-indigo-500'
          : 'border-slate-200 dark:border-slate-800'
      )}
    >
      {pack.bestValue && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          <Star className="h-3 w-3 fill-white" />
          {copy('BEST VALUE', 'أفضل قيمة')}
        </span>
      )}
      {pack.saveLabel && !pack.bestValue && (
        <span className="absolute -top-3 right-3 inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          {pack.saveLabel}
        </span>
      )}
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          <Package className="h-4 w-4" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{pack.tokens}</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {copy('tokens', 'توكن')}
          </span>
        </div>
      </div>
      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        {pack.name[lang]}
      </p>
      <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {pack.price}
      </p>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
        {pack.perToken}
        {pack.discount && (
          <>
            {' '}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              ({pack.discount})
            </span>
          </>
        )}
      </p>
      <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {pack.includes[lang].map((line) => (
          <li key={line} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
            {line}
          </li>
        ))}
      </ul>
      <Button
        variant={pack.bestValue ? 'default' : 'outline'}
        className={cn(
          'mt-5 w-full gap-2',
          pack.bestValue && 'bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600'
        )}
      >
        <ShoppingCart className="h-4 w-4" />
        {copy(`Buy ${pack.tokens} Tokens`, `اشترِ ${pack.tokens} توكن`)}
      </Button>
    </div>
  )
}
