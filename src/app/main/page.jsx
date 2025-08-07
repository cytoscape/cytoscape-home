import { useEffect, useState } from 'react'
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
  const [searchType, setSearchType] = useState('gene')
  const [searchText, setSearchText] = useState('')
  const [openGuide, setOpenGuide] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)
  const [results, setResults] = useState()

  const openResults = () => {
    if (!window.history.state?.resultsOpen) {
      window.history.pushState({ resultsOpen: true }, '#results', window.location.href) // Push a new state to the history stack
    }
    setResultsOpen(true)
  }
  const closeResults = () => {
    setResultsOpen(false)
    // // Prevent the browser from navigating back to the results state when the user clicks the forward button
    // if (window.location.hash === '#results') {
    //   window.history.replaceState({}, document.title, window.location.pathname + window.location.search)
    // }
  }

  useEffect(() => {
    // Listen for popstate events to handle back/forward navigation
    const handlePopState = (event) => {
      if (event.state && event.state.resultsOpen) {
        setResultsOpen(true)
      } else {
        setResultsOpen(false)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleSubmit = (data) => {
    setOpenGuide(false)
    if (data) {
      if (data.url) {
        window.open(data.url, '_blank').focus()
      } else {
        setResults(data)
        openResults()
      }
    }
  }
  const handleGetStarted = ({ type, terms }) => {
    setResultsOpen(false)
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
      <SecondaryFeatures />
      <CallToAction onGetStarted={handleGetStarted} />
      <Citations />
      <Faqs />
      <Guide open={openGuide} type={searchType} initialText={searchText} onClose={() => setOpenGuide(false)} onSubmit={handleSubmit} />
      <Results open={resultsOpen} data={results} searchEngine={searchEngine} onClose={closeResults} />
    </>
  )
}
