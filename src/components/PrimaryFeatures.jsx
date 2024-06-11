'use client'

import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'
import { Container } from '@/components/base/Container'
import { AppScreen } from '@/components/AppScreen'
import { CircleBackground } from '@/components/CircleBackground'
import { BrowserFrame } from '@/components/BrowserFrame'

const MotionAppScreenHeader = motion(AppScreen.Header)
const MotionAppScreenBody = motion(AppScreen.Body)

const features = [
  {
    name: 'Create interactive networks from your data',
    description: 'Generate interactive visualizations and networks to illustrate relationships between your genes or pathways.',
    icon: DataIcon,
    screen: ImportScreen,
  },
  {
    name: 'Analyze the results',
    description: 'Analyze the networks by customizing their visual attributes and applying layout algorithms in order to reveal meaningful patterns and structures.',
    icon: NetworkIcon,
    screen: NetworkScreen,
  },
  {
    name: 'Export figures for publication',
    description: 'Prepare visualizations and summary reports to communicate the results of the analysis to collaborators and for publication.',
    icon: PaperIcon,
    screen: ExportScreen,
  },
]

function DataIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx={12} cy={12} r={12} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

function NetworkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx={12} cy={12} r={12} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.412,0.516 C5.085,0.79 6.141,1.933 6.227,3.636 C6.224,4.372 5.966,5.057 5.511,5.631 C5.428,5.736 5.323,5.82 5.228,5.914 L7.773,9.307 C8.24,8.984 8.811,8.892 9.364,8.864 L9.499,8.87 L10.364,5.411 C9.722,5.025 9.401,4.368 9.364,3.636 C9.364,2.482 10.3,1.545 11.455,1.545 C12.609,1.545 13.545,2.482 13.545,3.636 C13.545,4.791 12.609,5.727 11.455,5.727 L11.363,5.723 L10.519,9.099 C11.207,9.355 11.77,9.862 12.121,10.505 C12.211,10.668 12.266,10.848 12.338,11.019 L17.734,10.038 L17.727,9.909 C17.727,8.177 19.131,6.773 20.864,6.773 C22.596,6.773 24,8.177 24,9.909 C24,11.641 22.596,13.045 20.864,13.045 C19.552,13.029 18.464,12.252 17.96,11.059 L12.497,12.053 C12.49,12.627 12.326,13.192 12.004,13.669 L17.612,18.155 C18.185,17.527 18.991,17.269 19.818,17.227 C21.55,17.227 22.955,18.631 22.955,20.364 C22.955,22.096 21.55,23.5 19.818,23.5 C18.086,23.5 16.682,22.096 16.682,20.364 C16.702,19.971 16.69,19.884 16.823,19.431 C16.866,19.283 16.942,19.148 17.002,19.006 L11.31,14.453 C10.746,14.913 10.079,15.1 9.364,15.136 C8.653,15.113 7.846,14.898 7.327,14.379 L4.975,16.339 C5.127,16.613 5.166,16.92 5.182,17.227 C5.182,18.382 4.246,19.318 3.091,19.318 C1.936,19.318 1,18.382 1,17.227 C1,16.072 1.936,15.136 3.091,15.136 C3.59,15.146 3.899,15.261 4.306,15.536 L6.66,13.575 C6.345,13.111 6.255,12.546 6.227,12 C6.248,11.31 6.466,10.482 6.97,9.979 L4.355,6.492 C3.966,6.703 3.525,6.751 3.091,6.773 C1.359,6.773 -0.045,5.369 -0.045,3.636 C-0.045,1.904 1.359,0.5 3.091,0.5 L3.412,0.516 z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

function PaperIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx={12} cy={12} r={12} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
        fill="#A3A3A3"
      />
      <path
        d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z"
        fill="#737373"
      />
    </svg>
  )
}

function DeviceUserIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 23a3 3 0 100-6 3 3 0 000 6zm-1 2a4 4 0 00-4 4v1a2 2 0 002 2h6a2 2 0 002-2v-1a4 4 0 00-4-4h-2z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v24a4.002 4.002 0 01-3.01 3.877c-.535.136-.99-.325-.99-.877s.474-.98.959-1.244A2 2 0 0025 28V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 001.041 1.756C8.525 30.02 9 30.448 9 31s-.455 1.013-.99.877A4.002 4.002 0 015 28V4z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

function DeviceNotificationIcon(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#A3A3A3"
      />
      <path
        d="M9 8a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H11a2 2 0 01-2-2V8z"
        fill="#737373"
      />
    </svg>
  )
}

function DeviceTouchIcon(props) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          x1={14}
          y1={14.5}
          x2={7}
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#737373" />
          <stop offset={1} stopColor="#D4D4D4" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v13h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h4v2H9a4 4 0 01-4-4V4z"
        fill="#A3A3A3"
      />
      <path
        d="M7 22c0-4.694 3.5-8 8-8"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 20l.217-5.513a1.431 1.431 0 00-2.85-.226L17.5 21.5l-1.51-1.51a2.107 2.107 0 00-2.98 0 .024.024 0 00-.005.024l3.083 9.25A4 4 0 0019.883 32H25a4 4 0 004-4v-5a3 3 0 00-3-3h-5z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

const headerAnimation = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const maxZIndex = 2147483647

const bodyVariantBackwards = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  transition: { duration: 0.4 },
}

const bodyVariantForwards = (custom) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
})

const bodyAnimation = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom, ...props) =>
      custom.isForwards
        ? bodyVariantForwards(custom, ...props)
        : bodyVariantBackwards,
    animate: (custom) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom, ...props) =>
      custom.isForwards
        ? bodyVariantBackwards
        : bodyVariantForwards(custom, ...props),
  },
}

function ImportScreen(props) {
  const data = [
    { source: 'MSH6',  target: 'MRE11',  weight: 0.00389, },
    { source: 'MRE11', target: 'SPO11',  weight: 0.02571, },
    { source: 'MLH1',  target: 'MRE11',  weight: 0.03111, },
    { source: 'MSH2',  target: 'MLH1',   weight: 0.01214, },
    { source: 'DMC1',  target: 'MND1',   weight: 0.00475, },
    { source: 'RAD51', target: 'DMC1',   weight: 0.00122, },
    { source: 'BRCA2', target: 'MLH3',   weight: 0.00423, },
    { source: 'MND1',  target: 'BRCA2',  weight: 0.00403, },
    { source: 'RAD52',  target: 'MND1',  weight: 0.00141, },
  ]

  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Upload Data</AppScreen.Title>
        <AppScreen.Subtitle>
          Gene List, Excel, CSV, etc.
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="whitespace-nowrap py-3.5 pl-4 text-sm font-semibold text-gray-900 xs:text-xs">
                Gene 1
              </th>
              <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-sm font-semibold text-gray-900 xs:text-xs">
                Gene 2
              </th>
              <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-sm font-semibold text-gray-900 xs:text-xs">
                Weight
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="whitespace-nowrap py-1 pl-4 pr-2 text-center text-sm text-gray-500 xs:text-xs">{row.source}</td>
                <td className="whitespace-nowrap py-1 px-2 text-center text-sm text-gray-500 xs:text-xs">{row.target}</td>
                <td className="whitespace-nowrap py-1 pl-4 pr-3 text-center text-sm text-gray-500 xs:text-xs">{row.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function NetworkScreen(props) {
  return (
    <AppScreen title="H.Sapiens Genes" className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Edit Network</AppScreen.Title>
        <AppScreen.Subtitle>
          Change colors, shapes, layout, etc.
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className="px-4 py-2">
          <svg x="0" y="0" width="95%" viewBox="0, 0, 300, 300">
            <path d="M256.437,96.94 L222.281,109.592" fillOpacity="0" stroke="#90cbe9" strokeWidth="2.571" strokeOpacity="0.5"/>
            <path d="M148.207,80.028 L142.193,33.261" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.155" strokeOpacity="0.5"/>
            <path d="M154.391,88.692 L193.682,108.102" fillOpacity="0" stroke="#90cbe9" strokeWidth="4.857" strokeOpacity="0.5"/>
            <path d="M218.919,168.296 L210.883,130.263" fillOpacity="0" stroke="#90cbe9" strokeWidth="2.981" strokeOpacity="0.5"/>
            <path d="M120.145,214.751 L197.378,126.728" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.671" strokeOpacity="0.5"/>
            <path d="M193.621,121.79 L85.678,173.936" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.324" strokeOpacity="0.5"/>
            <path d="M216.96,177.601 L196.675,205.821" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.581" strokeOpacity="0.5"/>
            <path d="M215.251,171.254 L106.023,122.27" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.549" strokeOpacity="0.5"/>
            <path d="M215.255,175.517 L122.169,217.487" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.482" strokeOpacity="0.5"/>
            <path d="M144.025,82.562 L106.82,56.601" fillOpacity="0" stroke="#90cbe9" strokeWidth="4.204" strokeOpacity="0.5"/>
            <path d="M113.054,228.615 L105.822,260.142" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.618" strokeOpacity="0.5"/>
            <path d="M176.935,207.084 L102.436,127.287" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.252" strokeOpacity="0.5"/>
            <path d="M105.616,108.671 L143.625,88.814" fillOpacity="0" stroke="#90cbe9" strokeWidth="3.976" strokeOpacity="0.5"/>
            <path d="M113.125,212.945 L95.143,131.118" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.479" strokeOpacity="0.5"/>
            <path d="M81.396,170.652 L88.887,131.208" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.681" strokeOpacity="0.5"/>
            <path d="M122.875,220.533 L171.991,218.975" fillOpacity="0" stroke="#90cbe9" strokeWidth="2.772" strokeOpacity="0.5"/>
            <path d="M74.3,177.069 L39.563,180.112" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.276" strokeOpacity="0.5"/>
            <path d="M83.97,181.272 L109.904,214.46" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.594" strokeOpacity="0.5"/>
            <path d="M147.495,91.871 L116.82,213.003" fillOpacity="0" stroke="#90cbe9" strokeWidth="1.136" strokeOpacity="0.5"/>
            <path d="M285.11,91.024 C285.11,99.061 278.594,105.576 270.558,105.576 C262.521,105.576 256.006,99.061 256.006,91.024 C256.006,82.987 262.521,76.472 270.558,76.472 C278.594,76.472 285.11,82.987 285.11,91.024 z" fill="#2f97c8"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 270.725, 114.045)">
              <tspan x="-12.502" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">MSH2</tspan>
            </text>
            <path d="M154.257,17.297 C154.257,25.334 147.742,31.849 139.705,31.849 C131.668,31.849 125.153,25.334 125.153,17.297 C125.153,9.26 131.668,2.745 139.705,2.745 C147.742,2.745 154.257,9.26 154.257,17.297 z" fill="#2079a9"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 140.112, 39.85)">
              <tspan x="-12.502" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">MSH6</tspan>
            </text>
            <path d="M221.712,114.508 C221.712,122.545 215.197,129.06 207.16,129.06 C199.124,129.06 192.609,122.545 192.609,114.508 C192.609,106.471 199.124,99.956 207.16,99.956 C215.197,99.956 221.712,106.471 221.712,114.508 z" fill="#2079a9"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 207.19, 137.061)">
              <tspan x="-12.004" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">MLH1</tspan>
            </text>
            <path d="M223.651,172.881 C223.651,175.177 221.789,177.038 219.493,177.038 C217.197,177.038 215.335,175.177 215.335,172.881 C215.335,170.584 217.197,168.723 219.493,168.723 C221.789,168.723 223.651,170.584 223.651,172.881 z" fill="#2f97c8"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 220.071, 185.039)">
              <tspan x="-12.502" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">MSH5</tspan>
            </text>
            <path d="M106.518,52.166 C106.518,55.39 103.905,58.003 100.681,58.003 C97.457,58.003 94.844,55.39 94.844,52.166 C94.844,48.942 97.457,46.329 100.681,46.329 C103.905,46.329 106.518,48.942 106.518,52.166 z" fill="#2f97c8"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 101.292, 66.004)">
              <tspan x="-14.177" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">SPO11</tspan>
            </text>
            <path d="M113.485,271.195 C113.485,277.167 108.644,282.008 102.672,282.008 C96.7,282.008 91.858,277.167 91.858,271.195 C91.858,265.223 96.7,260.382 102.672,260.382 C108.644,260.382 113.485,265.223 113.485,271.195 z" fill="#2f97c8"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 102.702, 290.01)">
              <tspan x="-12.004" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">MLH3</tspan>
            </text>
            <path d="M105.848,115.391 C105.848,123.427 99.333,129.942 91.296,129.942 C83.26,129.942 76.744,123.427 76.744,115.391 C76.744,107.354 83.26,100.839 91.296,100.839 C99.333,100.839 105.848,107.354 105.848,115.391 z" fill="#2079a9"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 91.291, 137.944)">
              <tspan x="-12.751" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">DMC1</tspan>
            </text>
            <path d="M201.627,217.981 C201.627,226.018 195.112,232.533 187.075,232.533 C179.038,232.533 172.523,226.018 172.523,217.981 C172.523,209.944 179.038,203.429 187.075,203.429 C195.112,203.429 201.627,209.944 201.627,217.981 z" fill="#2079a9"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 187.011, 240.534)">
              <tspan x="-14.506" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">RAD51</tspan>
            </text>
            <path d="M38.054,180.297 C38.054,184.058 35.004,187.108 31.243,187.108 C27.481,187.108 24.431,184.058 24.431,180.297 C24.431,176.535 27.481,173.486 31.243,173.486 C35.004,173.486 38.054,176.535 38.054,180.297 z" fill="#2f97c8"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 31.179, 195.109)">
              <tspan x="-14.506" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">RAD52</tspan>
            </text>
            <path d="M84.736,176.046 C84.736,178.785 82.515,181.005 79.776,181.005 C77.037,181.005 74.817,178.785 74.817,176.046 C74.817,173.307 77.037,171.086 79.776,171.086 C82.515,171.086 84.736,173.307 84.736,176.046 z" fill="#2f97c8"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 79.527, 189.006)">
              <tspan x="-12.751" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">MND1</tspan>
            </text>
            <path d="M121.34,220.288 C121.34,224.149 118.21,227.279 114.349,227.279 C110.488,227.279 107.358,224.149 107.358,220.288 C107.358,216.427 110.488,213.297 114.349,213.297 C118.21,213.297 121.34,216.427 121.34,220.288 z" fill="#2f97c8"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 115.455, 235.28)">
              <tspan x="-15.005" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">BRCA2</tspan>
            </text>
            <path d="M153.476,85.517 C153.476,88.278 151.238,90.516 148.477,90.516 C145.716,90.516 143.478,88.278 143.478,85.517 C143.478,82.756 145.716,80.518 148.477,80.518 C151.238,80.518 153.476,82.756 153.476,85.517 z" fill="#2f97c8"/>
            <text transform="matrix(1.124, 0, 0, 1.124, 148.791, 98.518)">
              <tspan x="-14.673" y="2.5" fontFamily="Helvetica" fontSize="9" fill="#2079a9">MRE11</tspan>
            </text>
          </svg>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function ExportScreen(props) {
  return (
    <AppScreen title="H.Sapiens Genes" className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Export Network</AppScreen.Title>
        <AppScreen.Subtitle>Save it as image or text</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className="divide-y divide-gray-100">
          
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function FeaturesDesktop() {
  let [changeCount, setChangeCount] = useState(0)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
      setChangeCount((changeCount) => changeCount + 1)
    },
    100,
    { leading: true },
  )

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-gray-800/30"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gray-800"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                <Tab className="text-left ui-not-focus-visible:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </Tab.List>
      <div className="relative col-span-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#13B5C8" className="animate-spin-slower" />
        </div>
        <BrowserFrame className="z-10 mx-auto w-full max-w-[366px]">
          <Tab.Panels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <Tab.Panel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] ui-not-focus-visible:outline-none"
                  >
                    <feature.screen
                      animated
                      custom={{ isForwards, changeCount }}
                    />
                  </Tab.Panel>
                ) : null,
              )}
            </AnimatePresence>
          </Tab.Panels>
        </BrowserFrame>
      </div>
    </Tab.Group>
  )
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef(null)
  let slideRefs = useRef([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => ref && (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#13B5C8"
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <BrowserFrame className="relative mx-auto w-full max-w-[366px] xs:aspect-[246/408]">
                <feature.screen />
              </BrowserFrame>
              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500',
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            Every tool you need for your bioinformatics research
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Cytoscape Home will guide you through the process of transforming your raw data into interactive networks.
            Use our tools to analyze the results, share them with collaborators and finally publish them.
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
