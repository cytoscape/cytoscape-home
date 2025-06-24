import { useState, useRef, useEffect } from 'react'
import { useSearchStateStore } from '@/model/store'
import { parseGeneList } from '@/components/tools/Common'

const stepsDef = [
  {
    title: "Search Tutorials and Protocols",
    component: SearchPanel,
  },
]

function SearchPanel({ initialTerms, onChange }) {
  const [value, setValue] = useState()

  useEffect(() => {
    if (initialTerms?.length > 0) {
      setValue(initialTerms.join(' '))
    }
  }, [initialTerms])

  const handleChange = (event) => {
    let val = event.target.value
    setValue(val)
    val = val.trim()
    onChange(val)
  }

  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Enter one or more search terms:
      </label>
      <div className="mt-2">
        <textarea
          rows={7}
          name="search"
          id="search"
          value={value || ''}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-complement-500 sm:text-sm sm:leading-5"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export function TutorialWizard({ step, searchText, setTotalSteps, setTitle, onCanContinue, onSubmit }) {
  const setSearchTerms = useSearchStateStore((state) => state.setTerms)
  
  const termsRef = useRef('')

  useEffect(() => {
    if (step >= 0 && step < stepsDef.length) {
      setTotalSteps(stepsDef.length)
      setTitle(stepsDef[step].title)
    }
    if (searchText) {
      termsRef.current = parseGeneList(searchText)
      onCanContinue(termsRef.current.length > 0)
    } else {
      termsRef.current = ''
      onCanContinue(false)
    }
    switch (step) {
      case 0:
        onCanContinue(termsRef.current.length > 0)
        break
      case 1:
        onSubmit({
          type: 'tutorial',
          title: 'Tutorial Search',
          queryTerms: useSearchStateStore.getState().getTerms(), // TODO: rename to terms
        })
    }
  })

  const handleChange = (value) => {
    switch (step) {
      case 0:
        setSearchTerms(value)
        termsRef.current = value
        onCanContinue(value.length > 0)
        break
      case 1:
        onCanContinue(value != null)
        break
    }
  }

  return (
    <div className="min-h-48">
      {stepsDef.map(({ component: Comp }, idx) => (
        <div key={idx} style={step !== idx ? {display: 'none'} : {}}>
          <Comp initialTerms={termsRef?.current} onChange={handleChange} />
        </div>
      ))}
    </div>
  )
}