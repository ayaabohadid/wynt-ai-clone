import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from '@/lib/router'
import { ArrowRight, CheckCircle2, Star } from 'lucide-react'

export function Hero() {
  const { navigate } = useRouter()
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-16 dark:bg-slate-950">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-50 opacity-60 blur-3xl dark:bg-blue-950/40" />
        <div className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-violet-50 opacity-50 blur-3xl dark:bg-violet-950/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Pill badge */}
          <Badge variant="purple" className="mb-6 gap-1.5 px-3 py-1 text-xs font-medium">
            <Star className="h-3 w-3 fill-violet-500 text-violet-500" />
            AI-Powered Career Intelligence
          </Badge>

          {/* Headline */}
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
            Your Career,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Intelligently
            </span>{' '}
            Accelerated
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Upload your CV, match against thousands of jobs with AI precision, ace interviews
            with personalised coaching, and land your dream role — all in one platform.
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="gradient"
              size="xl"
              className="gap-2"
              onClick={() => navigate('/signup')}
            >
              Start for Free
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            {[
              'No credit card required',
              'Free tokens included',
              '12 languages supported',
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>

          {/* Dashboard preview card */}
          <div className="relative mt-16 w-full max-w-4xl">
            {/* Floating score card */}
            <div className="absolute -left-4 top-8 z-10 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
              <p className="text-xs font-medium text-slate-500">CV Score</p>
              <div className="mt-1 flex items-end gap-1">
                <span className="text-4xl font-bold text-blue-600">94</span>
                <span className="mb-1 text-sm text-slate-400">/100</span>
              </div>
              <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
              </div>
            </div>

            {/* Floating match card */}
            <div className="absolute -right-4 top-16 z-10 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
              <p className="text-xs font-medium text-slate-500">Job Match</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">92% match</p>
                  <p className="text-xs text-slate-400">Senior Dev role</p>
                </div>
              </div>
            </div>

            {/* Main dashboard mockup */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-4 flex-1 rounded-md bg-white border border-slate-200 px-3 py-1 text-xs text-slate-400">
                  app.wynt.ai/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 p-0">
                {/* Sidebar */}
                <div className="col-span-1 bg-slate-50 p-4">
                  <div className="space-y-1">
                    {['Dashboard', 'CV Analysis', 'Job Search', 'Interviews', 'Applications'].map(
                      (item, i) => (
                        <div
                          key={item}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                            i === 0
                              ? 'bg-blue-600 text-white font-medium'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-slate-300'}`} />
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Main content */}
                <div className="col-span-2 p-6">
                  <h3 className="text-base font-semibold text-slate-800">Welcome back, Alex!</h3>
                  <p className="mt-0.5 text-xs text-slate-500">3 new job matches found today</p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Applications', value: '12', color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: 'Interviews', value: '4', color: 'text-violet-600', bg: 'bg-violet-50' },
                      { label: 'Avg Match', value: '87%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { label: 'Tokens Left', value: '240', color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map(({ label, value, color, bg }) => (
                      <div key={label} className={`rounded-lg ${bg} p-3`}>
                        <p className="text-xs text-slate-500">{label}</p>
                        <p className={`text-xl font-bold ${color}`}>{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-medium text-slate-600">Top Matches</p>
                    {[
                      { title: 'Senior React Developer', company: 'Stripe', match: 94 },
                      { title: 'Full Stack Engineer', company: 'Vercel', match: 89 },
                      { title: 'Frontend Lead', company: 'Linear', match: 82 },
                    ].map(({ title, company, match }) => (
                      <div key={title} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2">
                        <div>
                          <p className="text-xs font-medium text-slate-800">{title}</p>
                          <p className="text-xs text-slate-400">{company}</p>
                        </div>
                        <div className="text-right">
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                            {match}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
