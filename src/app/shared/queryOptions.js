import { queryOptions } from '@tanstack/react-query'
import { geneManiaOrganisms } from '@/app/shared/common'


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

  // Sort taxids by count
  return Object.entries(taxidCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([taxid, count]) => ({ taxid, count }))
}
