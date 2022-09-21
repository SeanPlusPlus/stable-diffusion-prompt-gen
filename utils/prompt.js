import _sampleSize from 'lodash/sampleSize'
import _sample from 'lodash/sample'

const semiRandomAttrs = [
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
  const attributes = _sample(semiRandomAttrs)
  const arr = []
  attributes.forEach((a) => {
    const term = _sample(json[a])
    arr.push(term)
  })
  const text = arr.map((t, i) => (t + (i < arr.length -1 ? ', ' : ''))).join('')
  return {
    text,
    attributes,
  }

}

export const getRandomPrompt = (json) => {
  const s = Object.keys(json)
  const attributes = _sampleSize(s, 5)
  const arr = []
  attributes.forEach((a) => {
    const term = _sample(json[a])
    arr.push(term)
  })
  const text = arr.map((t, i) => (t + (i < arr.length -1 ? ', ' : ''))).join('')
  return {
    text,
    attributes,
  }
}
