const isDefined = require('./is-defined')

const getEncodedPathParam = nonIterable =>
  Object.keys(nonIterable)
    .filter(key => nonIterable[key] != null && nonIterable[key] !== '')
    .map(key => `${encodeURIComponent(nonIterable[key]).replace('.', '%2E')}`)

const getEncodedQuery = nonIterable =>
  Object.keys(nonIterable)
    .filter(key => isDefined(nonIterable[key]) && nonIterable[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(nonIterable[key])}`)
    .join('&')

const decodeQuery = query => decodeURIComponent(query)

const getEncodedFilterQuery = (nonIterable = {}) =>
  Object.keys(nonIterable)
    .filter(key => isDefined(nonIterable[key]) && nonIterable[key] !== '')
    .map(key => `filter[${encodeURIComponent(key)}]=${encodeURIComponent(nonIterable[key])}`)
    .join('&')

const getEncodedList = list => {
  const filtered = list.filter(item => isDefined(item) && item !== '')
  const stringified = JSON.stringify(filtered)
  const encoded = encodeURIComponent(stringified)
  return encoded
}
const decodeEncodedList = encoded => {
  try {
    const decoded = decodeURIComponent(encoded)
    return JSON.parse(decoded)
  } catch (e) {
    // ignore
  }
}
const removeQueryStringFromUrl = url => url.replace(/\?.*$/, '')

module.exports = {
  removeQueryStringFromUrl,
  decodeEncodedList,
  getEncodedFilterQuery,
  getEncodedList,
  decodeQuery,
  getEncodedQuery,
  getEncodedPathParam,
}
