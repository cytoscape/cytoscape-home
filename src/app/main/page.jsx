import { useState } from 'react'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Citations } from '@/components/Citations'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { GenesCTASection } from '@/components/GenesCTASection'
import { NetworkCTASection } from '@/components/NetworkCTASection'
import { Guide } from '@/components/Guide'
import { Results } from '@/components/Results'


export default function Home({ searchEngine }) {
  const [searchCategory, setSearchCategory] = useState('gene')
  const [searchText, setSearchText] = useState('')
  const [openGuide, setOpenGuide] = useState(false)
  const [openResults, setOpenResults] = useState(false)
  const [results, setResults] = useState()

  const handleSubmit = (data) => {
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
  const handleGetStarted = (category, terms) => {
    setOpenResults(false)
    setResults(null)
    setSearchCategory(category)
    setSearchText(terms ? terms.join(' ') : '')
    setOpenGuide(true)
  }

  return (
    <>
      <Hero onGetStarted={handleGetStarted} />
      <PrimaryFeatures />
      <GenesCTASection />
      <NetworkCTASection />
      <SecondaryFeatures />
      <CallToAction onGetStarted={handleGetStarted} />
      <Citations />
      <Faqs />
      <Guide open={openGuide} type={searchCategory} initialText={searchText} onClose={() => setOpenGuide(false)} onSubmit={handleSubmit} />
      <Results open={openResults} data={results} searchEngine={searchEngine} onClose={() => setOpenResults(false)} />
    </>
  )
}
