import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import FeaturedVideo from '@/components/FeaturedVideo'
import ValueProps from '@/components/ValueProps'
import Manifesto from '@/components/Manifesto'
import HowItWorks from '@/components/HowItWorks'
import Cases from '@/components/Cases'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SocialProof />
      <FeaturedVideo />
      <ValueProps />
      <Manifesto />
      <HowItWorks />
      <Cases />
      <CTASection />
      <Footer />
    </main>
  )
}
