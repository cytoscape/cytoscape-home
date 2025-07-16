import { useEffect, useState } from 'react'

import { Button } from '@/components/base/Button'
import { Container } from '@/components/base/Container'
import { AppDemo } from '@/components/AppDemo'
import { BrowserFrame } from '@/components/BrowserFrame'
import { searchNDEx, searchGeneMania, searchWikiPathways } from '@/components/tools/Common'
import { useSearchStateStore } from '@/model/store'

import { ChevronDoubleDownIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { CytoscapeWebLogo, GeneManiaLogo, NDExLogo, WikiPathwaysLogo } from '@/components/Logos'


const searchCategories = [
  // { value: 'all', label: 'Search All' },
  { value: 'gene', label: 'Genes' },
  // { value: 'pathway', label: 'Pathways' },
  { value: 'tutorial', label: 'Tutorials' },
]
const searchExamples = [
  { label: 'TP53', terms: 'TP53', category: 'gene' },
  { label: 'breast cancer genes', terms: 'BRCA1 BRCA2 PALB2 CHEK2', category: 'gene' },
  { label: 'glycolysis', terms: 'glycolysis', category: 'pathway' },
  // { label: 'enrichment analysis', terms: 'enrichment analysis', category: 'tutorial' },
  // { label: 'RNASeq analysis', terms: 'RNASeq analysis', category: 'tutorial' },
  // { label: 'data visualization', terms: 'data visualization', category: 'tutorial' },
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
  initialText='',
  onTextChange,
  onSubmit
}) {
  const [selectedCategory, setSelectedCategory] = useState('gene')
  const [text, setText] = useState(initialText)

  const setSearchTerms = useSearchStateStore((state) => state.setTerms)

  // Set the initial text when the component mounts
  useEffect(() => {
    if (initialText) {
      // Set the text input value and notify parent component
      setText(initialText)
      onTextChange(initialText)
    }
  }, [initialText, onTextChange])

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
    <div className="w-full min-w-[200px]">
      <div className="relative mt-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text || ''}
            placeholder={placeholder || 'Enter your search term here...'}
            onChange={handleTextChange}
            className="w-full pl-4 pr-12 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-black rounded-b-md rounded-r-md transition duration-300 ease focus:border-complement-500 focus:outline-none focus:ring-complement-500 shadow-sm focus:shadow"
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
  const [selectedCategory, setSelectedCategory] = useState('gene')
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

  const handleTextChange = (text) => {
    setSearchText(text.trim())
  }
  const handleExampleClick = (event, terms, searchCategory = 'gene') => {
    event.preventDefault()
    // Set the initial search option based on the search option (to update the dropdown)
    setSelectedCategory(searchCategory)
    // Set the input value and focus it
    setSearchText(terms)
    focusSearchField()
  }
  // const handlePresetClick = (searchPreset) => {
  //   // setInitialSearchCategory(searchPreset.category)
  //   const input = document.querySelector('input[type="text"]')
  //   if (input && searchPreset.fn) {
  //     const value = input.value.trim()
  //     if (value.length > 0) {
  //       searchPreset.fn(value)
  //     }
  //   }
  // }

  return (
    <div className="overflow-hidden py-5 lg:py-20">
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
            <div className="mt-8 flex flex-col gap-y-0 sm:items-start xs:items-start">
              <span className="isolate inline-flex mb-5">
                <div
                  color="gray"
                  className="relative -mb-7 py-2 pl-3 pr-5 inline-flex items-center rounded-t-md bg-gray-800 text-white justify-center text-sm font-semibold"
                >
                  <DNAIcon
                    fill="#b5b5b5"
                    aria-hidden="true"
                    className="size-5 mr-3"
                  />
                  Try it now!
                </div>
              </span>
              <SearchBar
                placeholder="Enter one or more genes, a pathway or any terms"
                initialText={searchText}
                onTextChange={handleTextChange}
                onSubmit={() => onGetStarted(selectedCategory)}
              />
              <div className="mt-2 text-sm text-gray-500">
                <span className="mr-2">Examples:</span>
                {searchExamples.map((example, index) => (
                  <span key={index}>
                    <a
                      href="#"
                      className="text-complement-500 hover:underline"
                      onClick={(e) => handleExampleClick(e, example.terms, example.category)}
                    >
                      {example.label}
                    </a>
                    {index < searchExamples.length - 1 && <span className="mx-2">|</span>}
                  </span>
                ))}
              </div>
              {/* <div className={`${selectedCategory === 'gene' ? 'visible' : 'collapse'} none mt-4 inline-flex items-center gap-2 text-sm text-gray-500`}>
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
              </div> */}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center">
              <Button
                variant="solid"
                color="primary"
                onClick={() => window.open('/#genes', '_self')}
                className="relative ml-auto mr-auto pr-5 items-center"
              >
                <ChevronDoubleDownIcon
                  fill="#fff"
                  aria-hidden="true"
                  className="size-5 mr-2"
                />
                What else can I do?
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="h-auto -mx-4 px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:pt-10 xl:-bottom-32">
              <BrowserFrame className="mx-auto max-w-[640px]">
                <AppDemo />
              </BrowserFrame>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
