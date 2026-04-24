import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

// ── Simulated data ────────────────────────────────────────────────────────────

const JOBS = [
  { id: '1', title: 'Senior React Developer', company: 'Stripe', location: 'Remote', match: 94, salary: '$140k–$180k' },
  { id: '2', title: 'Full Stack Engineer', company: 'Vercel', location: 'Remote', match: 89, salary: '$130k–$170k' },
  { id: '3', title: 'Frontend Lead', company: 'Linear', location: 'San Francisco', match: 82, salary: '$150k–$200k' },
  { id: '4', title: 'Staff Engineer', company: 'Loom', location: 'Remote', match: 78, salary: '$160k–$210k' },
]

const INTERVIEWERS = [
  { id: 'alex', name: 'Alex', role: 'Technical', emoji: '💻', style: 'Rigorous deep-dives into system design and algorithms.' },
  { id: 'maya', name: 'Maya', role: 'HR', emoji: '😊', style: 'Warm, behavioural questions focused on culture and values.' },
  { id: 'sam', name: 'Sam', role: 'Executive', emoji: '👔', style: 'High-level strategic thinking and leadership scenarios.' },
  { id: 'priya', name: 'Priya', role: 'Product Manager', emoji: '📋', style: 'Product sense, prioritisation, and stakeholder management.' },
  { id: 'kai', name: 'Kai', role: 'Culture Fit', emoji: '🎯', style: 'Team dynamics, working style, and growth mindset.' },
]

// ── Router ────────────────────────────────────────────────────────────────────

export const appRouter = router({
  // Get job matches
  getJobMatches: publicProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(({ input }) => {
      const q = input?.query?.toLowerCase() ?? ''
      return q
        ? JOBS.filter(
            (j) =>
              j.title.toLowerCase().includes(q) ||
              j.company.toLowerCase().includes(q)
          )
        : JOBS
    }),

  // Get CV score
  getCvScore: publicProcedure.query(() => ({
    overall: 94,
    breakdown: [
      { label: 'ATS Compatibility', score: 'A+', value: 98 },
      { label: 'Keyword Coverage', score: '91%', value: 91 },
      { label: 'Formatting', score: 'Good', value: 88 },
      { label: 'Quantified Impact', score: 'Improve', value: 72 },
    ],
  })),

  // Get interviewers
  getInterviewers: publicProcedure.query(() => INTERVIEWERS),

  // Subscribe (newsletter)
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ input }) => {
      console.log(`New subscription: ${input.email}`)
      return { success: true, message: `${input.email} subscribed!` }
    }),

  // Get pricing plans token cost
  getTokenCosts: publicProcedure.query(() => [
    { action: 'CV Upload & Score', tokens: 5 },
    { action: 'Job Deep Match', tokens: 3 },
    { action: 'Text Interview (30 min)', tokens: 10 },
    { action: 'Voice Interview (30 min)', tokens: 20 },
    { action: 'Cover Letter Gen', tokens: 8 },
    { action: 'LinkedIn Optimise', tokens: 12 },
  ]),
})

export type AppRouter = typeof appRouter
