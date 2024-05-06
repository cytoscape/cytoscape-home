import { Container } from '@/components/Container'
import { ArrowTopRightOnSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const searchNDEx = (evt) =>  {
  const val = evt.target.elements.search.value.trim();
  if (val.length > 0) {
    const parts = val.split(/[\s,]+/);
    const genes = parts.join('%2C');
    const url = `https://www.ndexbio.org/iquery/?genes=${genes}`;
    window.open(url, '_blank').focus();
  }
  evt.preventDefault();
}

const features = [
  {
    name: 'NDEx Integrated Query',
    description: 'One search finds a variety of pathways and interaction networks relevant to your set of genes.',
    href: 'https://www.ndexbio.org/iquery/',
    icon: NDExIcon,
    form: <form onSubmit={searchNDEx} className="flex w-full justify-center md:w-auto">
      <div className="relative w-full mt-2 rounded-md shadow-sm">
        <input
          type="search"
          id="search"
          placeholder="Enter gene list"
          className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-complement-500 sm:text-sm sm:leading-6"
        />
        <button className="absolute inset-y-0.5 right-0.5 w-8 h-8 flex items-center justify-center rounded-2xl hover:bg-gray-100 active:bg-gray-200">
          <MagnifyingGlassIcon
            className="h-5 w-5 fill-complement-500"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  },
  {
    name: 'GeneMANIA',
    description: 'GeneMANIA helps you predict the function of your favourite genes and gene sets.',
    href: 'https://genemania.org/',
    icon: GeneManiaIcon,
    form: <></>,
  },
  {
    name: 'EnrichmentMap',
    description: 'Perform gene set enrichment analysis on a gene list then visualize the results as a network.',
    href: 'https://enrichmentmap.org/',
    icon: EnrichmentMapIcon,
    form: <></>,
  },
  {
    name: 'Sed eu elit quis ligula',
    description: 'Ut id felis pulvinar, dapibus elit eget, finibus purus.',
    icon: DeviceListIcon,
  },
  {
    name: 'Vestibulum hendrerit',
    description: 'Nunc lorem magna, pharetra a neque quis, tristique cursus sem.',
    icon: DeviceLockIcon,
  },
  {
    name: 'Nulla eget nunc nec nibh dapibus',
    description: 'Nam mauris metus, consectetur nec purus nec, molestie accumsan neque.',
    icon: DeviceChartIcon,
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

function DeviceListIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#737373"
      />
      <circle cx={11} cy={14} r={2} fill="#171717" />
      <circle cx={11} cy={20} r={2} fill="#171717" />
      <circle cx={11} cy={26} r={2} fill="#171717" />
      <path
        d="M16 14h6M16 20h6M16 26h6"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="square"
      />
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
    </svg>
  )
}

function DeviceLockIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v10h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h5v2H9a4 4 0 01-4-4V4z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 19.5a3.5 3.5 0 117 0V22a2 2 0 012 2v6a2 2 0 01-2 2h-7a2 2 0 01-2-2v-6a2 2 0 012-2v-2.5zm2 2.5h3v-2.5a1.5 1.5 0 00-3 0V22z"
        fill="#171717"
      />
    </svg>
  )
}

function DeviceChartIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 13.838V26a2 2 0 01-2 2H11a2 2 0 01-2-2V15.65l2.57 3.212a1 1 0 001.38.175L15.4 17.2a1 1 0 011.494.353l1.841 3.681c.399.797 1.562.714 1.843-.13L23 13.837z"
        fill="#171717"
      />
      <path
        d="M10 12h12"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="square"
      />
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
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
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="min-h-72 rounded-2xl border border-gray-200 p-8"
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
              <p className="mt-2 text-gray-700">{feature.description}</p>
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
