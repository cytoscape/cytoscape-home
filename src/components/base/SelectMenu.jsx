import { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { Listbox, ListboxButton, Label, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function SelectMenu({ data, label, selectedIndex, onChange, className }) {
  const [selected, setSelected] = useState(selectedIndex >= 0 ? data[selectedIndex] : null)

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < data.length && data[selectedIndex] !== selected) {
      const newSelected = data[selectedIndex]
      if (newSelected !== selected) {
        setSelected(newSelected)
      }
    }
  }, [selectedIndex, data, selected])

  const handleChange = (item) => {
    setSelected(item)
    onChange?.(item)
  }

  const buttonClassName = clsx(
    'relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-complement-500 sm:text-sm sm:leading-6',
    className,
  )

  return (
    <Listbox value={selected} onChange={handleChange} >
      {({ open }) => (
        <>
        {label && (
          <Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Label>
        )}
          <div className="relative mt-2">
            <ListboxButton className={buttonClassName}>
              <span className="flex items-center">
                {selected ? (
                  <>
                    <img src={selected.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full saturate-0" />
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </>
                ) : <>&nbsp;</>}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((item) => (
                  <ListboxOption
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-complement-200' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={item.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full saturate-0" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-complement-500">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
SelectMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
}