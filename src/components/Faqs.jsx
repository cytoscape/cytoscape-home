import clsx from 'clsx'
import { Container } from '@/components/base/Container'


const LinkOut = ({ href, ariaLabel='external link', children }) => (
  <a href={href} aria-label={ariaLabel} target="_blank" rel="noreferrer" className="text-gray-900 underline">
    {children}
  </a>
)

const Citation = ({ href, className, children }) => {
  className = clsx('block whitespace-pre-wrap text-xs', className)

  return (
    <code className={className}>
      <a href={href} target="_blank" rel="noreferrer" className="no-underline hover:text-complement-500">
        {children}
      </a>
    </code>
  )
}

const faqs = [
  [
    {
      question: 'What is the Cytoscape Ecosystem?',
      answer: <>
        The Cytoscape Ecosystem is a suite of software tools and resources designed for network biology analysis and visualisation.
        It includes the popular desktop application <LinkOut href="https://cytoscape.org/">Cytoscape</LinkOut>, 
        the web-based version of Cytoscape &#40;<LinkOut href="https://web.cytoscape.org/">Cytoscape Web</LinkOut>&#41;, 
        other web-based applications, and tools that extend Cytoscape&apos;s functionality and accessibility.
      </>,
    },
    {
      question: 'What are the key components of the Cytoscape Ecosystem?',
      answer: <>
        The key components of the Cytoscape Ecosystem are: 
        the <LinkOut href="https://cytoscape.org/">Cytoscape Desktop</LinkOut> and <LinkOut href="https://web.cytoscape.org/">Cytoscape Web</LinkOut> applications 
        for network analysis and visualization, and associated <LinkOut href="https://apps.cytoscape.org/">apps</LinkOut> that extend their functionality;&nbsp;
        <LinkOut href="https://www.ndexbio.org/">NDEx Cloud Storage</LinkOut> for accessing, sharing and publishing your network models; 
        web applications that extend Cytoscape&apos;s capabilities and cater to specific workflows &#40;<LinkOut href="https://enrichmentmap.org/">EnrichmentMap</LinkOut>&#41;; 
        web services for analysis or data storage functions &#40;<LinkOut href="https://genemania.org/">GeneMANIA</LinkOut>&#41;; 
        web UI components and web analysis libraries;&nbsp;
        <LinkOut href="https://automation.cytoscape.org/">interactive notebooks</LinkOut> offering flexible environments for computational biologists; 
        platforms for community contributions to network biology &#40;<LinkOut href="https://www.wikipathways.org/">WikiPathways</LinkOut>&#41;; 
        a JSON exchange format for network models &#40;<LinkOut href="https://cytoscape.org/cx/">CX2</LinkOut>&#41;; 
        and tools and training materials.
      </>,
    },
    {
      question: 'What are the main benefits of using the Cytoscape Ecosystem?',
      answer: <>
        The Cytoscape Ecosystem is a free, open-source comprehensive suite of software tools for network biology research, 
        encompassing data analysis, visualisation and sharing capabilities. 
        It is also extensible, meaning the user can customize their usage via <LinkOut href="https://apps.cytoscape.org/">apps</LinkOut> and services. 
        The Ecosystem is actively being developed to improve and expand functionality.
      </>,
    },
    {
      question: 'How does the Cytoscape Ecosystem support data sharing and collaboration?',
      answer: <>
        The Cytoscape Ecosystem supports data sharing and collaboration through cloud-based sharing and integration of networks, 
        seamless data exchange between Ecosystem tools and through various training materials.
      </>,
    },
  ],
  [
    {
      question: 'How is the Cytoscape Ecosystem addressing the needs of bench biologists?',
      answer: <>
        The Cytoscape ecosystem caters to bench biologists by streamlining common workflows through user-friendly web applications, 
        providing comprehensive training materials, and facilitating access to pre-analysed data and networks. 
        By reducing the need for complex data processing and analysis and minimizing the need for programmatic knowledge, 
        the Cytoscape ecosystem provides easy access to powerful analysis tools for bench biologists.
      </>,
    },
    {
      question: 'What are the future directions for the Cytoscape Ecosystem?',
      answer: <>
        The Cytoscape Ecosystem is evolving towards expanding web-based functionality to support a wider range of user needs; 
        improving integration with other analysis tools and resources; 
        and adding support for emerging technologies and analysis types, like single-cell analysis and machine learning.
      </>,
    },
    {
      question: 'Should I use Cytoscape Desktop or Cytoscape Web?',
      answer: <>
        The best choice for you depends on your individual analysis needs. 
        If you are working with large networks, need to be able to work offline, or need access to specific apps to support your analysis, 
        you should use <LinkOut href="https://cytoscape.org/">Cytoscape Desktop</LinkOut>. 
        If you are looking for core Cytoscape functionality in an easy-to-use web tool, you should use <LinkOut href="https://web.cytoscape.org/">Cytoscape Web</LinkOut>. 
        Additionally, the Cytoscape ecosystem enables integration between Cytoscape Desktop and Cytoscape Web, 
        letting you switch between the two applications seamlessly.
      </>,
    },
    {
      question: 'How can I use the Cytoscape tools to create figures and support data for my paper?',
      answer: <>
        Both <LinkOut href="https://cytoscape.org/">Cytoscape Desktop</LinkOut> and <LinkOut href="https://web.cytoscape.org/">Cytoscape Web</LinkOut> support 
        export of high-resolution images &#40;PNG, PDF, etc&#41; from your analysis. 
        Network figure exports are highly customizable in terms of style and layout. 
        Other ecosystem web applications &#40;<LinkOut href="https://genemania.org/">GeneMANIA</LinkOut>, <LinkOut href="https://iregulon.org/">iRegulon</LinkOut>&#41; 
        also support direct export of images, or you can open your network in Cytoscape Web to further customize and improve it before exporting.
      </>,
    },
  ],
  [
    {
      question: 'Can I save my work in the cloud?',
      answer: <>
        Yes. Cytoscape Desktop, Cytoscape Web and several ecosystem web applications allow you to save your networks and analysis 
        to the Network Data Exchange &#40;<LinkOut href="https://www.ndexbio.org/">NDEx</LinkOut>&#41;, the primary cloud storage for the Cytoscape Ecosystem.
      </>,
    },
    {
      question: 'How can I contribute to the Cytoscape Ecosystem?',
      answer: <>
        You can contribute in a number of ways, for example by developing apps or web services that extend the functionality of ecosystem tools 
        with specialized analysis or access to data resources. 
        You can also contribute by creating and sharing interactive workflow notebooks in Jupyter/R, and in general by providing feedback and bug reports.
      </>,
    },
    {
      question: 'How do I cite Cytoscape?',
      answer: <>
        For <i>Cytoscape Desktop</i>, please cite:
        <Citation href="https://doi.org/10.1101/gr.1239303" className="my-2 pl-4">
          Shannon P, Markiel A, Ozier O, Baliga NS, Wang JT, Ramage D, Amin N, Schwikowski B, Ideker T. <i>Cytoscape: a software environment for integrated models of biomolecular interaction networks.</i> Genome Research. 2003 Nov; 13(11):2498-504.
        </Citation>
        For <i>Cytoscape Web</i>, please cite:
        <Citation href="https://doi.org/10.1093/nar/gkaf365" className="mt-2 pl-4">
          Ono K, Fong D, Gao C, Churas C, Pillich R, Lenkiewicz J, Pratt D, Pico AR, Hanspers K, Xin Y, Morris J, Kucera M, Franz M, Lopes C, Bader G, Ideker T, Chen J. <i>Cytoscape Web: bringing network biology to the browser.</i> Nucleic Acids Res. 2025 Jul 7; 53(W1):W203-W212.
        </Citation>
      </>,
    },
    {
      question: 'How to donate to Cytoscape?',
      answer: <>
        To support the Cytoscape Ecosystem, please donate to the Cytoscape Consortium:
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="text-center">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="4D6STRT24649Y" />
          <input type="submit" value="Donate" alt="PayPal - The safer, easier way to pay online!" className="mt-2 px-8 py-1 border-2 border-white bg-[#ffd140] hover:bg-[#ffe788] active:bg-[#e6d07a] text-[#003087] hover:text-[#0070e0] active:text-white font-bold rounded-full drop-shadow-md cursor-pointer" />
        </form>
      </>,
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-600">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
