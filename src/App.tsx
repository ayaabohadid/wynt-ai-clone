import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Features } from '@/components/sections/Features'
import { Pricing } from '@/components/sections/Pricing'
import { Footer } from '@/components/sections/Footer'

export default function App() {
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
