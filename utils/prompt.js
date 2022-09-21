import _sampleSize from 'lodash/sampleSize'
import _sample from 'lodash/sample'

const keySet = [
  [
    'scenario-desc',
    'artist',
    'landscape-type',
    'style',
    'hd',
  ],
]

export const getSemiRandomPrompt = (json) => {
  const keys = _sample(keySet)
  console.log('* semi-random keys', keys)
  const arr = []
  keys.forEach((k) => {
    const term = _sample(json[k])
    arr.push(term)
  })
  const str = arr.map((t, i) => (t + (i < arr.length -1 ? ', ' : ''))).join('')
  return str
}


export const getRandomPrompt = (json) => {
  const s = Object.keys(json)
  const keys = _sampleSize(s, 5)
  console.log('RANDOM keys', keys)
  const arr = []
  keys.forEach((k) => {
    const term = _sample(json[k])
    arr.push(term)
  })
  const str = arr.map((t, i) => (t + (i < arr.length -1 ? ', ' : ''))).join('')
  return str
}
