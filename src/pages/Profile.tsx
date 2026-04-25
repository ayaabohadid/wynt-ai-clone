import { Settings, Sparkles, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import { getCurrentUser } from '@/lib/auth'

export function Profile() {
  const { lang } = useLanguage()
  const user = getCurrentUser()
  const userName = user?.name || 'Aya Abo Hadid'
  const userEmail = user?.email || 'ayaabohadid@gmail.com'
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('')

  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)
  const notSet = copy('Not set', 'لم يُحدَّد')

  const personalFields: { label: string; value: string }[] = [
    { label: copy('HEADLINE', 'العنوان'), value: notSet },
    { label: copy('LOCATION', 'الموقع'), value: notSet },
    { label: copy('PHONE', 'الهاتف'), value: notSet },
    { label: copy('LINKEDIN', 'LinkedIn'), value: notSet },
    { label: copy('PORTFOLIO', 'المحفظة'), value: notSet },
  ]

  const prefFields: { label: string; value: string; set: boolean }[] = [
    {
      label: copy('PREFERRED JOB TITLE', 'المسمى الوظيفي المفضّل'),
      value: copy('Software Engineer', 'مهندس برمجيات'),
      set: true,
    },
    {
      label: copy('PREFERRED INDUSTRY', 'الصناعة المفضّلة'),
      value: copy('Not Set', 'لم تُحدَّد'),
      set: false,
    },
    {
      label: copy('PREFERRED COUNTRY', 'الدولة المفضّلة'),
      value: copy('Egypt', 'مصر'),
      set: true,
    },
    {
      label: copy('PREFERRED CITY', 'المدينة المفضّلة'),
      value: copy('Not Set', 'لم تُحدَّد'),
      set: false,
    },
    {
      label: copy('JOB TYPE', 'نوع الوظيفة'),
      value: copy('Full-Time', 'دوام كامل'),
      set: true,
    },
    {
      label: copy('EXPERIENCE LEVEL', 'مستوى الخبرة'),
      value: copy('Entry', 'مبتدئ'),
      set: true,
    },
    {
      label: copy('SALARY EXPECTATION', 'الراتب المتوقّع'),
      value: '60000 USD',
      set: true,
    },
    {
      label: copy('REMOTE PREFERENCE', 'تفضيل العمل عن بُعد'),
      value: copy('Hybrid', 'هجين'),
      set: true,
    },
    {
      label: copy('NOTICE PERIOD', 'فترة الإشعار'),
      value: copy('Immediate', 'فوري'),
      set: true,
    },
    {
      label: copy('WILLING TO RELOCATE', 'مستعد للانتقال'),
      value: copy('Yes', 'نعم'),
      set: true,
    },
  ]

  const slcFields: { label: string; empty: string }[] = [
    {
      label: copy('SKILLS', 'المهارات'),
      empty: copy('No skills added', 'لم تُضَف مهارات'),
    },
    {
      label: copy('LANGUAGES', 'اللغات'),
      empty: copy('No languages added', 'لم تُضَف لغات'),
    },
    {
      label: copy('CERTIFICATIONS', 'الشهادات'),
      empty: copy('No certifications added', 'لم تُضَف شهادات'),
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {copy('Profile', 'الملف الشخصي')}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'Manage your personal information and job search preferences.',
              'أدر معلوماتك الشخصية وتفضيلات البحث الوظيفي.'
            )}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          {copy('Edit Profile', 'تعديل الملف')}
        </Button>
      </div>

      {/* Identity card */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{userName}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{userEmail}</p>
            <span className="mt-2 inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {copy('Free Plan', 'الخطة المجانية')}
            </span>
          </div>
        </div>

        <div className="my-6 border-t border-slate-100 dark:border-slate-800" />

        <p className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400">
          {copy('PERSONAL INFORMATION', 'المعلومات الشخصية')}
        </p>
        <div className="mt-5 grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {personalFields.map((f) => (
            <div key={f.label}>
              <p className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400">
                {f.label}
              </p>
              <p className="mt-1 text-sm italic text-slate-400 dark:text-slate-500">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job search preferences */}
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h3 className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400">
          <Target className="h-4 w-4 text-indigo-500" />
          {copy('JOB SEARCH PREFERENCES', 'تفضيلات البحث الوظيفي')}
        </h3>
        <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {prefFields.map((f) => (
            <div key={f.label}>
              <p className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400">
                {f.label}
              </p>
              <p
                className={
                  f.set
                    ? 'mt-1 text-sm font-medium text-slate-900 dark:text-white'
                    : 'mt-1 text-sm italic text-slate-400 dark:text-slate-500'
                }
              >
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills, Languages & Certifications */}
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h3 className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400">
          <Sparkles className="h-4 w-4 text-violet-500" />
          {copy(
            'SKILLS, LANGUAGES & CERTIFICATIONS',
            'المهارات واللغات والشهادات'
          )}
        </h3>
        <div className="mt-5 space-y-5">
          {slcFields.map((f) => (
            <div key={f.label}>
              <p className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400">
                {f.label}
              </p>
              <p className="mt-1 text-sm italic text-slate-400 dark:text-slate-500">{f.empty}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
