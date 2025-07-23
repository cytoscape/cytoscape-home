import clsx from 'clsx'
import { CytoscapeLogo } from '@/components/Logos'

export function LoadingMessage({ message, className }) {
  className = clsx(
    'flex flex-col space-y-4 items-center justify-center text-center text-gray-400 animate-pulse from-opacity-10 to-opacity-100',
    className,
  )

  return (
    <div className={className}>
      <div className="animate-spin">
        <CytoscapeLogo className="h-10" fill="#a3a3a3" />
      </div>
      <div>
        {message || 'Loading...'}
      </div>
    </div>
  )
}