import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import PropTypes from 'prop-types'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { Citations } from '@/components/Citations'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { StartWith } from '@/components/StartWith'
import { CompareSection } from '@/components/CompareSection'
import { Results } from '@/components/Results'
import { createMyGeneInfoQueryOptions } from '@/app/shared/queryOptions'
import { geneManiaOrganisms, parseGeneList } from '@/app/shared/common'
import { SpinningIcon } from '@/components/base/Loading'


const detectOrganism = (taxidCounts) => {
  let organism
  // Filter organisms based on detected taxids
  const validTaxids = taxidCounts.map(item => item.taxid)
  if (validTaxids?.length > 0) {
    // If we have valid taxids, filter the organisms...
    let filteredOrganisms = geneManiaOrganisms.filter(org => validTaxids.includes(org.taxon))
    if (filteredOrganisms.length === 0) {
      console.debug('No valid organisms found, using all GeneMania organisms.')
      filteredOrganisms = geneManiaOrganisms
    }
    // ...and set the initial organism index to the top count
    organism = filteredOrganisms.find(org => org.taxon === taxidCounts[0].taxid)
    // ...but only if its count is higher than the human's count; otherwise, set it to human (9606)
    if (!organism || organism.taxon !== '9606') {
      const humanCount = taxidCounts.find(item => item.taxid === '9606')?.count ?? 0
      if (humanCount >= (taxidCounts[0]?.count ?? 0)) {
        organism = filteredOrganisms.find(org => org.taxon === '9606') // Human
      }
    }
    // Don't set it to the first one by default (or default to human),
    // because finding an organism means this is a `type==="gene"` search,
    // and we want to make sure this is a more general search (pathways, terms, user question, etc.).
    // if (!organism) {
    //   console.debug('No valid organism found, setting the first one as default.')
    //   organism = filteredOrganisms[0]
    // }
  }
  return organism
}


export default function Home({ searchEngine }) {
  const [submitting, setSubmitting] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [resultsOpen, setResultsOpen] = useState(false)
  const [query, setQuery] = useState()

  // Save the current query object in a ref so we can compare its search text with new input texts later,
  // in order to decide whether to detect the organism again or not
  const queryRef = useRef(null)

  const { data: taxidCounts, isFetching } = useQuery(createMyGeneInfoQueryOptions(
    parseGeneList(searchText ?? ''),
    searchText?.trim().length > 0 && searchText.trim() !== queryRef.current?.searchText // Only detect organism if the search text hasn't changed since the last submission
  ))

  const reset = () => {
    setQuery(null)
    setSearchText('')
    setResultsOpen(false)
  }
  const handleSubmit = (data) => {
    if (data) {
      setSearchText(data.searchText)
      setQuery(data)
      setSubmitting(true) // Don't submit right away, wait for taxidCounts to update!
    }
  }
  const openResults = () => {
    if (!window.history.state?.resultsOpen) {
      window.history.pushState({ resultsOpen: true }, '#results', window.location.href) // Push a new state to the history stack
    }
    setResultsOpen(true)
  }
  const handleCloseResults = useCallback(() => {
    reset()
    // // Prevent the browser from navigating back to the results state when the user clicks the forward button
    // if (window.location.hash === '#results') {
    //   window.history.replaceState({}, document.title, window.location.pathname + window.location.search)
    // }
  }, [])

  useEffect(() => {
    if (submitting && !isFetching && taxidCounts && query) {
      // Now we can submit...
      const organism = detectOrganism(taxidCounts)
      query.organism = organism
      query.type = organism ? 'gene' : 'other' // TODO: do we need to detect 'pathway' type as well? Or just remove the `type` field?
      queryRef.current = { ...query }
      setSubmitting(false) 
      openResults()
    }
  }, [isFetching, submitting, taxidCounts, query])

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

  return (
    <>
      <Hero
        initialSearchText={searchText}
        onSubmit={handleSubmit}
      />
      <StartWith />
      <CompareSection />
      <SecondaryFeatures />
      <Citations />
      <Faqs />
      <Results
        open={resultsOpen}
        initialQuery={query}
        searchEngine={searchEngine}
        onSubmit={handleSubmit}
        onClose={handleCloseResults}
      />
      {submitting && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
          <div className="flex space-x-2">
            <SpinningIcon message="Loading..." />
          </div>
        </div>
      )}
    </>
  )
}
Home.propTypes = {
  searchEngine: PropTypes.shape({
    searchPathways: PropTypes.func.isRequired,
    searchTutorials: PropTypes.func.isRequired,
  }).isRequired,
}