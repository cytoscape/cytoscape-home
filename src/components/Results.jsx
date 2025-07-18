import { useEffect, useRef, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { Marker } from "react-mark.js"
import Cytoscape from 'cytoscape'
import { NDEx } from '@js4cytoscape/ndex-client'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { LinkButton } from '@/components/base/Button'
import { LoadingMessage } from '@/components/base/Loading'
import { GeneManiaLogo, NDExLogo } from '@/components/Logos'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowTopRightOnSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'


const BASE_TUTORIALS_URL = 'https://cytoscape.org/cytoscape-tutorials/protocols/enrichmentmap-pipeline/#'

const ndexClient = new NDEx('https://www.ndexbio.org/v2')


async function fetchGeneMetadata(symbol, taxon='9606') {
  try {
    const response = await fetch(`https://api.ncbi.nlm.nih.gov/datasets/v1/gene/symbol/${symbol}/taxon/${taxon}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error:', error.message)
    return 'An error occurred while fetching gene metadata from NCBI.'
  }
}

async function fetchGeneManiaNetwork(genes, organismId=4) {
  try {
    const baseUrl = 'https://genemania.org/json/search_results'
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "organism": organismId,
        "genes": genes,
        "weighting": "AUTOMATIC_SELECT",
        "geneThreshold": genes.length === 1 ? 0 : 20,
        "attrThreshold": 0,
      }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error:', error.message)
    return { error: { message: error.message } }
  }
}

const getSourceHref = (source, sourceId) => {
  if (source === 'AllianceGenome') {
    return `https://www.alliancegenome.org/gene/${sourceId}`
  } else if (source === 'Araport') {
    return `https://bar.utoronto.ca/thalemine/portal.do?externalids=${sourceId}`
  } else if (source === 'ASAP') {
    return `https://asap.genetics.wisc.edu/asap/feature_info.php?FeatureID=${sourceId}`
  } else if (source === 'FLYBASE') {
    return `https://flybase.org/reports/${sourceId}.htm`
  } else if (source === 'HGNC') {
    return `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${sourceId}`
  } else if (source === 'FungiDB') {
    return `https://fungidb.org/fungidb/app/record/gene/${sourceId}`
  } else if (source === 'MGI') {
    return `http://www.informatics.jax.org/marker/${sourceId}`
  } else if (source === 'RGD') {
    return `https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=${sourceId}`
  } else if (source === 'SGD') {
    return `https://www.yeastgenome.org/locus/${sourceId}`
  } else if (source === 'ZFIN') {
    return `https://zfin.org/${sourceId}`
  }
  return null
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

const GeneCard = ({ name, organism }) => {
  const query = useQuery({ queryKey: ['gene-metadata', name], queryFn: () => fetchGeneMetadata(name, organism.taxon) }) // TODO: pass taxon ID

  const data = query.data
  const loading = query.isLoading
  let error = query.error
  let description, source, sourceId, sourceHref, ncbiId, synonyms

  if (!loading && !error && data) {
    const entry = data.genes && data.genes.length > 0 ? data.genes[0] : {}

    if (entry.warnings && entry.warnings.length > 0) {
      error = { message: entry.warnings[0].reason }
    } else {
      const gene = entry.gene

      if (gene) {
        description = gene.description
        source = gene['nomenclature_authority']?.authority
        sourceId = gene['nomenclature_authority']?.identifier
        sourceHref = getSourceHref(source, sourceId)
        ncbiId = gene['gene_id']
        synonyms = gene.synonyms
      }
    }
  }

  const href = ncbiId ? `https://www.ncbi.nlm.nih.gov/gene/${ncbiId}` : null

  return (
    <li className={`p-4 rounded-xl min-h-28 sm:min-h-40 shadow-lg shadow-gray-200 ${error ? 'border-double border-4 border-red-100' : 'border border-gray-200'}`}>
      <div className="flex items-center">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`flex items-start group ${href ? '' : 'pointer-events-none'}`}
        >
          <h3 className="text-gray-900 font-semibold group-hover:text-complement-500">
            {name}
          </h3>
          {!error && !loading && (
            <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-1 fill-gray-400 group-hover:fill-complement-500" />
          )}
        </a>
      </div>
      <div className="mt-4 max-h-32 overflow-y-auto">
        {loading && ( 
          <LoadingMessage />
        )}
        {!loading && (
          <>
            <p className="text-gray-600">
              {error ?
                <span className="flex items-start justify-center text-red-800">
                  <ExclamationTriangleIcon className="w-5 h-5 mt-0.5" />
                  <span className="ml-2 font-light">
                    {error.message ? error.message : 'Unable to fetch description'}
                  </span>
                </span>
                :
                <>{description}</>
              }
            </p>
            {((source && sourceId) || (synonyms && synonyms.length > 0)) && (
              <hr className="mt-4 mb-1 border-dashed" />
            )}
            {source && sourceId && (
              <p className="flex items-start mt-2 text-xs text-gray-600">
                Source:&nbsp;&nbsp;
                <a
                  href={sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-start group ${sourceHref ? '' : 'pointer-events-none'}`}
                >
                  <span className={sourceHref ? `underline underline-offset-2 group-hover:underline-complement-500 group-hover:text-complement-500` : ''}>
                    {source} &mdash; {sourceId}
                  </span>
                  {sourceHref && (
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 fill-gray-400 group-hover:fill-complement-500" />
                  )}
                </a>
              </p>
            )}
            {synonyms && synonyms.length > 0 && (
              <p className="flex items-start mt-2 text-xs text-gray-600">
                Synonyms:&nbsp;&nbsp;
                <span>{synonyms.join(', ')}</span>
              </p>
            )}
          </>
        )}
      </div>
    </li>
  )
}

const GeneManiaCard = ({ genes, organism }) => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  const isMounted = useRef(false)
  const cyRef = useRef()

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
    const fetchData = async () => {
      setLoading(true)
      const json = await fetchGeneManiaNetwork(genes.join('\n'), organism.id)
      if (json.error) {
        setError(json.error)
      } else {
        setData(json)
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
        json.resultGenes.forEach(el => {
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
        json.resultNetworkGroups.forEach(ng => {
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
      setLoading(false)
    }
    fetchData()
  }, [genes, organism])

  const href = `https://genemania.org/search/${organism.name.toLowerCase().replace(' ', '-')}/${genes.join('/')}`

  return (
    <div className={`w-full lg:w-2/5 p-4 rounded-xl min-h-28 sm:min-h-40 shadow-lg shadow-gray-200 ${error ? 'border-double border-4 border-red-100' : 'border border-gray-200'}`}>
      <div className="flex items-center">
        <GeneManiaLogo className="h-8 w-8" />
        <a href={href} target="_blank" rel="noreferrer" className="flex items-start group">
          <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">GeneMANIA</h3>
          <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-0.5 fill-gray-400 group-hover:fill-complement-500" />
        </a>
      </div>
      <div className="w-full mt-4">
        <p className="text-right text-xs text-gray-600 overflow-y-auto">
          {!loading && !error ?
            <>{data.resultGenes.length} result genes</>
          :
            <>&nbsp;</>
          }
        </p>
        <div className="relative w-full h-96 mt-2 ring-4 ring-black ring-opacity-5 rounded-lg">
          <div id="genemania-cy" className="w-full h-96" />
          {loading && (
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
      </div>
      <div className="flex w-full justify-center">
        <LinkButton href={href} className="mt-4">Go to GeneMANIA</LinkButton>
      </div>
    </div>
  )
}

const NDExCard = ({ genes }) => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const json = await ndexClient.searchNetworks(genes.join(' '))
      if (json.error) {
        setError(json.error)
      } else {
        setData(json)
      }
      setLoading(false)
    }
    fetchData()
  }, [genes])

  const href = `https://www.ndexbio.org/index.html#/search?searchType=All&searchString=${genes.join('%20')}&searchTermExpansion=false`

  return (
    <div className={`relative w-full lg:w-3/5 p-4 rounded-xl min-h-28 sm:min-h-40 shadow-lg shadow-gray-200 ${error ? 'border-double border-4 border-red-100' : 'border border-gray-200'}`}>
      <div className="flex items-center">
        <NDExLogo className="h-8 w-8" />
        <a href={href} target="_blank" rel="noreferrer" className="flex items-start group">
          <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">NDEx</h3>
          <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-0.5 fill-gray-400 group-hover:fill-complement-500" />
        </a>
      </div>
      <p className="mt-4 text-right text-xs text-gray-600 overflow-y-auto">
        {!loading && !error ?
          <>{data.networks.length < data.numFound ? 'Top' : '' } {data.networks.length} results</>
        :
          <>&nbsp;</>
        }
      </p>
      <div className="mt-2 h-96 overflow-y-auto ring-4 ring-black ring-opacity-5 rounded-lg flow-root">
        {loading && (
          <LoadingMessage className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        {error && (
          <span className="w-full flex items-start justify-center text-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ExclamationTriangleIcon className="w-5 h-5 mt-0.5" />
            <span className="ml-2 font-light">
              {error.message ? error.message : 'Unable to fetch networks'}
            </span>
          </span>
        )}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="sticky bg-gray-50">
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
                  <td className="whitespace-nowrap px-3 py-2 text-left text-sm text-gray-500">
                    <a
                      href={`https://www.ndexbio.org/viewer/networks/${net.externalId}`}
                      target="_blank"
                      rel="noreferrer"
                      className=" group text-wrap"
                    >
                      <span className="underline underline-offset-2 group-hover:underline-complement-500 group-hover:text-complement-500">
                        {net.name}
                      </span>
                      <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 -mt-2 inline fill-gray-400 group-hover:fill-complement-500" />
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
      <div className="flex w-full justify-center">
        <LinkButton href={href} className="mt-4">More Results on NDEx</LinkButton>
      </div>
    </div>
  )
}

const TutorialsCard = ({ queryTerms, searchEngine }) => {
  const [results, setResults] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.debug('Searching tutorials with terms:', queryTerms.join(' '))
    const res = searchEngine.searchTutorials(queryTerms.join(' '))
    setResults(res)
    setLoading(false)
  }, [queryTerms, searchEngine])

  const createSearchUrl = (section, parent) => {
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
    <div className="w-full p-4 lg:pl-48 md:pl-16 rounded-xl min-h-28 sm:min-h-40 shadow-lg shadow-gray-200 border border-gray-200 text-left">
      {/* <div className="flex items-center">
        <h3 className="text-gray-900 font-semibold">Tutorials</h3>
      </div> */}
      <ul className="mt-4 space-y-2">
        {loading && (
          <LoadingMessage className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        {results && results.map(({ section, parent, title, text, terms }, idx) => (
          <li key={idx} className="p-2 max-w-screen-md">
            <span className="font-medium">
              <a
                href={createSearchUrl(section, parent)}
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
    </div>
  )
}


export function Results({ open=false, data, searchEngine, onClose }) {
  console.log('Results component data:', data)
  const type = data?.type
  const title = data?.title || 'Results'
  const queryTerms = data?.queryTerms || []
  const organism = data?.organism

  return (
    <Transition show={open}>
      <Dialog
        className="relative z-10 w-full"
        onClose={() => void 0/**(make it modal)*/}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 w-screen h-screen">
          <div className="flex w-full h-full items-end justify-center p-0 text-center sm:items-center sm:p-2">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform w-full h-full rounded-lg bg-white text-left shadow-xl transition-all overflow-y-auto py-6 sm:my-8 sm:px-0">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-xl bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-complement-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="-mt-2.5 text-center sm:text-left">
                  <DialogTitle as="h2" className="mt-0.5 mb-6 text-xl text-center font-semibold leading-6 text-gray-900">
                    {title}
                  </DialogTitle>
                  {(type === 'gene' || type === 'pathway') && (
                    <>
                    {type === 'gene' && (
                      <div className="mt-2 bg-black text-gray-400 text-left py-2">
                        <p className="flex flex-row items-center px-6">
                          <img src={organism.image} alt="" className="h-8 w-8 brightness-0 invert" />
                          <span className="pl-2 italic">{organism.name}</span>
                          <span className="ml-2">&#40;{queryTerms.length} query gene{queryTerms.length > 1 ? 's' : ''}&#41;</span>
                        </p>
                      </div>
                    )}
                      <div className="flex flex-col lg:flex-row space-y-2 items-start mt-5 px-6 sm:space-x-4 sm:space-y-0">
                      {type === 'gene' && queryTerms.length > 0 && organism && (
                        <GeneManiaCard genes={queryTerms} organism={organism} />
                      )}
                      {queryTerms.length > 0 && (
                        <NDExCard genes={queryTerms} />
                      )}
                      </div>
                    </>
                  )}
                  {type === 'tutorial' && (
                    <TutorialsCard queryTerms={queryTerms} searchEngine={searchEngine} />
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