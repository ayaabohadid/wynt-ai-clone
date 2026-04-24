import { useEffect, useRef, useState } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage, type Lang } from '@/lib/i18n'

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
]

interface Props {
  compact?: boolean
}

export function LanguageSwitcher({ compact = false }: Props) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50',
          'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
        )}
      >
        <Globe className="h-4 w-4" />
        {compact ? (
          <span className="uppercase">{selected.code}</span>
        ) : (
          <>
            <span>{selected.flag}</span>
            <span className="hidden sm:inline">{selected.label}</span>
          </>
        )}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            'absolute end-0 z-50 mt-2 max-h-80 w-48 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-xl',
            'dark:border-slate-700 dark:bg-slate-900'
          )}
        >
          {LANGUAGES.map((opt) => {
            const active = opt.code === lang
            return (
              <button
                key={opt.code}
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLang(opt.code)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-start text-sm transition-colors',
                  active
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                )}
              >
                <span className="text-base">{opt.flag}</span>
                <span className="flex-1">{opt.label}</span>
                {active && <Check className="h-4 w-4" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
