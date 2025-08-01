
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const tailwindStyles = resolveConfig(tailwindConfig)

export const { colors } = tailwindStyles.theme

export default tailwindStyles