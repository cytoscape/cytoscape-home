import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useId } from 'react'

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-complement-500 focus:outline-none focus:ring-complement-500 sm:text-sm'

export function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  )
}
Label.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}

export function TextField({ label, type = 'text', className, ...props }) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
}

export function SelectField({ label, className, ...props }) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  )
}
SelectField.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
}