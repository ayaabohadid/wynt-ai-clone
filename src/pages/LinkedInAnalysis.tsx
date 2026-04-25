import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  )
}

export function LinkedInAnalysis() {
  const { lang } = useLanguage()
  const [url, setUrl] = useState('')
  const copy = (en: string, ar: string) => (lang === 'ar' ? ar : en)
  const canSubmit = url.trim().length > 0

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <LinkedinIcon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {copy('LinkedIn Analysis', 'تحليل LinkedIn')}
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {copy(
              'AI-powered analysis of any LinkedIn profile',
              'تحليل مدعوم بالذكاء الاصطناعي لأي ملف LinkedIn'
            )}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
          <Sparkles className="h-3 w-3" />
          5 {copy('tokens', 'توكنات')}
        </span>
      </header>

      {/* Search card */}
      <div className="mt-6 rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50/60 to-indigo-50/60 p-4 dark:border-blue-900/30 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <LinkedinIcon className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-600 dark:text-blue-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={copy('LinkedIn URL or username', 'رابط LinkedIn أو اسم المستخدم')}
              className="w-full rounded-xl border border-transparent bg-white px-4 py-3.5 ps-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:bg-slate-900 dark:text-white"
            />
          </div>
          <Button
            variant="default"
            size="lg"
            disabled={!canSubmit}
            className={cn(
              'gap-2 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600',
              !canSubmit && 'bg-indigo-400 hover:bg-indigo-400 dark:bg-indigo-700/50'
            )}
          >
            <Search className="h-4 w-4" />
            {copy('Analyze', 'حلّل')}
          </Button>
        </div>
      </div>
    </div>
  )
}
