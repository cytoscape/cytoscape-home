import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@/components/base/Button'
import { SearchBar } from '@/components/SearchBar'
import { Chatbot } from '@/components/results/Chatbot'
import { AIOverviewCard } from '@/components/results/AIOverviewCard'
import { GeneManiaCard } from '@/components/results/GeneManiaCard'
import { NDExCard } from '@/components/results/NDExCard'
import { WikiPathwaysCard } from '@/components/results/WikiPathwaysCard'
import { TutorialsCard } from '@/components/results/TutorialsCard'
import { LLM_SYSTEM_INSTRUCTIONS } from '@/app/shared/config'
import { AppLogo, AppLogomark, GeneManiaLogo, NDExLogo, WikiPathwaysLogo } from '@/components/Logos'
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { SparklesIcon, BookOpenIcon } from '@heroicons/react/24/solid'


const cardsDef = [
  // {
  //   id: 'ai',
  //   title: 'AI Overview',
  //   icon: ({ className, ...props }) => <SparklesIcon className={className} {...props} />,
  // },
  {
    id: 'genemania',
    title: 'GeneMANIA',
    icon: ({ className, ...props }) => <GeneManiaLogo className={className} {...props} />,
  },
  {
    id: 'ndex',
    title: 'NDEx',
    icon: ({ className, ...props }) => <NDExLogo className={className} {...props} />,
  },
  {
    id: 'wikipathways',
    title: 'WikiPathways',
    icon: ({ className, ...props }) => <WikiPathwaysLogo className={className} {...props} />
  },
  {
    id: 'tutorials',
    title: 'Tutorials & Protocols',
    icon: ({ className, ...props }) => <BookOpenIcon className={className} {...props} />
  },
]


const Drawer = React.memo(({ open, onClose, title, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-10 w-full"
    >
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <TransitionChild
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full md:pr-20">
              <DialogPanel
                className="border-r pointer-events-auto w-screen max-w-5xl transform transition duration-500 ease-in-out sm:duration-700"
              >
                <div className="relative flex flex-col h-full bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-base font-semibold text-gray-900">
                        {title}
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={onClose}
                          className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 fill-complement-500"
                        >
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6 bg-white overflow-y-auto">
                    {children}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  )
})
Drawer.displayName = 'Drawer'
Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}


export const Results = React.memo(({ open = false, initialQuery, searchEngine, onSubmit, onClose }) => {
  // null  - Initial state--not resolved yet (but show card to allow the card to fetch its data)
  // true	 - Show card + navbar
  // false - Hide card + navbar
  const initialVisibility = useMemo(() => ({
    ai: true,
    genemania: null,
    ndex: null,
    wikipathways: null,
    tutorials: null,
  }), [])

  const [query, setQuery] = useState(initialQuery)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [visibleCards, setVisibleCards] = useState(initialVisibility)

  const searchText = query?.searchText ?? ''
  const type = query?.type
  const terms = query?.terms ?? []
  const organism = query?.organism

  // Save the user input text in a ref so we can compare it with new user inputs later,
  // in order to decide whether to reset the chatbot messages or not
  const searchTextRef = useRef(searchText?.trim() ?? '')
  // Initially, the AI message comprises the system instructions, the original user input,
  // and the message returned by the AI assistant, if any.
  // Later, if the user interacts with the chatbot and generates new messages, we will update this chatbotMessagesRef
  // to reflect the latest conversation state when reopening the chatbot.
  const chatbotMessagesRef = useRef([])

  useEffect(() => {
    // Just resets the initial data with the object passed by the parent component
    if (initialQuery) {
      setQuery(initialQuery)
    }
  }, [initialQuery])

  useEffect(() => {
    // Clears the chatbot messages if the input text has changed since the last search
    if (searchTextRef.current !== searchText?.trim()) {
      chatbotMessagesRef.current = []
    }
  }, [searchText])

  useEffect(() => {
    setVisibleCards(initialVisibility)
  }, [initialQuery, initialVisibility])

  const handleGeneManiaResults = useCallback((hasResults) => {
    setVisibleCards(prev => {
      if (prev.genemania === hasResults) return prev // prevent unnecessary update
      return { ...prev, genemania: hasResults }
    })
  }, [])
  const handleNdexResults = useCallback((hasResults) => {
    setVisibleCards(prev => {
      if (prev.ndex === hasResults) return prev // prevent unnecessary update
      return { ...prev, ndex: hasResults }
    })
  }, [])
  const handleWikiResults = useCallback((hasResults) => {
    setVisibleCards(prev => {
      if (prev.wikipathways === hasResults) return prev // prevent unnecessary update
      return { ...prev, wikipathways: hasResults }
    })
  }, [])
  const handleTutorialResults = useCallback((hasResults) => {
    setVisibleCards(prev => {
      if (prev.tutorials === hasResults) return prev // prevent unnecessary update
      return { ...prev, tutorials: hasResults }
    })
  }, [])

  const handleWhatElseClick = () => {
    onClose()
    window.location.href = '/#genes'
  }
  
  const handleOpenChatbot = useCallback((data) => {
    const assistantMsg = data?.message?.content ?? ''
    if (chatbotMessagesRef.current?.length === 0) {
      // Reinitialize the chatbot messages with the when opening the chatbot for the first time or after a new search.
      chatbotMessagesRef.current = [
        { role: 'system', content: LLM_SYSTEM_INSTRUCTIONS },
        { role: 'user', content: searchText ?? '' },
        { role: 'assistant', content: assistantMsg ?? '' },
      ]
    }
    setChatbotOpen(true)
  }, [searchText])
  const handleCloseChatbot = useCallback(() => {
    setChatbotOpen(false)
  }, [])
  const handleChatbotMessagesChange = (updatedMessages) => {
    // If there are updated messages from the chatbot, we can update the chatbotMessages
    // to reflect the latest state of the conversation when reopening the chatbot.
    chatbotMessagesRef.current = [...updatedMessages]
  }

  const rightColumnRef = useRef(null)

  const scrollToCard = (id) => {
    const container = rightColumnRef.current
    const element = document.getElementById(id)

    if (container && element) {
      container.scrollTo({
        top: element.offsetTop - container.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <Transition show={open}>
      <Dialog
        className="relative z-10 w-full"
        onClose={() => void 0/**(make it modal)*/}
      >
        <div className="fixed inset-0 z-10 w-screen h-screen">
          <div className="flex w-full h-full items-end justify-center text-center sm:items-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="h-screen w-full flex flex-col text-left transition-all px-0 bg-white">
                
                {/* HEADER */}
                <header className="flex items-center justify-center bg-white md:px-4 px-2 md:pb-0 pb-2 border-b border-gray-200 drop-shadow-md">
                  <div className="flex flex-row sm:items-start items-center lg:space-x-10 md:space-x-6 space-x-4 w-full xl:max-w-6xl md:pt-5 pt-2 text-gray-400">
                    <a
                      aria-label="Home"
                      onClick={onClose}
                      className="cursor-pointer"
                    >
                      <AppLogo className="h-10 w-auto xl:ml-2 ml-0 md:block hidden" />
                      <AppLogomark className="h-10 w-auto md:hidden sm:block hidden" />
                      <Button variant="text" className="mt-2 sm:hidden group">
                        <ArrowLeftIcon className="w-5 group-hover:text-complement-500 group-active:text-complement-700" />
                      </Button>
                    </a>
                    <div className="w-full max-w-[667px] text-left">
                      <SearchBar
                        initialText={searchText}
                        initialOrganismTaxon={organism?.taxon}
                        showOrganismSelector={false} // type === 'gene'
                        onSubmit={onSubmit}
                        className="bg-white drop-shadow-md"
                      />
                      <div className="mt-2 text-sm text-gray-400 lg:text-left text-right hidden md:block">
                        <span className="lg:inline hidden">This is a small demonstration of the Cytoscape ecosystem.&nbsp;&nbsp;</span>
                        <a onClick={handleWhatElseClick} className="text-complement-400 hover:underline cursor-pointer">
                          Find out what else you can do...
                        </a>
                      </div>
                    </div>
                  </div>
                </header>
                
                {/* RESULTS (Navbar + Cards) */}
                <div className="flex lg:flex-row flex-col flex-1 self-center w-full overflow-hidden xl:gap-7 lg:gap-5 gap-0">

                  {/* LEFT Column */}
                  <div className="lg:flex lg:flex-col md:block hidden lg:w-1/5 w-full lg:pt-10 pb-10 xl:gap-5 lg:gap-4 lg:border-none border-b lg:overflow-y-auto overflow-hidden">
                    <nav className="flex lg:flex-col flex-row flex-wrap lg:w-fit self-end gap-3 lg:p-0 p-4 items-start align-middle lg:justify-start justify-center">
                      {cardsDef
                        .filter(card => visibleCards[card.id])
                        .map(({ id, icon: CardIcon, title }) => (
                        <button
                          key={`card-${id}`}
                          onClick={() => scrollToCard(`card-${id}`)}
                          className="flex items-center space-x-2 text-right text-sm text-gray-500 group hover:text-complement-500 disabled:text-gray-300 disabled:pointer-events-none"
                        >
                          <CardIcon fill="currentColor" className="h-5 w-5 fill-gray-400 group-hover:fill-complement-500" />
                          <span>{title}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* RIGHT Column */}
                  <div
                    ref={rightColumnRef}
                    className="lg:w-4/5 w-full overflow-y-auto px-2 py-4 space-y-5"
                  >
                    <div className="flex flex-col lg:gap-5 md:gap-4 gap-2.5 xl:w-3/4 w-full items-stretch">
                      {/* <AIOverviewCard
                        searchText={searchText}
                        onOpenChatbot={handleOpenChatbot}
                      /> */}
                    {type === 'gene' && organism && (
                      <GeneManiaCard
                        genes={terms}
                        organism={organism}
                        onResults={handleGeneManiaResults}
                      />
                    )}
                    {visibleCards['ndex'] !== false && (
                      <NDExCard
                        genes={terms}
                        onResults={handleNdexResults}
                      />
                    )}
                    {visibleCards['wikipathways'] !== false && searchEngine.isPathwaySearchReady() && (
                      <WikiPathwaysCard
                        terms={terms}
                        searchEngine={searchEngine}
                        onResults={handleWikiResults}
                      />
                    )}
                    {visibleCards['tutorials'] !== false && searchEngine.isTutorialSearchReady() && (
                      <TutorialsCard
                        terms={terms}
                        searchEngine={searchEngine}
                        onResults={handleTutorialResults}
                      />
                    )}
                    </div>
                  </div>

                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
      <Drawer
        open={chatbotOpen}
        onClose={handleCloseChatbot}
        title="Chat with AI"
      >
      {chatbotOpen && (
        <Chatbot
          initialMessages={chatbotMessagesRef.current}
          onMessagesChange={handleChatbotMessagesChange}
        />
      )}
      </Drawer>
    </Transition>
  )
})
Results.displayName = 'Results'
Results.propTypes = {
  open: PropTypes.bool,
  initialQuery: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['gene', 'pathway', 'tutorial', 'other']),
    terms: PropTypes.arrayOf(PropTypes.string).isRequired,
    organism: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      taxon: PropTypes.string.isRequired,
    }),
  }),
  searchEngine: PropTypes.shape({
    isTutorialSearchReady: PropTypes.func.isRequired,
    isPathwaySearchReady: PropTypes.func.isRequired,
    searchPathways: PropTypes.func.isRequired,
    searchTutorials: PropTypes.func.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Results