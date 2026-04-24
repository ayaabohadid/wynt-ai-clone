import { useState } from 'react'
import {
  Brain,
  Mic2,
  Wand2,
  BarChart3,
  Link2,
  FileText,
  TrendingUp,
  Globe,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    id: 'deep-match',
    icon: Brain,
    title: 'AI Deep Match Engine',
    tagline: 'Beyond keyword matching',
    description:
      'Our engine analyses your CV against job postings across 15+ dimensions including skills gap, culture fit, career trajectory, seniority alignment, and compensation expectations. Get a granular breakdown — not just a score.',
    preview: (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Match Analysis</p>
        {[
          { label: 'Technical Skills', pct: 94, color: 'bg-blue-500' },
          { label: 'Experience Level', pct: 88, color: 'bg-violet-500' },
          { label: 'Culture Fit', pct: 76, color: 'bg-emerald-500' },
          { label: 'Salary Range', pct: 82, color: 'bg-amber-500' },
          { label: 'Location Match', pct: 100, color: 'bg-teal-500' },
        ].map(({ label, pct, color }) => (
          <div key={label} className="mb-2">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>{label}</span>
              <span className="font-semibold">{pct}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
    color: 'blue',
  },
  {
    id: 'interview',
    icon: Mic2,
    title: 'Interview Studio',
    tagline: '5 AI interviewer personas',
    description:
      'Practice with five distinct AI interviewer personalities — from the tough technical interrogator to the friendly culture-fit chatbot. Voice interviews with real-time feedback help you walk into any room with confidence.',
    preview: (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Choose Your Interviewer</p>
        <div className="grid grid-cols-5 gap-2">
          {[
            { name: 'Alex', role: 'Technical', emoji: '💻', active: true },
            { name: 'Maya', role: 'HR', emoji: '😊', active: false },
            { name: 'Sam', role: 'Exec', emoji: '👔', active: false },
            { name: 'Priya', role: 'PM', emoji: '📋', active: false },
            { name: 'Kai', role: 'Culture', emoji: '🎯', active: false },
          ].map(({ name, role, emoji, active }) => (
            <div
              key={name}
              className={cn(
                'flex flex-col items-center rounded-lg p-2 text-center text-xs cursor-pointer',
                active ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-slate-50 hover:bg-slate-100'
              )}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="font-semibold text-slate-700">{name}</span>
              <span className="text-slate-400">{role}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-slate-900 p-3">
          <p className="text-xs text-slate-400">Alex — Technical Interviewer</p>
          <p className="mt-1 text-sm text-white">"Explain the difference between useCallback and useMemo..."</p>
        </div>
      </div>
    ),
    color: 'violet',
  },
  {
    id: 'wizard',
    icon: Wand2,
    title: 'AI Job Wizard',
    tagline: 'Natural language job search',
    description:
      'Just describe what you want in plain language — "remote senior role in fintech, Berlin time zone, equity-focused" — and our Wizard finds the matches. Works in 12 languages.',
    preview: (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">AI Wizard</p>
        <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700 italic border border-slate-200">
          "Find me a remote senior full-stack role at a Series B startup, Berlin timezone, with meaningful equity"
        </div>
        <div className="mt-3 space-y-2">
          {[
            { title: 'Full Stack Lead', co: 'Lemon.io', match: 96, remote: true },
            { title: 'Senior Engineer', co: 'Pitch', match: 91, remote: true },
            { title: 'Staff Developer', co: 'Personio', match: 88, remote: true },
          ].map(({ title, co, match, remote }) => (
            <div key={title} className="flex items-center justify-between rounded-md bg-white border border-slate-100 px-3 py-2 text-xs">
              <div>
                <span className="font-semibold text-slate-800">{title}</span>
                <span className="mx-1 text-slate-300">·</span>
                <span className="text-slate-500">{co}</span>
                {remote && <span className="ml-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-emerald-700">Remote</span>}
              </div>
              <span className="font-bold text-blue-600">{match}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
    color: 'emerald',
  },
  {
    id: 'cv-intel',
    icon: BarChart3,
    title: 'CV Intelligence',
    tagline: 'Score, improve, optimise',
    description:
      'Get a detailed 94/100 breakdown of your CV with actionable suggestions. ATS compatibility checks, keyword gap analysis, and formatting recommendations — all automated.',
    preview: (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-slate-500">Overall Score</p>
            <div className="flex items-end gap-1">
              <span className="text-5xl font-bold text-blue-600">94</span>
              <span className="mb-1 text-lg text-slate-400">/100</span>
            </div>
          </div>
          <div className="h-20 w-20">
            <svg viewBox="0 0 36 36" className="rotate-[-90deg]">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="3"
                strokeDasharray="94, 100"
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { label: 'ATS Compatibility', score: 'A+', ok: true },
            { label: 'Keyword Coverage', score: '91%', ok: true },
            { label: 'Formatting', score: '✓', ok: true },
            { label: 'Quantified Impact', score: 'Improve', ok: false },
          ].map(({ label, score, ok }) => (
            <div key={label} className="flex items-center justify-between text-xs">
              <span className="text-slate-600">{label}</span>
              <span className={ok ? 'font-semibold text-emerald-600' : 'font-semibold text-amber-500'}>{score}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    color: 'blue',
  },
  {
    id: 'linkedin',
    icon: Link2,
    title: 'LinkedIn Integration',
    tagline: 'Import your profile instantly',
    description:
      'Connect your LinkedIn profile for instant CV generation, one-click job applications, and profile optimisation suggestions based on your target roles.',
    preview: null,
    color: 'violet',
  },
  {
    id: 'cover-letter',
    icon: FileText,
    title: 'Cover Letter Generator',
    tagline: 'Personalised in seconds',
    description:
      'Generate tailored cover letters for every application. Our AI adapts tone, highlights your most relevant experience, and matches the company\'s voice.',
    preview: null,
    color: 'emerald',
  },
]

export function Features() {
  const [active, setActive] = useState('deep-match')
  const current = features.find((f) => f.id === active)!

  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-600">
            Features
          </span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Everything You Need to Land the Role
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Purpose-built AI tools at every stage — from first CV upload to final offer.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Feature list */}
          <div className="space-y-2">
            {features.map(({ id, icon: Icon, title, tagline, color }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  'w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all',
                  active === id
                    ? 'border-blue-200 bg-blue-50 shadow-sm'
                    : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    color === 'blue' && 'bg-blue-100 text-blue-600',
                    color === 'violet' && 'bg-violet-100 text-violet-600',
                    color === 'emerald' && 'bg-emerald-100 text-emerald-600'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="text-sm text-slate-500">{tagline}</p>
                </div>
                <ChevronRight
                  className={cn(
                    'h-4 w-4 shrink-0 text-slate-400 transition-transform',
                    active === id && 'rotate-90 text-blue-600'
                  )}
                />
              </button>
            ))}
          </div>

          {/* Preview panel */}
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-900">{current.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{current.description}</p>
            </div>
            {current.preview ? (
              current.preview
            ) : (
              <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
                <div className="text-center">
                  <current.icon className="mx-auto h-8 w-8 opacity-40" />
                  <p className="mt-2 text-sm">Preview coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Extra feature cards row */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Globe, title: '12 Languages', desc: 'Job search and interviews in your native language' },
            { icon: TrendingUp, title: 'Salary Negotiation', desc: 'AI coach helps you negotiate the offer you deserve' },
            { icon: FileText, title: 'Application Tracker', desc: 'Track every application, interview, and offer in one view' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
