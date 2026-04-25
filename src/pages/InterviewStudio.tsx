import { Brain, Mic, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'

export function InterviewStudio() {
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {copy('Interview Studio', 'استوديو المقابلات')}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'Practice with AI-powered mock interviews tailored to your target roles',
              'تدرّب مع مقابلات وهمية مدعومة بالذكاء الاصطناعي مصمّمة لأدوارك المستهدفة'
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg" className="gap-2">
            <PlayCircle className="h-4 w-4" />
            {copy('Text Interview', 'مقابلة نصية')}
          </Button>
          <Button
            variant="default"
            size="lg"
            className="gap-2 bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-600"
          >
            <Mic className="h-4 w-4" />
            {copy('Voice Interview', 'مقابلة صوتية')}
          </Button>
        </div>
      </div>

      {/* Empty state card */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
          <Brain className="h-7 w-7 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          {copy('No interviews yet', 'لا توجد مقابلات بعد')}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {copy(
            'Start your first mock interview to practice answering questions with AI-powered feedback and scoring.',
            'ابدأ أول مقابلة وهمية لك لتتدرّب على الإجابة على الأسئلة مع ملاحظات وتقييم بالذكاء الاصطناعي.'
          )}
        </p>
      </section>
    </div>
  )
}
