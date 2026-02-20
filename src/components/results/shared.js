/**
 * Just a helper to generate the label for total results, considering the max results to display.
 * @param {*} total Total length of the fetched results
 * @param {*} max Maximum number of results to display
 * @returns {string} The label for total results
 */
export function totalResultsLabel(total = 0, max = 50) {
  let label = 'No results'
  if (total > max) {
    label = total > 1 ? `Top ${max} results` : `Top result`
  } else {
    label = `${total} result${total > 1 ? 's' : ''}`
  }

  return label
}