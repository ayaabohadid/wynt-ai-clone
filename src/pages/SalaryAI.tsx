import { useState } from 'react'
import { BarChart3, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function SalaryAI() {
  const { lang } = useLanguage()
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [years, setYears] = useState('')
  const [skills, setSkills] = useState('')

  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const canSubmit = jobTitle.trim().length > 0

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {copy('Salary Negotiation AI', 'ذكاء التفاوض على الراتب')}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {copy(
            'Market salary data, tips, and negotiation scripts',
            'بيانات راتب السوق، نصائح، ونصوص تفاوضية'
          )}
        </p>
      </header>

      {/* Form card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={copy('Job Title', 'المسمى الوظيفي')}
            required
          >
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder={copy('e.g. Senior Product Manager', 'مثال: مدير منتج أول')}
              className={inputClass}
            />
          </Field>

          <Field label={copy('Company (optional)', 'الشركة (اختياري)')}>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={copy('e.g. Meta', 'مثال: Meta')}
              className={inputClass}
            />
          </Field>

          <Field label={copy('Location (optional)', 'الموقع (اختياري)')}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={copy('e.g. Dubai, UAE', 'مثال: دبي، الإمارات')}
              className={inputClass}
            />
          </Field>

          <Field label={copy('Years of Experience', 'سنوات الخبرة')}>
            <input
              type="number"
              inputMode="numeric"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder={copy('e.g. 8', 'مثال: 8')}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field label={copy('Key Skills (comma-separated)', 'المهارات الأساسية (مفصولة بفواصل)')}>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder={copy(
                'e.g. Python, Machine Learning, AWS, Team Leadership',
                'مثال: Python، تعلّم الآلة، AWS، قيادة فِرَق'
              )}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Token cost notice */}
        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {copy('Each salary analysis costs ', 'كل تحليل راتب يكلّف ')}
            <strong>5 {copy('tokens', 'توكنات')}</strong>
            {copy(
              '. Includes market data, tips, and a negotiation script.',
              '. يتضمّن بيانات السوق، النصائح، ونص التفاوض.'
            )}
          </p>
        </div>

        {/* Submit */}
        <Button
          variant="default"
          size="lg"
          disabled={!canSubmit}
          className={cn(
            'mt-5 w-full gap-2 bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-600',
            !canSubmit && 'bg-violet-400 hover:bg-violet-400 dark:bg-violet-700/50'
          )}
        >
          <BarChart3 className="h-4 w-4" />
          {copy('Analyze Salary', 'حلّل الراتب')}
        </Button>
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
        {required && <span className="ms-0.5 text-rose-500">*</span>}
      </label>
      {children}
    </div>
  )
}
