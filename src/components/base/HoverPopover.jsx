import PropTypes from 'prop-types'
import { Popover, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export function HoverPopover({ children, content }) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Popover className="relative">
      {/* 1) Trigger */}
      <PopoverGroup
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className=""
      >
        {children}
      </PopoverGroup>

      {/* 2) Panel via Transition */}
      <Transition
        as={Fragment}
        show={isHovering}
        enter="transition duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <PopoverPanel static className="absolute left-1/2 z-10 mt-2 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm/6 font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {content}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
HoverPopover.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
}