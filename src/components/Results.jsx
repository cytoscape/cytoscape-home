import { useEffect, useRef, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { Marker } from "react-mark.js"
import Cytoscape from 'cytoscape'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@/components/base/Button'
import { LoadingMessage } from '@/components/base/Loading'
import { createNDExQueryOptions, createGeneManiaQueryOptions } from '@/app/shared/queryOptions'
import { SearchBar } from '@/components/SearchBar'

import { AppLogo, AppLogomark, GeneManiaLogo, NDExLogo, WikiPathwaysLogo } from '@/components/Logos'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ArrowTopRightOnSquareIcon, ArrowTurnDownRightIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'


const BASE_TUTORIALS_URL = 'https://cytoscape.org/cytoscape-tutorials/protocols/enrichmentmap-pipeline/#'

const resultTypes = {
  gene: 'Gene Analysis',
  pathway: 'Pathway Search',
  tutorial: 'Tutorial Search',
}

const createCytoscape = (id) => {
  const container = document.getElementById(id)
  const cy = new Cytoscape({
    container: container,
    styleEnabled: true,
    userZoomingEnabled: false,
    userPanningEnabled: false,
    boxSelectionEnabled: false,
    selectionType: 'single',
  })
  cy.data({ id })
  
  return cy
}


const CardTitle = ({ logo, title, url }) => (
  <div className="flex items-center">
    {logo}
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-start group"
    >
      <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">{title}</h3>
      <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-0.5 fill-gray-400 group-hover:fill-complement-500" />
    </a>
  </div>
)

const Card = ({ logo, title, url, caption, isLoading, error, children, className }) => (
  <div className={`min-w-12 w-full flex-grow p-4 rounded-xl shadow-lg shadow-gray-200 ${error ? 'border-double border-4 border-red-100' : 'border border-gray-200'} ${className}`}>
    <CardTitle logo={logo} title={title} url={url} />
    <p className="mt-2 text-right text-xs text-gray-600">
    {!isLoading && !error ?
      <>{caption || <>&nbsp;</>}</>
    :
      <>&nbsp;</>
    }
    </p>
    <div className="mt-2 ring-4 ring-black ring-opacity-5 rounded-lg">
      {children}
    </div>
  </div>
)

const GeneManiaCard = ({ genes, organism }) => {
  const isMounted = useRef(false)
  const cyRef = useRef()

  const { data, error, isFetching } = useQuery(createGeneManiaQueryOptions(
    genes,
    organism.id,
    isMounted && genes?.length > 0 && organism?.id > 0
  ))

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
      if (cyRef.current) {
        // Make sure Cytoscape is destroyed when the component is unmounted
        cyRef.current.destroy()
        cyRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const edgeColors = [
      { code: 'coexp', color: '#d0b7d5' },
      { code: 'coloc', color: '#a0b3dc' },
      { code: 'gi', color: '#90e190' },
      { code: 'path', color: '#9bd8de' },
      { code: 'pi', color: '#eaa2a2' },
      { code: 'predict', color: '#f6c384' },
      { code: 'spd', color: '#dad4a2' },
      { code: 'spd_attr', color: '#D0D0D0' },
      { code: 'reg', color: '#D0D0D0' },
      { code: 'reg_attr', color: '#D0D0D0' },
      { code: 'user', color: '#f0ec86' },
      { code: 'other', color: '#bbbbbb' }
    ]
    if (data) {
      if (!isMounted.current) {
        // Do not attempt to create Cytoscape if the component is unmounted!
        return
      }
      // -- Create the Cytoscape instance --
      const cy = createCytoscape('genemania-cy')
      cyRef.current = cy
      // style
      cy.style().selector('node').style({
        'width': 'mapData(score, 0, 1, 20, 60)',
        'height': 'mapData(score, 0, 1, 20, 60)',
        'content': 'data(symbol)',
        'font-size': 12,
        'text-valign': 'center',
        'text-halign': 'center',
        'background-color': '#666',
        'text-outline-color': '#666',
        'text-outline-width': 1.75,
        'color': '#fff',
        'overlay-padding': 6,
      })
      cy.style().selector('node[?query]').style({
        'background-color': '#333',
        'text-outline-color': '#333',
      })
      cy.style().selector('edge').style({
        'curve-style': 'haystack',
        'haystack-radius': 0.5,
        'opacity': 0.4,
        'line-color': '#bbb',
        'width': 'mapData(weight, 0, 1, 1.5, 16)',
        'overlay-padding': 3,
      })
      edgeColors.forEach(ec => {
        cy.style().selector('edge[group="'+ ec.code +'"]').style({
          'line-color': ec.color,
        })
      })
      // nodes
      data.resultGenes.forEach(el => {
        const node = { data: { 
          id: el.gene.id,
          symbol: el.gene.symbol,
          score: el.score,
          query: el.queryGene
        }}
        cy.add(node)
      })
      // edges
      let id = 0
      data.resultNetworkGroups.forEach(ng => {
        const netGroup = ng.networkGroup
        ng.resultNetworks?.forEach(rn => {
          rn.resultInteractions?.forEach(ri => {
            const source = ri.fromGene?.gene
            const target = ri.toGene?.gene
            const weight = ri.interaction?.weight
            if (source && target) {
              const edge = {
                group: 'edges',
                data: {
                  id: `e${++id}`,
                  source: source.id,
                  target: target.id,
                  weight: weight,
                  group: netGroup.code,
                },
              }
              cy.add(edge)
            }
          })
        })
      })
      // layout
      cy.layout({
        name: 'fcose',
        animate: false,
        idealEdgeLength: 40,
        nodeOverlap: 30,
        nodeRepulsion: 100000,
        padding: 10,
      }).run()
    }
  }, [genes, organism, data])

  const href = `https://genemania.org/search/${organism.name.toLowerCase().replace(' ', '-')}/${genes.join('/')}`

  return (
    <Card
      logo={<GeneManiaLogo className="h-8 w-8" />}
      title="GeneMANIA"
      url={href}
      caption={data?.resultGenes?.length === 0 ? 'No results' : `${data?.resultGenes?.length} result genes`}
      isLoading={isFetching}
      error={error}
    >
      <div className="relative w-full mt-2 ring-4 ring-black ring-opacity-5 rounded-lg">
        <div id="genemania-cy" className={`w-full h-96 ${isFetching ? 'invisible' : ''}`} />
        {isFetching && (
          <LoadingMessage className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        {error && (
          <span className="w-full flex items-start justify-center text-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ExclamationTriangleIcon className="w-5 h-5 mt-0.5" />
            <span className="ml-2 font-light">
              {error.message ? error.message : 'Unable to fetch network'}
            </span>
          </span>
        )}
      </div>
    </Card>
  )
}

const NDExCard = ({ genes }) => {
  const { data, error, isFetching } = useQuery(createNDExQueryOptions(
    genes,
    genes?.length > 0
  ))

  const href = `https://www.ndexbio.org/index.html#/search?searchType=All&searchString=${genes.join('%20')}&searchTermExpansion=false`

  return (
    <Card
      logo={<NDExLogo className="h-8 w-8" />}
      title="NDEx"
      url={href}
      caption={data && data.networks?.length > 0 ? `${data.networks.length < data.numFound ? 'Top ' : '' }${data.networks.length} results` : 'No results'}
      isLoading={isFetching}
      error={error}
      className="lg:max-w-3xl"
    >
      <div className="min-h-64 overflow-x-auto">
        {isFetching && (
          <LoadingMessage className="w-full relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        {error && (
          <span className="w-full flex items-start justify-center text-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ExclamationTriangleIcon className="w-5 h-5 mt-0.5" />
            <span className="ml-2 font-light">
              {error.message ? error.message : 'Unable to fetch networks'}
            </span>
          </span>
        )}
        {!isFetching && !error && data.networks.length > 0 && (
          <table className="w-full min-w-max divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Network
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Owner
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Nodes
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Edges
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {data.networks.map((net) => (
              <tr key={net.externalId}>
                <td className="max-w-96 text-wrap px-3 py-2 text-left text-sm text-gray-500">
                  <a
                    href={`https://www.ndexbio.org/viewer/networks/${net.externalId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:underline-offset-2 text-complement-500"
                  >
                    {net.name}
                  </a>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{net.owner}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">{net.nodeCount}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">{net.edgeCount}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  )
}

const WikiPathwaysCard = ({ terms, searchEngine }) => {
  const [results, setResults] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const res = searchEngine.searchPathways(terms.join(' '))
    setResults(res)
    setLoading(false)
  }, [terms, searchEngine])

  return (
    <Card
      logo={<WikiPathwaysLogo className="h-8 w-8" />}
      title="WikiPathways"
      url="https://www.wikipathways.org"
      caption={results && results.length > 0 ? `${results.length} results` : 'No results'}
      isLoading={loading}
      className="text-left min-w-[580px] lg:max-w-[580px] max-w-full"
    >
      <ul className="space-y-2 min-h-64">
      {loading && (
        <LoadingMessage className="w-full relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
      {results && results.map(({ id, title, organisms, annotations, description, url, terms }, idx) => (
        <li key={idx} className="p-2 flex items-start space-x-4">
          <div className="flex-shrink-0">
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
}

const TutorialsCard = ({ terms, searchEngine }) => {
  const [results, setResults] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const res = searchEngine.searchTutorials(terms.join(' '))
    setResults(res)
    setLoading(false)
  }, [terms, searchEngine])

  const createUrl = (section, parent) => {
    const path1 = parent != null && !isNaN(section) ? parent : section
    const path2 = path1 === parent ? section : null
    if (path1 != null && path2 == null) {
      return `${BASE_TUTORIALS_URL}/${path1}`
    }
    if (path1 != null && path2 != null) {
      return `${BASE_TUTORIALS_URL}/${path1}/${path2}`
    }
    return BASE_TUTORIALS_URL
  }

  return (
    <div className="w-full h-full relative p-4 lg:pl-48 md:pl-16 min-h-28 sm:min-h-40 text-left">
    {loading && (
      <LoadingMessage className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    )}
    {!loading && results && results.length > 0 && (
      <ul className="space-y-2">
      {results.map(({ section, parent, title, text, terms }, idx) => (
        <li key={idx} className="p-2 max-w-screen-md">
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
  )
}


export function Results({open=false, data, searchEngine, onClose }) {
  const [localData, setLocalData] = useState(data)

  const type = localData?.type
  const title = resultTypes[type] || 'Results'
  const terms = localData?.terms || []
  const organism = localData?.organism

  useEffect(() => {
    if (data) {
      setLocalData(data)
    }
  }, [data])

  const handleSubmit = (newData) => {
    setLocalData({ type, terms: newData.terms, organism: newData.organism })
  }
  const handleWhatElseClick = () => {
    onClose()
    window.location.href = '/#genes'
  }

  return (
    <Transition show={open}>
      <Dialog
        className="relative z-10 w-full"
        onClose={() => void 0/**(make it modal)*/}
      >
        <div className="fixed inset-0 z-10 w-screen h-screen">
          <div className="flex w-full h-full items-end justify-center text-center sm:items-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="flex flex-col w-full h-full text-left transition-all px-0">
                <div className="flex-initial md:px-4 px-2 md:pb-0 pb-2 bg-white border-b border-gray-200 drop-shadow-md">
                  <div className="flex flex-row sm:items-start items-center lg:space-x-10 md:space-x-6 space-x-4 max-w-7xl mx-auto md:pt-5 pt-2 text-gray-400">
                    <a
                      aria-label="Home"
                      onClick={onClose}
                      className="cursor-pointer"
                    >
                      <AppLogo className="h-10 w-auto xl:ml-2 ml-0 md:block hidden" />
                      <AppLogomark className="h-10 w-auto md:hidden sm:block hidden" />
                      <Button variant="text" className="mt-2 text-gray-900 hover:text-complement-500 sm:hidden">
                        <ArrowLeftIcon className="w-5" />
                      </Button>
                    </a>
                    <div className="w-full max-w-[667px] text-left">
                      <SearchBar
                        initialText={terms?.join(' ')}
                        initialOrganismTaxon={organism?.taxon}
                        showOrganismSelector={type === 'gene'}
                        onSubmit={handleSubmit}
                        className="bg-white drop-shadow-md"
                      />
                      <div className="mt-2 text-sm text-gray-400 lg:text-left text-right hidden md:block">
                        <span className="lg:inline hidden">This is a small demonstration of the Cytoscape ecosystem.&nbsp;&nbsp;</span>
                        <a onClick={handleWhatElseClick} className="text-complement-400 hover:underline cursor-pointer">
                          Find out what else you can do...
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CONTENT (cards) */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-start lg:justify-center flex-grow py-4 xl:px-0 md:px-4 px-2 bg-white lg:space-x-2 lg:space-y-0 space-y-2 overflow-y-auto overflow-x-hidden">
                {(type === 'gene' || type === 'pathway') && (
                <>
                  <div className="max-w-7xl flex flex-col items-center justify-center lg:items-start space-y-2">
                  {type === 'gene' && organism && (
                    <GeneManiaCard genes={terms} organism={organism} />
                  )}
                    <NDExCard genes={terms} />
                  </div>
                  {/* {(type === 'pathway' || terms.length === 1) && ( */}
                    <WikiPathwaysCard terms={terms} searchEngine={searchEngine} />
                  {/* )} */}
                </>
                )}
                {type === 'tutorial' && (
                  <TutorialsCard terms={terms} searchEngine={searchEngine} />
                )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}