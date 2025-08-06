import { CheckCircleIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Web',
    subtitle: 'Cytoscape Web in your browser, easy and shareable',
    id: 'tier-web',
    href: 'https://web.cytoscape.org/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    features: [
      'Get started in seconds, no installation required',
      'Sharing and collaboration with colleagues',
      'Beginner-friendly',
      'All computers and tablets supported',
      'Publication-ready figure export',
    ],
    cta: 'Open now',
  },
  {
    name: 'Desktop',
    subtitle: 'Cytoscape Desktop on your computer, private and powerful',
    id: 'tier-desktop',
    href: 'https://cytoscape.org/download.html',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    features: [
      'Install on your computer',
      'Private and offline',
      'Automate your workflow with Python',
      'Mac, Windows, and Linux supported',
      'Publication-ready figure export'
    ],
    cta: 'Download now'
  },
]

export function CompareSection() {
  return (
    <div id="apps" className="bg-white py-24 sm:py-32 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-primary-500">
            Your research, your Cytoscape
          </h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">
            Just the right Cytoscape app for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-600 sm:text-center sm:text-xl/8">
          Choose the Cytoscape app that fits your needs, whether you're a beginner or an advanced bioinformatician.
        </p>
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-2 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                {/* <h3 id={tier.id} className="text-base/7 font-semibold text-gray-900">
                  {tier.name}
                </h3> */}
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">{tier.name}</span>
                </p>
                <p className="mt-3 text-sm/6 text-gray-500">{tier.subtitle}</p>
                <a
                  href={tier.href}
                  target="_blank"
                  aria-describedby={tier.id}
                  className="mt-10 block rounded-md bg-primary-500 px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  {tier.cta}
                </a>
                {/* <p className="mt-10 text-sm/6 font-semibold text-gray-900">{tier.description}</p> */}
                <ul role="list" className="mt-6 space-y-3 text-sm/6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon aria-hidden="true" className="h-6 w-5 flex-none text-primary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}