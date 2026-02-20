import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Marker } from "react-mark.js"
import { totalResultsLabel } from '@/components/results/shared'
import { Card } from '@/components/results/Card'
import { SpinningIcon } from '@/components/base/Loading'
import { BookOpenIcon } from '@heroicons/react/24/solid'


export const TutorialsCard = React.memo(({ terms, searchEngine, onResults }) => {
  const MAX_RESULTS = 10
  const baseURL = 'https://cytoscape.org/cytoscape-tutorials/protocols/enrichmentmap-pipeline/#'

  const [results, setResults] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const res = searchEngine.searchTutorials(terms.join(' '))
    setResults(res)
    setLoading(false)
  }, [terms, searchEngine])

  useEffect(() => {
    if (!loading) {
      onResults?.((results?.length ?? 0) > 0)
    }
  }, [loading, results, onResults])

  const createUrl = (section, parent) => {
    const path1 = parent != null && !isNaN(section) ? parent : section
    const path2 = path1 === parent ? section : null
    if (path1 != null && path2 == null) {
      return `${baseURL}/${path1}`
    }
    if (path1 != null && path2 != null) {
      return `${baseURL}/${path1}/${path2}`
    }
    return baseURL
  }

  const filteredResults = results?.length > MAX_RESULTS ? results?.slice(0, MAX_RESULTS) : results ?? []

  return (
    <Card
      id="card-tutorials"
      icon={<BookOpenIcon className="h-8 w-8" />}
      title="Tutorials & Protocols"
      url="https://github.com/cytoscape/cytoscape-tutorials/wiki"
      caption={totalResultsLabel(results?.length, MAX_RESULTS)}
      isLoading={loading}
      className={`text-left ${!filteredResults || filteredResults?.length === 0 ? 'hidden' : ''}`}
    >
      <div className="w-full h-full relative p-4 min-h-28 sm:min-h-40 text-left">
      {loading && (
        <SpinningIcon />
      )}
      {!loading && filteredResults && filteredResults.length > 0 && (
        <ul className="h-full space-y-2">
        {filteredResults.map(({ section, parent, title, text, terms }, idx) => (
          <li key={idx} className="p-2">
            <span className="font-medium">
              <a
                href={createUrl(section, parent)}
                target='_blank'
                rel='noreferrer'
                className="hover:underline hover:underline-offset-2 text-complement-500"
              >
                {title}
              </a>
            </span>
            <div className="text-sm text-gray-600">
              <Marker mark={terms} options={{ className: 'bg-inherit font-bold' }}>
                {text}
              </Marker>
            </div>
          </li>
        ))}
        </ul>
      )}
      </div>
    </Card>
  )
})
TutorialsCard.displayName = 'TutorialsCard'
TutorialsCard.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchEngine: PropTypes.shape({
    searchTutorials: PropTypes.func.isRequired,
  }).isRequired,
  onResults: PropTypes.func,
}

export default TutorialsCard