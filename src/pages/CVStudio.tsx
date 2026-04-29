import { useState, type ComponentType } from 'react'
import {
  Book,
  Briefcase,
  Crown,
  Eye,
  Feather,
  FileText,
  LayoutGrid,
  Layers,
  List,
  Mic,
  Palette,
  Search,
  Shield,
  Sparkles,
  Table2,
  Target,
  Upload,
  Wand2,
  ArrowRight,
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

type IconC = ComponentType<{ className?: string }>

type Variant =
  | 'corporate-classic'
  | 'modern-tech'
  | 'executive-suite'
  | 'minimal-elegance'
  | 'creative-bold'
  | 'academic-scholar'
  | 'startup-fresh'
  | 'finance-pro'
  | 'design-portfolio'
  | 'engineering-precision'
  | 'luxury-premium'
  | 'healthcare-clean'

/* ---------- Custom inline icons ---------- */

function GemIcon({ className }: { className?: string }) {
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
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  )
}

function HeartPulseIcon({ className }: { className?: string }) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4 .5-2H17" />
    </svg>
  )
}

type Template = {
  id: string
  name: Record<Lang, string>
  description: Record<Lang, string>
  tags: Record<Lang, string[]>
  style: Exclude<Style, 'all'>
  icon: IconC
  variant: Variant
}

const templates: Template[] = [
  {
    id: 't1',
    name: { en: 'Corporate Classic', ar: 'كلاسيكي مؤسّسي' },
    description: {
      en: 'Traditional single-column layout with centered header and clean typography. Battle-tested for ATS systems.',
      ar: 'تخطيط تقليدي بعمود واحد مع هيدر متمركز وطباعة نظيفة. مُختبَر لأنظمة ATS.',
    },
    tags: { en: ['Corporate', 'Traditional', 'ATS-Friendly'], ar: ['مؤسّسي', 'تقليدي', 'متوافق ATS'] },
    style: 'professional',
    icon: Briefcase as IconC,
    variant: 'corporate-classic',
  },
  {
    id: 't2',
    name: { en: 'Modern Tech', ar: 'تقني حديث' },
    description: {
      en: 'Dark left sidebar with contact info and skill bars, white main content area for clean readability.',
      ar: 'سايدبار يسار داكن لمعلومات الاتصال ومهارات، ومنطقة محتوى رئيسية بيضاء لقراءة نظيفة.',
    },
    tags: { en: ['Tech', 'Sidebar', 'Modern'], ar: ['تقني', 'سايدبار', 'حديث'] },
    style: 'modern',
    icon: Layers as IconC,
    variant: 'modern-tech',
  },
  {
    id: 't3',
    name: { en: 'Executive Suite', ar: 'الجناح التنفيذي' },
    description: {
      en: 'Bold colored header banner with uppercase name and accent bar. Perfect for senior leadership roles.',
      ar: 'بانر هيدر بارز ملوّن مع اسم بحروف كبيرة وشريط لون. مثالي لأدوار القيادة العليا.',
    },
    tags: { en: ['Executive', 'Banner', 'Bold'], ar: ['تنفيذي', 'بانر', 'بارز'] },
    style: 'executive',
    icon: Crown as IconC,
    variant: 'executive-suite',
  },
  {
    id: 't4',
    name: { en: 'Minimal Elegance', ar: 'أناقة مينيمال' },
    description: {
      en: 'Whitespace-focused classic layout with elegant simplicity. Great for designers, writers and creatives.',
      ar: 'تخطيط كلاسيكي يركّز على المساحات البيضاء بأناقة بسيطة. رائع للمصمّمين والكتّاب والمبدعين.',
    },
    tags: { en: ['Minimal', 'Elegant', 'Whitespace'], ar: ['مينيمال', 'أنيق', 'مساحات'] },
    style: 'minimal',
    icon: Feather as IconC,
    variant: 'minimal-elegance',
  },
  {
    id: 't5',
    name: { en: 'Creative Bold', ar: 'إبداعي جريء' },
    description: {
      en: 'Vibrant timeline layout with dot markers and date pills. Perfect for marketing, sales and growth roles.',
      ar: 'تخطيط زمني نابض بالحياة مع نقاط تأشير وحبوب تاريخ. مثالي للتسويق والمبيعات وأدوار النمو.',
    },
    tags: { en: ['Creative', 'Timeline', 'Vibrant'], ar: ['إبداعي', 'زمني', 'نابض'] },
    style: 'creative',
    icon: Sparkles as IconC,
    variant: 'creative-bold',
  },
  {
    id: 't6',
    name: { en: 'Academic Scholar', ar: 'أكاديمي علمي' },
    description: {
      en: 'Two-column layout with skills and education on the left, experience on the right. Tuned for researchers.',
      ar: 'تخطيط بعمودين مع المهارات والتعليم يساراً، والخبرة يميناً. مضبوط للباحثين.',
    },
    tags: { en: ['Academic', 'Two-Column', 'Research'], ar: ['أكاديمي', 'عمودين', 'بحثي'] },
    style: 'academic',
    icon: Book as IconC,
    variant: 'academic-scholar',
  },
  {
    id: 't7',
    name: { en: 'Startup Fresh', ar: 'ستارت-أب طازج' },
    description: {
      en: 'Teal-accented sidebar layout with skill progress bars. Great for startup founders and product roles.',
      ar: 'سايدبار بلمسات تركوازية مع أشرطة تقدّم للمهارات. رائع لمؤسّسي الستارت-أب وأدوار المنتج.',
    },
    tags: { en: ['Startup', 'Sidebar', 'Fresh'], ar: ['ستارت-أب', 'سايدبار', 'طازج'] },
    style: 'modern',
    icon: Target as IconC,
    variant: 'startup-fresh',
  },
  {
    id: 't8',
    name: { en: 'Finance Pro', ar: 'احترافي مالي' },
    description: {
      en: 'Dense compact layout with two-column grid for maximum content density. Built for finance and consulting.',
      ar: 'تخطيط مدمج كثيف بشبكة عمودين لأعلى كثافة محتوى. مصمّم للمالية والاستشارات.',
    },
    tags: { en: ['Finance', 'Compact', 'Dense'], ar: ['مالي', 'مدمج', 'كثيف'] },
    style: 'professional',
    icon: Shield as IconC,
    variant: 'finance-pro',
  },
  {
    id: 't9',
    name: { en: 'Design Portfolio', ar: 'محفظة تصميم' },
    description: {
      en: 'Artistic timeline layout with rose accents and filled skill chips. Ideal for UX/UI and visual designers.',
      ar: 'تخطيط فنّي زمني مع لمسات وردية وأشرطة مهارات معبّأة. مثالي لمصمّمي UX/UI والمصمّمين البصريين.',
    },
    tags: { en: ['Design', 'Timeline', 'Portfolio'], ar: ['تصميم', 'زمني', 'محفظة'] },
    style: 'creative',
    icon: Palette as IconC,
    variant: 'design-portfolio',
  },
  {
    id: 't10',
    name: { en: 'Engineering Precision', ar: 'دقّة هندسية' },
    description: {
      en: 'Structured two-column layout with skill progress bars and clean sections. Perfect for senior engineers.',
      ar: 'تخطيط منظَّم بعمودين مع أشرطة تقدّم للمهارات وأقسام نظيفة. مثالي للمهندسين الكبار.',
    },
    tags: { en: ['Engineering', 'Two-Column', 'Technical'], ar: ['هندسة', 'عمودين', 'تقني'] },
    style: 'modern',
    icon: Wand2 as IconC,
    variant: 'engineering-precision',
  },
  {
    id: 't11',
    name: { en: 'Luxury Premium', ar: 'فاخر بريميوم' },
    description: {
      en: 'Sophisticated banner layout with gold accents and uppercase styling. Suited for hospitality and brand leadership.',
      ar: 'تخطيط راقٍ ببانر فاخر ولمسات ذهبية وأحرف كبيرة. مناسب لقطاع الضيافة وقيادة العلامات.',
    },
    tags: { en: ['Luxury', 'Banner', 'Premium'], ar: ['فاخر', 'بانر', 'بريميوم'] },
    style: 'executive',
    icon: GemIcon,
    variant: 'luxury-premium',
  },
  {
    id: 't12',
    name: { en: 'Healthcare Clean', ar: 'صحّي نظيف' },
    description: {
      en: 'Clean compact layout with green tones and dot-style skill indicators. Designed for medical and care roles.',
      ar: 'تخطيط نظيف مدمج بدرجات خضراء ومؤشّرات مهارات بنقاط. مصمَّم لأدوار الرعاية الصحّية.',
    },
    tags: { en: ['Healthcare', 'Compact', 'Clean'], ar: ['صحّي', 'مدمج', 'نظيف'] },
    style: 'minimal',
    icon: HeartPulseIcon,
    variant: 'healthcare-clean',
  },
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
      return (
        t.name.en.toLowerCase().includes(q) ||
        t.style.includes(q) ||
        t.tags.en.some((tag) => tag.toLowerCase().includes(q))
      )
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
        <FileText className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
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
                    ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-500'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                )}
              >
                {f.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Templates */}
        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            {copy('No templates found.', 'لم يتم العثور على قوالب.')}
          </p>
        ) : view === 'grid' ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((t) => <TemplateCard key={t.id} template={t} />)}
          </div>
        ) : view === 'list' ? (
          <div className="mt-5 space-y-3">
            {filtered.map((t) => {
              const Icon = t.icon
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="h-20 w-14 shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
                    <TemplatePreview variant={t.variant} compact />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="inline-flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                      <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      {t.name[lang]}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                      {t.description[lang]}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      {copy('Preview', 'معاينة')}
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1.5 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                      {copy('Use', 'استخدم')}
                    </Button>
                  </div>
                </div>
              )
            })}
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
                  <th className="px-4 py-2 text-start font-semibold text-slate-700 dark:text-slate-200">
                    {copy('Tags', 'الوسوم')}
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
                      i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50',
                      'border-slate-200 dark:border-slate-800'
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {t.name[lang]}
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600 dark:text-slate-300">
                      {t.style}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {t.tags[lang].slice(0, 2).map((tag) => (
                          <span key={tag} className={tagPillClass}>
                            {tag}
                          </span>
                        ))}
                      </div>
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

const tagPillClass =
  'rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300'

function ViewBtn({
  icon: Icon,
  active,
  onClick,
}: {
  icon: IconC
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
  const Icon = template.icon
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50">
      {/* Preview area */}
      <div className="relative bg-slate-50 p-4 dark:bg-slate-800/40">
        <div className="aspect-[3/4] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700">
          <TemplatePreview variant={template.variant} />
        </div>
        {/* Hover overlay buttons */}
        <div className="pointer-events-none absolute inset-x-4 bottom-6 flex justify-center gap-2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
          <Button variant="outline" size="sm" className="gap-1.5 shadow-md">
            <Eye className="h-3.5 w-3.5" />
            {copy('Preview', 'معاينة')}
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1.5 bg-indigo-600 shadow-md hover:bg-indigo-700 focus-visible:ring-indigo-600"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            {copy('Use', 'استخدم')}
          </Button>
        </div>
      </div>

      {/* Footer info */}
      <div className="p-4">
        <h3 className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          {template.name[lang]}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {template.description[lang]}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {template.tags[lang].map((tag) => (
            <span key={tag} className={tagPillClass}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Stylized resume previews ---------- */

function TemplatePreview({
  variant,
  compact = false,
}: {
  variant: Variant
  compact?: boolean
}) {
  const stripe = compact ? 'h-1.5' : 'h-2'
  const bar = (w: string, color: string, h = stripe) =>
    <div className={cn('rounded-full', h, w, color)} />

  switch (variant) {
    case 'corporate-classic':
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
    case 'modern-tech':
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
    case 'executive-suite':
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
    case 'minimal-elegance':
      return (
        <div className="flex h-full flex-col gap-3 bg-white p-3">
          {bar('w-1/2', 'bg-slate-700', 'h-3')}
          {bar('w-1/4', 'bg-slate-400')}
          <div className="my-2 border-t border-slate-200" />
          {bar('w-full', 'bg-slate-200')}
          {bar('w-5/6', 'bg-slate-200')}
          <div className="my-1" />
          {bar('w-1/4', 'bg-slate-400')}
          {bar('w-4/6', 'bg-slate-200')}
        </div>
      )
    case 'creative-bold':
      // Vibrant timeline with dot markers + violet pills
      return (
        <div className="flex h-full flex-col gap-2 bg-white p-3">
          {bar('w-2/3', 'bg-violet-600', 'h-2.5')}
          {bar('w-1/3', 'bg-violet-300')}
          <div className="my-1 border-t border-violet-100" />
          <div className="flex gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-violet-500 mt-0.5" />
            <div className="flex-1 space-y-1">
              {bar('w-full', 'bg-violet-400')}
              {bar('w-5/6', 'bg-slate-200')}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-violet-300 mt-0.5" />
            <div className="flex-1 space-y-1">
              {bar('w-2/3', 'bg-violet-200')}
              {bar('w-1/2', 'bg-slate-200')}
            </div>
          </div>
        </div>
      )
    case 'academic-scholar':
      // Two-column with blue accents
      return (
        <div className="flex h-full flex-col gap-2 bg-white p-3">
          {bar('w-2/3', 'bg-slate-800', 'h-2.5')}
          {bar('w-1/3', 'bg-blue-300')}
          <div className="my-1 border-t border-slate-200" />
          <div className="grid flex-1 grid-cols-2 gap-2">
            <div className="flex flex-col gap-1.5">
              {bar('w-full', 'bg-blue-400')}
              {bar('w-5/6', 'bg-slate-200')}
              {bar('w-2/3', 'bg-slate-200')}
              {bar('w-full', 'bg-blue-400')}
            </div>
            <div className="flex flex-col gap-1.5">
              {bar('w-full', 'bg-blue-400')}
              {bar('w-5/6', 'bg-slate-200')}
              {bar('w-3/4', 'bg-slate-200')}
              {bar('w-2/3', 'bg-slate-200')}
            </div>
          </div>
        </div>
      )
    case 'startup-fresh':
      // Teal sidebar with skill progress bars
      return (
        <div className="grid h-full grid-cols-[35%_1fr] bg-white">
          <div className="flex flex-col gap-2 bg-teal-700 p-3">
            <div className="mx-auto h-6 w-6 rounded-full bg-teal-500" />
            {bar('w-full', 'bg-teal-300')}
            {bar('w-3/4', 'bg-teal-400')}
            <div className="mt-1 space-y-1.5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-teal-900">
                <div className="h-full w-3/4 rounded-full bg-teal-300" />
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-teal-900">
                <div className="h-full w-2/3 rounded-full bg-teal-300" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3">
            {bar('w-3/4', 'bg-teal-700', 'h-2.5')}
            {bar('w-1/3', 'bg-teal-300')}
            {bar('w-full', 'bg-slate-200')}
            {bar('w-5/6', 'bg-slate-200')}
            {bar('w-4/6', 'bg-slate-200')}
          </div>
        </div>
      )
    case 'finance-pro':
      // Dense compact two-column grid
      return (
        <div className="flex h-full flex-col gap-1.5 bg-white p-3">
          {bar('w-1/2', 'bg-slate-900', 'h-2.5')}
          {bar('w-1/4', 'bg-slate-400')}
          <div className="my-1 border-t border-slate-200" />
          <div className="grid flex-1 grid-cols-2 gap-1.5">
            <div className="space-y-1">
              {bar('w-full', 'bg-slate-700')}
              {bar('w-5/6', 'bg-slate-300')}
              {bar('w-2/3', 'bg-slate-300')}
              {bar('w-full', 'bg-slate-300')}
            </div>
            <div className="space-y-1">
              {bar('w-full', 'bg-slate-700')}
              {bar('w-3/4', 'bg-slate-300')}
              {bar('w-5/6', 'bg-slate-300')}
              {bar('w-2/3', 'bg-slate-300')}
            </div>
          </div>
        </div>
      )
    case 'design-portfolio':
      // Rose accent timeline layout
      return (
        <div className="flex h-full flex-col gap-2 bg-white p-3">
          {bar('w-2/3', 'bg-rose-700', 'h-2.5')}
          {bar('w-1/3', 'bg-rose-300')}
          <div className="my-1 border-t border-rose-100" />
          <div className="flex gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-rose-500 mt-0.5" />
            <div className="flex-1 space-y-1">
              {bar('w-full', 'bg-rose-300')}
              {bar('w-3/4', 'bg-rose-100')}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-rose-300 mt-0.5" />
            <div className="flex-1 space-y-1">
              {bar('w-2/3', 'bg-rose-200')}
              {bar('w-1/2', 'bg-rose-100')}
            </div>
          </div>
        </div>
      )
    case 'engineering-precision':
      // Slate header banner + 2-column with skill bars
      return (
        <div className="flex h-full flex-col gap-2 bg-white p-3">
          {bar('w-2/3', 'bg-slate-900', 'h-2.5')}
          <div className="my-1 border-t border-slate-200" />
          <div className="grid flex-1 grid-cols-2 gap-2">
            <div className="flex flex-col gap-1.5">
              {bar('w-full', 'bg-slate-300')}
              {bar('w-5/6', 'bg-slate-200')}
              {bar('w-2/3', 'bg-slate-200')}
            </div>
            <div className="flex flex-col gap-1.5">
              {bar('w-full', 'bg-slate-300')}
              {bar('w-5/6', 'bg-slate-200')}
              {bar('w-3/4', 'bg-slate-200')}
            </div>
          </div>
        </div>
      )
    case 'luxury-premium':
      // Black banner header with gold underline
      return (
        <div className="flex h-full flex-col bg-white">
          <div className="flex flex-col gap-1.5 bg-slate-900 p-3">
            {bar('w-2/3', 'bg-white', 'h-2.5')}
            {bar('w-1/3', 'bg-amber-300')}
          </div>
          <div className="flex flex-1 flex-col gap-2 p-3">
            {bar('w-full', 'bg-amber-200')}
            {bar('w-5/6', 'bg-slate-200')}
            {bar('w-3/4', 'bg-slate-200')}
            {bar('w-full', 'bg-amber-200')}
          </div>
        </div>
      )
    case 'healthcare-clean':
      // Clean white with green accent header + dotted skill rows
      return (
        <div className="flex h-full flex-col gap-2 bg-white p-3">
          {bar('w-2/3', 'bg-emerald-700', 'h-2.5')}
          {bar('w-1/2', 'bg-emerald-400')}
          {bar('w-1/3', 'bg-emerald-300')}
          <div className="my-1 border-t border-emerald-100" />
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {bar('w-full', 'bg-slate-200')}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {bar('w-5/6', 'bg-slate-200')}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {bar('w-2/3', 'bg-slate-200')}
          </div>
        </div>
      )
  }
}
