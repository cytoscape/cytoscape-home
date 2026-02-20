import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Marker } from "react-mark.js"
import { totalResultsLabel } from '@/components/results/shared'
import { Card } from '@/components/results/Card'
import { ImageAndTextSkeleton } from '@/components/base/Loading'
import { WikiPathwaysLogo } from '@/components/Logos'
import { ArrowTurnDownRightIcon } from '@heroicons/react/20/solid'


const Thumbnail = ({ id, title, url, className }) => (
  <div className={`flex-shrink-0 ${className}`}>
    <a
      href={`https://www.wikipathways.org${url}`}
      target='_blank'
      rel='noreferrer'
    >
      <img
        src={`https://www.wikipathways.org/assets/img/${id}/${id}-thumb.png`}
        alt={`${title} thumbnail`}
        className="w-32 h-auto" />
    </a>
  </div>
)
Thumbnail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
}


export const WikiPathwaysCard = React.memo(({ terms, searchEngine, onResults }) => {
  const MAX_RESULTS = 10

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const res = searchEngine.searchPathways(terms.join(' '))
    setResults(res)
    setLoading(false)
  }, [terms, searchEngine])

  useEffect(() => {
    if (!loading) {
      onResults?.((results?.length ?? 0) > 0)
    }
  }, [loading, results, onResults])
  
  const filteredResults = results?.length > MAX_RESULTS ? results?.slice(0, MAX_RESULTS) : results ?? []

  return (
    <Card
      id="card-wikipathways"
      icon={<WikiPathwaysLogo className="h-8 w-8" />}
      title="WikiPathways"
      url="https://www.wikipathways.org"
      caption={totalResultsLabel(results?.length, MAX_RESULTS)}
      isLoading={loading}
    >
      <ul className="space-y-2 min-h-64 flex flex-col justify-center">
      {loading && [...Array(Math.ceil(MAX_RESULTS/2))].map((_, rowIdx) => (
        <div key={`skeleton-row-${rowIdx}`} className="w-full mb-4 p-2 flex items-start space-x-4">
          <ImageAndTextSkeleton key={`skeleton-${rowIdx}`} showTitle={true} />
        </div>
      ))}
      {filteredResults?.map(({ id, title, organisms, annotations, description, url, terms }) => (
        <li key={id} className="p-2 flex items-start space-x-4">
          <Thumbnail
            id={id}
            title={title}
            url={url}
            className={`sm:block hidden`}
          />
          <div>
            <h3 className="font-medium">
              <a
                href={`https://www.wikipathways.org${url}`}
                target='_blank'
                rel='noreferrer'
                className="hover:underline hover:underline-offset-2 text-complement-500"
              >
                {title}
              </a>
            </h3>
            <Thumbnail
              id={id}
              title={title}
              url={url}
              className={`sm:hidden block sm:pt-0 pt-2`}
            />
            <div className="text-sm font-light text-gray-400">
              {id} &mdash; <i>{organisms.join(', ')}</i>
            </div>
            <div className="mt-2 flex text-gray-400">
              <div className="mr-1 text-gray-400">
                <ArrowTurnDownRightIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-gray-400">
                  <Marker mark={terms} options={{ className: 'bg-inherit font-bold text-inherit' }}>
                    {annotations}
                  </Marker>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <Marker mark={terms} options={{ className: 'bg-inherit font-bold' }}>
                    {description.length > 200 ? `${description.slice(0, 200)}...` : description}
                  </Marker>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
      </ul>
    </Card>
  )
})
WikiPathwaysCard.displayName = 'WikiPathwaysCard'
WikiPathwaysCard.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchEngine: PropTypes.shape({
    searchPathways: PropTypes.func.isRequired,
  }).isRequired,
  onResults: PropTypes.func,
}

export default WikiPathwaysCard