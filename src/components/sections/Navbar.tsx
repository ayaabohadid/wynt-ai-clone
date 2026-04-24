import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useRouter } from '@/lib/router'
import { useLanguage } from '@/lib/i18n'
import { ArrowRight, Menu, X, Zap } from 'lucide-react'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { navigate } = useRouter()
  const { t } = useLanguage()

  const navLinks = [
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.pricing'), href: '#pricing' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span>wynt<span className="text-blue-600 dark:text-blue-400">.ai</span></span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header utilities + auth CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <Button variant="ghost" size="sm" onClick={() => navigate('/signup')}>
              {t('nav.signIn')}
            </Button>
            <Button
              variant="gradient"
              size="sm"
              className="gap-1.5"
              onClick={() => navigate('/signup')}
            >
              {t('nav.getStarted')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile right-side controls */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher compact />
            <ThemeToggle />
            <button
              className="rounded-md p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setOpen(!open)}
              aria-label={t('nav.toggleMenu')}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4 pt-2 dark:border-slate-800 dark:bg-slate-950">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setOpen(false)
                  navigate('/signup')
                }}
              >
                {t('nav.signIn')}
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setOpen(false)
                  navigate('/signup')
                }}
              >
                {t('nav.getStarted')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
