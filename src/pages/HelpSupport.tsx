import { HelpCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'

export function HelpSupport() {
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {copy('Help & Support', 'المساعدة والدعم')}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'Need help? Submit a ticket and our team will get back to you.',
              'محتاجة مساعدة؟ أرسلي تذكرة وفريقنا هيرجعلك.'
            )}
          </p>
        </div>
        <Button
          variant="default"
          size="lg"
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
        >
          <Plus className="h-4 w-4" />
          {copy('New Ticket', 'تذكرة جديدة')}
        </Button>
      </div>

      {/* Empty state */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <HelpCircle className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
        <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
          {copy('No tickets yet', 'لا توجد تذاكر بعد')}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {copy(
            'When you need help, create a support ticket and our team will respond as soon as possible.',
            'عند الحاجة للمساعدة، أنشئ تذكرة دعم وسيستجيب فريقنا في أقرب وقت ممكن.'
          )}
        </p>
      </section>
    </div>
  )
}
