import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Features } from '@/components/sections/Features'
import { Pricing } from '@/components/sections/Pricing'
import { Footer } from '@/components/sections/Footer'
import { Signup } from '@/pages/Signup'
import { SignIn } from '@/pages/SignIn'
import { Onboarding } from '@/pages/Onboarding'
import { Dashboard } from '@/pages/Dashboard'
import { PricingPage } from '@/pages/PricingPage'
import { useRouter } from '@/lib/router'

function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const { path } = useRouter()

  if (path === '/signup') return <Signup />
  if (path === '/signin' || path === '/login') return <SignIn />
  if (path === '/onboarding') return <Onboarding />
  if (path === '/dashboard') return <Dashboard />
  if (path === '/pricing') return <PricingPage />
  return <HomePage />
}
