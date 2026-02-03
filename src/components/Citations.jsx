'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'
import { Container } from '@/components/base/Container'

const citations = [
  {
    title: 'PLOS ONE, 2022',
    body: 'Identification of hub genes associated with COVID-19 and idiopathic pulmonary fibrosis by integrated bioinformatics analysis',
    author: 'Qianyi Chen, et al.',
    doi: 'https://doi.org/10.1371/journal.pone.0262737',
    image: 'journal.pone.0262737.png',
  },
  {
    title: 'J. Cellular Biochemistry, 2018',
    body: 'Reconstruction and analysis of the aberrant lncRNA‐miRNA‐mRNA network based on competitive endogenous RNA in CESC',
    author: 'Jukun Song, et al.',
    doi: 'https://doi.org/10.1002%2Fjcb.26850',
    image: 'jcb.26850.png',
  },
  {
    title: 'Genome Biology, 2019',
    body: 'Cytoscape Automation: empowering workflow-based network analysis',
    author: 'David Otasek, et al.',
    doi: 'https://doi.org/10.1186/s13059-019-1758-4',
    image: 's13059-019-1758-4.png',
  },
  {
    title: 'BioData Mining, 2016',
    body: 'Building a glaucoma interaction network using a text mining approach',
    author: 'Maha Soliman, et al.',
    doi: 'https://doi.org/10.1186%2Fs13040-016-0096-2',
    image: 's13040-016-0096-2.png',
  },
  {
    title: 'Laboratory Investigation, 2008',
    body: 'The fibromatosis signature defines a robust stromal response in breast carcinoma',
    author: 'Andrew H Beck, et al.',
    doi: 'https://doi.org/10.1038%2Flabinvest.2008.31',
    image: 'labinvest.2008.31.png',
  },
  {
    title: 'BMC Bioinformatics, 2013',
    body: 'Visualization of protein interaction networks: problems and solutions',
    author: 'Giuseppe Agapito, et al.',
    doi: 'https://doi.org/10.1186%2F1471-2105-14-S1-S1',
    image: '1471-2105-14-S1-S1.png',
  },
  {
    title: 'Human Genomics, 2022',
    body: 'Construction of the coexpression network involved in the pathogenesis of thyroid eye disease via bioinformatics analysis',
    author: 'Jinxing Hu, et al.',
    doi: 'https://doi.org/10.1186%2Fs40246-022-00412-0',
    image: 's40246-022-00412-0.png',
  },
  {
    title: 'Frontiers Bioeng. Biotechnol., 2020',
    body: 'A Guide to Conquer the Biological Network Era Using Graph Theory',
    author: 'Mikaela Koutrouli, et al.',
    doi: 'https://doi.org/10.3389%2Ffbioe.2020.00034',
    image: 'fbioe.2020.00034.png',
  },
  {
    title: 'World Journal of Transplantation, 2016',
    body: 'Proteomics for rejection diagnosis in renal transplant patients: Where are we now?',
    author: 'Wilfried Gwinner, et al.',
    doi: 'https://doi.org/10.5500%2Fwjt.v6.i1.28',
    image: 'wjt.v6.i1.28.png',
  },
  {
    title: 'Biochem. Biophys. Rep., 2021',
    body: 'Gene expression analysis of human induced pluripotent stem cells cryopreserved by vitrification using StemCell Keep',
    author: 'Akemi Ota, et al.',
    doi: 'https://doi.org/10.1016%2Fj.bbrep.2021.101172',
    image: 'j.bbrep.2021.101172.png',
  },
  {
    title: 'F1000Research, 2021',
    body: 'scNetViz: from single cells to networks using Cytoscape',
    author: 'Krishna Choudhary, et al.',
    doi: 'https://doi.org/10.12688%2Ff1000research.52460.1',
    image: 'f1000research.52460.1.png',
  },
  {
    title: 'Scientific Data, 2020',
    body: 'Consensus transcriptional regulatory networks of coronavirus-infected human cells',
    author: 'Scott A. Ochsner, et al.',
    doi: 'https://doi.org/10.1038%2Fs41597-020-00628-6',
    image: 's41597-020-00628-6.png',
  },
  {
    title: 'Frontiers in Genetics, 2019',
    body: 'Beyond Pathway Analysis: Identification of Active Subnetworks in Rett Syndrome',
    author: 'Ryan A. Miller, et al.',
    doi: 'https://doi.org/10.3389%2Ffgene.2019.00059',
    image: 'fgene.2019.00059.png',
  },
  {
    title: 'Metabolites, 2021',
    body: 'Gut Microbiota Dysbiosis Is Associated with Elevated Bile Acids in Parkinson’s Disease',
    author: 'Peipei Li, et al.',
    doi: 'https://doi.org/10.3390%2Fmetabo11010029',
    image: 'metabo11010029.png',
  },
]

function Citation({ title, body, author, doi, image, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <a href={doi} target="_blank" rel="noreferrer" className="p-2">
      <figure
        className={clsx(
          'group flex flex-row space-x-4 animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5 hover:shadow-xl',
          className,
        )}
        style={{ animationDelay }}
        {...props}
      >
        <img
          className="max-w-36 object-contain grayscale-[75%] group-hover:grayscale-0"
          src={'/images/publications/' + image}
        />
        <div>
          <blockquote className="text-gray-900">
            <p className="mt-4 text-xs font-semibold leading-6">
              {title}
            </p>
            <p className="mt-3 text-sm leading-7">{body}</p>
          </blockquote>
          <figcaption className="mt-3 text-xs text-gray-600 before:content-['–_']">
            {author}
          </figcaption>
        </div>
      </figure>
    </a>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function CitationColumn({ citations, className, citationClassName, msPerPixel = 0 }) {
  let columnRef = useRef(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {citations.concat(citations).map((citation, index) => (
        <Citation
          key={citation.doi + '-' + index}
          aria-hidden={index >= citations.length}
          className={citationClassName?.(index % citations.length)}
          {...citation}
        />
      ))}
    </div>
  )
}

function CitationGrid() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.4 })
  const columns = splitArray(citations, 2)
  const column1 = columns[0]
  const column2 = columns[1]

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 lg:grid-cols-2"
    >
      {isInView && (
        <>
          <CitationColumn
            citations={[...column1, ...column2]}
            citationClassName={(citationIndex) => clsx(citationIndex >= column1.length && 'md:hidden')}
            msPerPixel={15}
          />
          <CitationColumn
            citations={column2}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Citations() {
  return (
    <section
      id="citations"
      aria-labelledby="citations-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="citations-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Many publications are citing Cytoscape
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Thousands of{' '}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/?term=(cytoscape+OR+ndex+OR+genemania+OR+stringapp+OR+enrichmentmap+OR+wikipathways)"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            researchers
          </a>
          {' '}have used Cytoscape tools and resources.
        </p>
        <CitationGrid />
      </Container>
    </section>
  )
}
