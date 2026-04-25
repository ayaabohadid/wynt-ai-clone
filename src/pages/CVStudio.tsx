import { useState } from 'react'
import {
  FileText,
  LayoutGrid,
  List,
  Mic,
  Search,
  Table2,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type ViewMode = 'grid' | 'list' | 'table'
type Style = 'all' | 'professional' | 'modern' | 'creative' | 'executive' | 'academic' | 'minimal'

const styleFilters: { value: Style; label: Record<Lang, string> }[] = [
  { value: 'all', label: { en: 'All Templates', ar: 'كل القوالب' } },
  { value: 'professional', label: { en: 'Professional', ar: 'احترافي' } },
  { value: 'modern', label: { en: 'Modern', ar: 'حديث' } },
  { value: 'creative', label: { en: 'Creative', ar: 'إبداعي' } },
  { value: 'executive', label: { en: 'Executive', ar: 'تنفيذي' } },
  { value: 'academic', label: { en: 'Academic', ar: 'أكاديمي' } },
  { value: 'minimal', label: { en: 'Minimal', ar: 'مينيمال' } },
]

type Template = {
  id: string
  name: Record<Lang, string>
  style: Exclude<Style, 'all'>
  variant: 'light' | 'dark-sidebar-left' | 'dark-header' | 'light-blue' | 'creative-split' | 'minimal-mono' | 'executive-stripe' | 'academic-classic' | 'modern-sidebar-right' | 'modern-bold-header' | 'creative-color' | 'minimal-clean'
}

const templates: Template[] = [
  { id: 't1', name: { en: 'Classic Professional', ar: 'كلاسيكي احترافي' }, style: 'professional', variant: 'light' },
  { id: 't2', name: { en: 'Dark Sidebar Pro', ar: 'سايدبار داكن' }, style: 'modern', variant: 'dark-sidebar-left' },
  { id: 't3', name: { en: 'Bold Header', ar: 'هيدر بارز' }, style: 'modern', variant: 'modern-bold-header' },
  { id: 't4', name: { en: 'Minimal Clean', ar: 'مينيمال نظيف' }, style: 'minimal', variant: 'minimal-clean' },
  { id: 't5', name: { en: 'Executive Stripe', ar: 'تنفيذي مخطط' }, style: 'executive', variant: 'executive-stripe' },
  { id: 't6', name: { en: 'Academic Classic', ar: 'أكاديمي كلاسيكي' }, style: 'academic', variant: 'academic-classic' },
  { id: 't7', name: { en: 'Creative Split', ar: 'إبداعي مقسّم' }, style: 'creative', variant: 'creative-split' },
  { id: 't8', name: { en: 'Modern Sidebar', ar: 'سايدبار حديث' }, style: 'modern', variant: 'modern-sidebar-right' },
  { id: 't9', name: { en: 'Light Blue Pro', ar: 'احترافي أزرق فاتح' }, style: 'professional', variant: 'light-blue' },
  { id: 't10', name: { en: 'Minimal Mono', ar: 'مينيمال أحادي' }, style: 'minimal', variant: 'minimal-mono' },
  { id: 't11', name: { en: 'Creative Color', ar: 'إبداعي ملوّن' }, style: 'creative', variant: 'creative-color' },
  { id: 't12', name: { en: 'Dark Header', ar: 'هيدر داكن' }, style: 'professional', variant: 'dark-header' },
]

export function CVStudio() {
  const { lang } = useLanguage()
  const [view, setView] = useState<ViewMode>('grid')
  const [style, setStyle] = useState<Style>('all')
  const [search, setSearch] = useState('')

  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const filtered = templates.filter((t) => {
    if (style !== 'all' && t.style !== style) return false
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      return t.name.en.toLowerCase().includes(q) || t.style.includes(q)
    }
    return true
  })

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {copy('CV Studio', 'استوديو السيرة الذاتية')}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'Upload, analyze, and manage your resumes with AI intelligence.',
              'ارفع وحلّل وأدر سيرك الذاتية بذكاء اصطناعي.'
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Mic className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            {copy('Voice Builder', 'منشئ صوتي')}
          </Button>
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900">
            <ViewBtn icon={LayoutGrid} active={view === 'grid'} onClick={() => setView('grid')} />
            <ViewBtn icon={List} active={view === 'list'} onClick={() => setView('list')} />
            <ViewBtn icon={Table2} active={view === 'table'} onClick={() => setView('table')} />
          </div>
          <Button variant="default" className="gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600">
            <Upload className="h-4 w-4" />
            {copy('Upload CV', 'رفع السيرة')}
          </Button>
        </div>
      </div>

      {/* Empty state card */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center">
          <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" />
        </div>
        <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
          {copy('No CVs uploaded yet', 'لم ترفع سيرة ذاتية بعد')}
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {copy(
            'Upload your resume to start matching with jobs.',
            'ارفع سيرتك الذاتية لتبدأ مطابقتها مع الوظائف.'
          )}
        </p>
        <Button
          variant="default"
          size="lg"
          className="mt-5 gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
        >
          <Upload className="h-4 w-4" />
          {copy('Upload Your First CV', 'ارفع سيرتك الذاتية الأولى')}
        </Button>
      </section>

      {/* Templates section */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-100 dark:bg-violet-950/50">
              <LayoutGrid className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </span>
            {copy('CV Templates', 'قوالب السيرة الذاتية')}
          </h2>
          <span className="rounded-md bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
            12 {copy('templates', 'قالب')}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {copy(
            'Choose a professional template and customize it in the CV Builder with your uploaded CV data.',
            'اختر قالباً احترافياً وخصّصه في منشئ السيرة ببيانات سيرتك الذاتية المرفوعة.'
          )}
        </p>

        {/* Search + filter chips */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={copy('Search templates...', 'ابحث في القوالب...')}
              className="w-full rounded-lg border border-slate-200 bg-white ps-9 pe-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <div className="ms-auto flex flex-wrap items-center gap-1.5">
            {styleFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setStyle(f.value)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  style === f.value
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                )}
              >
                {f.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Templates grid */}
        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            {copy('No templates found.', 'لم يتم العثور على قوالب.')}
          </p>
        ) : view === 'grid' ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((t) => <TemplateCard key={t.id} template={t} />)}
          </div>
        ) : view === 'list' ? (
          <div className="mt-5 space-y-3">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
                  <TemplatePreview variant={t.variant} compact />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {t.name[lang]}
                  </p>
                  <p className="mt-0.5 text-xs capitalize text-slate-500 dark:text-slate-400">
                    {t.style}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {copy('Use', 'استخدم')}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 text-start font-semibold text-slate-700 dark:text-slate-200">
                    {copy('Name', 'الاسم')}
                  </th>
                  <th className="px-4 py-2 text-start font-semibold text-slate-700 dark:text-slate-200">
                    {copy('Style', 'الأسلوب')}
                  </th>
                  <th className="px-4 py-2 text-end font-semibold text-slate-700 dark:text-slate-200" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr
                    key={t.id}
                    className={cn(
                      'border-t',
                      i % 2 === 0
                        ? 'bg-white dark:bg-slate-900'
                        : 'bg-slate-50/50 dark:bg-slate-900/50',
                      'border-slate-200 dark:border-slate-800'
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {t.name[lang]}
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600 dark:text-slate-300">
                      {t.style}
                    </td>
                    <td className="px-4 py-3 text-end">
                      <Button variant="outline" size="sm">
                        {copy('Use', 'استخدم')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

function ViewBtn({
  icon: Icon,
  active,
  onClick,
}: {
  icon: React.FC<{ className?: string }>
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
        active
          ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900'
          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

function TemplateCard({ template }: { template: Template }) {
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)
  return (
    <div className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50">
      <div className="aspect-[3/4] overflow-hidden">
        <TemplatePreview variant={template.variant} />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-3 py-2.5 dark:border-slate-800">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            {template.name[lang]}
          </p>
          <p className="truncate text-[11px] capitalize text-slate-500 dark:text-slate-400">
            {template.style}
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
          {copy('Use', 'استخدم')}
        </Button>
      </div>
    </div>
  )
}

/* ---------- Stylized resume previews (no real PII, decorative bars only) ---------- */

function TemplatePreview({
  variant,
  compact = false,
}: {
  variant: Template['variant']
  compact?: boolean
}) {
  const stripe = compact ? 'h-1.5' : 'h-2'
  const bar = (w: string, color: string, h = stripe) =>
    <div className={cn('rounded-full', h, w, color)} />

  switch (variant) {
    case 'light':
    case 'minimal-clean':
      return (
        <div className="flex h-full flex-col gap-2 bg-white p-3">
          {bar('w-2/3', 'bg-slate-700', compact ? 'h-2' : 'h-2.5')}
          {bar('w-1/3', 'bg-slate-300')}
          <div className="my-1 border-t border-slate-100" />
          {bar('w-full', 'bg-blue-200')}
          {bar('w-5/6', 'bg-slate-200')}
          {bar('w-4/6', 'bg-slate-200')}
          {bar('w-full', 'bg-blue-200')}
          {bar('w-3/4', 'bg-slate-200')}
        </div>
      )
    case 'dark-sidebar-left':
      return (
        <div className="grid h-full grid-cols-[35%_1fr] bg-white">
          <div className="flex flex-col gap-2 bg-slate-900 p-3">
            <div className="mx-auto h-6 w-6 rounded-full bg-slate-600" />
            {bar('w-full', 'bg-slate-600')}
            {bar('w-3/4', 'bg-slate-700')}
            {bar('w-full', 'bg-slate-600')}
            {bar('w-2/3', 'bg-slate-700')}
          </div>
          <div className="flex flex-col gap-2 p-3">
            {bar('w-3/4', 'bg-slate-700', 'h-2.5')}
            {bar('w-1/3', 'bg-slate-300')}
            {bar('w-full', 'bg-blue-200')}
            {bar('w-5/6', 'bg-slate-200')}
            {bar('w-4/6', 'bg-slate-200')}
          </div>
        </div>
      )
    case 'dark-header':
    case 'modern-bold-header':
      return (
        <div className="flex h-full flex-col bg-white">
          <div className="flex flex-col justify-center gap-1.5 bg-slate-900 p-3">
            {bar('w-2/3', 'bg-slate-300', 'h-2.5')}
            {bar('w-1/3', 'bg-slate-500')}
          </div>
          <div className="flex flex-1 flex-col gap-2 p-3">
            {bar('w-1/3', 'bg-amber-300')}
            {bar('w-full', 'bg-slate-200')}
            {bar('w-5/6', 'bg-slate-200')}
            {bar('w-1/3', 'bg-amber-300')}
            {bar('w-full', 'bg-slate-200')}
            {bar('w-4/6', 'bg-slate-200')}
          </div>
        </div>
      )
    case 'light-blue':
      return (
        <div className="flex h-full flex-col gap-2 bg-blue-50/40 p-3">
          {bar('w-2/3', 'bg-blue-700', 'h-2.5')}
          {bar('w-1/3', 'bg-blue-300')}
          <div className="my-1 border-t border-blue-200" />
          {bar('w-full', 'bg-blue-200')}
          {bar('w-5/6', 'bg-slate-200')}
          {bar('w-4/6', 'bg-slate-200')}
          {bar('w-full', 'bg-blue-200')}
          {bar('w-3/4', 'bg-slate-200')}
        </div>
      )
    case 'creative-split':
      return (
        <div className="grid h-full grid-cols-[40%_1fr] gap-1 bg-white">
          <div className="flex flex-col gap-2 bg-violet-100 p-3">
            <div className="mx-auto h-6 w-6 rounded-full bg-violet-300" />
            {bar('w-full', 'bg-violet-300')}
            {bar('w-2/3', 'bg-violet-200')}
            {bar('w-full', 'bg-violet-300')}
          </div>
          <div className="flex flex-col gap-2 p-3">
            {bar('w-3/4', 'bg-slate-700', 'h-2.5')}
            {bar('w-1/3', 'bg-violet-300')}
            {bar('w-full', 'bg-slate-200')}
            {bar('w-5/6', 'bg-slate-200')}
          </div>
        </div>
      )
    case 'minimal-mono':
      return (
        <div className="flex h-full flex-col gap-2 bg-stone-50 p-3">
          {bar('w-1/2', 'bg-stone-800', 'h-3')}
          {bar('w-1/4', 'bg-stone-400')}
          <div className="my-1 border-t border-stone-300" />
          {bar('w-full', 'bg-stone-300')}
          {bar('w-5/6', 'bg-stone-300')}
          {bar('w-4/6', 'bg-stone-300')}
        </div>
      )
    case 'executive-stripe':
      return (
        <div className="flex h-full bg-white">
          <div className="w-1.5 bg-amber-500" />
          <div className="flex flex-1 flex-col gap-2 p-3">
            {bar('w-3/4', 'bg-slate-800', 'h-2.5')}
            {bar('w-1/3', 'bg-amber-400')}
            <div className="my-1 border-t border-slate-200" />
            {bar('w-full', 'bg-slate-300')}
            {bar('w-5/6', 'bg-slate-200')}
            {bar('w-4/6', 'bg-slate-200')}
          </div>
        </div>
      )
    case 'academic-classic':
      return (
        <div className="flex h-full flex-col items-center gap-2 bg-white p-3">
          {bar('w-2/3', 'bg-slate-800', 'h-2.5')}
          {bar('w-1/3', 'bg-slate-400')}
          <div className="my-1 w-full border-t border-slate-200" />
          {bar('w-full', 'bg-slate-200')}
          {bar('w-5/6', 'bg-slate-200')}
          {bar('w-4/6', 'bg-slate-200')}
        </div>
      )
    case 'modern-sidebar-right':
      return (
        <div className="grid h-full grid-cols-[1fr_35%] bg-white">
          <div className="flex flex-col gap-2 p-3">
            {bar('w-3/4', 'bg-slate-700', 'h-2.5')}
            {bar('w-1/3', 'bg-slate-300')}
            {bar('w-full', 'bg-indigo-200')}
            {bar('w-5/6', 'bg-slate-200')}
            {bar('w-4/6', 'bg-slate-200')}
          </div>
          <div className="flex flex-col gap-2 bg-indigo-100 p-3">
            <div className="mx-auto h-6 w-6 rounded-full bg-indigo-300" />
            {bar('w-full', 'bg-indigo-300')}
            {bar('w-2/3', 'bg-indigo-200')}
          </div>
        </div>
      )
    case 'creative-color':
      return (
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center gap-1.5 bg-pink-100 p-3">
            <div className="h-5 w-5 rounded-full bg-pink-400" />
            <div className="flex-1 space-y-1">
              {bar('w-3/4', 'bg-pink-500')}
              {bar('w-1/2', 'bg-pink-300')}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-3">
            {bar('w-1/3', 'bg-pink-400')}
            {bar('w-full', 'bg-slate-200')}
            {bar('w-5/6', 'bg-slate-200')}
            {bar('w-1/3', 'bg-pink-400')}
            {bar('w-full', 'bg-slate-200')}
          </div>
        </div>
      )
  }
}
