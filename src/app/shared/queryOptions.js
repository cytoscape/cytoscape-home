import { queryOptions } from '@tanstack/react-query'
import { NDEx } from '@js4cytoscape/ndex-client'
import { geneManiaOrganisms } from '@/app/shared/common'


const ndexClient = new NDEx('https://www.ndexbio.org/v2')


export function createMyGeneInfoQueryOptions(symbols = [], enabled = true) {
  // Remove duplicates and sort it
  const symbolSet = new Set(symbols)
  symbols = Array.from(symbolSet).sort()

  return queryOptions({
    queryKey: ['myGeneInfo', symbols],
    queryFn: () => fetchMyGeneInfo(symbols),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  })
}

export function createGeneManiaQueryOptions(genes = [], organismId = 4, enabled = true) {
  // Remove duplicates and sort it
  const geneSet = new Set(genes)
  genes = Array.from(geneSet).sort()
  return queryOptions({
    queryKey: ['geneManiaNetwork', genes, organismId],
    queryFn: () => fetchGeneManiaNetwork(genes, organismId),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  })
}

export function createNDExQueryOptions(genes, enabled = true) {
  return queryOptions({
    queryKey: ['ndexNetwork', genes],
    queryFn: () => ndexClient.searchNetworks(genes.join(' ')),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  })
}


async function fetchMyGeneInfo(symbols) {
  const response = await fetch('https://mygene.info/v3/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: symbols,
      species: geneManiaOrganisms.map(org => org.taxon),
      fields: ['symbol', 'taxid'],
      scopes: ['symbol'],
      email: ['gary', 'bader'].join('.') + '@' + ['utoronto', 'ca'].join('.'), // Obfuscated email to avoid simple scraping bots
      size: 1000
    })
  })
  const data = await response.json()

  // Count occurrences of each taxid
  const taxidCounts = {}
  for (const entry of data || []) {
    const taxid = entry.taxid
    if (taxid) {
      taxidCounts[taxid] = (taxidCounts[taxid] || 0) + 1
    }
  }

  // Sort taxids by count (descending) -- this is important because the client code expects the most common taxid first!
  return Object.entries(taxidCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([taxid, count]) => ({ taxid, count }))
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
        "genes": genes.join('\n'),
        "weighting": "AUTOMATIC_SELECT",
        "geneThreshold": 20,
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