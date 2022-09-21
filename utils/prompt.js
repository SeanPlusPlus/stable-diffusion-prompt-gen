import _sampleSize from 'lodash/sampleSize'
import _sample from 'lodash/sample'

const semiRandomKeys = [
  [
    'scenario-desc',
    'artist',
    'landscape-type',
    'style',
    'hd',
  ],
  [
    'animals',
    'adj-beauty',
    'portrait-type',
    'artist',
    'color-palette',
  ],
  [
    'identity-adult',
    'fantasy-setting',
    'noun-beauty',
    'pop-culture',
    'rpg-Item',
  ]
]

export const getSemiRandomPrompt = (json) => {
  // const keys = semiRandomKeys[1]
  const keys = _sample(semiRandomKeys)
  console.log('* semi-random keys', keys)
  const arr = []
  keys.forEach((k) => {
    const term = _sample(json[k])
    arr.push(term)
  })
  const text = arr.map((t, i) => (t + (i < arr.length -1 ? ', ' : ''))).join('')
  return {
    text,
    attributes: keys,
  }

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
  const text = arr.map((t, i) => (t + (i < arr.length -1 ? ', ' : ''))).join('')
  return {
    text,
    attributes: keys,
  }
}
