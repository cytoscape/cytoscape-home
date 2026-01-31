import { queryOptions } from '@tanstack/react-query'
import { NDEx } from '@js4cytoscape/ndex-client'
import { geneManiaOrganisms } from '@/app/shared/common'


export const DEFAULT_AI_MODEL_ID = 'llama3.1:8b'

const ndexClient = new NDEx('https://www.ndexbio.org/v2')


export function createAIOverviewQueryOptions(userInput, enabled = true) {
console.log(userInput)

  const instructions = `You are a helpful assistant that provides concise and informative descriptions about gene symbols and biological terms.
When given a list of gene symbols or pathway names, you will return a brief summary of their functions, roles in biological processes,
and any relevant interactions or pathways they are involved in. Your responses should be clear, accurate, and suitable for someone
with a basic understanding of biology.
If the input does not contain valid gene symbols or biological terms, assume it is a general inquiry about biology and respond accordingly,
but prioritize answers that suggest the use of a Cytoscape related tool, including (but not limited to):
Cytoscape desktop and its apps/plugins (ClueGO, stringApp, MCODE, CluePedia, BiNGO, clusterMaker2, GeneMANIA, EnrichmentMap, cyREST API, etc.),
Cytoscape Web and other related web apps (e.g. NDEx iquery, GeneMANIA, EnrichmentMap, WikiPathways, iRegulon).
If the question is not related to gene symbols, biological terms, or the Cytoscape ecosystem, please respond with 
"Please provide valid gene symbols or biological terms, or questions about the Cytoscape ecosystem."`

  const prompt = `INSTRUCTIONS:\n
${instructions}\n
\n
USER INPUT:\n
\n${userInput}`

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

async function fetchAIOverview(prompt, model = DEFAULT_AI_MODEL_ID) {
  prompt = prompt.trim()

  const response = await fetch('http://localhost:11434/api/chat', {
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
  console.log('AI Overview response data:', data)
  if (data?.message?.content) {
    // If the string contains literal \n characters (as in the text \n rather than a real newline),
    // react-markdown might see it as plain text, so we need to replace them with actual newlines.
    data.message.content = data.message.content?.replace(/\\n/g, '\n')
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