import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import ValueProps from '@/components/ValueProps'
import Manifesto from '@/components/Manifesto'
import HowItWorks from '@/components/HowItWorks'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SocialProof />
      <ValueProps />
      <Manifesto />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  )
}
