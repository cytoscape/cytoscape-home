import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { geneManiaOrganisms } from '@/app/shared/common'

import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'


/**
 * SearchBar component for entering gene symbols, pathways, or any other search terms.
 */
export function SearchBar({
  placeholder,
  initialText = '',
  initialOrganismTaxon = '9606', // Default to human
  showOrganismSelector = false,
  onTextChange,
  onOrganismChange,
  onSubmit,
  className
}) {
  const [text, setText] = useState(initialText)
  const [selectedOrganism, setSelectedOrganism] = useState(geneManiaOrganisms.find(org => org.taxon === initialOrganismTaxon))
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  // Set the initial text when the component mounts
  useEffect(() => {
    if (initialText) {
      // Set the text input value and notify parent component
      setText(initialText)
      onTextChange?.(initialText)
    }
  }, [initialText, onTextChange])

  // Set the initial organism when the component mounts
  useEffect(() => {
    const initialSelectedOrganism = geneManiaOrganisms.find(org => org.taxon === initialOrganismTaxon)
    if (initialSelectedOrganism) {
      setSelectedOrganism(initialSelectedOrganism)
    }
  }, [initialOrganismTaxon])

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    if (!showOrganismSelector) return
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      const dropdownMenu = document.getElementById('organismDropdownMenu')
      if (dropdownMenu && !dropdownMenu.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showOrganismSelector])

  const handleTextChange = (event) => {
    const newText = event.target.value
    setText(newText)
    onTextChange?.(newText)
  }

  const handleOrganismSelect = (value) => {
    const org = geneManiaOrganisms.find(org => org.taxon === value)
    if (org) {
      setSelectedOrganism(org)
      setDropdownOpen(false)
      onOrganismChange?.(org)
    }
  }

  const handleOrganismClick = (event) => {
    const value = event.currentTarget.getAttribute('data-value')
    if (value) {
      handleOrganismSelect(value)
    }
  }

  const handleDropdownClick = (event) => {
    event.stopPropagation() // Prevent click from propagating to document
    setDropdownOpen((open) => !open)
  }

  const handleSubmit = (event) => {
    if (text?.trim() !== '') {
      event.preventDefault()
      event.stopPropagation()
      onSubmit?.({ terms: text.trim().split(/\s+/).filter(term => term.length > 0), organism: selectedOrganism })
    } else {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const inputClassName = clsx(
    'w-full pr-12 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm',
    'border border-gray-300 rounded-md transition duration-300 ease focus:border-complement-500 focus:outline-none focus:ring-complement-500 shadow-sm focus:shadow',
    `${showOrganismSelector ? 'pl-20' : 'pl-4'}`,
    className,
  )

  return (
    <div className="w-full min-w-[200px]">
      <div className="relative">
      {showOrganismSelector && (
        <div className="absolute top-1 left-1 flex items-center">
          <button
            id="searchDropdownButton"
            onClick={handleDropdownClick}
            className="min-w-16 border-r py-1 px-1.5 text-center flex items-center text-sm transition-all text-slate-600"
          >
            <span
              id="searchDropdownLabel"
              className="text-ellipsis overflow-hidden"
            >
              <img
                src={selectedOrganism.image}
                alt={selectedOrganism.name}
                className="inline-block h-6 w-6 mr-1 saturate-0"
              />
            </span>
            <span className="flex-grow"/>
            <ChevronDownIcon className="h-5 w-5 ml-1" />
          </button>
        {dropdownOpen && (
          <div
            id="organismDropdownMenu"
            className="min-w-[280px] absolute top-10 -left-1 w-full bg-white border border-slate-200 rounded-md shadow-lg z-10"
          >
            <ul id="searchDropdownOptions">
            {geneManiaOrganisms.map((org) => (
              <li
                key={org.taxon}
                data-value={org.taxon}
                onClick={handleOrganismClick}
                className="px-4 py-2 text-slate-600 hover:bg-complement-200 text-sm cursor-pointer"
              >
                <div className="flex items-center">
                  <img src={org.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full saturate-0" />
                  <span
                    className={clsx(`ml-3 block truncate`, {
                      'font-semibold': selectedOrganism.taxon === org.taxon,
                      'font-normal': selectedOrganism.taxon !== org.taxon,
                    })}
                  >
                    {org.name}
                  </span>
                {selectedOrganism.taxon === org.taxon && (
                  <span className="ml-auto pl-2 text-complement-500">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                )}
                </div>
              </li>
            ))}
            </ul>
          </div>
        )}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text || ''}
            placeholder={placeholder || 'Enter your search term here...'}
            onChange={handleTextChange}
            className={inputClassName}
          />
          <button
            disabled={!text || text.trim() === ''}
            type="submit"
            className="absolute inset-y-1 right-1 w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gray-100 active:bg-gray-200 fill-complement-500 disabled:pointer-events-none disabled:fill-gray-400"
          >
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="h-6 w-6 fill-inherit"
            />
          </button>
        </form>
      </div>
    </div>
  )
}

export default SearchBar