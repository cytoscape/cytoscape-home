import { useState, useEffect, useMemo } from 'react'
import { parseGeneList } from '@/app/shared/common'


const stepsDef = [
  {
    title: "Search Tutorials and Protocols",
    component: SearchPanel,
  },
]


function SearchPanel({ initialValue, onChange }) {
  const [value, setValue] = useState()

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

export function TutorialWizard({ step, initialSearchText, setTotalSteps, setTitle, onCanContinue, onSubmit }) {
  const [searchText, setSearchText] = useState(initialSearchText || '')

  const terms = useMemo(
    () => searchText ? parseGeneList(searchText) : [],
    [searchText]
  )
  
  useEffect(() => {
    setSearchText(initialSearchText || '')
  }, [initialSearchText])

  useEffect(() => {
    if (step >= 0 && step < stepsDef.length) {
      setTotalSteps(stepsDef.length)
      setTitle(stepsDef[step].title)
    }
    switch (step) {
      case 0:
        onCanContinue(terms.length > 0)
        break
      case 1:
        onSubmit({ type: 'tutorial', terms })
    }
  }, [step, setTotalSteps, setTitle, onCanContinue, onSubmit, terms])

  const handleChange = (value) => {
    setSearchText(value)
  }

  return (
    <div className="min-h-48">
      <SearchPanel initialValue={searchText} onChange={handleChange} />
    </div>
  )
}