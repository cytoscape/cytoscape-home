import { useEffect, useMemo, useRef, useState } from 'react'
import _ from 'lodash'
import { SelectMenu } from '@/components/base/SelectMenu'
import { geneManiaOrganisms, parseGeneList } from '@/components/tools/Common'
import { LoadingMessage } from '@/components/base/Loading'


async function detectSpecies(symbols) {
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

function GenesPanel({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue || '')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (event) => {
    let val = event.target.value
    setValue(val)
    val = val.trim()
    onChange(val)
  }

  return (
    <div>
      <label htmlFor="genes" className="block text-sm font-medium leading-6 text-gray-900">
        Enter one or more gene names:
      </label>
      <div className="mt-2">
        <textarea
          rows={7}
          name="genes"
          id="genes"
          value={value || ''}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-complement-500 sm:text-sm sm:leading-5"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

function OrganismsPanel({ organisms, initialSelectedIndex = -1, onChange }) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)

  const handleChange = (item) => {
    const index = organisms.findIndex(org => org.taxon === item.taxon)
    setSelectedIndex(index)
  }

  useEffect(() => {
    setSelectedIndex(initialSelectedIndex)
  }, [initialSelectedIndex])

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < organisms.length) {
      const item = organisms[selectedIndex]
      onChange(item)
    }
  }, [selectedIndex, organisms, onChange])

  return (
    <div>
      <label htmlFor="organism" className="block text-sm font-medium leading-6 text-gray-900">
        Select the organism:
      </label>
      <SelectMenu
        data={organisms}
        selectedIndex={selectedIndex}
        onChange={handleChange}
        className="min-w-64"
      />
    </div>
  )
}

export function GeneWizard({ step, initialSearchText, setTotalSteps, setTitle, onCanContinue, onSubmit }) {
  const [searchText, setSearchText] = useState(initialSearchText || '')
  const [organisms, setOrganisms] = useState(geneManiaOrganisms)
  const [initialOrganismIndex, setInitialOrganismIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  
  const genes = useMemo(
    () => searchText ? parseGeneList(searchText) : [],
    [searchText]
  )

  const genesRef = useRef([])
  const orgRef = useRef()

  useEffect(() => {
    setSearchText(initialSearchText || '')
  }, [initialSearchText])

  useEffect(() => {
    const filterOrganisms = async () => {
      setLoading(true)
      genesRef.current = genes || []
      orgRef.current = null // Reset the organism reference
      const taxidCounts = await detectSpecies(genes) /* = [] */ // <== just do this to bypass the API call
      setLoading(false)
      console.debug('Detected species:', taxidCounts)
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
        orgRef.current = filteredOrganisms.find(org => org.taxon === taxidCounts[0].taxid)
        // ...but only if its count is higher than the human's count; otherwise, set it to human (9606)
        if (!orgRef.current || orgRef.current.taxon !== '9606') {
          const humanCount = taxidCounts.find(item => item.taxid === '9606')?.count || 0
          if (humanCount >= (taxidCounts[0]?.count || 0)) {
            orgRef.current = filteredOrganisms.find(org => org.taxon === '9606') // Human
          }
        }
        if (!orgRef.current) {
          console.debug('No valid organism found, setting the first one as default.')
          orgRef.current = filteredOrganisms[0]
        }
        setOrganisms(filteredOrganisms)
        setInitialOrganismIndex(filteredOrganisms.findIndex(org => org.taxon === orgRef.current?.taxon))
      } else {
        // If no valid taxids, set the initial organism to human
        const initialOrg = geneManiaOrganisms.find(org => org.taxon === '9606') // Human
        orgRef.current = initialOrg
        setOrganisms(geneManiaOrganisms)
        setInitialOrganismIndex(geneManiaOrganisms.findIndex(org => org.taxon === initialOrg.taxon))
      }
    }

    if (step >= 0 && step < 2) {
      setTotalSteps(2)
      setTitle(step === 0 ? 'Genes' : 'Organisms')
    }
    if (step === 1 && genes?.length > 0 && !_.isEqual(genes, genesRef.current)) {
      filterOrganisms()
    }
  }, [step, setTitle, setTotalSteps, genes])

  useEffect(() => {
    switch (step) {
      case 0:
        onCanContinue(genes.length > 0)
        break
      case 1:
        onCanContinue(orgRef.current != null)
        break
      case 2:
        onSubmit({
          type: 'gene',
          title: 'Gene Analysis',
          queryTerms: genes,
          organism: orgRef.current
        })
    }
  }, [step, setTitle, setTotalSteps, onCanContinue, onSubmit, genes, initialOrganismIndex])

  const handleGenesChange = (value) => {
    setSearchText(value)
  }
  const handleOrganismsChange = (value) => {
    orgRef.current = value
  }

  return (
    <div className="min-h-48">
    {loading && (
      <LoadingMessage className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    )}
    {!loading && step === 0 && (
      <GenesPanel initialValue={searchText} onChange={handleGenesChange} />
    )}
    {!loading && step === 1 && (
      <OrganismsPanel organisms={organisms} initialSelectedIndex={initialOrganismIndex} onChange={handleOrganismsChange} />
    )}
    </div>
  )
}