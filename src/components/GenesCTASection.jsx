import { MagnifyingGlassIcon, ShareIcon, PlayIcon, ArrowsRightLeftIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/base/Button'

const tagLine = 'Just paste your genes';
const title = 'Start with a gene list (1+)';
const description = `With either your gene list or your genomics data, you're just a few clicks away from finding relevant information and analyses for your research.`;

const features = [
  {
    name: 'Find gene function',
    description: 'Find out more information about gene function for one or more genes.',
    icon: MagnifyingGlassIcon,
    button: 'Use GeneMANIA',
    link: 'https://genemania.org'
  },
  { 
    name: 'Run pathway enrichment analysis', 
    description: 'Run pathway enrichment analysis on genomics data or a gene list.',
    icon: PlayIcon,
    button: 'Use EnrichmentMap',
    link: 'https://enrichmentmap.org'
  },
  {
    name: 'Get a network',
    description: 'Search for published networks from researchers all over the world.',
    icon: ShareIcon,
    button: 'Use NDEX',
    link: 'https://ndexbio.org'
  },
  {
    name: 'Predict gene regulatory networks',
    description: 'Predict gene regulatory networks controlling co-regulated genes',
    icon: ArrowsRightLeftIcon,
    button: 'Use iRegulon',
    link: 'https://iregulon.org'
  }
]

export function GenesCTASection() {
  return (
    <section id="genes" className="pb-16 pt-20 sm:pb-24 sm:pt-32 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <h2 className="text-base/7 font-semibold text-primary-500">{tagLine}</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              {title}
            </p>
            <p className="mt-6 text-base/7 text-gray-700">
              {description}
            </p>
          </div>
          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900">
                  <feature.icon aria-hidden="true" className="absolute top-1 left-0 size-5 text-primary-500" />
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
                <dd className="mt-2">
                  <a href={feature.link} target="_blank">
                    <Button variant="outline" color="secondary" className="">
                      <span className="text-center">{feature.button}</span>
                    </Button>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}