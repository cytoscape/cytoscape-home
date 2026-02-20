import React, { useEffect } from 'react'
import { useQuery } from "@tanstack/react-query"
import PropTypes from 'prop-types'
import { totalResultsLabel } from '@/components/results/shared'
import { Card } from '@/components/results/Card'
import { createNDExQueryOptions } from '@/app/shared/queryOptions'
import { NDExLogo } from '@/components/Logos'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'


export const NDExCard = React.memo(({ genes, onResults }) => {
  const MAX_RESULTS = 20
  const href = `https://www.ndexbio.org/index.html#/search?searchType=All&searchString=${genes.join('%20')}&searchTermExpansion=false`

  const { data, error, isFetching } = useQuery(createNDExQueryOptions(
    genes,
    genes?.length > 0
  ))

  useEffect(() => {
    if (!isFetching) {
      const hasResults = (data?.networks?.length ?? 0) > 0
      onResults?.(hasResults)
    }
  }, [isFetching, data, onResults])

  const filteredResults = data?.networks?.slice(0, MAX_RESULTS) ?? []

  return (
    <Card
      id="card-ndex"
      icon={<NDExLogo className="h-8 w-8" />}
      title="NDEx"
      url={href}
      caption={totalResultsLabel(data?.networks?.length, MAX_RESULTS)}
      isLoading={isFetching}
      error={error}
    >
      <div className="min-h-64 flex flex-col justify-start">
        {error && (
          <span className="w-full flex items-start justify-center text-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ExclamationTriangleIcon className="w-5 h-5 mt-0.5" />
            <span className="ml-2 font-light">
              {error.message ? error.message : 'Unable to fetch networks'}
            </span>
          </span>
        )}
        {!error && (
          <table className="w-full divide-y divide-gray-300">
            <thead className={`bg-gray-50 ${isFetching ? 'animate-pulse antialiased leading-relaxed text-gray-300' : 'text-gray-900'}`}>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left md:text-sm text-xs font-semibold sm:pl-6">
                  Network
                </th>
                <th scope="col" width={128} className="px-3 py-3.5 text-left md:text-sm text-xs font-semibold">
                  Owner
                </th>
                <th scope="col" width={64} className="px-3 py-3.5 text-right md:text-sm text-xs font-semibold">
                  Nodes
                </th>
                <th scope="col" width={64} className="px-3 py-3.5 text-right md:text-sm text-xs font-semibold">
                  Edges
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {isFetching && [...Array(Math.ceil(MAX_RESULTS/2))].map((_, rowIdx) => (
              <tr key={`skeleton-row-${rowIdx}`}>
              {[...Array(4)].map((__, cellIdx) => (
                <td
                  key={`skeleton-cell-${cellIdx}`}
                  className="px-2 py-2.5"
                >
                  <span className="h-5 text-sm animate-pulse antialiased leading-relaxed bg-gray-300 rounded-md text-inherit block w-full">
                    &nbsp;
                  </span>
                </td>
              ))}
              </tr>
            ))}
            {!isFetching && filteredResults.map((net) => (
              <tr key={net.externalId}>
                <td className="text-wrap px-3 py-2 text-left md:text-sm text-xs text-gray-500">
                  <a
                    href={`https://www.ndexbio.org/viewer/networks/${net.externalId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:underline-offset-2 text-complement-500"
                  >
                    {net.name}
                  </a>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-left md:text-sm text-xs text-gray-500">{net.owner}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right md:text-sm text-xs text-gray-500">{net.nodeCount}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right md:text-sm text-xs text-gray-500">{net.edgeCount}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  )
})
NDExCard.displayName = 'NDExCard'
NDExCard.propTypes = {
  genes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onResults: PropTypes.func,
}

export default NDExCard