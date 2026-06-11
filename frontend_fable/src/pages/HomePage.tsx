import B2BSection from '../components/sections/B2BSection'
import ComparisonSection from '../components/sections/ComparisonSection'
import CtaStrip from '../components/sections/CtaStrip'
import Hero from '../components/sections/Hero'
import HowItWorks from '../components/sections/HowItWorks'
import MachineTeaser from '../components/sections/MachineTeaser'
import SignatureFlavors from '../components/sections/SignatureFlavors'
import { useProducts } from '../hooks/useProducts'

export default function HomePage() {
  const { data: flavors, loading } = useProducts()

  return (
    <>
      <Hero />
      <SignatureFlavors flavors={flavors} loading={loading} />
      <HowItWorks />
      <MachineTeaser />
      <B2BSection />
      <ComparisonSection />
      <CtaStrip />
    </>
  )
}
