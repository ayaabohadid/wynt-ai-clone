import {
  Briefcase,
  CheckCircle2,
  Download,
  Edit2,
  Link as LinkIcon,
  Settings,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'

function ChromeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3.2" fill="#fff" />
      <path d="M12 4a8 8 0 0 1 6.93 4H12a4 4 0 0 0-3.68 2.45L5.46 6.78A8 8 0 0 1 12 4Zm-7.46 4.18L7.4 12.55A4 4 0 0 0 11 16h.06l-2.84 4.92A8 8 0 0 1 4 12c0-1.36.34-2.65.94-3.78ZM20 12a8 8 0 0 1-7.85 8l3-5.18A4 4 0 0 0 16 12c0-.7-.18-1.36-.5-1.93h4.43c.05.31.07.62.07.93Z" />
    </svg>
  )
}

export function ChromeExtension() {
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const features = [
    {
      icon: Edit2,
      iconColor: 'text-blue-600 dark:text-blue-400',
      title: copy('Headline Suggestions', 'اقتراحات العنوان'),
      desc: copy(
        'See 4 AI-generated headline alternatives directly on your LinkedIn profile. Each one takes a different angle — results, value, keywords, or personal brand.',
        'شاهد 4 بدائل عناوين مولّدة بالذكاء الاصطناعي مباشرة على ملف LinkedIn. كل عنوان بزاوية مختلفة — النتائج، القيمة، الكلمات المفتاحية، أو علامتك الشخصية.'
      ),
    },
    {
      icon: Sparkles,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      title: copy('Summary Rewrite Overlay', 'إعادة كتابة الملخّص'),
      desc: copy(
        'A floating badge appears on your About section with a complete AI-rewritten summary. Copy and paste it directly into LinkedIn.',
        'تظهر شارة عائمة على قسم "نبذة عنك" تحتوي على ملخّص مُعاد كتابته بالكامل بالذكاء الاصطناعي. انسخه والصقه مباشرة في LinkedIn.'
      ),
    },
    {
      icon: Briefcase,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      title: copy('Experience Bullet Rewrites', 'إعادة كتابة نقاط الخبرة'),
      desc: copy(
        'For each experience entry, get 3-5 improved bullet points with action verbs, metrics, and impact. Copy-paste ready.',
        'لكل خبرة، احصل على 3-5 نقاط مُحسَّنة بأفعال قوية وأرقام وأثر. جاهزة للنسخ واللصق.'
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      {/* Hero card */}
      <section className="relative overflow-hidden rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 p-6 dark:border-blue-900/30 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-violet-950/30 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left content */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <ChromeIcon className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <CheckCircle2 className="h-3 w-3" />
                {copy('Available Now', 'متاحة الآن')}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {copy('Wynt AI LinkedIn Extension', 'إضافة Wynt AI لـ LinkedIn')}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {copy(
                'Get AI-powered suggestions overlaid directly on LinkedIn profiles. See headline alternatives, summary rewrites, experience bullet improvements, and keyword optimization — all without leaving LinkedIn.',
                'احصل على اقتراحات مدعومة بالذكاء الاصطناعي تظهر مباشرة على ملفات LinkedIn. شاهد بدائل العنوان، وإعادة صياغة الملخّص، وتحسين نقاط الخبرة، وتحسين الكلمات المفتاحية — كل هذا دون مغادرة LinkedIn.'
              )}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Button
                variant="default"
                size="lg"
                className="gap-2 bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-700"
              >
                <Download className="h-4 w-4" />
                {copy('Download Extension', 'حمّل الإضافة')}
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Settings className="h-4 w-4" />
                {copy('Install Guide', 'دليل التثبيت')}
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                {copy('Privacy-first', 'الخصوصية أولاً')}
              </span>
              <span className="inline-flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" />
                {copy('Lightweight', 'خفيفة')}
              </span>
              <span className="inline-flex items-center gap-1">
                <LinkIcon className="h-3.5 w-3.5" />
                {copy('LinkedIn overlay', 'طبقة LinkedIn')}
              </span>
            </div>
          </div>

          {/* Right preview card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between bg-blue-700 px-4 py-3">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4" />
                <span className="font-bold">Wynt.AI</span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {copy('Connected', 'متّصل')}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">85</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {copy('Profile Score', 'تقييم الملف')}
                  </p>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {copy('Strong', 'قوي')}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Edit2 className="h-3.5 w-3.5 text-blue-500" />
                  {copy('4 headline suggestions', '4 اقتراحات عنوان')}
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  {copy('Summary rewrite ready', 'إعادة كتابة الملخّص جاهزة')}
                </li>
                <li className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-amber-500" />
                  {copy('3 experience rewrites', '3 إعادة كتابات للخبرة')}
                </li>
              </ul>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-700"
                >
                  {copy('Show Overlay', 'إظهار الطبقة')}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  {copy('Dashboard', 'لوحة التحكم')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extension Features */}
      <section className="mt-8">
        <h2 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Zap className="h-6 w-6 fill-blue-500 text-blue-600" />
          {copy('Extension Features', 'مميزات الإضافة')}
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <Icon className={`h-6 w-6 ${f.iconColor}`} />
                  <span className="inline-flex rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
                    {copy('Live', 'متاح')}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {f.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
