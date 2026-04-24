import { useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Globe2,
  MapPin,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Upload,
  Zap,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type Answers = {
  careerLevel: string
  targetRoles: string[]
  experience: string
  workArrangement: string[]
  location: string
  salaryMin: string
  salaryMax: string
  currency: string
  skills: string[]
  industries: string[]
  timing: string
  cvName: string
}

const initial: Answers = {
  careerLevel: '',
  targetRoles: [],
  experience: '',
  workArrangement: [],
  location: '',
  salaryMin: '',
  salaryMax: '',
  currency: 'USD',
  skills: [],
  industries: [],
  timing: '',
  cvName: '',
}

const STEPS = 12

export function Onboarding() {
  const { navigate } = useRouter()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>(initial)

  const update = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }))

  const toggle = <K extends keyof Answers>(key: K, value: string) =>
    setAnswers((a) => {
      const arr = a[key] as unknown as string[]
      return {
        ...a,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      } as Answers
    })

  const next = () => setStep((s) => Math.min(s + 1, STEPS))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const canAdvance = (() => {
    switch (step) {
      case 1: return true
      case 2: return !!answers.careerLevel
      case 3: return answers.targetRoles.length > 0
      case 4: return !!answers.experience
      case 5: return answers.workArrangement.length > 0
      case 6: return !!answers.location.trim()
      case 7: return !!answers.salaryMin && !!answers.salaryMax
      case 8: return answers.skills.length >= 3
      case 9: return answers.industries.length > 0
      case 10: return !!answers.timing
      case 11: return true
      case 12: return true
      default: return true
    }
  })()

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-950/40" />
        <div className="absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-950/30" />
      </div>

      {/* Top bar */}
      <div className="relative border-b border-slate-200/60 bg-white/60 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span>
              wynt<span className="text-blue-600 dark:text-blue-400">.ai</span>
            </span>
          </Link>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Step <span className="text-slate-900 dark:text-white">{step}</span> of {STEPS}
          </span>
          {step < STEPS ? (
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Skip for now
            </button>
          ) : (
            <span className="w-[80px]" />
          )}
        </div>
        {/* Progress bar */}
        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-r-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500"
            style={{ width: `${(step / STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-2xl flex-col px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {step === 1 && <Step1 onStart={next} />}
          {step === 2 && (
            <StepShell
              icon={<TrendingUp className="h-5 w-5" />}
              eyebrow="About you"
              title="What's your current career level?"
              subtitle="We'll tune matches and interview prep to your seniority."
            >
              <RadioGrid
                value={answers.careerLevel}
                onChange={(v) => update('careerLevel', v)}
                options={[
                  { value: 'entry', label: 'Entry', desc: 'First job / intern' },
                  { value: 'junior', label: 'Junior', desc: '1–2 years' },
                  { value: 'mid', label: 'Mid', desc: '3–5 years' },
                  { value: 'senior', label: 'Senior', desc: '5–8 years' },
                  { value: 'lead', label: 'Lead / Staff', desc: '8–12 years' },
                  { value: 'exec', label: 'Executive', desc: 'Director+' },
                ]}
              />
            </StepShell>
          )}
          {step === 3 && (
            <StepShell
              icon={<Target className="h-5 w-5" />}
              eyebrow="Role"
              title="What roles are you looking for?"
              subtitle="Select all that apply — we'll prioritise these across 50+ boards."
            >
              <ChipGroup
                values={answers.targetRoles}
                onToggle={(v) => toggle('targetRoles', v)}
                options={[
                  'Software Engineer',
                  'Frontend Developer',
                  'Backend Developer',
                  'Full Stack Developer',
                  'Mobile Developer',
                  'DevOps / SRE',
                  'Data Scientist',
                  'Data Engineer',
                  'ML Engineer',
                  'Product Manager',
                  'Product Designer',
                  'UX Researcher',
                  'Engineering Manager',
                  'Marketing',
                  'Sales',
                  'Customer Success',
                ]}
              />
            </StepShell>
          )}
          {step === 4 && (
            <StepShell
              icon={<Briefcase className="h-5 w-5" />}
              eyebrow="Experience"
              title="How many years of experience do you have?"
              subtitle="Don't stress the exact number — we use ranges."
            >
              <RadioGrid
                value={answers.experience}
                onChange={(v) => update('experience', v)}
                options={[
                  { value: '0-1', label: '0–1', desc: 'Just starting' },
                  { value: '1-3', label: '1–3', desc: 'Early career' },
                  { value: '3-5', label: '3–5', desc: 'Growing' },
                  { value: '5-10', label: '5–10', desc: 'Experienced' },
                  { value: '10+', label: '10+', desc: 'Veteran' },
                  { value: 'prefer-not', label: 'Prefer not to say', desc: '' },
                ]}
              />
            </StepShell>
          )}
          {step === 5 && (
            <StepShell
              icon={<Globe2 className="h-5 w-5" />}
              eyebrow="Work style"
              title="Where do you want to work?"
              subtitle="Multi-select — pick anything that works for you."
            >
              <RadioGrid
                multi
                value={answers.workArrangement}
                onMultiToggle={(v) => toggle('workArrangement', v)}
                options={[
                  { value: 'remote', label: 'Remote', desc: 'Work from anywhere' },
                  { value: 'hybrid', label: 'Hybrid', desc: 'Mix of office + home' },
                  { value: 'onsite', label: 'On-site', desc: 'In the office' },
                ]}
              />
            </StepShell>
          )}
          {step === 6 && (
            <StepShell
              icon={<MapPin className="h-5 w-5" />}
              eyebrow="Location"
              title="Where are you based?"
              subtitle="City, region, or country — we'll factor in time zone and visa."
            >
              <input
                type="text"
                value={answers.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="e.g. Berlin, Germany"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {['Remote — Global', 'London, UK', 'Berlin, DE', 'New York, US', 'Dubai, UAE'].map(
                  (s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update('location', s)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      {s}
                    </button>
                  )
                )}
              </div>
            </StepShell>
          )}
          {step === 7 && (
            <StepShell
              icon={<DollarSign className="h-5 w-5" />}
              eyebrow="Compensation"
              title="What salary are you targeting?"
              subtitle="Ballpark is fine — only shown to matched employers."
            >
              <div className="grid grid-cols-[100px_1fr_1fr] gap-3">
                <select
                  value={answers.currency}
                  onChange={(e) => update('currency', e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  {['USD', 'EUR', 'GBP', 'AED', 'SAR'].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <NumberInput
                  placeholder="Min"
                  value={answers.salaryMin}
                  onChange={(v) => update('salaryMin', v)}
                />
                <NumberInput
                  placeholder="Max"
                  value={answers.salaryMax}
                  onChange={(v) => update('salaryMax', v)}
                />
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Annual gross amount. Leave equity and bonuses aside for now.
              </p>
            </StepShell>
          )}
          {step === 8 && (
            <StepShell
              icon={<Sparkles className="h-5 w-5" />}
              eyebrow="Skills"
              title="Pick at least 3 top skills"
              subtitle="We score every job match against these — the more accurate, the better."
            >
              <ChipGroup
                values={answers.skills}
                onToggle={(v) => toggle('skills', v)}
                options={[
                  'TypeScript',
                  'React',
                  'Node.js',
                  'Python',
                  'Java',
                  'Go',
                  'Rust',
                  'SQL',
                  'PostgreSQL',
                  'MongoDB',
                  'AWS',
                  'GCP',
                  'Docker',
                  'Kubernetes',
                  'GraphQL',
                  'Next.js',
                  'Tailwind CSS',
                  'Figma',
                  'Product strategy',
                  'A/B testing',
                  'Data analysis',
                  'Leadership',
                ]}
              />
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {answers.skills.length} selected · {Math.max(3 - answers.skills.length, 0)} more to continue
              </p>
            </StepShell>
          )}
          {step === 9 && (
            <StepShell
              icon={<Star className="h-5 w-5" />}
              eyebrow="Industries"
              title="Which industries excite you most?"
              subtitle="We'll weight matches toward these."
            >
              <ChipGroup
                values={answers.industries}
                onToggle={(v) => toggle('industries', v)}
                options={[
                  'SaaS',
                  'Fintech',
                  'Healthtech',
                  'E-commerce',
                  'AI / ML',
                  'Climate',
                  'Web3',
                  'Gaming',
                  'EdTech',
                  'Cybersecurity',
                  'Media',
                  'Enterprise',
                  'Consumer',
                  'Consulting',
                ]}
              />
            </StepShell>
          )}
          {step === 10 && (
            <StepShell
              icon={<Clock className="h-5 w-5" />}
              eyebrow="Timing"
              title="How soon are you looking to move?"
              subtitle="Sets the urgency on your match feed."
            >
              <RadioGrid
                value={answers.timing}
                onChange={(v) => update('timing', v)}
                options={[
                  { value: 'asap', label: 'ASAP', desc: 'Actively applying' },
                  { value: '1m', label: 'Within 1 month', desc: 'Ready to interview' },
                  { value: '3m', label: 'Within 3 months', desc: 'Open to strong offers' },
                  { value: 'exploring', label: 'Just exploring', desc: 'Passively browsing' },
                ]}
              />
            </StepShell>
          )}
          {step === 11 && (
            <StepShell
              icon={<FileText className="h-5 w-5" />}
              eyebrow="CV"
              title="Upload your CV"
              subtitle="We'll extract your skills and score it — optional, takes ~10s."
            >
              <FileUpload
                name={answers.cvName}
                onChange={(name) => update('cvName', name)}
                onClear={() => update('cvName', '')}
              />
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                PDF, DOCX, or TXT · max 5MB · or skip and add later from your dashboard.
              </p>
            </StepShell>
          )}
          {step === 12 && <Step12 answers={answers} onFinish={() => navigate('/')} />}

          {/* Nav buttons (hidden on step 1 and 12 which have their own) */}
          {step > 1 && step < 12 && (
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
              <Button variant="outline" onClick={back} className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={next} className="text-slate-500 dark:text-slate-400">
                  Skip
                </Button>
                <Button
                  variant="gradient"
                  onClick={next}
                  disabled={!canAdvance}
                  className="gap-1.5"
                >
                  {step === 11 ? 'Finish' : 'Continue'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Powered by Wynt.AI — Your Career Copilot
        </p>
      </div>
    </div>
  )
}

/* ---------- Step 1: Welcome ---------- */

function Step1({ onStart }: { onStart: () => void }) {
  const features = [
    { icon: Target, label: 'AI Job Matching' },
    { icon: FileText, label: 'Smart CV Builder' },
    { icon: Rocket, label: 'Auto Apply' },
    { icon: Sparkles, label: 'Interview Studio' },
  ]
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg">
        <Sparkles className="h-8 w-8 text-white" />
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        Welcome to Wynt AI
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        Hello, there!
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Let's personalize your job search experience. We'll ask a few quick questions to find the
        best opportunities for you.
      </p>
      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <Clock className="h-3 w-3" />
        Takes about 2 minutes
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 text-white">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">{label}</p>
          </div>
        ))}
      </div>

      <Button variant="gradient" size="lg" className="mt-8 w-full gap-2" onClick={onStart}>
        Let's Get Started
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

/* ---------- Step 12: Done ---------- */

function Step12({ answers, onFinish }: { answers: Answers; onFinish: () => void }) {
  const matchCount = 12 + answers.targetRoles.length * 3 + answers.industries.length * 2
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
        <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        You're all set! 🎉
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        We've tuned your match engine based on your preferences. Here's what's waiting for you in
        your dashboard:
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard value={matchCount} label="New matches" />
        <StatCard value={answers.skills.length} label="Skills tracked" />
        <StatCard value={answers.cvName ? 'A+' : '—'} label="CV score" />
      </div>

      <Button variant="gradient" size="lg" className="mt-8 w-full gap-2" onClick={onFinish}>
        Enter your dashboard
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}

/* ---------- Shared ---------- */

function StepShell({
  icon,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {eyebrow}
        </span>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  )
}

type Option = { value: string; label: string; desc?: string }

function RadioGrid({
  value,
  onChange,
  onMultiToggle,
  options,
  multi = false,
}: {
  value: string | string[]
  onChange?: (v: string) => void
  onMultiToggle?: (v: string) => void
  options: Option[]
  multi?: boolean
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const active = multi
          ? (value as string[]).includes(opt.value)
          : value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => (multi ? onMultiToggle?.(opt.value) : onChange?.(opt.value))}
            className={cn(
              'flex items-center justify-between gap-3 rounded-xl border p-4 text-left transition-all',
              active
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-950/40'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-slate-600 dark:hover:bg-slate-900'
            )}
          >
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{opt.label}</p>
              {opt.desc && (
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{opt.desc}</p>
              )}
            </div>
            <div
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                active
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-slate-300 dark:border-slate-600'
              )}
            >
              {active && <Check className="h-3 w-3" />}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function ChipGroup({
  values,
  onToggle,
  options,
}: {
  values: string[]
  onToggle: (v: string) => void
  options: string[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = values.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all',
              active
                ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-600'
            )}
          >
            {active && <Check className="h-3 w-3" />}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <input
      type="number"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
    />
  )
}

function FileUpload({
  name,
  onChange,
  onClear,
}: {
  name: string
  onChange: (n: string) => void
  onClear: () => void
}) {
  if (name) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">Uploaded successfully</p>
          </div>
        </div>
        <button
          onClick={onClear}
          className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
  return (
    <label
      htmlFor="cv-upload"
      className="group flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition-colors hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-blue-500 dark:hover:bg-blue-950/20"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400">
        <Upload className="h-5 w-5" />
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Click to upload
      </p>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">or drag and drop</p>
      <input
        id="cv-upload"
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onChange(f.name)
        }}
      />
    </label>
  )
}
