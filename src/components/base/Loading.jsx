import PropTypes from 'prop-types'
import clsx from 'clsx'
import { colors } from '@/styles/tailwind'


/**
 * This version is centered around the center node of the Cytoscape logo, so it doesn't look off-balance when spinning.
 */
export function CytoscapeLogo(props) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <path d="M13.937,9.34 C13.879,9.918 13.711,10.476 13.441,10.989 L17.815,15.455 C18.441,15.154 19.122,14.986 19.819,14.962 L21.641,8.96 C21.176,8.615 20.78,8.184 20.475,7.691 L13.937,9.34 z M13.208,6.371 L19.84,4.699 C20.138,2.469 22.049,0.758 24.347,0.758 C26.858,0.758 28.895,2.795 28.895,5.306 C28.895,7.754 26.958,9.752 24.533,9.85 L22.737,15.771 C24.153,16.691 25.027,18.271 25.027,19.99 C25.027,21.432 24.413,22.787 23.354,23.736 L25.322,27.663 C25.533,27.633 25.746,27.618 25.959,27.618 C28.47,27.618 30.507,29.655 30.507,32.166 C30.507,34.677 28.47,36.713 25.959,36.713 C23.448,36.713 21.411,34.677 21.411,32.166 C21.411,31.003 21.853,29.899 22.637,29.06 L20.596,24.985 C20.397,25.009 20.196,25.021 19.996,25.021 C18.977,25.021 17.994,24.716 17.162,24.147 L14.85,26.183 C14.866,26.302 14.874,26.423 14.874,26.544 C14.874,28.076 13.631,29.319 12.1,29.319 C10.567,29.319 9.325,28.076 9.325,26.544 C9.325,25.012 10.567,23.769 12.1,23.769 C12.364,23.769 12.626,23.807 12.878,23.88 L15.286,21.76 C15.163,21.433 15.075,21.095 15.023,20.751 L9.282,19.978 C8.497,21.437 6.965,22.37 5.277,22.37 C2.766,22.37 0.729,20.333 0.729,17.823 C0.729,15.312 2.766,13.276 5.277,13.276 C7.486,13.276 9.351,14.86 9.747,16.984 L15.487,17.758 C15.525,17.681 15.565,17.605 15.607,17.53 L11.221,13.051 C10.652,13.298 10.038,13.425 9.413,13.425 C6.902,13.425 4.866,11.389 4.866,8.878 C4.866,6.367 6.902,4.33 9.413,4.33 C10.954,4.33 12.373,5.107 13.208,6.371 z"
        fill={props.fill || colors.primary[500]}
      />
    </svg>
  )
}


export function SpinningIcon({ message, className }) {
  className = clsx(
    'flex flex-col space-y-4 items-center justify-center text-center text-gray-400 animate-pulse from-opacity-0 to-opacity-100',
    className,
  )

  return (
    <div className={`w-full h-full flex ${className}`}>
      <div className="animate-spin">
        <CytoscapeLogo className="h-10" fill={colors.gray[400]} />
      </div>
    {message && (
      <div>
        {message}
      </div>
    )}
    </div>
  )
}
SpinningIcon.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
}

export function TextSkeleton({ showTitle = false, lines = [3, 5] }) {
  return (
    <div className="w-full animate-pulse font-sans">
    {showTitle && (
      <div className="block w-1/3 mb-5 text-sm antialiased leading-tight tracking-normal bg-gray-300 rounded-md text-inherit">
        &nbsp;
      </div>
    )}
    {lines.map((numLines, sectionIdx) => (
      <div key={`skeleton-section-${sectionIdx}`} className="w-full mb-7">
        {[...Array(numLines)].map((_, idx) => (
          <div
            key={`skeleton-line-${sectionIdx}-${idx}`}
            className={`block ${idx < numLines - 1 ? 'w-full' : 'w-2/3'} h-4 mb-2 text-xs antialiased leading-relaxed bg-gray-300 rounded-md text-inherit`}
          >
            &nbsp;
          </div>
        ))}
      </div>
    ))}
    </div>
  )
}
TextSkeleton.propTypes = {
  showTitle: PropTypes.bool,
  lines: PropTypes.arrayOf(PropTypes.number),
}

export function ImageAndTextSkeleton({ showTitle = false }) {
  return (
    <div className="w-full animate-pulse font-sans flex items-start space-x-6">
      {/* Placeholder for image */}
      <div className="w-1/5 aspect-square bg-gray-300 rounded-lg" />
      {/* Placeholder for title and text */}
      <div className="flex-1">
        {showTitle && (
          <div className="block w-1/2 mb-5 text-sm antialiased leading-tight tracking-normal bg-gray-300 rounded-md text-inherit">
            &nbsp;
          </div>
        )}
        {[...Array(7)].map((_, idx) => (
          <div
            key={`skeleton-line-${idx}`}
            className={`block ${idx === 6 ? 'w-4/5' : 'w-full'} h-4 mb-2 text-xs antialiased leading-relaxed bg-gray-300 rounded-md text-inherit`}
          >
            &nbsp;
          </div>
        ))}
      </div>
    </div>
  )
}
ImageAndTextSkeleton.propTypes = {
  showTitle: PropTypes.bool,
}