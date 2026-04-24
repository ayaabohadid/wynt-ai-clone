import { useMemo, useState } from 'react'
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  ChevronDown,
  Clock,
  DollarSign,
  Filter,
  LayoutGrid,
  List,
  MapPin,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Job = {
  id: string
  title: Record<Lang, string>
  company: string
  monogram: string
  location: Record<Lang, string>
  remote: boolean
  salary: string
  match: number
  posted: Record<Lang, string>
  tags: string[]
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Staff'
}

const JOBS: Job[] = [
  {
    id: '1',
    title: { en: 'Senior React Developer', ar: 'مطوّر React أول' },
    company: 'Stripe',
    monogram: 'St',
    location: { en: 'Remote · Global', ar: 'عن بُعد · عالمي' },
    remote: true,
    salary: '$140k – $180k',
    match: 94,
    posted: { en: '2h ago', ar: 'قبل ساعتين' },
    tags: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    seniority: 'Senior',
  },
  {
    id: '2',
    title: { en: 'Full Stack Engineer', ar: 'مهندس Full Stack' },
    company: 'Vercel',
    monogram: 'Ve',
    location: { en: 'Remote · EU', ar: 'عن بُعد · أوروبا' },
    remote: true,
    salary: '$120k – $150k',
    match: 89,
    posted: { en: '5h ago', ar: 'قبل 5 ساعات' },
    tags: ['Node.js', 'React', 'PostgreSQL'],
    seniority: 'Mid',
  },
  {
    id: '3',
    title: { en: 'Frontend Lead', ar: 'قائد الواجهة الأمامية' },
    company: 'Linear',
    monogram: 'Li',
    location: { en: 'San Francisco · Hybrid', ar: 'سان فرانسيسكو · هجين' },
    remote: false,
    salary: '$160k – $200k',
    match: 82,
    posted: { en: '1d ago', ar: 'قبل يوم' },
    tags: ['React', 'Design Systems', 'Leadership'],
    seniority: 'Lead',
  },
  {
    id: '4',
    title: { en: 'Staff Engineer, Platform', ar: 'مهندس منصّة Staff' },
    company: 'Pitch',
    monogram: 'Pi',
    location: { en: 'Remote · EU', ar: 'عن بُعد · أوروبا' },
    remote: true,
    salary: '$180k – $230k',
    match: 78,
    posted: { en: '1d ago', ar: 'قبل يوم' },
    tags: ['Go', 'Kubernetes', 'Distributed Systems'],
    seniority: 'Staff',
  },
  {
    id: '5',
    title: { en: 'Senior Product Engineer', ar: 'مهندس منتج أول' },
    company: 'Figma',
    monogram: 'Fi',
    location: { en: 'New York · Hybrid', ar: 'نيويورك · هجين' },
    remote: false,
    salary: '$170k – $210k',
    match: 91,
    posted: { en: '3h ago', ar: 'قبل 3 ساعات' },
    tags: ['TypeScript', 'WebGL', 'Performance'],
    seniority: 'Senior',
  },
  {
    id: '6',
    title: { en: 'Full Stack Developer', ar: 'مطوّر Full Stack' },
    company: 'Supabase',
    monogram: 'Sb',
    location: { en: 'Remote · Americas', ar: 'عن بُعد · الأمريكتين' },
    remote: true,
    salary: '$110k – $140k',
    match: 87,
    posted: { en: '8h ago', ar: 'قبل 8 ساعات' },
    tags: ['PostgreSQL', 'TypeScript', 'React', 'Edge Functions'],
    seniority: 'Mid',
  },
  {
    id: '7',
    title: { en: 'Senior Backend Engineer', ar: 'مهندس خلفية أول' },
    company: 'Lemon.io',
    monogram: 'Lm',
    location: { en: 'Remote · Global', ar: 'عن بُعد · عالمي' },
    remote: true,
    salary: '$130k – $160k',
    match: 85,
    posted: { en: '12h ago', ar: 'قبل 12 ساعة' },
    tags: ['Python', 'Django', 'AWS', 'PostgreSQL'],
    seniority: 'Senior',
  },
  {
    id: '8',
    title: { en: 'Engineering Manager', ar: 'مدير هندسة' },
    company: 'Personio',
    monogram: 'Pe',
    location: { en: 'Berlin · Hybrid', ar: 'برلين · هجين' },
    remote: false,
    salary: '€100k – €140k',
    match: 74,
    posted: { en: '2d ago', ar: 'قبل يومين' },
    tags: ['Leadership', 'Hiring', 'Agile'],
    seniority: 'Lead',
  },
]

const remoteOptions: { value: 'any' | 'remote' | 'onsite'; label: Record<Lang, string> }[] = [
  { value: 'any', label: { en: 'Any location', ar: 'أي مكان' } },
  { value: 'remote', label: { en: 'Remote only', ar: 'عن بُعد فقط' } },
  { value: 'onsite', label: { en: 'On-site / Hybrid', ar: 'مكتب / هجين' } },
]

const sortOptions: { value: 'match' | 'recent' | 'salary'; label: Record<Lang, string> }[] = [
  { value: 'match', label: { en: 'Best match', ar: 'الأفضل مطابقة' } },
  { value: 'recent', label: { en: 'Most recent', ar: 'الأحدث' } },
  { value: 'salary', label: { en: 'Highest salary', ar: 'الأعلى راتبًا' } },
]

export function BrowseJobs() {
  const { lang } = useLanguage()
  const [query, setQuery] = useState('')
  const [remote, setRemote] = useState<'any' | 'remote' | 'onsite'>('any')
  const [minMatch, setMinMatch] = useState(70)
  const [sort, setSort] = useState<'match' | 'recent' | 'salary'>('match')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = JOBS.filter((j) => {
      if (j.match < minMatch) return false
      if (remote === 'remote' && !j.remote) return false
      if (remote === 'onsite' && j.remote) return false
      if (!q) return true
      return (
        j.title.en.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
    if (sort === 'match') list = [...list].sort((a, b) => b.match - a.match)
    if (sort === 'recent') list = [...list].sort((a, b) => a.posted.en.localeCompare(b.posted.en))
    if (sort === 'salary')
      list = [...list].sort((a, b) => {
        const parse = (s: string) => parseInt(s.replace(/\D/g, '').slice(0, 3), 10) || 0
        return parse(b.salary) - parse(a.salary)
      })
    return list
  }, [query, remote, minMatch, sort])

  function toggleSave(id: string) {
    setSaved((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
            <Sparkles className="h-3 w-3" />
            {copy('Wynt Live Feed', 'تغذية Wynt المباشرة')}
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {copy('Browse Jobs', 'تصفّح الوظائف')}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {copy(
              `${filtered.length} jobs matched to your profile from 50+ boards`,
              `${filtered.length} وظيفة مطابقة لملفك من أكثر من 50 منصّة`
            )}
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Target className="h-4 w-4" />
          {copy('Auto-Apply Pilot', 'طيّار التقديم التلقائي')}
        </Button>
      </div>

      {/* Search + filters */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy(
                'Search role, company, or skill…',
                'ابحث عن دور أو شركة أو مهارة…'
              )}
              className="w-full rounded-lg border border-slate-200 bg-white ps-9 pe-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={remote}
              onChange={(v) => setRemote(v as typeof remote)}
              options={remoteOptions.map((o) => ({ value: o.value, label: o.label[lang] }))}
              icon={<MapPin className="h-4 w-4 text-slate-400" />}
            />
            <Select
              value={sort}
              onChange={(v) => setSort(v as typeof sort)}
              options={sortOptions.map((o) => ({ value: o.value, label: o.label[lang] }))}
              icon={<TrendingUp className="h-4 w-4 text-slate-400" />}
            />
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                showFilters
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800'
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">{copy('Filters', 'فلاتر')}</span>
            </button>
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setView('list')}
                aria-pressed={view === 'list'}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded transition-colors',
                  view === 'list'
                    ? 'bg-white text-violet-600 shadow-sm dark:bg-slate-900 dark:text-violet-400'
                    : 'text-slate-500 dark:text-slate-400'
                )}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView('grid')}
                aria-pressed={view === 'grid'}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded transition-colors',
                  view === 'grid'
                    ? 'bg-white text-violet-600 shadow-sm dark:bg-slate-900 dark:text-violet-400'
                    : 'text-slate-500 dark:text-slate-400'
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {copy('Minimum match', 'الحد الأدنى للمطابقة')}: {minMatch}%
              </label>
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={minMatch}
                onChange={(e) => setMinMatch(Number(e.target.value))}
                className="mt-2 w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {copy('Quick filters', 'فلاتر سريعة')}
              </label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['Remote', 'Senior+', '$150k+', 'Series B', 'EU timezone'].map((f) => (
                  <button
                    key={f}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    + {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Filter className="h-5 w-5 text-slate-400" />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
            {copy('No matches found', 'لا توجد مطابقات')}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {copy('Try relaxing your filters.', 'حاول تخفيف الفلاتر.')}
          </p>
        </div>
      ) : (
        <div
          className={cn(
            'mt-6',
            view === 'grid' ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-3' : 'space-y-3'
          )}
        >
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              view={view}
              saved={saved.has(job.id)}
              onToggleSave={() => toggleSave(job.id)}
              lang={lang}
            />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          {copy('Load more jobs', 'المزيد من الوظائف')}
        </Button>
      </div>
    </div>
  )
}

function JobCard({
  job,
  view,
  saved,
  onToggleSave,
  lang,
}: {
  job: Job
  view: 'list' | 'grid'
  saved: boolean
  onToggleSave: () => void
  lang: Lang
}) {
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)
  const matchColor =
    job.match >= 90
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
      : job.match >= 80
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'

  if (view === 'grid') {
    return (
      <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-bold text-slate-700 dark:from-slate-800 dark:to-slate-700 dark:text-slate-200">
            {job.monogram}
          </div>
          <button
            onClick={onToggleSave}
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label={saved ? copy('Unsave', 'إلغاء الحفظ') : copy('Save', 'حفظ')}
          >
            {saved ? (
              <BookmarkCheck className="h-5 w-5 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>
        <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{job.title[lang]}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
        <div className="mt-3 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <MapPin className="h-3 w-3" />
          {job.location[lang]}
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <DollarSign className="h-3 w-3" />
          {job.salary}
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {job.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className={cn('rounded-full px-2 py-0.5 text-xs font-bold', matchColor)}>
            {job.match}%
          </span>
          <Button variant="gradient" size="sm" className="gap-1.5">
            <Send className="h-3.5 w-3.5" />
            {copy('Apply', 'تقديم')}
          </Button>
        </div>
      </div>
    )
  }

  // List view
  return (
    <div className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-bold text-slate-700 dark:from-slate-800 dark:to-slate-700 dark:text-slate-200">
        {job.monogram}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900 dark:text-white">
              {job.title[lang]}
            </h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {job.company}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {job.location[lang]}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <DollarSign className="h-3 w-3" /> {job.salary}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {job.posted[lang]}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Briefcase className="me-1 inline h-3 w-3" />
                {job.seniority}
              </span>
              {job.remote && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  Remote
                </span>
              )}
              {job.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onToggleSave}
            className="shrink-0 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label={saved ? copy('Unsave', 'إلغاء الحفظ') : copy('Save', 'حفظ')}
          >
            {saved ? (
              <BookmarkCheck className="h-5 w-5 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-between gap-2">
        <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', matchColor)}>
          {job.match}%
        </span>
        <Button variant="gradient" size="sm" className="gap-1.5">
          <Send className="h-3.5 w-3.5" />
          {copy('Apply', 'تقديم')}
        </Button>
      </div>
    </div>
  )
}

function Select({
  value,
  onChange,
  options,
  icon,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  icon?: React.ReactNode
}) {
  return (
    <div className="relative">
      {icon && <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2">{icon}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'appearance-none rounded-lg border border-slate-200 bg-white py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200',
          icon ? 'ps-9 pe-8' : 'px-3'
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
}
