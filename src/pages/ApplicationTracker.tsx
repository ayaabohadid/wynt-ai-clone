import { BarChart3, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import type { NavKey } from '@/components/layout/DashboardSidebar'

interface Props {
  onNavigate: (key: NavKey) => void
}

export function ApplicationTracker({ onNavigate }: Props) {
  const { lang } = useLanguage()
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {copy('Application Tracker', 'متتبّع الطلبات')}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {copy(
            'Track and manage all your job applications in one place.',
            'تتبّع وأدر كل طلبات الوظائف في مكان واحد.'
          )}
        </p>
      </header>

      {/* Empty state */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <BarChart3 className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
        <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
          {copy('No applications tracked', 'لا توجد طلبات مُتتبَّعة')}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          {copy(
            'Save jobs from the job listing to track your applications here.',
            'احفظ وظائف من قائمة الوظائف لتتبّع طلباتك هنا.'
          )}
        </p>
        <Button
          variant="default"
          size="lg"
          className="mt-5 gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
          onClick={() => onNavigate('livefeed')}
        >
          <Search className="h-4 w-4" />
          {copy('Find Jobs', 'ابحث عن وظائف')}
        </Button>
      </section>
    </div>
  )
}
