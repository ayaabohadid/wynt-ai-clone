import { Zap } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export function Footer() {
  const { t } = useLanguage()
  const links = {
    [t('footer.product')]: ['Features', 'How It Works', 'Pricing', 'Changelog'],
    [t('footer.company')]: ['About', 'Blog', 'Careers', 'Press'],
    [t('footer.legal')]: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    [t('footer.support')]: ['Help Centre', 'Contact', 'Status', 'API Docs'],
  }

  return (
    <footer className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span>
                wynt<span className="text-blue-600 dark:text-blue-400">.ai</span>
              </span>
            </a>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed dark:text-slate-400">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {category}
              </p>
              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row dark:border-slate-800">
          <p className="text-xs text-slate-400 dark:text-slate-500">{t('footer.rights')}</p>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'GitHub'].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-slate-400 hover:text-slate-700 transition-colors dark:text-slate-500 dark:hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
