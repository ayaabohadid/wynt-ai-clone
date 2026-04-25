import { Mail, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'

export function CoverLetters() {
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {copy('Cover Letters', 'رسائل التقديم')}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'Generate tailored cover letters for any job in seconds',
              'أنشئ رسائل تقديم مخصّصة لأي وظيفة في ثوانٍ'
            )}
          </p>
        </div>
        <Button
          variant="default"
          size="lg"
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
        >
          <Wand2 className="h-4 w-4" />
          {copy('Generate New', 'إنشاء جديدة')}
        </Button>
      </div>

      {/* Empty state card */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-500 dark:bg-indigo-950/50 dark:text-indigo-400">
          <Mail className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          {copy('No cover letters yet', 'لا توجد رسائل تقديم بعد')}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {copy(
            'Generate your first AI-tailored cover letter. Select a CV, paste a job description, and let Wynt AI craft a compelling letter in seconds.',
            'أنشئ أوّل رسالة تقديم مدعومة بالذكاء الاصطناعي. اختر سيرة ذاتية، الصق وصف الوظيفة، ودَع Wynt AI يصيغ رسالة مقنعة في ثوانٍ.'
          )}
        </p>
        <Button
          variant="default"
          size="lg"
          className="mt-6 gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
        >
          <Wand2 className="h-4 w-4" />
          {copy('Generate Your First Cover Letter', 'أنشئ أوّل رسالة تقديم لك')}
        </Button>
      </section>
    </div>
  )
}
