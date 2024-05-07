import { useState } from 'react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { SelectMenu } from '@/components/SelectMenu'
import { CytoscapeLogomark } from '@/components/Logo'
import { ArrowTopRightOnSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const defGeneManiaOrgIdx = 5;
const geneManiaOrgs = [
  {
    id: 'arabidopsis-thaliana',
    name: 'Arabidopsis thaliana',
    image: '/images/organisms/plant-32.svg',
  },
  {
    id: 'caenorhabditis-elegans',
    name: 'Caenorhabditis elegans',
    image: '/images/organisms/worm-32.svg',
  },
  {
    id: 'danio-rerio',
    name: 'Danio rerio',
    image: '/images/organisms/fish-32.svg',
  },
  {
    id: 'drosophila-melanogaster',
    name: 'Drosophila melanogaster',
    image: '/images/organisms/fly-32.svg',
  },
  {
    id: 'escherichia-coli',
    name: 'Escherichia coli',
    image: '/images/organisms/bacteria-32.svg',
  },
  {
    id: 'homo-sapiens',
    name: 'Homo sapiens',
    image: '/images/organisms/human-32.svg',
  },
  {
    id: 'mus-musculus',
    name: 'Mus musculus',
    image: '/images/organisms/mouse-32.svg',
  },
  {
    id: 'rattus-norvegicus',
    name: 'Rattus norvegicus',
    image: '/images/organisms/rat-32.svg',
  },
  {
    id: 'saccharomyces-cerevisiae',
    name: 'Saccharomyces cerevisiae',
    image: '/images/organisms/yeast-32.svg',
  },
]

const parseGeneList = (text) => {
  if (text.length > 0) {
    let parts = text.split(/[\s,]+/);
    return parts.filter(el => el.length > 0);
  }
  return [];
}

const searchNDEx = (evt) =>  {
  const val = evt.target.elements.search.value.trim();
  if (val.length > 0) {
    const parts = parseGeneList(val);
    if (parts.length > 0) {
      const genes = parts.join('%2C');
      const url = `https://www.ndexbio.org/iquery/?genes=${genes}`;
      window.open(url, '_blank').focus();
    }
  }
  evt.preventDefault();
}

const searchGeneMania = (orgId, searchText) =>  {
  if (orgId && searchText && searchText.length > 0) {
    const parts = parseGeneList(searchText);
    if (parts.length > 0) {
      const genes = parts.join('/');
      const url = `https://genemania.org/search/${orgId}/${genes}`;
      window.open(url, '_blank').focus();
    }
  }
}

const searchWikiPathways = (evt) =>  {
  const val = evt.target.elements.search.value.trim();
  if (val.length > 0) {
    const parts = parseGeneList(val);
    if (parts.length > 0) {
      const genes = parts.join('%20');
      const url = `https://www.wikipathways.org/search.html?query=${genes}`;
      window.open(url, '_blank').focus();
    }
  }
  evt.preventDefault();
}

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
  const [selGeneManiaOrg, setSelGeneManiaOrg ] = useState(geneManiaOrgs[defGeneManiaOrgIdx])

  const onSubmit = (evt) => {
    const searchVal = evt.target.elements.search.value.trim();
    searchGeneMania(selGeneManiaOrg.id, searchVal)
    evt.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <SelectMenu data={geneManiaOrgs} selectedIndex={defGeneManiaOrgIdx} onChange={setSelGeneManiaOrg}  className="min-w-64" />
      <SearchField />
    </form>
  )
}

const features = [
  {
    name: 'NDEx IQuery',
    description: 'One search finds a variety of pathways and interaction networks relevant to your set of genes.',
    href: 'https://www.ndexbio.org/iquery/',
    icon: NDExIcon,
    form: <form onSubmit={searchNDEx} className="w-full"><SearchField placeholder="e.g. APAF1 BCL2 BID" /></form>
  },
  {
    name: 'GeneMANIA',
    description: 'GeneMANIA helps you predict the function of your favourite genes and gene sets.',
    href: 'https://genemania.org/',
    icon: GeneManiaIcon,
    form: <GeneManiaForm />,
  },
  {
    name: 'EnrichmentMap',
    description: 'Perform gene set enrichment analysis on a gene list then visualize the results as a network.',
    href: 'https://enrichmentmap.org/',
    icon: EnrichmentMapIcon,
    form: <div className="flex w-full justify-center">
        <Button type="submit" href="https://enrichmentmap.org/" target="_blank" rel="noreferrer"  className="mt-4">
          Go to EnrichmentMap
          <ArrowTopRightOnSquareIcon className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>,
  },
  {
    name: 'WikiPathways',
    description: 'Discover pathways of interest by organism, communities of domain experts, and ontology annotations.',
    href: 'https://www.wikipathways.org/',
    icon: WikiPathwaysIcon,
    form: <form onSubmit={searchWikiPathways} className="flex w-full justify-center md:w-auto"><SearchField placeholder="e.g. ace2 aldosterone human" /></form>
    ,
  },
  {
    name: 'Cytoscape Web',
    description: 'Create interactive networks from your data directly on the web, analyze and then export the results.',
    href: 'https://web-stage.cytoscape.org/', // TODO: replace with prod URL when available!!!
    icon: CytoscapeWebIcon,
    form: <div className="flex w-full justify-center">
        <Button type="submit" href="https://web-stage.cytoscape.org/" target="_blank" rel="noreferrer"  className="mt-4">
          Go to Cytoscape Web
          <ArrowTopRightOnSquareIcon className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>,
  },
  {
    name: 'Cytoscape ',
    description: <>
        Open source <Link href="https://cytoscape.org/download.html" ariaLabel="Download Cytoscape">software</Link> platform 
        for visualizing complex networks and integrating these with any type of attribute data.<br /><br />
        Customize it through the use of <Link href="https://apps.cytoscape.org/" ariaLabel="Cytoscape App Store">app extensions</Link>.
      </>,
    href: 'https://cytoscape.org/',
    icon: CytoscapeLogomark,
  },
]

function NDExIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.385,17.995 C30.118,18.255 29.839,18.493 29.547,18.71 C29.255,18.927 28.967,19.125 28.682,19.306 C27.783,19.785 26.918,20.344 25.987,20.745 C25.687,20.875 25.381,21.009 25.07,21.145 C24.76,21.282 24.451,21.41 24.144,21.529 C23.837,21.648 23.528,21.776 23.218,21.914 C22.591,22.13 21.969,22.342 21.351,22.551 C20.735,22.76 20.106,22.962 19.467,23.156 C19.151,23.235 18.84,23.325 18.537,23.426 C17.618,23.731 16.623,23.998 15.679,24.193 C15.402,24.243 15.142,24.18 14.898,24.002 C14.656,23.824 14.513,23.58 14.471,23.269 C14.429,22.958 14.48,22.663 14.624,22.385 C14.853,21.945 15.36,21.843 15.78,21.784 C16.537,21.677 17.33,21.42 18.08,21.245 C18.386,21.173 18.697,21.097 19.014,21.018 C19.634,20.838 20.249,20.662 20.859,20.489 C21.47,20.316 22.079,20.129 22.686,19.928 C23.293,19.726 23.897,19.519 24.498,19.306 C25.664,18.892 26.853,18.382 27.943,17.754 C28.777,17.269 30.03,16.542 30.41,15.457 C31.436,11.473 18.639,11.752 19.443,11.505 C22.638,11.264 27.067,10.721 30.149,12.43 C30.239,12.487 30.32,12.543 30.393,12.598 C30.467,12.652 30.549,12.709 30.639,12.767 C32.632,14.206 31.833,16.606 30.385,17.995 z"
        fill="#00a1de"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.615,14.515 C0.167,15.904 -0.632,18.304 1.362,19.744 C1.451,19.801 1.533,19.858 1.607,19.912 C1.68,19.967 1.762,20.023 1.851,20.08 C4.933,21.789 9.362,21.246 12.557,21.005 C13.361,20.758 0.564,21.038 1.59,17.053 C1.97,15.968 3.224,15.241 4.057,14.757 C5.147,14.128 6.335,13.618 7.501,13.204 C8.103,12.991 8.707,12.785 9.314,12.583 C9.921,12.381 10.531,12.194 11.141,12.022 C11.751,11.848 12.366,11.672 12.986,11.492 C13.302,11.413 13.614,11.337 13.921,11.265 C14.67,11.09 15.463,10.833 16.22,10.726 C16.64,10.667 17.147,10.565 17.376,10.125 C17.52,9.847 17.572,9.552 17.529,9.241 C17.487,8.93 17.344,8.686 17.102,8.508 C16.858,8.331 16.598,8.268 16.321,8.318 C15.377,8.512 14.382,8.779 13.463,9.084 C13.159,9.185 12.85,9.275 12.533,9.354 C11.894,9.548 11.265,9.751 10.649,9.959 C10.031,10.168 9.409,10.381 8.783,10.597 C8.472,10.734 8.163,10.862 7.856,10.981 C7.549,11.1 7.24,11.228 6.93,11.365 C6.619,11.502 6.314,11.636 6.014,11.765 C5.082,12.166 4.218,12.725 3.318,13.205 C3.033,13.385 2.745,13.583 2.453,13.8 C2.161,14.017 1.882,14.255 1.615,14.515 z"
        fill="#00a1de"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.695,7 C20.529,7.18 21.005,7.781 21.111,8.6 C21.194,9.586 20.548,10.467 19.67,10.569 C19.427,10.598 19.191,10.563 18.976,10.477 L16.58,15.12 C16.672,15.22 16.746,15.342 16.793,15.48 L18.63,15.121 C18.648,14.674 18.954,14.296 19.364,14.249 C19.809,14.197 20.205,14.56 20.246,15.06 C20.288,15.56 19.961,16.008 19.515,16.059 C19.135,16.104 18.792,15.846 18.673,15.459 L16.853,15.815 C16.863,16.16 16.717,16.477 16.483,16.673 L17.135,18.356 C17.579,18.235 18.39,18.726 18.446,19.4 C18.501,20.06 18.069,20.651 17.48,20.72 C16.891,20.788 16.361,20.206 16.314,19.648 C16.267,19.09 16.469,18.77 16.786,18.529 L16.136,16.852 C16.102,16.861 16.066,16.867 16.031,16.871 C15.926,16.884 15.823,16.875 15.727,16.849 L13.348,21.702 C13.71,21.994 13.962,22.455 14.007,22.994 C14.09,23.993 13.436,24.887 12.546,24.99 C11.656,25.094 10.866,24.368 10.782,23.369 C10.699,22.37 11.353,21.477 12.243,21.373 C12.465,21.347 12.682,21.373 12.882,21.442 L15.277,16.555 C15.183,16.441 15.112,16.302 15.072,16.147 L13.649,16.426 C13.648,16.795 13.396,17.114 13.062,17.153 C12.706,17.195 12.39,16.904 12.357,16.505 C12.323,16.105 12.585,15.748 12.941,15.706 C13.248,15.67 13.525,15.881 13.617,16.196 L15.038,15.918 L15.038,15.919 C15.03,15.73 15.068,15.549 15.142,15.391 L13.669,14.221 C13.539,14.366 13.366,14.463 13.17,14.486 C12.717,14.539 12.316,14.17 12.274,13.662 C12.231,13.155 12.564,12.701 13.016,12.648 C13.468,12.595 13.87,12.964 13.912,13.472 C13.927,13.646 13.897,13.814 13.834,13.961 L15.311,15.135 C15.412,15.022 15.537,14.935 15.678,14.885 L15.452,13.34 C14.976,13.361 14.566,12.966 14.521,12.426 C14.474,11.866 14.841,11.365 15.34,11.306 C15.84,11.248 16.283,11.655 16.329,12.216 C16.368,12.681 16.121,13.106 15.75,13.27 L15.981,14.837 C16.027,14.838 16.073,14.844 16.117,14.853 L18.521,10.195 C18.195,9.905 17.972,9.472 17.93,8.97 C17.847,7.985 18.493,7.103 19.371,7.001 L19.695,7 z M12.521,21.889 L12.287,21.89 C11.65,21.964 11.183,22.602 11.243,23.315 C11.303,24.029 11.867,24.548 12.503,24.474 C13.139,24.4 13.606,23.761 13.546,23.048 C13.441,22.448 13.142,22.022 12.521,21.889 z M17.463,18.669 L17.308,18.669 C16.888,18.718 16.578,19.141 16.618,19.613 C16.658,20.084 17.031,20.427 17.452,20.378 C17.872,20.329 18.181,19.907 18.142,19.435 C18.072,19.039 17.874,18.757 17.463,18.669 z M13.052,15.912 L12.958,15.913 C12.704,15.942 12.517,16.198 12.541,16.483 C12.565,16.769 12.791,16.976 13.045,16.947 C13.299,16.917 13.486,16.662 13.463,16.376 C13.42,16.136 13.301,15.966 13.052,15.912 z M16.016,15.132 L15.885,15.132 C15.528,15.174 15.266,15.532 15.3,15.932 C15.333,16.332 15.65,16.623 16.006,16.582 C16.363,16.54 16.625,16.182 16.592,15.782 C16.533,15.445 16.365,15.206 16.016,15.132 z M19.502,14.507 L19.385,14.508 C19.067,14.545 18.833,14.864 18.863,15.221 C18.893,15.578 19.175,15.838 19.494,15.801 C19.812,15.764 20.046,15.444 20.016,15.087 C19.963,14.787 19.813,14.574 19.502,14.507 z M13.157,12.91 L13.038,12.91 C12.715,12.948 12.477,13.273 12.508,13.635 C12.538,13.998 12.825,14.261 13.148,14.224 C13.471,14.186 13.709,13.862 13.678,13.499 C13.625,13.194 13.472,12.978 13.157,12.91 z M15.496,11.596 L15.364,11.596 C15.008,11.637 14.745,11.996 14.779,12.396 C14.812,12.796 15.129,13.087 15.486,13.046 C15.842,13.004 16.105,12.646 16.071,12.246 C16.012,11.909 15.844,11.67 15.496,11.596 z M19.645,7.51 L19.414,7.511 C18.787,7.584 18.326,8.214 18.385,8.917 C18.443,9.621 19,10.133 19.627,10.06 C20.255,9.987 20.716,9.357 20.657,8.653 C20.553,8.062 20.257,7.641 19.645,7.51 z"
        fill="#00a1de"
      />
    </svg>
  )
}

function GeneManiaIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.774,1 C21.322,1.016 26.534,4.704 29.056,10.682 C31.977,18.726 27.492,27.819 19.369,30.725 C18.625,30.991 17.807,30.604 17.541,29.86 C17.275,29.116 17.662,28.298 18.406,28.032 C25.059,25.652 28.74,18.189 26.368,11.659 C24.185,5.652 17.426,2.347 11.546,4.522 C6.184,6.505 3.256,12.559 5.233,17.79 C7.014,22.506 12.364,25.06 16.945,23.283 C21.017,21.702 23.198,17.058 21.621,13.127 C20.247,9.698 16.308,7.89 13.028,9.263 C10.239,10.43 8.801,13.661 9.965,16.289 C10.919,18.438 13.443,19.513 15.416,18.564 C16.932,17.833 17.649,16.023 16.93,14.705 C16.352,13.831 15.944,13.686 14.953,13.767 C15.882,14.267 15.579,13.923 15.983,14.678 C16.361,15.942 15.53,16.921 14.398,17.061 C13.74,17.143 12.983,16.955 12.486,16.526 C10.847,15.107 11.454,12.646 13.095,11.525 C15.263,10.047 18.202,11.064 19.44,13.335 C20.988,16.17 19.576,19.734 16.657,21.141 C13.166,22.82 8.934,21.017 7.351,17.448 C5.514,13.305 7.702,8.391 11.924,6.625 C16.718,4.618 22.323,7.191 24.276,12.063 C26.459,17.507 23.502,23.805 17.979,25.949 C11.885,28.313 4.889,24.973 2.557,18.801 C0.008,12.057 3.73,4.364 10.554,1.84 C12.858,1.125 11.468,1.476 14.774,1 z"
        fill="#000000"
      />
    </svg>
  )
}

function EnrichmentMapIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-0,7.607 L32,7.607 L32,24.393 L-0,24.393 L-0,7.607 z"
        fill="#ffffff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16,8.393 L16,12.385 L9.138,12.385 L9.138,14.073 L16,14.073 L16,17.859 L9.138,17.859 L9.138,19.615 L16,19.615 L16,23.607 L0.787,23.607 L0.787,8.393 L16,8.393 z"
        fill="#1f78b4"/>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.213,23.607 L27.222,23.607 L27.222,16.745 L25.534,16.745 L25.534,23.607 L21.748,23.607 L21.748,16.745 L19.991,16.745 L19.991,23.607 L16,23.607 L16,8.393 L31.213,8.393 L31.213,23.607 z"
        fill="#33a02c"
      />
    </svg>
  )
}

function WikiPathwaysIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.968,11.625 L6.968,14.698 L5.955,14.698 L7.365,17.831 L8.741,14.698 L7.728,14.698 L7.728,11.625 L6.968,11.625 z M23.527,17.311 C24.038,17.289 24.444,16.869 24.447,16.357 C24.447,15.83 24.02,15.403 23.493,15.403 C22.966,15.403 22.539,15.83 22.539,16.357 C22.539,16.884 22.966,17.311 23.493,17.311 z M21.433,11.105 L25.579,11.105 L25.579,9.948 L21.399,9.948 z M13.8,6.165 C13.8,5.911 13.698,5.667 13.518,5.488 C13.337,5.309 13.092,5.21 12.837,5.211 C12.447,5.211 12.096,5.447 11.947,5.807 C11.799,6.169 11.883,6.583 12.16,6.858 C12.437,7.132 12.852,7.212 13.212,7.061 C13.571,6.909 13.803,6.555 13.8,6.165 z M7.729,27.047 C9.148,28.098 10.752,28.872 12.457,29.326 L12.457,26.371 C11.525,26.371 10.769,25.615 10.769,24.682 C10.769,23.75 11.525,22.994 12.457,22.994 L12.457,19.827 L10.194,19.827 L10.194,20.41 C10.194,20.62 10.024,20.79 9.814,20.79 L7.729,20.79 z M5.255,20.03 L9.476,20.03 L9.476,18.865 L5.255,18.865 z M13.8,24.682 C13.795,24.155 13.366,23.729 12.837,23.729 C12.447,23.729 12.096,23.964 11.947,24.324 C11.799,24.686 11.883,25.101 12.16,25.375 C12.437,25.649 12.852,25.729 13.212,25.578 C13.571,25.427 13.803,25.073 13.8,24.682 z M26.601,14.964 L29.742,16.374 L26.601,17.75 L26.601,16.737 L25.224,16.737 C25.224,17.67 24.468,18.426 23.535,18.426 C22.603,18.426 21.847,17.67 21.847,16.737 L19.448,16.737 L19.448,15.977 L21.847,15.977 C21.987,15.331 22.493,14.826 23.139,14.685 L23.139,11.873 L21.07,11.873 C20.859,11.869 20.69,11.697 20.69,11.485 L20.69,10.911 L13.8,10.911 L13.8,10.142 L20.673,10.142 L20.673,9.56 C20.673,9.35 20.844,9.18 21.053,9.18 L25.993,9.18 C26.205,9.18 26.377,9.349 26.381,9.56 L26.381,10.142 L28.83,10.142 C27.015,6 23.298,2.998 18.866,2.096 L18.866,9.56 L18.106,9.56 L18.106,1.96 C17.416,1.859 16.719,1.808 16.021,1.808 C15.082,1.807 14.146,1.9 13.226,2.087 L13.226,4.46 C14.158,4.46 14.914,5.216 14.914,6.148 C14.914,7.082 14.158,7.837 13.226,7.837 L13.226,15.977 L17.515,15.977 L17.515,16.737 L12.837,16.737 C12.628,16.737 12.457,16.567 12.457,16.357 L12.457,7.871 C11.525,7.871 10.769,7.115 10.769,6.182 C10.769,5.25 11.525,4.494 12.457,4.494 L12.457,2.264 C10.751,2.717 9.146,3.49 7.729,4.544 L7.729,9.56 L6.96,9.56 L6.96,5.152 C5.359,6.517 4.084,8.221 3.228,10.142 L11.875,10.142 L11.875,10.911 L2.958,10.911 C0.897,16.413 2.496,22.618 6.96,26.439 L6.96,20.79 L4.875,20.79 C4.664,20.79 4.491,20.621 4.486,20.41 L4.486,18.485 C4.491,18.274 4.664,18.105 4.875,18.105 L9.814,18.105 C10.024,18.105 10.194,18.275 10.194,18.485 L10.194,19.067 L12.837,19.067 C13.049,19.067 13.221,19.236 13.226,19.448 L13.226,22.994 C13.863,23.146 14.361,23.641 14.517,24.277 L18.072,24.277 L18.072,11.485 L18.832,11.485 L18.832,24.699 C18.832,24.91 18.663,25.08 18.452,25.08 L14.484,25.08 C14.333,25.72 13.833,26.22 13.192,26.371 L13.192,29.538 C14.112,29.725 15.049,29.819 15.987,29.816 C16.468,29.816 16.873,29.749 17.312,29.749 L17.118,28.71 L20.496,29.462 L17.701,31.438 L17.507,30.517 C17.014,30.568 16.517,30.593 16.021,30.593 C8.589,30.583 2.323,25.049 1.396,17.675 C0.469,10.301 5.169,3.388 12.368,1.538 C19.566,-0.311 27.017,3.48 29.758,10.387 C29.801,10.506 29.785,10.637 29.716,10.742 C29.647,10.847 29.529,10.91 29.404,10.911 L26.381,10.911 L26.381,11.485 C26.377,11.698 26.205,11.869 25.993,11.873 L23.907,11.873 L23.907,14.685 C24.554,14.826 25.059,15.331 25.199,15.977 L26.601,15.977 z"
        fill="#000000"
      />
    </svg>
  )
}

function CytoscapeWebIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.013,0 C25.89,-0 28.224,2.333 28.224,5.21 C28.209,7.495 26.637,9.691 24.372,10.237 L23.507,13.09 C24.571,14.166 25.069,15.51 25.116,17.007 C25.109,18.167 24.758,19.31 24.073,20.25 L24.752,21.603 C27.496,21.851 29.45,24.068 29.518,26.79 C29.518,29.667 27.185,32 24.308,32 C21.431,32 19.097,29.667 19.097,26.79 C19.112,25.872 19.327,24.928 19.822,24.144 L19.04,22.582 C18.502,22.547 17.974,22.413 17.474,22.217 L16.931,22.694 C16.738,24.641 15.084,26.011 13.173,26.059 C11.083,26.059 9.387,24.363 9.387,22.273 C9.405,21.353 9.718,20.379 10.382,19.715 C9.579,20.241 8.639,20.444 7.692,20.477 C4.815,20.477 2.482,18.143 2.482,15.266 C2.508,12.872 4.021,10.956 6.283,10.253 C5.954,9.572 5.824,8.83 5.805,8.08 C5.805,5.203 8.138,2.869 11.015,2.869 C12.418,2.88 13.586,3.386 14.613,4.322 L18.115,3.439 C18.804,1.353 20.878,0.049 23.013,0 z M23.013,1.557 C21.167,1.557 19.631,2.931 19.392,4.723 L14.064,6.067 C13.393,5.051 12.253,4.427 11.015,4.427 C8.998,4.427 7.362,6.063 7.362,8.08 C7.362,10.097 8.998,11.733 11.015,11.733 C11.517,11.733 12.011,11.631 12.468,11.433 L15.991,15.031 C15.958,15.091 15.925,15.152 15.895,15.214 L11.283,14.592 C10.966,12.886 9.467,11.613 7.692,11.613 C5.675,11.613 4.039,13.249 4.039,15.266 C4.039,17.283 5.675,18.92 7.692,18.92 C9.048,18.92 10.279,18.17 10.91,16.997 L15.522,17.619 C15.564,17.895 15.635,18.167 15.733,18.429 L13.798,20.133 C13.596,20.074 13.386,20.043 13.173,20.043 C11.942,20.043 10.944,21.042 10.944,22.273 C10.944,23.503 11.942,24.502 13.173,24.502 C14.404,24.502 15.402,23.503 15.402,22.273 C15.402,22.175 15.396,22.079 15.383,21.983 L17.241,20.347 C17.909,20.804 18.699,21.049 19.517,21.049 C19.678,21.049 19.839,21.04 19.999,21.021 L21.639,24.295 C21.009,24.968 20.654,25.855 20.654,26.79 C20.654,28.807 22.291,30.443 24.308,30.443 C26.325,30.443 27.961,28.807 27.961,26.79 C27.961,24.772 26.325,23.136 24.308,23.136 C24.136,23.136 23.965,23.148 23.796,23.172 L22.215,20.017 C23.066,19.255 23.559,18.166 23.559,17.007 C23.559,15.627 22.857,14.357 21.719,13.618 L23.163,8.861 C25.111,8.782 26.666,7.178 26.666,5.21 C26.666,3.193 25.03,1.557 23.013,1.557 z M19.903,7.127 C20.147,7.523 20.465,7.869 20.839,8.146 L19.376,12.968 C18.815,12.987 18.268,13.122 17.765,13.364 L14.251,9.776 C14.468,9.364 14.603,8.916 14.65,8.452 L19.903,7.127 z M18.962,8.97 L16.299,9.642 L18.176,11.558 L18.962,8.97 z M11.635,18.666 L11.36,18.953 C11.535,18.852 11.718,18.764 11.911,18.704 L11.635,18.666 z"
        fill="#ea9122"
      />
    </svg>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id="tools"
      aria-label="Tools available from the Cytoscape ecosystem"
      className="py-20 sm:py-32"
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
              className="min-h-64 rounded-2xl border border-gray-200 p-4 lg:p-8 xs:min-h-52"
            >
              <div className="flex items-center">
                <feature.icon className="h-8 w-8" />
                <a href={feature.href} target="_blank" rel="noreferrer" className="flex items-center group">
                  <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">
                    {feature.name}
                  </h3>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 fill-gray-500 group-hover:fill-complement-500" />
                </a>
              </div>
              <p className="mt-2 text-gray-600">{feature.description}</p>
              <div className="mt-6">
                {feature.form}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
