import { queryOptions } from '@tanstack/react-query'
import { NDEx } from '@js4cytoscape/ndex-client'
import { geneManiaOrganisms } from '@/app/shared/common'
import { normalizeNewlineCharacters } from '@/app/shared/common'
import { LLM_CHAT_API_URL, LLM_MODEL, LLM_SYSTEM_INSTRUCTIONS } from '@/app/shared/config'

const ndexClient = new NDEx('https://www.ndexbio.org/v2')

export function createAIOverviewQueryOptions(userInput, enabled = true) {
  const prompt = `
INSTRUCTIONS:\n
${LLM_SYSTEM_INSTRUCTIONS}\n
USER INPUT:\n
${userInput}`

  return queryOptions({
    queryKey: ['aiOverview', encodeTextToBase64(userInput)],
    queryFn: () => fetchAIOverview(prompt),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  })
}

export function createMyGeneInfoQueryOptions(symbols = [], enabled = true) {
  // Remove duplicates and sort it
  const symbolSet = new Set(symbols)
  symbols = Array.from(symbolSet)

  return queryOptions({
    queryKey: ['myGeneInfo', encodeTermsToBase64(symbols)],
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
  genes = Array.from(geneSet)
  return queryOptions({
    queryKey: ['geneManiaNetwork', encodeTermsToBase64(genes), organismId],
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
    queryKey: ['ndexNetwork', encodeTermsToBase64(genes)],
    queryFn: () => ndexClient.searchNetworks(genes.join(' ')),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  })
}

/**
 * Encode an array of terms into a base64 string after sorting and converting to lowercase,
 * so it can be used as a consistent query key for caching purposes.
 */
function encodeTermsToBase64(terms) {
  return btoa(terms.sort().join(' ').toLowerCase())
}
function encodeTextToBase64(text) {
  return btoa(text?.trim().toLowerCase())
}

async function fetchAIOverview(prompt, model = LLM_MODEL) {
  prompt = prompt.trim()

  const response = await fetch(LLM_CHAT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [
        { role: "user", content: prompt }
      ],
      stream: false
    })
  })
  const data = await response.json()

  if (data?.message?.content) {
    // If the string contains literal \n characters (as in the text \n rather than a real newline),
    // react-markdown might see it as plain text, so we need to replace them with actual newlines.
    data.message.content = normalizeNewlineCharacters(data.message.content)
  }

  return data
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