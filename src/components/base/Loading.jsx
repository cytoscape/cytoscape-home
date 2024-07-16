import clsx from 'clsx'

export function LoadingMessage({ className, ...props }) {
  className = clsx(
    'text-center text-gray-400 animate-pulse from-gray-100 to-gray-500',
    className,
  )

  return (
    <div className={className} {...props}>
      Loading...
    </div>
  )
}