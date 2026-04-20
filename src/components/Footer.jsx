import { Container } from '@/components/base/Container'
import { NavLinks } from '@/components/NavLinks'
import { CytoscapeLogo } from '@/components/Logos'
import { Link } from '@/components/base/Link'

import consortiumLogo from '@/images/logos/cytoscape-consortium.svg'
import logoUCSD from '@/images/logos/ucsd.svg'
import logoUCSF from '@/images/logos/ucsf.svg'
import logoUofT from '@/images/logos/uoft.svg'


function DownloadBorder(props) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Footer() {
  return ( <>
    <footer className="border-t bg-gray-50 border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <nav className="flex gap-8">
              <NavLinks />
            </nav>
            <div className="relative mt-11 lg:col-span-7 xl:col-span-6">
              <ul
                role="list"
                className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
              >
                {[
                  ['The Cytoscape Consortium', consortiumLogo, 'https://cytoscapeconsortium.org/'],
                  ['University of California San Diego', logoUCSD, 'https://ucsd.edu/'],
                  ['University of California San Francisco', logoUCSF, 'https://www.ucsf.edu/'],
                  ['University of Toronto', logoUofT, 'https://www.utoronto.ca/'],
                ].map(([name, logo, href]) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noreferrer">
                      <img src={logo} alt={name} className="h-10" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="relative flex h-24 w-24 flex-none items-center justify-center">
              <DownloadBorder className="absolute inset-0 h-full w-full stroke-gray-300 transition-colors" />
              <CytoscapeLogo className="h-20" />
            </div>
            <div className="ml-8 lg:w-64">
              <p className="text-base font-semibold text-gray-900">
                <a href="#apps" className="cursor-pointer">
                  <span className="absolute inset-0 sm:rounded-2xl" />
                  Use Cytoscape
                </a>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Use Cytoscape to analyze and visualize the networks in your research.
              </p>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:items-start items-center border-t border-gray-200 pb-12 pt-8 lg:justify-between lg:pt-6 lg:space-x-10">
          <p className="mt-6 text-sm text-gray-500 lg:mt-0 max-w-3xl lg:text-left text-center">
            Funding for continued development and maintenance of Cytoscape is provided by the  
            U.S. <Link href="https://www.genome.gov/" target="_blank" rel="noreferrer" linkOut>National Human Genome Research Institute (NHGRI)</Link> under 
            award number NIH NHGRI U24 HG012107 (Previously: R01 HG009979; R01 GM070743).
            <br />
            Cytoscape user support, education and new initiatives are supported 
            by the <Link href="https://nrnb.org/" target="_blank" rel="noreferrer" linkOut>National Resource for Network Biology (NRNB)</Link> under 
            award number P41 GM103504.
            <br />
            The content is solely the responsibility of the authors and does not necessarily represent the official views of the National Institutes of Health.
          </p>
          <p className="mt-6 text-sm text-gray-500 lg:mt-0 flex-1 text-center lg:text-right whitespace-nowrap">
            &copy;{new Date().getFullYear()} <Link href="http://www.cytoscapeconsortium.org/" target="_blank" rel="noreferrer" linkOut>Cytoscape Consortium</Link>. 
            All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  </>)
}
