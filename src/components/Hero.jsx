import { useState } from 'react'

import { Button } from '@/components/base/Button'
import { Container } from '@/components/base/Container'
import { AppDemo } from '@/components/AppDemo'
import { BrowserFrame } from '@/components/BrowserFrame'
import { SearchBar } from '@/components/SearchBar'

import { ChevronDoubleDownIcon } from '@heroicons/react/16/solid'


const searchExamples = [
  { label: 'TP53', terms: 'TP53' },
  { label: 'breast cancer genes', terms: 'BRCA1 BRCA2 PALB2 CHEK2' },
  { label: 'glycolysis', terms: 'glycolysis' },
]

const DNAIcon = (props) => (
  <svg viewBox="0 -960 960 960" aria-hidden="true" {...props}>
    <path
      d="M200-40v-40q0-139 58-225.5T418-480q-102-88-160-174.5T200-880v-40h80v40q0 11 .5 20.5T282-840h396q1-10 1.5-19.5t.5-20.5v-40h80v40q0 139-58 225.5T542-480q102 88 160 174.5T760-80v40h-80v-40q0-11-.5-20.5T678-120H282q-1 10-1.5 19.5T280-80v40h-80Zm138-640h284q13-19 22.5-38t17.5-42H298q8 22 17.5 41.5T338-680Zm142 148q20-17 39-34t36-34H405q17 17 36 34t39 34Zm-75 172h150q-17-17-36-34t-39-34q-20 17-39 34t-36 34ZM298-200h364q-8-22-17.5-41.5T622-280H338q-13 19-22.5 38T298-200Z"
      fill={props.fill || '#000000'}
    />
  </svg>
)


export function Hero({ onGetStarted }) {
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
  const handleExampleClick = (event, terms) => {
    event.preventDefault()
    // Set the input value and focus it
    setSearchText(terms)
    focusSearchField()
  }

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
            <div className="mt-10 flex flex-col gap-y-0 sm:items-start xs:items-start">
              <span className="isolate inline-flex mb-5">
                <div
                  color="gray"
                  className="relative -mb-5 py-2 pl-3 pr-5 inline-flex items-center rounded-t-md bg-gray-800 text-white justify-center text-sm font-semibold"
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
                onSubmit={onGetStarted}
                className="rounded-none rounded-b-md rounded-r-md"
              />
              <div className="mt-2 text-sm text-gray-500">
                <span className="mr-2">Examples:</span>
                {searchExamples.map((example, index) => (
                  <span key={index}>
                    <a
                      href="#"
                      className="text-complement-500 hover:underline"
                      onClick={(e) => handleExampleClick(e, example.terms, 'gene')}
                    >
                      {example.label}
                    </a>
                    {index < searchExamples.length - 1 && <span className="mx-2">|</span>}
                  </span>
                ))}
              </div>
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
