import { Button } from '@/components/base/Button'
import { Container } from '@/components/base/Container'
import { AppDemo } from '@/components/AppDemo'
import { BrowserFrame } from '@/components/BrowserFrame'

import logoUCSD from '@/images/logos/ucsd.svg'
import logoUCSF from '@/images/logos/ucsf.svg'
import logoUofT from '@/images/logos/uoft.svg'

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  )
}

export function Hero({ onGetStarted }) {
  return (
    <div className="overflow-hidden py-20 sm:py-28 lg:pb-32 xl:pb-36">
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
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 justify-center sm:justify-start">
              <Button variant="solid" color="gray" onClick={onGetStarted} className="pl-5 pr-5">
                <span className="text-center">Get Started</span>
              </Button>
              <Button
                href="https://youtu.be/IFitLMiN42M?si=BQsTRz5-lKHcanZg"
                target="_blank"
                rel="noreferrer"
                variant="outline"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Watch the video</span>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="h-auto -mx-4 px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:px-0 lg:pt-10 xl:-bottom-32">
              <BrowserFrame className="mx-auto max-w-[626px]">
                <AppDemo />
              </BrowserFrame>
            </div>
          </div>
          <div className="relative mt-0 lg:col-span-7 lg:mt-2 lg:border-t xl:col-span-6">
            <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            >
              {[
                ['University of California San Diego', logoUCSD, 'https://ucsd.edu/'],
                ['University of California San Francisco', logoUCSF, 'https://www.ucsf.edu/'],
                ['University of Toronto', logoUofT, 'https://www.utoronto.ca/'],
              ].map(([name, logo, href]) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noreferrer">
                    <img src={logo} alt={name} className="h-12" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}
