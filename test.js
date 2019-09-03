const c = require('.')
const obj = {}

test('returns a symbol', () => {
  expect(typeof c()).toBe('symbol')
  expect(typeof c('a')).toBe('symbol')
  expect(typeof c(obj)).toBe('symbol')
  expect(typeof c(null)).toBe('symbol')
})

test('returns identical symbol for same single primitive', () => {
  expect(c('a')).toBe(c('a'))
})

test('returns identical symbol for same single object', () => {
  expect(c(obj)).toBe(c(obj))
})

test('returns different symbols for different single primitives', () => {
  expect(c(true)).not.toBe(c(false))
})

test('returns different symbols for different single objects', () => {
  expect(c({})).not.toBe(c({}))
})

test('returns identical symbol for multiple items', () => {
  expect(c('a', true, 3)).toBe(c('a', true, 3))
  expect(c(1, obj)).toBe(c(1, obj))
})

test('returns different symbols for same items in different order', () => {
  expect(c('a', true, 3)).not.toBe(c(true, 'a', 3))
})

test('returns different symbols for a subset of another composition', () => {
  expect(c(obj)).not.toBe(c(obj, 'a'))
})
