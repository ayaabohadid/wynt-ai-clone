import { useState, type ComponentType } from 'react'
import {
  Briefcase,
  CheckCircle2,
  Code2,
  Download,
  Edit2,
  FileText,
  Globe,
  Key,
  Link as LinkIcon,
  Lock,
  Rocket,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sprout,
  Target,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

function ChromeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3.2" fill="#fff" />
      <path d="M12 4a8 8 0 0 1 6.93 4H12a4 4 0 0 0-3.68 2.45L5.46 6.78A8 8 0 0 1 12 4Zm-7.46 4.18L7.4 12.55A4 4 0 0 0 11 16h.06l-2.84 4.92A8 8 0 0 1 4 12c0-1.36.34-2.65.94-3.78ZM20 12a8 8 0 0 1-7.85 8l3-5.18A4 4 0 0 0 16 12c0-.7-.18-1.36-.5-1.93h4.43c.05.31.07.62.07.93Z" />
    </svg>
  )
}

type GuideTab = 'install' | 'how' | 'connect'

type IconC = ComponentType<{ className?: string }>

export function ChromeExtension() {
  const { lang } = useLanguage()
  const [tab, setTab] = useState<GuideTab>('install')
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  const features: {
    icon: IconC
    iconColor: string
    status: 'live' | 'soon'
    title: string
    desc: string
  }[] = [
    {
      icon: Edit2 as IconC,
      iconColor: 'text-blue-600 dark:text-blue-400',
      status: 'live',
      title: copy('Headline Suggestions', 'اقتراحات العنوان'),
      desc: copy(
        'See 4 AI-generated headline alternatives directly on your LinkedIn profile. Each one takes a different angle — results, value, keywords, or personal brand.',
        'شاهد 4 بدائل عناوين مولّدة بالذكاء الاصطناعي مباشرة على ملف LinkedIn. كل عنوان بزاوية مختلفة — النتائج، القيمة، الكلمات المفتاحية، أو علامتك الشخصية.'
      ),
    },
    {
      icon: Sparkles as IconC,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      status: 'live',
      title: copy('Summary Rewrite Overlay', 'إعادة كتابة الملخّص'),
      desc: copy(
        'A floating badge appears on your About section with a complete AI-rewritten summary. Copy and paste it directly into LinkedIn.',
        'تظهر شارة عائمة على قسم "نبذة عنك" تحتوي على ملخّص مُعاد كتابته بالكامل بالذكاء الاصطناعي. انسخه والصقه مباشرة في LinkedIn.'
      ),
    },
    {
      icon: Briefcase as IconC,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      status: 'live',
      title: copy('Experience Bullet Rewrites', 'إعادة كتابة نقاط الخبرة'),
      desc: copy(
        'For each experience entry, get 3-5 improved bullet points with action verbs, metrics, and impact. Copy-paste ready.',
        'لكل خبرة، احصل على 3-5 نقاط مُحسَّنة بأفعال قوية وأرقام وأثر. جاهزة للنسخ واللصق.'
      ),
    },
    {
      icon: Key as IconC,
      iconColor: 'text-amber-500 dark:text-amber-400',
      status: 'live',
      title: copy('Keyword Optimization', 'تحسين الكلمات المفتاحية'),
      desc: copy(
        'See which keywords are strong, weak, or missing from your profile. Each comes with example sentences you can add.',
        'شاهد أي الكلمات المفتاحية قوية أو ضعيفة أو ناقصة في ملفك. كل واحدة تأتي مع جمل مثال يمكنك إضافتها.'
      ),
    },
    {
      icon: Target as IconC,
      iconColor: 'text-rose-600 dark:text-rose-400',
      status: 'live',
      title: copy('Profile Score Badge', 'شارة تقييم الملف'),
      desc: copy(
        'A floating score badge shows your overall profile strength. Click it to jump to your full Wynt dashboard analysis.',
        'شارة تقييم عائمة تعرض قوة ملفك الإجمالية. اضغط عليها للانتقال إلى تحليل Wynt الكامل.'
      ),
    },
    {
      icon: Rocket as IconC,
      iconColor: 'text-violet-600 dark:text-violet-400',
      status: 'soon',
      title: copy('Auto-Fill Applications', 'تعبئة تلقائية للطلبات'),
      desc: copy(
        'One-click auto-fill for job applications on LinkedIn Easy Apply, Workday, Greenhouse, and 50+ ATS platforms.',
        'تعبئة تلقائية بنقرة واحدة لطلبات الوظائف على LinkedIn Easy Apply وWorkday وGreenhouse و50+ منصة ATS.'
      ),
    },
  ]

  const supportedSites: {
    icon: IconC
    name: Record<Lang, string>
    status: 'live' | 'soon'
  }[] = [
    { icon: LinkIcon as IconC, name: { en: 'LinkedIn Profiles', ar: 'ملفات LinkedIn' }, status: 'live' },
    { icon: Briefcase as IconC, name: { en: 'LinkedIn Jobs', ar: 'وظائف LinkedIn' }, status: 'soon' },
    { icon: Search as IconC, name: { en: 'Indeed', ar: 'Indeed' }, status: 'soon' },
    { icon: FileText as IconC, name: { en: 'Glassdoor', ar: 'Glassdoor' }, status: 'soon' },
    { icon: Settings as IconC, name: { en: 'Workday', ar: 'Workday' }, status: 'soon' },
    { icon: Sprout as IconC, name: { en: 'Greenhouse', ar: 'Greenhouse' }, status: 'soon' },
  ]

  const tabs: { value: GuideTab; label: Record<Lang, string>; icon: IconC }[] = [
    { value: 'install', label: { en: 'Install', ar: 'تثبيت' }, icon: Download as IconC },
    { value: 'how', label: { en: 'How It Works', ar: 'كيف تعمل' }, icon: Code2 as IconC },
    { value: 'connect', label: { en: 'Connect', ar: 'اتّصل' }, icon: Lock as IconC },
  ]

  const installSteps: { title: string; desc: string; icon: IconC }[] = [
    {
      icon: Download as IconC,
      title: copy('Download the Extension', 'حمّل الإضافة'),
      desc: copy(
        'Click the download button below to get the Wynt AI Chrome Extension as a ZIP file.',
        'اضغط زر التحميل بالأسفل للحصول على إضافة Wynt AI لـ Chrome كملف ZIP.'
      ),
    },
    {
      icon: Settings as IconC,
      title: copy('Unzip & Open Chrome Extensions', 'فك الضغط وافتح Chrome Extensions'),
      desc: copy(
        'Unzip the file, then navigate to chrome://extensions in your browser and enable Developer Mode in the top right.',
        'فك ضغط الملف، ثم انتقل إلى chrome://extensions في المتصفّح وفعّل وضع المطوّر في الأعلى.'
      ),
    },
    {
      icon: Briefcase as IconC,
      title: copy('Load the Extension', 'حمّل الإضافة'),
      desc: copy(
        'Click \'Load unpacked\' and select the unzipped extension folder. The Wynt icon will appear in your toolbar.',
        'اضغط "Load unpacked" واختر مجلّد الإضافة المفكوك. ستظهر أيقونة Wynt في شريط الأدوات.'
      ),
    },
    {
      icon: Lock as IconC,
      title: copy('Connect Your Account', 'اتّصل بحسابك'),
      desc: copy(
        'Click the Wynt icon, enter your dashboard URL and API token. Your analysis data will sync automatically.',
        'اضغط أيقونة Wynt، أدخل رابط لوحة التحكم ومفتاح API. ستتزامن بيانات تحليلك تلقائياً.'
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
                  <Icon className={cn('h-6 w-6', f.iconColor)} />
                  {f.status === 'live' ? (
                    <span className="inline-flex rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
                      {copy('Live', 'متاح')}
                    </span>
                  ) : (
                    <span className="inline-flex rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400">
                      {copy('Coming Soon', 'قريباً')}
                    </span>
                  )}
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

      {/* Supported Sites */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            {copy('Supported Sites', 'المواقع المدعومة')}
          </h2>
          <span className="rounded-md border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
            6 {copy('platforms', 'منصة')}
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {supportedSites.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.name.en}
                className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                    {s.name[lang]}
                  </p>
                  <p
                    className={cn(
                      'truncate text-[11px] font-medium',
                      s.status === 'live'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-500 dark:text-slate-400'
                    )}
                  >
                    {s.status === 'live' ? copy('Live', 'متاح') : copy('Coming soon', 'قريباً')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tab buttons */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = tab === t.value
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-slate-700'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4',
                  active ? 'text-blue-600 dark:text-blue-400' : ''
                )}
              />
              {t.label[lang]}
            </button>
          )
        })}
      </div>

      {/* Installation Guide */}
      <section className="mt-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          {tab === 'install' && copy('Installation Guide', 'دليل التثبيت')}
          {tab === 'how' && copy('How It Works', 'كيف تعمل')}
          {tab === 'connect' && copy('Connect Your Account', 'اتّصل بحسابك')}
        </h2>

        {tab === 'install' && (
          <>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {installSteps.map((step, i) => {
                const StepIcon = step.icon
                return (
                  <div
                    key={step.title}
                    className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="inline-flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                        <StepIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        {step.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Download ZIP CTA */}
            <div className="mt-6 flex justify-center">
              <Button
                variant="default"
                size="lg"
                className="gap-2 bg-blue-700 px-6 hover:bg-blue-800 focus-visible:ring-blue-700"
              >
                <Download className="h-4 w-4" />
                {copy('Download Extension ZIP', 'حمّل الإضافة ZIP')}
              </Button>
            </div>
          </>
        )}

        {tab === 'how' && (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              {copy(
                'The Wynt AI extension injects a lightweight overlay onto LinkedIn profiles. It runs entirely in your browser — your profile content is sent to Wynt only when you click "Analyze".',
                'إضافة Wynt AI تُحقن طبقة خفيفة على ملفات LinkedIn. تعمل بالكامل في المتصفّح — يُرسل محتوى ملفك إلى Wynt فقط عند الضغط على "تحليل".'
              )}
            </p>
            <p>
              {copy(
                'Headline, summary, and experience suggestions are generated using your CV context plus the live profile content. All copy is editable before pasting back into LinkedIn.',
                'تُنشأ اقتراحات العنوان والملخّص والخبرة باستخدام سياق سيرتك الذاتية ومحتوى الملف الحي. كل النصوص قابلة للتعديل قبل لصقها في LinkedIn.'
              )}
            </p>
          </div>
        )}

        {tab === 'connect' && (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              {copy(
                'Generate an Extension API Key from your Profile page, then paste it into the extension popup to link your Wynt account.',
                'أنشئ مفتاح API للإضافة من صفحة ملفك الشخصي، ثم الصقه في نافذة الإضافة لربط حساب Wynt.'
              )}
            </p>
            <p>
              {copy(
                'Your token usage and history sync automatically with the dashboard. You can revoke or rotate the key at any time.',
                'يتزامن استخدام التوكنات والتاريخ تلقائياً مع لوحة التحكم. يمكنك إلغاء المفتاح أو تدويره في أي وقت.'
              )}
            </p>
          </div>
        )}
      </section>

      {/* Optimize Your LinkedIn Profile hero */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12 text-center dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 shadow-sm dark:bg-violet-950/50 dark:text-violet-400">
          <span className="text-2xl font-extrabold">in</span>
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {copy('Optimize Your LinkedIn Profile', 'حسّن ملفك على LinkedIn')}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {copy(
            'Run a LinkedIn Analysis on the dashboard first, then install the extension to see AI suggestions overlaid directly on your LinkedIn profile.',
            'شغّل تحليل LinkedIn من لوحة التحكم أوّلاً، ثم ثبّت الإضافة لرؤية اقتراحات الذكاء الاصطناعي مباشرة على ملفك.'
          )}
        </p>
        <Button
          variant="default"
          size="lg"
          className="mt-6 gap-2 bg-blue-700 px-6 hover:bg-blue-800 focus-visible:ring-blue-700"
        >
          <Download className="h-4 w-4" />
          {copy('Download Extension', 'حمّل الإضافة')}
        </Button>
      </section>
    </div>
  )
}
