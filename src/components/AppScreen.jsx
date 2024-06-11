import { forwardRef } from 'react'
import { CytoscapeLogo } from '@/components/Logos'
import clsx from 'clsx'

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AppScreen({ children, className, ...props }) {
  return (
    <div className={clsx('flex flex-col', className)} {...props}>
      <div className="flex justify-between px-4 text-gray-300">
        <CytoscapeLogo className="h-6 flex-none" fill="#d4d4d4" />
          {props.title}
        <MenuIcon className="h-6 w-6 flex-none stroke-gray-300 invisible" />
      </div>
      {children}
    </div>
  )
}

AppScreen.Header = forwardRef(function AppScreenHeader({ children }, ref) {
  return (
    <div ref={ref} className="mt-2 px-4 text-white">
      {children}
    </div>
  )
})

AppScreen.Title = forwardRef(function AppScreenTitle({ children }, ref) {
  return (
    <div ref={ref} className="text-md md:text-2xl text-white">
      {children}
    </div>
  )
})

AppScreen.Subtitle = forwardRef(function AppScreenSubtitle({ children }, ref) {
  return (
    <div ref={ref} className="text-xs md:text-sm text-gray-500">
      {children}
    </div>
  )
})

AppScreen.Body = forwardRef(function AppScreenBody(
  { children, className },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx('mt-2 flex-auto rounded-t-md bg-white', className)}
    >
      {children}
    </div>
  )
})
