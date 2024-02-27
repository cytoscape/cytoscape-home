import clsx from 'clsx'

function WindowButton({ className }) {
  return (
    <div className={clsx('size-3.5 rounded-full mr-1.5 opacity-50', className)} />
  )
}

export function PhoneFrame({
  className,
  children,
  ...props
}) {
  return (
    <div className={clsx('relative aspect-[626/729]', className)} {...props}>
      <div className="absolute inset-y-[calc(1/729*100%)] left-[calc(7/729*100%)] right-[calc(5/729*100%)] border border-gray-300 rounded-2xl bg-gray-200 shadow-xl">
        <div className="h-10 w-full pl-4 pr-4 flex flex-row items-center overflow-hidden">
          <WindowButton className="bg-red-400" />
          <WindowButton className="bg-orange-300" />
          <WindowButton className="bg-green-400" />
          <div className="h-7 w-3/4 pl-4 pr-4 ml-2.5 mr-10 flex flex-row items-center overflow-hidden bg-gray-300 rounded-2xl" />
        </div>
        <div className="grid h-full w-full grid-cols-1 overflow-hidden bg-gray-900 pt-2">
          {children}
        </div>
      </div>
    </div>
  )
}