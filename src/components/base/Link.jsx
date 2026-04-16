export function Link({
  href,
  ariaLabel='external link',
  darkBackground = false,
  linkOut = false,
  onClick,
  children
}) {
  const className = `cursor-pointer underline underline-offset-2
    ${darkBackground ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-complement-500'}`

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={linkOut ? "_blank" : "_self"}
      rel={linkOut ? "noreferrer" : undefined}
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  )
}

export default Link