import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import ValueProps from '@/components/ValueProps'
import HowItWorks from '@/components/HowItWorks'
import Cases from '@/components/Cases'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustedBy />
      <ValueProps />
      <HowItWorks />
      <Cases />
      <CTASection />
      <Footer />
    </main>
  )
}
