const { test } = require('@ianwalter/bff')
const { trim, lowercase } = require('..')

test('trim', ({ expect }) => {
  expect(trim(' Cam ')).toBe('Cam')
})

test('lowercase', ({ expect }) => {
  expect(lowercase('DeForEST')).toBe('deforest')
})
