import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@/components/base/Button'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { ComputerDesktopIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'

function LinkOptions() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <Button
          as="a"
          href="https://web.cytoscape.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <GlobeAltIcon className="h-6 w-6 mr-2" />
          Cytoscape Web
        </Button>
        <p className="mt-2 text-xs text-gray-600 text-center">
          Instantly use the web-based version of Cytoscape directly in your browser.  Easily share and collaborate with your colleagues.
        </p>
      </div>
      <div>
        <Button
          as="a"
          href="https://cytoscape.org/download.html"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <ComputerDesktopIcon className="h-6 w-6 mr-2" />
          Cytoscape Desktop
        </Button>
        <p className="mt-2 text-xs text-gray-600 text-center">
          Download and install the Cytoscape Desktop app for private, offline use on your computer.  Access advanced features and workflows.
        </p>
      </div>
    </div>
  )
}

export function UseCytoscapeDialog({
  open=false,
  onClose
}) {
  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => void 0/**(make it modal)*/}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform w-full rounded-t-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6 sm:rounded-lg">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-xl bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-complement-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="-mt-2.5 text-center sm:text-left">
                    <DialogTitle as="h3" className="mb-6 text-base font-semibold leading-6 text-gray-900">
                      Which version of Cytoscape would you like to use?
                    </DialogTitle>
                    <div className="mt-2">
                      <LinkOptions />
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
