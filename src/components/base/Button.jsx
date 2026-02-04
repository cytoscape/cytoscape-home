import clsx from 'clsx'
import PropTypes from 'prop-types'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

const baseStyles = {
  solid: 'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline: 'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
  text: 'inline-flex justify-center px-1 text-sm font-semibold transition-colors',
}

const variantStyles = {
  solid: {
    primary: 'relative overflow-hidden bg-primary-400 text-gray-900 before:absolute before:inset-0 hover:border-gray-400 active:before:bg-transparent hover:before:bg-gray-900/10 active:bg-primary-600 active:text-gray-900/80 before:transition-colors disabled:text-gray-100 disabled:bg-gray-300 disabled:pointer-events-none',
    complement: 'relative overflow-hidden bg-complement-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-complement-600 active:text-white/80 before:transition-colors disabled:pointer-events-none',
    white: 'bg-white text-complement-900 hover:bg-white/90 active:bg-white/90 active:text-complement-900/70 disabled:pointer-events-none',
    gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80 disabled:text-gray-100 disabled:bg-gray-300 disabled:pointer-events-none',
  },
  outline: {
    primary: 'border-primary-500/50 text-gray-700 hover:border-primary-500 active:bg-primary-50/75 disabled:pointer-events-none',
    complement: 'border-complement-300 text-complement-500 hover:border-complement-500 active:bg-complement-50 active:text-complement-500/80 disabled:pointer-events-none',
    gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80 disabled:pointer-events-none disabled:border-gray-200 disabled:text-gray-400',
  },
  text: {
    primary: 'border-none text-primary-500 hover:text-complement-500 active:text-complement-700 disabled:pointer-events-none',
    complement: 'border-none text-complement-500 hover:text-complement-600 active:text-complement-700 disabled:pointer-events-none',
    gray: 'border-none text-gray-700 hover:text-gray-800 active:text-gray-900 disabled:pointer-events-none',
  }
}

export function Button({ className, ...props }) {
  props.variant ??= 'solid'
  props.color ??= 'gray'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : props.variant === 'text'
          ? variantStyles.text[props.color]
          : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <a className={className} {...props} />
  )
}
Button.propTypes = {
  variant: PropTypes.oneOf(['solid', 'outline', 'text']),
  color: PropTypes.oneOf(['primary', 'complement', 'white', 'gray']),
  className: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
}

export function LinkButton({ href, children, className, variant='outline', ...props }) {
  return (
    <Button
      type="submit"
      variant={variant}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      {...props}
    >
      {children}
      <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1.5 mt-0.5 fill-gray-400" aria-hidden="true" />
    </Button>
  )
}
LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['solid', 'outline', 'text']),
}