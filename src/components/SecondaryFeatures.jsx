import { useState } from 'react'
import { LinkButton } from '@/components/base/Button'
import { Container } from '@/components/base/Container'
import { SelectMenu } from '@/components/base/SelectMenu'
import { geneManiaOrganisms, searchNDEx, searchGeneMania, searchWikiPathways } from '@/app/shared/common'
import { CytoscapeLogo, NDExLogo, GeneManiaLogo, EnrichmentMapLogo, WikiPathwaysLogo, CytoscapeWebLogo } from '@/components/Logos'
import { ArrowTopRightOnSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const defGeneManiaOrgIdx = 5

const Link = ({ href, ariaLabel, children }) => <a href={href} aria-label={ariaLabel} target="_blank" rel="noreferrer" className="text-gray-900 underline">
  {children}
</a>

const SearchField = ({ placeholder }) => <div className="relative w-full mt-2 rounded-md shadow-sm">
  <input
    type="search"
    id="search"
    placeholder={placeholder || 'Enter gene list'}
    className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-complement-500 sm:text-sm sm:leading-6"
  />
  <button className="absolute inset-y-0.5 right-0.5 w-8 h-8 flex items-center justify-center rounded-2xl hover:bg-gray-100 active:bg-gray-200">
    <MagnifyingGlassIcon
      className="h-5 w-5 fill-complement-500"
      aria-hidden="true"
    />
  </button>
</div>

const GeneManiaForm = () => {
  const [selGeneManiaOrg, setSelGeneManiaOrg ] = useState(geneManiaOrganisms[defGeneManiaOrgIdx])

  const onSubmit = (evt) => {
    const searchVal = evt.target.elements.search.value.trim()
    searchGeneMania(searchVal, selGeneManiaOrg?.name.toLowerCase().replace(' ', '-'))
    evt.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <SelectMenu data={geneManiaOrganisms} selectedIndex={defGeneManiaOrgIdx} onChange={setSelGeneManiaOrg} className="min-w-64" />
      <SearchField />
    </form>
  )
}

const NDExForm = () => {
  const onSubmit = (evt) => {
    const searchVal = evt.target.elements.search.value.trim()
    searchNDEx(searchVal)
    evt.preventDefault()
  }
  return (
    <form onSubmit={onSubmit} className="w-full">
      <SearchField placeholder="e.g. APAF1 BCL2 BID" />
    </form>
  )
}

const WikiPathwaysForm = () => {
  const onSubmit = (evt) => {
    const searchVal = evt.target.elements.search.value.trim()
    searchWikiPathways(searchVal)
    evt.preventDefault()
  }
  return (
    <form onSubmit={onSubmit} className="flex w-full justify-center md:w-auto">
      <SearchField placeholder="e.g. ace2 aldosterone human" />
    </form>
  )
}

const features = [
  {
    name: 'NDEx IQuery',
    description: 'One search finds a variety of pathways and interaction networks relevant to your set of genes.',
    href: 'https://www.ndexbio.org/iquery/',
    icon: NDExLogo,
    form: <NDExForm />
  },
  {
    name: 'GeneMANIA',
    description: 'GeneMANIA helps you predict the function of your favourite genes and gene sets.',
    href: 'https://genemania.org/',
    icon: GeneManiaLogo,
    form: <GeneManiaForm />,
  },
  {
    name: 'EnrichmentMap',
    description: 'Perform gene set enrichment analysis on a gene list then visualize the results as a network.',
    href: 'https://enrichmentmap.org/',
    icon: EnrichmentMapLogo,
    form: <div className="flex w-full justify-center"><LinkButton href="https://enrichmentmap.org/">Go to EnrichmentMap</LinkButton></div>,
  },
  {
    name: 'WikiPathways',
    description: 'Discover pathways of interest by organism, communities of domain experts, and ontology annotations.',
    href: 'https://www.wikipathways.org/',
    icon: WikiPathwaysLogo,
    form: <WikiPathwaysForm />,
  },
  {
    name: 'Cytoscape Web',
    description: 'Create interactive networks from your data directly on the web, analyze and then export the results.',
    href: 'https://web.cytoscape.org/',
    icon: CytoscapeWebLogo,
    form: <div className="flex w-full justify-center"><LinkButton href="https://web.cytoscape.org/">Go to Cytoscape Web</LinkButton></div>,
  },
  {
    name: 'Cytoscape ',
    description: <>
        Open source <Link href="https://cytoscape.org/download.html" ariaLabel="Download Cytoscape">software</Link> platform 
        for visualizing complex networks.<br />
        Customize it through the use of <Link href="https://apps.cytoscape.org/" ariaLabel="Cytoscape App Store">app extensions</Link>.<br />
        Use <Link href="https://doi.org/10.12688/f1000research.6767.1" ariaLabel="cyREST paper">cyREST</Link> to create reproducible workflows.
      </>,
    href: 'https://cytoscape.org/',
    icon: CytoscapeLogo,
  },
]

export function SecondaryFeatures() {
  return (
    <section
      id="ecosystem"
      aria-label="Tools available from the Cytoscape ecosystem"
      className="py-20 sm:py-32 border-b border-gray-200"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            The Cytoscape ecosystem
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Make the most of the apps in the Cytoscape ecosystem.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-2 text-sm sm:mt-20 sm:grid-cols-2 md:gap-4 md:gap-y-4 lg:max-w-none lg:grid-cols-3 lg:gap-6"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-gray-200 p-4 lg:p-8 min-h-36 md:min-h-48"
            >
              <div className="flex items-center">
                <feature.icon className="h-8 w-8" />
                <a href={feature.href} target="_blank" rel="noreferrer" className="flex items-start group">
                  <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">
                    {feature.name}
                  </h3>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-1 fill-gray-400 group-hover:fill-complement-500" />
                </a>
              </div>
              <p className="mt-2 text-gray-600">{feature.description}</p>
              {/* <div className="mt-6">
                {feature.form}
              </div> */}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
