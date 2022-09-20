import _sampleSize from 'lodash/sampleSize'
import _sample from 'lodash/sample'

const getPrompt = (json) => {
  const s = Object.keys(json)
  const keys = _sampleSize(s, 4)
  console.log('keys', keys)
  const arr = []
  keys.forEach((k) => {
    const term = _sample(json[k])
    arr.push(term)
  })
  return arr.map((t, i) => (t + (i < arr.length -1 ? ', ' : ''))).join('')
}

export default getPrompt