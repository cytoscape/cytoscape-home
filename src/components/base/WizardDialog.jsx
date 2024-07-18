import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@/components/base/Button'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export function WizardDialog({
  open=false,
  totalSteps=0,
  step=-1,
  title,
  submitLabel,
  children,
  onClose,
  onPrevious,
  onNext,
  canContinue=false,
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
                      {title}
                    </DialogTitle>
                    <div className="mt-2">
                      {children}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-5 gap-3 sm:mt-6">
                  <Button
                    variant="outline"
                    className="inline-flex gap-2 min-w-32"
                    onClick={step >= 0 ? onPrevious : onClose}
                  >
                    {step >= 0 && (
                      <ChevronLeftIcon className="-ml-1 h-6 w-6" />
                    )}
                    <span>{ step >= 0 ? 'Previous' : 'Cancel' }</span>
                  </Button>
                  <Button
                    variant="solid"
                    color="gray"
                    disabled={!canContinue}
                    className="inline-flex gap-2 min-w-32"
                    onClick={onNext}
                  >
                    <span>{ step === totalSteps - 1 ? (submitLabel || 'Submit') : 'Next' }</span>
                    <ChevronRightIcon className="h-6 w-6" />
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
