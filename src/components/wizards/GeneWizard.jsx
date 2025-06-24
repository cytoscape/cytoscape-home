import { useState, useRef, useEffect } from 'react'
import { SelectMenu } from '@/components/base/SelectMenu'
import { geneManiaOrganisms, parseGeneList } from '@/components/tools/Common'
import { useSearchStateStore } from '@/model/store'

const stepsDef = [
  {
    title: "Genes",
    component: GenesPanel,
  },
  {
    title: "Organisms",
    component: OrganismsPanel,
  },
]

function GenesPanel({ initialGenes, initialOrganism, onChange }) {
  const [value, setValue] = useState(initialGenes?.length > 0 ? initialGenes.join('\n') : null)

  useEffect(() => {
    if (initialGenes?.length > 0 && value === null) {
      // If initialGenes is provided, set the value to the joined string
      console.debug('IINIT ---> ', initialGenes)
      // Join the initialGenes array into a string with newlines
      // and set it as the value
      // This is to ensure that the textarea shows the initial genes
      // when the component mounts or when initialGenes changes
      setValue(initialGenes.join('\n'))
    }
  }, [initialGenes])

  const handleChange = (event) => {
    let val = event.target.value
    setValue(val)
    val = val.trim()
    let genes = []
    if (val.length > 0) {
      genes = parseGeneList(val)
    }
    onChange(genes)
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

function OrganismsPanel({ initialGenes, initialOrganism, onChange }) {
  return (
    <div>
      <label htmlFor="organism" className="block text-sm font-medium leading-6 text-gray-900">
        Select the organism:
      </label>
      <SelectMenu data={geneManiaOrganisms} onChange={onChange} className="min-w-64" />
    </div>
  )
}

export function GeneWizard({ step, searchText, setTotalSteps, setTitle, onCanContinue, onSubmit }) {
  const setSearchTerms = useSearchStateStore((state) => state.setTerms)
  
  const genesRef = useRef([])
  const orgRef = useRef()

  useEffect(() => {
    if (step >= 0 && step < stepsDef.length) {
      setTotalSteps(stepsDef.length)
      setTitle(stepsDef[step].title)
    }
    if (searchText?.trim().length > 0) {
      // If searchText is provided, we assume it's a gene list
      genesRef.current = parseGeneList(searchText)
      onCanContinue(genesRef.current.length > 0)
    } else {
      genesRef.current = []
      orgRef.current = null
      onCanContinue(false)
    }
    switch (step) {
      case 0:
        onCanContinue(genesRef.current.length > 0)
        break
      case 1:
        onCanContinue(orgRef.current != null)
        break
      case 2:
        onSubmit({
          type: 'gene',
          title: 'Gene Analysis',
          queryTerms: useSearchStateStore.getState().getTerms(),
          organism: orgRef.current
        })
    }
  })

  const handleChange = (value) => {
    switch (step) {
      case 0:
        setSearchTerms(value)
        genesRef.current = value
        onCanContinue(value.length > 0)
        break
      case 1:
        orgRef.current = value
        onCanContinue(value != null)
        break
    }
  }

  return (
    <div className="min-h-48">
      {stepsDef.map(({ component: Comp }, idx) => (
        <div key={idx} style={step !== idx ? {display: 'none'} : {}}>
          <Comp initialGenes={genesRef?.current} initialOrganism={orgRef?.current} onChange={handleChange} />
        </div>
      ))}
    </div>
  )
}