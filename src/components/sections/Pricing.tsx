import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with our core AI tools at no cost.',
    tokens: '100 tokens / month',
    cta: 'Start for Free',
    ctaVariant: 'outline' as const,
    popular: false,
    features: [
      'CV upload & AI scoring',
      '5 job matches / month',
      'Basic interview practice',
      '1 cover letter / month',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'Everything you need for an active job search.',
    tokens: '500 tokens / month',
    cta: 'Get Pro',
    ctaVariant: 'gradient' as const,
    popular: true,
    features: [
      'All Free features',
      'Unlimited job matches',
      'All 5 interview personas',
      'Voice interview sessions',
      'LinkedIn integration',
      'Salary negotiation coach',
      'Priority support',
    ],
  },
  {
    name: 'Teams',
    price: '$49',
    period: '/month',
    description: 'For career coaches & recruitment teams.',
    tokens: '2 000 tokens / month',
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    popular: false,
    features: [
      'All Pro features',
      'Up to 5 seats',
      'Team analytics dashboard',
      'Custom AI personas',
      'API access',
      'Dedicated account manager',
      'SLA guarantee',
    ],
  },
]

const tokenExamples = [
  { action: 'CV Upload & Score', tokens: 5 },
  { action: 'Job Deep Match', tokens: 3 },
  { action: 'Text Interview (30 min)', tokens: 10 },
  { action: 'Voice Interview (30 min)', tokens: 20 },
  { action: 'Cover Letter Gen', tokens: 8 },
  { action: 'LinkedIn Optimise', tokens: 12 },
]

export function Pricing() {
  const { t } = useLanguage()
  return (
    <section id="pricing" className="bg-slate-50 py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            {t('pricing.eyebrow')}
          </span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {t('pricing.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Plans */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map(({ name, price, period, description, tokens, cta, ctaVariant, popular, features }) => (
            <div
              key={name}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm dark:bg-slate-950',
                popular ? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-200 dark:border-slate-800'
              )}
            >
              {popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="gap-1 px-3 py-1">
                    <Zap className="h-3 w-3" /> {t('pricing.mostPopular')}
                  </Badge>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{name}</p>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">{price}</span>
                  <span className="mb-1 text-slate-500 dark:text-slate-400">{period}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                  <Zap className="h-3 w-3" /> {tokens}
                </div>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button variant={ctaVariant} size="lg" className="w-full">
                  {cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Token examples */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-center text-lg font-bold text-slate-900 dark:text-white">
            {t('pricing.tokensQuestion')}
          </h3>
          <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
            {t('pricing.tokensSub')}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tokenExamples.map(({ action, tokens }) => (
              <div
                key={action}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900"
              >
                <span className="text-sm text-slate-700 dark:text-slate-200">{action}</span>
                <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                  <Zap className="h-3 w-3" /> {tokens}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
