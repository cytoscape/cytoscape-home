import { useState } from 'react'

import { geneManiaOrganisms } from '@/app/shared/common'
import { Container } from '@/components/base/Container'
import { AppDemo } from '@/components/AppDemo'
import { BrowserFrame } from '@/components/BrowserFrame'
import { SearchBar } from '@/components/SearchBar'
import { colors } from '@/styles/tailwind'

import { ArrowDownCircleIcon } from '@heroicons/react/16/solid'


const searchExamples = [
  { label: 'TP53', terms: ['TP53'], taxon: '9606', type: 'gene' },
  { label: 'breast cancer genes', terms: ['BRCA1', 'BRCA2', 'PALB2', 'CHEK2'], taxon: '9606', type: 'gene' },
  { label: 'glycolysis', terms: ['glycolysis'], taxon: '9606', type: 'pathway' },
]


export function Hero({ onGetStarted, onSubmit }) {
  const [searchText, setSearchText] = useState('')

  const handleTextChange = (text) => {
    setSearchText(text.trim())
  }
  const handleExampleClick = (event, example) => {
    const { terms, taxon, type } = example
    event.preventDefault()
    // Simulate a search submission
    setSearchText('')
    const text = terms.join(' ')
    let i = 0
    const animate = () => {
      setSearchText(text.slice(0, i + 1))
      i++
      if (i < text.length) {
        setTimeout(animate, 20)
      } else {
        setTimeout(() => {
          // Submit the search right away, don't open the wizard!
          onSubmit({ type, terms, organism: geneManiaOrganisms.find(org => org.taxon === taxon) })
        }, 200)
      }
    }
    animate()
  }

  return (
    <div className="overflow-hidden py-5 lg:pt-20 border-b border-gray-200">
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
            <div className="mt-10 flex flex-col gap-y-0 sm:items-start xs:items-start">
              <label className="mb-1 text-base/7 font-semibold text-gray-900">
                Try it now:
              </label>
              <SearchBar
                placeholder="Enter one or more genes, a pathway or any terms"
                initialText={searchText}
                onTextChange={handleTextChange}
                onSubmit={onGetStarted}
                className="bg-white drop-shadow-md"
              />
              <div className="mt-2 text-sm text-gray-500">
                <span className="mr-2">Examples:</span>
                {searchExamples.map((example, index) => (
                  <span key={index}>
                    <a
                      href="#"
                      className="text-complement-500 hover:underline"
                      onClick={(e) => handleExampleClick(e, example)}
                    >
                      {example.label}
                    </a>
                    {index < searchExamples.length - 1 && <span className="mx-2">|</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-16 text-center">
              <button
                onClick={() => window.scrollTo({ top: document.getElementById('genes').offsetTop, behavior: 'smooth' })}
                className="mx-auto flex flex-col items-center relative rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              >
                What else can I do?
                <ArrowDownCircleIcon  
                  fill={colors.gray[900]}
                  aria-hidden="true"
                  className="size-7 text-primary-500"
                />
              </button>
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
