const { test } = require('@ianwalter/bff')
const { trim, lowercase } = require('..')

test('trim', t => {
  t.expect(trim(' Cam ')).toBe('Cam')
})

test('lowercase', t => {
  t.expect(lowercase('DeForEST')).toBe('deforest')
})

test('lowercase undefined', t => {
  t.expect(lowercase()).toBe(undefined)
})
