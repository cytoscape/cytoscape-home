import { useState } from 'react'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Citations } from '@/components/Citations'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Guide } from '@/components/Guide'
import { Results } from '@/components/Results'

export default function Home() {
  const [openGuide, setOpenGuide] = useState(false)
  const [openResults, setOpenResults] = useState(false)
  const [results, setResults] = useState()
  
  const onSubmit = (data) => {
    setOpenGuide(false)
    if (data) {
      if (data.url) {
        window.open(data.url, '_blank').focus()
      } else {
        setResults(data)
        setOpenResults(true)
      }
    }
  }

  return (
    <>
      <Hero onGetStarted={() => setOpenGuide(true)} />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction onGetStarted={() => setOpenGuide(true)} />
      <Citations />
      <Faqs />
      <Guide open={openGuide} onClose={() => setOpenGuide(false)} onSubmit={onSubmit} />
      <Results open={openResults} data={results} onClose={() => setOpenResults(false)} />
    </>
  )
}
