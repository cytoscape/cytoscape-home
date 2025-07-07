import { useEffect, useState } from 'react'

import { Button } from '@/components/base/Button'
import { Label, TextField } from '@/components/base/Fields'
import { Container } from '@/components/base/Container'
import { AppDemo } from '@/components/AppDemo'
import { BrowserFrame } from '@/components/BrowserFrame'
import { searchNDEx, searchGeneMania, searchWikiPathways } from '@/components/tools/Common'
import { useSearchStateStore } from '@/model/store'

import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { CytoscapeWebLogo, GeneManiaLogo, NDExLogo, WikiPathwaysLogo } from '@/components/Logos'


const searchCategories = [
  // { value: 'all', label: 'Search All' },
  { value: 'gene', label: 'Genes' },
  // { value: 'pathway', label: 'Pathways' },
  { value: 'tutorial', label: 'Tutorials' },
]
const searchExamples = [
  { term: 'BRCA1', category: 'gene' },
  { term: 'breast cancer', category: 'gene' },
  { term: 'glycolysis', category: 'gene' },
  { term: 'enrichment analysis', category: 'tutorial' },
  { term: 'RNASeq analysis', category: 'tutorial' },
  { term: 'data visualization', category: 'tutorial' },
]
const searchPresets = [
  { value: 'cytoscapeWeb', label: 'Cytoscape Web', icon: CytoscapeWebLogo, category: 'gene', fn: () => window.open('https://web.cytoscape.org/', '_blank') },
  { value: 'ndex', label: 'NDEx', icon: NDExLogo, category: 'gene', fn: searchNDEx },
  { value: 'genemania', label: 'GeneMANIA', icon: GeneManiaLogo, category: 'gene', fn: searchGeneMania },
  { value: 'wikiPathways', label: 'WikiPathways', icon: WikiPathwaysLogo, category: 'pathway', fn: searchWikiPathways },
  // { value: 'enrichmentMap', label: 'Enrichment Map', icon: EnrichmentMapLogo, category: 'gene' },
]

const DNAIcon = (props) => (
  <svg viewBox="0 -960 960 960" aria-hidden="true" {...props}>
    <path
      d="M200-40v-40q0-139 58-225.5T418-480q-102-88-160-174.5T200-880v-40h80v40q0 11 .5 20.5T282-840h396q1-10 1.5-19.5t.5-20.5v-40h80v40q0 139-58 225.5T542-480q102 88 160 174.5T760-80v40h-80v-40q0-11-.5-20.5T678-120H282q-1 10-1.5 19.5T280-80v40h-80Zm138-640h284q13-19 22.5-38t17.5-42H298q8 22 17.5 41.5T338-680Zm142 148q20-17 39-34t36-34H405q17 17 36 34t39 34Zm-75 172h150q-17-17-36-34t-39-34q-20 17-39 34t-36 34ZM298-200h364q-8-22-17.5-41.5T622-280H338q-13 19-22.5 38T298-200Z"
      fill={props.fill || '#000000'}
    />
  </svg>
)

const MenuBookIcon = (props) => (
  <svg viewBox="0 -960 960 960" aria-hidden="true" {...props}>
    <path
      d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"
      fill={props.fill || '#000000'}
    />
  </svg>
)


function SearchBar({
  placeholder,
  initialCategory = 'gene',
  initialText='',
  onTextChange,
  onSubmit
}) {
  const [selectedCategory, setSelectedCategory] = useState(searchCategories.find(option => option.value === initialCategory))
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [text, setText] = useState(initialText)

  const setSearchTerms = useSearchStateStore((state) => state.setTerms)

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      const dropdownMenu = document.getElementById('searchDropdownMenu')
      if (dropdownMenu && !dropdownMenu.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  // Set the initial search category when the component mounts
  useEffect(() => {
    const initialSelectedCategory = searchCategories.find(option => option.value === initialCategory)
    if (initialSelectedCategory) {
      setSelectedCategory(initialSelectedCategory)
      const dropdownButton = document.getElementById('searchDropdownButton')
      if (dropdownButton) {
        dropdownButton.setAttribute('aria-label', `Search in ${initialSelectedCategory.label}`)
      }
    }
  }, [initialCategory])
  // Set the initial text when the component mounts
  useEffect(() => {
    if (initialText) {
      // Set the text input value and notify parent component
      setText(initialText)
      onTextChange(initialText)
    }
  }, [initialText, onTextChange])

  // Handle the category selection
  const handleCategorySelect = (value) => {
    setSelectedCategory(searchCategories.find(option => option.value === value))
    // Close the dropdown and update the input placeholder and aria-label
    setDropdownOpen(false)
    const dropdownButton = document.getElementById('searchDropdownButton')
    if (dropdownButton) {
      dropdownButton.setAttribute('aria-label', `Search in ${searchCategories.find(option => option.value === value).label}`)
    }
  }
  // Handle dropdown button click
  const handleCategoryClick = (event) => {
    const value = event.target.getAttribute('data-value')
    if (value) {
      handleCategorySelect(value)
    }
  }
  // Toggle dropdown visibility
  const handleDropdownClick = (event) => {
    event.stopPropagation() // Prevent click from propagating to document
    setDropdownOpen((open) => !open)
  }
  const handleTextChange = (event) => {
    const newText = event.target.value
    setText(newText)
    onTextChange(newText)
  }
  const handleSubmit = (event) => {
    if (text?.trim() !== '') {
      event.preventDefault()
      event.stopPropagation()
      setSearchTerms(text.trim().split(/\s+/).filter(term => term.length > 0))
      onSubmit()
    } else {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  return (
    <div className="w-full max-w-lg min-w-[200px]">
      <div className="relative mt-2">
        {/*<div className="absolute top-1 left-1 flex items-center">
          <button
            id="searchDropdownButton"
            onClick={handleDropdownClick}
            className="min-w-24 border-r py-1 px-1.5 text-center flex items-center text-sm transition-all text-slate-600"
          >
            <span
              id="searchDropdownLabel"
              className="text-ellipsis overflow-hidden"
            >
              { selectedCategory.label }
            </span>
            <span className="flex-grow"/>
            <ChevronDownIcon className="h-5 w-5 ml-1" />
          </button>
        {dropdownOpen && (
          <div
            id="searchDropdownMenu"
            className="min-w-[150px] absolute left-0 w-full mt-10 bg-white border border-slate-200 rounded-md shadow-lg z-10"
          >
            <ul id="searchDropdownOptions">
            {searchCategories.map((option) => (
              <li
                key={option.value}
                data-value={option.value}
                onClick={handleCategoryClick}
                className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
              >
                { option.label }
              </li>
            ))}
            </ul>
          </div>
        )}
        </div> */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text || ''}
            placeholder={placeholder || 'Enter your search term here...'}
            onChange={handleTextChange}
            className="w-full pl-4 pr-12 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:border-complement-500 focus:outline-none focus:ring-complement-500 shadow-sm focus:shadow"
          />
          <button
            disabled={!text || text.trim() === ''}
            onClick={handleSubmit}
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

export function Hero({ onGetStarted }) {
  // const [initialSearchCategory, setInitialSearchCategory] = useState('genes')
  const [selectedCategory, setSelectedCategory] = useState(searchCategories.find(option => option.value === 'gene'))
  const [searchText, setSearchText] = useState('')

  const focusSearchField = (select) => {
    const input = document.querySelector('input[type="text"]')
    if (input) {
      input.focus()
      if (select) {
        input.select()
      }
    }
  }

  const handleCategoryClick = (event) => {
    const value = event.target.getAttribute('value')
    if (value) {
      setSelectedCategory(searchCategories.find(option => option.value === value))
      focusSearchField(true)
    }
  }
  const handleTextChange = (text) => {
    setSearchText(text.trim())
  }
  const handleExampleClick = (event, term, searchCategory = 'all') => {
    event.preventDefault()
    // Set the initial search option based on the search option (to update the dropdown)
    // setInitialSearchCategory(searchCategory)
    // Set the input value and focus it
    setSearchText(term)
    focusSearchField()
  }
  const handlePresetClick = (searchPreset) => {
    // setInitialSearchCategory(searchPreset.category)
    const input = document.querySelector('input[type="text"]')
    if (input && searchPreset.fn) {
      const value = input.value.trim()
      if (value.length > 0) {
        searchPreset.fn(value)
      }
    }
  }

  const filteredExamples = searchExamples.filter(example => example.category === selectedCategory?.value)

  return (
    <div className="overflow-hidden py-5 lg:py-20 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              Transform your bioinformatics research
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Finding the perfect tool to search or create biological network figures has never been easier.
              Whether you are exploring genes, proteins or pathways, our intuitive interface allows you to analyze your data and create beautiful figures that are ready to be published.
            </p>
            <div className="mt-8 flex flex-col gap-y-0 sm:items-start xs:items-center">
              <span className="isolate inline-flex mb-5">
                <Button
                  variant={selectedCategory?.value === 'gene' ? 'solid' : 'outline'}
                  color="primary"
                  value="gene"
                  onClick={handleCategoryClick}
                  className="relative -ml-px inline-flex items-center rounded-none rounded-l-md"
                >
                  <DNAIcon
                    fill={selectedCategory?.value === 'gene' ? '#fff' : '#a3a3a3'}
                    aria-hidden="true"
                    className="size-5"
                  />
                  Try it now!
                </Button>
                <Button
                  variant={selectedCategory?.value === 'tutorial' ? 'solid' : 'outline'}
                  color="primary"
                  value="tutorial"
                  onClick={handleCategoryClick}
                  className="relative -ml-px inline-flex items-center rounded-none rounded-r-md"
                >
                  <MenuBookIcon
                    fill={selectedCategory?.value === 'tutorial' ? '#fff' : '#a3a3a3'}
                    aria-hidden="true"
                    className="mr-2 size-5"
                  />
                  What else can I do?
                </Button>
              </span>
              <SearchBar
                placeholder={selectedCategory?.value === 'gene' ? 'Enter a gene, pathway or any term' : 'Enter a tutorial topic'}
                initialCategory={selectedCategory.value}
                initialText={searchText}
                onTextChange={handleTextChange}
                onSubmit={() => onGetStarted(selectedCategory.value)}
              />
              <div className="mt-2 text-sm text-gray-500">
                <span className="mr-2">Examples:</span>
                {filteredExamples.map((example, index) => (
                  <span key={index}>
                    <a
                      href="#"
                      className="text-complement-500 hover:underline"
                      onClick={(e) => handleExampleClick(e, example.term, example.category)}
                    >
                      {example.term}
                    </a>
                    {index < filteredExamples.length - 1 && <span className="mx-2">|</span>}
                  </span>
                ))}
              </div>
              <div className={`${selectedCategory?.value === 'gene' ? 'visible' : 'collapse'} none mt-4 inline-flex items-center gap-2 text-sm text-gray-500`}>
                Open:
                {searchPresets.map((preset) => (
                  <Button
                    key={preset.value}
                    disabled={!searchText || searchText === ''}
                    variant="outline"
                    color="gray"
                    onClick={() => handlePresetClick(preset)}
                    className="flex items-center px-1 py-0.5 text-xs rounded-md"
                  >
                    <preset.icon
                      aria-hidden="true"
                      fill={!searchText || searchText === '' ? '#c5c5c5' : null}
                      className="h-5 w-5 mr-1 text-red-50"
                    />
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="h-auto -mx-4 px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:px-0 lg:pt-10 xl:-bottom-32">
              <BrowserFrame className="mx-auto max-w-[626px]">
                <AppDemo />
              </BrowserFrame>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
