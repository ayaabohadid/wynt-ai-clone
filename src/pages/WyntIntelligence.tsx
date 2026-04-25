import { useState } from 'react'
import {
  ChevronDown,
  Globe,
  Link as LinkIcon,
  Plus,
  Search,
  Sparkles,
  Target,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Tab = 'manual' | 'url' | 'wizard'

const tabs: { value: Tab; label: Record<Lang, string>; icon: React.FC<{ className?: string }> }[] = [
  { value: 'manual', label: { en: 'Manual Search', ar: 'بحث يدوي' }, icon: Search as React.FC<{ className?: string }> },
  { value: 'url', label: { en: 'Paste URL', ar: 'لصق رابط' }, icon: LinkIcon as React.FC<{ className?: string }> },
  { value: 'wizard', label: { en: 'AI Wizard', ar: 'المساعد الذكي' }, icon: Sparkles as React.FC<{ className?: string }> },
]

const countries: { value: string; label: Record<Lang, string> }[] = [
  { value: 'all', label: { en: 'All countries', ar: 'كل الدول' } },
  { value: 'ae', label: { en: 'United Arab Emirates', ar: 'الإمارات' } },
  { value: 'sa', label: { en: 'Saudi Arabia', ar: 'السعودية' } },
  { value: 'eg', label: { en: 'Egypt', ar: 'مصر' } },
  { value: 'uk', label: { en: 'United Kingdom', ar: 'المملكة المتحدة' } },
  { value: 'us', label: { en: 'United States', ar: 'الولايات المتحدة' } },
  { value: 'de', label: { en: 'Germany', ar: 'ألمانيا' } },
  { value: 'sg', label: { en: 'Singapore', ar: 'سنغافورة' } },
  { value: 'in', label: { en: 'India', ar: 'الهند' } },
]

const cities: { value: string; label: Record<Lang, string> }[] = [
  { value: 'all', label: { en: 'All cities', ar: 'كل المدن' } },
  { value: 'dubai', label: { en: 'Dubai', ar: 'دبي' } },
  { value: 'riyadh', label: { en: 'Riyadh', ar: 'الرياض' } },
  { value: 'cairo', label: { en: 'Cairo', ar: 'القاهرة' } },
  { value: 'london', label: { en: 'London', ar: 'لندن' } },
  { value: 'newyork', label: { en: 'New York', ar: 'نيويورك' } },
  { value: 'berlin', label: { en: 'Berlin', ar: 'برلين' } },
]

const experienceLevels: { value: string; label: Record<Lang, string> }[] = [
  { value: 'any', label: { en: 'Any level', ar: 'أي مستوى' } },
  { value: 'intern', label: { en: 'Internship', ar: 'تدريب' } },
  { value: 'junior', label: { en: 'Junior', ar: 'مبتدئ' } },
  { value: 'mid', label: { en: 'Mid-level', ar: 'متوسط' } },
  { value: 'senior', label: { en: 'Senior', ar: 'أول' } },
  { value: 'lead', label: { en: 'Lead / Staff', ar: 'قائد / Staff' } },
  { value: 'exec', label: { en: 'Executive', ar: 'تنفيذي' } },
]

const jobTypes: { value: string; label: Record<Lang, string> }[] = [
  { value: 'any', label: { en: 'Any type', ar: 'أي نوع' } },
  { value: 'fulltime', label: { en: 'Full-time', ar: 'دوام كامل' } },
  { value: 'parttime', label: { en: 'Part-time', ar: 'دوام جزئي' } },
  { value: 'contract', label: { en: 'Contract', ar: 'عقد' } },
  { value: 'freelance', label: { en: 'Freelance', ar: 'حر' } },
  { value: 'internship', label: { en: 'Internship', ar: 'تدريب' } },
]

const datePosted: { value: string; label: Record<Lang, string> }[] = [
  { value: 'any', label: { en: 'Any time', ar: 'أي وقت' } },
  { value: '24h', label: { en: 'Past 24 hours', ar: 'آخر 24 ساعة' } },
  { value: 'week', label: { en: 'Past week', ar: 'الأسبوع الماضي' } },
  { value: 'month', label: { en: 'Past month', ar: 'الشهر الماضي' } },
]

export function WyntIntelligence() {
  const { lang } = useLanguage()
  const [tab, setTab] = useState<Tab>('manual')
  const [keywords, setKeywords] = useState('')
  const [country, setCountry] = useState('all')
  const [city, setCity] = useState('all')
  const [industry, setIndustry] = useState('')
  const [experience, setExperience] = useState('any')
  const [jobType, setJobType] = useState('any')
  const [date, setDate] = useState('any')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [pasteUrl, setPasteUrl] = useState('')
  const [wizardPrompt, setWizardPrompt] = useState('')

  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="mx-auto max-w-5xl">
      {/* Section title row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
            <Target className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {copy('Wynt Intelligence', 'ذكاء Wynt')}
          </h1>
        </div>
        <Button variant="default" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          {copy('New Search', 'بحث جديد')}
        </Button>
      </div>

      {/* Tab switcher */}
      <div className="mt-10 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {tabs.map((t) => {
            const Icon = t.icon
            const isActive = tab === t.value
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-white text-slate-900 shadow ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-slate-700'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4',
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : ''
                  )}
                />
                {t.label[lang]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Hero */}
      <div className="mt-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
          <Globe className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {tab === 'manual' && copy('Search Real Job Boards', 'ابحث في منصّات الوظائف الحقيقية')}
          {tab === 'url' && copy('Paste a Job Posting URL', 'الصق رابط إعلان وظيفة')}
          {tab === 'wizard' && copy('Describe Your Dream Role', 'صِف وظيفتك المثالية')}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          {tab === 'manual' &&
            copy(
              'Aggregates listings from LinkedIn, Indeed, Glassdoor, and 50+ boards.',
              'تجمع القوائم من LinkedIn و Indeed و Glassdoor وأكثر من 50 منصة.'
            )}
          {tab === 'url' &&
            copy(
              'We will analyse the listing and score how well it matches your profile.',
              'سنحلّل الإعلان ونقيّم مدى تطابقه مع ملفّك.'
            )}
          {tab === 'wizard' &&
            copy(
              'Tell us in plain language and our AI finds the best matches for you.',
              'أخبرنا بلغة بسيطة وسيجد ذكاؤنا الاصطناعي أفضل المطابقات.'
            )}
        </p>
      </div>

      {/* Form card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {tab === 'manual' && (
          <ManualSearchForm
            keywords={keywords}
            setKeywords={setKeywords}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            industry={industry}
            setIndustry={setIndustry}
            experience={experience}
            setExperience={setExperience}
            jobType={jobType}
            setJobType={setJobType}
            date={date}
            setDate={setDate}
            remoteOnly={remoteOnly}
            setRemoteOnly={setRemoteOnly}
            lang={lang}
            copy={copy}
          />
        )}
        {tab === 'url' && (
          <div className="space-y-4">
            <Field label={copy('Job posting URL', 'رابط إعلان الوظيفة')} required>
              <input
                type="url"
                value={pasteUrl}
                onChange={(e) => setPasteUrl(e.target.value)}
                placeholder="https://www.linkedin.com/jobs/view/…"
                className={inputClass}
              />
            </Field>
            <div className="flex justify-end">
              <Button variant="default" size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Search className="h-4 w-4" />
                {copy('Analyse Job', 'حلّل الوظيفة')}
              </Button>
            </div>
          </div>
        )}
        {tab === 'wizard' && (
          <div className="space-y-4">
            <Field label={copy('Describe what you want', 'صف ما تبحث عنه')} required>
              <textarea
                value={wizardPrompt}
                onChange={(e) => setWizardPrompt(e.target.value)}
                placeholder={copy(
                  'e.g. Remote senior full-stack role at a Series B startup, EU time zone, meaningful equity',
                  'مثال: دور Full Stack أول عن بُعد في شركة Series B، توقيت أوروبا، أسهم مجزية'
                )}
                rows={4}
                className={cn(inputClass, 'resize-none')}
              />
            </Field>
            <div className="flex justify-end">
              <Button variant="default" size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Sparkles className="h-4 w-4" />
                {copy('Find Matches', 'ابحث عن مطابقات')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white'

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

function SelectField({
  value,
  onChange,
  options,
  lang,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: Record<Lang, string> }[]
  lang: Lang
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, 'appearance-none pe-10 cursor-pointer')}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label[lang]}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
}

interface ManualProps {
  keywords: string
  setKeywords: (v: string) => void
  country: string
  setCountry: (v: string) => void
  city: string
  setCity: (v: string) => void
  industry: string
  setIndustry: (v: string) => void
  experience: string
  setExperience: (v: string) => void
  jobType: string
  setJobType: (v: string) => void
  date: string
  setDate: (v: string) => void
  remoteOnly: boolean
  setRemoteOnly: (v: boolean) => void
  lang: Lang
  copy: (en: string, ar: string) => string
}

function ManualSearchForm({
  keywords,
  setKeywords,
  country,
  setCountry,
  city,
  setCity,
  industry,
  setIndustry,
  experience,
  setExperience,
  jobType,
  setJobType,
  date,
  setDate,
  remoteOnly,
  setRemoteOnly,
  lang,
  copy,
}: ManualProps) {
  return (
    <div className="space-y-5">
      <Field label={copy('Keywords', 'الكلمات المفتاحية')} required>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder={copy(
            'e.g., BIM Manager, Software Engineer...',
            'مثال: مهندس برمجيات، مدير BIM...'
          )}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy('Country / Region', 'الدولة / المنطقة')}>
          <SelectField value={country} onChange={setCountry} options={countries} lang={lang} />
        </Field>
        <Field label={copy('City', 'المدينة')}>
          <SelectField value={city} onChange={setCity} options={cities} lang={lang} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy('Industry', 'الصناعة')}>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder={copy('e.g., Construction, Tech...', 'مثال: الإنشاءات، التقنية...')}
            className={inputClass}
          />
        </Field>
        <Field label={copy('Experience Level', 'مستوى الخبرة')}>
          <SelectField
            value={experience}
            onChange={setExperience}
            options={experienceLevels}
            lang={lang}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy('Job Type', 'نوع الوظيفة')}>
          <SelectField value={jobType} onChange={setJobType} options={jobTypes} lang={lang} />
        </Field>
        <Field label={copy('Date Posted', 'تاريخ النشر')}>
          <SelectField value={date} onChange={setDate} options={datePosted} lang={lang} />
        </Field>
      </div>

      {/* Remote Only + Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
        <label className="inline-flex cursor-pointer items-center gap-2.5">
          <button
            type="button"
            role="switch"
            aria-checked={remoteOnly}
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={cn(
              'relative h-6 w-11 rounded-full transition-colors',
              remoteOnly ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                remoteOnly
                  ? 'translate-x-5 rtl:-translate-x-5'
                  : 'translate-x-0.5 rtl:-translate-x-0.5'
              )}
            />
          </button>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Wifi className="h-4 w-4 text-slate-400" />
            {copy('Remote Only', 'عن بُعد فقط')}
          </span>
        </label>
        <Button variant="default" size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Search className="h-4 w-4" />
          {copy('Search Jobs', 'ابحث عن وظائف')}
        </Button>
      </div>
    </div>
  )
}
