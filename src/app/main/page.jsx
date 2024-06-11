import { useState } from 'react'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Citations } from '@/components/Citations'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Guide } from '@/components/Guide'

export default function Home() {
  const [openGuide, setOpenGuide] = useState(false)

  return (
    <>
      <Hero onGetStarted={() => setOpenGuide(true)} />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction onGetStarted={() => setOpenGuide(true)} />
      <Citations />
      <Faqs />
      <Guide open={openGuide} onClose={() => setOpenGuide(false)} />
    </>
  )
}
