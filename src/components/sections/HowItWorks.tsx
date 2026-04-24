import { Upload, Search, Mic } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Your CV',
    description:
      'Our AI extracts and scores every aspect of your CV — skills, experience, formatting, and ATS compatibility — giving you an actionable intelligence score.',
    highlight: 'AI scoring in seconds',
    color: 'blue',
  },
  {
    step: '02',
    icon: Search,
    title: 'Find & Match Jobs',
    description:
      'Search millions of job postings across 12 languages. Our Deep Match Engine analyses each role across 15+ dimensions and ranks opportunities by your fit.',
    highlight: '15+ match dimensions',
    color: 'violet',
  },
  {
    step: '03',
    icon: Mic,
    title: 'Practice & Apply',
    description:
      'Rehearse with AI interviewers, generate personalised cover letters, negotiate salary, and submit applications — all from one seamless workspace.',
    highlight: '5 AI interviewer personas',
    color: 'emerald',
  },
]

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: 'bg-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    line: 'bg-blue-200',
  },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    icon: 'bg-violet-600',
    badge: 'bg-violet-100 text-violet-700',
    line: 'bg-violet-200',
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    icon: 'bg-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700',
    line: 'bg-emerald-200',
  },
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            How It Works
          </span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            From CV to Offer in Three Steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            A streamlined workflow that puts AI to work at every stage of your job search.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Connecting line desktop */}
          <div className="absolute left-1/2 top-14 hidden h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-blue-200 via-violet-200 to-emerald-200 lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map(({ step, icon: Icon, title, description, highlight, color }) => {
              const c = colorMap[color as keyof typeof colorMap]
              return (
                <div key={step} className="relative flex flex-col items-center text-center">
                  {/* Step number + icon */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className={`mb-3 text-xs font-bold tracking-widest ${c.text}`}>
                      STEP {step}
                    </span>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${c.icon} shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div className={`mt-6 w-full rounded-2xl ${c.bg} p-6`}>
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                    <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${c.badge}`}>
                      ✓ {highlight}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
