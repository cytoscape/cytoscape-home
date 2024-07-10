import { useState, useRef, useEffect } from 'react'
import { SelectMenu } from '@/components/base/SelectMenu'
import { geneManiaOrganisms, parseGeneList } from '@/components/tools/Common'

const GenesPanel = ({ initialValue, onChange }) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    let val = event.target.value
    setValue(val)
    val = val.trim()
    let genes = []
    if (val.length > 0) {
      genes = parseGeneList(val);
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
          rows={6}
          name="genes"
          id="genes"
          value={value}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-complement-500 sm:text-sm sm:leading-6"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

const OrganismsPanel = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="organism" className="block text-sm font-medium leading-6 text-gray-900">
        Select the organism:
      </label>
      <SelectMenu data={geneManiaOrganisms} onChange={onChange} className="min-w-64" />
    </div>
  )
}

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

export function GeneWizard({ step, setTotalSteps, setTitle, onCanContinue, onSubmit }) {
  const genesRef = useRef([])
  const orgRef = useRef()

  useEffect(() => {
    if (step >= 0 && step < stepsDef.length) {
      setTotalSteps(stepsDef.length)
      setTitle(stepsDef[step].title)
    }
    switch (step) {
      case 0:
        onCanContinue(genesRef.current.length > 0)
        break
      case 1:
        onCanContinue(orgRef.current != null)
        break
      case 2:
        onSubmit({ title: 'Gene Analysis', genes: genesRef.current, organism: orgRef.current })
    }
  });

  const handleChange = (value) => {
    switch (step) {
      case 0:
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
          <Comp onChange={handleChange} />
        </div>
      ))}
    </div>
  )
}