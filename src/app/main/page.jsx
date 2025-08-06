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
import { CompareSection } from '@/components/CompareSection'


export default function Home({ searchEngine }) {
  const [searchType, setSearchType] = useState('gene')
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
  const handleGetStarted = ({ type, terms }) => {
    setOpenResults(false)
    setResults(null)
    setSearchType(type)
    setSearchText(terms ? terms.join(' ') : '')
    setOpenGuide(true)
  }

  return (
    <>
      <Hero onGetStarted={handleGetStarted} onSubmit={handleSubmit} />
      <PrimaryFeatures />
      <GenesCTASection />
      <NetworkCTASection />
      <CompareSection />
      <SecondaryFeatures />
      {/* <CallToAction onGetStarted={handleGetStarted} /> */}
      <Citations />
      <Faqs />
      <Guide open={openGuide} type={searchType} initialText={searchText} onClose={() => setOpenGuide(false)} onSubmit={handleSubmit} />
      <Results open={openResults} data={results} searchEngine={searchEngine} onClose={() => setOpenResults(false)} />
    </>
  )
}
