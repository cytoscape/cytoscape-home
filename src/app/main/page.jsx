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
import { useSearchStateStore } from '@/model/store'


export default function Home({ searchEngine }) {
  const [searchCategory, setSearchCategory] = useState('gene')
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
  const handleGetStarted = (category, clearSearch) => {
    if (clearSearch) {
      // Clear the search state store to open the wizard with no previous terms (should show the wizard selector)
      useSearchStateStore.getState().clearTerms()
    }
    setSearchCategory(category)
    if (category === 'tutorial') {
      // If the category is 'tutorial', we open the results directly
      handleSubmit({
        type: 'tutorial',
        title: 'Tutorial Search',
        queryTerms: useSearchStateStore.getState().getTerms(), // TODO: rename to terms
      })
    } else {
      setOpenGuide(true)
    }
  }

  return (
    <>
      <Hero onGetStarted={(category) => handleGetStarted(category, false)} />
      <PrimaryFeatures />
      <GenesCTASection />
      <NetworkCTASection />
      <SecondaryFeatures />
      <CallToAction onGetStarted={() => handleGetStarted('gene', true)} />
      <Citations />
      <Faqs />
      <Guide open={openGuide} type={searchCategory} onClose={() => setOpenGuide(false)} onSubmit={handleSubmit} />
      <Results open={openResults} data={results} searchEngine={searchEngine} onClose={() => setOpenResults(false)} />
    </>
  )
}
